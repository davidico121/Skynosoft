#!/usr/bin/env bash
# Prints a (self-contained) HTML file to PDF via a local headless Chromium.
# Usage: render-pdf.sh <input.html> <output.pdf>
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: render-pdf.sh <input.html> <output.pdf>" >&2
  exit 1
fi

INPUT_HTML="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUTPUT_PDF="$2"

# Try common install locations/names, in order. Playwright's bundled
# Chromium is what this skill was built and tested against.
CANDIDATES=(
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
  "$(find /opt/pw-browsers -maxdepth 2 -iname chrome -type f 2>/dev/null | head -1)"
  "$(command -v google-chrome 2>/dev/null || true)"
  "$(command -v chromium 2>/dev/null || true)"
  "$(command -v chromium-browser 2>/dev/null || true)"
)

CHROME_BIN=""
for c in "${CANDIDATES[@]}"; do
  if [ -n "$c" ] && [ -x "$c" ]; then
    CHROME_BIN="$c"
    break
  fi
done

if [ -z "$CHROME_BIN" ]; then
  echo "No local headless Chromium found. Hand the user the HTML file directly" >&2
  echo "and tell them to print it to PDF from their own browser (Cmd/Ctrl+P," >&2
  echo "then Save as PDF)." >&2
  exit 2
fi

"$CHROME_BIN" \
  --headless --disable-gpu --no-sandbox \
  --print-to-pdf="$OUTPUT_PDF" \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=10000 \
  "file://$INPUT_HTML" 2>&1 | grep -v -E "dbus|ERROR:net/socket" || true

if [ -f "$OUTPUT_PDF" ]; then
  echo "Wrote $OUTPUT_PDF"
else
  echo "PDF was not created, check the Chromium output above." >&2
  exit 3
fi
