# Wiki index refresh + masthead refinement — design

**Date:** 2026-06-03
**Status:** Approved (visual brainstorm), pending implementation plan
**Surfaces:** `/wiki` index page; site masthead (all pages)

## Problem

The recent `wiki: constellation hero + neighbourhood groups` commit made the
`/wiki` index feel wrong in two specific ways (confirmed with the author):

1. **The constellation dominates.** Promoted to a full-width ~960px hero band, it
   gates the page — you meet the graph before the concepts.
2. **The page shouts / is hard to scan.** Giant tabular source-count numerals,
   every concept carrying a two-line summary. At 45 concepts the index is _read_,
   not _scanned_, and it runs very long.

What is **not** wrong (explicitly): the neighbourhood clustering itself, and the
overall brand fit. So this is a presentation problem, not a structural one.

Separately, the author wanted to explore alternative site **chrome**. After
mocking four directions (refined top bar, two-tier nameplate, left side-rail,
slim index-spine) in desktop + mobile, the decision is a **refinement of the
current top bar** — not a new navigation paradigm.

## Non-goals

- No side-rail / nameplate / index-spine navigation paradigm. (Explored, rejected.)
- Do **not** remove the constellation or revert to the A–Z grid.
- No change to the wiki _content model_, schemas, or the worker pipeline.
- No change to neighbourhood clustering logic (`constellation-layout.json` /
  `clusterById` stays the source of truth).
- Footer is unchanged.

## Aesthetic constraints (must hold)

- **Flat, no textures.** The new "well" and panels are flat tonal fills, not
  grain/noise overlays — compatible with the no-textures rule.
- **No entrance animations.** The inspector's fade is _interaction feedback_
  (≤130ms, on hover/focus), not a page-load entrance; it is guarded by
  `prefers-reduced-motion`. No `.animate` fade-in classes anywhere.
- **Accent used sparingly** — eyebrow, active nav marker, source dot-ramps,
  inspector eyebrow/figure. Never as a fill.
- **No bare semantic tags for in-page sections** (`<header>`/`<article>` etc. are
  reserved for chrome). In-content groupings use `<div>`/`<section class>`.
- Dark mode is first-class: every new surface token has a dark variant.

---

## Part 1 — Wiki index redesign

Five stacked regions inside the existing `max-w-5xl` container, in order:

### 1.1 Header

- **Eyebrow** — `WIKI · CONCEPT INDEX`, mono, uppercase, `tracking-[0.16em]`,
  accent. (Same family as `Breadcrumb`/`LabeledRule` eyebrows.)
- **`h1` "Wiki"** — unchanged from today (`font-heading text-display`).
- **Lede** — unchanged copy, `max-w-[60ch]`.
- **Meta row** (`flex flex-wrap gap`):
  - **Concepts pill** — bordered mono chip: a small accent dot-ramp +
    `{n} concepts`. Replaces today's "{n} sources" chip.
  - **`<ProvenanceBadge action="Compiled by Claude" date={lastCompiled} link />`**
    — reused as-is; its `link` renders `· How this works →` to
    `/wiki/how-this-works`.

### 1.2 Contained constellation "well"

- A recessed flat panel wrapping the **existing `ConstellationStrip`** (component
  body unchanged): `--well` background, `1px` hairline border, `rounded-2xl`,
  internal padding, the graph centered at **`width={600}`** (down from 960).
- Caption pinned bottom-left of the well: mono, muted —
  `{concepts} concepts · {neighbourhoods} neighbourhoods · {ties} ties`
  (same counts the current index computes).
- Extract as `src/components/wiki/ConstellationWell.astro` (well wrapper +
  caption; takes the same derived counts the index already computes).

### 1.3 Two-column directory (the scan surface)

Replaces the summary-carrying grouped list. New component
`src/components/wiki/WikiDirectory.astro`.

- Concepts grouped by neighbourhood (reuse the index's existing `conceptGroups`
  derivation: clusters in curated order + trailing "Other").
- Within each group: a **2-column CSS grid** (`1fr 1fr`, `column-gap` ~44px),
  collapsing to 1 column at `≤640px`.
- **Group heading** — quiet mono eyebrow (`tracking-[0.16em]`, uppercase, muted),
  not a `LabeledRule` dot-rule (lighter than today).
- **Row** = `<a href="/wiki/{id}/">`, hairline top border, containing:
  - **Title** — `font-heading`, medium, `~16px`. Hover/focus → accent.
  - **Count** — faint trailing mono figure (just the number, e.g. `8`), held at a
    clean right edge via a `space-between` row with an `~18px` min gap. **(Fixes
    the title/count collision from the mock — title and count are a proper
    `justify-between` row, never glued in a shared inline span.)**
  - **Mobile-only one-line summary** (`.mob`, `display:none` on desktop): one
    clamped line of the concept `summary`, shown only at `≤640px`.
- **Sort:** within each group, by source count descending (most-cited first).
- Each row carries `data-*` for the inspector: `data-nb` (neighbourhood short
  label), `data-ct` (count), `data-su` (summary). All sourced from existing
  frontmatter — **no new data**.
- The directory sits in a light flat panel (`--panel` / `#faf8f3` light) with a
  hairline border, mirroring the well. (Optional; approved in mock.)

### 1.4 Bottom-right inspector (desktop)

New component `src/components/wiki/WikiInspector.astro` — one fixed card +
a tiny vanilla `<script>` IIFE (same pattern as `ConstellationStrip`: JS only
toggles attributes, CSS does the rest).

- **Position:** `position:fixed; right/bottom: ~24px; width: ~330px; z-40`.
- **Content:** neighbourhood eyebrow (accent mono) · title (`font-heading`) ·
  summary · footer line (source dot-ramp + `{n} sources` + `open →`).
- **Surface:** `--card` fill, hairline border, soft shadow
  (`0 8px 30px rgb(0 0 0 / .08)`) — the one permitted bit of lift, to read as an
  "inspector" floating above the page. _(Open question for review: keep the
  shadow, or hairline-only?)_
- **Behavior:**
  - **Resting state: hidden** (`opacity:0; pointer-events:none`) until a row is
    hovered or keyboard-focused; populates from that row's `data-*`; tracks the
    cursor down the columns; fades out (~120ms) on list `mouseleave` / focus
    leaving the list.
  - The hovered row's title also goes accent (`data-live`).
  - `aria-hidden="true"` (purely visual augmentation; the row link + count are in
    the DOM). Keyboard `focusin` still drives it so tab users see it.
  - `prefers-reduced-motion`: opacity-only, no transform.

### 1.5 Mobile fallback (`≤640px`)

- Inspector `display:none`.
- Directory grid → single column.
- Each row restores its one clamped `.mob` summary line under the title (vertical
  space is cheap on a phone; the hover affordance that the card replaced does not
  exist on touch — mirrors how `ConstellationStrip` surfaces hover-only cues on
  mobile). Tap → article.

### 1.6 Dark mode

Define dark variants for every new surface:

- `--well`: just-lighter-than-canvas warm dark (e.g. lighten `#18161a`).
- `--panel`, `--card`: similar, card slightly lighter than panel.
- Borders `rgb(255 255 255 / .06–.1)`; inspector shadow softened/again subtle.
- Constellation well inherits the strip's existing dark treatment (unchanged).

---

## Part 2 — Masthead refinement (chrome A)

Edit `src/components/Header.astro` only. Same two-row-under-`sm` structure.

- **Logo slot:** keep `SignatureLogo` unchanged.
- **Active-section marker:** the nav link matching the current top-level section
  renders in **accent with a short underline** beneath it; add
  `aria-current="page"`.
  - Derive "current section" in `Header.astro` from `Astro.url.pathname` (first
    path segment → match against the nav hrefs: `/now /reading /wiki /labs
/about`). Active logic lives in `Header.astro`, not in the generic `Link`.
  - The underline is a `2px` accent rule under the active label (absolute, sits
    on the bar baseline at `sm:`; in the two-row mobile layout it sits under the
    label in row 2).
- **Spacing:** minor tightening only; no structural change.
- Footer, utility icons (search/theme), responsive grid: unchanged.

---

## Components touched / added

| File                                           | Change                                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `src/pages/wiki/index.astro`                   | Recompose: header + well + directory + inspector. Keep existing data derivations (groups, counts, lastCompiled). |
| `src/components/wiki/ConstellationWell.astro`  | **New.** Recessed well wrapping `ConstellationStrip` + caption.                                                  |
| `src/components/wiki/WikiDirectory.astro`      | **New.** Two-column grouped directory; emits `data-*` per row; mobile summary line.                              |
| `src/components/wiki/WikiInspector.astro`      | **New.** Fixed bottom-right card + toggle IIFE.                                                                  |
| `src/components/wiki/ConstellationStrip.astro` | Unchanged (default `width` still 960; index passes 600).                                                         |
| `src/components/Header.astro`                  | Active-section accent + underline marker; `aria-current`.                                                        |
| `src/styles/global.css`                        | Add `--well`, `--panel`, `--card` tokens (+ dark variants).                                                      |

## Verification

- `pnpm check && pnpm build` (astro check = TS-strict; build validates frontmatter).
- Manual (`pnpm dev`, refresh manually — HMR is known-broken): hover + keyboard-tab
  the directory drives the inspector; inspector hidden at rest; `mouseleave`
  fades it; active nav marker correct on each section; dark mode for well /
  panel / card / inspector; `≤640px` shows single column + summary lines, no
  card; `prefers-reduced-motion` kills the transform.
- Spot-check the agent surfaces are unaffected (`/wiki.json`, `/wiki.txt`,
  `/llms.txt`) — this is presentation-only, no data contract change.

## Open questions for review

1. Inspector surface: soft shadow (as mocked) vs hairline-only — which fits the
   flat aesthetic better?
2. Directory panel: keep the light flat panel around the directory, or let it sit
   directly on the canvas (panel only around the well)?
