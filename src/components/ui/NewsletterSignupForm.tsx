"use client";

import { useState, type FormEvent } from "react";
import { BUTTON, FOCUS } from "@/components/ui/page-kit";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterSignupForm({
  /** Redirect here on success instead of showing the inline success message. */
  thankYouUrl,
  // TODO: replace with the real consent copy for this list.
  consentLabel = "I agree to receive marketing emails and can unsubscribe at any time.",
  className = "",
}: {
  thankYouUrl?: string;
  consentLabel?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const consent = data.get("consent") === "on";
    if (!consent) return;

    setStatus("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") || ""),
          consent,
          website: String(data.get("website") || ""),
        }),
      });
      const result = await res.json();

      if (result.ok) {
        if (thankYouUrl) {
          window.location.href = thankYouUrl;
          return;
        }
        setStatus("success");
        setMessage("You’re subscribed. Check your inbox.");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success" && !thankYouUrl) {
    return <p className={`font-body text-base text-foreground-muted ${className}`}>{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          className={`flex-1 rounded-full border border-border-hairline bg-white px-4 py-2 font-body text-base outline-none focus-visible:border-primary ${FOCUS}`}
        />
        <button type="submit" disabled={status === "submitting"} className={BUTTON}>
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>

      {/* Honeypot: visually hidden (not type="hidden" or display:none, which
          some bots skip) rather than removed from the tab order entirely. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <label className="flex items-start gap-2 font-body text-sm text-foreground-muted">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{consentLabel}</span>
      </label>

      {status === "error" && message && (
        <p className="font-body text-sm text-red-600" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
