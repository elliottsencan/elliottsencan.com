---
title: Citation faithfulness
hypothesis: When the wiki cites a source, the source actually backs the claim. And the cheap AI judge (Haiku) agrees with the more expensive one (Sonnet) often enough that I don't have to pay for Sonnet on routine checks.
status: live
publishedDate: 2026-05-07T12:00:00-07:00
lastRunDate: 2026-05-07T12:00:00-07:00
tldr: Does the wiki say what its sources actually say? Two AI judges weigh in on every citation, and the headline number is how often they agree.
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
    - For every sentence in <code>/wiki</code> that links to a saved article, pair the sentence (the claim) with the full body of the cited source.
    - Haiku and Sonnet each return one of <code>supported · partial · unsupported</code> with a short justification.
    - Headline number is the share of claims the two judges agree on. Per-judge accuracy lands as a secondary stat.
    - Disagreements get queued for hand-review; the rubric tightens on what they reveal.
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

The wiki is built by an AI that reads my saved articles, groups them by
topic, and writes a synthesis paragraph for each group with citations
back to the original articles. This eval asks the obvious follow-up:
when the AI cites an article, does the article actually say what the
synthesis claims it says?

For every sentence in the wiki that links to a saved article, two AI
judges read the sentence and the article and return one of three
verdicts:

- **supported**: the article backs the claim. Paraphrase counts.
  Inferring beyond what the article actually says does not.
- **partial**: the article touches the topic but doesn't fully back the
  claim, or backs only a weaker version of it.
- **unsupported**: the article doesn't back the claim, contradicts it,
  or is about something else entirely.

The two judges are different sizes. Haiku is small and cheap; Sonnet is
bigger and roughly three times the price. Running both on the same
claims makes the cost-quality tradeoff visible directly. If they agree
most of the time, future passes can run on Haiku alone and only the
disagreements get flagged for human review.

When the judges disagree, the workflow is to read the source by hand.
Three things tend to happen: the citation is fine and one judge is
wrong; the wiki overreaches and the citation should be retagged or
removed; or the claim genuinely sits in a gray zone that the rubric
doesn't yet cover sharply enough.

This eval assumes the wiki cited the right article in the first place.
The check on _that_ is [Topic stability](/labs/topic-stability), which
measures whether the topic tags the wiki clusters on stay stable enough
to trust. Cost per run shows up in
[Ingest pipeline cost](/labs/ingest-pipeline-cost).

The judge prompt itself is versioned. Bumping the version invalidates
every existing score on the next pass, so old and new verdicts never
quietly mix.
