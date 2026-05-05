---
title: Ingest pipeline cost
hypothesis: The site-ingest worker can run at under $0.50/month at current saving rates without re-summarizing on every recompile.
status: live
publishedDate: 2026-04-15T12:00:00-07:00
lastRunDate: 2026-05-04T12:00:00-07:00
tldr: Anthropic spend on /link, /recompile, and /synthesize, derived directly from `compile_cost` in the corpus. Updated on every build.
headlineMetric:
  label: Spent so far
  value: $1.24
tags:
  - cost
  - infra
  - anthropic
kind: chart
dataPath: data/ingest-pipeline-cost.json
pre: |
  // src/content/labs/data/ingest-pipeline-cost.json is regenerated on
  // every build by scripts/labs-aggregate.mjs. Buckets are computed in
  // Pacific time so a Pacific laptop and a UTC CI runner agree.
  const records  = corpus.flatMap(e => e.compile_cost ?? [])
  const total    = sum(records.map(r => r.cost_usd))
  const byDay    = bucketByPacificDate(records)
  const byModel  = bucketBy(records, r => r.model)
post: The compile_cost field landed in PR #27 on 2026-05-01. The first /recompile-all run filled it in across the existing reading + wiki corpus on 2026-05-03 — the spike is that recompile, not steady-state spend. Subsequent /link, /recompile, and /synthesize runs append to the series automatically.
---

The pipeline runs three priced calls that carry their cost directly in
the resulting markdown's frontmatter:

- `/link` — fetch + summarize a saved URL, write the reading entry.
- `/recompile` — re-summarize an existing entry (e.g. when the prompt
  changes or to compare model versions).
- `/synthesize` — compile per-concept wiki articles from clusters of
  reading entries that share a topic.

Each call's `CostRecord` is snapshotted into the entry's `compile_cost`
field, including the pricing table at the moment of the call so historical
numbers stay reproducible across price-table updates. The aggregator
buckets those records by Pacific date for the daily series above; the
JSON also carries weekly and per-model breakdowns for any future cells
that want a different cut.

Reading the chart: the headline number is total spent across every
recorded compile so far, not a monthly run-rate. The hypothesis is about
steady-state monthly cost — that's the line to watch as routine `/link`
calls accumulate over weeks and the bulk-recompile spike fades into the
background.
