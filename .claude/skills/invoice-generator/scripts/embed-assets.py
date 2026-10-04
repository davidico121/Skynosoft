#!/usr/bin/env python3
"""
Embeds every external asset a strategy PDF page needs so the resulting
HTML file is fully self-contained (no network access needed to render or
print it, anywhere, ever) and does NOT depend on the Skynosoft repo being
present on disk, only on this skill's own folder. That makes the skill
safe to export and install standalone (e.g. as a claude.ai custom Skill),
not just inside a Claude Code session with the repo attached.

Replaces, in the given HTML:
  - __FONT_SORA_B64__, __FONT_HANKEN_B64__, __FONT_JETBRAINS_B64__
    with base64 of this skill's bundled font files (assets/fonts/).
  - Any <img> immediately preceded by <!-- EMBED: path --> gets its src
    swapped for a base64 data URI of that file. Two path forms:
      - "skill:brand/logo.png" resolves inside this skill's own
        assets/ folder, wherever the skill actually lives. Use this for
        the Skynosoft logo and David's default sign off photo, both
        bundled in assets/brand/, so the template never depends on the
        Skynosoft repo's public/brand/ existing on disk.
      - any other path (absolute, or relative) resolves against the
        current working directory, for a real per-brand asset the team
        member uploaded this session (a mockup, a screenshot, a
        different sender's photo).

Usage:
  python3 embed-assets.py <input.html> <output.html>
"""
import base64
import mimetypes
import re
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parents[1]  # .../strategy-pdf-builder


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

    def resolve_path(raw_path: str) -> Path:
        if raw_path.startswith("skill:"):
            return SKILL_DIR / "assets" / raw_path[len("skill:"):]
        p = Path(raw_path)
        return p if p.is_absolute() else Path.cwd() / p

    def embed_image(match: "re.Match[str]") -> str:
        embed_comment_body, prefix, _old_src, suffix = match.groups()
        raw_path = embed_comment_body.split()[0] if embed_comment_body.split() else ""
        img_path = resolve_path(raw_path)
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
