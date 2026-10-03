"use client";

import { useActionState, useEffect, useRef } from "react";
import { logout, sendEmailAction, type SendState } from "./actions";

const initialState: SendState = {};

export function ComposeForm() {
  const [state, formAction, pending] = useActionState(sendEmailAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">Send a pitch email</h1>
        <form action={logout}>
          <button type="submit" className="font-body text-sm text-foreground-muted underline">
            Sign out
          </button>
        </form>
      </div>

      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="font-body text-sm text-foreground-muted">To (email)</span>
            <input
              type="email"
              name="toEmail"
              required
              placeholder="contact@brand.com"
              className="rounded-lg border border-border-hairline bg-white px-3 py-2 font-body text-base outline-none focus-visible:border-primary"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-body text-sm text-foreground-muted">To (name, optional)</span>
            <input
              type="text"
              name="toName"
              placeholder="Brand Nutrition"
              className="rounded-lg border border-border-hairline bg-white px-3 py-2 font-body text-base outline-none focus-visible:border-primary"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-body text-sm text-foreground-muted">Subject</span>
          <input
            type="text"
            name="subject"
            required
            placeholder="I built you a welcome email"
            className="rounded-lg border border-border-hairline bg-white px-3 py-2 font-body text-base outline-none focus-visible:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-body text-sm text-foreground-muted">Message</span>
          <textarea
            name="body"
            required
            rows={14}
            placeholder="Hi,&#10;&#10;I signed up through your footer newsletter form last week..."
            className="rounded-lg border border-border-hairline bg-white px-3 py-2 font-body text-base outline-none focus-visible:border-primary"
          />
          <span className="font-body text-xs text-foreground-muted">
            Plain text. Blank lines become paragraph breaks.
          </span>
        </label>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 font-body text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
        {state?.success && (
          <p className="rounded-lg bg-growth-green/10 px-3 py-2 font-body text-sm text-growth-green" role="status">
            Sent.
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 self-start rounded-full bg-primary px-5 py-2 font-body text-base font-semibold text-white transition-opacity hover:bg-primary/90 disabled:opacity-50"
        >
          {pending ? "Sending..." : "Send email"}
        </button>
      </form>
    </div>
  );
}
