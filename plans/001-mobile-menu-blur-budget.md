# 001 — Bring the mobile-menu backdrop blur under the performance budget

- **Status**: TODO
- **Commit**: ec28ab5
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 2 files, 1 line each

## Problem

Both of the site's full-screen mobile nav overlays apply `backdrop-blur-3xl` (64px, per `node_modules/tailwindcss/theme.css:482` → `--blur-3xl: 64px;`) to an element that cross-fades via `transition-all duration-700`. AUDIT.md's performance rule is explicit: "Keep transition-time `filter: blur()` under 20px — heavy blur is expensive, especially in Safari." 64px is more than 3x that budget. Every time a visitor opens the mobile menu, the browser has to composite a 64px gaussian blur kernel across the full viewport for the whole 700ms fade — the most expensive thing happening on either page, on the exact element every mobile visitor interacts with.

Location 1 — `src/components/layout/Navbar.tsx:99` (current):

```tsx
      <div
        id="island-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-3xl transition-all duration-700 ${EASE} md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
```

Location 2 — `src/app/strategy/IslandNav.tsx:90` (current, identical pattern):

```tsx
      <div
        id="island-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-3xl transition-all duration-700 ${EASE} md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
```

## Target

Replace `backdrop-blur-3xl` with `backdrop-blur-lg` (16px, per `node_modules/tailwindcss/theme.css:479` → `--blur-lg: 16px;`) in both locations. 16px sits comfortably under the 20px budget while keeping the same frosted-glass look (the panel is also backed by `bg-white/80`, so the visual difference between 64px and 16px of blur is minor — the opacity layer does most of the visual work). Nothing else in either className changes.

```tsx
/* target — both files, same line */
className={`fixed inset-0 z-40 flex items-center justify-center bg-white/80 backdrop-blur-lg transition-all duration-700 ${EASE} md:hidden ${
  open ? "visible opacity-100" : "invisible opacity-0"
}`}
```

## Repo conventions to follow

- Both files already use the same hand-built island-nav overlay pattern (`fixed inset-0 … backdrop-blur-* transition-all duration-700 ${EASE}`) — keep them identical to each other; whatever value is chosen must be applied to both, not just one.
- `Navbar.tsx` imports its blur-adjacent tokens (`EASE`, `FOCUS`, `BUTTON`) from `@/components/ui/page-kit` (see `Navbar.tsx:7`); `IslandNav.tsx` re-declares its own local copies at `IslandNav.tsx:6-9`. Leave that difference alone — it is out of scope for this plan (see Boundaries).
- Other static (non-transitioning) frosted surfaces in the repo use `backdrop-blur-xl` (24px) for the nav pill itself, e.g. `Navbar.tsx:46` and `IslandNav.tsx:43`. Do not touch those — they are not mid-transition elements and are not part of this finding.

## Steps

1. In `src/components/layout/Navbar.tsx`, on line 99, change `backdrop-blur-3xl` to `backdrop-blur-lg`. No other part of the className changes.
2. In `src/app/strategy/IslandNav.tsx`, on line 90, change `backdrop-blur-3xl` to `backdrop-blur-lg`. No other part of the className changes.

## Boundaries

- Do NOT touch the static `backdrop-blur-xl` on the nav pill itself (`Navbar.tsx:46`, `IslandNav.tsx:43`) — that element never transitions and is not over budget.
- Do NOT change the `duration-700`, the easing token, the opacity/visibility logic, or any other class on this element.
- Do NOT consolidate `IslandNav.tsx`'s local `EASE`/`FOCUS`/`BUTTON` constants into the `page-kit.tsx` import — that is plan 003's job, not this one.
- Do NOT add new dependencies.
- If the cited lines don't match what's in the file (drift since commit `ec28ab5`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npm run lint` (expect no new errors) and `npx tsc --noEmit` (expect no new errors) from `/Users/mac/Projects/skynosoft`.
- **Feel check**: run `npm run dev`, open the site at a mobile viewport (<768px, e.g. resize to 390px wide) on both `/` (site Navbar) and any `/strategy/[slug]` page (strategy IslandNav), tap the hamburger button, and confirm:
  - The panel still reads as a frosted glass overlay — the white tint plus reduced blur should still clearly separate the menu from the content behind it, not look flat or see-through.
  - The 700ms fade feels at least as smooth as before, with no visible stutter on a mid-tier device (or in a throttled CPU profile in DevTools).
  - In DevTools' Performance panel, record opening the menu and confirm the compositor/paint time attributed to the overlay drops compared to a profile taken before the change (optional but recommended if DevTools access is available).
- **Done when**: both files show `backdrop-blur-lg` in place of `backdrop-blur-3xl` on the island-menu overlay, lint and typecheck are clean, and the frosted-panel look still holds up visually on a real mobile viewport.
