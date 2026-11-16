"use client";

import { useState, type FormEvent } from "react";
import { BUTTON, FOCUS } from "@/components/ui/page-kit";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD = `w-full rounded-xl border border-border-hairline bg-white px-4 py-3 font-body text-base outline-none focus-visible:border-primary ${FOCUS}`;

export function ProposalMessageForm({ proposal }: { proposal: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("submitting");
    setMessage(null);

    try {
      const res = await fetch("/api/proposal-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
          proposal,
        }),
      });
      const result = await res.json();
      if (result.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please email david@skynosoft.net instead.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border-hairline bg-white p-8" role="status">
        <p className="font-heading text-2xl font-semibold">Message sent. Thank you.</p>
        <p className="mt-3 font-body text-base text-foreground-muted">
          David will reply to your email, usually the same day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 font-body text-sm font-semibold">
          Your name
          <input name="name" autoComplete="name" className={FIELD} />
        </label>
        <label className="flex flex-col gap-2 font-body text-sm font-semibold">
          Your email
          <input type="email" name="email" required autoComplete="email" className={FIELD} />
        </label>
      </div>
      <label className="flex flex-col gap-2 font-body text-sm font-semibold">
        Your message or question
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Ask anything: the packages, your budget, timing, what you need from us…"
          className={`${FIELD} resize-y`}
        />
      </label>

      {/* Honeypot: visually hidden rather than type="hidden", which some bots skip. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {status === "error" && message && (
        <p className="font-body text-sm text-red-600" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`self-start px-6 py-3 ${BUTTON}`}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
