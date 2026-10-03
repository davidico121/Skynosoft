import { splitParagraphs } from "@/lib/paragraphs";
import { renderRich } from "@/lib/richText";

/**
 * Renders long copy as several short paragraphs; `className` styles each one.
 * Pass a lower `max`/`target` (e.g. 90) for punchier, LinkedIn caption style
 * pacing, one or two short sentences per line instead of a denser block.
 */
export function Paragraphs({
  text,
  className = "",
  gap = "mt-4",
  quote = false,
  max,
  target,
}: {
  text: string;
  className?: string;
  gap?: string;
  quote?: boolean;
  max?: number;
  target?: number;
}) {
  return (
    <>
      {splitParagraphs(text, max, target).map((p, i, all) => (
        <p key={i} className={`${i > 0 ? gap : ""} ${className}`}>
          {quote && i === 0 ? "\u201c" : ""}
          {renderRich(p)}
          {quote && i === all.length - 1 ? "\u201d" : ""}
        </p>
      ))}
    </>
  );
}
