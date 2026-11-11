import { NextResponse, type NextRequest } from "next/server";
import { subscribeToKit } from "@/lib/kit";
import { isRateLimited } from "@/lib/rate-limit";
import { validateSubscribePayload, type SubscribePayload } from "@/lib/subscribe-validation";

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };
const GENERIC_ERROR = { ok: false, message: "Something went wrong. Please try again." } as const;

function clientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  if (isRateLimited(ip, RATE_LIMIT)) {
    return NextResponse.json(GENERIC_ERROR, { status: 429 });
  }

  let payload: SubscribePayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const result = validateSubscribePayload(payload);
  if (!result.ok) {
    // A tripped honeypot gets a quiet 200 so bots learn nothing from the
    // response; every other validation failure is a real 400 for a real form.
    if (result.reason === "honeypot") {
      return NextResponse.json({ ok: true });
    }
    const message =
      result.reason === "missing_consent"
        ? "Please check the consent box to subscribe."
        : "Please enter a valid email address.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  const referrer = request.headers.get("referer") ?? undefined;
  const kitResult = await subscribeToKit({ email: result.email, referrer });

  if (!kitResult.ok) {
    console.error("Kit subscribe error:", kitResult.status, kitResult.error);
    return NextResponse.json(GENERIC_ERROR, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
