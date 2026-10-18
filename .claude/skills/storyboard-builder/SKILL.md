---
name: storyboard-builder
description: Turn a finished ad-script-writer script into a shot-by-shot storyboard (shot description, VO/text overlay per beat, b-roll/product needs, duration) ready to hand to the team for filming/editing. Use when a script is approved and the team needs the shot list — "storyboard this", "break this script into shots".
---

# Storyboard Builder

Turns an approved script into the shot list the team actually films from.
No new copy or claims get introduced here — this step breaks the existing
script into executable shots, it doesn't rewrite it.

## Hard rules

1. **Don't change the script's words.** If a beat doesn't translate to a
   clean shot as written, flag it back to the script rather than quietly
   rewriting the line here.
2. **Every shot must be filmable by the team with what they likely have**
   (phone/camera, the product, a talent on camera or voiceover) — don't
   call for equipment or locations that aren't realistic for a short-form
   ad shoot unless the team specifically has access to it.
3. **Keep durations realistic and additive** — they should sum to roughly
   the script's target runtime (15–30s), not run long.

## Step 1: Confirm input

You need the finished script (from `ad-script-writer`) with its beats
already defined. If the script isn't finalized, point back to that step
first.

## Step 2: Break into shots

For each beat in the script, produce one or more shots:

| Field | What goes here |
| --- | --- |
| Shot # | Sequential |
| Beat | Which script beat this covers (hook, agitate, proof, CTA, etc.) |
| Shot description | What the camera sees — framing, who/what's in frame, action |
| VO / on-screen text | The exact line from the script spoken here, or text overlay if silent |
| B-roll / product needs | Specific product shot, packaging, environment needed |
| Duration | Approximate seconds |

A hook beat might be one shot; a proof beat might be two (talent speaking
+ a cutaway to the product or a review screenshot). Split only when it
genuinely helps filming, not for padding.

## Step 3: Flag anything unclear

If a shot depends on something not confirmed yet (does the team have the
product in hand, is there a specific location/talent available), list it
as an open item rather than guessing a workaround.

## Step 4: Output

Add to the lead's doc, titled `<Brand> — Storyboard: <Angle Name>`:
1. The shot list table (Step 2)
2. Open items / dependencies (Step 3)
3. Total estimated runtime, checked against the script's target

This is the final deliverable in the research → angle → script →
storyboard chain — from here the team films and edits themselves. If the
lead later becomes a client, the finished video and these research
artifacts are also what feeds `strategy-pitch-builder` or `case-study-writer`.
