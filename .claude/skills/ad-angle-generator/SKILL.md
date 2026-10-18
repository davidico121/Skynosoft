---
name: ad-angle-generator
description: Turn a meta-ad-lead-scout research doc into 2-3 distinct, evidence-backed ad creative angles with rationale, for the team to pick from before scripting. Use when a lead's research doc is done and the team wants angle options — "what angle should we come in with for X", "give me angle options for this brand".
---

# Ad Angle Generator

Takes a finished `meta-ad-lead-scout` research doc and produces a short
list of distinct creative angles — the hook/positioning strategy for the
ad — each tied to a specific, cited gap or fact from the research. This is
strategic thinking, not copywriting: no scripts, no scenes, just the angle
and why it fits this brand.

## Hard rules

1. **Read the research doc first, don't re-research.** If the doc is
   missing something an angle needs (no review quotes, no competitor
   data), say so and either pull it from the doc as-is or flag it as a gap
   — don't invent facts to fill it.
2. **Every angle must cite something real from the doc.** Each angle's
   rationale references a specific line: a review quote, a gap in their
   current ads, a competitor comparison, a site finding. "Vibes" is not a
   rationale.
3. **Angles must be genuinely distinct**, not the same idea reworded three
   times. Vary the mechanism (testimonial-driven, problem-agitate-solve,
   founder story, comparison, entertaining/concept-driven) not just the
   wording.
4. **Don't commit to one.** Present 2–3 options with tradeoffs; the team
   picks.

## Step 1: Pull the gap list

From the research doc's scorecard and ad audit, list what's specifically
missing or weak in the brand's current creative (e.g. "no UGC," "no social
proof on-screen," "same static ad for 6 months," "no comparison vs.
competitor"). This is the raw material — every angle should address at
least one of these directly.

## Step 2: Pull the available ammo

From the doc's brand facts section, list what's actually usable:
- Real review quotes (verbatim)
- Stated product differentiators
- Competitor gap (what the competitor does that this brand doesn't)
- Any site/CRO finding that supports a problem framing

## Step 3: Generate 2-3 angles

For each angle, cover:

- **Name** (e.g. "UGC Testimonial," "Problem-Agitate-Solve," "Founder
  Story," "Direct Comparison," "Entertaining Concept")
- **The hook idea** — one sentence, not full copy
- **Why this brand specifically** — cite the exact gap (Step 1) and ammo
  (Step 2) it uses
- **Tone** — straight UGC-style testimonial, or a more entertaining/
  concept-driven piece (the team has said both are in play; name which this
  angle leans toward)
- **Risk/tradeoff** — what could make this angle not land (e.g. "relies on
  review quotes being strong enough to carry the hook")

Typical angle set for a brand with weak/no video and no social proof:
1. A UGC testimonial angle built on a real review quote
2. A problem-agitate-solve angle built on a site/CRO gap or common
   complaint found in comments
3. An entertaining/concept angle that doesn't read as UGC at all, if the
   product or audience supports it

Don't force a third angle if only two are genuinely distinct and
well-supported — thin ammo for a forced angle is worse than two solid
ones.

## Step 4: Write it up

Add an "Angles" section to the same research doc (or a short companion
doc linked from it) titled `<Brand> — Angle Options`. One short section
per angle in the format above. End with a one-line recommendation of
which angle you'd pick first and why, but make clear it's a
recommendation, not the final call.

Handoff line: "Pick an angle, then run `ad-script-writer` with it."
