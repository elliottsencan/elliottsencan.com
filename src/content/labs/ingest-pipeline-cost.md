---
title: Ingest pipeline cost
hypothesis: The site-ingest worker can run under $0.50/month at current saving rates, as long as it doesn't re-summarize on every recompile.
status: live
publishedDate: 2026-04-15T12:00:00-07:00
lastRunDate: 2026-05-04T12:00:00-07:00
tldr: Anthropic spend on /link, /recompile, and /synthesize, read directly from `compile_cost` in the corpus. Updated on every build.
headlineMetric:
  label: Spent so far
  value: $1.86
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
post: The `compile_cost` field landed in PR #27 on 2026-05-01. The first /recompile-all run backfilled it across the reading and wiki corpus on 2026-05-03, which is the spike, not steady-state spend. Eval runs from [`/labs/citation-faithfulness`](/labs/citation-faithfulness) and the A/B from [`/labs/topic-stability`](/labs/topic-stability) also append to the series.
---

The pipeline runs three priced calls. Each one writes its cost into the
resulting markdown's frontmatter:

- `/link` fetches and summarizes a saved URL, then writes the reading
  entry.
- `/recompile` re-summarizes an existing entry (when the prompt changes
  or to compare model versions).
- `/synthesize` compiles per-concept wiki articles from clusters of
  reading entries that share a topic.

Each call's `CostRecord` is snapshotted into the entry's `compile_cost`,
including the pricing table at the moment of the call. Historical numbers
stay reproducible across price-table updates. The aggregator buckets
those records by Pacific date for the daily series; the sidecar JSON
also carries weekly and per-model breakdowns for cells that want a
different cut.

Reading the chart: the headline is total spend so far, not a monthly
run-rate. The hypothesis is about steady-state monthly cost. That's the
line to watch as routine `/link` calls accumulate week over week and the
bulk-recompile spike fades into the background. The two other labs
([citation-faithfulness](/labs/citation-faithfulness) and
[topic-stability](/labs/topic-stability)) both add to this rollup, so
their per-run cost is visible here too.
