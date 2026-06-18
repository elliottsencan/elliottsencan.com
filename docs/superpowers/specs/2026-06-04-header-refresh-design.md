# Spec: Header refinement + wiki-index mobile fix

**Date:** 2026-06-04
**Branch:** `type-wiki-refresh`

## Problem

The site header has degraded and the new wiki index is not mobile-safe:

1. **Logo too big.** `SignatureLogo` clamps up to `2.75rem` (44px) — roughly 3× the 14px nav text, so the wordmark visually dominates the masthead.
2. **Active underline is doubled/misaligned.** Every nav `<Link>` already renders its own thin underline (`underline underline-offset-4 decoration-1`). The active item _also_ gets a floating accent bar (`::after { bottom: -3px; height: 2px }`). The result is two lines under the active item, the accent bar sitting ~3px below the text underline.
3. **Mobile header reads as non-standard.** Below `sm:` the links drop to a second row spread edge-to-edge with `justify-content: space-between`; unequal link widths produce ragged gaps (first item jammed left, last jammed right).
4. **Wiki index descriptions overflow on mobile.** `.wd-mob` has `white-space: nowrap` + `text-overflow: ellipsis`, but its grid/flex ancestor `.wd-row` has the default `min-width: auto`, so the nowrap text expands the track instead of truncating — the text blows past the right edge of the panel.

## Goals

- Header reads clean and balanced on desktop, with a single correctly-aligned active indicator.
- Mobile header uses a conventional collapsed menu (hamburger) instead of the ragged two-row spread.
- Wiki index directory truncates summaries cleanly within the panel on mobile.
- Desktop header layout/behavior is unchanged except the (smaller) logo and the corrected active underline.

## Non-goals

- No change to which links appear, their order, or the search/theme controls.
- No redesign of the wiki directory beyond the overflow fix.
- No `ClientRouter`/view-transitions changes (navigations remain full page loads; the existing `transition:persist` on `<header>` is left as-is).

## Design

### 1. Logo size — `src/components/SignatureLogo.astro`

Change the `.signature-logo` height clamp:

- From: `clamp(2rem, 1.5rem + 1.5vw, 2.75rem)` (32–44px)
- To: `clamp(1.6rem, 1.4rem + 0.8vw, 2.1rem)` (~26–34px)

Nothing else in the SVG or its draw animation changes. (Exact clamp values may be nudged ±0.1rem during implementation after eyeballing; the intent is "max ~2.1rem, balanced against 14px nav text.")

### 2. Active underline — `src/components/Header.astro`

- **Remove** the `:global(.header-links a[aria-current="page"])::after` rule (the floating bar) entirely.
- Keep the active text color (`color: var(--accent)`).
- Recolor and thicken the link's **existing** underline for the active item so it stays aligned with the inactive underlines:
  ```css
  :global(.header-links a[aria-current="page"]) {
    color: var(--accent);
    text-decoration-color: var(--accent);
    text-decoration-thickness: 2px;
  }
  ```
- Result: one underline per item, all on the same baseline; the active one is accent-colored and slightly heavier.

### 3. Mobile hamburger — `src/components/Header.astro` (+ `init()` in `src/components/Head.astro`)

**Markup.** Wrap the mobile menu in a native `<details>` disclosure so it has a no-JS baseline and is keyboard-accessible by default:

- A `<details class="nav-disclosure">` whose `<summary>` renders the ☰ glyph (a styled button-like control, default marker removed). The summary lives in the row‑1 utility cluster, beside search and theme.
- The 5 section links (the existing `<nav class="header-links">` content) live inside the `<details>` as the disclosure panel.
- `aria-label` on the summary ("Menu"); the native `<details>` provides expanded/collapsed semantics.

**Layout.**

- **Below `sm:`** — the panel is a dropdown that **overlays** page content: absolutely positioned, full container width, anchored just under the header's bottom hairline, with the same surface as the header (`#f6f4ef`/`#18161a` at 75% + `backdrop-blur`) and a hairline border. Links stack vertically with comfortable tap targets. The summary (☰) is visible.
- **At `sm:` and up** — CSS hides the summary, forces the links visible inline in the canonical single row (`logo · links · utility`), and the `<details>` open state is irrelevant. This reproduces today's desktop header exactly.

**Motion.** Subtle ~150ms expand on open (height/opacity ease), respecting `prefers-reduced-motion: reduce` (instant for those users). This is functional feedback, not a decorative entrance animation.

**Progressive enhancement** (added to the existing `init()` in `Head.astro`, bound on `DOMContentLoaded` like the theme button):

- Close the disclosure (`details.open = false`) when a link inside it is selected.
- Close on `Escape`.
- Close on outside tap/click (pointerdown outside the `<details>`).
- All guarded with `?.` so a missing element is a no-op (matches the existing degrade-quietly pattern).

### 4. Wiki index overflow — `src/components/wiki/WikiDirectory.astro`

Add `min-width: 0` to the `.wd-row` rule so the grid/flex item can shrink below its content width, allowing the existing ellipsis on `.wd-mob` to take effect. (If needed, also confirm `.wd-mob` stays `display: block` with `max-width: 100%`; the `min-width: 0` on the row is the primary fix.)

## Components touched

| File                                      | Change                                                                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/components/SignatureLogo.astro`      | smaller height clamp                                                                                                 |
| `src/components/Header.astro`             | remove `::after` bar; recolor active underline; restructure mobile menu into `<details>` disclosure + responsive CSS |
| `src/components/Head.astro`               | add menu close handlers (select/Esc/outside) to `init()`                                                             |
| `src/components/wiki/WikiDirectory.astro` | `min-width: 0` on `.wd-row`                                                                                          |

## Verification

- `pnpm exec astro check` → 0 errors after each change.
- `pnpm build` completes (~190 pages).
- Targeted biome on changed files (`pnpm exec biome check --write <files>`); do **not** run full `pnpm check` (stale worktree biome configs error).
- Visual pass via `pnpm dev` (refresh manually, HMR unreliable):
  - Desktop ≥640px: logo smaller and balanced; all nav underlines aligned; active item is a single accent underline (no floating bar); search/theme unchanged.
  - Mobile <640px: row 1 = logo + search + theme + ☰; tapping ☰ expands a clean dropdown of the 5 links; selecting a link / Esc / outside-tap closes it; no ragged edge-to-edge row.
  - Wiki index on mobile: each concept summary truncates with an ellipsis inside the panel; nothing overflows the right edge.
- Pre-existing `src/content/labs/` churn stays dirty/unstaged throughout; never `git add -A`.

## Environment notes

- Work on `type-wiki-refresh`; do not switch branches.
- Path alias `@components/*` → `src/components/*`.
- Bare `<header>` is global site chrome (styled in `global.css`); the in-page disclosure must not reintroduce bare semantic tags as in-content sections.
