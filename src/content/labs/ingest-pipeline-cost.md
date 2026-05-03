---
title: Ingest pipeline cost
hypothesis: The site-ingest worker can run at under $0.50/month at current saving rates without re-summarizing on every recompile.
status: live
publishedDate: 2026-04-15T12:00:00-07:00
lastRunDate: 2026-04-30T12:00:00-07:00
tldr: Weekly Anthropic spend on the /link + /synthesize pipelines for the live elliottsencan.com site. Cost held under $0.20/week through April; the spike in week 11 is the wiki backfill recompiling 9 articles in one run.
headlineMetric:
  label: 12-week median weekly spend
  value: $0.14
tags:
  - cost
  - infra
  - anthropic
kind: chart
dataPath: data/ingest-pipeline-cost.json
pre: |
  // Run weekly from the worker logs.
  const usage = await readWorkerCostLog({ since: "2026-02-01" });
  const weekly = bucketByISOWeek(usage)
    .map((w) => round(sum(w.costs_usd), 2));
post: Most weeks are dominated by /link's per-source summary (cache writes are large but cache hits dominate after a few weeks). The /synthesize spikes track recompile passes, which are rare. Charging the recompile to the wiki rather than the source citation keeps the per-saved-link cost visible.
---

The pipeline runs two priced calls per saved link: a fetch + summarize that
writes the reading entry, and a topic-co-citation pass that decides whether
a /wiki article needs to compile. The latter only fires when at least two
sources share a topic and no article exists yet, so the steady-state cost
is dominated by the per-link summary.

Recompile runs (the spike at week 11) re-summarize a batch of older entries
when the prompt or schema changes. Those land as a single high-cost week,
which is fine — the cost is bounded by the backlog size.
