---
title: Benchmarks
summary: >-
  Benchmarks measure AI system performance, but across multi-agent systems, LLM
  reasoning, and VLMs, the cited sources collectively argue that most existing
  benchmarks measure the wrong things or fail to transfer to production
  conditions.
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
compiled_at: '2026-06-23T00:04:00.660Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6421
    output_tokens: 958
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
  cost_usd: 0.033633
---
A benchmark is only as useful as the claims it can actually support. Across several distinct domains, the sources here converge on a common finding: benchmark numbers routinely flatter systems by testing conditions that do not match what matters in deployment.

The sharpest critique comes from [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7), which argues that HumanEval, SWE-bench, and similar tests were built for single agents and cannot measure coordination quality, communication overhead, or failure recovery. These are exactly the properties that distinguish multi-agent systems from single-agent ones, so applying single-agent benchmarks to MAS produces numbers that are technically accurate but structurally misleading. [Part 4 of the same series](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: empirical papers like MAST and MAS-FIRE find failure rates of 41-87% in production, a gap that benchmark-clean numbers never surface.

The TLA+ evaluation on [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) shows the same pattern from a different angle. LLMs score near-perfectly on syntax but only around 46% on conformance and 41% on invariant correctness when asked to model real system code. Syntax benchmarks look good; semantic benchmarks expose that models are reciting textbook protocols rather than faithfully representing actual implementations.

Benchmarks also struggle with the effort-quality relationship. A hands-on evaluation of [Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels finds a non-monotonic curve: medium effort wins on pass rate, equivalence, and cost-efficiency, while higher settings spend more without improving quality. If a benchmark only samples one effort level, it will either over- or under-report capability depending on which level it picks.

For agent memory systems, [the AI Memory Systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) lists benchmarks as one of the filterable dimensions across 74 systems, implying benchmark coverage is uneven enough to warrant explicit tracking. [RTK's claimed token savings](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) illustrate what happens without task-accuracy benchmarks: 60-90% compression figures are presented as value, but without measuring whether downstream task accuracy is preserved, the metric is a vanity number.

The [no-CoT task-completion study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) takes a more constructive approach, benchmarking against a concrete operational anchor: how long a task takes a human. GPT-5.5 handles roughly 3-minute human tasks at 50% reliability, and that horizon has doubled each year since 2019. Grounding a benchmark in real task duration rather than held-out test sets makes the number harder to game and easier to interpret.

The through-line is that benchmark design choices, what gets measured, at what effort level, against what baseline, determine whether results are actionable. The research community is generating better benchmarks, but the gap between benchmark performance and production reliability remains the central unresolved problem.
