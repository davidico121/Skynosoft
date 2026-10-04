"use server";

import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  redirect("/admin/invoices");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  redirect("/admin/invoices");
}
