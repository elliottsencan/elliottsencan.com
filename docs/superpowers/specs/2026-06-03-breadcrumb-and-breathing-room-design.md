# Breadcrumb consolidation + breathing room — design

**Date:** 2026-06-03
**Status:** Approved, ready for implementation plan

## Problem

Two coupled issues across the site:

1. **Inconsistent back-navigation.** Three different patterns are in play: the
   `Breadcrumb` component rendered inside `PageHero`'s breadcrumb slot
   (reading/wiki/labs slugs, about/_, now/_, year archives); a separate
   `BackToPrevious` button (projects/[id], tags/[id], 404); and **no visual
   back-nav at all** on blog posts (writing/[id], which only emit JSON-LD).
2. **The site feels cramped.** Specifically the top room between the fixed
   masthead and the first content, and the vertical rhythm between page
   sections.

## Goals

- One consistent breadcrumb component, present on every sub-page.
- More top breathing room and looser inter-section rhythm, applied
  consistently rather than per-page.

## Non-goals

- Side gutters and content max-width are **not** changing.
- The JSON-LD `breadcrumbs` structured data on the layouts is **not**
  changing — it intentionally keeps the full ancestor trail for SEO even
  though the visual crumb shows only the immediate parent.
- No entrance animations, no textures (per existing site conventions).

## Decisions (settled during brainstorming)

1. **Scope = sub-pages only.** Home keeps its masthead (no crumb). All
   top-level section indexes (/writing, /reading, /wiki, /labs, /about, /now,
   /tags, /search) keep their clean h1-first opening — the site header sits
   directly above them, so a crumb there is redundant.
2. **The current page is never shown in the crumb.** The breadcrumb is pure
   up-navigation; the h1 directly below already names the current page.
3. **Immediate parent only.** One link — the page you'd go "up" to. The site
   is flat enough that a full ancestor trail adds little; reads like a named
   back button.
4. **Spacing magnitude:** top room → 160px, section rhythm → 64px, hero stack
   loosened gently. Starting values, to be tuned live.
5. **Rhythm delivery: centralize** in a shared `<PageBody>` wrapper rather
   than sweeping the utility class across every page.

## Component design

### `Breadcrumb.astro` (reworked, self-contained)

- **Props:** `{ parent: { label: string; href: string } }`. The `current`
  prop is removed.
- **Render:** `← {label}` on the left — accent-colored link, the only hover
  target (underline on hover/focus) — followed by the dotted `.dot-rule`
  filler extending to fill the row. Reuses the same `.dot-rule` class and
  background recipe as `LabeledRule`/`EditorialRule` so the shared
  cursor-halo script in `Layout.astro` reaches it with one selector.
- **Style:** mono, uppercase, `text-xs`, `tracking-[0.14em]` — unchanged from
  today's crumb text styling.
- **Rationale for self-containment:** folding the rule into the component
  (rather than relying on a surrounding `LabeledRule`) means every page drops
  a single `<Breadcrumb parent={…} />` tag and gets a byte-identical render —
  it is impossible to misalign one page against another. `LabeledRule`
  remains for its other uses (section labels).

### `PageHero.astro` (updated)

- Keeps the `breadcrumb` boolean prop and the `breadcrumb` slot so the crumb
  sits as the first element of the hero stack, tightly spaced above the h1.
- The `LabeledRule` wrapper around the breadcrumb slot is removed, because
  `Breadcrumb` now carries its own rule. The slot renders the `Breadcrumb`
  directly.
- Hero stack gaps loosen: outer `gap-3` → `gap-4`; inner `max-w-[62ch]`
  column `gap-4` → `gap-5`; innermost title/summary/meta group `gap-3` →
  `gap-4`.

### `PageBody.astro` (new)

- Combines `Container` (the single source of width/gutter truth:
  `max-w-5xl px-6 md:px-8`) with the section rhythm `space-y-16`.
- Accepts `class` (merged) and passes through arbitrary `data-*` attributes
  so per-page pagefind hooks (`data-pagefind-body`,
  `data-pagefind-filter`, `data-pagefind-ignore`) keep working.
- Sketch:
  ```astro
  ---
  import Container from "@components/Container.astro";
  type Props = { class?: string; [key: string]: unknown };
  const { class: className, ...rest } = Astro.props;
  ---
  <Container>
    <div class:list={["space-y-16", className]} {...rest}><slot /></div>
  </Container>
  ```

### `BackToPrevious.astro`

- Retired and deleted once all three consumers are converted.

## Page changes

### Breadcrumb — modify (drop `current` arg)

reading/[...slug], wiki/[...slug], labs/[...slug], about/process,
about/uses, about/colophon, wiki/how-this-works, now/how-this-works,
now/archive, now/archive/[...slug], writing/[year]/index,
reading/[year]/index.

### Breadcrumb — convert from `BackToPrevious`

- projects/[...id] → `← About` (`/about/`). Projects index was removed;
  projects are listed on /about (matches the existing JSON-LD parent).
- tags/[...id] → `← Tags` (`/tags/`).
- 404 → `← Home` (`/`). 404 has no real parent; Home is the sensible target.

### Breadcrumb — add (no visual back-nav today)

- writing/[...id] blog posts → `← Writing` (`/writing/`), placed at the top
  of the existing bespoke hero block with tight spacing to the h1.

### Parent map

| Page                             | Parent label | Parent href   |
| -------------------------------- | ------------ | ------------- |
| writing/[id], writing/[year]     | Writing      | /writing/     |
| reading/[slug], reading/[year]   | Reading      | /reading/     |
| wiki/[slug], wiki/how-this-works | Wiki         | /wiki/        |
| labs/[slug]                      | Labs         | /labs/        |
| about/{process,uses,colophon}    | About        | /about/       |
| now/how-this-works, now/archive  | Now          | /now/         |
| now/archive/[slug]               | Archive      | /now/archive/ |
| projects/[id]                    | About        | /about/       |
| tags/[id]                        | Tags         | /tags/        |
| 404                              | Home         | /             |

### Spacing — global

- `main` in `src/styles/global.css`: desktop `md:pt-32` (128px) → `md:pt-40`
  (160px). Mobile (`@media max-width:767px`) `pt-36` (144px) → `pt-44`
  (176px) — preserves the existing "two-row mobile masthead needs more top
  room" margin; verify live and dial back if excessive.

### Spacing — `PageBody` migration

The ~21 standard editorial pages that currently use the
`Container > div.space-y-12` pattern migrate to `<PageBody>` (which supplies
`space-y-16`):

404, reading, now, about, search, reading/[year], index, about/colophon,
labs/index, tags/[id], about/process, now/archive, tags/index,
now/how-this-works, wiki/how-this-works, about/uses, writing/index,
writing/[year], plus any others matching the exact pattern.

**Bespoke-layout pages are excluded** from `PageBody` and keep their own
structure — they get only the breadcrumb change plus a one-off rhythm bump
where a section reads cramped:

- wiki/index and wiki/[slug] (bespoke 3-row constellation grids)
- writing/[id] (TOC grid, PostMeta/PostBadges hero, PostNavigation)
- projects/[id] (operational rail grid)

## Verification

- `pnpm check && pnpm build` — astro-check (TS-strict) + frontmatter
  validation against the Zod schemas.
- `pnpm dev` click-through across one of each page type to confirm crumbs
  and spacing: a blog post, a project, a tag page, a reading/wiki/labs slug,
  an about sub-page, a now archive entry, and 404. Remember HMR is unreliable
  — refresh manually.
- Confirm `BackToPrevious` has no remaining references before deletion.
- Confirm the cursor-halo still animates over the breadcrumb's dot-rule.
