import { splitParagraphs } from "@/lib/paragraphs";

/** Renders long copy as several short paragraphs; `className` styles each one. */
export function Paragraphs({
  text,
  className = "",
  gap = "mt-4",
  quote = false,
}: {
  text: string;
  className?: string;
  gap?: string;
  quote?: boolean;
}) {
  return (
    <>
      {splitParagraphs(text).map((p, i, all) => (
        <p key={i} className={`${i > 0 ? gap : ""} ${className}`}>
          {quote && i === 0 ? "\u201c" : ""}
          {p}
          {quote && i === all.length - 1 ? "\u201d" : ""}
        </p>
      ))}
    </>
  );
}
