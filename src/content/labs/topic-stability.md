---
title: Topic stability
hypothesis: Show the AI the topic tags already in use and it stops inventing new ones for articles it's seen before. Skip that nudge and the same article picks up different tags run to run, fragmenting the wiki layer that clusters by tag.
status: live
publishedDate: 2026-05-15T12:00:00-07:00
lastRunDate: 2026-05-15T13:23:00-07:00
tldr: Do the AI's topic tags stay stable when it re-tags the same article? The chart compares re-tagging with and without a list of existing tags as an anchor.
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

The wiki layer clusters my saved articles by topic, then writes one
synthesis paragraph per cluster. It only works if the tags are
consistent. Tag the same article `ai-coding` one week and
`agentic-coding` the next and the clusters splinter; no single topic
ever gathers enough sources to be worth writing up.

The pipeline bets that a list of tags already in use is enough to keep
the model anchored. This tests that.

For each sampled article the script re-tags it twice:

- **with the anchor list** — the model sees every tag active across the
  corpus and is told to reuse where it can.
- **without the anchor list** — the model sees only the title and
  excerpt, and tags from scratch.

Each run measures two things:

1. **Recovery against the original tags.** Every sampled article already
   had tags from when I saved it; those are the ground truth. The chart
   shows the fraction the model recovers in each cell. With-anchor
   recovery well above without-anchor is the result the bet needs.
2. **Vocabulary breadth.** How many distinct tags the model coins across
   the sample. Fewer is better: a smaller vocabulary means tighter
   clusters downstream.

If the two cells land in the same place, the anchor list is theatre — it
isn't doing the work, and the clusters will drift whatever the prompt
says. Then a longer prompt won't fix it. The fix has to be deterministic
and live outside the model: canonical tags enforced in code, not
requested politely.

This sits upstream of [Citation faithfulness](/labs/citation-faithfulness):
faithful citations don't count for much if the article they're in was
built on a fragmented topic.

How to read it: recovery is the share of an article's original tags the
model gets back on a re-run; higher is better, and the slope marked "with
anchor wins" is the one to watch. Distinct-tag count is how many
different tags it coins across the sample; lower is better, since the
wiki layer needs stable tags to compile. Jaccard is the per-article
overlap between the two runs, so it has no winning side. The per-sample
strip breaks recovery out article by article, biggest with-anchor wins
first, regressions last.

The runs are dry; nothing gets committed. The AI calls still cost money,
and that spend lands in [Ingest pipeline cost](/labs/ingest-pipeline-cost).
