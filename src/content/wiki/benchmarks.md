---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but the sources collectively
  show that what a benchmark measures rarely matches what practitioners actually
  need to know about reliability, coordination, or real-world behavior.
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
compiled_at: '2026-09-28T23:00:37.969Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1159
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
  cost_usd: 0.038199
---
A benchmark is a standardized test that produces a score intended to represent performance on some broader capability. The gap between that score and what the score actually predicts is the recurring problem across nearly every source that touches benchmarks here.

The clearest statement of the problem comes from [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7): HumanEval, SWE-bench, and similar tests were designed for single-agent evaluation and cannot measure coordination quality, communication overhead, or failure recovery. When researchers use them to evaluate multi-agent systems anyway, the numbers are misleading by construction. The benchmark answers a question nobody was asking.

SWE-bench at least points at real software tasks, which is why [Imbue's AI code review experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) chose SWE-bench Pro as its test bed. But even there, the benchmark reveals something unexpected: weaker fixer agents break correct code that was never under review, a failure mode that aggregate pass rates would obscure unless you also measure regressions separately.

SysMoBench, documented in [the TLA+ paper](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), is a deliberate attempt to build a harder test. It benchmarks LLMs on generating formal specifications from real system code rather than textbook problems. The result: near-perfect syntax scores but only around 46% conformance and 41% invariant scores. High syntax performance combined with low semantic accuracy is a precise illustration of how a benchmark can produce flattering numbers while hiding the actual capability gap.

The same issue appears at the inference level. [The Opus 4.7 reasoning curve benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic relationship between stated reasoning effort and actual pass rate: medium effort outperformed high, xhigh, and max on both quality and cost. Without running a task-specific benchmark rather than relying on the model's self-reported effort level, you would not know which setting to use.

[Meiklejohn's vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) notes that Chen et al.'s challenge-level taxonomy for MAS exposes where benchmarks are simply missing: unevolved agents and inter-agent failure recovery have no standard tests. The [Wave 2 empirical paper survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) fills some of that gap with MAST, MAS-FIRE, and Silo-Bench, which find failure rates of 41 to 87 percent in production conditions, rates that single-agent benchmarks are structurally incapable of measuring.

Two sources push back on benchmark numbers from the tooling side. [The RTK skepticism post](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that claimed 60 to 90 percent token savings are vanity metrics because the tool lacks task-accuracy benchmarks that would justify the reliability trade-off. The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) includes benchmarks as one of 74 systems' tracked attributes, implying that benchmark coverage is itself a quality signal worth comparing across implementations.

[The no-CoT task-completion horizon study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) takes a different approach: rather than measuring capability at a fixed point, it tracks how the capability threshold changes over time, finding a doubling roughly every year since 2019. That framing treats benchmark results as a time series rather than a snapshot, which is more useful for forecasting but requires consistent methodology across years.

The consistent thread is that benchmark design determines what you can learn, and most existing benchmarks were designed for narrower conditions than researchers now apply them to. A score is only as informative as the match between the test conditions and the deployment conditions.
