# 002 — Replace `transition-all` with explicit properties on the shared button tokens

- **Status**: TODO
- **Commit**: ec28ab5
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file, 2 lines (cascades to every page importing `BUTTON`/`BUTTON_SECONDARY`)

## Problem

AUDIT.md's performance rule is explicit: "`transition: all` animates unintended properties off-GPU — always a finding." The repo has 22 `transition-all` occurrences; the two with the most leverage are the shared `BUTTON` and `BUTTON_SECONDARY` tokens in `src/components/ui/page-kit.tsx`, since every primary/secondary button sitewide (Navbar, IslandNav, home, about, strategy pages, etc.) is built from these two constants. Fixing these two lines fixes the most-reused animated element in the product without touching each call site.

`src/components/ui/page-kit.tsx:7` (current):

```tsx
export const BUTTON = `inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-all duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`;
```

`src/components/ui/page-kit.tsx:9` (current):

```tsx
export const BUTTON_SECONDARY = `inline-flex items-center justify-center rounded-full border border-border-hairline-strong bg-white px-3 py-2 font-body text-base font-semibold text-foreground transition-all duration-300 ${EASE} hover:bg-card active:scale-[0.98] ${FOCUS}`;
```

In both strings, only two properties actually change across the element's interactive states:
- `hover:bg-primary/90` / `hover:bg-card` → `background-color`
- `active:scale-[0.98]` → `transform`

`transition-all` makes the browser watch every animatable property on the element (including ones that never change, like `border-color`, `padding`, `color`) for changes every frame a transition could fire, instead of only the two that matter.

## Target

```tsx
/* target — page-kit.tsx:7 */
export const BUTTON = `inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 font-body text-base font-semibold text-white transition-[background-color,transform] duration-300 ${EASE} hover:bg-primary/90 active:scale-[0.98] ${FOCUS}`;

/* target — page-kit.tsx:9 */
export const BUTTON_SECONDARY = `inline-flex items-center justify-center rounded-full border border-border-hairline-strong bg-white px-3 py-2 font-body text-base font-semibold text-foreground transition-[background-color,transform] duration-300 ${EASE} hover:bg-card active:scale-[0.98] ${FOCUS}`;
```

Only the `transition-all` → `transition-[background-color,transform]` swap changes. Duration, easing token, hover/active modifiers, and every other class stay exactly as they are.

## Repo conventions to follow

- `EASE` and `FOCUS` are already exported from this same file (`page-kit.tsx:3-5`) and interpolated into these two template strings — keep using them exactly as before, just change the `transition-*` utility.
- Tailwind v4 (`node_modules/tailwindcss`, v4.3.3 per `package.json`) supports arbitrary multi-property transitions via `transition-[prop1,prop2]` — this is the correct way to name two properties explicitly when the built-in `transition-colors` / `transition-transform` utilities can't be combined (each sets the same underlying `transition-property` CSS property, so stacking both classes would let the later one silently win rather than animate both).
- `src/components/ui/ProofMarquee.tsx:29` already uses a single-property transition utility (`transition-transform`) on a similar hover-lift card — that's the pattern this plan extends to a two-property case.

## Steps

1. In `src/components/ui/page-kit.tsx`, line 7, change `transition-all` to `transition-[background-color,transform]` inside the `BUTTON` template string. Leave every other class untouched.
2. In `src/components/ui/page-kit.tsx`, line 9, change `transition-all` to `transition-[background-color,transform]` inside the `BUTTON_SECONDARY` template string. Leave every other class untouched.

## Boundaries

- Do NOT touch any of the other 20 `transition-all` occurrences elsewhere in the repo (e.g. `Navbar.tsx`, `IslandNav.tsx`, `CaseStudyCard.tsx`, `strategy/[slug]/page.tsx`, etc.) — those are separate, unselected findings with their own property lists to work out; fixing them here would silently expand this plan's scope.
- Do NOT change `duration-300`, the easing token, or the `hover:`/`active:` modifier values.
- Do NOT add new dependencies or touch `tailwind.config`/theme files — Tailwind v4's arbitrary-value transition syntax needs no configuration.
- If the cited lines don't match what's in the file (drift since commit `ec28ab5`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint` and `npx tsc --noEmit` from `/Users/mac/Projects/skynosoft`, both expected clean. Optionally `npm run build` to confirm Tailwind compiles the arbitrary-value utility without warnings.
- **Feel check**: run `npm run dev` and visit any page using a primary button (e.g. `/` hero CTA, Navbar's "Book a call") and any page using a secondary button (e.g. `/about`). For each:
  - Hover the button and confirm the background still fades smoothly over the same ~300ms — no visible snap or skipped frames.
  - Click/tap the button and confirm the `scale(0.98)` press feedback still animates at the same speed as before.
  - In DevTools' Animations panel, set playback to 10% while hovering, and confirm only `background-color` and `transform` are listed as animating — not an unrelated property like `padding` or `border-color`.
- **Done when**: both template strings show `transition-[background-color,transform]` in place of `transition-all`, lint/typecheck are clean, and hover/press feedback on both button variants looks and feels identical to before the change.
