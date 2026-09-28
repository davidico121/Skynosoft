import { Fragment, type ReactNode } from "react";

/**
 * Parses `**bold**` markers in plain copy into <strong> spans, for the
 * "bold key phrase" skimmability pattern (see landing-page-design A5:
 * "Bold benefit, then the proof or detail"). Not full markdown, just this
 * one marker, so content stays plain strings in strategy.ts / content.ts.
 */
export function renderRich(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
