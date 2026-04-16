# site-ingest

The Cloudflare Worker that keeps [elliottsencan.com](https://elliottsencan.com) fresh. One inbound endpoint for the iOS Shortcut, one weekly cron that drafts the `/now` page, one synchronous path that commits reading entries.

## What it does

- **Cron (Mon 17:00 UTC — Mon 10:00 Pacific standard / 09:00 Pacific daylight).** Fetches active Linear projects, pulls queued phone inputs from KV, reads recent `/reading` entries from the repo, composes an Anthropic prompt in your voice, drafts an updated `/now` page, opens a GitHub PR.
- **`POST /input`.** Appends a phone input (reading / listening / thinking / building / activity) to KV. Consumed by the next cron fire.
- **`POST /link`.** Synchronous reading-catalog pipeline: fetches the shared URL, asks Anthropic for a one-sentence summary + category, commits a markdown entry directly to `main`.
- **`POST /trigger`.** Manually fires the /now pipeline. Idempotent — same logic as the cron. Used to seed the first run and to re-draft without waiting a week.

All POST endpoints require `Authorization: Bearer <API_TOKEN>` and are rate-limited per-IP.

## Architecture

```text
iOS Shortcut ──▶ Cloudflare KV
                      │
Cron (weekly) ─▶ Worker ┼─▶ Linear API  (active projects)
                        ├─▶ KV         (phone inputs)
                        ├─▶ Anthropic  (draft + summarize)
                        ├─▶ GitHub     (branch + PR, or direct commit)
                        └─▶ You        (review + merge)
                                       │
                                       ▼
                              Cloudflare Pages (deploy)
```

## First-time setup

### 1. Install + configure

```sh
cd workers/site-ingest
pnpm install
cp .dev.vars.example .dev.vars   # fill in local secrets
```

### 2. Create the KV namespace

```sh
pnpm wrangler kv namespace create NOW_INPUTS
```

Paste the returned namespace ID into `wrangler.toml` under `[[kv_namespaces]]`.

### 3. Set secrets (production)

```sh
pnpm wrangler secret put LINEAR_API_KEY      # read-only personal API key
pnpm wrangler secret put ANTHROPIC_API_KEY   # with a monthly spend cap set in the Anthropic console
pnpm wrangler secret put GITHUB_TOKEN        # fine-grained PAT, only elliottsencan.com repo, contents + pull_requests write
pnpm wrangler secret put API_TOKEN           # random 32-char string — the Bearer token
```

### 4. Deploy

```sh
pnpm wrangler deploy
```

Note the `https://site-ingest.<subdomain>.workers.dev` hostname — you'll need it for the Shortcut setup.

### 5. Seed + first run

```sh
TOKEN=<your API_TOKEN>
BASE=https://site-ingest.<subdomain>.workers.dev

# seed an input so the first draft has something beyond Linear
curl -X POST -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"type":"thinking","content":"Jevons paradox as a lens for AI-enabled tooling"}' \
  "$BASE/input"

# fire the /now pipeline
curl -X POST -H "Authorization: Bearer $TOKEN" "$BASE/trigger"
```

Expect a PR to appear on the blog repo within ~10s. Review, tweak, merge.

## Ad-hoc triggers

Any time you want a fresh draft without waiting for Monday:

```sh
curl -X POST -H "Authorization: Bearer $TOKEN" "$BASE/trigger"
```

The call is idempotent — same-day re-runs detect the existing branch/PR and no-op.

## iOS Shortcut setup

One shortcut, two entry points: home-screen menu (for manual inputs) and the Share Sheet (for link capture). A separate library shortcut holds secrets so rotation edits one file.

### Library shortcut: `Site Ingest Config`

Not added to the home screen. Holds base URL + Bearer token for the main shortcut to import.

1. Shortcuts app → **+** → rename to `Site Ingest Config`.
2. Add action **Dictionary**:
   - `base_url` → `https://site-ingest.<your-subdomain>.workers.dev`
   - `token` → `Bearer <your-32-char-token>`
3. Add action **Stop and Output** → pass the Dictionary.
4. Disable "Show in Share Sheet".

### Main shortcut: `Site Ingest`

Pseudo-flow:

```text
[Run Shortcut: Site Ingest Config]   → Config
[Get Dictionary Value: base_url]     → Base URL
[Get Dictionary Value: token]        → Token

[If Shortcut Input has any value]
    ── SHARE-SHEET BRANCH ──
    [Get URLs from Input]            → URL
    [Get Name]                       → Title
    [Get Text from Input]            → Excerpt
    Build dict: { url: URL, title: Title, excerpt: Excerpt }
    POST Base URL + "/link"  (timeout: 30s)
    On 200: Notification "Saved to /reading · <category>"
    On fail: Notification "Failed: <status>"

[Otherwise]
    ── MENU BRANCH ──
    [Choose from Menu]
        "Reading"    → Type = reading,   Prompt = "What are you reading?"
        "Listening"  → Type = listening, Prompt = "What are you listening to?"
        "Thinking"   → Type = thinking,  Prompt = "What's on your mind?"
        "Building"   → Type = building,  Prompt = "What did you ship or work on?"
        "Activity"   → Type = activity,  Prompt = "What are you up to this week?"
        "Save Link"  → (manual link sub-branch)

    [If Type is one of reading/listening/thinking/building/activity]
        [Ask for Input: Prompt]      → Content
        Build dict: { type: Type, content: Content }
        POST Base URL + "/input"
        On 200: Notification "Added to /now"

    [Otherwise — Save Link chosen]
        [Ask for Input (URL): "Paste link"]  → URL
        Build dict: { url: URL }
        POST Base URL + "/link"
        On 200: Notification "Saved to /reading · <category>"
[End If]
```

Setup steps:

1. **+** → rename to `Site Ingest`.
2. Settings (gear icon) → **Show in Share Sheet** ON. Accept types: `URLs`, `Safari web pages`, `Articles`, `Text`.
3. Build the actions as shown above. Key actions:
   - **Run Shortcut** (to import `Site Ingest Config`).
   - **Get Dictionary Value**.
   - **If** with "has any value" predicate on Shortcut Input.
   - **Get URLs from Input**, **Get Name**, **Get Text from Input** for the share-sheet branch.
   - **Choose from Menu** with 6 options for the home-screen branch.
   - **Ask for Input** (for menu-branch content and the manual link URL).
   - **Get Contents of URL** — POST, JSON body, `Authorization` + `Content-Type` headers, 30s timeout.
   - **Show Notification** branches on response status.
4. Add to Home Screen with a subtle icon (a small dot or glyph matches the editorial tone).

macOS Shortcuts runs the same file — no share sheet from Safari on Mac, but the menu branch works identically.

### Token rotation

If `API_TOKEN` ever leaks:

1. `pnpm wrangler secret put API_TOKEN` with a new value.
2. Open `Site Ingest Config` on your phone → edit the `token` field.
3. Done. `Site Ingest` picks up the new value on next run. No home-screen change.

## Local development

```sh
pnpm dev
```

Runs `wrangler dev --local` on http://127.0.0.1:8787. Test endpoints:

```sh
TOKEN=dev-token-replace-me

curl -X POST -H "Authorization: Bearer $TOKEN" http://127.0.0.1:8787/trigger

curl -X POST -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"type":"reading","content":"Designing Data-Intensive Applications"}' \
  http://127.0.0.1:8787/input

curl -X POST -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"url":"https://stripe.press/"}' \
  http://127.0.0.1:8787/link
```

Point `GITHUB_REPO` in `wrangler.toml` at a test fork while iterating so the real blog doesn't accumulate experimental PRs.

## Observability

```sh
pnpm tail
```

Streams `console.log` / `console.warn` / `console.error` from the deployed worker. Every log uses `[area:op]` prefixes so filtering is easy:

- `[now:*]` — the weekly draft pipeline.
- `[link:*]` — the reading-catalog pipeline.
- `[inputs:*]` — KV input handler.
- `[linear:*]`, `[anthropic:*]`, `[github:*]`, `[kv:*]` — external calls.

No structured alerting in v1. If the cron starts failing regularly, add a Slack webhook dispatch in the top-level `scheduled` catch.

## Security posture

- Every POST endpoint requires a matching Bearer token (constant-time compare, 32 chars of entropy).
- Per-endpoint rate limits: 5/min for `/trigger`, 30/min for `/link`, 60/min for `/input` — all per-IP.
- Bodies capped at 10 KB before JSON parse.
- Frontmatter written to the repo is YAML-escaped to prevent injection of unintended keys via malicious titles.
- System prompts explicitly disregard instructions found in user content.
- Anthropic key has a monthly spend cap set in the dashboard. Linear key is read-only. GitHub PAT is fine-grained, single-repo, contents + pull_requests only.

## Configuration reference

All non-secret configuration lives in `wrangler.toml` under `[vars]`. Every field listed is required at runtime (types enforce this in `src/types.ts`); leave `ANTHROPIC_MODEL` empty to use the default.

| Var | Purpose |
| --- | --- |
| `GITHUB_REPO` | `owner/name` of the site repo the worker writes to. |
| `GITHUB_BRANCH_PREFIX` | Prefix for branches the weekly draft opens (`<prefix>/YYYY-MM-DD`). |
| `NOW_CONTENT_PATH` | Path in the repo to the canonical `/now` source (`src/content/now/current.md`). |
| `NOW_ARCHIVE_DIR` | Directory for archive snapshots of previous `/now` content. |
| `READING_DIR` | Directory for `/reading` entries committed by the /link pipeline. |
| `VOICE_REFERENCE_PATH` | Path to the voice-reference excerpts file fed to the /now prompt. |
| `NOW_NOTES_PATH` | Path to the freeform notes file fed to the /now prompt. |
| `READING_CONTEXT_LIMIT` | Max recent reading entries included in the /now prompt. |
| `ANTHROPIC_MODEL` | Optional override for the Anthropic model ID. Empty = default. |

Worker content inputs (`VOICE_REFERENCE_PATH` and `NOW_NOTES_PATH`) live at `workers/site-ingest/content-inputs/` so their purpose is obvious next to the worker and they don't clutter the repo root. The worker re-fetches both on every run, so edits take effect on the next draft without a redeploy.
