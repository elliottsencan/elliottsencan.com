---
title: Citation faithfulness
hypothesis: When the wiki cites a source, the source backs the claim. And cheap Haiku agrees with pricier Sonnet often enough that routine checks don't need Sonnet at all.
status: live
publishedDate: 2026-05-07T12:00:00-07:00
lastRunDate: 2026-05-07T12:00:00-07:00
tldr: Does the wiki say what its sources say? Two AI judges grade every citation; the headline is how often they agree.
headlineMetric:
  label: Judge agreement
  value: TBD
tags:
  - eval
  - anthropic
  - wiki
kind: chart
dataPath: data/citation-faithfulness.json
methodology:
  steps:
    - Pair every claim in <code>/wiki</code> (each sentence that links to a saved article) with the full text of the source it cites.
    - Haiku and Sonnet each grade it <code>supported · partial · unsupported</code> and say why in a line.
    - The headline is how often the two judges agree. Per-judge accuracy is the secondary stat.
    - Disagreements go to hand-review, and what they expose is what tightens the rubric.
  receipts:
    - { label: claims/run, value: "~20" }
    - { label: cost est, value: "~$0.08" }
    - { label: judge prompt, value: "v1.0" }
  code: |
    // workers/site-ingest/src/eval.ts (sketch)
    const claims  = collectWikiCitations(corpus)
    const haiku   = await judge(claims, "claude-haiku-4-5")
    const sonnet  = await judge(claims, "claude-sonnet-4-6")
    const agree   = countEq(haiku, sonnet) / claims.length
---

An AI builds the wiki. It reads each saved article, clusters the articles
by topic, and writes one synthesis paragraph per cluster, citing the
sources it drew from. The question that matters here is whether those
citations hold: when the paragraph cites an article, does the article
actually say what the paragraph claims?

So for every sentence in the wiki that links to a saved article, two AI
judges read the sentence and the source and return one of three verdicts:

- **supported** — the article backs the claim. Paraphrase counts;
  inference past what the source says doesn't.
- **partial** — the article is on the topic but backs only a weaker
  version, or doesn't quite get there.
- **unsupported** — the article doesn't back the claim, contradicts it,
  or is about something else.

The two judges aren't the same size. Haiku is small and cheap. Sonnet is
bigger and runs about three times the cost. Grading the same claims with
both turns the cost-quality tradeoff into a number: if they mostly agree,
later passes can run Haiku alone and kick only the disagreements up to a
human, and to Sonnet.

When they disagree, I read the source myself. Sometimes the citation is
fine and a judge got it wrong. Sometimes the wiki overreached and the
citation needs retagging or removal. And sometimes the claim sits in a
gray zone the rubric hasn't pinned down yet — those cases are worth the
most, because they're where the rubric grows.

All of this assumes the wiki cited the right article to begin with. That
assumption gets its own check in [Topic stability](/labs/topic-stability),
which asks whether the topic tags the clustering relies on hold still over
time. What each run costs lands in
[Ingest pipeline cost](/labs/ingest-pipeline-cost).

The judge prompt is versioned. Bump the version and every prior score is
thrown out on the next pass, so verdicts written against two different
rubrics never get averaged together.
