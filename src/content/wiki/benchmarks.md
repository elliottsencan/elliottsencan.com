---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software system performance, but sources across MAS
  research, LLM evaluation, and optimization work consistently show that
  benchmark numbers mislead when the metric fails to match what actually matters
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
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-11-24T03:52:42.854Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1044
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
  cost_usd: 0.036474
---
A benchmark is only as useful as the gap between what it measures and what the system actually needs to do. That gap is a recurring problem across the sources here.

The clearest case comes from multi-agent systems research. [Meiklejohn's seventh installment](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single-agent evaluation and cannot capture coordination quality, communication overhead, or failure recovery. Using them to rank multi-agent systems produces numbers that look meaningful but measure the wrong thing. The [wave 2 empirical survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: studies like MAST, MAS-FIRE, and Silo-Bench find 41-87% failure rates in production, failures that single-agent benchmarks would never surface because they do not stress inter-agent reasoning paths.

The same pattern appears in formal verification. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) scores leading LLMs near-perfect on TLA+ syntax but only about 46% on conformance and 41% on invariants. The models pass the easy part of the benchmark while failing the part that matters: faithfully modeling real system behavior rather than reciting textbook protocols.

Task-completion horizon measurement introduces a different problem. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure how long a task a model can complete without chain-of-thought reasoning, finding GPT-5.5 handles roughly three-minute human tasks at 50% reliability. The 50% threshold is a deliberate methodological choice; shifting it changes the numbers significantly, which means capability claims depend heavily on how the benchmark is calibrated.

Even when a benchmark is well-designed, the relationship between score and practical value is not straightforward. [Imbue's pipeline experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) on SWE-bench Pro found that weaker fixer agents regressed correct code when given broad scope, a failure mode invisible to benchmarks that only count resolved issues. And [stet.sh's Opus 4.7 reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) shows a non-monotonic result across five effort levels: medium effort beats high, xhigh, and max on both pass rate and cost-efficiency. More compute does not linearly improve benchmark scores.

Vanity metrics compound the problem when benchmarks are self-reported. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) calls out 60-90% token-reduction claims as misleading because they measure only Bash output stripping and are never paired with task-accuracy benchmarks. Compression is easy to measure; whether the compression degrades task performance is not measured at all.

The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) illustrates a structural limit: across 74 systems, benchmark coverage is uneven and the presence or absence of a benchmark column in a comparison table is itself informative about how immature evaluation is for a given capability dimension.

Across these cases the common thread is that benchmark numbers travel further than their methodological assumptions. A score from a single-agent test, a syntax-only evaluation, or a compression-ratio metric gets cited as evidence for claims the original measurement was never designed to support.
