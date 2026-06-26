---
title: Benchmarks
summary: >-
  Benchmarks measure AI model and system performance, but the sources collected
  here consistently show that existing tests measure the wrong things, produce
  misleading numbers, or omit the variables that matter most in production.
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
compiled_at: '2026-06-26T02:54:08.945Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6616
    output_tokens: 980
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
  cost_usd: 0.034548
---
A benchmark is only as useful as what it actually measures. The sources here converge on a pattern: benchmark numbers travel fast, but the thing being measured is usually a proxy for the real capability, and the gap between proxy and reality compounds as systems grow more complex.

For multi-agent LLM systems, the mismatch is structural. [Meiklejohn's benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. Running a multi-agent system against a single-agent benchmark tells you how well the system handles individual tasks, not whether the coordination machinery adds or subtracts value. The [Wave 2 empirical paper survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the stakes: MAST, MAS-FIRE, and Silo-Bench found failure rates of 41–87% in production, which single-agent benchmarks would never surface. Even the vocabulary needed to build better benchmarks is underdeveloped, as the [MAS taxonomy post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) notes gaps like unevolved agents and missing benchmark categories in the existing typologies.

Similar proxy problems appear outside multi-agent research. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests LLMs on generating TLA+ specifications from real system code, finding near-perfect syntax scores alongside only ~46% conformance and ~41% invariant scores. The headline syntax number looks good; the functional numbers reveal that LLMs reproduce textbook protocols rather than faithfully modeling the actual implementation in front of them. The benchmark has to test the right layer.

Effort-level benchmarking on a single model can produce equally counterintuitive results. A [hands-on benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across 29 real tasks found a non-monotonic curve: medium reasoning effort outperformed high, xhigh, and max on pass rate, equivalence, code review, and cost. More compute does not monotonically improve output quality, which means effort-level selection is itself a variable that benchmarks need to surface rather than hold constant.

Token-count metrics illustrate how vanity numbers proliferate when task-accuracy benchmarks are absent. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) notes that claimed 60–90% token savings are unvalidated against any downstream task-accuracy measure, making the compression numbers uninterpretable as quality signals.

The [CanItRun tool](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) takes a narrower but well-scoped approach, estimating tokens-per-second from hardware specs, VRAM, and quantization level. The scope is clear, the metric is actionable, and the claim is falsifiable — a model for how benchmark design should constrain its own claims.

Collectively, the sources point toward a consistent failure mode: benchmarks get designed for the system that existed at research time, then inherited by successor systems with different architectures and failure modes. The number persists; the validity does not.
