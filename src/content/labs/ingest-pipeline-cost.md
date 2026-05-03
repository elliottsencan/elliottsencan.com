---
title: Ingest pipeline cost
hypothesis: The site-ingest worker can run at under $0.50/month at current saving rates without re-summarizing on every recompile.
status: draft
publishedDate: 2026-04-15T12:00:00-07:00
lastRunDate: 2026-05-02T12:00:00-07:00
tldr: Weekly Anthropic spend on /link, /recompile, and /synthesize, derived directly from `compile_cost` in the corpus. Awaiting the first `/recompile all` run to populate.
headlineMetric:
  label: Status
  value: Awaiting first recompile
tags:
  - cost
  - infra
  - anthropic
kind: chart
dataPath: data/ingest-pipeline-cost.json
pre: |
  // src/content/labs/data/ingest-pipeline-cost.json is regenerated on
  // every build by scripts/labs-aggregate.mjs:
  const cost = sum(corpus.flatMap(e => e.compile_cost?.cost_usd ?? []))
  const weekly = bucketByISOWeek(corpus, e => e.compile_cost?.cost_usd)
post: Until `compile_cost` lands across the corpus (PR #27 added the field; `/recompile all` is the first run that populates it for the existing 37 reading entries), the chart is empty. New `/link` calls and any future `/recompile` and `/synthesize` runs append data automatically.
---

The pipeline runs three priced calls that now carry their cost directly in
the resulting markdown's frontmatter:

- `/link` — fetch + summarize a saved URL, write the reading entry.
- `/recompile` — re-summarize an existing entry (e.g. when the prompt
  changes or to compare model versions).
- `/synthesize` — compile per-concept wiki articles from clusters of
  reading entries that share a topic.

Each call's `CostRecord` is snapshotted into the entry's `compile_cost`
field, including the pricing table at the moment of the call so historical
numbers stay reproducible across price-table updates. The cell above
aggregates those records by ISO week of `compiled_at`.

Why an empty chart right now: the `compile_cost` field landed in PR #27
on 2026-05-01. None of the 37 existing reading entries or 11 wiki
articles carry it yet — they were compiled before the field existed. The
first `/recompile all` run will rewrite all 37 reading entries with their
current cost, at which point the chart populates with real data and the
status promotes from `draft` to `live`.
