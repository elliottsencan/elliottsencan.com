---
title: Wiki surfacer precision
hypothesis: When the wiki surfacer fires on a dev prompt the concept is genuinely relevant, and on off-topic prompts it stays silent — so the auto-surface hook earns the context tokens it spends instead of nagging.
status: live
publishedDate: 2026-06-02T12:00:00-07:00
lastRunDate: 2026-06-02T12:00:00-07:00
tldr: An auto-surface hook injects a wiki note on every prompt, spending context tokens unprompted. This eval measures how often it would nag on off-topic prompts — the headline false-positive rate — and reads the firing threshold off the sweep.
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
    - Secondary stats are <code>precision@1</code> (top concept genuinely relevant) and <code>recall@3</code> (a relevant concept in the top 3 above threshold). The recommended threshold is the sweep point that drives the nag rate to ~0 while keeping precision@1 highest — that number is what the hook fires at.
  receipts:
    - { label: prompts, value: "32 (23 on-topic / 9 off-topic)" }
    - { label: cost, value: "$0 (lexical)" }
    - { label: scorer, value: "wiki-query.cjs" }
    - { label: recommended threshold, value: "0.15" }
---

The wiki surfacer has two surfaces: an on-demand `/wiki` command you invoke
deliberately, and an auto-surface hook that injects a relevant-concept note on
_every_ prompt. The command only costs tokens when you ask for it. The hook
spends them unprompted — so it's only a net win if the concept it surfaces is
actually relevant. Fire it on a prompt about sourdough and it's pure noise:
context tokens burned, attention split, nothing gained. That failure mode —
the **nag** — is what this eval measures.

The headline is the **false-positive rate**: across the off-topic prompts (the
ones with no relevant wiki concept at all), how often would the hook have fired
anyway? At the recommended threshold that rate is **0%** — none of the nine
off-topic prompts cross the bar, so the hook stays silent exactly when it
should. Precision@1 on the on-topic prompts holds at **78%** (the top-ranked
concept is genuinely relevant), and recall@3 is highest at the lowest
threshold, which is why the sweep recommends firing at **0.15**: it's the point
that keeps the nag rate at zero without throwing away on-topic coverage.

The check is intentionally cheap and deterministic — a pure lexical scorer, no
model calls, $0 per run — so it can gate the hook on every corpus change. The
decision rule it feeds: if a future corpus or scorer change pushed the
false-positive rate up and it couldn't be tuned back to ~0 without gutting
precision, the move is to **ship only the on-demand `/wiki` command and drop
the auto-surface hook** — keep the surface you ask for, kill the one that nags.
