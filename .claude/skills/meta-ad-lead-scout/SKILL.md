---
name: meta-ad-lead-scout
description: Research a real ecommerce brand's Meta ads, site, reviews, and competitors to produce a sourced, scored lead research doc — before any angle, script, or video gets written. Use when the team finds a brand on Meta Ad Library (or anywhere) and wants to know if it's a viable lead, or needs the grounded research base the rest of the creative pipeline (ad-angle-generator, ad-script-writer, storyboard-builder) reads from.
---

# Meta Ad Lead Scout

Turns "found this brand on Meta Ad Library" into one sourced research doc:
a scored checklist on whether their ad creative is actually weak, plus every
fact the later creative steps are allowed to use. This is research, not
creative — nothing here is pitch copy, and nothing downstream may cite a
claim that isn't in this doc.

## Hard rules

1. **Every fact must be sourced.** Each line in the doc says where it came
   from (a URL, "Meta Ad Library, ad started running X", a review platform
   name). No invented stats, review quotes, claims, or "customers say"
   lines. If you can't verify something, label it "unverified" or leave it
   out.
2. **Verify live, don't trust secondhand summaries.** If the team pastes a
   scraper/scan summary, treat it as a hypothesis to check against the real
   site and real Ad Library listing, not a fact to repeat.
3. **No score theater.** The scorecard in Step 3 uses the fixed criteria
   below only — don't invent new point categories or round numbers to make
   a lead look better/worse than it is.
4. **Time-box it.** One sitting. Depth on the checklist below beats
   collecting everything findable about the brand.
5. **This doc is the single source of truth for the rest of the pipeline.**
   `ad-angle-generator`, `ad-script-writer`, and `storyboard-builder` must
   only use what's written here. If they need something this doc doesn't
   have, they come back and research it, they don't guess.

## Tooling

Use a real browser (the built-in browser or Chrome extension skill,
whichever this session has) to visit:
- `https://www.facebook.com/ads/library/` filtered by the brand's Page —
  search by brand name, or paste a direct Ad Library URL if the team has one.
- The brand's own site and product pages.
- Review sources: on-site reviews, Trustpelot/Google reviews, Amazon
  listing if they sell there, comments on their own Meta ads/posts.

Don't rely on a cached or text-only fetch for the Ad Library — it's
JS-heavy and a plain fetch will miss active ads. If the live browser can't
reach it, say so explicitly in the doc rather than filling the gap with a
guess.

## Step 1: Brand & product facts

Pull from the brand's own site, not assumptions:
- Product name(s), price points, variants/SKUs relevant to a potential ad
- Claims the brand makes about itself (ingredients, materials, specs,
  guarantees) — quote or closely paraphrase, cite the page
- Stated differentiators — what *they* say makes them different, not what
  you'd guess
- 5–10 real customer review quotes, verbatim, with source and reviewer
  name as shown. These are the only testimonial lines later steps may use.

## Step 2: Current ad creative audit (Meta Ad Library)

For every active ad on the brand's Page, record:
- Format: static image, carousel, UGC-style video, produced/studio video
- Hook (first line of copy or first 3 seconds of video)
- Visual style (stock photo vs. real product/lifestyle vs. UGC talent)
- CTA used
- "Started running on" date shown by the Library (proxy for how stale/fresh
  the creative is)
- Total count of active ads (proxy for testing velocity / spend)

Note explicitly what's **missing**: no video at all, no UGC, no
testimonials on-screen, no urgency/offer, same creative running untouched
for months. This gap list is the evidence base for Step 3.

## Step 3: Score the lead

Score each criterion 0–2 (0 = absent/bad, 1 = partial, 2 = strong) — this
is a gap-finder, so a **low score on creative quality is what makes a
lead worth pitching**:

**Creative quality**
- Hook strength across active ads
- Format diversity (video/UGC present vs. static-only)
- Creative freshness (recently started ads vs. one stale creative for months)
- Use of real social proof on-screen (testimonials, reviews, UGC)

**Spend/scale signal** (budget exists, so creative is the fixable bottleneck)
- Active ad count (more = more apparent spend)
- Targeting breadth suggested by ad variety
- Evidence of real traction: review volume/recency, apparent catalog size

Total both halves. State the verdict in one line: e.g. "Low creative score
(3/8), high spend signal (6/6) → real pitch: money is being spent on weak
creative." A brand scoring high on both halves (good creative already) is
a weak lead — say so plainly, don't force a pitch.

## Step 4: Competitor benchmark

Pick 1–2 direct competitors in the same niche. Run the same Ad Library
check on them (format, hook, freshness). This is what lets the angle step
later say "competitor X already does Y, this brand doesn't" with a real
example instead of an opinion.

## Step 5: Site/CRO cross-check (optional, if `ecommerce-performance-audit` hasn't run)

If no site audit exists yet for this brand, do a light pass: is there an
obvious gap the ad's agitate section could honestly point to (no reviews on
PDP, no urgency, slow load, bad mobile checkout)? If `ecommerce-performance-audit`
has already run for this lead, just link/reference its findings instead of
redoing the work.

## Step 6: Write the doc

Create one Claude Doc (or Google Doc per team preference) titled
`<Brand> — Lead Research`. Structure:

1. **Verdict** — one line: pitch or skip, and why (from Step 3's score)
2. **Brand & product facts** (Step 1), with sources
3. **Current ad creative audit** — table of active ads with format/hook/date
4. **Scorecard** (Step 3) with the point breakdown shown, not just the total
5. **Competitor benchmark** (Step 4)
6. **Site/CRO notes** (Step 5), if done
7. **Open questions / unverified items** — anything you couldn't confirm,
   flagged so downstream steps know not to use it

End with a short handoff line: "Ready for `ad-angle-generator`" or "Skip —
[reason]."
