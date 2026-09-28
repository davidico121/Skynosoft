"use client";

import { useEffect, useState } from "react";
import { FOCUS } from "@/components/ui/page-kit";

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
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    // Calendly's own booking bundle is several MB, so a slow connection can
    // leave the iframe blank for a while even though nothing is broken.
    // After a few seconds, offer the direct link as a faster way out.
    const timer = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div
        className="overflow-hidden rounded-xl border border-border-hairline bg-card"
        style={{ minHeight: height }}
      >
        <iframe
          src={url}
          width="100%"
          height={height}
          className="block"
          title="Book a call with Skynosoft"
          loading={lazy ? "lazy" : "eager"}
        />
      </div>
      <p className="mt-6 font-body text-sm text-foreground-muted">
        {slow ? "Still loading? Calendly can take a few seconds on a slower connection. " : "Trouble loading the calendar? "}
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
