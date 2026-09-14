import sharp from "sharp";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function main() {
  const [label, outputPath] = process.argv.slice(2);
  if (!label || !outputPath) {
    console.error(
      'Usage: npx tsx scripts/generate-placeholder-image.ts "<label text>" <output-path.png>'
    );
    process.exit(1);
  }

  const width = 1600;
  const height = 900;
  const lines = wrapText(label, 40).slice(0, 3);
  const lineHeight = 56;
  const startY = height / 2 - ((lines.length - 1) * lineHeight) / 2 + 60;

  const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#131314" />
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#ffffff1a" stroke-width="2" />
  <g fill="none" stroke="#0099ff33" stroke-width="1.5">
    <circle cx="${width / 2}" cy="${height / 2 - 80}" r="60" />
    <circle cx="${width / 2}" cy="${height / 2 - 80}" r="90" />
    <circle cx="${width / 2}" cy="${height / 2 - 80}" r="120" />
  </g>
  <text x="${width / 2}" y="${height / 2 - 80 + 16}" text-anchor="middle" font-family="monospace" font-size="28" fill="#0099ff">PLACEHOLDER</text>
  ${lines
    .map(
      (line, i) =>
        `<text x="${width / 2}" y="${startY + i * lineHeight}" text-anchor="middle" font-family="sans-serif" font-size="40" font-weight="600" fill="#e5e2e3">${escapeXml(line)}</text>`
    )
    .join("\n  ")}
  <text x="${width / 2}" y="${height - 60}" text-anchor="middle" font-family="monospace" font-size="20" letter-spacing="2" fill="#bfc7d5">REPLACE IN STUDIO BEFORE PUBLISHING</text>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
  console.log(`Placeholder image written to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
