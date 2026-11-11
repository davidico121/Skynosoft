const MAX_EMAIL_LENGTH = 254;
// Deliberately simple: good enough to reject garbage without rejecting real
// addresses. Kit's own API is the real validator of deliverability.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SubscribePayload = {
  email?: unknown;
  consent?: unknown;
  /** Honeypot: real users never see or fill this field. */
  website?: unknown;
};

export type ValidationResult =
  | { ok: true; email: string }
  | { ok: false; reason: "invalid_email" | "missing_consent" | "honeypot" };

export function validateSubscribePayload(payload: SubscribePayload): ValidationResult {
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return { ok: false, reason: "honeypot" };
  }

  if (payload.consent !== true) {
    return { ok: false, reason: "missing_consent" };
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!email || email.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(email)) {
    return { ok: false, reason: "invalid_email" };
  }

  return { ok: true, email };
}
