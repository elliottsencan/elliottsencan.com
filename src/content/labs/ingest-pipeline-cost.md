---
title: Ingest pipeline cost
hypothesis: The AI behind this site stays under $5 a month at the rate I save things, as long as I don't keep re-summarizing what I've already summarized.
status: live
publishedDate: 2026-04-15T12:00:00-07:00
lastRunDate: 2026-05-04T12:00:00-07:00
tldr: How much does the AI behind this site cost to run? Total spend so far, broken down by what it was spent on.
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
---

When I save a link, an AI reads the page and writes a one-paragraph
summary. When a few summaries pile up on the same topic, a different AI
call compiles them into a wiki article. Both of those calls cost money —
fractions of a cent to a few cents each. This cell tracks the total.

The chart shows daily spend since I started recording it. Three kinds of
work account for nearly all of it:

- **Summarizing a saved link.** The most common call, fires every time
  I save a URL.
- **Re-summarizing an existing entry.** Only runs when I change the
  prompt or want to compare model versions across the same article.
- **Compiling a wiki article.** Less frequent; only fires when enough
  sources accumulate on the same topic to be worth synthesizing.

Every call snapshots its own cost into the resulting markdown,
including the price table at the moment the call was made. Historical
numbers stay reproducible even when prices change underneath.

Reading the chart: the headline is total spend so far, not a monthly
run-rate. The hypothesis is about steady-state monthly cost. So what's
worth watching is whether the daily line settles into a low, quiet
background once the early bulk re-summarize spike fades — that's the
shape of "under $5/month at current saving rates" if the bet pays off.
The dashed line on the cumulative chart is that target.

The two other labs ([Citation faithfulness](/labs/citation-faithfulness)
and [Topic stability](/labs/topic-stability)) also append to this
rollup, so their per-run cost shows up here too.
