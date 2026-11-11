const KIT_API_BASE = "https://api.kit.com/v4";
const KIT_TIMEOUT_MS = 10_000;

export type SubscribeToKitInput = { email: string; referrer?: string };
export type SubscribeToKitResult =
  | { ok: true }
  | { ok: false; status?: number; error: string };

async function kitErrorDetail(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return JSON.stringify(data?.errors ?? data);
  } catch {
    return await res.text();
  }
}

/**
 * Kit v4 has no single "create or add to form" call for a brand-new email:
 * POST /forms/{id}/subscribers requires the subscriber to already exist
 * (confirmed against https://developers.kit.com/api-reference/forms/add-subscriber-to-form-by-email-address
 * on 2026-11-10). So this upserts the subscriber first, then attaches them
 * to the form.
 */
export async function subscribeToKit({
  email,
  referrer,
}: SubscribeToKitInput): Promise<SubscribeToKitResult> {
  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;

  if (!apiKey || !formId) {
    return {
      ok: false,
      error: "Kit is not configured. Set KIT_API_KEY and KIT_FORM_ID in the environment.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), KIT_TIMEOUT_MS);
  const headers = { "X-Kit-Api-Key": apiKey, "Content-Type": "application/json" };

  try {
    const createRes = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email_address: email }),
      signal: controller.signal,
    });
    if (!createRes.ok) {
      return {
        ok: false,
        status: createRes.status,
        error: `Kit create-subscriber error (${createRes.status}): ${await kitErrorDetail(createRes)}`,
      };
    }

    const formRes = await fetch(`${KIT_API_BASE}/forms/${formId}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email_address: email, referrer: referrer ?? null }),
      signal: controller.signal,
    });
    if (!formRes.ok) {
      return {
        ok: false,
        status: formRes.status,
        error: `Kit add-to-form error (${formRes.status}): ${await kitErrorDetail(formRes)}`,
      };
    }

    return { ok: true };
  } catch (e) {
    if ((e as Error).name === "AbortError") {
      return { ok: false, error: "Kit request timed out" };
    }
    return { ok: false, error: `Could not reach Kit: ${(e as Error).message}` };
  } finally {
    clearTimeout(timeout);
  }
}
