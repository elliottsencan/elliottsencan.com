---
title: Topic-slug stability under priors
hypothesis: When the model summarizing a saved link sees the active corpus's topic slugs, it produces more stable slugs (re-summarizing an existing entry recovers most of its original topics) than when it summarizes the same URL with no slug context. The "self-correcting drift" claim the wiki pipeline rests on lives or dies here.
status: live
publishedDate: 2026-05-15T12:00:00-07:00
lastRunDate: 2026-05-15T13:23:00-07:00
tldr: Each sampled reading entry is re-summarized twice. Once with the model seeing the active corpus slug list (priors on), once without (priors off). The eval measures slug-set drift between cells and slug recovery against the entry's original topics.
headlineMetric:
  label: Slug recovery with priors
  value: 42.2%
tags:
  - eval
  - anthropic
  - reading
kind: comparison
dataPath: data/topic-stability.json
post: |
  Reading the panel: recovery is the share of the entry's original topic slugs the model gets back (higher is better). Distinct-slug count is corpus-wide vocabulary breadth (lower is better, since the wiki layer needs slug stability to compile). Jaccard is per-URL set overlap between cells, so it has no counterfactual side. The per-sample strip splits the recovery metric per URL, sorted so priors-on wins come first and regressions come last.

  The driver lives at `scripts/topic-stability-ab.mjs`. It samples N entries across `src/content/reading/`, POSTs each URL to `/link` twice (`topic_priors` true then false) with `dry_run: true` so no commits land, and writes the sidecar JSON above. The default sample is stride-spread over the whole corpus so coverage isn't biased toward recent ingest. Per-run cost is bounded (one `/link` call costs cents on Sonnet 4.6) and lands in [`/labs/ingest-pipeline-cost`](/labs/ingest-pipeline-cost).
---

The wiki layer compiles per-concept articles from reading entries that
share a topic slug. If those slugs drift every time the model sees a
URL (`ai-coding` one week, `agentic-coding` the next, `claude-code` the
week after) the wiki's clusters fragment and the synthesis layer never
gets enough citations to compile.

The pipeline's working assumption is that showing the model the slugs
already in use is enough to keep things stable. This eval tests that
assumption directly.

For each sampled entry the script makes two POSTs to `/link`:

- **priors on**: the model gets the same canonical-vocabulary block
  production uses, listing every slug currently active in the corpus.
- **priors off**: the model gets only the article title and excerpt.
  No slug list. The model coins freely.

Both cells use `dry_run: true`, so no reading entries are committed and
no `/synthesize` spawn fires. The Anthropic call still happens, so the
cost is real (the sidecar's `total_cost_usd` is the actual spend).

Two questions get measured per run:

1. **Drift between cells.** How different are priors-on slugs from
   priors-off slugs on the same URL? Reported as per-URL Jaccard and
   corpus-wide distinct-slug counts. A high Jaccard means priors don't
   change much; a low Jaccard means they're load-bearing.
2. **Recovery against original.** Each sampled entry was summarized by
   production at ingest time and carries those slugs in its frontmatter.
   The eval treats those as ground truth and measures how many the model
   recovers in each cell. If priors-on recovery is materially higher than
   priors-off, the assumption holds. If they're the same, the canonical-
   vocabulary block is theater.

This eval is upstream of [`/labs/citation-faithfulness`](/labs/citation-faithfulness):
faithful citations don't matter much if the wiki article is clustering
on a fragmented slug to begin with. The cost of running both lands in
[`/labs/ingest-pipeline-cost`](/labs/ingest-pipeline-cost).
