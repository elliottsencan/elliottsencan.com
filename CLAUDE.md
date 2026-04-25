# elliottsencan.com

Personal site plus ingest pipeline. Astro 6 static build deployed to Cloudflare Pages, with a Cloudflare Worker (`workers/site-ingest/`) handling all writes: link ingest, /now drafts, wiki synthesis, recompiles, lints, contributions.

## The three layers

This site implements [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Three named layers:

1. **Reading entries** (`src/content/reading/<YYYY-MM>/<slug>.md`) — per-source citation index. One file per URL, frontmatter only (no body). Schema: `ReadingFrontmatterSchema` in `src/lib/schemas/content.ts`. Compiled by `POST /link`. Public at `/reading/`, `/reading/<slug>/`, `/reading.json`.

2. **Wiki articles** (`src/content/wiki/<topic-slug>.md`) — per-concept synthesis. One file per topic that has >= 2 contributing reading entries. Schema: `WikiFrontmatterSchema`. Compiled by `POST /synthesize`. Public at `/wiki/`, `/wiki/<slug>/`, `/wiki.json`, `/wiki.txt`.

3. **CLAUDE.md** (this file) — the schema doc. Tells future agent sessions how to maintain the wiki without re-deriving the conventions from source.

Compounding: `POST /recompile` rebuilds reading entries against newer models via Internet Archive snapshots. `POST /synthesize` re-runs wiki synthesis when source clusters change. `POST /contribute` lets a human or agent file a wiki article from cross-source analysis without going through the synthesis prompt.

## Operations

| Endpoint    | Purpose                                                        | Mutates?           |
| ----------- | -------------------------------------------------------------- | ------------------ |
| `/link`     | Ingest a URL into a reading entry. Synchronous.                | yes (commits main) |
| `/synthesize` | Compile wiki articles from topic clusters.                   | yes (opens PR)     |
| `/recompile`  | Rebuild reading entries via Wayback Machine snapshots.       | yes (opens PR)     |
| `/lint`     | Health check on reading + wiki collections. JSON report.       | no                 |
| `/contribute` | File a manually-authored wiki article.                       | yes (opens PR)     |
| `/trigger`  | Ad-hoc /now draft run (also fires weekly via cron).            | yes (opens PR)     |
| `/input`    | Queue phone-shortcut input for next /now draft.                | yes (KV)           |
| `/consume`  | Clear KV inputs after a /now PR merges.                        | yes (KV)           |

All endpoints are POST and require `Authorization: Bearer ${API_TOKEN}`. Route map: `workers/site-ingest/src/index.ts`.

## Conventions

### Element traps in global.css
Bare `<header>`, `<footer>`, `<main>`, `<article>` are reserved for site chrome (selectors in `src/styles/global.css` from line 148). For in-page sections use `<div>` with appropriate spacing classes. The fixed-position styling on `<header>` will overlay your content otherwise.

### No entrance animations, no background textures
Don't add `.animate` fade-in classes to new components. Don't apply grain/noise/paper overlays to the canvas. Editorial calm by default.

### Direct labels
Section labels are direct: `WRITING`, `WORK`, `CONTACT`, `READING`, `WIKI`. Not `DISPATCHES`, `FIELD NOTES`, etc.

### Voice (writing + Anthropic prompts)
Systems-forward, no em-dashes, no "not X but Y", no flourish verbs (leverage, foster, unlock, streamline), no corporate adjectives (seamless, robust, holistic), no hedging qualifiers, no tricolons. Plain prose, short paragraphs, lead with the noun.

### Topic stability at ingest
At `/link` time the worker fetches existing topics from `/reading.json` and instructs the model to prefer them over near-duplicates. Topic sprawl (`llm-inference` vs `inference-optimization`) fragments the wiki and is hard to undo.

### Minimum sources for a wiki concept
2, defined as `MIN_WIKI_SOURCES` in `src/lib/schemas/content.ts` and enforced by both the schema and the synthesize pipeline. Single source of truth for both sides of that gate.

### Comments
Default to none. Write a comment only when the WHY is non-obvious — hidden constraint, subtle invariant, workaround for a specific bug. Don't restate WHAT. Don't reference current task, fix, ticket, or named callers (rots).

### Library hygiene
Prefer transparent first-party libs over thin community wrappers. `gray-matter`, `html-to-text`, `html-entities`, `date-fns`, `node:util.parseArgs` are in. Avoid `astro-seo`-style wrappers; inline meta tags or JSON-LD.

### Astro 6 caveats
- HMR is broken under pnpm (`/@vite/client` 500s). Dev pages still serve, prod is fine. Don't re-investigate.
- TypeScript is pinned to 5.x. Don't bump to 6 until `@astrojs/language-server` peer range catches up.

## Where things live

- `src/content/{reading,wiki,blog,now,now-archive}/` — content collections
- `src/pages/` — Astro pages and JSON/text endpoints (one file per route)
- `src/lib/schemas/content.ts` — shared Zod schemas (used by both Astro and the worker via `@shared/*` path mapping)
- `src/lib/utils.ts` — small shared helpers (monthKey, etc.)
- `src/components/`, `src/layouts/` — reusable Astro components and page layouts
- `src/styles/global.css` — the element-trap source of truth
- `workers/site-ingest/src/` — Cloudflare Worker (one file per endpoint)
- `workers/site-ingest/src/prompts.ts` — all Anthropic system prompts; changes here are voice/policy changes, not behaviour
- `scripts/` — local CLIs (e.g. `reading.mjs`)
- `.claude/skills/{reading,wiki}/SKILL.md` — agent-facing skill descriptions

## Tooling

- `pnpm dev` / `pnpm build` / `pnpm test` — Astro site
- `pnpm reading <command>` — query the reading log locally (search, recent, related, etc.)
- `cd workers/site-ingest && pnpm dev` — run the worker locally with wrangler
- `cd workers/site-ingest && pnpm test` — vitest on the worker
- `cd workers/site-ingest && pnpm deploy` — publish to Cloudflare

## Where to read code first

- **New to the wiki layer:** `src/lib/schemas/content.ts` → `workers/site-ingest/src/synthesize.ts` → `src/pages/wiki/[...slug].astro`.
- **New to the ingest pipeline:** `workers/site-ingest/src/index.ts` (route map) → `link.ts` (the canonical synchronous endpoint).
- **New to the prompts:** `workers/site-ingest/src/prompts.ts` is the single file; every caller imports from it.
- **New to the reverse index:** `src/pages/reading.json.ts` is where `wiki_concepts[]` and `related[]` get computed at build time.
