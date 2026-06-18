# Header Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shrink the masthead logo, fix the doubled active-nav underline, replace the ragged two-row mobile nav with a native `<details>` hamburger menu, and stop wiki-index summaries from overflowing on mobile.

**Architecture:** Four mostly-independent edits to existing Astro components. The only coupled pair is the header markup/CSS (Task 3) and its progressive-enhancement JS (Task 4); Task 3 ships a working native-`<details>` menu on its own, Task 4 only adds close-on-select/Esc/outside-tap. Page navigations are full reloads (no `ClientRouter`), so menu JS binds in the existing `init()` on `DOMContentLoaded` exactly like the theme button.

**Tech Stack:** Astro 6 (SSG), Tailwind utility classes + scoped `<style>`, native `<details>`/`<summary>` disclosure, vanilla inline JS.

---

## Spec

`docs/superpowers/specs/2026-06-04-header-refresh-design.md`

## Conventions (read before starting)

- Work from `/Users/2ts/git/personal-dev/elliottsencan.com` on branch `type-wiki-refresh`. **Do NOT switch branches.**
- Path alias: `@components/*` → `src/components/*`.
- **No `.astro` unit-test harness.** Verification per task = `pnpm exec astro check` (TS-strict + template compile) → must be **0 errors**. There is nothing to unit-test; do not write component tests.
- **Do NOT run full `pnpm check`** — it errors on stale `biome.json` under `.claude/worktrees/`. Run biome targeted: `pnpm exec biome check --write <file>`. (Biome does not reformat `.astro` template HTML, only frontmatter.)
- **Pre-existing uncommitted churn under `src/content/labs/`** (`citation-faithfulness.md`, `data/citation-faithfulness.json`, `ingest-pipeline-cost.md`) is NOT yours. NEVER stage it. NEVER `git add -A`/`git add .` — always `git add <explicit paths>`. After each commit run `git status --short` and confirm no `src/content/labs/` path was staged.
- A formatter hook may reformat files after Write/Edit — that's expected; re-Read before a follow-up edit if needed.
- Commit after each task (4 commits). End commit messages with:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

## File structure

| File                                      | Responsibility                                                        | Task |
| ----------------------------------------- | --------------------------------------------------------------------- | ---- |
| `src/components/SignatureLogo.astro`      | wordmark SVG + size clamp                                             | 1    |
| `src/components/wiki/WikiDirectory.astro` | wiki concept directory + mobile summary truncation                    | 2    |
| `src/components/Header.astro`             | masthead markup + responsive nav CSS (desktop bar, mobile disclosure) | 3    |
| `src/components/Head.astro`               | global `init()` — binds menu close handlers                           | 4    |

---

## Task 1: Shrink the signature logo

**Files:**

- Modify: `src/components/SignatureLogo.astro` (the `.signature-logo` height in the `<style>` block)

- [ ] **Step 1: Reduce the height clamp**

In `src/components/SignatureLogo.astro`, find the `.signature-logo` rule and change only its `height`:

Replace:

```css
  .signature-logo {
    display: block;
    height: clamp(2rem, 1.5rem + 1.5vw, 2.75rem);
    width: auto;
```

with:

```css
  .signature-logo {
    display: block;
    height: clamp(1.6rem, 1.4rem + 0.8vw, 2.1rem);
    width: auto;
```

Leave the `/* tightened viewBox ... */` comment and everything else in the rule unchanged.

- [ ] **Step 2: Typecheck**

Run: `pnpm exec astro check`
Expected: `0 errors` (warnings/hints unrelated to this file are fine).

- [ ] **Step 3: Biome + commit**

```bash
pnpm exec biome check --write src/components/SignatureLogo.astro
git add src/components/SignatureLogo.astro
git commit -m "$(printf 'chrome: shrink masthead signature logo\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>')"
git status --short
```

Confirm no `src/content/labs/` path is staged.

---

## Task 2: Stop wiki-index summaries overflowing on mobile

**Files:**

- Modify: `src/components/wiki/WikiDirectory.astro` (the `.wd-row` rule)

**Why:** `.wd-mob` already has `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`, but its grid/flex ancestor `.wd-row` keeps the default `min-width: auto`, so the nowrap text expands the column instead of truncating. Adding `min-width: 0` lets the track shrink and the ellipsis take effect.

- [ ] **Step 1: Add `min-width: 0` to `.wd-row`**

In `src/components/wiki/WikiDirectory.astro`, find:

```css
.wd-row {
  display: flex;
  flex-direction: column;
  padding: 0.5625rem 0;
  border-top: 1px solid rgb(0 0 0 / 0.07);
  color: inherit;
  text-decoration: none;
}
```

Replace with (add the one line):

```css
.wd-row {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0.5625rem 0;
  border-top: 1px solid rgb(0 0 0 / 0.07);
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 2: Typecheck**

Run: `pnpm exec astro check`
Expected: `0 errors`.

- [ ] **Step 3: Biome + commit**

```bash
pnpm exec biome check --write src/components/wiki/WikiDirectory.astro
git add src/components/wiki/WikiDirectory.astro
git commit -m "$(printf 'wiki: truncate concept summaries on mobile instead of overflowing\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>')"
git status --short
```

---

## Task 3: Fix active underline + mobile hamburger menu

**Files:**

- Modify: `src/components/Header.astro` (frontmatter, template, and scoped `<style>` — effectively a rewrite of the component)

This is the large task. The component is rewritten so that:

- The 5 section links come from a single `sections` array (single-source-of-truth; no hand-repeated `<Link>` lines).
- Desktop (`sm:`+) renders the links inline in the center column — same look as today.
- Mobile renders a native `<details>` disclosure in the utility cluster: a ☰ `<summary>` toggle and an absolutely-positioned dropdown panel of the links that overlays the page.
- The grid is a single row at every breakpoint (`logo · links · utility`); the old two-row mobile grid + row-divider are removed.
- The active link shows ONE accent-colored underline (the old floating `::after` bar is deleted).

- [ ] **Step 1: Replace the entire file contents**

Overwrite `src/components/Header.astro` with exactly:

```astro
---
import Container from "@components/Container.astro";
import Link from "@components/Link.astro";
import SignatureLogo from "./SignatureLogo.astro";

const path = Astro.url.pathname;
// True when the current URL is this section or a child of it.
const isActive = (href: string) => path === href || path.startsWith(`${href}/`);

// Single source of truth for the section index. Rendered twice — once as the
// inline desktop bar, once inside the mobile disclosure panel — so the link
// list never drifts between the two responsive shapes.
const sections = [
  { href: "/now", label: "now" },
  { href: "/reading", label: "reading" },
  { href: "/wiki", label: "wiki" },
  { href: "/labs", label: "labs" },
  { href: "/about", label: "about" },
];
---

<header transition:persist>
  <Container>
    {/* Single-row masthead at every breakpoint: logo · links · utility.
        Below sm the inline links are hidden and the section index collapses
        into the <details> disclosure (☰) in the utility cluster, which drops
        an overlay panel. At sm: and up the disclosure is hidden and the links
        render inline. */}
    <div class="header-grid items-center gap-x-3">
      <Link href="/" underline={false} class="header-logo shrink-0">
        <SignatureLogo />
      </Link>

      <nav class="header-links hidden text-sm sm:flex sm:items-center sm:justify-end sm:gap-x-5" aria-label="Primary">
        {
          sections.map((s) => (
            <Link href={s.href} aria-current={isActive(s.href) ? "page" : undefined}>
              {s.label}
            </Link>
          ))
        }
      </nav>

      <div class="header-utility flex items-center gap-x-3.5">
        <a
          href="/search"
          aria-label="Search"
          class="inline-flex items-center text-black/75 transition-colors duration-300 ease-in-out hover:text-black focus-visible:text-black dark:text-white/75 dark:hover:text-white dark:focus-visible:text-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <line x1="15.5" y1="15.5" x2="21" y2="21" />
          </svg>
        </a>
        <button
          id="theme-cycle"
          aria-label="Switch theme"
          title="Theme: Auto"
          class="inline-flex cursor-pointer items-center text-black/75 transition-colors duration-300 ease-in-out hover:text-black focus-visible:text-black dark:text-white/75 dark:hover:text-white dark:focus-visible:text-white"
        >
          <!-- Auto (system): circle outline with right half filled. The user-
               selected mode — shown regardless of what the OS resolves to. -->
          <svg
            data-icon="system"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            class="size-5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3 a9 9 0 0 1 0 18 z" fill="currentColor" stroke="none" />
          </svg>
          <!-- Light: sun. -->
          <svg
            data-icon="light"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="hidden size-5"
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2.5" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="21.5" />
            <line x1="2.5" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="21.5" y2="12" />
            <line x1="5.3" y1="5.3" x2="6.7" y2="6.7" />
            <line x1="17.3" y1="17.3" x2="18.7" y2="18.7" />
            <line x1="5.3" y1="18.7" x2="6.7" y2="17.3" />
            <line x1="17.3" y1="6.7" x2="18.7" y2="5.3" />
          </svg>
          <!-- Dark: crescent moon. -->
          <svg
            data-icon="dark"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="hidden size-5"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        </button>

        {/* Mobile section menu — native disclosure so it works without JS and
            is keyboard-accessible by default. init() (Head.astro) adds
            close-on-select / Escape / outside-tap. Hidden at sm: and up. */}
        <details id="nav-menu" class="nav-disclosure sm:hidden">
          <summary class="nav-toggle" aria-label="Menu">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="size-5"
            >
              <line x1="3.5" y1="7" x2="20.5" y2="7" />
              <line x1="3.5" y1="12" x2="20.5" y2="12" />
              <line x1="3.5" y1="17" x2="20.5" y2="17" />
            </svg>
          </summary>
          <nav class="nav-panel" aria-label="Primary">
            {
              sections.map((s) => (
                <Link
                  href={s.href}
                  underline={false}
                  aria-current={isActive(s.href) ? "page" : undefined}
                >
                  {s.label}
                </Link>
              ))
            }
          </nav>
        </details>
      </div>
    </div>
  </Container>
</header>

<style>
  /* Single-row masthead at every breakpoint. Below sm the center `links`
     track is empty (inline nav hidden) and the 1fr column simply pushes the
     utility cluster — which carries the ☰ disclosure — to the right edge. */
  .header-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "logo links utility";
  }
  .header-logo {
    grid-area: logo;
  }
  .header-links {
    grid-area: links;
  }
  .header-utility {
    grid-area: utility;
  }

  /* Active item: a single accent underline aligned with the inactive links —
     recolours the link's own underline (from Link.astro) and thickens it,
     rather than floating a separate bar beneath. */
  :global(.header-links a[aria-current="page"]) {
    color: var(--accent);
    text-decoration-color: var(--accent);
    text-decoration-thickness: 2px;
  }
  :global(.nav-panel a[aria-current="page"]) {
    color: var(--accent);
  }

  /* ── Mobile disclosure menu ─────────────────────────────────────────── */
  /* The <details> stays in normal flow (its summary is the click target);
     the panel is taken out of flow and anchored to the fixed <header>. */
  .nav-disclosure {
    position: static;
    display: inline-flex;
  }
  .nav-toggle {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    list-style: none;
    color: rgb(0 0 0 / 0.75);
    transition: color 300ms ease-in-out;
  }
  .nav-toggle::-webkit-details-marker {
    display: none;
  }
  .nav-toggle:hover,
  .nav-disclosure[open] .nav-toggle {
    color: rgb(0 0 0);
  }
  :global(.dark) .nav-toggle {
    color: rgb(255 255 255 / 0.75);
  }
  :global(.dark) .nav-toggle:hover,
  :global(.dark) .nav-disclosure[open] .nav-toggle {
    color: rgb(255 255 255);
  }

  /* Overlay panel anchored under the header's bottom hairline. Absolute, so
     it floats over page content (the fixed header keeps a stable height).
     `top: 100%` resolves against the fixed <header>, the nearest positioned
     ancestor. Same translucent surface + blur as the header. */
  .nav-panel {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 1.5rem 0.875rem;
    background: rgb(246 244 239 / 0.96);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgb(0 0 0 / 0.08);
  }
  :global(.dark) .nav-panel {
    background: rgb(24 22 26 / 0.96);
    border-bottom-color: rgb(255 255 255 / 0.08);
  }
  .nav-panel :global(a) {
    padding: 0.5rem 0;
    font-size: 0.9375rem;
  }

  /* Subtle expand on open. Keyframe animation (not a transition) so it runs
     as the panel goes from display:none to shown. Close is instant. */
  @keyframes nav-expand {
    from {
      opacity: 0;
      transform: translateY(-0.25rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .nav-disclosure[open] .nav-panel {
    animation: nav-expand 150ms ease-out;
  }
  @media (prefers-reduced-motion: reduce) {
    .nav-disclosure[open] .nav-panel {
      animation: none;
    }
  }

  @media (min-width: 640px) {
    /* Belt-and-braces: the disclosure is also `sm:hidden` via utility class,
       but guarantee the overlay never shows on desktop. */
    .nav-disclosure {
      display: none;
    }
  }
</style>
```

- [ ] **Step 2: Typecheck**

Run: `pnpm exec astro check`
Expected: `0 errors`. (If it errors, you almost certainly left an unbalanced tag — re-check the `<details>`/`<nav>`/`<div>` nesting.)

- [ ] **Step 3: Biome + commit**

```bash
pnpm exec biome check --write src/components/Header.astro
git add src/components/Header.astro
git commit -m "$(printf 'chrome: collapse mobile nav into a hamburger; fix active underline\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>')"
git status --short
```

- [ ] **Step 4: Quick native check (no-JS baseline)**

Run `pnpm dev`, open <http://localhost:4321> in a narrow (<640px) window, and confirm tapping ☰ opens the panel and tapping ☰ again closes it. (Close-on-select/Esc/outside arrives in Task 4.) Refresh manually — HMR is unreliable.

---

## Task 4: Progressive-enhancement menu close handlers

**Files:**

- Modify: `src/components/Head.astro` (the `init()` function in the `<script is:inline>` block, near line 231)

**Why:** Native `<details>` opens/closes on the summary, but a good menu also closes when you pick a link, press Escape, or tap outside. These bind in the existing `init()` (runs on `DOMContentLoaded`; full page reloads re-run it each navigation), alongside the theme button. All lookups guard with `?.`/null-checks so a missing element is a silent no-op — matching the file's degrade-quietly pattern.

- [ ] **Step 1: Add an `initNavMenu()` helper and call it from `init()`**

In `src/components/Head.astro`, find the end of `init()`:

```js
    document.addEventListener("scroll", onScroll);
  }
```

Replace with:

```js
    document.addEventListener("scroll", onScroll);

    initNavMenu();
  }

  // Mobile section menu (a native <details> in the header). Native handles
  // open/close on the ☰ summary; here we add the conventional dismissals:
  // close when a link is chosen, on Escape, and on a tap outside the menu.
  function initNavMenu() {
    const navMenu = document.getElementById("nav-menu");
    if (!navMenu) return;

    for (const link of navMenu.querySelectorAll(".nav-panel a")) {
      link.addEventListener("click", () => navMenu.removeAttribute("open"));
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") navMenu.removeAttribute("open");
    });

    document.addEventListener("pointerdown", (event) => {
      if (navMenu.hasAttribute("open") && !navMenu.contains(event.target)) {
        navMenu.removeAttribute("open");
      }
    });
  }
```

- [ ] **Step 2: Typecheck**

Run: `pnpm exec astro check`
Expected: `0 errors`.

- [ ] **Step 3: Biome + commit**

```bash
pnpm exec biome check --write src/components/Head.astro
git add src/components/Head.astro
git commit -m "$(printf 'chrome: close mobile nav on select, Escape, and outside tap\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>')"
git status --short
```

---

## Final verification (after all 4 tasks)

- [ ] **Step 1: Full build**

```bash
pnpm build
```

Expected: completes, ~190 pages. Leave the `src/content/labs/` churn dirty/unstaged (do not commit it).

- [ ] **Step 2: Confirm clean working tree**

```bash
git status --short
```

Expected: only the three `src/content/labs/` paths, unstaged. Nothing of yours left uncommitted.

- [ ] **Step 3: Visual pass (`pnpm dev`, refresh manually — HMR unreliable)**

Desktop (≥640px), e.g. the wiki index and a blog post:

- Logo noticeably smaller and balanced against the nav text.
- All five nav underlines sit on the same baseline; the active item is a single accent-coloured, slightly thicker underline — no second floating bar.
- Search + theme controls unchanged; ☰ not visible.

Mobile (<640px):

- Row 1: logo · search · theme · ☰. No ragged edge-to-edge link row.
- Tapping ☰ drops a clean overlay panel of the 5 links with a subtle ~150ms expand; the active link reads accent.
- Panel closes on link select, Escape, and outside tap.
- With `prefers-reduced-motion: reduce`, the panel appears instantly (no expand).

Wiki index (<640px):

- Each concept summary truncates with an ellipsis inside the panel; nothing overflows the right edge.

## Self-review notes (spec coverage)

- Spec §1 logo → Task 1. §2 active underline → Task 3 (Step 1 style block). §3 mobile hamburger → Task 3 (markup + CSS) + Task 4 (JS dismissals). §4 wiki overflow → Task 2.
- The spec said the active link keeps its existing underline recoloured; Task 3 does exactly that and deletes the `::after` (it is simply absent from the rewritten file). The old two-row mobile grid + row hairline are likewise dropped, replaced by the single-row grid — consistent with "desktop unchanged, mobile collapses to a menu."
- The spec's "no markup duplication" concern is honoured by the `sections` array (one list, mapped into both the desktop bar and the mobile panel).
