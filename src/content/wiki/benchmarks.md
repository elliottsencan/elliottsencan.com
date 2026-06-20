---
title: Benchmarks
summary: >-
  Benchmarks are the primary tool for measuring AI model and system capability,
  but multiple sources show that most existing benchmarks measure the wrong
  things, producing numbers that mislead more than they inform.
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
compiled_at: '2026-06-20T22:06:38.423Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6006
    output_tokens: 924
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
  cost_usd: 0.031878
---
A benchmark is only as useful as what it actually measures. That gap between the metric and the thing it is supposed to represent runs through nearly every AI benchmark discussed across these sources.

The clearest case is in multi-agent systems. [Meiklejohn's benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues directly that HumanEval, SWE-bench, and similar suites were designed for single-agent evaluation and cannot measure coordination quality, communication overhead, or failure recovery. When researchers apply those tests to multi-agent systems and report improvements, the numbers say nothing about the properties that actually distinguish multi-agent architectures. The vocabulary post in the same series identifies missing benchmarks as one of the structural gaps in the field — alongside unevolved agents — suggesting the problem is recognized but unsolved [Meiklejohn, Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the).

SysMoBench is an attempt to fill a similar gap in LLM formal reasoning. [Cheng et al.](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) benchmark frontier models on generating TLA+ specifications from real system code, finding near-perfect syntax scores but only around 46% conformance and 41% invariant accuracy. The syntax score looks impressive; the specification score exposes that models are reciting textbook protocols rather than modeling actual code. That pattern — high score on a surface metric, low score on the substantive one — recurs elsewhere.

The Opus 4.7 reasoning-effort benchmark [on stet.sh](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds a non-monotonic curve across effort levels: medium effort outperforms high, xhigh, and max on pass rate, equivalence, and cost. That result matters for benchmarking methodology because it means a benchmark run at a single effort level can produce systematically misleading capability estimates.

Task-completion horizon benchmarks introduce a different dimension. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure how well frontier models complete tasks without chain-of-thought, finding GPT-5.5 handles roughly 3-minute human tasks at 50% reliability, with capability doubling approximately every year since 2019. The no-CoT framing is itself a methodological choice with safety implications: CoT-based monitoring breaks down if models can complete consequential tasks without it.

On the infrastructure side, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) uses tokens-per-second estimates derived from model weights, KV cache, and activation overhead as a practical benchmark for GPU compatibility — a narrower, deployment-oriented use of the term. The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) similarly includes benchmarks as one filterable axis across 74 systems, treating benchmark coverage itself as a feature worth tracking.

The through-line is that benchmark numbers are only meaningful when the benchmark was designed for the system under test and measures the property that actually matters in deployment. That condition is met less often than benchmark-citing papers imply.
