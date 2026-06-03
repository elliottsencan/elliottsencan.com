---
title: Wiki surfacer precision
hypothesis: On a real dev prompt the surfacer fires a concept you'd actually use; on an off-topic one it stays quiet. Only then does the auto-surface hook earn the context tokens it spends, instead of just nagging.
status: live
publishedDate: 2026-06-02T12:00:00-07:00
lastRunDate: 2026-06-02T12:00:00-07:00
tldr: A hook auto-injects a wiki note on every prompt, spending context tokens you never asked it to. This measures how often it nags on off-topic prompts (the false-positive rate) and reads the firing threshold off the sweep.
headlineMetric:
  label: False-positive rate
  value: 0%
tags:
  - eval
  - wiki
kind: sweep
dataPath: data/wiki-surface-precision.json
methodology:
  steps:
    - 32 labeled dev prompts — 23 phrased as realistic things you'd type mid-task (paraphrases, not wiki titles, so the test exercises aliases + summary/body matching) and 9 deliberately off-topic (sourdough, hiking, Abbey Road) with an empty relevant set.
    - The scorer (<code>wiki-query.cjs</code>, pure lexical, $0) ranks the live <code>src/content/wiki</code> corpus for each prompt; metrics are read off a threshold sweep at <code>0.15 · 0.25 · 0.35 · 0.45</code>.
    - "Headline is the <em>false-positive (nag) rate</em>: fraction of off-topic prompts where any concept scores ≥ threshold — i.e. the hook would have fired on a prompt about nothing in the wiki."
    - Secondary stats are <code>precision@1</code> (top concept is relevant) and <code>recall@3</code> (a relevant concept in the top 3 above threshold). The recommended threshold is the sweep point that drives the nag rate to ~0 while keeping precision@1 highest — that number is what the hook fires at.
  receipts:
    - { label: prompts, value: "32 (23 on-topic / 9 off-topic)" }
    - { label: cost, value: "$0 (lexical)" }
    - { label: scorer, value: "wiki-query.cjs" }
    - { label: recommended threshold, value: "0.15" }
---

The wiki surfacer comes in two modes. One is the `/wiki` command you run on
purpose, and it costs tokens only when you ask. The other is a hook that
auto-injects a relevant concept on _every_ prompt, asked for or not. The command
is easy to justify. The hook is the gamble: it pays only when the concept it
surfaces is one you'd have wanted anyway. Fire it on a question about sourdough
and you've burned context tokens for nothing and split attention for less.
That's the **nag**, and it's the thing this measures.

The headline is the **false-positive rate**. There are nine off-topic prompts
here, none with a matching concept anywhere in the wiki. How many make the hook
fire anyway? At the recommended threshold, zero. Precision@1 on the real dev
prompts holds at **78%** — the top-ranked concept is one you'd use — and recall@3
is highest at the lowest threshold. That's why the sweep fires the hook at
**0.15**: low enough to keep coverage, high enough that nothing off-topic ever
clears it.

The scorer is lexical. No model calls, nothing to drift, **$0 a run**. That last
part is the point, because it means the check can gate the hook on every change
to the corpus. The rule it feeds is blunt. If some later corpus or scorer change
pushes the nag rate up and you can't tune it back toward zero without gutting
precision, you keep the `/wiki` command and kill the hook. Ship the surface
people ask for; drop the one that interrupts.
