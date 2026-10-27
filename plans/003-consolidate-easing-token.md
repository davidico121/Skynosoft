# 003 — Consolidate the duplicated easing token and fix the drifted duration outlier

- **Status**: TODO
- **Commit**: ec28ab5
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens
- **Estimated scope**: 7 files, one line added/removed or edited per file

## Problem

AUDIT.md's cohesion rule: "Curves and durations should live as shared tokens. Five hand-typed cubic-beziers that almost match is a consolidation finding." This repo has it worse than "almost match" — the exact same string, `"ease-[cubic-bezier(0.32,0.72,0,1)]"`, is hand-typed as a local `const EASE` in six files and inlined directly (no variable at all) in two more, for eight total duplicates of one canonical value. The canonical, exported version already exists at `src/components/ui/page-kit.tsx:3`:

```tsx
export const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
```

Duplicate declarations (`const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";`), to be replaced with an import from `page-kit.tsx`:

- `src/app/strategy/IslandNav.tsx:6`
- `src/app/strategy/all/page.tsx:12`
- `src/components/ui/Reveal.tsx:5`
- `src/components/ui/CaseStudyCard.tsx:8`
- `src/app/strategy/[slug]/page.tsx:32`

Inline literal usages (no variable, hardcoded directly in a className), to be replaced with `${EASE}` interpolation:

- `src/app/david/page.tsx:65` and `src/app/david/page.tsx:73` (both already inside template-literal classNames)
- `src/app/strategy/not-found.tsx:15` (currently a plain string, not a template literal)

Separately, one duration has drifted from the rest of the codebase. Every hover-lift card in the repo (`(site)/blog/page.tsx:51`, `(site)/page.tsx:215`, `(site)/about/page.tsx:190`, `strategy/all/page.tsx:52`, `components/blog/BlogCard.tsx:11`) uses `transition-all duration-300 ${EASE} hover:-translate-y-1`. One does not — `src/app/strategy/[slug]/page.tsx:376`:

```tsx
/* src/app/strategy/[slug]/page.tsx:376 — current */
className={`rounded-xl border border-border-hairline bg-card p-8 transition-all duration-500 ${EASE} hover:-translate-y-1`}
```

This is the benefits-grid item card on every strategy pitch page — a visitor hovering down the list of benefits feels a noticeably slower lift on this one card type than on every case-study/blog card elsewhere in the product, for no documented reason.

## Target

Six files importing `EASE` from the single canonical source instead of re-declaring it:

```tsx
/* src/app/strategy/IslandNav.tsx — add to imports, remove line 6 */
import { EASE } from "@/components/ui/page-kit";
```

```tsx
/* src/app/strategy/all/page.tsx — add to imports, remove line 12 */
import { EASE } from "@/components/ui/page-kit";
```

```tsx
/* src/components/ui/Reveal.tsx — add to imports, remove line 5 */
import { EASE } from "@/components/ui/page-kit";
```

```tsx
/* src/components/ui/CaseStudyCard.tsx — add to imports, remove line 8 */
import { EASE } from "@/components/ui/page-kit";
```

```tsx
/* src/app/strategy/[slug]/page.tsx — add EASE to existing-style import, remove line 32 */
import { EASE } from "@/components/ui/page-kit";
```

```tsx
/* src/app/david/page.tsx — add EASE to the existing page-kit import on its current import line */
import { BUTTON, BUTTON_SECONDARY, EASE, Eyebrow, FOCUS, H2, Section, Wrap } from "@/components/ui/page-kit";
```

Two inline literals replaced with the imported token:

```tsx
/* src/app/david/page.tsx:65 and :73 — target (same change, two call sites) */
className={`rounded-full font-body text-base text-foreground-muted transition-colors duration-300 ${EASE} hover:text-foreground ${FOCUS}`}
```

```tsx
/* src/app/strategy/not-found.tsx:15 — target */
import { EASE } from "@/components/ui/page-kit";
// ...
className={`mt-8 rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
```

And the duration outlier fixed to match every other hover-lift card:

```tsx
/* src/app/strategy/[slug]/page.tsx:376 — target */
className={`rounded-xl border border-border-hairline bg-card p-8 transition-all duration-300 ${EASE} hover:-translate-y-1`}
```

## Repo conventions to follow

- `page-kit.tsx` is already the canonical export point for shared tokens (`EASE`, `FOCUS`, `BUTTON`, `BUTTON_SECONDARY`) and several components already import from it correctly — follow `src/components/layout/Navbar.tsx:7` as the exemplar: `import { BUTTON, EASE, FOCUS } from "@/components/ui/page-kit";`.
- `src/app/david/page.tsx:11` already imports multiple named tokens from `page-kit` in one line (`import { BUTTON, BUTTON_SECONDARY, Eyebrow, FOCUS, H2, Section, Wrap } from "@/components/ui/page-kit";`) — add `EASE` into that same existing import rather than adding a second import line.
- Every hover-lift card pattern (`transition-all duration-300 ${EASE} hover:-translate-y-1`, optionally with `hover:border-border-hairline-strong` and/or `active:scale-[0.99]`) is the repo's established card-hover convention — see `src/components/blog/BlogCard.tsx:11` as the clean exemplar.

## Steps

1. `src/app/strategy/IslandNav.tsx`: delete line 6 (`const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";`) and add `import { EASE } from "@/components/ui/page-kit";` to the import block at the top of the file (after the existing `next/image` import). Leave the local `FOCUS` (lines 7-8) and `BUTTON` (line 9) constants exactly as they are — they are out of scope for this plan.
2. `src/app/strategy/all/page.tsx`: delete line 12 (`const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";`) and add `import { EASE } from "@/components/ui/page-kit";` to the import block at the top (after the existing `logo` import on line 5). Leave the local `FOCUS` constant (lines 13-14) exactly as it is.
3. `src/components/ui/Reveal.tsx`: delete line 5 (`const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";`) and add `import { EASE } from "@/components/ui/page-kit";` to the import block at the top (after the existing `react` import on line 3).
4. `src/components/ui/CaseStudyCard.tsx`: delete line 8 (`const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";`) and add `import { EASE } from "@/components/ui/page-kit";` to the import block at the top (after the existing `MetricStat` import on line 6).
5. `src/app/strategy/[slug]/page.tsx`: delete line 32 (`const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";`) and add `import { EASE } from "@/components/ui/page-kit";` to the import block at the top (after the existing `IslandNav` import on line 24, before the `logo`/`founderAvatar` image imports — placement among imports doesn't matter beyond staying in the import block). Leave the local `FOCUS` (line 33) and `BUTTON` (line 34) constants exactly as they are.
6. `src/app/strategy/[slug]/page.tsx`, line 376: change `transition-all duration-500` to `transition-all duration-300` (the `${EASE}` interpolation right after it now resolves via the step-5 import — no further change needed on this line beyond the duration number).
7. `src/app/david/page.tsx`, line 11: change the existing import line from `import { BUTTON, BUTTON_SECONDARY, Eyebrow, FOCUS, H2, Section, Wrap } from "@/components/ui/page-kit";` to `import { BUTTON, BUTTON_SECONDARY, EASE, Eyebrow, FOCUS, H2, Section, Wrap } from "@/components/ui/page-kit";` (insert `EASE` alphabetically between `BUTTON_SECONDARY` and `Eyebrow`).
8. `src/app/david/page.tsx`, lines 65 and 73: in both classNames, replace the literal substring `ease-[cubic-bezier(0.32,0.72,0,1)]` with `${EASE}` (both are already inside backtick template-literal classNames, so this is a straight substring swap).
9. `src/app/strategy/not-found.tsx`: add `import { EASE } from "@/components/ui/page-kit";` to the top of the file (after the existing `import { SITE_URL } from "@/lib/content";` line). Then on line 15, convert the `className="..."` plain string to a template-literal `className={`...`}` and replace the literal substring `ease-[cubic-bezier(0.32,0.72,0,1)]` with `${EASE}`, keeping every other class in that string exactly as written (including the hardcoded `focus-visible:*` classes — those are a separate, unselected `FOCUS`-token finding and stay untouched).

## Boundaries

- Do NOT consolidate the local `FOCUS` or `BUTTON` constants in any of these files into `page-kit.tsx` imports — only `EASE` is in scope for this plan.
- Do NOT touch `page-kit.tsx` itself — it is already the canonical source and needs no edit.
- Do NOT change any duration, modifier, or other class besides the one `duration-500` → `duration-300` swap at `strategy/[slug]/page.tsx:376` and the `transition-all`/property list on that same line stays as `transition-all` (that broader `transition-all` cleanup is plan 002's territory, not this one, and plan 002 only covers `page-kit.tsx`'s `BUTTON`/`BUTTON_SECONDARY` — leave this card's `transition-all` as `transition-all`, change only the duration number).
- Do NOT add new dependencies or create a new tokens file — `page-kit.tsx` already is the token source.
- If any cited line doesn't match what's currently in the file (drift since commit `ec28ab5`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint` and `npx tsc --noEmit` from `/Users/mac/Projects/skynosoft`, both expected clean — an unused-import or duplicate-identifier error on any of the seven files means a declaration wasn't fully removed or an import was malformed. `grep -rn "const EASE = " src/` should return zero results afterward (page-kit.tsx is the sole declaration — note it uses `export const EASE`, not a bare `const EASE`, so this grep correctly excludes it). `grep -rn "cubic-bezier(0.32,0.72,0,1)" src/` should return exactly one result: `page-kit.tsx:3`.
- **Feel check**: run `npm run dev` and spot-check that nothing visually changed (this is a pure refactor — curves and durations are byte-identical everywhere except the one outlier):
  - `/strategy/all` — card hover-lift still uses the same curve.
  - Any `/strategy/[slug]` page — mobile menu open/close, the benefits-grid cards (the ones with `duration-300` now instead of `duration-500` — hover one and confirm the lift now matches the speed of case-study cards elsewhere on the same page, not noticeably slower).
  - `/david` — the two footer-ish links with `transition-colors` still ease the same way on hover.
  - `/strategy/not-found` (visit any nonexistent `/strategy/xyz` slug) — the "Go to skynosoft.net" button still eases identically on hover/press.
  - In DevTools' Animations panel, set playback to 10% on the fixed benefits-card hover and confirm the lift duration now visually matches a case-study card's hover lift on the same page.
- **Done when**: both greps above return the expected single-source result, lint/typecheck are clean, and every spot-checked interaction looks unchanged except the one corrected duration.
