---
name: wiki
description: Query and contribute to Elliott's wiki — per-concept synthesis articles compiled from clusters of reading entries on elliottsencan.com. Use when the user asks about Elliott's analysis of a topic across multiple sources, wants to file a manually-authored synthesis back to the wiki, or wants to lint the wiki for orphan citations and other drift. Distinct from the `reading` skill, which queries per-source citations.
---

# Wiki concept queries and contributions

The wiki at `https://elliottsencan.com/wiki/` holds per-concept synthesis articles compiled from clusters of reading entries (each topic with two or more contributing sources). Sister surface to the reading log (`/reading/`), which holds per-source citations.

## Surfaces

- `https://elliottsencan.com/wiki/` — human-facing index
- `https://elliottsencan.com/wiki/<slug>/` — per-concept article page (with inline source citations)
- `https://elliottsencan.com/wiki.txt` — markdown index for agents (one line per concept)
- `https://elliottsencan.com/wiki.json` — structured dump with full bodies
- `https://elliottsencan.com/llms-full.txt` — full corpus (wiki + reading + writing) concatenated
- `https://elliottsencan.com/reading.json` — each entry has `wiki_concepts[]` (reverse index of concepts citing it)

## Query

Read `wiki.txt` first to find concepts; fetch `wiki/<slug>/` (HTML) or `wiki.json` (JSON with bodies) for the article itself. Cross-reference reading entries via `wiki_concepts[]` in `/reading.json` to find every concept that cites a given source.

## Contribute (file an answer back)

When you've done good cross-source analysis that should compound back into the wiki, file it via `POST /contribute`:

```bash
curl -X POST https://<worker-host>/contribute \
  -H "Authorization: Bearer $WORKER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "kebab-case-slug",
    "title": "Optional human title",
    "summary": "One sentence, 240 chars max",
    "body": "Markdown body. Cite sources inline as [label](/reading/<slug>).",
    "sources": ["2026-04/some-slug-1", "2026-04/some-slug-2"],
    "related_concepts": ["other-active-topic"],
    "dry_run": false
  }'
```

- `dry_run` defaults to `true`. Flip to `false` to actually open a PR.
- `force: true` overwrites an existing wiki article at that topic; default is to refuse with 409.
- `sources` minimum is 2 (matches the synthesize threshold).
- Topic must be lowercase kebab-case (`/^[a-z0-9]+(-[a-z0-9]+)*$/`).
- Body should cite each source inline at least once, using the per-entry slug from `/reading.json`.

The endpoint commits to a branch and opens a PR. Merge gates on a human (or you) reviewing the article.

## Lint

`POST /lint` returns a JSON report with four checks:

- **orphan_citations** — wiki articles citing reading slugs that no longer exist
- **sub_threshold_concepts** — wiki articles with fewer than 2 valid sources after orphan filtering
- **hallucinated_related** — wiki articles referencing related_concepts that don't exist as wiki articles
- **untagged_readings** — reading entries with empty topics[] (cannot contribute to clustering)

Read-only, cheap (no LLM call), no PR. Run after a `/synthesize` or `/recompile` to catch drift.

## When to reach for this skill

- User asks "what does Elliott think about X?" or "what's in the wiki about Y?"
- User wants to file a cross-source analysis back to the wiki
- User wants to sanity-check the wiki for drift after a synthesis run
- User wants to know which wiki concepts cite a particular reading entry

## When not to

- Single-source citations — use the `reading` skill instead
- Editing existing wiki articles in detail — that's a manual code edit (or `force: true` on /contribute), not a typical `/contribute` call
- Generating a new article from raw sources without prior analysis — that's `/synthesize`, not `/contribute`
- Questions about Elliott's own writing — that's the blog at `/writing/`
