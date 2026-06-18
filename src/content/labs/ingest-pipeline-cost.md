---
title: Ingest pipeline cost
hypothesis: Running the AI behind this site stays under $5 a month at the rate I save things, as long as I'm not re-summarizing what I've already summarized.
status: live
publishedDate: 2026-04-15T12:00:00-07:00
lastRunDate: 2026-05-04T12:00:00-07:00
tldr: What does the AI behind this site cost to run? Total spend so far, split by what it went on.
headlineMetric:
  label: Spent so far
  value: $3.73
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
  const summarize = corpus.flatMap(e => e.compile_cost ?? [])  // /link + /synthesize
  const evals     = citationSidecar.articles
    .flatMap(a => a.judges.map(j => j.summary.total_cost_usd)) // /eval judges
  const topics    = topicSidecar.per_url
    .flatMap(u => [u.cost_usd.priors_on, u.cost_usd.priors_off])
  const records   = [...summarize, ...evals, ...topics]
  const total     = sum(records.map(r => r.cost_usd))
  const byDay     = bucketByPacificDate(records)
  const bySource  = bucketBy(records, r => r.source)           // what it went on
---

Save a link and an AI reads the page and writes a one-paragraph summary.
Let a few summaries stack up on one topic and a second kind of call
compiles them into a wiki article. Each call costs something, from a
fraction of a cent to a few cents. This is the running total.

The chart is daily spend since I started logging it. Almost all of it is
three kinds of work:

- **Summarizing a saved link** — the common case, one call every time I
  save a URL.
- **Re-summarizing an entry** — only when I change the prompt or want to
  compare models on the same article.
- **Compiling a wiki article** — rare, and only once enough sources pile
  up on a topic to be worth it.

Every call writes its own cost into the markdown it produces, price table
and all, as of the moment it ran. So the historical numbers still add up
even after Anthropic changes prices underneath them.

The headline is total spend to date, not a monthly rate; the bet is about
steady-state cost. So watch the daily line after the early re-summarize
spike fades. Low and flat means "$5/month at current rates" is holding; a
baseline that keeps creeping up means it isn't. The dashed line on the
cumulative chart is the target.

The other two labs ([Citation faithfulness](/labs/citation-faithfulness)
and [Topic stability](/labs/topic-stability)) feed this same rollup, so
their spend shows up here too. Both re-run in place, so they contribute
their most recent run's cost; the summarize and compile costs above
accumulate per entry instead.
