---
name: strategy-pdf-builder
description: Interview a team member through a full outreach audit (site CRO, email marketing, assets, angle) and turn it into a Skynosoft-branded strategy PDF they can send cold, no live web page, no deploy, no API key needed. Use when a team member wants to build a client pitch document themselves inside a Claude session, or asks "help me pitch this brand" / "build a strategy PDF for X".
---

# Strategy PDF Builder

The web-tool version of this (a password-gated form at strategy.skynosoft.net)
needs an Anthropic API key we don't have yet. This is the API-key-free
alternative: any team member with a Claude session that has this repo
attached runs this skill, answers a structured interview, and gets back a
Skynosoft-branded HTML file plus a converted PDF they can send directly to a
prospect. No live URL, no deploy, no Sanity write, no app to host.

This is a sibling of `strategy-pitch-builder` (which builds the real
`strategy.skynosoft.net/<slug>` pages). Reuse that skill's hard rules, the
six agreements framework, and the Voice section wherever they aren't
repeated here, they apply unchanged. The difference is the output: a
standalone document instead of a deployed Next.js page, so it works for
anyone with Claude access and no codebase write access.

## Hard rules (same spirit as `strategy-pitch-builder`, read that skill's full list too)

1. **Nothing invented.** Every claim, number, or quote in the PDF must come
   from what the team member actually saw/verified, or from a real
   Skynosoft case study. If they didn't check something, don't assert it,
   ask them or mark it as an estimate.
2. **The team member did the audit, not you.** Do not browse the
   prospect's site yourself and invent findings. Your job is to interview
   them, structure what they tell you, and write it up. If they paste a
   URL and ask you to also look, you can (Playwright, same tooling as
   `ecommerce-performance-audit`), but their own eyes are the primary
   source, always ask for their notes first.
3. **No fabricated client results or named competitors**, same rule as
   `strategy-pitch-builder`. Real Skynosoft case studies only
   (`src/lib/content.ts`), and only name a competitor's tactic if the team
   member confirms it's real and they've verified it.
4. **No em dashes, no hyphens in copy** (write "win back," not "win-back").
   No AI cliches ("elevate," "seamless," "unleash"). Match the Voice
   section below.
5. **The PDF must look like it came from Skynosoft.** Brand fonts, brand
   colors, the real logo, not a generic document template. Section 4
   covers exactly how.

## The interview (ask one phase at a time, do not skip ahead)

Run this as an actual back and forth, not one giant form dump. Wait for
each answer before moving to the next phase. If the team member already
dumped everything in one message, skip straight to compiling, but still
confirm anything ambiguous before writing.

### Phase 0: The basics
- Brand name and site URL.
- Who's sending this (team member's name, for the sign off).

### Phase 1: Site / CRO audit
Ask them to actually browse the live site and tell you what they saw.
Prompt with the same checklist `ecommerce-performance-audit` uses, so they
don't miss the useful stuff:
- Homepage: hero, nav, any popup or signup offer, how fast it feels.
- Out of stock handling, if relevant: notify me capture, or nothing.
- Cart and checkout: how many steps, guest checkout, shipping cost shown
  upfront.
- Mobile: does it hold up at phone width.
- Reviews: are there any, do they suggest real demand.
- Anything else that jumped out, good or bad.

If they offer to let you also look (and give you the URL), you can verify
with Playwright, same tooling note as `strategy-pitch-builder`'s Tooling
section. But always ask for their own notes first, their judgment on what
matters to a human visitor is the point.

### Phase 2: Email marketing audit
Ask them to actually sign up for the brand's list themselves (popup or
footer form) and report back:
- Did a popup appear, what did it offer, what did it look like.
- Did the welcome email arrive, how long did it take.
- What does the welcome email actually say and show, screenshot if
  possible (see Phase 3).
- Is there a clear next action in it, or does it bury the offer.
- Anything else: tone, design quality, broken links, no email at all.

### Phase 3: Assets
Ask if they have anything to show on the page:
- Their own redesign mockups (email templates, popup designs).
- A screenshot of the prospect's current email/popup, for a side by side.
- Anything else visual that proves the point.
Have them attach files directly in the chat. Note where each one should
go (hero visual, before/after comparison, inline proof) as they're
uploaded. If they have nothing yet, that's fine, the page works without
visuals, just proof points and copy (same as the live template's optional
fields).

### Phase 4: Strategic angle
- CRO pitch, email marketing pitch, or both.
- Any timing/urgency angle: BFCM, Q1 reset, rising ad costs, a seasonal
  moment, or none.
- Anything else they specifically want emphasized or avoided.

### Phase 5: Compile
Confirm you have enough for every required section (see Section 3), then
build. Don't ask permission to proceed if everything's answered, just say
what you're about to build and go.

## Section 2: Voice

Same register as `strategy-pitch-builder`'s Voice section (short stacked
sentences, blunt reframes, numbers walked as prose math, no corporate
hedging). For the pitch email specifically (Section 5), match the rhythm
of the reference email in `references/pitch-email-examples.md`: a
one-line hook, a specific observation about their actual site, the
mechanism of why it's costing them money, a credible but not overclaimed
fix, a low pressure call to action, a PS that removes the sales-call
anxiety.

## Section 3: Page structure

Build these sections, in order, into one HTML file. Pull directly from
`references/pitch-template.html`, which has the full markup, brand CSS
tokens (colors, Sora/Hanken Grotesk/JetBrains Mono), and placeholder
comments showing exactly what goes where. Don't redesign it from scratch,
fill it in.

1. **Header**: Skynosoft logo (embed from `public/brand/skynosoft-logo-horizontal.png`), "A note for `<Brand>`", date.
2. **Hero**: headline (outcome for their customers), one to two sentence
   subheading naming something specific and real, CTA line (their
   Calendly link as text, PDFs can't do live buttons).
3. **The gap**: 3 step journey of what happens today (first touch, the
   moment that should trigger something, what actually happens, which is
   nothing), same shape as the live template's `gap` section.
4. **Problem / solution**: the problem as one real scene from Phase 1/2
   notes, 3 to 5 solution points as reframes not features.
5. **Benefits**: 3 to 5 outcome led items. Include uploaded assets here if
   any (before/after, mockups) per Phase 3.
6. **Proof**: 1 to 2 real Skynosoft case studies, closest category first,
   pulled from `src/lib/content.ts`, with their real metrics. Never
   invent a result.
7. **The ask**: how it works (a short numbered plan), the risk reversal
   line ("see the plan before you spend anything" pattern), closing
   statement, sign off (team member's name, title, Skynosoft).

Run every section through the six agreements checklist from
`strategy-pitch-builder`'s SKILL.md before finalizing (this is for me,
this problem matters, current approach won't fix it, there's a better
way, this will work for me, can't keep putting this off). Bold one key
phrase per block for skimmability, same principle as the live site, but
this is static HTML with no markdown parser: write the bold phrase
directly as `<strong>...</strong>` in the filled template, not as
`**asterisks**`.

## Section 4: Building the HTML and PDF

1. Copy `references/pitch-template.html` to the scratchpad, fill in every
   placeholder with real content from the interview.
2. Embed the brand fonts. The three files are already in this skill's
   `assets/fonts/` (`sora.woff2`, `hanken.woff2`, `jetbrains.woff2`), no
   network fetch needed. Run:
   ```
   python3 .claude/skills/strategy-pdf-builder/scripts/embed-assets.py <your-filled-html> <output-html>
   ```
   This base64-embeds the three fonts, the Skynosoft logo
   (`public/brand/skynosoft-logo-horizontal.png`), and any uploaded
   asset images you reference by local path with an
   `<!-- EMBED: /path/to/file.jpg -->` comment directly above the `<img>`
   tag (see the template for the exact pattern). Output is one
   self-contained HTML file, nothing loads from the network.
3. Convert to PDF:
   ```
   bash .claude/skills/strategy-pdf-builder/scripts/render-pdf.sh <output-html> <final.pdf>
   ```
   This finds a local headless Chromium (checks the common install paths
   this environment uses, falls back to `google-chrome`/`chromium` on
   PATH) and prints the HTML straight to PDF. If no browser is found, it
   says so, hand the user the HTML file directly instead and tell them to
   print it to PDF from their own browser (Cmd/Ctrl+P, "Save as PDF").
4. Read the PDF back (the `Read` tool opens PDFs directly) to sanity
   check pagination: headings shouldn't be orphaned at the bottom of a
   page, tables/sections shouldn't split awkwardly. The template's
   `@media print` rules handle most of this, but check the real output.
5. Send both files to the user (`SendUserFile`), the PDF as the primary
   deliverable, the HTML in case they want to tweak and reprint it
   themselves later.

## Section 5: The pitch email

Once the PDF is approved, offer to draft the cold email too (same
information, no new interview needed). Follow `references/pitch-email-
examples.md` for structure and voice. Always hand it back as a draft for
the team member to read, edit, and send themselves, never send anything
automatically, there's no email sending set up here and there shouldn't
be: a human reads every cold email before it goes out.

Required shape (from the reference example):
1. A specific, real hook: something you noticed on their actual site or in
   their actual welcome email, not a generic opener.
2. What's genuinely working (if true), this earns the right to critique.
3. The specific problem, in plain mechanical terms: what's happening, why
   it's costing them money.
4. The fix, framed as a reasonable next step, not a hard sell.
5. A credible but honestly caveated result estimate ("typically unlocks
   X" or "based on brands I've worked with", never a guaranteed number).
6. A low pressure call to action: a specific Calendly link, phrased as a
   quick call, not a commitment.
7. A PS that defuses sales anxiety (the reference example: "not a sales
   pitch, no need to bring your card").

Sign off with the team member's real name and title, not David's, unless
David is the one running the skill.

## Learnings log

Add newest first: a rule that would have saved time, a template section
that needed extending, a PDF pagination fix, a copy pattern that worked
well in a real reply.

- 2026-10-03: First build. Font embedding and the headless Chromium print
  recipe are carried over directly from the MaxSleek report build (same
  session): base64 the three woff2s as `@font-face` data URIs so nothing
  depends on network access, then `chrome --headless --disable-gpu
  --no-sandbox --print-to-pdf`. Confirmed working end to end in this
  environment.
