/**
 * Splits long copy into shorter paragraphs at sentence boundaries.
 * Text at or under `max` characters stays whole; otherwise sentences are
 * grouped into paragraphs of roughly `target` characters.
 */
export function splitParagraphs(text: string, max = 160, target = 160): string[] {
  if (text.length <= max) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+["”’]*\s*|[^.!?]+$/g)?.map((s) => s.trim()) ?? [text];
  const out: string[] = [];
  let current = "";
  for (const s of sentences) {
    if (current && (current + " " + s).length > target) {
      out.push(current);
      current = s;
    } else {
      current = current ? current + " " + s : s;
    }
  }
  if (current) out.push(current);
  return out;
}
