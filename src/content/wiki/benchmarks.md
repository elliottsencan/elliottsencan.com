---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but the sources collectively
  argue that most existing benchmarks measure the wrong things, are misread, or
  require scrutiny to produce actionable conclusions.
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
compiled_at: '2026-10-26T22:22:40.852Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1226
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
  cost_usd: 0.039204
---
A benchmark is only as useful as what it actually measures. Across AI systems research, performance optimization, and agent evaluation, a recurring finding is that headline numbers mislead when the benchmark was designed for a different context than the one being evaluated.

The clearest case comes from multi-agent systems. Christopher Meiklejohn argues at length that HumanEval, SWE-bench, and similar tests were built for single-agent settings and cannot capture coordination quality, communication overhead, or failure recovery — the properties that distinguish multi-agent architectures from single-model pipelines [Getting Up to Speed on Multi-Agent Systems, Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). His earlier vocabulary post notes that missing benchmarks are themselves a diagnostic: the gaps in what is measured signal where the field has not yet formalized its understanding [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). The empirical wave he surveys — MAST, MAS-FIRE, Silo-Bench — reported 41–87% failure rates in production, which only became visible once researchers stopped reusing single-agent benchmarks [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

SysMoBench, a benchmark for LLM-generated TLA+ specs, exposes a different failure mode: near-perfect syntax scores masking only 46% conformance and 41% invariant accuracy, because models recite textbook protocols rather than modeling the actual system under study [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). High scores on one axis of a benchmark can obscure failure on the axis that matters.

The Opus 4.7 reasoning-curve study makes the same point from a cost angle: increasing reasoning effort beyond medium produced no improvement in pass rate or code-review quality on 29 real tasks, and the benchmark curve was non-monotonic rather than the expected monotonic climb [Opus 4.7 Low vs Medium vs High](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). Benchmark design that assumes more compute equals better results will misread this kind of curve.

Similar skepticism applies to compression and throughput claims. RTK's reported 60–90% token savings are characterized as vanity metrics because they measure stripped Bash output volume, not task accuracy — and no task-accuracy benchmark justifies the reliability trade-off in agent pipelines [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). On the positive side, the image-rs blur optimization used concrete before/after throughput numbers on u8 images to validate a 5.9x speedup — a case where the benchmark scope matched the optimization target [5x faster fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs).

Task-completion time horizon benchmarks attempt to quantify AI capability growth more broadly. One study found GPT-5.5 completes tasks requiring roughly three minutes of human effort at 50% reliability, with capability doubling approximately yearly since 2019 — though the authors note this has safety implications for chain-of-thought monitoring approaches [Estimating No-CoT Task-Completion Time Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier). The AI memory systems comparison table covers 74 systems and includes benchmarks as one filterable axis [AI Memory Systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison), while Plurai frames sub-100ms latency and 8x cost reduction versus GPT-as-judge as benchmark-grade validation for agent evaluation pipelines [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

Colin Breck's framing from systems engineering adds a useful corrective: even when a benchmark shows an order-of-magnitude gain, attention thresholds, discrete capacity increments, and pipeline backpressure can render the gain irrelevant in practice [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). The number matters only if the system constraint it targets is actually the binding one.
