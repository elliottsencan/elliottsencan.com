# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Two coordinated subsystems in one repo:

1. **Astro static site** (root) — content-driven personal site at https://elliottsencan.com. SSG, no client framework, deployed to Cloudflare Pages.
2. **Cloudflare Worker** at `workers/site-ingest/` — out-of-band content pipeline that drafts the `/now` page weekly (Linear + KV + Anthropic → GitHub PR) and commits `/reading` entries synchronously from an iOS Shortcut. Independent toolchain (own `package.json`, own `pnpm-lock.yaml`).

The site renders without the Worker; the Worker only writes content into `src/content/{now,now-archive,reading}/`.

## Common commands (site, run from repo root)

```sh
pnpm dev         # astro dev — http://localhost:4321
pnpm build       # astro check && astro build (TS-strict typecheck + SSG)
pnpm preview     # serve dist/
pnpm check       # biome lint + format --write (this is what CI runs)
pnpm favicons    # regenerate favicons via scripts/build-favicons.mjs (sharp)
```

Node is pinned to **22** (`.nvmrc`, CI matrix, and Cloudflare Pages dashboard — keep all three in sync if bumping). Package manager is pnpm 10.

### Worker commands (run from `workers/site-ingest/`)

```sh
pnpm dev         # wrangler dev --local on :8787
pnpm test        # vitest run
pnpm typecheck   # tsc --noEmit
pnpm deploy      # wrangler deploy
pnpm tail        # stream production logs
```

Worker is excluded from the site `tsconfig.json` (`"exclude": ["dist", "public/pagefind", "workers"]`) — it has its own.

## Architecture notes (the non-obvious parts)

### Path alias

`@*` → `./src/*` (see `tsconfig.json`). E.g. `import { cn } from "@lib/utils"`.

### Content collections (`src/content.config.ts`)

Five collections: `blog`, `projects`, `now` (single `current.md`), `nowArchive`, `reading`. Schemas for `blog` and `projects` are inline in `content.config.ts`; the dynamic three (`now`, `nowArchive`, `reading`) live in `src/lib/schemas/content.ts` because the Worker imports the same Zod schemas to validate before committing.

`draft: true` excludes from production. Blog posts also carry `aiAssistance` (`none|light|heavy|full`) + optional `aiNote`; the human workflow is documented at `docs/content-workflow.md` and rendered at `/about/process`.

### Build-time data fetching

Two helpers run during SSG (in component frontmatter), bake their results into the static output, and **must never fail the build**:

- `src/lib/github.ts` — GitHub GraphQL + REST (contributions, profile, pinned, recent activity). Reads `GITHUB_TOKEN` from `import.meta.env` or `process.env`. Every exported function returns `null` on any error. In-process caches dedupe calls within a single build. Consumers must skip rendering when `null` is returned (degrade-per-block contract).
- `src/lib/git.ts` — runs `git log --follow` synchronously to power `RevisionHistory.astro`. Returns `[]` on any error.

If you add another build-time fetch, follow the same contract: degrade silently, log via `console.warn` with an `[area:op]` prefix, never throw upward.

### Routing

Routes live under `src/pages/`. Notable:

- `/writing/[...id]` — blog posts (slug from frontmatter)
- `/projects/[...id]` + `/projects/index` — projects collection
- `/tags/[...id]` + `/tags/index` — derived from `tags` frontmatter on blog posts
- `/about` + `/about/{process,uses,colophon}` — sub-pages of the about section
- `/now` + `/now/archive` + `/now/how-this-works` — written/updated by the Worker
- `/og/{writing,projects}/...` — OG image endpoints via `astro-og-canvas`
- `/rss.xml` — RSS feed

`astro.config.mjs` defines redirects for the legacy top-level `/process`, `/uses`, `/colophon` paths to their new `/about/*` homes — Astro emits meta-refresh HTML at the old paths. Add new redirects there, not via Cloudflare rules.

### Expressive Code

Configured in `ec.config.mjs` at the **repo root**, not inside `astro.config.mjs`. The reason is in the file's own comment: the `<Code />` component loads EC options separately at render time, and `astro.config.mjs` must be JSON-serializable so functions like `themeCssSelector` can't live there. Don't try to inline this config.

Theme switching keys on the `.dark` class that `Head.astro` sets on `<html>`. `useDarkModeMediaQuery: false` is intentional — the toggle handles `prefers-color-scheme`, EC must not double-handle.

### Search

Pagefind builds into `public/pagefind/` as part of `astro build` (via `astro-pagefind`). It's checked-out-of-tree (gitignored) and lint-excluded — don't add it back.

### Worker (`workers/site-ingest/`)

POST endpoints + one cron, all guarded by `Authorization: Bearer <API_TOKEN>`:

- **Cron (Mon 17:00 UTC):** drafts `/now` from Linear active projects + KV phone inputs + recent `/reading` entries → Anthropic → branch `now-update/YYYY-MM-DD` → PR.
- **`POST /input`:** queues a phone input into KV (consumed by next cron).
- **`POST /link`:** synchronous — fetches URL, summarizes, commits a `/reading` entry directly to `main`.
- **`POST /trigger`:** manually fires the /now pipeline; idempotent (no-ops if today's branch/PR exists).
- **`POST /consume`:** called by the `now-consume.yml` GitHub Action *after* a `now-update/*` PR merges, to delete the KV inputs that were snapshotted at PR-open time. Don't call this manually unless cleaning up a failed merge.

Worker config lives in `wrangler.toml` (`[vars]`) plus secrets via `wrangler secret put`. Content inputs (voice reference, freeform notes) live at `workers/site-ingest/content-inputs/` and are re-fetched every run — edits take effect on the next draft, no redeploy needed.

### CI (`.github/workflows/`)

- `ci.yml` — site `pnpm check` + `pnpm build`, lychee `--offline` link check against `dist/**/*.html`, then worker `pnpm install && typecheck && test`. Both subsystems must pass.
- `scheduled-rebuild.yml` — daily 12:00 UTC cron pings `CF_PAGES_DEPLOY_HOOK` so the build-time GitHub data refreshes without a code push.
- `now-consume.yml` — fires on merges to `main` that touch `src/content/now/**` or `src/content/now-archive/**`; calls the Worker's `/consume` endpoint to clear the KV snapshot for the merged branch.

## Project conventions

### Bare semantic tags are reserved for site chrome

`src/styles/global.css` styles `<header>`, `<footer>`, `<main>`, `<article>` as the global page layout. **Do not use these bare tags for in-page sections** — they will inherit chrome styling. Use `<div>` (or `<section>` with explicit classes) for in-content groupings.

### Prefer transparent first-party code over plugin wrappers

For SEO / meta / structured data, prefer hand-written `<meta>` and JSON-LD `<script type="application/ld+json">` blocks over thin community plugins (`astro-seo` and similar). First-party Astro integrations (`@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`, `astro-pagefind`, `astro-expressive-code`, `astro-og-canvas`) are fine — the wrapper-vs-rolled-your-own bar applies to community plugins that just stringify HTML you could write directly.

### Biome quirks

Biome 2 false-positives `noUnusedImports` and `noUnusedVariables` on `.astro` files (the Astro frontmatter / template split confuses it). `biome.json` already has an override that turns these two rules off for `**/*.astro` — do not "clean up" imports the linter flags as unused in `.astro` files without verifying they're actually unused in the template.

### TypeScript

Pinned to `^5.9.3`. **Do not bump to TS 6** until `@astrojs/language-server`'s peer range includes it — the editor JSX typing breaks otherwise.

### Astro 6 dev-server quirk

`/@vite/client` 500s in `pnpm dev` (HMR is broken with pnpm + Astro 6). Pages still serve, production builds are unaffected. Known issue, not worth re-investigating — just refresh manually after edits.

### Visual / editorial defaults

The site is intentionally flat — **no entrance animations** (the `.animate` fade-in classes are being removed) and **no background textures** (no grain/noise/paper overlays). Lean on color temperature, type weight, and spacing instead. Section labels are direct (`WRITING`, `WORK`, `CONTACT`), not stylized (`DISPATCHES`, `FIELD NOTES`).

### Build-time env

Optional: `GITHUB_TOKEN` (classic PAT with `public_repo` + `read:user`, or fine-grained equivalent). Without it, the contributions rail and `/github` data degrade to null and the relevant blocks omit themselves — build still succeeds. Set in `.env` for local dev (gitignored), and in the Cloudflare Pages build-environment variables for production.

## Verification when you change things

- After site edits: `pnpm check && pnpm build`. Build runs `astro check` first (TS-strict), so type errors fail loudly.
- After worker edits: from `workers/site-ingest/`, run `pnpm typecheck && pnpm test`. CI runs both.
- After content edits: `pnpm build` validates frontmatter against the Zod schemas and will fail on any invalid entry.
- For UI changes, `pnpm dev` and click through; remember HMR is unreliable so refresh manually.

## Deploy

Pushes to `main` trigger Cloudflare Pages production deploys; PRs get preview deploys. Cloudflare Pages must have `GITHUB_TOKEN` set for the contributions rail to render in production.
