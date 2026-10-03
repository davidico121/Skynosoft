"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sendPitchEmail } from "@/lib/zeptomail";

const COOKIE_NAME = "admin_session";

function expectedSessionValue(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const expected = expectedSessionValue();
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expected;
}

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) {
    return { error: "ADMIN_PASSWORD is not set on the server yet." };
  }

  const password = String(formData.get("password") || "");
  if (password !== expectedPassword) {
    return { error: "Wrong password." };
  }

  const store = await cookies();
  store.set(COOKIE_NAME, expectedSessionValue()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin/send");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/admin/send");
}

export type SendState = { error?: string; success?: boolean };

export async function sendEmailAction(_prev: SendState, formData: FormData): Promise<SendState> {
  if (!(await isAuthed())) {
    return { error: "Session expired. Please log in again." };
  }

  const toEmail = String(formData.get("toEmail") || "").trim();
  const toName = String(formData.get("toName") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const body = String(formData.get("body") || "").trim();

  if (!toEmail || !subject || !body) {
    return { error: "To, subject and message are all required." };
  }

  const result = await sendPitchEmail({ toEmail, toName, subject, text: body });
  if (!result.ok) {
    return { error: result.error };
  }
  return { success: true };
}
