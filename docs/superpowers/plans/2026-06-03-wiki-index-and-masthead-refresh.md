# Wiki Index Refresh + Masthead Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Calm the `/wiki` index — contained constellation, scannable two-column directory with a hover inspector — and refine the masthead with an active-section marker.

**Architecture:** Astro SSG, no client framework. The wiki index recomposes into three new focused components (`ConstellationWell`, `WikiDirectory`, `WikiInspector`) under `src/components/wiki/`, driven by data the index already derives. Interactivity is a tiny vanilla `<script>` IIFE that toggles `data-*` attributes (same pattern as `ConstellationStrip`). The masthead change is a single-component edit. New flat surface tones (`--well`/`--panel`/`--card`) are added as CSS tokens with dark variants.

**Tech Stack:** Astro 6, Tailwind v4 (`@theme` tokens in `global.css`), Neue Montreal / Satoshi / Spline Sans Mono, biome.

**Verification model:** No site component tests exist (only the worker uses vitest). Each task verifies with `pnpm check` (biome lint/format) and/or `pnpm build` (runs `astro check` TS-strict typecheck + SSG), plus a concrete manual check in `pnpm dev`. Note: `/@vite/client` HMR is known-broken — **refresh the browser manually** after edits.

**Spec:** `docs/superpowers/specs/2026-06-03-wiki-index-and-masthead-refresh-design.md`

**Branch:** Work is on `type-wiki-refresh` (already checked out). The working tree has pre-existing uncommitted labs artifacts (`src/content/labs/...`) from a build script — **never `git add -A`**; each commit step adds only the explicit paths listed.

---

## File Structure

| File                                          | Responsibility                                                                      |
| --------------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/styles/global.css`                       | Add `--well` / `--panel` / `--card` surface tokens (+ dark variants).               |
| `src/components/Header.astro`                 | Active-section accent + underline marker.                                           |
| `src/components/wiki/ConstellationWell.astro` | **New.** Recessed panel wrapping `ConstellationStrip` + caption.                    |
| `src/components/wiki/WikiDirectory.astro`     | **New.** Two-column grouped directory; emits `data-*` per row; mobile summary line. |
| `src/components/wiki/WikiInspector.astro`     | **New.** Fixed bottom-right card + toggle IIFE. Reads `#wiki-list .wd-row`.         |
| `src/pages/wiki/index.astro`                  | Recompose: header + well + directory + inspector.                                   |

**Coupling contract (Directory ↔ Inspector):** the directory root is `id="wiki-list"`; each row is `<a class="wd-row" data-nb data-ct data-su>` containing `.wd-nm` (title). The inspector queries exactly those.

---

## Task 1: Surface tokens

**Files:**

- Modify: `src/styles/global.css` (the `:root` block ~line 194 and the `html.dark` block ~line 205)

- [ ] **Step 1: Add light tokens to `:root`**

In `src/styles/global.css`, find the `:root` block that defines `--masthead-height` / `--accent` (~line 194). Add the three surface tokens just after `--accent`:

```css
--accent: oklch(0.5 0.09 35);

/* Flat surface tones for /wiki — recessed "well" behind the
       constellation, light panel behind the directory, lifted inspector
       card. Flat fills, not textures. */
--well: #efece4;
--panel: #faf8f3;
--card: #fbf9f4;
```

- [ ] **Step 2: Add dark tokens to `html.dark`**

Find `html.dark { --accent: oklch(0.78 0.1 62); }` (~line 205) and extend it:

```css
html.dark {
  --accent: oklch(0.78 0.1 62);
  --well: #201e22;
  --panel: #1d1b1f;
  --card: #232024;
}
```

- [ ] **Step 3: Verify lint/format passes**

Run: `pnpm check`
Expected: completes with no errors (biome formats/lints; CSS is left valid).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "wiki: add flat surface tokens (well/panel/card) + dark variants

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Masthead active-section marker

**Files:**

- Modify: `src/components/Header.astro` (frontmatter + nav `<Link>`s + `<style>`)

- [ ] **Step 1: Compute the active section in frontmatter**

In `src/components/Header.astro`, add to the frontmatter (after the imports, before the closing `---`):

```astro
const path = Astro.url.pathname;
// True when the current URL is this section or a child of it.
const isActive = (href: string) => path === href || path.startsWith(`${href}/`);
```

- [ ] **Step 2: Add `aria-current` to each nav link**

Replace the nav block (the five `<Link>`s inside `<nav class="header-links ...">`) with:

```astro
        <Link href="/now" aria-current={isActive("/now") ? "page" : undefined}>now</Link>
        <Link href="/reading" aria-current={isActive("/reading") ? "page" : undefined}>reading</Link>
        <Link href="/wiki" aria-current={isActive("/wiki") ? "page" : undefined}>wiki</Link>
        <Link href="/labs" aria-current={isActive("/labs") ? "page" : undefined}>labs</Link>
        <Link href="/about" aria-current={isActive("/about") ? "page" : undefined}>about</Link>
```

(The commented-out `writing` link stays as-is.)

- [ ] **Step 3: Add the active-marker styles**

In the `<style>` block at the bottom of `Header.astro`, add (the `<Link>` renders its own `<a>`, so target it with `:global`, matching the existing `:global(.dark) .header-links` pattern):

```css
:global(.header-links a[aria-current="page"]) {
  position: relative;
  color: var(--accent);
}
:global(.header-links a[aria-current="page"])::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 2px;
  background: var(--accent);
}
```

- [ ] **Step 4: Typecheck + build**

Run: `pnpm build`
Expected: `astro check` passes (0 errors), build completes.

- [ ] **Step 5: Manual check**

Run `pnpm dev`, open `http://localhost:4321/wiki` (refresh manually). Expected: the `wiki` nav link is terracotta with a short 2px underline beneath it; the other four are not. Navigate to `/reading` — the marker moves to `reading`.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.astro
git commit -m "chrome: active-section marker in masthead (accent + underline)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: ConstellationWell component

**Files:**

- Create: `src/components/wiki/ConstellationWell.astro`

- [ ] **Step 1: Create the component**

Create `src/components/wiki/ConstellationWell.astro`:

```astro
---
import ConstellationStrip from "@components/wiki/ConstellationStrip.astro";

// Recessed flat "well" that contains the concept graph so it reads as a
// deliberate object rather than a full-bleed hero. The strip component is
// unchanged; this only frames and captions it.
type Props = {
  width?: number;
  conceptCount: number;
  neighbourhoodCount: number;
  tieCount: number;
};

const { width = 600, conceptCount, neighbourhoodCount, tieCount } = Astro.props;
---

<div class="cw">
  <div class="cw-graph">
    <ConstellationStrip width={width} />
  </div>
  <p class="cw-cap font-mono text-xs">
    {conceptCount} concepts &middot; {neighbourhoodCount} neighbourhoods &middot; {tieCount} ties
  </p>
</div>

<style>
  .cw {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--well);
    border: 1px solid rgb(0 0 0 / 0.05);
    border-radius: 1rem;
    padding: 1.5rem 1.5rem 2.75rem;
  }
  :global(.dark) .cw {
    border-color: rgb(255 255 255 / 0.06);
  }
  .cw-graph {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .cw-cap {
    position: absolute;
    bottom: 1.125rem;
    left: 1.5rem;
    color: rgb(0 0 0 / 0.4);
  }
  :global(.dark) .cw-cap {
    color: rgb(255 255 255 / 0.4);
  }
</style>
```

- [ ] **Step 2: Verify lint/format passes**

Run: `pnpm check`
Expected: no errors. (Full typecheck happens in Task 6 once the index imports this.)

- [ ] **Step 3: Commit**

```bash
git add src/components/wiki/ConstellationWell.astro
git commit -m "wiki: ConstellationWell — recessed panel framing the concept graph

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: WikiDirectory component

**Files:**

- Create: `src/components/wiki/WikiDirectory.astro`

- [ ] **Step 1: Create the component**

Create `src/components/wiki/WikiDirectory.astro`. It takes pre-grouped, pre-sorted concepts and renders the scannable two-column directory. Each row carries the `data-*` the inspector reads.

```astro
---
import type { CollectionEntry } from "astro:content";

// Two-column scannable directory of wiki concepts, grouped by neighbourhood.
// Titles are the scan target; the source count is a faint trailing figure.
// Each row exposes data-* for the bottom-right WikiInspector, and a
// mobile-only one-line summary (hidden on desktop where the inspector serves
// the same role).
type Group = {
  label: string;
  short: string;
  concepts: CollectionEntry<"wiki">[];
};

type Props = { groups: Group[] };

const { groups } = Astro.props;
---

<div id="wiki-list" class="wd not-prose">
  {
    groups.map((group) => (
      <div class="wd-group">
        <p class="wd-nb font-mono">{group.label}</p>
        <div class="wd-grid">
          {group.concepts.map((c) => (
            <a
              class="wd-row"
              href={`/wiki/${c.id}/`}
              data-nb={group.short}
              data-ct={c.data.sources.length}
              data-su={c.data.summary}
            >
              <span class="wd-top">
                <span class="wd-nm font-heading">{c.data.title}</span>
                <span class="wd-ct font-mono">{c.data.sources.length}</span>
              </span>
              <span class="wd-mob">{c.data.summary}</span>
            </a>
          ))}
        </div>
      </div>
    ))
  }
</div>

<style>
  .wd {
    background: var(--panel);
    border: 1px solid rgb(0 0 0 / 0.06);
    border-radius: 0.75rem;
    padding: 1.5rem 1.625rem;
  }
  :global(.dark) .wd {
    border-color: rgb(255 255 255 / 0.07);
  }
  .wd-group + .wd-group {
    margin-top: 1.625rem;
  }
  .wd-nb {
    margin: 0 0 0.5rem;
    font-size: 0.6875rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgb(0 0 0 / 0.45);
  }
  :global(.dark) .wd-nb {
    color: rgb(255 255 255 / 0.45);
  }
  .wd-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2.75rem;
  }
  .wd-row {
    display: flex;
    flex-direction: column;
    padding: 0.5625rem 0;
    border-top: 1px solid rgb(0 0 0 / 0.07);
    color: inherit;
    text-decoration: none;
  }
  :global(.dark) .wd-row {
    border-top-color: rgb(255 255 255 / 0.08);
  }
  .wd-top {
    display: flex;
    width: 100%;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.125rem;
  }
  .wd-nm {
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.011em;
    color: #000;
    transition: color 300ms ease;
  }
  :global(.dark) .wd-nm {
    color: #fff;
  }
  .wd-row:hover .wd-nm,
  .wd-row:focus-visible .wd-nm,
  .wd-row[data-live] .wd-nm {
    color: var(--accent);
  }
  .wd-ct {
    flex: none;
    font-size: 0.6875rem;
    color: rgb(0 0 0 / 0.36);
  }
  :global(.dark) .wd-ct {
    color: rgb(255 255 255 / 0.36);
  }
  .wd-mob {
    display: none;
  }
  @media (max-width: 640px) {
    .wd-grid {
      grid-template-columns: 1fr;
      column-gap: 0;
    }
    .wd-row {
      padding: 0.75rem 0;
    }
    .wd-mob {
      display: block;
      overflow: hidden;
      margin-top: 0.1875rem;
      font-size: 0.8125rem;
      line-height: 1.45;
      color: rgb(0 0 0 / 0.6);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :global(.dark) .wd-mob {
      color: rgb(255 255 255 / 0.6);
    }
  }
</style>
```

- [ ] **Step 2: Verify lint/format passes**

Run: `pnpm check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/wiki/WikiDirectory.astro
git commit -m "wiki: WikiDirectory — two-column scannable concept directory

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: WikiInspector component

**Files:**

- Create: `src/components/wiki/WikiInspector.astro`

- [ ] **Step 1: Create the component**

Create `src/components/wiki/WikiInspector.astro`. The `<script>` is a self-contained IIFE that guards on every element (no non-null assertions, so `astro check` stays clean) and only toggles attributes/text.

```astro
---
// Fixed bottom-right inspector for the wiki directory. Hidden until a
// directory row (#wiki-list .wd-row) is hovered or keyboard-focused, then it
// shows that concept's neighbourhood / title / summary / source count. Pure
// data-attribute toggling — same philosophy as ConstellationStrip.
//
// Contract: reads data-nb / data-ct / data-su and the row's `.wd-nm` text
// from rows rendered by WikiDirectory.astro.
---

<aside id="wiki-inspector" aria-hidden="true">
  <p class="wi-nb font-mono" id="wi-nb"></p>
  <p class="wi-ti font-heading" id="wi-ti"></p>
  <p class="wi-su" id="wi-su"></p>
  <div class="wi-meta font-mono">
    <span class="wi-dots" id="wi-dots" aria-hidden="true"></span>
    <span id="wi-ct"></span>
    <span class="wi-go">open &rarr;</span>
  </div>
</aside>

<style>
  #wiki-inspector {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    z-index: 40;
    width: 20.625rem;
    padding: 1.125rem 1.25rem 1rem;
    background: var(--card);
    border: 1px solid rgb(0 0 0 / 0.1);
    border-radius: 0.875rem;
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.08);
    opacity: 0;
    transform: translateY(6px);
    pointer-events: none;
    transition:
      opacity 130ms ease,
      transform 130ms ease;
  }
  :global(.dark) #wiki-inspector {
    border-color: rgb(255 255 255 / 0.1);
    box-shadow: 0 8px 30px rgb(0 0 0 / 0.35);
  }
  #wiki-inspector[data-show] {
    opacity: 1;
    transform: translateY(0);
  }
  .wi-nb {
    margin: 0 0 0.5rem;
    font-size: 0.65625rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .wi-ti {
    margin: 0;
    font-size: 1.1875rem;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: -0.012em;
    color: #000;
  }
  :global(.dark) .wi-ti {
    color: #fff;
  }
  .wi-su {
    margin: 0.5rem 0 0;
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgb(0 0 0 / 0.72);
  }
  :global(.dark) .wi-su {
    color: rgb(255 255 255 / 0.72);
  }
  .wi-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.875rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgb(0 0 0 / 0.08);
    font-size: 0.6875rem;
    color: rgb(0 0 0 / 0.5);
  }
  :global(.dark) .wi-meta {
    border-top-color: rgb(255 255 255 / 0.08);
    color: rgb(255 255 255 / 0.5);
  }
  .wi-dots {
    display: inline-flex;
    gap: 2px;
  }
  .wi-dots :global(i) {
    display: block;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--accent);
  }
  .wi-go {
    margin-left: auto;
    color: var(--accent);
  }
  @media (max-width: 640px) {
    #wiki-inspector {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    #wiki-inspector {
      transition: opacity 80ms linear;
    }
    #wiki-inspector,
    #wiki-inspector[data-show] {
      transform: none;
    }
  }
</style>

<script>
  (() => {
    const insp = document.getElementById("wiki-inspector");
    const list = document.getElementById("wiki-list");
    const nb = document.getElementById("wi-nb");
    const ti = document.getElementById("wi-ti");
    const su = document.getElementById("wi-su");
    const ct = document.getElementById("wi-ct");
    const dots = document.getElementById("wi-dots");
    if (!insp || !list || !nb || !ti || !su || !ct || !dots) return;

    const rows = Array.from(list.querySelectorAll<HTMLElement>(".wd-row"));
    let hideT = 0;

    const fill = (r: HTMLElement) => {
      clearTimeout(hideT);
      nb.textContent = r.dataset.nb ?? "";
      ti.textContent = r.querySelector(".wd-nm")?.textContent ?? "";
      su.textContent = r.dataset.su ?? "";
      const n = Number.parseInt(r.dataset.ct ?? "0", 10);
      ct.textContent = `${n} source${n === 1 ? "" : "s"}`;
      let d = "";
      for (let i = 0; i < Math.min(n, 6); i++) {
        d += `<i style="opacity:${0.5 + i * 0.08}"></i>`;
      }
      dots.innerHTML = d;
      insp.setAttribute("data-show", "");
      for (const x of rows) x.removeAttribute("data-live");
      r.setAttribute("data-live", "");
    };

    const hide = () => {
      hideT = window.setTimeout(() => {
        insp.removeAttribute("data-show");
        for (const x of rows) x.removeAttribute("data-live");
      }, 120);
    };

    for (const r of rows) {
      r.addEventListener("mouseenter", () => fill(r));
      r.addEventListener("focusin", () => fill(r));
    }
    list.addEventListener("mouseleave", hide);
  })();
</script>
```

- [ ] **Step 2: Verify lint/format passes**

Run: `pnpm check`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/wiki/WikiInspector.astro
git commit -m "wiki: WikiInspector — hover/focus concept preview card

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Recompose the wiki index

**Files:**

- Modify: `src/pages/wiki/index.astro` (full replace of frontmatter + template)

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `src/pages/wiki/index.astro` with:

```astro
---
import { getCollection } from "astro:content";
import Link from "@components/Link.astro";
import ProvenanceBadge from "@components/ProvenanceBadge.astro";
import ConstellationWell from "@components/wiki/ConstellationWell.astro";
import WikiDirectory from "@components/wiki/WikiDirectory.astro";
import WikiInspector from "@components/wiki/WikiInspector.astro";
import constellationLayout from "@data/constellation-layout.json";
import Layout from "@layouts/Layout.astro";

// Wiki index — concept-indexed synthesis. The constellation sits in a
// contained "well" below the header; the browse is a two-column directory
// grouped by neighbourhood (the same clusters the constellation draws),
// sorted by source count, with a hover/focus inspector for per-concept detail.
const wiki = (await getCollection("wiki")).sort((a, b) => a.data.title.localeCompare(b.data.title));

const lastCompiledMs =
  wiki.length > 0 ? Math.max(...wiki.map((c) => c.data.compiled_at.getTime())) : null;
const lastCompiled = lastCompiledMs ? new Date(lastCompiledMs) : null;

// Neighbourhood grouping — map each concept to its cluster via the same
// clusterById the constellation uses, emit clusters in curated order, sort
// each group by source count desc, and carry a trailing "Other" group so no
// concept drops out.
type Cluster = { id: string; title: string; short: string; hue: number };
const constellationNodes: { id: string }[] = constellationLayout.global.nodes;
const clusters: Cluster[] = constellationLayout.clusters;
const clusterById: Record<string, string | null> = constellationLayout.clusterById;

const conceptGroups = [
  ...clusters.map((cl) => ({
    label: cl.title,
    short: cl.short,
    concepts: wiki
      .filter((c) => clusterById[c.id] === cl.id)
      .sort((a, b) => b.data.sources.length - a.data.sources.length),
  })),
  {
    label: "Other",
    short: "Other",
    concepts: wiki
      .filter((c) => {
        const id = clusterById[c.id];
        return id == null || !clusters.some((cl) => cl.id === id);
      })
      .sort((a, b) => b.data.sources.length - a.data.sources.length),
  },
].filter((g) => g.concepts.length > 0);

const constellationNeighborhoodCount = clusters.filter(
  (cl) => constellationNodes.filter((n) => clusterById[n.id] === cl.id).length >= 2,
).length;
const constellationConceptCount = constellationNodes.length;
const constellationTieCount = constellationLayout.global.edges.length;
---

<Layout
  title="Wiki"
  description="Concept-indexed synthesis articles compiled from my reading log."
>
  <div class="mx-auto max-w-5xl px-6 md:px-8">
    <div class="space-y-12" data-pagefind-body data-pagefind-filter="type:Wiki">
      {/* Header — eyebrow, title, lede, meta row (concepts pill + provenance). */}
      <div class="flex max-w-[62ch] flex-col gap-4">
        <p class="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--accent)]">
          Wiki &middot; Concept index
        </p>
        <h1 class="font-heading text-display font-normal leading-[1.06] tracking-tight text-black dark:text-white">
          Wiki
        </h1>
        <p class="text-base leading-relaxed text-black/85 dark:text-white/85">
          Concept-indexed synthesis articles. Each article compiles across
          multiple sources from the <Link href="/reading">reading log</Link>;
          one article per concept that has at least two contributing sources.
        </p>
        <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span class="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-sm border border-black/15 px-2.5 py-1 font-mono text-xs text-[color:var(--accent)] dark:border-white/20">
            <span class="flex gap-[2px]" aria-hidden="true">
              {Array.from({ length: Math.min(wiki.length, 8) }).map((_, i) => (
                <span
                  class="block h-1 w-1 rounded-full bg-[color:var(--accent)]"
                  style={`opacity: ${0.55 + i * 0.05};`}
                />
              ))}
            </span>
            <span>
              {wiki.length} concept{wiki.length === 1 ? "" : "s"}
            </span>
          </span>
          {
            lastCompiled && (
              <ProvenanceBadge action="Compiled by Claude" date={lastCompiled} link />
            )
          }
        </div>
      </div>

      {/* Contained constellation — framed in a recessed well, not a hero. */}
      {
        wiki.length > 0 && (
          <ConstellationWell
            width={600}
            conceptCount={constellationConceptCount}
            neighbourhoodCount={constellationNeighborhoodCount}
            tieCount={constellationTieCount}
          />
        )
      }

      {/* Scannable directory + per-concept inspector. */}
      {
        wiki.length > 0 ? (
          <WikiDirectory groups={conceptGroups} />
        ) : (
          <p class="text-base leading-relaxed text-black/85 dark:text-white/85">
            Nothing here yet. Wiki articles materialise when at least two
            reading-log entries share a topic.
          </p>
        )
      }

      <p class="text-xs text-black/55 dark:text-white/55">
        <Link href="/reading">reading log &rarr;</Link>
      </p>
    </div>
  </div>

  {wiki.length > 0 && <WikiInspector />}
</Layout>
```

- [ ] **Step 2: Typecheck + build**

Run: `pnpm build`
Expected: `astro check` reports 0 errors; SSG build completes. (This is the first task that exercises the three new components' types — `Group`, the `data-*` attributes, and `ConstellationWell` props.)

- [ ] **Step 3: Manual check — desktop**

Run `pnpm dev`, open `http://localhost:4321/wiki` (refresh manually). Expected:

- Eyebrow `WIKI · CONCEPT INDEX`, title, lede, then the `45 concepts` pill + `✳ Compiled by Claude · <date> · How this works →` chip.
- Constellation sits centered in a recessed panel with the `N concepts · N neighbourhoods · N ties` caption bottom-left.
- Below it, a two-column directory grouped by neighbourhood; titles left, faint count right with a clear gap (no collision).
- Hovering a row: its title goes accent and the bottom-right inspector shows that concept's neighbourhood / title / summary / dot-ramp + `N sources` / `open →`. Moving down the rows updates it; leaving the list fades it out. Tab key also drives it.

- [ ] **Step 4: Commit**

```bash
git add src/pages/wiki/index.astro
git commit -m "wiki: recompose index — contained well + scannable directory + inspector

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Full verification matrix

**Files:** none (verification only)

- [ ] **Step 1: Clean build**

Run: `pnpm build`
Expected: `astro check` 0 errors, build succeeds, no warnings about the wiki route.

- [ ] **Step 2: Dark mode**

In `pnpm dev`, toggle the theme to dark on `/wiki`. Expected: well, directory panel, and inspector all use the dark surface tones (slightly lifted off `#18161a`), borders are faint white, text legible. The constellation keeps its existing dark treatment.

- [ ] **Step 3: Mobile fallback**

Resize the browser to ≤640px (or device toolbar). Expected: directory collapses to a single column; each row shows one clamped summary line under the title; the bottom-right inspector is gone. Tapping a row navigates to the article.

- [ ] **Step 4: Reduced motion**

Enable "Reduce motion" (macOS: System Settings → Accessibility → Display). Hover a row. Expected: inspector still appears, but with no upward slide (opacity only).

- [ ] **Step 5: Agent surfaces unaffected**

Run: `pnpm build` then check the emitted files exist and are non-empty:

```bash
ls -la dist/wiki.json dist/wiki.txt dist/llms.txt
```

Expected: all three present. (This change is presentation-only; their generators read the collection, not the index page, so content is unchanged.)

- [ ] **Step 6: Final lint**

Run: `pnpm check`
Expected: no errors, working tree clean except the pre-existing labs artifacts.

- [ ] **Step 7: Confirm no stray commits of labs artifacts**

Run: `git status`
Expected: the only unstaged changes are the pre-existing `src/content/labs/...` artifacts (citation-faithfulness, ingest-pipeline-cost) — they must **not** appear in any commit from this plan. If they were accidentally staged/committed, revert them.

---

## Self-Review

**Spec coverage:**

- Header (eyebrow + pill + ProvenanceBadge) → Task 6 ✓
- Contained well (600px, caption) → Task 3 + Task 6 ✓
- Two-column directory (titles, faint count, sorted by count, collision fixed) → Task 4 + Task 6 ✓
- Inspector (hidden-until-hover, data-driven, reduced-motion, aria-hidden, soft shadow) → Task 5 ✓
- Mobile fallback (single col + one summary line, no card) → Task 4 (CSS) + Task 7 (verify) ✓
- Dark mode tokens → Task 1 + verified Task 7 ✓
- Masthead A (keep SignatureLogo, accent+underline active marker, aria-current) → Task 2 ✓
- Agent surfaces unaffected → Task 7 ✓

**Type consistency:** Directory emits `class="wd-row" data-nb/data-ct/data-su` + `.wd-nm`; inspector queries exactly `#wiki-list .wd-row`, `.wd-nm`, `dataset.nb/ct/su`. `Group` type (`label`/`short`/`concepts`) matches `conceptGroups` shape built in Task 6. `ConstellationWell` props (`width`/`conceptCount`/`neighbourhoodCount`/`tieCount`) match the Task 6 call site. ✓

**Placeholder scan:** none — every step has concrete code/commands.
