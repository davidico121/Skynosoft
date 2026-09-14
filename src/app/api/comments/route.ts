import { NextResponse } from "next/server";
import { getCommentsClient } from "@/sanity/commentsClient";

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);
  if (!data) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { postSlug, name, email, body, website } = data as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field. Bots often do.
  // Pretend success so the bot doesn't learn to look for a different signal.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof postSlug !== "string" ||
    !postSlug.trim() ||
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 100 ||
    typeof body !== "string" ||
    !body.trim() ||
    body.length > 2000
  ) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  if (email !== undefined && email !== "" && typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const client = getCommentsClient();
  await client.create({
    _type: "comment",
    postSlug: postSlug.trim(),
    name: name.trim(),
    ...(email ? { email: (email as string).trim() } : {}),
    body: body.trim(),
    approved: false,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
