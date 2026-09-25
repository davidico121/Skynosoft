---
name: strategy-pitch-builder
description: Build a personalized strategy pitch page for a brand David wants to reach out to, served privately at strategy.skynosoft.net/<slug>. Use when the user gives a brief for a new brand pitch, asks for a new strategy page, or wants to update or improve an existing one (myowellness is the reference build).
---

# Strategy Pitch Builder

Turns a short brief about one brand into a finished, deployed page at
`strategy.skynosoft.net/<slug>`: a personal, evidence-led pitch that David
sends in outreach. The template is shared; each brand is one content entry
plus a handful of real screenshots.

`myowellness` is the reference build. When in doubt, open its entry in
`src/lib/strategy.ts` and match its depth, tone and specificity.

This skill is a living document. **After every new page, add what you learned
to "Learnings log" at the bottom** (a rule that would have saved time, a
component that needed extending, a copy pattern that landed).

## Hard rules

1. **Nothing invented.** Every quote, review, product, price, flow state or
   claim about the brand must be something you observed on their live site or
   that David supplied. If you could not verify it, leave it out or mark it as
   an estimate ("target, not a guarantee"). Reviews are quoted verbatim
   (fragments are fine, edits are not, keep their typos).
2. **Never publish a claim you have only weakly checked** (for example "no
   pop-up" after watching a page for ten seconds). Say what you saw, or drop it.
3. **Skynosoft proof must be real.** `caseStudySlugs` and
   `reviewFromCaseStudy` only reference entries that exist in
   `src/lib/content.ts`. Never cite a result the case study does not contain.
4. **Private by design.** Pages are `noindex`, disallowed in robots, and
   404 on the main host. Do not link to them from the public site, sitemap or blog.
5. **Follow the `landing-page-design` skill** for every visual decision
   (type scale, spacing table, no single sided borders, no background
   gradients, 680px max for hero text, no hyphens or orphans in copy, motion
   easing, states). Fonts stay Sora / Hanken Grotesk / JetBrains Mono.
6. **Personal, not corporate.** No em dashes, no hyphens in copy, no
   "solutions/leverage/streamline". Write scenes, not stats: a named customer
   and what happened to them beats a percentage.
7. **Reviews and testimonials always use the shared `QuoteBadge`**
   (`src/components/ui/QuoteBadge.tsx`) on the beige `#f7f6f3` card. Long
   copy goes through `Paragraphs` / `splitParagraphs` so no block of text is
   dense (breaks at sentence boundaries above ~160 characters).
8. **Commit and push to main** once tested (standing instruction), then
   deploy.

## Step 1: Intake

Get from David (ask only for what is missing, never stall on nice to haves):

- Brand name, site URL, what they sell, who buys it.
- The single sharpest weak spot David spotted (the "gap"): what is missing or
  broken in their lifecycle or site, and where in the customer journey.
- The offer being pitched (usually a Klaviyo retention or lifecycle system)
  and the target metric (an estimate, always framed as a target).
- Timing hook if any (BFCM, a launch, a season).
- Any copy David already wrote. Treat it as the base, tighten it, do not
  rewrite the voice.
- Which of his real case studies are most relevant (default: the closest
  category, plus one strong email result).

## Step 2: Research the brand (verify before writing)

Use Playwright with system Chrome (see "Tooling"). On their live site:

1. Capture a **homepage screenshot** (top of page, 1200x750 crop) for the
   hero browser frame.
2. Capture a **weak spot detail** for the inset (for example the footer
   email signup, an empty popup state, a product page missing cross sells).
   Crop tight; it should prove the gap at a glance.
3. Find **2 real customer reviews** on their site (product pages, review
   widgets). Copy verbatim, note the name as shown ("Name, verified customer").
4. Capture **3 product photos** for the benefits column (square, 900x900).
   Use real hero products, named as on the site.
5. Confirm each factual claim in the gap steps against the live site.
   Wix and lazy loaded sections need a tall viewport (for example 9200px) or
   scrolling to render.

If the site blocks the sandbox (curl fails on some CDNs), download images with
Playwright's `ctx.request.get` instead of curl.

## Step 3: Write the content entry

Add one object to `strategyPitches` in `src/lib/strategy.ts`, typed as
`StrategyPitch`. Field by field:

| Field | What it is | Rules |
| --- | --- | --- |
| `slug` | URL path | lowercase brand, no spaces |
| `hero.eyebrow` | "A note for <Brand>" | personal, short |
| `hero.headline` | 2 to 3 lines | outcome for THEIR customers, lines broken at meaning, no orphan word on a last line |
| `hero.subheading` | 1 to 2 sentences | name a real customer from their reviews and what happened, then the one thing missing |
| `hero.proof` | one review quote | verbatim, `source` says where it came from |
| `hero.visuals` | main + inset screenshots | `url` is the site domain shown in the frame bar, inset has a short caption (under ~25 characters so it never wraps on mobile) |
| `gap` | 3 step journey | `leak: true` on the step where nothing happens; `status` says exactly what is (not) sent |
| `problemSolution` | problem paragraph, 3 to 5 solution points, `reviews` | problem is one scene, solution points are concrete moments not features |
| `benefits` | 3 to 5 items + `products` | icon key must be one of `welcome`, `reorder`, `subscription`, `winback`; add a key plus a Phosphor icon in the page if none fits |
| `how` | 3 weekly steps + 3 impact boxes | impact numbers are targets and must match the FAQ wording |
| `caseStudySlugs` | 2 slugs | closest category first |
| `reviewFromCaseStudy` | slug | must have `clientReview` |
| `tagline` | closing statement | 2 sentences; it splits into separate word reveal paragraphs automatically |
| `faqs` | 5 to 6 | must include: what do you need from us, how do you decide timing, is the target a guarantee, can it be live before the deadline |
| `risk` | heading + text | the risk reversal; "See the plan before you spend anything" works as the pattern |

Copy checks before moving on (the "specificity checklist"):

- Could this sentence appear on a competitor's pitch unchanged? If yes, rewrite it.
- Is there a named person, product or moment from THEIR site in the hero, the
  problem and at least one benefit?
- No em dashes, no hyphens in copy (write "win back", "first time buyer").
- Numbers written the way the brand writes them (currency, spelling: UK vs US).

## Step 4: Assets

- Put files in `public/pitch-assets/<slug>/` and reference them as
  `/pitch-assets/<slug>/...`. **Never** under `public/strategy/`: the proxy
  404s `/strategy/*` on non strategy hosts, and the image optimizer fetches
  internally, so images would break.
- Use `.jpg` at quality ~86 via `sharp` (run sharp from the project dir, not
  the scratchpad). Give real `width` and `height` in the entry.
- Descriptive `alt` text for every screenshot (what it shows, not "screenshot").
- David's sign off portrait is `public/brand/david-owoeye-avatar.jpg`, already
  wired into the template. Do not change it per brand.

## Step 5: Verify locally

```bash
npm run build
lsof -i :3000 -t | xargs kill -9   # free the port
rm -rf .next/cache/images
npm run start
```

Open `http://strategy.localhost:3000/<slug>` (Chrome resolves `*.localhost`)
or `curl -H "Host: strategy.localhost:3000" localhost:3000/<slug>`.

Screenshot with Playwright at 1440 and 390 wide. Scroll the full page first
so `Reveal` sections trigger. Look at every section and check:

- Hero: headline lines break well, browser frame screenshots load, caption pill does not wrap on mobile.
- Gap steps: the leak step reads as the problem.
- Reviews use the quote badge card, paragraphs are short.
- Benefits: product photos load and labels do not wrap oddly.
- Proof cards link to `https://www.skynosoft.net/work/<slug>` and show logos.
- FAQ opens, tagline reveals word by word, Calendly loads, sign off circle photo shows.
- No horizontal scroll at 390px. No console errors, no broken images.

Tooling notes: the scratchpad's `node_modules` gets wiped between sessions.
Reinstall with `npm init -y && npm install --no-save playwright-core` there;
launch with `executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
Image Read fails above 2000px, so resize with sharp or `sips` before viewing.

## Step 6: Ship

1. Commit (Co-Authored-By trailer per the session reminder) and push to main.
2. `vercel --prod --yes` (retry once on a transient error).
3. Verify live: `curl -s -o /dev/null -w "%{http_code}" https://strategy.skynosoft.net/<slug>` returns 200, and one product image URL returns 200.
4. Tell David the URL, what evidence the page is built on (which reviews and
   screenshots), and **every claim that is an estimate or only weakly
   verified** so he can decide before sending.

New host or DNS is already set up (`strategy.skynosoft.net` on Vercel,
Cloudflare A record `strategy` to `76.76.21.21`, grey cloud). Nothing to do
per brand.

## Architecture (so you can change it safely)

- `src/proxy.ts` rewrites `strategy.*` hosts to `/strategy/<path>`, adds
  `X-Robots-Tag: noindex, nofollow`, and 404s `/strategy/*` elsewhere.
- `src/app/strategy/[slug]/page.tsx` is the template (`dynamicParams = false`,
  `generateStaticParams` from `strategyPitches`). It renders, in order: island
  nav, hero with browser frame visuals, gap steps, problem and solution with
  customer reviews, benefits with product photos, how it works with impact
  boxes, proof cards and client review, tagline reveal, FAQ, risk reversal,
  Calendly embed, circular founder sign off.
- Optional fields (`visuals`, `reviews`, `products`, `reviewFromCaseStudy`,
  `proof`) collapse their layout cleanly when absent, so a thin brief still
  produces a good page, but the reference build shows the target quality.
- Shared parts: `Reveal` and `TaglineReveal` (IntersectionObserver, no scroll
  listeners), `IslandNav`, `CaseStudyCard` (with `baseUrl` for the strategy
  host), `QuoteBadge`, `Paragraphs`.
- Calendly URL is `CALENDLY_URL` in `src/lib/content.ts`.

## Improving the template

Change the template only when a brief needs something it cannot express, and
keep the existing pages rendering identically. Prefer adding an optional field
over changing a required one. After any template change, rebuild and
re-verify `myowellness` plus the newest page. Other design skills David adds
(landing page, motion, Apple, Emil) should be consulted before visual changes;
record any adopted rule below.

## Learnings log

Add newest first. Format: `YYYY-MM-DD, brand: what happened, rule it produced`.

- 2026-09-25, myowellness: right hand side of sections felt empty at desktop
  width, so screenshots (hero), reviews (problem), and product photos
  (benefits) fill those columns. Rule: every two column section needs real
  brand evidence in the second column, not blank space.
- 2026-09-25, myowellness: long review quotes and closing statements were
  dense blocks. Rule: run all long copy through `Paragraphs`.
- 2026-09-24, myowellness: founder portrait beside the risk section felt off.
  Rule: sign off is a small circular headshot with name and title under the
  Calendly embed, not a large photo.
- 2026-09-24, myowellness: assets under `/strategy/` broke images. Rule:
  assets live in `/pitch-assets/`.
- 2026-09-24, myowellness: the Elaya `landing-page-design` skill gives rules,
  not a dramatic redesign; the look comes from good content plus real
  screenshots. Rule: spend effort on evidence and specificity first.
