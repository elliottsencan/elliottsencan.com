---
title: Benchmarks
summary: >-
  Benchmarks in AI and software measure capability claims, but repeatedly
  surface as misleading when test design fails to match what systems actually do
  in production.
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
compiled_at: '2026-07-08T00:10:43.599Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6773
    output_tokens: 1087
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
  cost_usd: 0.036624
---
A benchmark is only as useful as its match with the thing being measured. Across the sources here, that mismatch is the dominant finding.

The clearest statement comes from [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7): HumanEval and SWE-bench were designed for single-agent tasks and simply cannot measure coordination quality, communication overhead, or failure recovery. Using them to evaluate multi-agent systems produces numbers that look meaningful but reveal nothing about the properties that distinguish those systems. The [multi-agent landscape post](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) frames the 2025 wave of research as being specifically about reliability measurement rather than proof-of-concept coordination — the field became aware that its benchmarks were under-specified.

SysMoBench, described in the [TLA+ LLM study](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), illustrates a different benchmark design problem: metrics can look good on one axis while failing on another. LLMs in that study scored near-perfect on syntax but only around 46% on conformance and 41% on invariants, because models reproduce textbook protocol shapes rather than faithfully modeling the system they were given. High scores on an easy sub-task mask low scores on the harder sub-task that actually matters.

The Opus 4.7 reasoning-effort [benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) shows a third failure mode: non-monotonic results that contradict the assumption baked into the benchmark design. The expectation is more reasoning effort equals better output; medium effort outperformed high, xhigh, and max on both pass rate and cost-efficiency across 29 real tasks. Benchmarks that assume monotonic improvement mislead anyone calibrating model usage against effort settings.

The [token compression skepticism piece](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) names the specific benchmark gap that enables misleading claims: RTK reports token savings but provides no task-accuracy measurements. Without the second metric, the first is a vanity number. The [AI code review experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) makes a similar point, running a pipeline against SWE-bench Pro and finding that aggregate metrics hide a pathological mode where fixer agents break already-correct code.

The [no-CoT time horizons study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) takes a different approach: rather than a fixed task set, it estimates what human-task duration frontier models can complete at 50% reliability, finding GPT-5.5 handles roughly three-minute tasks. Framing capability as a time-horizon rather than a pass/fail score produces a metric that scales continuously and connects to real-world usage.

The [AI memory comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) takes yet another approach, using benchmarks as one column among many in a feature comparison across 74 systems rather than as a primary ranking signal. That framing treats benchmark scores as partial evidence rather than final verdicts.

The [performance gains post](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) generalizes the problem beyond AI: even order-of-magnitude improvements on a measured dimension fail to matter when attention thresholds, discrete capacity increments, or pipeline backpressure mean the improvement never translates into changed outcomes. A benchmark can be accurate and still irrelevant.

The consistent thread is that benchmark design choices — what to measure, at what granularity, against what baseline, using what passing criteria — determine whether results are actionable. Measuring the wrong thing accurately is not progress.
