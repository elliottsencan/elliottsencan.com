---
title: Citation faithfulness
hypothesis: Wiki synthesis cites reading entries faithfully (the source supports the claim), and Haiku agrees with Sonnet often enough to use Haiku for routine passes.
status: live
publishedDate: 2026-05-07T12:00:00-07:00
lastRunDate: 2026-05-07T12:00:00-07:00
tldr: Every sentence in every wiki article that cites a reading entry gets a verdict (supported, partial, or unsupported) from both Haiku and Sonnet. Headline is judge agreement; secondary is per-judge accuracy.
headlineMetric:
  label: Judge agreement
  value: TBD
tags:
  - eval
  - anthropic
  - wiki
kind: chart
dataPath: data/citation-faithfulness.json
post: The eval runs as POST /eval on the site-ingest worker. For each `/reading/` link in each wiki article, the judge gets one sentence (the claim) and the full body of the cited source, then returns a verdict. Skip key is (wiki slug, content hash, judge model, rubric version), so reruns only re-judge claims whose article body changed. Spend from each run lands in [`/labs/ingest-pipeline-cost`](/labs/ingest-pipeline-cost).
---

The eval asks: does the wiki article's prose actually say what its cited
reading entry says? For each sentence that links to a reading slug, the
judge gets that sentence as the claim and the full text of that one
source. It returns one of three verdicts:

- **supported**: the source entails the claim. Paraphrase counts.
  Inference beyond what the source states does not.
- **partial**: the source touches the topic but does not fully entail
  the claim, or supports a weaker version of it.
- **unsupported**: the claim is not in the source, the source contradicts
  it, or the source is off-topic.

The eval runs Haiku and Sonnet over the same claims so the cost-quality
tradeoff is visible directly. Haiku is roughly a third the price of Sonnet
on this task. If the two agree most of the time, routine passes can run
on Haiku alone and the disagreements bubble up for review.

When the judges disagree, the workflow is to read the source and the
claim by hand. Three outcomes: the citation is fine and the dissenting
judge is wrong; the article overreaches and the citation should be
retagged or removed; or the claim genuinely sits in the partial zone and
both judges are reading it differently. The first two are actionable.
The third stays open until the rubric gets sharper.

This eval assumes the wiki article cites the right reading entries in
the first place. The upstream check on that is
[`/labs/topic-stability`](/labs/topic-stability), which measures whether
the slugs the wiki clusters on are stable enough to trust.

Rubric version is recorded with every verdict. Bumping the rubric
invalidates the existing sidecar wholesale on the next eval pass, so old
scores never silently mix with new ones.
