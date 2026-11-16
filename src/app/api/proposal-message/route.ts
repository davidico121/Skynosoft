import { NextResponse, type NextRequest } from "next/server";
import { isRateLimited } from "@/lib/rate-limit";
import { sendPitchEmail } from "@/lib/zeptomail";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const INBOX = "david@skynosoft.net";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = {
  ok: false,
  message: `Something went wrong. Please email ${INBOX} instead.`,
} as const;

type Payload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  proposal?: unknown;
  website?: unknown;
};

function clientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientIp(request), RATE_LIMIT)) {
    return NextResponse.json(GENERIC_ERROR, { status: 429 });
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this in. Bots get a quiet success.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 200);
  const message = clean(payload.message, 5000);
  const proposal = clean(payload.proposal, 120) || "a proposal page";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Please write a message or question." },
      { status: 400 },
    );
  }

  const result = await sendPitchEmail({
    toEmail: INBOX,
    toName: "David Owoeye",
    subject: `New message from ${name || email} on ${proposal}`,
    text: `From: ${name || "(no name given)"} <${email}>\nPage: ${proposal}\n\n${message}`,
    replyTo: { email, name: name || undefined },
    signature: false,
  });

  if (!result.ok) {
    console.error("Proposal message error:", result.error);
    return NextResponse.json(GENERIC_ERROR, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
