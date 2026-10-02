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
   and what happened to them beats a percentage. See "Voice" below for the
   register this should land in.
7. **Reviews and testimonials always use the shared `QuoteBadge`**
   (`src/components/ui/QuoteBadge.tsx`) on the beige `#f7f6f3` card. Long
   copy goes through `Paragraphs` / `splitParagraphs` so no block of text is
   dense (breaks at sentence boundaries above ~160 characters).
8. **Bold the one key phrase or sentence per block for skimmability.**
   Wrap it in `**double asterisks**` directly in the content string, e.g.
   `"Someone quiet for 60+ days gets **a real win back sequence**, not
   silence until they're gone for good"`. `renderRich`
   (`src/lib/richText.tsx`) parses this into `<strong>` and is already
   wired into `Paragraphs` plus the template's solution points, benefit
   details, and hero subheading, so it works anywhere in
   `problemSolution.problem.text`, `solution.points`, `benefits.items[].detail`,
   `hero.subheading`, and `faqs[].a` without extra plumbing. One bold span
   per block, the payoff or the direct answer, never a whole paragraph and
   never more than one per sentence or it stops reading as emphasis.
   Do not use it in `tagline`, `TaglineReveal` splits on raw whitespace so
   the asterisks would render literally, that field already gets its own
   word-by-word scroll emphasis.
   **Keep the bold span inside one sentence.** Any field routed through
   `Paragraphs` (`problem.text`, `faqs[].a`, `hero.subheading`,
   `benefits.items[].detail`) gets split into separate `<p>` blocks at
   sentence boundaries by `splitParagraphs` before `renderRich` ever sees
   it, each block rendered independently. A bold span that crosses a
   sentence boundary can get cut in half by that split, one half keeps an
   opening `**` with no closing one, and it prints as literal asterisks
   instead of bold. `splitParagraphs` itself is now fixed to keep a
   closing `**` attached to its sentence even when the marker sits right
   after the period (see its own comment), so this is a belt and braces
   rule, not the only thing standing between you and broken output, but
   still keep bold inside one sentence, it also satisfies "never more than
   one per sentence" for free and is easier to reason about either way.
9. **Commit and push to main** once tested (standing instruction), then
   deploy.

## Voice

This is the register every page's copy should land in (established from
David's own draft, 2026-09-28). It is raw and direct, closer to a message
from David than a landing page. When writing or rewriting a page, read a
section out loud, if it sounds like brand copy instead of David talking,
rewrite it.

- **Short sentences stacked in twos and threes.** Let fragments do work.
  "They ghost. The reorder never happens." beats one long connected
  sentence saying the same thing.
- **Direct second person, no hedging.** "Look," "Here's the thing," and
  plain declaratives ("That's not a loss. That's a spiral.") instead of
  "this may result in" or "could potentially."
- **A rhetorical question early**, right after the opening hook, that
  makes the reader answer before the page continues ("Does that sound
  familiar?").
- **Numbers shown as arithmetic in prose, not a stat block.** "You spent
  X on ads. If Y% of that went to customers who buy once, that's Z gone."
  Walk the math, don't just state the result, and only with real numbers
  (see rule 1 and the six agreements section below).
- **Repetition as the closing beat**, not a single polished CTA line.
  Short repeated fragments ("Not next week. Now.") land harder than one
  smooth sentence.
- **Section headings are spoken lines**, not labels. "Why throwing more
  money at ads won't work," not "The Problem With Ad Spend."
- Still bound by the hard rules above: no em dashes, no hyphens (write
  "customers who buy once," not "one-time customers"), nothing invented.

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
| `how` | 2 weekly steps + 3 impact boxes | **default the build to two weeks** (Week 1 covers strategy and build together, Week 2 is test and launch), not the four-week/three-step split from the first build; impact numbers are targets and must match the FAQ wording |
| `builtForYou` | optional: real finished creative already designed for THEM, shown between `benefits` and `how` | only use this when David has actually designed real creative on spec, never a mockup labeled as finished work (hard rule 1 still applies). See "Optional: already-built creative" below. |
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

### The six agreements (run every page through this before shipping)

Before someone books a call, the copy has to earn six agreements in order.
Each maps to an existing field, so this is a check on what is already
there, not a new section to write. Skipping one is the usual reason a
page reads fine but does not convert. Every technique below is still bound
by hard rule 1 (nothing invented): where a technique calls for a stat, a
competitor tactic or a piece of research, use it only if it is real and
verified, otherwise drop that technique for this brand rather than
faking the specificity.

1. **"This is for me."** `hero.eyebrow` + `hero.headline` + `hero.subheading`.
   Open with something only their exact buyer would recognize (a named
   customer, their product, their specific moment), not a claim that could
   sit on any Klaviyo pitch. A quote or pain line lifted straight from
   their own reviews works best. If the first line could be about any
   ecommerce brand, rewrite it.
2. **"This problem really matters."** `gap` + `problemSolution.problem`.
   Do not just state what is missing (`status: "Nothing sent"`); list what
   it actually costs them, in their terms: money already spent acquiring
   the customer now walking away, time lost starting Q1 from zero, a
   named competitor who picks up the lapsed customer, momentum lost if
   BFCM passes with the leak still open. Two or three concrete losses beat
   one vague one. Loss framed beats gain framed, people feel losing
   something they have more than missing something they never had.
3. **"My current approach will not get me there."** Usually missing.
   Before pitching the system, name the thing they are probably already
   doing that will not close the gap (a generic post purchase email, a
   discount-led relaunch, "we will get to it after BFCM", more ad spend
   chasing the same one time buyers) and say plainly why more of that does
   not solve it. Use real math only when you have the brand's real
   numbers (ad spend, repeat rate, CAC) from David or their own reporting,
   e.g. "X% of buyers never order again, so Y of that spend produced
   nothing repeatable." Never invent a spend figure or cite research you
   have not actually read. Without real numbers, make the reframe
   qualitative instead (see the myowellness footer-signup example below).
   This can live in `problemSolution.problem` or as an extra beat before
   `problemSolution.solution`, one or two sentences, not a new field.
4. **"There is a better way."** `problemSolution.solution.points` +
   `benefits`. Each point should read as a new way of seeing the problem,
   not a feature list. "Timed to when their pouch runs low" is a reframe;
   "we send automated flows" is not. A named comparable brand strengthens
   this (myowellness's tagline points at "the way AG1 and Gruns customers
   do"), but only name a brand and describe its tactic if you have
   actually verified what that brand does. A vague "like the best brands
   in your space" is weaker than naming one real thing, so prefer citing
   Skynosoft's own `execution` list from a relevant case study over
   guessing at a competitor's stack.
5. **"This will work for me."** `problemSolution.reviews`,
   `caseStudySlugs`, `reviewFromCaseStudy`, `hero.proof`, `proofHeading`.
   Already the strongest part of the template because `CaseStudyCard`
   surfaces real dollar metrics automatically, keep it that way: real
   reviews from their own customers plus a case study in their category
   or adjacent to it. Make `proofHeading` do more than announce the
   section, pull the sharpest real number from the closer case study into
   it (a before/after figure, not a generic claim) so the proof reads
   specific before the cards even load. If they have no case study close
   enough, say so to David rather than stretching `caseStudySlugs`.
6. **"I cannot keep putting this off."** `how` (the BFCM/deadline
   framing), `risk`, and the FAQ's timing question. **Always anchor to
   BFCM by default.** Nearly every ecommerce brand cares about Black
   Friday and Cyber Monday, so unless the brand has a more specific,
   verified event (a launch, a relaunch date David gives you), use BFCM in
   `how.heading` and the FAQ's timing answer, don't skip it. State the
   specific cost of waiting (a missed peak window, launching mid traffic
   surge instead of ahead of it, another season of the same leak) rather
   than a generic "let's chat soon." Avoid baking in an exact date, the
   page can sit unopened for weeks before David sends it, so anchor to the
   calendar event itself (BFCM) and the plan's own timeline (`how.steps`),
   not to today's date. `risk.text` should make starting feel safe ("see
   the plan before you spend anything") precisely so the urgency in
   `how`/FAQ does not read as pressure.

If a page is flat despite good design, it is almost always #3 or #6 that
got skipped, not a visual problem.

### Optional: already-built creative (`builtForYou`)

When David has actually designed real email creative for the brand on
spec (not a mockup, the real thing, ready to send), it is the strongest
proof the page can carry, stronger than a case study from someone else,
because it is proof specific to THIS brand. Use `builtForYou`:

```ts
builtForYou: {
  heading: string;
  subheading?: string;        // one bold span max, routed through renderRich
  comparison?: {               // optional: a real before/after
    heading: string;
    before: { label: string; image: StrategyShot }; // their actual current email
    after: { label: string; image: StrategyShot };  // the one David built
  };
  emails: { label: string; image: StrategyShot }[]; // the rest of what's ready
}
```

Rendering (already wired into the template, `src/app/strategy/[slug]/page.tsx`):
tall email screenshots show inside a `hide-scrollbar h-[500px] overflow-y-auto`
window, not the full image at full height. That is **taller than the
400px** used for the case-study gallery (`(site)/case-studies/[slug]/page.tsx`)
on purpose, so it reads as "scroll me" rather than a cramped crop. The
`comparison` pair renders in a 2 column grid above the main `emails` grid;
the `after` card gets a `border-primary` + `ring-primary/30` treatment and a
tinted label so it visually reads as the better one without needing copy
to say so. The `emails` grid's column count must match its length
(`sm:grid-cols-2` for 2 items, `md:grid-cols-3` for 3) or you get an
empty, awkward column, same rule as `how.steps.length`.

If `comparison` is used and one of the `comparison.after` images is also
the brand's only/best example of that email type, do not also repeat it
in the `emails` list below, that is a duplicate image shown twice for no
reason. Show it once, in the comparison, and let `emails` cover the
pieces that do not have a real before to pair against.

**Cropping real email screenshots**: cut the brand's own footer out of
each image (logo, socials, address, unsubscribe) so the card reads as
pure creative, not administrivia. Exception: if the footer sits on a
photo background that continues without a seam from the section above
it (a product photo flowing straight into the branded sign off), keep
the whole thing, cropping mid-photo looks more broken than a short real
footer does. Finding the exact cut line: do not assume the footer is a
flat color block, sample it. A script that scans a single pixel column
for a target RGB and stops on the first match will false-positive on
product photography that happens to share the brand's teal/dark tone;
require a sustained run (30-40+ consecutive matching rows) before
trusting a match, and always crop-and-reopen the result to confirm by
eye before shipping.

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

Screenshot at 1440 and 390 wide using the headless Chrome pattern below
(never the `mcp__playwright__*` tool, see "Tooling notes"). Scroll the
full page first so `Reveal` sections trigger. Look at every section and
check:

- Hero: headline lines break well, browser frame screenshots load, caption pill does not wrap on mobile.
- Gap steps: the leak step reads as the problem.
- Reviews use the quote badge card, paragraphs are short.
- Benefits: product photos load and labels do not wrap oddly.
- `builtForYou` (if present): comparison pair and emails grid both scroll inside their card, footer cropped or intentionally kept (see above), grid columns match item count.
- Proof cards link to `https://www.skynosoft.net/case-studies/<slug>` and show logos.
- FAQ opens, tagline reveals word by word, Calendly loads, sign off circle photo shows.
- No console errors, no broken images. Treat a 390px screenshot's "cut off" text as inconclusive on its own (see below) and confirm with a curl/class check if anything looks wrong.

### Tooling notes (screenshots, verified 2026-10-01)

**Never use the `mcp__playwright__*` tool for this.** It drives the user's
actual, real Chrome (real profiles, real tabs), not an isolated instance.
Using it here before caused a real incident: a `pkill` meant to clear a
hung launch force-quit the user's live Chrome and broke sync sign-in
across their profiles. Also never `pkill`/force-quit anything matching
plain `"Google Chrome"`, only ever a specific throwaway
`--user-data-dir=` path you yourself created (see below).

`playwright-core`'s own browser downloads do not work on this machine:
`npx playwright install chromium` and `...install webkit` both fail
outright (`ERROR: Playwright does not support chromium/webkit on
mac12`, this macOS is too old for Playwright's bundled browsers, any
engine). Do not spend time retrying this, it is a dead end here, not a
flake.

What actually works: launch the real installed Chrome.app directly in
headless mode with your own throwaway profile, completely separate from
the user's real browser:

```bash
rm -rf /tmp/chrome-headless-mycheck && mkdir -p /tmp/chrome-headless-mycheck
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --disable-extensions \
  --user-data-dir=/tmp/chrome-headless-mycheck \
  --window-size=1440,1400 \
  --virtual-time-budget=4000 \
  --host-resolver-rules="MAP strategy.localtest localhost" \
  --screenshot=/tmp/out.png \
  "http://strategy.localtest:3000/<slug>"
```

(`--host-resolver-rules` is how you get a `strategy.*` Host header locally
without touching `/etc/hosts`; for a pure content check, `curl -H "Host:
strategy.localhost:3000" localhost:3000/<slug>` needs none of this.)

Known quirks of this setup, all harmless once you know them:
- Headless Chrome sometimes does not exit after writing the screenshot
  file. Check the file exists, then
  `pkill -f "user-data-dir=/tmp/chrome-headless-mycheck"` (that exact
  path, never a bare `chrome` match) to free it for the next shot.
- A long session launching many of these can exhaust resources and the
  next launch crashes with no screenshot written. Clean up
  `/tmp/chrome-headless-*` between attempts; if it keeps failing, fall
  back to the curl/structural checks below rather than retrying blindly.
- Full page screenshots need the height guessed upfront
  (`--window-size=W,H`); `sharp().trim({ threshold: 8 })` (no fixed
  `background`, let it sample the real corner color) cuts the leftover
  blank space after.
- **Narrow viewports (390px) can show false "content cut off at the
  edge" artifacts that are not real.** Confirmed by reproducing the
  identical cutoff on a page already proven correct by other means.
  Do not treat one narrow headless screenshot as proof of a mobile bug,
  corroborate with a curl-based class/structure check first.
- If the `[slug]` page or `all` ever stop responding while a dev server
  that was already running goes quiet, it may have just been stopped
  earlier in a long session, not crashed: `curl localhost:3000/` to
  check, restart with `npm run start &` (or `run dev` while iterating)
  if dead.

For rendering a brand's raw HTML export of an email into an image (when
only `.html` is available, not `.png`): bundled/self-unpacking HTML
pages need `--virtual-time-budget=6000` or the screenshot captures the
loading placeholder before the unpack script finishes, and still need
the generous-height-plus-trim approach above since you don't know the
rendered height upfront. **Prefer a direct PNG export from whoever
designed the email when one exists**, it is far more reliable than
rendering HTML and skips all of the above.

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
  customer reviews, benefits with product photos, already-built creative
  (`builtForYou`, if present, with its before/after comparison before the
  rest of the emails), how it works with impact boxes, proof cards and
  client review, tagline reveal, FAQ, risk reversal, Calendly embed,
  circular founder sign off (David's name, title, and `SocialLinks` to his
  real LinkedIn and Instagram, this pair belongs on every founder sign off
  sitewide, not just here, don't drop it on a new page).
- Optional fields (`visuals`, `reviews`, `products`, `reviewFromCaseStudy`,
  `proof`, `builtForYou`) collapse their layout cleanly when absent, so a
  thin brief still produces a good page, but the reference build shows the
  target quality.
- Shared parts: `Reveal` and `TaglineReveal` (IntersectionObserver, no scroll
  listeners), `IslandNav` (desktop shows every link inline with the last one
  as a filled button; the mobile drawer colors that same last link
  `text-primary` instead of plain black so the CTA still reads as the CTA
  once the nav collapses, match this if you touch the drawer), `CaseStudyCard`
  (with `baseUrl` for the strategy host), `QuoteBadge` (takes an optional
  `size: "lg"` for a bigger quote mark where it's a visual anchor), `Paragraphs`,
  `SocialLinks`.
- Calendly URL is `CALENDLY_URL` in `src/lib/content.ts`, currently
  `https://calendly.com/david_owoeye/discuss`. One source of truth, every
  page's "Book a strategy call" and the Calendly embed both read from it.

## Improving the template

Change the template only when a brief needs something it cannot express, and
keep the existing pages rendering identically. Prefer adding an optional field
over changing a required one. After any template change, rebuild and
re-verify `myowellness` plus the newest page. Other design skills David adds
(landing page, motion, Apple, Emil) should be consulted before visual changes;
record any adopted rule below.

## Learnings log

Add newest first. Format: `YYYY-MM-DD, brand: what happened, rule it produced`.

- 2026-10-01, alimentnutrition: added the `builtForYou` field (real
  finished email creative, shown between `benefits` and `how`) after
  David designed three real emails for the brand and wanted them shown
  so the prospect could see actual finished work, not another audit.
  Also added its `comparison` sub-feature (a real before/after: their
  actual current welcome email next to David's rebuild of it) after David
  asked for the two side by side so the difference needs no explaining.
  Rule: when David has done real creative work for a brand already, it
  belongs on the page as direct proof, stronger than a borrowed case
  study. Full pattern and rendering details in "Optional: already-built
  creative" above.
- 2026-10-01, alimentnutrition: first pass used a width/height-matched
  Image sized to its natural (very tall) height directly in the grid. It
  looked fine on desktop but made the section enormous and buried the
  rest of the page in scroll. Rule: any full length email screenshot
  shown in a grid card goes inside a fixed height scroll window
  (`hide-scrollbar h-[500px] overflow-y-auto`), not at full natural
  height, see the `builtForYou` section above for the exact pattern and
  why 500px (taller than the case study gallery's 400px) on purpose.
- 2026-10-01, alimentnutrition: spent real time chasing an apparent
  mobile overflow bug in the new `builtForYou` grid (text looked cut off
  at a 390px headless screenshot's edge) before proving it was a
  rendering artifact of headless Chrome at narrow widths on this
  machine, not a real bug, by reproducing the identical cutoff on the
  already-shipped, already-correct homepage using the same screenshot
  method. Rule: a narrow headless screenshot that shows something cut
  off is not proof by itself, try the same check against a known-good
  page first before trusting it (see "Tooling notes" below for the full
  writeup and the safe screenshot pattern that replaced it).
- 2026-10-01, alimentnutrition: David supplied PNG exports of the real
  emails on a second pass, after an earlier pass had to render raw HTML
  exports through headless Chrome (self-unpacking "Bundled Page" files,
  needed `--virtual-time-budget` and a height guess plus trim). The PNG
  pass was faster and more reliable with zero rendering risk. Rule:
  always ask whether a direct image export exists before reaching for
  the HTML-render workaround, prefer it when it does.
- 2026-10-01, alimentnutrition: a footer-crop detection script that
  scanned for a single pixel matching the brand's flat teal stopped
  early on a dark product photo that happened to share the same tone,
  cutting off mid photo. Rule: require a sustained run of matching rows
  before trusting a footer boundary, not a lone pixel match, and always
  re-open the cropped result to confirm by eye (see "Optional:
  already-built creative" above).
- 2026-10-01, template-wide: the `IslandNav` mobile drawer rendered the
  CTA link ("Book a call") in the same plain black text as every other
  link, so it lost the visual priority it has as a filled button on
  desktop. Fixed by coloring just the last link `text-primary` in the
  drawer. Applies to every strategy page automatically since `IslandNav`
  is shared, nothing to do per brand.
- 2026-09-29, myowellness & naturesbest: David wanted the build compressed
  to two weeks (was four across three `how.steps`) and BFCM added as a
  standing default rather than an optional touch, both fixed and both
  hard rule + field table entries updated above. Also found the strategy
  page's own FAQ `<summary>` was missing
  `[&::-webkit-details-marker]:hidden` (present on the shared site
  `FaqSection` but never copied over here), so some Chromium builds
  rendered the native disclosure triangle stacked next to the custom
  `CaretDown` icon, two chevrons on one button. Rule: any new
  `<details>/<summary>` with a custom icon needs both `list-none` (Tailwind
  `list-style: none`) and `[&::-webkit-details-marker]:hidden`, one alone
  is not reliably enough.
- 2026-09-29, naturesbest: a bold span in `problem.text` covered two
  sentences ("**We signed up through it ourselves. No welcome email ever
  arrived.**"), and `splitParagraphs` broke its paragraph exactly between
  those two sentences, so each half rendered with an unmatched `**` and
  printed literal asterisks on the live page, caught by screenshotting and
  reading the rendered text, not by reading the source. Rule: added to
  hard rule 8 above, keep every bold span inside one sentence.
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
