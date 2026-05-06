# Site-ingest pipeline validation runbook

End-to-end validation of the Cloudflare Worker at `workers/site-ingest/` and its public-surface integrations on the Astro site. Run after worker code changes, after schema additions in `src/lib/schemas/content.ts`, or periodically to catch drift between deployed config and `wrangler.toml`.

Phases are ordered cheap → expensive. Stop at any phase. Each phase calls out what's verified, what it costs, and what to inspect.

## Phase 0 — preconditions

- `pnpm` 10, Node 22 (matches `.nvmrc`).
- Working tree on `main` and clean.
- Worker deployed at the version under test (`pnpm deploy` from `workers/site-ingest/`).
- For Phases 2+: `SITE_INGEST_API_TOKEN` exported or in repo-root `.env`. Optional `SITE_INGEST_BASE_URL` if you've moved the worker off its default `*.workers.dev` URL.

Confirm before proceeding:

```sh
pnpm worker --help                  # CLI prints subcommand list, no errors
pnpm worker lint                    # auth works, returns pretty-printed counts
```

**Piping convention.** `pnpm` writes a `> pkg@ver script ...` header to stdout on every script run, which trips downstream parsers like `jq`. When piping, place `--silent` **before** the subcommand:

```sh
pnpm --silent worker lint --json | jq '.'
```

Pretty-printed (non-piped) usage uses plain `pnpm worker ...`.

If `lint` returns 401, the token is wrong. If it returns no `under_clustered_topics` field, the worker is older than PR #57 — redeploy.

---

## Phase 1 — local build sanity (no API, ~10s)

Verifies the site builds against current content, schema additions are wired, and `noindex` filters at every public surface.

```sh
pnpm build
```

Expected: 128+ pages built, no Astro check errors. Schema additions (`noindex`, `opted_out`, `last_source_added`) accept missing values on existing entries.

Then run the count-math check:

```sh
ON_DISK=$(find src/content/reading -name "*.md" -type f | wc -l | xargs)
NOINDEX=$(grep -rl "^noindex: true" src/content/reading/ 2>/dev/null | wc -l | xargs)
EMITTED=$(jq '.count' dist/reading.json)
echo "on-disk=$ON_DISK  noindex=$NOINDEX  emitted=$EMITTED  expected=$(($ON_DISK - $NOINDEX))"
```

`emitted` must equal `on-disk minus noindex`. Any mismatch means the filter at `src/lib/reading-graph.ts` is broken.

Filter wiring (one-time visual check after schema changes):

```sh
grep -l "noindex" src/lib/reading-graph.ts src/pages/llms.txt.ts src/pages/llms-full.txt.ts
grep -A3 "entry.data.noindex" src/pages/reading/\[...slug\].astro
```

All four files should match. `[...slug].astro` should show the `Publisher opt-out` banner block.

---

## Phase 2 — read-only / dry-run smoke (free, requires token)

Hits every admin endpoint at zero Anthropic cost. Verifies routing, auth, and the response shapes downstream tools depend on.

```sh
pnpm worker lint                    # under_clustered_topics, orphan citations, sub-threshold concepts
pnpm worker synthesize              # default dry-run; check active_topics, deferred, prioritization
pnpm worker recompile --scope=all   # default dry-run; check prioritization and deferred
pnpm worker crosslink               # default dry-run; check proposal shapes
```

Look for:

- **`lint`**: `total_issues` reasonable for corpus size. `under_clustered_topics[]` lists topics with one reading entry and no wiki article. If empty, every topic is either covered or orphaned to no concept yet.
- **`synthesize`** (dry-run): `active_topics` is a sorted list of every topic at threshold. `compiled` shows what would land. If `deferred[]` is non-empty, the per-run cap (`MAX_CONCEPTS_PER_RUN`) bit; the curl hint in the response shows how to catch up.
- **`recompile`** (dry-run, scope=all): `compiled` count, `deferred[]` again with curl hint. Prioritization is by `compiled_at` ascending — oldest entries first.
- **`crosslink`** (dry-run): proposed insertions per source piece. Should be silent on already-linked anchors.

If any returns 5xx, check `wrangler tail` from `workers/site-ingest/` for a stack trace.

---

## Phase 3 — live /link round-trips (~$0.005 per case, ~$0.03 total)

Exercises every `/link` branch end-to-end against the deployed worker. Each case writes (or refuses to write) a real reading entry on `main`.

| # | Case | URL pick strategy | Expected response | Side effects |
|---|------|-------------------|-------------------|--------------|
| 1 | Control: no wiki match, no opt-out | Pick a fresh URL from a publisher you've never archived | `ok: true`, no `triggered_synthesis`, `mutation.changed` empty | Reading entry committed to main, no wiki touch |
| 2 | Topic matches existing wiki article | `pnpm worker lint --json \| jq '.wiki_articles_with_sources[]'` to see live wiki topics, then pick a URL that fits one | `ok: true`, no `triggered_synthesis` | Same commit touches reading entry **AND** the wiki article's `sources[]` (sorted, deduped) and `last_source_added` |
| 3 | Topic at threshold-1, no wiki article | `pnpm worker lint --json \| jq '.under_clustered_topics[]'` lists one-source orphans; pick a URL related to one | `ok: true`, `triggered_synthesis: ["<topic>"]` | Reading entry committed; follow-up synthesis PR opens within ~60s |
| 4 | `noai` opt-out (publisher-side) | Major news outlet (NYT, Bloomberg, FT) — most have `X-Robots-Tag: noai` | `ok: true`, `opted_out: "x-robots-tag"` | Stub reading entry with `noindex: true`, `opted_out`, no Anthropic call (`compile_cost: null` or zero) |
| 5 | `robots.txt` Disallow | `curl -s https://<host>/robots.txt \| head -20` to find one with `Disallow: /` | `ok: false, error: "site_opted_out: robots.txt"` (HTTP 451) | No entry written |
| 6 | `EXCLUDED_HOSTS` block | Add `EXCLUDED_HOSTS = "example.com"` to `wrangler.toml`, redeploy, hit `https://example.com/foo` | `ok: false, error: "host_excluded: example.com"` (HTTP 403) | No entry written; remove the test host after |

Run each via:

```sh
pnpm worker link "https://<test-url>"
```

Watch `wrangler tail` in another terminal for `link:wiki-patch`, `link:threshold-trigger`, or `link:opt-out` log lines.

After case 3 fires the threshold trigger, look for the auto-PR within ~1 minute:

```sh
gh pr list --search "Wiki synthesis"
```

If the PR doesn't open, check `wrangler tail` for `op=link:threshold-trigger` errors — that's the silent-failure surface added in PR #60.

### Cleanup after Phase 3

- Cases 1, 2, 3 wrote real entries. They're legitimate; leave them.
- Case 4 wrote a stub entry with `noindex: true`. It's invisible to public surfaces; leave it or delete the file if you'd rather not keep the breadcrumb.
- Cases 5, 6 wrote nothing. Revert any `EXCLUDED_HOSTS` test value.

---

## Phase 4 — live /synthesize (cost-bounded by `MAX_CONCEPTS_PER_RUN`, ~$0.04 per concept)

Runs a real synthesis pass. Skip unless you're verifying the output-budget scaling (PR #58) end-to-end or you have a real backlog to compile.

```sh
pnpm worker synthesize                    # ALWAYS dry-run first
pnpm worker synthesize --no-dry-run       # then live
```

Inspect the resulting PR:

- **Body length scaling**: open a high-source-count wiki article (15+ sources) and compare its body length to its previous compile. PR #58 means the new compile should be materially longer when sources >= 15.
- **`### Deferred` section**: empty unless backlog exceeds `MAX_CONCEPTS_PER_RUN`. If present, the curl hint shows the catch-up command.
- **`compile_cost`** field on each compiled article: present, non-zero, includes input/output token counts and USD.
- **Aliases detected**: `### Aliases detected` section, if any. Each accepted alias is a slug now mapped to its canonical in the wiki frontmatter; aliases get applied to future reading entries via the canonicalization pass in `topics.ts`.

Merge the PR if the articles look right. Don't merge if any body is malformed or any citation links to a non-existent reading slug — `auto-repaired` reports those, but verify visually.

---

## Phase 5 — /recompile against new model (optional, cost-bounded)

Refreshes older reading entries with a current model. Run after a model bump or a `summarizeLink` prompt change.

```sh
pnpm worker recompile --scope=compiled_before_model:claude-sonnet-4-5
pnpm worker recompile --scope=compiled_before_model:claude-sonnet-4-5 --no-dry-run
```

Cost: `MAX_ENTRIES_PER_RUN × $0.001-0.005 = $0.10-0.50 per saturated run`. Re-invoke until the dry-run reports no `deferred[]` entries.

Inspect the PR for: pre/post topic drift on a few entries, sensible `category` reclassification (rare), and that `compiled_with` reflects the new model.

---

## Failure modes

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Phase 1 count mismatch | `noindex` filter regression in `reading-graph.ts` | Re-add the `data.noindex !== true` filter; rerun build |
| Phase 2 endpoint returns 401 | Token wrong or missing | Re-export `SITE_INGEST_API_TOKEN`; check `.env` |
| Phase 2 endpoint returns 503 | Worker exception | `wrangler tail` for stack trace; redeploy if recent code regression |
| Phase 3 case 2 doesn't patch wiki | `applyVocabulary` not canonicalizing topics correctly, or `patchExistingWikiSources` returning early | Confirm topic matches wiki filename slug; check `link:wiki-patch` logs in tail |
| Phase 3 case 3 doesn't trigger | Threshold count off, or wiki article exists where you didn't expect | Re-run `pnpm worker lint --json` to confirm topic is actually a singleton |
| Phase 3 case 4 doesn't stub | Site returns 200 with no opt-out headers (publisher changed posture) | Pick a different publisher; verify with `curl -I <url>` |
| Phase 4 deferred too large | Backlog exceeds `MAX_CONCEPTS_PER_RUN` | Bump `MAX_CONCEPTS_PER_RUN` in `wrangler.toml` `[vars]`, redeploy, re-run |
| Phase 5 same entries cycle | Scope filter not narrowing further as entries refresh | Use `--scope=slugs:<list>` to target a specific batch |

---

## Notes on cost

Anthropic spend is tracked in each entry's `compile_cost` frontmatter (`/link`, `/recompile`) and per-PR aggregate (`/synthesize`, `/crosslink`). The `/labs/ingest-pipeline-cost` page on the site reads these directly and renders a running total — it's the canonical spend ledger; check it after Phase 4.
