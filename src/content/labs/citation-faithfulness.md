---
title: Citation faithfulness
hypothesis: The wiki synthesis pipeline produces citations that the cited reading entry actually supports, and Haiku as judge agrees with Sonnet as judge often enough to use Haiku for routine eval passes.
status: live
publishedDate: 2026-05-07T12:00:00-07:00
lastRunDate: 2026-05-07T12:00:00-07:00
tldr: Per-claim verdict (supported / partial / unsupported) for every cited reading entry in every wiki article, judged by both Claude Haiku and Sonnet. Headline metric is judge agreement rate; secondary metric is accuracy by judge.
headlineMetric:
  label: Judge agreement
  value: TBD
tags:
  - eval
  - anthropic
  - wiki
kind: chart
dataPath: data/citation-faithfulness.json
post: The eval surface lives at POST /eval on the site-ingest worker. Each run extracts the sentence around every /reading/ link in every wiki article, sends the claim and the cited reading entry's text to a judge model, and records the verdict in src/content/labs/data/citation-faithfulness.json. Skip key is (wiki slug, content hash, judge model, rubric version) so reruns are idempotent and only re-judge claims whose article body changed.
---

The eval measures whether the wiki article's prose actually says what its
cited reading entry says. For each sentence that links to a reading slug,
the judge gets that one sentence as the claim and the full text of that
one source, then returns a verdict:

- **supported**: the source explicitly entails the claim. Paraphrase
  counts. Inference beyond what the source states does not.
- **partial**: the source touches the topic but does not fully entail the
  claim, or supports a strictly weaker version of it.
- **unsupported**: the claim is not present in the source, the source
  contradicts it, or the source is unrelated.

The eval runs both Claude Haiku and Claude Sonnet as judges over the same
claims so the cost-quality tradeoff between the two is visible directly.
Haiku is roughly a third the price of Sonnet on this task. If the judges
agree most of the time, routine eval passes can run on Haiku and the
disagreements bubble up for spot-checking.

When the judges disagree on a claim, the workflow is to read the source
and the claim by hand and decide which judge is right. Three outcomes from
that review: the wiki citation is fine and the dissenting judge is wrong;
the wiki article overreaches and the citation should be retagged or
removed; or the claim genuinely sits in the partial zone and both judges
are reading it differently. The first two are actionable. The third is a
known-disagreement on the eval and lives with the rubric until the rubric
gets sharper.

Rubric version is recorded with every verdict. Bumping the rubric
invalidates the existing sidecar wholesale on the next eval pass — old
scores never silently mix with new ones.
