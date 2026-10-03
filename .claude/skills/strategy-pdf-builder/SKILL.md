---
name: strategy-pdf-builder
description: Run a team member through the full outreach funnel, step by step, exactly as the password-gated web tool would have, and turn it into a Skynosoft-branded strategy PDF they can send cold. No live web page, no deploy, no API key. Use when a team member wants to build a client pitch themselves, or asks "help me pitch this brand" / "build a strategy PDF for X" / "walk me through an audit".
---

# Strategy PDF Builder

The web-tool version of this (a password-gated form at strategy.skynosoft.net)
needs an Anthropic API key we don't have yet. This is the API-key-free
alternative, and it has to actually replace the tool's job, not just
produce the same file a different way: **you drive the conversation.** The
team member doesn't bring you a finished brief, you take them through it,
one step at a time, the way the form would have: a question or two, their
answer, confirmation, next step. Announce where they are ("Step 2 of 7:
Email marketing audit") at the start of each step so it reads as a funnel
with an end in sight, not an open ended chat.

This skill carries the real substance of two other skills, not just a
pointer to them, so it works standalone even in a session where they
aren't loaded: the audit rigor of `ecommerce-performance-audit` (Section 1
below) and the page-building rules of `strategy-pitch-builder` (Section 3
below). If both those skills happen to be available too, their fuller
detail and learnings logs are worth a glance, but everything needed to run
this end to end is here.

## Hard rules

1. **Nothing invented.** Every claim, number, or quote in the PDF must
   come from what the team member actually verified, or from a real
   Skynosoft case study (`src/lib/content.ts`). Unverified becomes "ask
   them" or an explicitly labeled estimate, never a flat assertion.
2. **The team member is the auditor, you are the interviewer and writer.**
   Don't browse the prospect's site yourself and hand back findings as if
   they verified them. You can verify alongside them if they share the
   URL and want a second pass (Playwright, see Section 1), but their own
   eyes are the primary source every time, ask for their notes first.
3. **Say plainly what's fully verified versus what needs them to still
   check.** Some things only a human can confirm (did a real welcome
   email actually land in a real inbox). Don't present a guess with the
   same confidence as something seen firsthand.
4. **No fabricated client results or named competitors.** Real Skynosoft
   case studies only. Only name a competitor's tactic if the team member
   confirms it's real and verified.
5. **No em dashes, no hyphens in copy** (write "win back," not
   "win-back"). No AI cliches ("elevate," "seamless," "unleash"). Match
   the Voice section below.
6. **The PDF must look like it came from Skynosoft.** Brand fonts, brand
   colors, the real logo. Section 4 covers exactly how.
7. **One step at a time, always announce the step.** Never ask for
   Phase 2 and Phase 4 information in the same message. Never silently
   skip a step because earlier answers seemed to cover it, confirm with
   them first ("You mentioned X already, that covers the reorder timing
   question, did you want to add anything else here, or move to Step 4?").

## Section 1: The site and email audit, done right (absorbed from `ecommerce-performance-audit`)

This is what makes Steps 2 and 3 below more than "tell me what you
think." Use this to coach the team member through an audit that's
actually evidence grade, the same bar David's own lead-qualification
audits meet.

**What counts as a finding:** it has to be real (they actually saw it,
not inferred from a scanner or assumed) and it has to be something
Skynosoft fixes (website CRO, or Klaviyo email/SMS). "Their logo looks
dated" is real but not ours to pitch. "No back-in-stock capture on a
product that's frequently out of stock" is both real and exactly the
kind of gap the case studies already prove out. Rank by revenue
relevance, not by how easy it was to spot, one sharp provable gap beats
five small ones.

**Verification discipline:**
- Watching a page for ten seconds and concluding "no popup" is not
  verification, a popup can be on a delay, or suppressed by a dismiss
  cookie from an earlier visit. If they're not sure, say so rather than
  asserting it.
- A scanner or a quick glance misclassifies things constantly: a
  JS-rendered signup form it didn't detect, a product mid-restock read
  as permanently out of stock. Trust what was actually seen this time,
  not an old assumption, even their own.
- Don't complete a real purchase or submit a real contact form while
  auditing, stop at reaching checkout or confirming a flow exists.
- This is meant to be fast, not a days-long audit. 2 to 3 real findings,
  well verified, beats a long list of minor ones.

**If they give you a URL and want you to also check (optional, not a
substitute for their own look):** use Playwright with system Chrome.
Cover, as relevant: homepage (hero, nav, any popup/signup offer, load
feel), out of stock handling (notify-me capture or nothing), email/SMS
capture (does one exist, does it look active), cart and the start of
checkout (steps, guest checkout, shipping cost shown upfront, stop
before payment), mobile at phone width, and reviews (do they suggest
real demand). Screenshot findings, save under the scratchpad.

**The email side specifically needs a human in the loop.** Confirming a
welcome email actually fires needs a real signup and a real inbox,
that's not something you can verify from outside. Say clearly in the
compiled notes which parts are self-verified (a popup existing, its
copy) versus which rely entirely on the team member's own signup (the
welcome email's content, its timing, its design quality).

## Section 2: Voice

This is the register every section of the PDF should land in, same as
the live strategy pages (established from David's own draft,
2026-09-28). Raw and direct, closer to a message from David than a
landing page. Read a section out loud when done, if it sounds like brand
copy instead of a person talking, rewrite it.

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
  X on ads. If Y% of that went to customers who buy once, that's Z
  gone." Walk the math, only with real numbers (hard rule 1).
- **Repetition as the closing beat.** Short repeated fragments ("Not
  next week. Now.") land harder than one smooth sentence.
- **Section headings are spoken lines**, not labels. "Why throwing more
  money at ads won't work," not "The Problem With Ad Spend."
- No em dashes, no hyphens (write "customers who buy once," not
  "one-time customers"), nothing invented.

For the pitch email specifically (Section 5), match the rhythm of
`references/pitch-email-examples.md`: a one-line hook, a specific
observation about their actual site, the mechanism of why it's costing
them money, a credible but not overclaimed fix, a low pressure call to
action, a PS that removes the sales-call anxiety.

## The interview (run this as the funnel, in this order, one step at a time)

Open by telling them how many steps there are and that you'll announce
progress as you go. Then run each step as a real back and forth, wait
for their answer before moving on. If they dump everything in one
message up front, skip straight to confirming gaps and compiling, but
still walk through anything ambiguous step by step rather than guessing.

### Step 1 of 7: The basics
Say: "Step 1 of 7: the basics. What's the brand, their site URL, and
who's sending this pitch (your name and title, for the sign off)?"

### Step 2 of 7: Site / CRO audit
Say: "Step 2 of 7: site audit. Go spend a few minutes on their actual
site and tell me what you find." Then prompt with the Section 1
checklist: homepage/popup, out of stock handling, cart and checkout
steps, mobile, reviews, anything else that jumped out. Push back gently
on anything that sounds like a guess rather than something they saw
("did you actually scroll past the popup delay, or is that an
assumption?"), per the verification discipline above. Offer to also
check with Playwright if they share the URL and want a second pass.

### Step 3 of 7: Email marketing audit
Say: "Step 3 of 7: email audit. Actually sign up for their list (popup
or footer form) and report back." Prompt: did a popup appear and what
did it offer, did a welcome email arrive and how long did it take, what
does it actually say and show (screenshot if possible, covered in Step
4), is there a clear next action or does it bury the offer, anything
else (tone, design quality, broken links, no email at all). Remind them
per Section 1 that this one genuinely needs their own inbox, you can't
verify it for them.

### Step 4 of 7: Assets
Say: "Step 4 of 7: anything to show. Do you have mockups, a redesign, or
a screenshot of their current email/popup to compare against?" Have them
attach files directly in chat. Note which slot each goes to (before/
after comparison, a benefit card image) as they're uploaded. Fine to
have nothing, the page works without visuals.

### Step 5 of 7: Strategic angle
Say: "Step 5 of 7: angle. Is this mainly a CRO pitch, an email marketing
pitch, or both? And what's the urgency, BFCM, Q1 reset, rising ad costs,
a seasonal moment, or none?" Per the live template's standing rule,
default to BFCM if nothing else applies and it's plausible timing,
nearly every ecommerce brand cares about it, don't make them think of it
themselves if it's the obvious fit.

### Step 6 of 7: Anything else
Say: "Step 6 of 7: anything you want emphasized or specifically avoided
before I build this?" Last chance to add something that doesn't fit the
earlier steps.

### Step 7 of 7: Confirm and build
Say: "Step 7 of 7: building the page." Briefly recap what you have (one
line per step) so they can catch anything wrong before you write 800
words around it, then go. Don't ask permission beyond that recap if
every step was answered, just confirm and build.

## Section 3: Page structure (absorbed from `strategy-pitch-builder`)

Build these sections, in order, into `references/pitch-template.html`
(copy it to the scratchpad first, fill in every placeholder). Every
section's styling must match Skynosoft's actual brand exactly, not an
approximation, that's non-negotiable, which is why both
`pitch-template.html` and `references/branded-report-example.html`
(a real, previously shipped report, same CSS tokens, different
component shapes: data tables, stat tiles, status/priority chips, an
alert callout) exist as the two canonical references. If a brand's
pitch needs something `pitch-template.html` doesn't already have a
block for (a results table, a flagged warning, a stat row), copy the
matching component's CSS from `branded-report-example.html` rather than
inventing a new visual pattern, then add it to `pitch-template.html`
too so the two stay in sync. Field by field, with the six agreements
they have to earn mapped to each:

| Section | What goes here | Which agreement it earns |
| --- | --- | --- |
| Hero (eyebrow, headline, subheading) | Outcome for THEIR customers, something only their exact buyer would recognize, a named customer/moment from Step 2/3 notes if one exists | **1. "This is for me."** If the first line could sit on any brand's pitch, rewrite it. |
| Gap (3 steps) | The real customer journey from Step 2/3: first touch, the moment that should trigger something, what actually happens (nothing). `leak` styling on the step(s) where it breaks. | **2. "This problem matters."** Don't just say what's missing, name what it costs: money already spent acquiring that customer, momentum lost into BFCM, time lost starting Q1 from zero. Two or three concrete losses beat one vague one. |
| Problem / solution | Problem is one real scene from the audit notes, not a generic statement. Solution is 3 to 5 reframes, not a feature list. | **3 and 4.** Before the fix, name what they're probably already doing that won't close the gap (more ad spend, a generic newsletter, "we'll get to it after BFCM") and say why, only with real numbers if you have them (hard rule 1), otherwise keep it qualitative. Then the reframe: "timed to when their pouch runs low," not "we send automated flows." |
| Benefits (3 to 5) | Outcome led, concrete moments. Pull in uploaded assets here (Step 4) if any exist. | Supports #4, makes the better way tangible. |
| Proof (1 to 2 case studies) | Real Skynosoft case studies from `src/lib/content.ts`, closest category first, their real dollar metrics, never invented. | **5. "This will work for me."** If no case study is close enough, say so rather than stretching a far one. |
| The plan (3 short numbered steps) | A short, concrete build plan. Default to 2 weeks total (week 1 strategy and build together, week 2 test and launch), matching the live template's current default, not a longer spread unless they specifically want one. | **6. "Can't keep putting this off."** Anchor timing to the BFCM/angle from Step 5, not to today's date, the PDF might sit unsent for a while. |
| Risk reversal | "See the plan before you spend anything" pattern, makes starting feel safe precisely so the urgency elsewhere doesn't read as pressure. | Supports #6 without adding pressure. |
| Closing statement + sign off | One or two sentence big closing line, then the sender's real name/title from Step 1. | Closes the funnel. |

Copy checks before finalizing (the specificity checklist, same as the
live pages):
- Could this sentence appear on a competitor's pitch unchanged? If yes,
  rewrite it.
- Is there a named person, product, or moment from THEIR site somewhere
  in the hero, the problem, and at least one benefit?
- No em dashes, no hyphens in copy.
- Bold exactly one key phrase per paragraph/point where it earns
  emphasis, written directly as `<strong>...</strong>` in the filled
  HTML (this is static HTML with no markdown parser, unlike the live
  site, don't leave `**asterisks**` in the output).

## Section 4: Building the HTML and PDF

1. Copy `references/pitch-template.html` to the scratchpad, fill in
   every placeholder with real content from the interview.
2. Embed the brand fonts. The three files are already in this skill's
   `assets/fonts/` (`sora.woff2`, `hanken.woff2`, `jetbrains.woff2`), no
   network fetch needed. Run:
   ```
   python3 .claude/skills/strategy-pdf-builder/scripts/embed-assets.py <your-filled-html> <output-html>
   ```
   This base64-embeds the three fonts and any image referenced by local
   path with an `<!-- EMBED: /path/to/file.jpg -->` comment directly
   above its `<img>` tag (see the template for the exact pattern,
   including the logo and sign off photo). Output is one self-contained
   HTML file, nothing loads from the network.
3. Convert to PDF:
   ```
   bash .claude/skills/strategy-pdf-builder/scripts/render-pdf.sh <output-html> <final.pdf>
   ```
   Finds a local headless Chromium and prints the HTML straight to PDF.
   If none is found, hand the user the HTML file directly and tell them
   to print it to PDF from their own browser (Cmd/Ctrl+P, Save as PDF).
4. Read the PDF back (the `Read` tool opens PDFs directly) to check
   pagination: no orphaned headings at the bottom of a page, nothing
   splitting awkwardly. The template's `@media print` rules handle most
   of this, but check the real output.
5. Send both files to the user (`SendUserFile`), the PDF as the primary
   deliverable, the HTML in case they want to tweak and reprint it later.

## Section 5: The pitch email

Once the PDF is approved, offer to draft the cold email too, same
information, no new interview needed. Follow
`references/pitch-email-examples.md` for structure and voice. Always
hand it back as a draft to read, edit, and send themselves, never send
anything automatically.

Required shape:
1. A specific, real hook from the actual audit, not a generic opener.
2. What's genuinely working (if true), earns the right to critique.
3. The specific problem, in plain mechanical terms: what's happening,
   why it costs money.
4. The fix, framed as a reasonable next step, not a hard sell.
5. A credible, honestly caveated result estimate ("typically unlocks X"
   or "based on brands I've worked with"), never a guaranteed number.
6. A low pressure call to action: a specific Calendly link, phrased as a
   quick call.
7. A PS that defuses sales anxiety.

Sign off with the team member's real name and title from Step 1, not
David's, unless David is the one running the skill.

## Learnings log

Add newest first: a rule that would have saved time, a template section
that needed extending, a PDF pagination fix, a copy pattern that worked
well in a real reply, a funnel step that confused someone.

- 2026-10-03: Added `references/branded-report-example.html`, a second
  real example (the MaxSleek report) built from the exact same CSS
  tokens as `pitch-template.html`, confirmed identical, after being
  asked to make sure the output styling matched it. It covers component
  shapes the pitch template doesn't need on its own (data tables, stat
  tiles, status/priority chips, an alert callout), kept as a copy-from
  source rather than duplicating a new visual language, see Section 3.
- 2026-10-03: Rebuilt as an explicit, numbered, step-announcing
  interview (was a looser "ask one phase at a time" before), and pulled
  the real substance of `ecommerce-performance-audit` (verification
  discipline, what counts as a finding) and `strategy-pitch-builder`
  (field table, six agreements, specificity checklist, two week plan
  default, BFCM-by-default) directly into this file instead of just
  pointing at them, so the skill works fully standalone. Font embedding
  and the headless Chromium print recipe are carried over from the
  MaxSleek report build, confirmed working end to end, including two
  bugs caught and fixed in the template's EMBED comment handling (see
  `references/pitch-template.html`'s own trailing notes for the
  comment-nesting gotcha).
