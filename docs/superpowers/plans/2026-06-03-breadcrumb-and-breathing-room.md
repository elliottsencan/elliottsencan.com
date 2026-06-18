# Breadcrumb Consolidation + Breathing Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace three inconsistent back-nav patterns with one self-contained `Breadcrumb` on every sub-page, and give the site more top room + looser section rhythm via a shared `PageBody` wrapper.

**Architecture:** `Breadcrumb` becomes self-contained — it renders `← {parent}` plus its own dotted `.dot-rule` filler (mirroring `LabeledRule`'s flex skeleton), so every page drops one tag and renders identically. The current page is never shown. `BackToPrevious` is deleted; blog posts gain a crumb. Spacing is centralized: `main`'s top padding grows in `global.css`, and a new `PageBody` (= `Container` + `space-y-16`) replaces the per-page `Container > div.space-y-12` pattern.

**Tech Stack:** Astro 6 (SSG, no client framework), Tailwind utility classes, Biome (lint/format). No component test harness exists for `.astro` files — verification is `pnpm exec astro check` (TS-strict + template), targeted `grep`, `pnpm check` (Biome), and a final `pnpm build` + visual click-through.

**Spec:** `docs/superpowers/specs/2026-06-03-breadcrumb-and-breathing-room-design.md`

**Conventions to honor (from CLAUDE.md + memory):**

- Never use bare `<header>`/`<footer>`/`<main>`/`<article>` for in-page sections.
- No entrance animations, no textures.
- `pnpm build` runs `pnpm labs:aggregate`, which mutates uncommitted labs artifact files (`src/content/labs/**`). After any `pnpm build`, **revert those artifact changes before committing** (`git checkout -- src/content/labs/`).
- Branch is `type-wiki-refresh`; there are pre-existing uncommitted changes under `src/content/labs/` — do not stage them. Stage only files this plan touches.

---

## File Structure

**New:**

- `src/components/PageBody.astro` — page content wrapper: `Container` + `space-y-16` section rhythm, with `class` merge + `data-*` passthrough.

**Modified — components/layouts:**

- `src/components/Breadcrumb.astro` — drop `current`; self-contained (own dot-rule).
- `src/components/PageHero.astro` — render breadcrumb slot directly (no `LabeledRule` wrapper); loosen hero-stack gaps.
- `src/styles/global.css` — increase `main` top padding.

**Modified — pages (breadcrumb):**

- Drop `current`: `reading/[...slug]`, `reading/[year]/index`, `wiki/how-this-works`, `labs/[...slug]`, `about/process`, `about/colophon`, `about/uses`, `now/archive`, `now/how-this-works`, `now/archive/[...slug]`, `writing/[year]/index`.
- Unwrap `LabeledRule`: `wiki/[...slug]`.
- Convert from `BackToPrevious`: `projects/[...id]`, `tags/[...id]`, `404`.
- Add crumb: `writing/[...id]`.

**Modified — pages (PageBody migration):** 19 standard pages (table in Task 7). Bespoke in-place bump: `wiki/index`, `wiki/[...slug]`.

**Deleted:**

- `src/components/BackToPrevious.astro`.

---

## Task 1: Make `Breadcrumb` self-contained and drop `current`

**Files:**

- Modify: `src/components/Breadcrumb.astro`
- Modify: `src/components/PageHero.astro`
- Modify (drop `current`): `src/pages/reading/[...slug].astro:91`, `src/pages/reading/[year]/index.astro:84`, `src/pages/wiki/how-this-works.astro:26`, `src/pages/labs/[...slug].astro:92`, `src/pages/about/process.astro:61`, `src/pages/about/colophon.astro:28`, `src/pages/about/uses.astro:130`, `src/pages/now/archive.astro:38`, `src/pages/now/how-this-works.astro:34`, `src/pages/now/archive/[...slug].astro:39`, `src/pages/writing/[year]/index.astro:54`
- Modify (unwrap): `src/pages/wiki/[...slug].astro:168-170`

- [ ] **Step 1: Rewrite `Breadcrumb.astro` to be self-contained**

Replace the entire contents of `src/components/Breadcrumb.astro` with:

```astro
---
// Canonical breadcrumb — pure up-navigation to the immediate parent. The
// current page is NEVER shown (the h1 directly below already names it).
//
//   ← {parent}  ·············································
//
// Self-contained: it carries its own dotted filler (same `.dot-rule` recipe
// and background as LabeledRule/EditorialRule) so the cursor-halo script in
// Layout.astro reaches it with one selector, AND so every page drops a single
// <Breadcrumb /> tag and renders identically — impossible to misalign one
// page against another. The outer `flex items-center gap-4` + filler skeleton
// matches LabeledRule exactly, so it grid-aligns wherever LabeledRule did.
//
// The parent link is the accent and the only hover target (underline, no bg).

type Props = {
  parent: { label: string; href: string };
};

const { parent } = Astro.props;
---

<div class="flex items-center gap-4">
  <a
    href={parent.href}
    class="shrink-0 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--accent)] no-underline transition-colors duration-300 ease-in-out hover:underline focus-visible:underline"
  >
    &larr; {parent.label}
  </a>
  <div role="presentation" aria-hidden="true" class="dot-rule h-px flex-1 py-2"></div>
</div>
```

- [ ] **Step 2: Update `PageHero.astro` to render the slot directly**

In `src/components/PageHero.astro`, remove the `LabeledRule` import (line 3):

```astro
import LabeledRule from "@components/LabeledRule.astro";
```

Then replace the breadcrumb block:

```astro
  {
    breadcrumb && (
      <LabeledRule as="p">
        <slot name="breadcrumb" />
      </LabeledRule>
    )
  }
```

with:

```astro
  {breadcrumb && <slot name="breadcrumb" />}
```

Also update the header comment in `PageHero.astro` that mentions "prepends a LabeledRule carrying back-nav" so it reads: "prepends the self-contained `<Breadcrumb>` above the h1."

- [ ] **Step 3: Drop `current=` from every PageHero call site**

In each file below, delete only the ` current={...}` (or ` current="..."`) token from the `<Breadcrumb ... />` tag, leaving `parent` intact:

- `src/pages/reading/[...slug].astro:91` — remove ` current={entry.id}`
- `src/pages/reading/[year]/index.astro:84` — remove ` current={year}`
- `src/pages/wiki/how-this-works.astro:26` — remove ` current="How this works"`
- `src/pages/labs/[...slug].astro:92` — remove ` current={cell.id}`
- `src/pages/about/process.astro:61` — remove ` current="Process"`
- `src/pages/about/colophon.astro:28` — remove ` current="Colophon"`
- `src/pages/about/uses.astro:130` — remove ` current="Uses"`
- `src/pages/now/archive.astro:38` — remove ` current="Archive"`
- `src/pages/now/how-this-works.astro:34` — remove ` current="How this page works"`
- `src/pages/writing/[year]/index.astro:54` — remove ` current={year}`

Example (`reading/[...slug].astro`):

```astro
          <Breadcrumb parent={{ label: "Reading", href: "/reading/" }} />
```

- [ ] **Step 4: Fix the `now/archive/[...slug]` crumb to immediate-parent-only**

In `src/pages/now/archive/[...slug].astro:39`, replace:

```astro
          <Breadcrumb parent={{ label: "Now / Archive", href: "/now/archive" }} current={entry.id} />
```

with:

```astro
          <Breadcrumb parent={{ label: "Archive", href: "/now/archive/" }} />
```

- [ ] **Step 5: Unwrap the wiki slug breadcrumb from its `LabeledRule`**

In `src/pages/wiki/[...slug].astro`, replace lines 168–170:

```astro
          <LabeledRule as="p">
            <Breadcrumb parent={{ label: "Wiki", href: "/wiki/" }} />
          </LabeledRule>
```

with:

```astro
          <Breadcrumb parent={{ label: "Wiki", href: "/wiki/" }} />
```

Leave the surrounding `<div class="md:col-start-1 md:row-start-1">` in place. Do NOT remove the `LabeledRule` import — it is still used at line 285 (`<LabeledRule>Related concepts</LabeledRule>`).

- [ ] **Step 6: Verify type/template check passes**

Run: `pnpm exec astro check`
Expected: PASS (0 errors). If it reports `current` is missing/unknown anywhere, you missed a call site in Step 3 — fix it. The check is the gate that proves no stale `current` props remain.

- [ ] **Step 7: Grep-verify no `current=` props and no double-rule in wiki**

Run: `grep -rn "current=" src/pages src/components | grep -i breadcrumb || echo "clean"`
Expected: `clean`

Run: `grep -n "LabeledRule" src/components/PageHero.astro || echo "removed from PageHero"`
Expected: `removed from PageHero`

- [ ] **Step 8: Format and commit**

```bash
pnpm check
git add src/components/Breadcrumb.astro src/components/PageHero.astro \
  "src/pages/reading/[...slug].astro" "src/pages/reading/[year]/index.astro" \
  src/pages/wiki/how-this-works.astro "src/pages/labs/[...slug].astro" \
  src/pages/about/process.astro src/pages/about/colophon.astro src/pages/about/uses.astro \
  src/pages/now/archive.astro src/pages/now/how-this-works.astro \
  "src/pages/now/archive/[...slug].astro" "src/pages/writing/[year]/index.astro" \
  "src/pages/wiki/[...slug].astro"
git commit -m "wiki+chrome: self-contained Breadcrumb, drop current segment"
```

---

## Task 2: Convert `BackToPrevious` pages to `Breadcrumb`; delete `BackToPrevious`

`tags/[...id]` and `404` adopt `PageHero` breadcrumb mode (their heroes are simple). `projects/[...id]` keeps its bespoke hero and gets the crumb at the top. This task also folds in the `PageBody` migration for `tags/[...id]` and `404` since they're being restructured anyway.

**Files:**

- Modify: `src/pages/tags/[...id].astro`
- Modify: `src/pages/404.astro`
- Modify: `src/pages/projects/[...id].astro`
- Delete: `src/components/BackToPrevious.astro`

- [ ] **Step 1: Restructure `tags/[...id].astro`**

In `src/pages/tags/[...id].astro`, update imports — remove:

```astro
import BackToPrevious from "@components/BackToPrevious.astro";
import Container from "@components/Container.astro";
```

and add:

```astro
import Breadcrumb from "@components/Breadcrumb.astro";
import PageBody from "@components/PageBody.astro";
import PageHero from "@components/PageHero.astro";
```

> NOTE: `PageBody.astro` is created in Task 3 / Task 6. If executing tasks strictly in order, do Task 3 (PageBody) before this step, or temporarily keep `Container`. Recommended order: Task 1 → Task 3 (create PageBody) → Task 2. Adjust the task order if your runner is strict.

Replace the body block (currently lines ~50–60):

```astro
  <Container>
    <div class="space-y-12" data-pagefind-ignore>
      <BackToPrevious href="/tags"> All tags </BackToPrevious>
      <h1 class="font-heading text-display font-normal leading-[1.06] tracking-tight text-black dark:text-white">
        Posts tagged with "{id}"
      </h1>
```

with:

```astro
  <PageBody data-pagefind-ignore>
    <PageHero breadcrumb>
      <Breadcrumb slot="breadcrumb" parent={{ label: "Tags", href: "/tags/" }} />
      <Fragment slot="title">Posts tagged with "{id}"</Fragment>
    </PageHero>
```

Then find the matching closing tags for the old `<div class="space-y-12">` and `</Container>` at the end of the page and replace `</div>` + `</Container>` with `</PageBody>`. (The old `<h1>` is now provided by `PageHero`'s `title` slot, so delete the standalone `<h1>…</h1>` you replaced above — it is already removed in the replacement.)

- [ ] **Step 2: Restructure `404.astro`**

Replace the entire contents of `src/pages/404.astro` with:

```astro
---
import Breadcrumb from "@components/Breadcrumb.astro";
import Link from "@components/Link.astro";
import PageBody from "@components/PageBody.astro";
import PageHero from "@components/PageHero.astro";
import { SITE } from "@consts";
import Layout from "@layouts/Layout.astro";
---

<Layout title="404" description={SITE.DESCRIPTION}>
  <PageBody>
    <PageHero breadcrumb>
      <Breadcrumb slot="breadcrumb" parent={{ label: "Home", href: "/" }} />
      <Fragment slot="title">404 — Not found</Fragment>
      <Fragment slot="summary">
        The URL you followed doesn't match anything published here. It may
        have moved, or it may never have existed.
      </Fragment>
    </PageHero>
    <p class="text-base leading-relaxed text-black/85 dark:text-white/85">
      <Link href="/">Go to the home page →</Link>
    </p>
  </PageBody>
</Layout>
```

- [ ] **Step 3: Convert the `projects/[...id].astro` crumb (bespoke hero)**

In `src/pages/projects/[...id].astro`, update imports — remove:

```astro
import BackToPrevious from "@components/BackToPrevious.astro";
```

and add (alphabetically near the other `@components` imports):

```astro
import Breadcrumb from "@components/Breadcrumb.astro";
```

Replace:

```astro
    <div>
      <BackToPrevious href="/about">Back to about</BackToPrevious>
    </div>
```

with:

```astro
    <Breadcrumb parent={{ label: "About", href: "/about/" }} />
```

Leave the following `<div class="my-10 max-w-[62ch] space-y-2">` hero block unchanged — its `my-10` gives the crumb-to-title gap. This page stays on `Container` (bespoke layout, not migrated to `PageBody`).

- [ ] **Step 4: Delete `BackToPrevious.astro` and verify no references**

```bash
rm src/components/BackToPrevious.astro
grep -rn "BackToPrevious" src/ || echo "no references"
```

Expected: `no references`

- [ ] **Step 5: Verify and commit**

Run: `pnpm exec astro check`
Expected: PASS

```bash
pnpm check
git add "src/pages/tags/[...id].astro" src/pages/404.astro "src/pages/projects/[...id].astro"
git rm src/components/BackToPrevious.astro
git commit -m "chrome: unify back-nav onto Breadcrumb; retire BackToPrevious"
```

---

## Task 3: Create `PageBody` and add the blog-post crumb

**Files:**

- Create: `src/components/PageBody.astro`
- Modify: `src/pages/writing/[...id].astro`

- [ ] **Step 1: Create `src/components/PageBody.astro`**

```astro
---
import Container from "@components/Container.astro";

// Canonical page content wrapper. Pairs the site Container (single source of
// width + gutter truth: max-w-5xl px-6 md:px-8) with the standard section
// rhythm (space-y-16). Replaces the per-page `Container > div.space-y-12`
// pattern so the rhythm value lives in exactly one place.
//
// `class` is merged onto the rhythm wrapper; any other attributes (e.g.
// data-pagefind-body / data-pagefind-filter / data-pagefind-ignore) pass
// through to the same element. Bespoke-grid pages (wiki index/slug, blog
// posts, project pages) keep their own structure and do NOT use this.

type Props = {
  class?: string;
  [key: string]: unknown;
};

const { class: className, ...rest } = Astro.props;
---

<Container>
  <div class:list={["space-y-16", className]} {...rest}>
    <slot />
  </div>
</Container>
```

- [ ] **Step 2: Add the `← Writing` crumb to blog posts**

In `src/pages/writing/[...id].astro`, add the import (near the other `@components` imports):

```astro
import Breadcrumb from "@components/Breadcrumb.astro";
```

Replace the hero block:

```astro
    <div class="mb-10 pt-6 md:pt-8">
      <h1 class="mb-1.5 font-heading text-3xl font-medium tracking-tight text-black md:text-4xl dark:text-white">
        {post.data.title}
      </h1>
      <PostMeta post={post} />
      <PostBadges post={post} />
    </div>
```

with:

```astro
    <div class="mb-10 pt-6 md:pt-8">
      <Breadcrumb parent={{ label: "Writing", href: "/writing/" }} />
      <h1 class="mb-1.5 mt-4 font-heading text-3xl font-medium tracking-tight text-black md:text-4xl dark:text-white">
        {post.data.title}
      </h1>
      <PostMeta post={post} />
      <PostBadges post={post} />
    </div>
```

(The only h1 change is adding `mt-4` for the crumb-to-title gap.)

- [ ] **Step 3: Verify and commit**

Run: `pnpm exec astro check`
Expected: PASS

```bash
pnpm check
git add src/components/PageBody.astro "src/pages/writing/[...id].astro"
git commit -m "chrome: add PageBody wrapper; blog posts gain a Writing crumb"
```

---

## Task 4: Increase top breathing room in `global.css`

**Files:**

- Modify: `src/styles/global.css:232-246`

- [ ] **Step 1: Bump `main` top padding**

In `src/styles/global.css`, replace:

```css
main {
  @apply flex-1 pt-24 md:pt-32;
  /* Reserves space for the fixed footer plus visual breathing room so the
       last paragraph of long-form prose doesn't sit flush against it. */
  padding-bottom: calc(var(--footer-height) + 4rem);
}

@media (max-width: 767px) {
  main {
    /* Two-row masthead on mobile (logo + utility, then section links
         below a hairline rule) is taller than the single-row md: layout,
         so it needs more top breathing room — not less. */
    @apply pt-36;
  }
}
```

with:

```css
main {
  @apply flex-1 pt-28 md:pt-40;
  /* Reserves space for the fixed footer plus visual breathing room so the
       last paragraph of long-form prose doesn't sit flush against it. */
  padding-bottom: calc(var(--footer-height) + 4rem);
}

@media (max-width: 767px) {
  main {
    /* Two-row masthead on mobile (logo + utility, then section links
         below a hairline rule) is taller than the single-row md: layout,
         so it keeps more top room than desktop. */
    @apply pt-44;
  }
}
```

This sets desktop top room to `pt-40` (160px) and mobile to `pt-44` (176px), up from 128px / 144px.

- [ ] **Step 2: Verify and commit**

Run: `pnpm exec astro check`
Expected: PASS

```bash
pnpm check
git add src/styles/global.css
git commit -m "chrome: more top breathing room under the masthead"
```

---

## Task 5: Loosen the `PageHero` hero-stack rhythm

**Files:**

- Modify: `src/components/PageHero.astro`

- [ ] **Step 1: Loosen the three hero gaps**

In `src/components/PageHero.astro`:

- Outer wrapper: change `<div class="flex flex-col gap-3">` (the top-level one wrapping the whole hero) to `<div class="flex flex-col gap-4">`.
- Inner column: change `<div class="flex min-w-0 max-w-[62ch] flex-col gap-4">` to `... gap-5`.
- Title/summary/meta group: change the inner `<div class="flex flex-col gap-3">` to `... gap-4`.

After editing, confirm exactly these three gaps changed:

Run: `grep -nE "flex-col gap-(4|5)" src/components/PageHero.astro`
Expected: three matches (outer `gap-4`, inner `gap-5`, group `gap-4`).

- [ ] **Step 2: Verify and commit**

Run: `pnpm exec astro check`
Expected: PASS

```bash
pnpm check
git add src/components/PageHero.astro
git commit -m "chrome: loosen PageHero stack spacing"
```

---

## Task 6: Migrate standard pages to `PageBody`; bump bespoke wiki rhythm

Apply this recipe to each **standard** page (table below). The bespoke wiki pages get an in-place class bump instead.

**Recipe (standard page):**

1. Imports: remove `import Container from "@components/Container.astro";`, add `import PageBody from "@components/PageBody.astro";`.
2. Opening tag: replace the `<Container>` + its child `<div ... class="space-y-12" [data-attrs]>` with a single `<PageBody [data-attrs]>` carrying the same data attributes (see table).
3. Closing tag: replace the matching `</div>` + `</Container>` with a single `</PageBody>`.
4. Confirm `Container` is no longer referenced in the file.

**Worked example — `now.astro` (multi-line wrapper, has pagefind attrs):**

Before:

```astro
  <Container>
    <div
      class="space-y-12"
      data-pagefind-body
      data-pagefind-filter="type:About"
    >
      <!-- … sections … -->
    </div>
  </Container>
```

After:

```astro
  <PageBody data-pagefind-body data-pagefind-filter="type:About">
    <!-- … sections … -->
  </PageBody>
```

**Worked example — `search.astro` (single-line wrapper):**

Before: `    <div class="space-y-12" data-pagefind-ignore>` … `</div>` inside `<Container>`.
After: `  <PageBody data-pagefind-ignore>` … `</PageBody>` (Container removed).

**Per-file table — `data-*` to carry onto `PageBody`:**

| File                                    | `data-*` on `PageBody`                                           |
| --------------------------------------- | ---------------------------------------------------------------- |
| `src/pages/index.astro`                 | _(none — pagefind attrs are on inner `<section>`s; leave those)_ |
| `src/pages/reading.astro`               | `data-pagefind-body data-pagefind-filter="type:Reading"`         |
| `src/pages/about.astro`                 | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/search.astro`                | `data-pagefind-ignore`                                           |
| `src/pages/now.astro`                   | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/reading/[...slug].astro`     | `data-pagefind-body data-pagefind-filter="type:Reading"`         |
| `src/pages/reading/[year]/index.astro`  | `data-pagefind-body data-pagefind-filter="type:Reading"`         |
| `src/pages/labs/[...slug].astro`        | `data-pagefind-body data-pagefind-filter="type:Labs"`            |
| `src/pages/labs/index.astro`            | `data-pagefind-body data-pagefind-filter="type:Labs"`            |
| `src/pages/about/uses.astro`            | `data-pagefind-body data-pagefind-filter="type:Uses"`            |
| `src/pages/about/process.astro`         | `data-pagefind-body data-pagefind-filter="type:Process"`         |
| `src/pages/about/colophon.astro`        | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/now/how-this-works.astro`    | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/now/archive.astro`           | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/now/archive/[...slug].astro` | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/wiki/how-this-works.astro`   | `data-pagefind-body data-pagefind-filter="type:About"`           |
| `src/pages/tags/index.astro`            | `data-pagefind-ignore`                                           |
| `src/pages/writing/index.astro`         | `data-pagefind-body data-pagefind-filter="type:Writing"`         |
| `src/pages/writing/[year]/index.astro`  | `data-pagefind-body data-pagefind-filter="type:Writing"`         |

- [ ] **Step 1: Migrate each standard page in the table**

For each row, apply the recipe. Work one file at a time; after each, run `grep -c "Container" <file>` and expect `0`.

- [ ] **Step 2: In-place rhythm bump for the two bespoke wiki pages**

These keep their `Container` and bespoke grid — only the rhythm class changes:

- `src/pages/wiki/index.astro:62` — change `class="space-y-12"` to `class="space-y-16"` (keep `data-pagefind-body data-pagefind-filter="type:Wiki"`).
- `src/pages/wiki/[...slug].astro:146` — change `class="space-y-12"` to `class="space-y-16"`.

- [ ] **Step 3: Verify no `space-y-12` remains and all migrations applied**

Run: `grep -rn "space-y-12" src/pages || echo "no space-y-12 left"`
Expected: `no space-y-12 left`

Run: `grep -rln "PageBody" src/pages | wc -l`
Expected: `21` (19 from the table + `tags/[...id]` + `404` migrated in Task 2).

Run: `pnpm exec astro check`
Expected: PASS

- [ ] **Step 4: Format and commit**

```bash
pnpm check
git add src/pages
git commit -m "chrome: centralize section rhythm in PageBody (space-y-16)"
```

---

## Task 7: Full build verification + visual click-through

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `pnpm build`
Expected: completes without error (astro-check + SSG + pagefind). Frontmatter is validated against the Zod schemas here.

- [ ] **Step 2: Revert labs build artifacts**

`pnpm build` runs `labs:aggregate`, which mutates `src/content/labs/**`. Revert those so they aren't committed:

```bash
git checkout -- src/content/labs/
git status --short
```

Expected: no `src/content/labs/**` files staged or modified by you. (Pre-existing labs changes from before this work may remain unstaged — leave them.)

- [ ] **Step 3: Visual click-through (manual)**

Run: `pnpm dev` (HMR is unreliable — refresh manually after navigating). Confirm on each page type:

- Blog post (`/writing/<any-post>/`): `← Writing` crumb above the title, dot-rule to its right, gap looks right.
- Project (`/projects/<any>/`): `← About` crumb at top.
- Tag page (`/tags/<any>/`): `← Tags` crumb in the hero; title renders via PageHero.
- Reading / wiki / labs slug: `← Reading` / `← Wiki` / `← Labs`, no current segment.
- Wiki slug specifically: confirm the breadcrumb still **grid-aligns** with the constellation column and the bottom rule (Task 1 Step 5 unwrap) — no vertical drift, no double rule.
- About sub-page (`/about/process`): `← About` crumb.
- Now archive entry (`/now/archive/<any>/`): `← Archive` crumb (not "Now / Archive").
- `/404`: `← Home` crumb + body "Go to the home page →" link.
- Top-level indexes (`/`, `/writing`, `/reading`, `/wiki`, `/labs`, `/about`, `/now`, `/tags`, `/search`): NO crumb; h1 opens off the masthead with the new top room.
- Hover any breadcrumb's dot-rule: the cursor-halo still animates (proves the `.dot-rule` recipe carried over).
- General: top room under the masthead and section spacing feel roomier; mobile (narrow window) top room is comfortable, not excessive — if `pt-44` mobile is too much, dial to `pt-40` in `global.css` and re-check.

- [ ] **Step 4: Final lint gate**

Run: `pnpm check`
Expected: no changes needed (or auto-formats cleanly). If it modifies files, commit them:

```bash
git add -A -- ':!src/content/labs'
git commit -m "chore: format pass"
```

---

## Self-Review notes (addressed during planning)

- **Spec coverage:** scope (sub-pages only, home excluded) → Tasks 1–3; never-show-current → Task 1; immediate-parent-only → Task 1 Step 4 (now/archive); self-contained component → Task 1 Step 1; retire BackToPrevious → Task 2; blog-post crumb → Task 3; top room → Task 4; hero rhythm → Task 5; PageBody centralization → Tasks 3+6; bespoke exclusions (wiki/blog/projects) → Task 6 Step 2 + Tasks 2/3 bespoke handling; JSON-LD untouched → not modified anywhere.
- **Task ordering caveat:** `tags/[...id]` and `404` (Task 2) import `PageBody`, created in Task 3. Execute in order **Task 1 → Task 3 → Task 2 → Task 4 → Task 5 → Task 6 → Task 7**, or create `PageBody` first. This is called out in Task 2 Step 1.
- **Type consistency:** `Breadcrumb` prop is `parent: { label, href }` everywhere; `current` removed from component and all call sites; `PageBody` prop is `class?` + index signature for `data-*` passthrough.
