#!/usr/bin/env python3
"""
Embeds every external asset a strategy PDF page needs so the resulting
HTML file is fully self-contained (no network access needed to render or
print it, anywhere, ever).

Replaces, in the given HTML:
  - __FONT_SORA_B64__, __FONT_HANKEN_B64__, __FONT_JETBRAINS_B64__
    with base64 of this skill's bundled font files (assets/fonts/).
  - __LOGO_B64__ with base64 of the repo's real Skynosoft logo
    (public/brand/skynosoft-logo-horizontal.png).
  - Any <img> immediately preceded by <!-- EMBED: /path/to/file.jpg -->
    gets its src swapped for a base64 data URI of that local file.
    Path is resolved relative to the current working directory, or as
    given if absolute.

Usage:
  python3 embed-assets.py <input.html> <output.html>
"""
import base64
import mimetypes
import re
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parents[1]  # .../strategy-pdf-builder
REPO_ROOT = SKILL_DIR.parents[2]  # strategy-pdf-builder -> skills -> .claude -> repo root


def b64_file(path: Path) -> str:
    return base64.b64encode(path.read_bytes()).decode("ascii")


def main():
    if len(sys.argv) != 3:
        print("Usage: python3 embed-assets.py <input.html> <output.html>", file=sys.stderr)
        sys.exit(1)

    src_path = Path(sys.argv[1])
    out_path = Path(sys.argv[2])
    html = src_path.read_text()

    fonts_dir = SKILL_DIR / "assets" / "fonts"
    replacements = {
        "__FONT_SORA_B64__": b64_file(fonts_dir / "sora.woff2"),
        "__FONT_HANKEN_B64__": b64_file(fonts_dir / "hanken.woff2"),
        "__FONT_JETBRAINS_B64__": b64_file(fonts_dir / "jetbrains.woff2"),
    }

    logo_path = REPO_ROOT / "public" / "brand" / "skynosoft-logo-horizontal.png"
    if logo_path.exists():
        replacements["__LOGO_B64__"] = b64_file(logo_path)
    elif "__LOGO_B64__" in html:
        print(f"Warning: logo not found at {logo_path}, __LOGO_B64__ left unreplaced", file=sys.stderr)

    for placeholder, b64 in replacements.items():
        html = html.replace(placeholder, b64)

    # Embed any image flagged with an <!-- EMBED: path --> comment directly
    # above its <img> tag. The path is the first whitespace-delimited token
    # after "EMBED:", so a trailing note in the same comment (e.g.
    # "<!-- EMBED: foo.jpg, replace with the real one -->") doesn't break it.
    embed_pattern = re.compile(
        r'<!--\s*EMBED:\s*(.*?)\s*-->(\s*<img\b[^>]*?\bsrc=")([^"]*)(")',
        re.IGNORECASE | re.DOTALL,
    )

    missing = []

    def embed_image(match: "re.Match[str]") -> str:
        embed_comment_body, prefix, _old_src, suffix = match.groups()
        raw_path = embed_comment_body.split()[0] if embed_comment_body.split() else ""
        img_path = Path(raw_path)
        if not img_path.is_absolute():
            img_path = Path.cwd() / img_path
        if not img_path.exists():
            missing.append(raw_path)
            return match.group(0)
        mime, _ = mimetypes.guess_type(str(img_path))
        mime = mime or "application/octet-stream"
        data = b64_file(img_path)
        return f"{prefix}data:{mime};base64,{data}{suffix}"

    html = embed_pattern.sub(embed_image, html)

    remaining_placeholders = re.findall(r"__[A-Z_]+_B64__", html)
    if remaining_placeholders:
        print(f"Warning: unresolved placeholders left in output: {set(remaining_placeholders)}", file=sys.stderr)
    if missing:
        print(f"Warning: EMBED comment pointed at missing file(s): {missing}", file=sys.stderr)

    out_path.write_text(html)
    print(f"Wrote {out_path} ({len(html)} bytes)")


if __name__ == "__main__":
    main()
