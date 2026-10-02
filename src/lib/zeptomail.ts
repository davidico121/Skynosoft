const ZEPTOMAIL_API_URL = "https://api.zeptomail.com/v1.1/email";

export type SendPitchEmailInput = {
  toEmail: string;
  toName?: string;
  subject: string;
  /** Plain text body; converted to simple paragraph HTML before sending. */
  text: string;
};

export type SendPitchEmailResult = { ok: true } | { ok: false; error: string };

const SITE_URL = "https://www.skynosoft.net";

/**
 * Table-based layout with inline styles throughout: the only markup that
 * renders consistently across Gmail, Apple Mail and Outlook's desktop
 * (Word-based) rendering engine alike.
 */
function buildSignatureHtml(): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px; border-top:1px solid #e5e7eb; padding-top:16px; font-family:-apple-system,Helvetica,Arial,sans-serif;">
  <tr>
    <td style="padding-right:14px; vertical-align:top;">
      <img src="${SITE_URL}/brand/david-owoeye-avatar.jpg" width="54" height="54" alt="David Owoeye" style="display:block; width:54px; height:54px; border-radius:50%;" />
    </td>
    <td style="vertical-align:top;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:15px; line-height:1.3; font-weight:700; color:#14161a; padding-bottom:1px;">
            David Owoeye
            <img src="${SITE_URL}/brand/verified-badge.png" width="14" height="14" alt="Verified" style="vertical-align:middle; margin-left:3px;" />
          </td>
        </tr>
        <tr>
          <td style="font-size:13px; line-height:1.3; font-weight:600; color:#14161a; padding-bottom:1px;">DTC CRO &amp; Email Retention Specialist</td>
        </tr>
        <tr>
          <td style="font-size:13px; line-height:1.3; color:#5b6472; padding-bottom:2px;">Founder, Skynosoft Ltd.</td>
        </tr>
        <tr>
          <td style="font-size:13px; line-height:1.3;">
            <a href="https://www.linkedin.com/in/david-owoeye" style="color:#0099ff; text-decoration:none;">linkedin.com/in/david-owoeye</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function textToHtml(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("\n");
  return `<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; color: #14161a;">${paragraphs}${buildSignatureHtml()}</div>`;
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
