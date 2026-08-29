---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but sources across MAS
  research, LLM evaluation, and systems work consistently find that the metrics
  used often fail to capture what actually matters in production.
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
compiled_at: '2026-08-29T20:11:58.395Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1080
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
  cost_usd: 0.037014
---
A benchmark is only useful insofar as it measures what you care about. Across the sources here, a recurring pattern emerges: published performance numbers look strong, then collapse when the evaluation criteria meet real conditions.

The starkest case comes from multi-agent systems research. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar coding benchmarks were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. Using them for multi-agent evaluation produces numbers that look competitive but say nothing about the properties that actually distinguish multi-agent architectures. The [Wave 2 empirical papers surveyed in Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) back this up: systems like MAST, MAS-FIRE, and Silo-Bench show failure rates of 41 to 87 percent in production, a gap that benchmark scores on single-agent tasks would never predict.

SysMoBench illustrates the same gap for LLM formal-modeling tasks. [Cheng et al.](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) find that leading models score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariant correctness. Syntax is easy to benchmark; semantic faithfulness to an actual implementation is not, and that is precisely the gap that matters for verification.

Benchmark design can also obscure non-monotonic relationships. A [hands-on evaluation of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels on 29 real GraphQL tasks finds that medium effort outperforms high, xhigh, and max on pass rate and cost-efficiency. If the benchmark had only compared low to max, it would have missed the curve entirely.

Vanity metrics are a related failure mode. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) notes that claimed 60 to 90 percent token savings are measured against stripped Bash output, not task accuracy, which is the only metric that would justify the reliability trade-off the tool introduces. Similarly, [the Imbue SWE-bench Pro experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) shows that running an AI review pipeline can make already-correct code worse, a regression that aggregate pass-rate benchmarks can obscure if enough other tests still pass.

On the memory systems side, the [AI Memory Systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) lists benchmarks as one of 74 systems' filterable attributes, implicitly noting how sparse that column is across the field. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses the benchmark gap from a tooling angle, auto-generating evaluation and guardrail models specifically because off-the-shelf benchmarks do not cover the task distributions agents encounter in production.

The broader systems lesson appears in [Colin Breck's piece on performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter): attention thresholds, discrete capacity increments, and pipeline backpressure mean that even an order-of-magnitude measured improvement can produce zero practical change. Benchmark numbers live upstream of those constraints; whether they matter downstream is a separate question entirely.

Good benchmark design requires knowing which properties drive outcomes in the target environment, designing test cases that probe those properties specifically, and resisting the pull of metrics that are easy to compute but loosely coupled to production behavior.
