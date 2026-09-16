---
name: case-study-writer
description: Build a real, data-backed case study page for skynosoft.net from an actual client's Klaviyo (and eventually other) account — real metrics, real email/campaign screenshots, real narrative. Use when the user asks to create, add, or update a case study in /work, or says a client's data/screenshots are ready to turn into one.
---

# Skynosoft Case Study Writer

Turns one real client engagement into a full `/work/<slug>` page: hero,
metrics, brand/challenge/goal/strategy/execution/results/why-it-worked
narrative, a horizontal gallery of real email screenshots, an optional
results chart, and (when the client supplies one) a review section.

This was built and refined end-to-end on the first real case study (Novaya,
a Quebec DTC apparel brand run on Klaviyo) — every rule below exists because
of something that actually went wrong or took several tries to get right on
that build. Read it before starting the next one.

## Hard rules (never break these)

1. **Never fabricate anything.** No invented metrics, quotes, testimonials,
   customer names, or "illustrative" numbers. Every stat and every screenshot
   must trace back to a real tool call in this conversation. If a number or
   asset can't be sourced for real, say so and ask, don't fill the gap.
2. **Never guess a CDN/asset URL.** If you don't have an image URL that came
   from an actual tool result in *this* session, don't type one out from
   memory or pattern-match one that "looks right" — download it, verify it,
   then use it. A guessed URL that happens to 200 is still not something you
   can vouch for.
3. **A pseudonym is fine until real assets are needed.** It's fine to discuss
   a client under a placeholder name while scoping, but once you're about to
   use their actual screenshots/photos, get explicit sign-off to use the real
   brand name — don't publish real creative under a fake name or vice versa.
4. **Never render a live customer-facing "review" from placeholder text**,
   even labeled "temporary, swap later." A fake quote attributed to a real
   client on a public page is a real deception risk if anyone sees it before
   the swap happens. Build the section, leave it conditionally unrendered
   (`clientReview` undefined) until the user hands you a real quote.
5. **Don't render a template with unresolved dynamic tags.** Klaviyo flow
   templates for cart/checkout/browse-abandonment often contain Django/Jinja
   tags (`{% for item in event.extra.line_items %}`) that only resolve
   server-side when Klaviyo actually sends the email. Opening that raw HTML
   in a browser shows broken template syntax, not a real cart. Either use
   `render_email_template` with a real context, or (usually simpler) pick a
   different, fully static template for the screenshot.
6. **Don't stop at the first few "top" results when picking visuals.** The
   highest-revenue campaigns are very often plain founder-voice text emails
   with zero images — real and worth citing in the metrics, but useless for
   a visual gallery. Check several down the list (or ask the user which
   sends they have in mind) before concluding "there's nothing visual here."

## Workflow

### 1. Scope and name

Confirm with the user: which client, which real name (or hold at a
pseudonym per rule 3), and roughly what's available (Klaviyo only, or also
website/social/other channels — try the live site early since sandbox
egress to arbitrary domains isn't guaranteed, see Gotchas).

### 2. Pull real performance data

Use the Klaviyo MCP tools (`ToolSearch` for exact schemas — they're
deferred). Useful sequence:

- `get_metrics` → find the `Placed Order` metric id, needed as
  `conversion_metric_id` everywhere below.
- `get_flows` (filter `status: live`) → the account's real lifecycle flows.
- `get_flow_report` → revenue/open-rate per flow, for the metrics row and
  the results chart.
- `get_campaigns` + `get_campaign_report` (`group_by: ["campaign_id"]`,
  `value_statistics: ["conversion_value", "revenue_per_recipient"]`) →
  sort by `conversion_value` descending to find real top performers. Large
  results get written to a file — read it with `node -e` (no `jq` in this
  environment), not `Read` line-by-line.
- Pick 2-4 flows/campaigns whose revenue numbers go directly into the page
  copy (results bullets, the chart). Cite exact figures, not rounded
  approximations, unless the user asks for rounding.

### 3. Get the real HTML for anything you'll screenshot

- `get_flow` with `additional_fields_flow: ["definition"]` to walk
  `entry_action_id` → the flow's action graph (time-delays, `ab-test`
  nodes with a `main_action` plus `current_experiment.variations`,
  `multi-branch-split`). Follow the `main_action` path for the "normal"
  version of each email.
- `get_flow_message` / `get_campaign_message` with
  `include: ["template"], fields_template: ["html"]` → the actual HTML.
  Skip any template with `{% for ... %}` / `{{ event.extra... }}` tags
  (rule 5) — check the account's other static emails/campaigns instead.
- For campaigns, don't rely on the internal admin name to guess content —
  fetch the actual message HTML. (Internal names are sometimes literally
  copy-pasted from the email's own headline, sometimes generic like
  "Message 1" — not reliable either way without checking.)

### 4. Render real screenshots

The bundled Playwright Chromium doesn't run on this Mac (old macOS). Use
the system Chrome install instead, and install `playwright-core` in the
**scratchpad**, not the project (`npm install playwright-core --no-save`
run from the scratchpad directory — adding it to the project's
`package.json`/lockfile isn't warranted for a one-off screenshot task):

```js
const { chromium } = require('playwright-core');
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const page = await browser.newPage({ viewport: { width: 600, height: 900 }, deviceScaleFactor: 2 });
```

- Write the real HTML to a local `.html` file (strip nothing but comments
  if you want; the `<img>` src URLs point at Klaviyo's real CDN, which is
  reachable even when the client's own storefront isn't — see Gotchas).
- `deviceScaleFactor: 2` — screenshots come out visibly sharper for the
  same crop.
- Before screenshotting, wait for every image to actually finish decoding,
  not just for `networkidle`:
  ```js
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll('img')).every(img => img.complete && img.naturalWidth > 0),
    { timeout: 30000 }
  );
  ```
  Skipping this produces blank grey boxes for anything below the fold.
- `sharp(...).trim({ threshold: 10 })` removes the outer page-background
  margin (`root-container-spacing` in Klaviyo templates typically pads
  ~50px of the page's background color above/below the actual white email
  card). **Check the trimmed result visually before shipping it** — if the
  email's own design has near-zero internal padding above its top element
  (often a logo wordmark), `.trim()` will cut straight to that element with
  zero breathing room, which reads as "cropped." Only pad manually
  (`sharp` composite onto a slightly taller white canvas) for a case where
  you've actually seen this happen — it's a per-image fix, not a default
  step to apply pre-emptively to every future screenshot.
- For a hero/lifestyle photo: prefer the actual native-resolution asset
  (`get_images`, sorted `-size`, or the `src` URL straight out of the
  template HTML) over cropping one out of your own downscaled full-page
  screenshot. The same photo is often available at 2x+ the resolution as
  a standalone asset.

### 5. Write the `content.ts` entry

`CaseStudy` type (`src/lib/content.ts`) — the rich fields
(`brandDescription` onward) render a fuller narrative page; omitting them
falls back to a generic `challenge`/`approach` template, which is fine for
older placeholder case studies but a real one should use the rich fields:

```ts
{
  slug, brand, category, services, summary, metrics, logoInitial,
  heroImage: { src, alt, width, height },               // real photo, landscape crop
  brandDescription: "...",                                // 1 paragraph, real
  challengePoints: ["...", "..."],                        // real, from the account's actual state
  goal: ["...", "..."],
  strategy: { intro: "...", points: ["...", "..."] },
  execution: ["...", "..."],
  resultPoints: ["...", "..."],                           // cite real numbers from step 2
  whyItWorked: ["...", "..."],
  gallery: [{ src, alt, width, height }, ...],            // 2-4 real screenshots from step 4
  resultsChart: { src, alt, width, height, caption },     // see below
  clientReview: undefined,                                // only fill when the user hands you a real quote
}
```

Never hardcode `width`/`height` — always read the actual file's dimensions
(`sips -g pixelWidth -g pixelHeight <file>` or `sharp(...).metadata()`)
after every crop/render, since a mismatch distorts the image in
`next/image`.

**Results chart**: when the real metric can't be screenshotted (e.g. it
only exists in Klaviyo's own dashboard UI, which needs an authenticated
browser session you don't have), build one honestly from the real numbers
instead of skipping it — a simple SVG-to-PNG bar chart via `sharp`, labeled
"pulled directly from the [X] report" in the caption so it's clear it's a
rendered chart, not a screenshot.

**No copy/layout changes needed in `work/[slug]/page.tsx` for a new case
study** — it's fully data-driven off `CaseStudy`. Only touch that file if
you're changing the *template* (spacing, a new section type) for every case
study, not populating one.

### 6. Verify before every deploy

Every one of these has bitten a deploy in this project. Do all of them,
every time, not just the first time:

1. `npm run build`. A `getaddrinfo ENOTFOUND` on the Sanity host mid-build
   is a transient DNS blip in this sandbox, not a real failure — flush DNS
   (`dscacheutil -flushcache`) and retry once before investigating further.
2. **Clear the Next.js image optimizer cache** after replacing any source
   image file: `rm -rf .next/cache/images`. It caches optimized output on
   disk keyed by `(url, width, quality, Accept-header-derived format)` for
   hours, with no invalidation on source-file content changes — the classic
   symptom is the browser showing an old crop/version via `/_next/image`
   while `curl`ing the same file directly (which bypasses the format-variant
   cache key) shows the new one.
3. **Actually kill the old server before restarting it.** `pkill -f
   "next start"` does not match the actual process name (`next-server`) —
   check `lsof -i :3000` for a stale PID that's been running far longer
   than your current session and `kill -9` it explicitly. A `next start`
   process keeps serving the *compiled JS it loaded at boot* even after
   you overwrite `.next` with a fresh build; only a real process restart
   picks up new code.
4. Screenshot the actual result with Playwright (same system-Chrome setup
   as step 4) at the real breakpoint(s) you changed, scrolled to the
   relevant section, after the same "wait for every image to decode" check.
   Read the screenshot. Don't infer correctness from the build succeeding.
5. Clean up scratch files (`rm -f` the temp HTML/PNGs, kill the dev
   server) before committing — never commit scratchpad output.

### 7. Ship it

`git add` the specific changed files (never `-A` blind), commit with a
message that says *what changed and why* (not just "update case study"),
push, then `vercel --prod --yes`. A `socket hang up` or similar transient
error from the Vercel API is common here too — retry once before treating
it as a real failure.

## Gotchas reference (things that cost real time on Novaya)

- **The live client site may not be reachable from this sandbox.** A `curl
  -v` that connects the TCP socket but then hangs/times out on the TLS
  handshake (`SSL connection timeout`) is the signature of blocked egress
  to that specific host, not a broken site — don't keep retrying the same
  domain with different Playwright wait strategies. Fall back to whatever
  CDN actually serves the account's asset library (for Klaviyo, that's
  `https://d3k81ch9hvuctc.cloudfront.net/...` or whatever the account's
  actual asset host is — it's reachable even when the storefront isn't,
  since it's the same CDN the email HTML itself already loads images from).
- **Large Klaviyo API results get written to a file, not returned inline.**
  Read them with `node -e "JSON.parse(fs.readFileSync(...))"` — there's no
  `jq` in this environment.
- **`get_campaign_report` group_by always includes `campaign_id`,
  `campaign_message_id`, `send_channel`** even if you don't ask for them —
  don't add them yourself or you'll get a duplicate-key error.
- **A/B tested flow messages**: `main_action` is the "normal" version;
  `current_experiment.variations` are the test arms. Use `main_action` for
  case-study purposes unless the user specifically wants the winning
  variant.
