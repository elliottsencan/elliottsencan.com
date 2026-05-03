---
title: Eval — Haiku 4.5 vs Sonnet 4.6 on link summary
hypothesis: Haiku 4.5 is good enough at /link's summary task to drop summary cost ~6× without hurting downstream wiki synthesis.
status: running
publishedDate: 2026-04-22T12:00:00-07:00
lastRunDate: 2026-04-29T12:00:00-07:00
tldr: A blind A/B over 30 saved articles. Sonnet wins on stylistic nuance; Haiku wins on cost and stays accurate enough that synthesize compiles the same wiki articles either way.
headlineMetric:
  label: Cost reduction at parity
  value: 6.4×
tags:
  - eval
  - anthropic
  - cost
kind: table
dataPath: data/eval-haiku-vs-sonnet.json
pre: |
  // 30 saved articles, blind paired comparison on summary quality.
  const results = await runEval({
    models: ["claude-haiku-4-5", "claude-sonnet-4-6"],
    rubric: ["faithful", "specific", "no-hallucination"],
  });
post: The gap is real on stylistic nuance — Sonnet's summaries read better in isolation — but it disappears when the summary is just the input to /synthesize. The wiki articles compiled from Haiku-summarized sources are indistinguishable from the Sonnet-sourced versions. Worth the 6.4× cost reduction.
---

The eval runs are small (30 articles) and blind: I don't see which model
produced which summary while marking. The rubric is three binary checks
per summary, scored independently.

The interesting finding is the disconnect between summary-quality and
wiki-quality: Sonnet wins on the per-summary rubric but the downstream
synthesis articles are visibly identical. Most of /synthesize's lift comes
from cross-source pattern detection, which is robust to surface phrasing.
