---
name: ecommerce-performance-audit
description: Audit a real ecommerce store's live site for conversion and retention gaps, verified by actually visiting it, to qualify or brief an outreach lead for Skynosoft. Use when David shares a lead (a brand name, URL, or a scan/scraper summary of one) and wants to know if there's a real pitch here, or wants evidence before reaching out. Feeds the strategy-pitch-builder skill.
---

# Ecommerce Performance Audit

Turns "here's a lead" into a short, evidence-backed report David can act on:
either "here's the real gap, worth pitching" or "nothing solid here, skip
it." This is research, not writing, so nothing in the output should be
copy-ready pitch language, just verified findings and what they mean.

If a scan or scraper summary is pasted in (like a "lead card"), treat its
claims as a hypothesis to verify, not a fact to repeat. Scanners
misclassify things constantly: a variant showing as unavailable because it
was mid-restock when scanned, a signup form the scanner didn't detect
because it's JS-rendered, a "competitor" that's actually a reseller. Every
claim that goes in the final report must be something you personally saw on
the live site in this session, with a screenshot to back it, not something
you took on the scan's word.

## Hard rules

1. **Nothing in the report that wasn't verified live.** If the site
   contradicts the lead card (product back in stock, signup form exists but
   the scanner missed it), say so and correct the record, don't quietly keep
   the original claim.
2. **No score theater.** Don't invent a "72/100 CRO score" or similar. Numbers
   in the report are either directly observed (page load time, number of
   checkout steps) or explicitly labeled as an estimate.
3. **Don't complete a real purchase or submit a real signup/contact form**
   while auditing, unless David asks for that specifically. Get as far as
   confirming a flow exists and how it behaves without finishing it (for
   example: add to cart and reach the checkout page, but stop before
   payment).
4. **Time-box it.** This is meant to be fast, aim for one sitting, not a
   full days-long audit. Depth beats breadth on 2 to 3 real findings over a
   long list of minor ones.

## Step 1: Read what you're given

From a pasted lead card or brief, pull out: the domain, the category, any
claimed gap, and any contact info. Note what's a claim to verify versus
context (contact info, category) that's just useful background.

## Step 2: Visit the live site for real

Use Playwright with system Chrome (see "Tooling" in
`strategy-pitch-builder`'s SKILL.md for the exact setup and the scratchpad
`node_modules` gotcha, same tooling applies here). Do not rely on a text
fetch or a cached description, actually render the page.

Cover, as relevant to the category:

- **Homepage:** hero, nav, any popup or signup offer, how fast it feels to
  load.
- **The specific product(s) the lead flagged**, if any. Confirm current
  stock state yourself, don't trust a scan date.
- **Out of stock handling**, if relevant: is there a "notify me" / back in
  stock capture, or does the page just say unavailable with nothing to do
  next.
- **Email/SMS capture:** popup, footer form, anywhere else. Does one exist
  at all, and does it look active (not a dead form, not from three years
  ago going by copy/branding).
- **Cart and the start of checkout:** add a real product, reach checkout,
  note the number of steps, guest checkout availability, shipping cost
  transparency. Stop before payment (rule 3).
- **Mobile:** re-check the homepage and one product page at a phone width.
  Ecommerce traffic skews mobile; a desktop-only look misses real problems.
- **Reviews:** are there any on product pages, and do they suggest real
  demand worth building retention around (a product people already love is
  a better win-back pitch than one nobody's reviewed).

Screenshot each finding. Save under the scratchpad, not the project, this
is research, not a shipped asset yet.

## Step 3: Decide what's actually a finding

A finding needs two things: it's real (verified in Step 2) and it's fixable
in a way Skynosoft does (website CRO, or Klaviyo email/SMS). "Their logo is
dated" is real but not ours to pitch. "No back-in-stock capture on a
frequently out-of-stock product" is both real and exactly the kind of gap
the case studies already prove out.

Rank findings by revenue relevance, not by how easy they were to spot. One
sharp, provable gap beats five small ones.

## Step 4: Check what Skynosoft proof already exists

Look at `src/lib/content.ts` for a case study in the same or an adjacent
category (for a wellness/supplement brand: `lipo-beauty-tea`, `thyvita`,
`cannonbalm`, `bwll`). Note which one is the closest fit, this becomes the
proof point if the lead turns into a `strategy-pitch-builder` page.

## Step 5: Report back

Short, plain, no table theater. Structure:

1. **One line verdict:** worth pitching, or not, and why.
2. **What's confirmed vs. what the lead card got wrong or missed**, if
   anything.
3. **The findings**, 2 to 3, each: what you saw (with the screenshot),
   why it costs them money, and which Skynosoft service fixes it.
4. **Closest existing case study**, for later proof.
5. **What's still unverified**, if anything you couldn't check (for example,
   you can't see their actual email flows from outside, only that a signup
   exists, so you can't tell if a welcome flow fires).

If it's worth pitching, ask if David wants a `strategy-pitch-builder` page
built next, don't build it automatically. He decides which leads get the
full pitch treatment.

## Learnings log

Add newest first. Format: `YYYY-MM-DD, brand: what happened, rule it
produced.`

- 2026-09-29, naturesbest.co.uk: first reported their on-site search as
  broken, based on navigating directly to `/search?q=...` and typing into
  what looked like the visible search input. Both were wrong: the URL route
  doesn't reflect their real predictive search, and the page had three
  near-identical search inputs (one genuinely on screen, one an off-screen
  duplicate, one a zero-size stub) and I'd been clicking/typing into the
  wrong one, so I was reading stale leftover page links, not real results.
  David caught it by testing the real search himself and getting correct
  results. Retested against the actual visible input (found by comparing
  bounding boxes/ids of all matches, not the first one that matched a
  selector) and the search was fine all along. Rule: don't trust a single
  matched element when a selector could match more than one, check the
  bounding box or id and confirm you're driving the one a real visitor
  would see and use; and when a live claim is about interactive behavior
  (search, a form, a popup), drive the actual UI a user would use, not a
  URL pattern that looks equivalent. A wrong "broken search" finding sent
  to a prospect would have been worse than no finding at all, since they
  could disprove it in ten seconds.
- 2026-09-29, naturesbest.co.uk: confirming a negative (no welcome email
  after a real signup) needed a real signup, something only David could do
  since it needs a real inbox to check. The agent's own tools can confirm
  "no popup fired" and "no visible back-in-stock form" on their own, but
  "does the flow actually fire" sometimes needs the human in the loop. Rule:
  say plainly which findings are fully self-verified versus which ones need
  David to complete personally (a real signup, a real call, checking a real
  inbox), don't imply both are equally solid.
- 2026-09-29, naturesbest.co.uk: a domcontentloaded measurement varied
  wildly between two back to back runs (32s vs 10s), traced to one
  third-party script (their OrderGroove subscription widget) hanging once
  and not the next time. Reported the reproducible number (10s, consistent
  across runs) and did not cite the one-off 32s stall as a finding. Rule:
  run a timing check at least twice before citing it, and only report what
  repeats.
