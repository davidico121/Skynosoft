---
name: blog-writer
description: Research a ranked blog topic idea for skynosoft, write a full SEO and AI-answer-engine-optimised post with images, and create it as an unpublished draft in Sanity for human review. Use when the user asks to write, research, or draft a new skynosoft blog post, or asks "what should I blog about".
---

# Skynosoft Blog Writer

Writes one blog post at a time for skynosoft.vercel.app (an ecommerce growth
agency: website design/CRO, email & SMS marketing, full growth partnerships)
and lands it as a **draft** in Sanity — never published live. The human
always reviews and publishes it themselves in `/studio`.

Adapted from a general ecommerce-blog content-engine skill (research → gate
→ write → gate → publish) for a services agency on Next.js + Sanity instead
of a Shopify product store: internal links drive to `/services` and
`/work/<case-study>` (the conversion path here is a booked call, not a
checkout). The page template already renders a single "Book a Call / Audit"
CTA on every post automatically — no need to hand-build a closing CTA in
the body. (A multi-card "pick a service" version was tried and reverted:
that pattern only makes sense for a product catalog with distinct SKUs to
choose between, not a services agency with one real conversion action.
Keep the closing CTA singular.)

Body content also supports comparison tables and inline CTA cards natively
(see step 5) — modeled on a reference ecommerce blog post the user liked
(getdosed.co), adapted for services instead of products.

## Hard rules

1. **Never auto-publish.** Every document this skill creates must use
   `_id: "drafts.<slug>"` via `scripts/create-blog-draft.ts`. Never write a
   document without the `drafts.` prefix. Publishing is the human's decision.
2. **Never invent internal link targets.** Valid links are exactly:
   - `/services` (single page — there is no `/services/<slug>` route)
   - `/work/aurelle-skincare`, `/work/north-fields-supplements`,
     `/work/haven-home`, `/work/lumen-fashion` (check `src/lib/content.ts`
     for the current list — it may have grown since this was written)
   - `/contact`
   - Other posts already in Sanity, for related-topic cross-linking
   Do not link to a service or case-study slug that doesn't actually exist.
3. **Every image needs real, descriptive alt text before it's referenced.**
   The schema requires it (`src/sanity/schemaTypes/blogPost.ts`).
4. **Genuine insight over volume.** Google's Helpful Content Update
   penalizes scaled, low-substance publishing (see the SEO audit context
   from earlier in this project). Each post must contain something specific
   — a framework, a number, a named tradeoff — not generic restated advice.
   One well-researched post beats three thin ones.
5. **Confirm before spending money.** Image generation via Higgsfield costs
   credits. Use `get_cost: true` first if unsure, and don't generate more
   than 1-2 images per post without the user asking for more.
6. **No em-dashes anywhere** — title, excerpt, body, alt text, captions. It
   reads as an AI tell. Use a comma, full stop, colon, or brackets instead.
   Also avoid en-dash ranges ("5 to 10", not "5–10"). Check the final draft
   for "—" and "–" before creating it in Sanity.
7. **No fabricated facts, quotes, stats, or testimonials.** Cite a real
   source for a claim where it matters, or state the reasoning plainly
   instead of inventing a number.

## Workflow

### 1. Ground in the real brand

Read `src/lib/content.ts` for the actual services, case studies, and their
current copy/metrics. Read existing posts (`allBlogPostsQuery` via
`src/sanity/client.ts`) to match voice and avoid repeating a topic already
covered.

### 2. Research (free methods first)

Write about what people actually search and ask, not what you assume.

- **Read what's already ranking.** Search the topic, note the angle and
  H2 structure of the top few results, and find the gap they leave.
- **Harvest real questions.** Autocomplete and "People Also Ask"-style
  questions for the topic become your H2s and FAQ block.
- **Mine voice-of-customer language.** Forums, Reddit, review language.
  Reuse the exact words customers use.
- **Check what AI engines currently say** for the target question, and aim
  to be a more specific, better-structured source.
- Estimate demand qualitatively (no Keyword Planner/Ahrefs/Semrush
  connected here) — say so rather than inventing a search-volume number.

Output of this phase: a primary keyword/topic, the search intent
(informational vs commercial), a cluster of supporting questions, and the
best-fit post style (see the table below).

### 3. Ranked ideas, then Gate 1

Turn research into a ranked shortlist (3-5 ideas). For each: a real working
title, the style, the primary angle, why it earns the click, which
service/case-study it links to, and a priority.

**Gate 1 — stop and get sign-off before writing anything:**
- Confirm the exact title and style (offer 2-4 concrete headline options if
  the user only named a topic — never invent the final headline yourself).
- Confirm which service page and/or case study it links to.
- Confirm the image plan: how many images, roughly what they show.

### 4. Pick a style

| If the topic looks like... | Use style |
|---|---|
| "top / best ways to" | Listicle |
| "how to / how do I" | How-to |
| "X vs Y" / "best X for Y" | Comparison (comparison table mandatory) |
| "what is / why does / how long" | Question/FAQ (answer in the first 40-60 words) |
| "complete guide / everything about" | Ultimate guide / pillar |
| "why is my X not working / myths about" | Myth-busting / problem-solver |

Every style still obeys the universal rules below. (Advertorials and
influencer-authority posts are out of scope for this skill — skynosoft
doesn't run paid-traffic landing pages currently; ask the user explicitly
if one is ever wanted, since it needs different discovery/legal handling.)

### 5. Write the post

Universal rules, non-negotiable:

- **Answer-first opening.** The first 50-200 words directly answer the
  post's core question. No slow warmup — this is what gets cited by AI
  engines and wins featured snippets.
- **Length**: 1,000-1,500 words (pillar guides can run longer).
- **Question-style H2s** that mirror how people actually search. A table
  of contents ("In this article") auto-generates from H2/H3 headings and
  shows whenever a post has 2 or more — no extra field needed, just use
  real headings.
- **At least one concrete framework, table, or checklist** — something
  structured, not just prose.
- **An FAQ section of 3-6 real questions** near the end. Single highest-
  leverage element for getting cited by AI answer engines.
- **Specific, definitive statements** — numbers, timeframes, named
  tradeoffs. Cite a source where a claim benefits from one.
- **1-2 internal links** (see valid targets above) placed naturally where
  they support the content, not bolted on.
- Natural keyword use in title, first paragraph, one H2, slug, and excerpt.
  Never stuff.
- Brand voice: direct, specific, no agency fluff ("innovative solutions",
  "seamless experience"). Helpful first, selling woven in.

**Fields:**
- **Title**: front-loaded with the primary phrase, ~50-60 characters where
  possible.
- **Slug**: kebab-case, matches the title's core phrase.
- **Category**: one of `CRO`, `Website Design`, `Email Marketing`,
  `Strategy` (matches the schema's fixed list — do not invent a new one).
- **Excerpt**: 150-160 characters, doubles as the meta description shown
  in Google/social previews. Proofread it twice (a past post shipped with
  "branda"/"thingk" typos).
- **Author**: defaults to "The Skynosoft Team" — only set something else if
  the user explicitly names a real person.
- **Body**: Portable Text — a JSON array of block objects matching Sanity's
  editor shape (`{_type: "block", style: "h2", children: [{_type: "span",
  text: "..."}]}`, `style: "normal"` for paragraphs, `style: "blockquote"`
  for a styled callout box, links as marks with an annotation). Inline
  images use `{_type: "image", asset: {...}, alt: "..."}` from the upload
  script's output, plus an optional `"caption": "..."` field — `alt` is
  invisible (screen readers/SEO only), `caption` renders visually beneath
  the image as italic text. Only add a caption when it genuinely adds
  context (a source, a specific detail); don't caption every image just
  because the field exists. Two more block types render natively:

  **Comparison table** — mandatory for the Comparison style, optional
  elsewhere when it genuinely clarifies a tradeoff:
  ```json
  {
    "_type": "table",
    "_key": "unique-key",
    "headers": ["Option", "Cost", "Effort"],
    "rows": [
      { "_key": "r1", "cells": ["Option A", "$9.95", "Low"], "highlighted": true },
      { "_key": "r2", "cells": ["Option B", "$4.95", "Medium"], "highlighted": false }
    ]
  }
  ```
  Set `highlighted: true` on at most one row (the recommended option) — it
  renders with a tint and a star on the first cell. Don't overuse it.

  **Inline CTA card** — a highlighted mid-post callout linking to a
  specific service or case study (the services-agency analog of a product
  card). Use 0-1 per post, only where the content naturally calls for it:
  ```json
  {
    "_type": "ctaCard",
    "_key": "unique-key",
    "heading": "See it in action",
    "body": "One sentence of context for the link.",
    "linkHref": "/work/north-fields-supplements",
    "linkLabel": "See the case study"
  }
  ```
  `linkHref` must be one of the valid targets in hard rule 2.

### 6. Get or generate images

**Prefer real images the user provides from their own work** (their own
client screenshots, dashboards, email designs, before/afters) over
generated ones whenever available — ask if they have something relevant
for a given post before generating. These are genuinely real and carry no
copyright risk since it's their own work.

**Never use real screenshots of third-party products, tools, or other
brands' actual emails/websites pulled from the internet.** Using another
company's copyrighted/trademarked UI or someone else's real creative in
our content without permission is a real legal risk (copyright, and it
can look like a false endorsement) — don't do this even if asked, without
first flagging the risk clearly and getting explicit confirmation.

When generating is the right call: skynosoft is a services brand, not a
physical product — default to conceptual/editorial images (not stock-photo
cliché) matching the site's dark, blue/teal aesthetic
(`src/app/(site)/globals.css` has the palette). When the user wants a more
realistic look (a screen showing a dashboard, an inbox, a phone with an
SMS thread) rather than abstract illustration, prompt for that explicitly
and keep any on-screen UI generic/unbranded, not a copy of a real product's
interface. 1-2 images is normal: a cover image plus maybe one inline
diagram or mockup if the topic calls for it. Confirm cost with the user
first (hard rule 5). Save the result to a local file, then write real,
descriptive alt text (not a restatement of the filename, and keyword-
bearing where it's honestly accurate — never keyword-stuffed).

Upload each one, always passing the exact prompt you used as the third
argument — it's saved on the image's `imagePrompt` field (Studio-only,
never shown on the site) so it's easy to find later if the user wants to
regenerate or tweak the image:

```
npx tsx --env-file=.env.local scripts/upload-sanity-image.ts <local-image-path> "<alt text>" "<exact prompt used>"
```

This prints a JSON image field. Use it as-is for `coverImage`, or embed it
as a body array item at the right point in the body.

**If Higgsfield generation fails or isn't available** (wrong plan tier, out
of credits, tool not connected): don't just skip the image or leave the
post with no cover at all. Do both of these:

1. Generate a real placeholder and use it as the `coverImage` (or inline
   image) so the draft always has something visual, never a blank slot.
   Pass the intended prompt here too, so it's saved for whenever the user
   wants to actually generate the real image:
   ```
   npx tsx scripts/generate-placeholder-image.ts "<post title>" /tmp/placeholder.png
   npx tsx --env-file=.env.local scripts/upload-sanity-image.ts /tmp/placeholder.png "Placeholder cover image, replace before publishing" "<the prompt that would have been used>"
   ```
   Use the printed JSON image field as-is. It's a real 1600x900 image
   (dark background, "PLACEHOLDER" label, the post title, a note to
   replace it before publishing) that goes through the normal image
   pipeline, so swapping it later is a single click in Studio.
2. Give the user the exact prompt you would have used, clearly labeled, so
   they can paste it into another tool (ChatGPT, Midjourney, Nano Banana,
   whatever they have access to) and hand the resulting file back to you:

   > **Image prompt (Higgsfield unavailable):**
   > "<the exact prompt text>"
   >
   > A placeholder is in the draft for now. Generate this in whatever tool
   > you have, then send me the file and I'll swap it in.

Never block draft creation on image generation succeeding — the
placeholder exists specifically so a failed generation never stalls the
post.

### 7. Gate 2 — review before creating the draft

Show the user the full draft in chat before touching Sanity: title,
excerpt, the body's headings and FAQ questions, which internal links it
uses, and the image plan. Revise on feedback. Only proceed to step 8 once
they approve.

### 8. Create the draft

Assemble everything into one JSON file:

```json
{
  "slug": "...",
  "title": "...",
  "category": "CRO",
  "excerpt": "...",
  "publishedAt": "2026-09-14T12:00:00.000Z",
  "coverImage": { "_type": "image", "asset": {...}, "alt": "..." },
  "body": [ /* portable text blocks, image objects interleaved */ ]
}
```

Then run:

```
npx tsx --env-file=.env.local scripts/create-blog-draft.ts <post.json>
```

Requires `SANITY_API_WRITE_TOKEN` in `.env.local` (an Editor-permission
token from sanity.io/manage — ask the user for one if missing; never ask
them to lower it to a less-restricted token than Editor).

**Verifying a draft exists:** a plain GROQ query, even with the write
token, defaults to the "published" perspective and will not show a
`drafts.*` document. This is expected, not a failure. To actually check a
draft was created, use `client.getDocument(id)` or pass
`{ perspective: "raw" }` as query options.

### 9. Hand off

Report back: the title, a 2-3 sentence summary of the angle, which internal
links it uses, and the Studio review link the script prints
(`{SITE_URL}/studio/structure/blogPost;<slug>`). Say explicitly that it is
a draft and nothing is live until they publish it themselves.

### 10. After publishing (the human's own follow-up)

Once the user publishes: submit the URL to Google Search Console and
request indexing, and check impressions/clicks after about 6 weeks. This
is manual on their end (their GSC account), just remind them.
