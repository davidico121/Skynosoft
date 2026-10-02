const ZEPTOMAIL_API_URL = "https://api.zeptomail.com/v1.1/email";

export type SendPitchEmailInput = {
  toEmail: string;
  toName?: string;
  subject: string;
  /** Plain text body; converted to simple paragraph HTML before sending. */
  text: string;
};

export type SendPitchEmailResult = { ok: true } | { ok: false; error: string };

function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("\n");
  return `<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #14161a;">${paragraphs}</div>`;
}

export async function sendPitchEmail(input: SendPitchEmailInput): Promise<SendPitchEmailResult> {
  const token = process.env.ZEPTOMAIL_TOKEN;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
  const fromName = process.env.ZEPTOMAIL_FROM_NAME || "David Owoeye";

  if (!token || !fromEmail) {
    return {
      ok: false,
      error:
        "ZeptoMail is not configured. Set ZEPTOMAIL_TOKEN and ZEPTOMAIL_FROM_EMAIL in the environment.",
    };
  }

  let res: Response;
  try {
    res = await fetch(ZEPTOMAIL_API_URL, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { address: fromEmail, name: fromName },
        to: [
          {
            email_address: {
              address: input.toEmail,
              name: input.toName || input.toEmail,
            },
          },
        ],
        subject: input.subject,
        htmlbody: textToHtml(input.text),
      }),
    });
  } catch (e) {
    return { ok: false, error: `Could not reach ZeptoMail: ${(e as Error).message}` };
  }

  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data?.message || JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    return { ok: false, error: `ZeptoMail error (${res.status}): ${detail}` };
  }

  return { ok: true };
}
