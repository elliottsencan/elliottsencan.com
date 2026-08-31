---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but their validity depends on
  whether they capture what actually matters in production — a gap that surfaces
  repeatedly across MAS evaluation, LLM inference, and token-efficiency claims.
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
compiled_at: '2026-08-31T22:30:45.715Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1199
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
  cost_usd: 0.038799
---
A benchmark is only as useful as the construct it measures. That gap between metric and meaning appears across nearly every domain represented in these sources, from multi-agent coordination to LLM reasoning to token compression.

The most direct treatment comes from Meiklejohn's series on multi-agent systems. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. Using them to evaluate multi-agent systems produces numbers that look meaningful but do not correspond to the properties that distinguish those systems. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this by surveying MAST, MAS-FIRE, and Silo-Bench, finding that multi-agent systems fail 41–87% of the time in production — a failure rate that conventional benchmarks do not surface. [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) notes that the field's taxonomic vocabulary itself exposes gaps, including missing benchmarks for unevolved agents.

SysMoBench offers a case study in what good benchmark design can reveal. [The SIGOPS paper](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) benchmarks leading LLMs on generating TLA+ specs from real system code, finding near-perfect syntax scores but only about 46% conformance and 41% invariant scores. LLMs recite textbook protocols rather than faithfully modeling actual implementations. High scores on surface metrics masked fundamental incapability — exactly the failure mode Meiklejohn warns about.

The same dynamic appears in inference optimization. [The KV cache post](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) claims 20x faster inference, but [Breck's piece on performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) provides the necessary corrective: attention thresholds, discrete capacity increments, and pipeline backpressure mean even order-of-magnitude improvements often fail to change real outcomes. Benchmark numbers and production impact are different things.

Token compression tools face the same scrutiny. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that claimed 60–90% token savings are vanity metrics because the tool lacks task-accuracy benchmarks that would justify the reliability trade-off.

[The Opus 4.7 reasoning-curve benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) shows what careful benchmark design looks like in practice: 29 real GraphQL tasks across five effort levels, finding a non-monotonic curve where medium effort wins on pass rate, equivalence, and cost-efficiency. The benchmark was designed to match actual use rather than maximize scores.

[Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) take a different angle, measuring task-completion time horizons for frontier models without chain-of-thought, finding that GPT-5.5 handles roughly 3-minute human tasks at 50% reliability — a capability doubling approximately every year since 2019. The benchmark here is calibrated to human task time, giving the metric external grounding.

[The AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) tracks benchmarks as one of 74 systems' filterable attributes, acknowledging that coverage across architectures is uneven. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses the evaluation gap from the tooling side, auto-generating custom evaluation models to replace GPT-as-judge at lower cost and latency.

Across these sources, the consistent finding is that benchmark scores travel faster than benchmark validity. A number attached to a test designed for a different construct, a different failure mode, or a different deployment context misleads rather than informs.
