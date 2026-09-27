"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { BUTTON, FOCUS } from "@/components/ui/page-kit";

/**
 * Loads the Calendly widget only after the visitor asks for it, so no third party
 * cookies are set on page load.
 */
export function CalendlyEmbed({ url, height = 700 }: { url: string; height?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border-hairline bg-card">
        {loaded ? (
          <iframe
            src={url}
            width="100%"
            height={height}
            className="block"
            title="Book a call with Skynosoft"
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center px-6 py-16 text-center"
            style={{ minHeight: height }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary-soft">
              <CalendarBlank size={24} weight="duotone" aria-hidden />
            </span>
            <h2 className="mt-6 font-heading text-2xl font-semibold text-balance">
              Pick a time that suits you
            </h2>
            <p className="mt-4 max-w-[420px] font-body text-base text-foreground-muted text-pretty">
              The calendar is provided by Calendly. Loading it lets Calendly set its own cookies.
              Read our{" "}
              <Link
                href="/privacy"
                className={`rounded text-primary-soft underline underline-offset-4 ${FOCUS}`}
              >
                privacy policy
              </Link>{" "}
              for details.
            </p>
            <button type="button" onClick={() => setLoaded(true)} className={`mt-8 ${BUTTON}`}>
              Load the booking calendar
            </button>
          </div>
        )}
      </div>
      <p className="mt-6 font-body text-sm text-foreground-muted">
        Prefer not to load it here?{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded text-primary-soft underline underline-offset-4 ${FOCUS}`}
        >
          Open Calendly in a new tab
        </a>
        .
      </p>
    </div>
  );
}
