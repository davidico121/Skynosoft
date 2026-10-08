# Listicle Pitch Builder

Builds a real, deployed advertorial/listicle for a prospect David wants to
pitch, served privately at `listicle.skynosoft.net/<slug>`. This is proof of
capability sent cold (or alongside a proposal, like the Oko Living page used
in the Jad K. Upwork pitch), not a real ad page and not published anywhere
on the prospect's behalf. It exists to make a hiring manager or founder think
"this is exactly what I need" the moment they open the link.

## Hard rules

1. **Nothing invented.** Every product detail, spec, price, and testimonial
   must be something you verified live on the prospect's own site. If a
   claim can't be verified, leave it out or mark it as illustrative in a way
   that's obvious to David, never publish an invented quote or spec as real.
2. **Never impersonate the brand as if this is their actual live page.** The
   page visually matches their brand (their product photos, their voice,
   their accent color) because that's the whole point, it's a concept of
   exactly what we'd build for them, but the sign-off block (see "The
   sign-off" below) is mandatory on every page and never removed. It's the
   one element that deliberately breaks from the brand's visual language, a
   distinct dark block with David's photo, a "Like what you see?" framing
   naming the brand directly, a Calendly CTA, and the disclosure line. It
   functions as both the honest disclosure and the conversion moment, the
   watermark that makes clear who built this and how to hire them.
3. **Real testimonials only**, pulled from the prospect's own reviews,
   quoted verbatim (typos and all). Never write a testimonial that reads
   real but isn't sourced from their actual site.
4. **Private by design.** `noindex`, not linked from the main site, not
   submitted to Search Console. These are leave-behind artifacts for one
   specific pitch, not SEO content.
5. **The page represents the PROSPECT's brand, not Skynosoft's.** Never use
   Skynosoft's blue/Sora identity here. Pull an accent color from their own
   site (their primary brand color, picked by eye from their homepage or
   product page) and use a clean editorial serif for body copy, which is
   what makes an advertorial read like independent content instead of an ad.

## Step 1: Intake

Get from David (ask only for what's missing):

- Brand name, their product/collection URL (this is what every CTA links to,
  since we're not actually selling, we're sending qualified interest back to
  their real store).
- Which angle fits the brand: listicle (broad, numbered, several reasons at
  once) vs a single narrative advertorial (founder story, "I tried it",
  news/PR). Default to listicle unless the brand has one obvious strong
  story angle.
- Any context on why this brand specifically (an Upwork job post's stated
  style, a competitor's angle they admire, a product launch).

## Step 2: Research the brand and product (verify before writing)

Use Playwright with the environment's proven Chromium + NSS CA setup (see
`strategy-pitch-builder`'s SKILL.md "Tooling" section for the exact
launch args and certutil fix, same tooling applies here). Do not write from
memory or guess at product details.

1. **Read the actual product page(s)** the pitch will point to: specs,
   materials, price, what's included, certifications, guarantees.
2. **Find 2-4 real reviews** on the brand's own site (product page review
   widgets, a dedicated reviews page). Copy verbatim, note the name and any
   role/context shown ("Verified Buyer", "Yoga Teacher", a location).
3. **Pull the brand's accent color** from their own site (inspect a CTA
   button or their logo color).
4. **Capture real product photos** for the hero, section images, and the
   product block. Download via Playwright's `ctx.request.get` if the CDN
   needs the same network-policy widening other audits have needed (see the
   Learnings log below for hosts that have come up before, e.g. Shopify
   theme-asset and page-builder CDNs like `cdn05.zipify.com`).
5. **Note what's genuinely distinctive** about the product: the mechanism,
   the "reason why" it works, what makes it different from the obvious
   alternative. This is the hook's foundation, not a generic feature list.

## Step 3: Pick the angle and hook

Follow the `ecommerce-blog-writer` skill's advertorial framework (already in
this environment) for the full angle/hook taxonomy and compliance rules; the
summary below is what's specific to how David uses this for outreach.

**Angles:** listicle ("5 reasons X is different"), personal review ("I tried
it and this is what happened"), founder story, problem/exposé. Pick one, do
not blend.

**Hook formula:** a curiosity gap, a surprising claim, a contrarian angle, or
a discovery framing, never a plain feature headline. Run it through: would a
cold reader click this over a straight "Buy our X" headline? If not,
rewrite it.

## Step 4: Write the page

The structure, verified against a real high-performing advertorial
(Oko Living's yoga rug page, `okoliving.com/pages/yogarugbenefits`, analyzed
in full on 2026-10-08) plus the `ecommerce-blog-writer` skill's advertorial
backbone:

1. Hook headline + light byline (never a real journalist's name).
2. Hero image, the prospect's own real product/lifestyle photo.
3. A 4-6 line numbered teaser list, each line self-contained and skimmable,
   so someone skimming gets the full pitch before reaching the product.
4. Repeated inline text-link CTA (not a button) right after the teaser
   list, this is what keeps the page reading like an article.
5. Optional press/trust bar, only real logos you can verify (an actual
   "as seen in" credit on their own site). Skip if you can't verify one.
6. 3-5 numbered deep-dive sections. Each: a real lifestyle image, a title,
   1-3 short paragraphs building a story-led case (not a spec dump), and the
   same inline CTA repeated at the end of each section.
7. Optional bonus/value-stack badge over a lifestyle image, only if the
   brand has a real current offer like this to point to.
8. The product block: pivots from story to offer. Headline, short
   description, feature groups pulled directly from their real spec/bullet
   list, a real rating count if shown on their site, a CTA.
9. Real testimonials, named, with role/context, quoted verbatim.
10. Closing CTA: first-person framing that mirrors the reader's own "yes"
    ("Yes, I'm ready to..."), not a generic "Shop now."
11. The mandatory sign-off block (hard rule 2, see "The sign-off" below).

### The sign-off

Fixed, not per-brand data, rendered after everything else: a distinct dark
block, visually unlike the rest of the page on purpose, so it reads as a
clear break, not a continuation of the brand's own content.

- David's photo (`public/brand/david-owoeye-avatar.jpg`).
- "Like what you see?" eyebrow, then a headline naming the brand directly:
  "This is exactly what I'd build for {brand}."
- A short line making clear this is a real, personally built concept, not
  AI slop: "I built this concept page myself, real photos, real reviews,
  real copy, to show what {brand}'s own advertorial could look like."
- "Book a strategy call" button, linked to `CALENDLY_URL` from
  `src/lib/content.ts`.
- Name and title underneath.
- The disclosure line, folded in small at the bottom rather than as a
  standalone legal notice: "Concept page built by Skynosoft as a sample of
  real, deployable work. Not affiliated with or published by {brand}."

This block is identical in structure across every pitch (only the brand
name is templated in), so it never needs its own content entry, it's
already wired into the page template.

Copy rules: no em dashes anywhere (reads as an AI tell, matches the
`ecommerce-blog-writer` skill's rule), plain style, no exclamation marks or
all caps, active voice, short paragraphs. Decide the closing CTA's framing
before writing the hook, the whole page should build toward it.

## Step 5: Assets

- Put files in `public/pitch-assets/listicle-<slug>/` (same convention as
  `strategy-pitch-builder`, under `public/pitch-assets/`, never
  `public/listicle/`, the proxy 404s that path on non-listicle hosts and the
  image optimizer fetches internally so images would break).
- `.jpg` at quality ~86 via `sharp`, real `width`/`height` in the entry.
- Descriptive `alt` text for every image.

## Step 6: Add the content entry

Add one object to `listiclePitches` in `src/lib/listicle.ts`, typed as
`ListiclePitch`. The type file documents every field; the main judgment
calls are the angle (Step 3), the accent color (their real brand color, not
Skynosoft's), and which 3-5 sections earn a spot, don't pad to hit a number.

## Step 7: Verify locally

```bash
npm run build
lsof -i :3000 -t | xargs kill -9
rm -rf .next/cache/images
npm run start
```

Open `http://listicle.localhost:3000/<slug>` or
`curl -H "Host: listicle.localhost:3000" localhost:3000/<slug>`.

Screenshot at 1440 and 390 wide using the headless Chromium pattern from
`strategy-pitch-builder`'s SKILL.md (never the `mcp__playwright__*` tool,
same incident history applies). Check:

- The sign-off block renders (photo, brand name in the headline, Calendly
  link, disclosure line) and isn't accidentally dropped.
- Every CTA link above the sign-off actually points to the prospect's real
  product URL, and the sign-off's own CTA points to `CALENDLY_URL`.
- Testimonials render with the real name/role, no placeholder text left in.
- Accent color reads as the brand's own, not Skynosoft blue, except inside
  the sign-off block itself, which is deliberately Skynosoft's own dark
  treatment.
- No console errors, no broken images, mobile doesn't overflow.

## Step 8: Ship

1. Commit (Co-Authored-By trailer per the session reminder) and push.
2. `vercel --prod --yes` if this session has deploy credentials; otherwise
   push to `main` and say so, Vercel's GitHub integration handles the rest.
3. Verify live: `curl -s -o /dev/null -w "%{http_code}" https://listicle.skynosoft.net/<slug>` returns 200.
4. Give David the URL and a one-line note on what's real vs what's an
   illustrative placeholder, if anything had to be left incomplete.

New host or DNS: same pattern as `strategy.skynosoft.net` and
`david.skynosoft.net`, a Cloudflare `A` record for `listicle` pointing at
`76.76.21.21` (grey cloud, DNS only), plus adding `listicle.skynosoft.net`
in Vercel's project Domains settings. This is one-time setup, not per-brand.

## Architecture

- `src/proxy.ts` rewrites `listicle.*` hosts to `/listicle/<path>`, adds
  `X-Robots-Tag: noindex, nofollow`, and 404s `/listicle/*` on any other
  host. Same pattern as the `strategy.*` rewrite.
- `src/app/listicle/layout.tsx` is its own root layout (not nested under
  `(site)`), same reason `strategy/layout.tsx` and `david/layout.tsx` are:
  a top-level sibling folder needs its own `<html>`/`<body>`.
- `src/app/listicle/[slug]/page.tsx` is the template, `dynamicParams =
  false`, `generateStaticParams` from `listiclePitches`. Deliberately does
  NOT reuse Skynosoft's page-kit components (`BUTTON`, `Section`, the
  Sora/blue identity), because this page represents the prospect's brand,
  not Skynosoft's. Typography is a neutral editorial serif; color comes
  from each entry's `accentColor`.
- `src/lib/listicle.ts` holds the `ListiclePitch` type and the
  `listiclePitches` array, one entry per brand pitched.

## Learnings log

Add newest first. Format: `YYYY-MM-DD, brand: what happened, rule it
produced.`

- 2026-10-08, system built (no brand yet): researched what makes a listicle
  or advertorial convert before building anything. Found the
  `ecommerce-blog-writer` skill already has a full, compliance-checked
  advertorial framework (angle/hook taxonomy, a 10-point structural
  backbone, real-proof-only rules, the auto-updating date snippet, the
  noindex/discovery guidance), reused rather than rebuilt. Cross-checked it
  against a real, currently-live, well-built example found during an Upwork
  pitch (Oko Living's yoga rug page, okoliving.com/pages/yogarugbenefits,
  built on Shopify + Zipify Pages): hook headline, numbered teaser list,
  press bar, narrative sections each closing on a soft inline text-link CTA
  rather than a button, a value-stack bonus badge, a product trust block,
  named reviewer testimonials with role/context, and a first-person closing
  CTA. The two matched closely, confirming the framework. Rule: when
  researching a content format for a new skill, check for an existing
  skill covering adjacent ground before building from scratch, and verify
  any framework against at least one real, live example rather than taking
  either source on faith alone.
- 2026-10-08, system built: decided the template must NOT reuse Skynosoft's
  own page-kit components or brand identity (Sora font, primary blue),
  since the page is meant to read as the PROSPECT's own content, not
  Skynosoft's. First pass added a small plain-text disclaimer line at the
  bottom; David asked for it to become a proper sign-off instead, his
  photo, a "Like what you see?" headline naming the brand, a Calendly CTA,
  his name and title, with the disclosure line folded in underneath rather
  than standing alone. Rendered as a visually distinct dark block, which
  does double duty: it's the honest disclosure (a pitch artifact that
  borrows a real brand's visual identity needs one), and it's the
  watermark and conversion moment in one, the single element that stays
  obviously Skynosoft's on an otherwise fully brand-matched page. Rule:
  disclosure and conversion don't have to be separate elements, folding
  them together is both more honest-feeling (it's not hiding at the
  bottom in fine print) and more useful to David than a bare legal line.
