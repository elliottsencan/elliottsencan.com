# Handoff: Universalize `PageBody` across the remaining pages

> **You are a fresh agent picking up this work with no prior context. This document is self-contained — everything you need is here. Read it fully before editing.**

## Goal

Make `PageBody` the single wrapper for every page's main content. Four pages currently bypass it:

- `wiki/index.astro` and `wiki/[...slug].astro` **hand-inline** the exact `Container + space-y-16` structure that `PageBody` provides — pure duplication. Fix = swap to `PageBody`, inner grids untouched.
- `projects/[...id].astro` and `writing/[...id].astro` use the `Container` component with **bespoke hand-tuned vertical margins** (`my-10`, `mb-12`, `mb-10`, `pt-6`, `mt-16`). Redesign = drop those margins, adopt `PageBody`'s `space-y-16` rhythm, and group the breadcrumb tightly with the hero (see Design Principle below).

After this chunk, **every** page uses `PageBody` for its content wrapper. The home page (`index.astro`) already uses `PageBody` (with a `Masthead` hero) and must NOT be touched.

## Background (the work this builds on)

This site recently consolidated back-navigation onto one `Breadcrumb` component and centralized spacing. See `docs/superpowers/specs/2026-06-03-breadcrumb-and-breathing-room-design.md` and `docs/superpowers/plans/2026-06-03-breadcrumb-and-breathing-room.md` for the full design. The three relevant components already exist:

- **`src/components/PageBody.astro`** — the canonical content wrapper. It is `Container` (`mx-auto max-w-5xl px-6 md:px-8`) + a `space-y-16` rhythm wrapper, typed `HTMLAttributes<"div">` so it merges `class` and passes through any `data-*` attributes. Usage: `<PageBody data-pagefind-body data-pagefind-filter="type:X"> ...sections... </PageBody>`.
- **`src/components/PageHero.astro`** — standard page hero (breadcrumb slot + title/summary/meta + bottom rule). NOT used by the four bespoke pages here; their heroes are too custom. Do not try to force PageHero onto them.
- **`src/components/Breadcrumb.astro`** — props `{ parent: { label: string; href: string } }`. Renders `← {label}` plus its own dotted `.dot-rule` filler, wrapped in `<nav aria-label="Breadcrumb">`. Self-contained: drop it anywhere and it renders identically.

## CRITICAL design principle — breadcrumb must sit TIGHT to the title

The page rhythm is `space-y-16` (64px) between top-level blocks. But the breadcrumb is part of the hero and must sit **close** to the title, NOT 64px above it. On `PageHero` pages this is handled by grouping the breadcrumb and title in a `flex flex-col gap-4` (16px) stack. **You must replicate that grouping** on the bespoke pages: the breadcrumb and the title block go inside one `<div class="flex flex-col gap-4">`, and THAT group is a single `PageBody` child. If you make the breadcrumb a direct child of `PageBody`, it will sit 64px from the title — wrong.

## Environment & conventions (read carefully — these will bite you otherwise)

- Work from `/Users/2ts/git/personal-dev/elliottsencan.com`. Branch is `type-wiki-refresh` — do NOT switch branches.
- Path alias: `@components/*` → `src/components/*`.
- **No component test harness** for `.astro`. Your verification gate is `pnpm exec astro check` (TypeScript-strict + template compile). There is nothing to unit-test; do not write component tests.
- **Do NOT run the full `pnpm check`** — it currently errors on stale `biome.json` files under `.claude/worktrees/`. Instead run biome TARGETED at the files you changed: `pnpm exec biome check --write <file> <file> ...`. (Biome does NOT reformat `.astro` template HTML, only the frontmatter — so it will not fix template indentation for you.)
- **Pre-existing uncommitted churn under `src/content/labs/`**: three files (`citation-faithfulness.md`, `data/citation-faithfulness.json`, `ingest-pipeline-cost.md`) are dirty in the working tree from an unrelated build step. They are NOT yours. NEVER stage them. NEVER use `git add -A` or `git add .` — always `git add <explicit paths>`. `pnpm build` re-mutates them via `labs:aggregate`; that's expected — leave them dirty, do not commit or revert them. After every commit, run `git status --short` and confirm no `src/content/labs/` path was staged by you.
- Commit after each task (4 commits). End commit messages with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

## Reindent technique (Tasks 1 & 2 only)

Tasks 1 & 2 collapse a two-level wrapper (`<div mx-auto…><div space-y-16…>`) into a single `<PageBody>`, so the inner content must lose one indent level (−2 spaces). Tasks 3 & 4 swap `<Container>`→`<PageBody>` 1:1 (no indent change to the bulk; only the small hero regroup shifts a few lines).

To prove a reindent changed only whitespace: after editing, run `git diff -w -- <file>`. For a pure reindent it shows nothing; for Tasks 3/4 it shows only your real (non-whitespace) edits. Use this as your safety net. Then `pnpm exec astro check` must pass (it errors on unbalanced tags).

---

## Task 1 — `wiki/index.astro` → `PageBody`

**File:** `src/pages/wiki/index.astro`

Add import (alphabetically; it becomes the first `@components` import, before `import Link from "@components/Link.astro";`):

```astro
import PageBody from "@components/PageBody.astro";
```

Current wrapper (around lines 62–63 and its close near line 127):

```astro
  <div class="mx-auto max-w-5xl px-6 md:px-8">
    <div class="space-y-16" data-pagefind-body data-pagefind-filter="type:Wiki">
      ... all the content (header group, constellation, directory, footer link) ...
    </div>
  </div>

  {wiki.length > 0 && <WikiInspector />}
</Layout>
```

Replace the two opening `<div>`s with one `<PageBody>` and the two closing `</div>`s with one `</PageBody>`:

```astro
  <PageBody data-pagefind-body data-pagefind-filter="type:Wiki">
    ... all the content ...
  </PageBody>

  {wiki.length > 0 && <WikiInspector />}
</Layout>
```

- Keep `<WikiInspector />` exactly where it is — OUTSIDE `PageBody`, a sibling under `<Layout>` (it's a floating inspector). Do not move it.
- The page does NOT import `Container`, so there's no Container import to remove.
- Reindent the inner content −2 spaces (it dropped from two wrapper levels to one). Verify with `git diff -w` showing nothing.

Verify: `pnpm exec astro check` → 0 errors.
Commit:

```bash
pnpm exec biome check --write src/pages/wiki/index.astro
git add src/pages/wiki/index.astro
git commit -m "wiki: use PageBody wrapper on the concept index"
```

---

## Task 2 — `wiki/[...slug].astro` → `PageBody`

**File:** `src/pages/wiki/[...slug].astro`

Add import `import PageBody from "@components/PageBody.astro";` (alphabetical position among `@components`).

Current wrapper (lines ~144–149, multi-line space-y div), closing near line ~398 before `</Layout>`:

```astro
  <div class="mx-auto max-w-5xl px-6 md:px-8">
    <div
      class="space-y-16"
      data-pagefind-body
      data-pagefind-filter="type:Wiki"
    >
      ... the bespoke 3-row constellation grid hero, related concepts, footer ...
    </div>
  </div>
</Layout>
```

Replace with:

```astro
  <PageBody data-pagefind-body data-pagefind-filter="type:Wiki">
    ... content unchanged ...
  </PageBody>
</Layout>
```

- The bespoke grid (`<div class="grid items-stretch ...">` and everything inside, including the `<Breadcrumb parent={{ label: "Wiki", href: "/wiki/" }} />` in row 1) stays EXACTLY as-is. You are only changing the OUTER wrapper.
- If this file imports `Container`, check whether it's still used after your change; it likely is NOT imported at all (the wrapper was raw divs) — confirm with `grep -n Container src/pages/wiki/[...slug].astro` and remove the import only if present AND unused.
- Reindent inner content −2 spaces. Verify with `git diff -w` showing nothing.

Verify: `pnpm exec astro check` → 0 errors (it will error if you mismatched the closing tags).
Commit:

```bash
pnpm exec biome check --write "src/pages/wiki/[...slug].astro"
git add "src/pages/wiki/[...slug].astro"
git commit -m "wiki: use PageBody wrapper on concept pages"
```

---

## Task 3 — `projects/[...id].astro` → `PageBody` (redesign)

**File:** `src/pages/projects/[...id].astro`

This is a redesign, not a mechanical swap. Imports: remove `import Container from "@components/Container.astro";`, add `import PageBody from "@components/PageBody.astro";` (alphabetical).

Current structure (children of `<Container>`, starting ~line 46):

```astro
  <Container>
    <Breadcrumb parent={{ label: "About", href: "/about/" }} />
    <div class="my-10 max-w-[62ch] space-y-2">
      <div class="flex items-center gap-1.5">
        <div class="font-base text-sm"><FormattedDate date={project.data.date} /></div>
        &bull;
        {project.body && (<div class="font-base text-sm">{readingTime(project.body)}</div>)}
      </div>
      <h1 class="font-heading text-2xl font-medium tracking-tight text-black md:text-3xl dark:text-white">
        {project.data.title}
      </h1>
    </div>

    {project.data.impact && project.data.impact.length > 0 && (
      <div class="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        ... impact cards ...
      </div>
    )}

    <div class={hasRail ? "grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:gap-12" : ""}>
      ... article + sticky rail aside ...
    </div>
  </Container>
</ProjectLayout>
```

Target structure:

```astro
  <PageBody>
    <div class="flex flex-col gap-4">
      <Breadcrumb parent={{ label: "About", href: "/about/" }} />
      <div class="max-w-[62ch] space-y-2">
        <div class="flex items-center gap-1.5">
          <div class="font-base text-sm"><FormattedDate date={project.data.date} /></div>
          &bull;
          {project.body && (<div class="font-base text-sm">{readingTime(project.body)}</div>)}
        </div>
        <h1 class="font-heading text-2xl font-medium tracking-tight text-black md:text-3xl dark:text-white">
          {project.data.title}
        </h1>
      </div>
    </div>

    {project.data.impact && project.data.impact.length > 0 && (
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        ... impact cards (UNCHANGED) ...
      </div>
    )}

    <div class={hasRail ? "grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:gap-12" : ""}>
      ... article + sticky rail aside (UNCHANGED) ...
    </div>
  </PageBody>
</ProjectLayout>
```

The exact changes:

1. `<Container>` → `<PageBody>` (and `</Container>` → `</PageBody>`). PageBody needs NO `data-*` here — the pagefind attributes live on the inner `<article>` and stay there.
2. Wrap the breadcrumb + title block in a new `<div class="flex flex-col gap-4">` so the crumb sits 16px above the title (the Design Principle). Indent the title block one level deeper accordingly.
3. Remove `my-10` from the title block (`<div class="my-10 max-w-[62ch] space-y-2">` → `<div class="max-w-[62ch] space-y-2">`). `space-y-16` now governs the gap from hero → impact.
4. Remove `mb-12` from the impact grid (`<div class="mb-12 grid ...">` → `<div class="grid ...">`). `space-y-16` governs impact → body.
5. The article/rail body grid is unchanged.

Result: hero-group → 64px → impact → 64px → body, with the crumb tight (16px) to the title. This is more breathing room than the old `my-10`/`mb-12` (40/48px) and matches the site rhythm.

Verify: `pnpm exec astro check` → 0 errors. Then `git diff -w` should show only your real edits (the div regroup + removed margin classes), confirming you didn't accidentally change content.
Commit:

```bash
pnpm exec biome check --write "src/pages/projects/[...id].astro"
git add "src/pages/projects/[...id].astro"
git commit -m "projects: adopt PageBody rhythm; group crumb with hero"
```

---

## Task 4 — `writing/[...id].astro` → `PageBody` (redesign)

**File:** `src/pages/writing/[...id].astro`

Imports: remove `import Container from "@components/Container.astro";`, add `import PageBody from "@components/PageBody.astro";` (alphabetical).

Current structure (children of `<Container>`, starting ~line 54):

```astro
  <Container>
    <div class="mb-10 pt-6 md:pt-8">
      <Breadcrumb parent={{ label: "Writing", href: "/writing/" }} />
      <h1 class="mb-1.5 mt-4 font-heading text-3xl font-medium tracking-tight text-black md:text-4xl dark:text-white">
        {post.data.title}
      </h1>
      <PostMeta post={post} />
      <PostBadges post={post} />
    </div>
    {/* TOC comment */}
    <div class={headings.length > 0 ? "grid gap-8 md:grid-cols-[minmax(0,1fr)_200px] md:gap-12" : ""}>
      ... TOC collapse + article + sticky TOC rail ...
    </div>
    <RevisionHistory filePath={post.filePath} />
    <div class="mt-16">
      <PostNavigation prevPost={prevPost} nextPost={nextPost} />
    </div>
  </Container>
</PostLayout>
```

Target structure:

```astro
  <PageBody>
    <div>
      <Breadcrumb parent={{ label: "Writing", href: "/writing/" }} />
      <h1 class="mb-1.5 mt-4 font-heading text-3xl font-medium tracking-tight text-black md:text-4xl dark:text-white">
        {post.data.title}
      </h1>
      <PostMeta post={post} />
      <PostBadges post={post} />
    </div>
    {/* TOC comment */}
    <div class={headings.length > 0 ? "grid gap-8 md:grid-cols-[minmax(0,1fr)_200px] md:gap-12" : ""}>
      ... TOC collapse + article + sticky TOC rail (UNCHANGED) ...
    </div>
    <RevisionHistory filePath={post.filePath} />
    <PostNavigation prevPost={prevPost} nextPost={nextPost} />
  </PageBody>
</PostLayout>
```

The exact changes:

1. `<Container>` → `<PageBody>` (no `data-*`; pagefind attrs stay on the `<article>`).
2. Hero wrapper `<div class="mb-10 pt-6 md:pt-8">` → `<div>`: remove `mb-10` (space-y-16 handles hero → TOC-grid) and remove `pt-6 md:pt-8` (the global `main` already provides ample top room — `pt-28 md:pt-40` — and PageHero pages add no local top pad, so this matches them). Keep the hero's internal layout (the h1 keeps `mt-4` for the tight crumb gap and `mb-1.5` to the meta — that internal grouping is fine).
3. Post-navigation: remove the wrapping `<div class="mt-16">` and make `<PostNavigation ... />` a direct child of `PageBody` (note: `mt-16` == `space-y-16` == 64px, so the rhythm is preserved exactly, just sourced from PageBody instead of a one-off margin).
4. The TOC/article grid and `<RevisionHistory>` are unchanged (RevisionHistory becomes a normal space-y-16 child).

Verify: `pnpm exec astro check` → 0 errors. `git diff -w` shows only your real edits.
Commit:

```bash
pnpm exec biome check --write "src/pages/writing/[...id].astro"
git add "src/pages/writing/[...id].astro"
git commit -m "writing: adopt PageBody rhythm on post pages"
```

---

## Final verification (after all 4 tasks)

1. **Every page now wraps in PageBody (except home, which uses PageBody+Masthead — leave it):**

   ```bash
   for f in $(find src/pages -name '*.astro'); do grep -q 'PageBody' "$f" || echo "NO PageBody: $f"; done
   ```

   Expect: nothing printed (all pages have PageBody). If `index.astro` or any page prints, investigate — `index.astro` should already have PageBody from prior work.

2. **No raw inlined wrapper remains:**

   ```bash
   grep -rn 'mx-auto max-w-5xl' src/pages
   ```

   Expect: nothing (the two wiki pages no longer hand-roll it).

3. **No stray `Container` imports left unused** in the 4 edited files:

   ```bash
   grep -rn 'Container' src/pages/projects/[...id].astro "src/pages/writing/[...id].astro" src/pages/wiki/index.astro "src/pages/wiki/[...slug].astro"
   ```

   Expect: nothing (Container fully replaced in these files). Note `rss.xml.js` uses an unrelated `experimental_AstroContainer` API — ignore it.

4. **Full build:**

   ```bash
   pnpm build
   ```

   Expect: completes, ~190 pages. Then leave the `src/content/labs/` churn from `labs:aggregate` dirty and uncommitted (do not stage it).

5. **Visual pass (`pnpm dev`, refresh manually — HMR is unreliable):** open a project case-study, a blog post, the wiki index, and a wiki concept page. Confirm:
   - The breadcrumb still sits TIGHT under the masthead and close above the title (not floating 64px away).
   - The wiki constellation grid and concept-page grid look identical to before (you only changed their outer wrapper).
   - The project and post pages read with comfortable, even spacing (the new 64px rhythm). If the hero→body gap feels too large on the detail pages, that's a design call — flag it rather than silently retuning; the intent is consistency with `space-y-16`.

## Notes / judgment calls left to you

- Tasks 1–2 are mechanical (wrapper swap + reindent) and low-risk. Tasks 3–4 are a deliberate spacing redesign — the target structures above encode the intended design, but eyeball the result and report anything that looks off rather than guessing at new bespoke margins.
- If `astro check` ever errors after an edit, you almost certainly mismatched an opening/closing tag during the wrapper swap — re-read the file's tag balance.
- Keep each task a separate commit so they're independently reviewable.
