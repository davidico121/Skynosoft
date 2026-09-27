"use client";

import { useState } from "react";
import { EASE, FOCUS } from "@/components/ui/page-kit";

export function CalendlyEmbed({
  url,
  height = 700,
  lazy = false,
}: {
  url: string;
  height?: number;
  /** Defer loading until the embed is near the viewport (use when it sits far down the page). */
  lazy?: boolean;
}) {
  const [ready, setReady] = useState(false);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-xl border border-border-hairline bg-card"
        style={{ minHeight: height }}
      >
        {/* Placeholder shaped like the calendar, shown until Calendly finishes loading. */}
        <div
          aria-hidden={ready}
          className={`absolute inset-0 flex flex-col gap-6 p-8 transition-opacity duration-500 ${EASE} ${
            ready ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="h-6 w-1/3 animate-pulse rounded-full bg-surface-container" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-surface-container" />
          <div className="mt-4 grid flex-1 grid-cols-7 gap-3">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-surface-container" />
            ))}
          </div>
          <p className="text-center font-body text-sm text-foreground-muted">
            Loading the booking calendar
          </p>
        </div>
        <iframe
          src={url}
          width="100%"
          height={height}
          className="relative block"
          title="Book a call with Skynosoft"
          loading={lazy ? "lazy" : "eager"}
          onLoad={() => setReady(true)}
        />
      </div>
      <p className="mt-6 font-body text-sm text-foreground-muted">
        Trouble loading the calendar?{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded text-primary-soft underline underline-offset-4 ${FOCUS}`}
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
}
