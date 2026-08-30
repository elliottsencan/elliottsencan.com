---
title: Benchmarks
summary: >-
  Benchmarks are the primary tool for measuring AI and software system
  performance, but across ML, multi-agent systems, and inference optimization,
  the gap between what benchmarks measure and what actually matters in
  production is a recurring problem.
sources:
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-08-30T05:49:02.106Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1072
    cache_creation_input_tokens: 0
    cache_read_input_tokens: 0
  model: claude-sonnet-4-6
  pricing:
    model: claude-sonnet-4-6
    input_per_million: 3
    output_per_million: 15
    cache_read_per_million: 0.3
    cache_write_5m_per_million: 3.75
    priced_at: '2026-04-30'
  cost_usd: 0.036894
---
A benchmark is only useful if it measures what it claims to measure. That premise sounds obvious, but it breaks down repeatedly across the sources here, in ways that reveal structural problems rather than one-off failures.

The most direct critique comes from the multi-agent systems literature. [Meiklejohn's seventh installment](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single-agent evaluation and cannot measure coordination quality, communication overhead, or failure recovery — the properties that actually distinguish multi-agent architectures from simpler alternatives. Running a multi-agent system against a single-agent benchmark produces a number, but the number says nothing about whether the coordination mechanism worked. The [wave 2 survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) adds empirical weight: MAST, MAS-FIRE, and Silo-Bench found failure rates of 41–87% in production settings, a range that never surfaces in the task-completion metrics these systems are typically reported against.

The LLM reasoning benchmark from [stet.sh on Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) demonstrates a different failure mode: non-monotonic curves. Across 29 real GraphQL tasks, medium reasoning effort outperformed high, xhigh, and max on pass rate, equivalence, code review quality, and cost. If the benchmark had only measured the highest-effort configuration, it would have reported the wrong optimum.

The [SysMoBench paper](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) benchmarks LLMs on generating TLA+ specs from real system code. Syntax scores came in near-perfect; conformance and invariant scores landed around 46% and 41% respectively. The gap exposes a category error: fluency benchmarks and correctness benchmarks are not the same thing, and reporting one while implying the other misleads practitioners.

Token compression tools face the same problem. [Mroczek's analysis of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) points out that claimed 60–90% token savings are measured on Bash output stripping alone, with no task-accuracy benchmarks to establish whether the compression preserves the information agents actually need. A compression ratio is not a benchmark for agent reliability.

The SWE-bench Pro experiment at [Imbue](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) adds a subtler finding: benchmarks that measure pass rate can miss regressions. Running an AI implementer-reviewer-fixer pipeline showed that weaker fixer agents broke previously correct code while still improving aggregate scores. What looks like a gain on a benchmark can hide localized damage.

[Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) take a different approach, measuring task-completion time horizons for frontier models without chain-of-thought, finding that GPT-5.5 handles roughly 3-minute human tasks at 50% reliability — a capability doubling about every year since 2019. Their framing is useful precisely because it anchors the benchmark in human-legible task duration rather than abstract accuracy scores.

[Colin Breck's post](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) generalizes the problem beyond AI: even order-of-magnitude benchmark improvements often fail to change outcomes because of attention thresholds, discrete capacity increments, and pipeline backpressure. A benchmark measures a component; systems have constraints that the component benchmark cannot see.
