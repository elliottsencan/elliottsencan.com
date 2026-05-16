---
title: Topic stability
hypothesis: Showing the AI which topic tags are already in use keeps it from inventing new ones for articles it's seen before. Without that nudge, the same article could get tagged differently on different runs, and the wiki layer (which clusters articles by tag) would fragment.
status: live
publishedDate: 2026-05-15T12:00:00-07:00
lastRunDate: 2026-05-15T13:23:00-07:00
tldr: When the AI tags a saved article with topics, do those tags stay stable over time? The chart compares tagging the same article with and without a list of existing tags as an anchor.
headlineMetric:
  label: Tag recovery
  value: 42.2%
tags:
  - eval
  - anthropic
  - reading
kind: comparison
dataPath: data/topic-stability.json
---

The wiki layer of this site clusters my saved articles by topic, then
writes a synthesis paragraph for each cluster. That falls apart if the
AI tags the same article inconsistently — `ai-coding` one week,
`agentic-coding` the next, `claude-code` the week after — because the
clusters fragment and no single topic ever accumulates enough sources
to be worth synthesizing.

The pipeline's working bet is that showing the AI a list of tags
already in use is enough to keep it anchored. This eval tests the bet
directly.

For each sampled article the script asks the AI to re-tag it twice:

- **with the anchor list**: the AI sees every tag currently active
  across the whole corpus and is told to reuse where reasonable.
- **without the anchor list**: the AI sees only the article's title and
  excerpt and tags freely.

Two things get measured per run:

1. **Recovery against the original tags.** Each sampled article was
   already tagged when I originally saved it, and those original tags
   are treated as ground truth. The chart shows what fraction the AI
   gets back in each cell. If with-anchor recovery is materially higher
   than without-anchor, the bet pays off.
2. **Vocabulary breadth.** How many distinct tags the AI invents across
   the whole sample. Lower is better — fewer total tags means tighter
   clusters downstream.

If the two cells come out about the same, the anchor list is theatre
and clusters drift no matter what. The right move then would be a
different mechanism for stability — not a longer prompt, but something
deterministic outside the model.

This eval is upstream of [Citation faithfulness](/labs/citation-faithfulness):
faithful citations don't matter much if the wiki article is built on a
fragmented topic to begin with.

Reading the chart: recovery is the share of an article's original tags
the AI gets back on a re-run (higher is better — the "with anchor wins"
line). Distinct-tag count is how many different tags the AI invents
across the whole sample (lower is better, since the wiki layer needs
tag stability to compile). Jaccard is per-article overlap between the
two runs, so it has no winner side. The per-sample strip splits
recovery per article, sorted with the biggest with-anchor wins first
and regressions last.

The runs are dry — no entries get committed — but the AI calls still
cost money, and that spend lands in
[Ingest pipeline cost](/labs/ingest-pipeline-cost).
