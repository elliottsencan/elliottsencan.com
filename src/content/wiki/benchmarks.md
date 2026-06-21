---
title: Benchmarks
summary: >-
  Benchmarks measure AI system capability, but the sources collectively show
  that benchmark design frequently lags behind what systems actually need to do,
  producing numbers that look useful while obscuring the failures that matter
  most.
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
compiled_at: '2026-06-21T18:30:00.958Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6006
    output_tokens: 999
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
  cost_usd: 0.033003
---
A benchmark is only as useful as what it measures, and a recurring theme across these sources is that benchmark design frequently lags behind the systems being evaluated. The problem shows up at every level, from single-model capability tests to multi-agent coordination to formal verification.

The most direct treatment comes from Meiklejohn's series on multi-agent systems. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar widely cited tests were built for single-agent systems and simply cannot measure the things that distinguish multi-agent architectures: coordination quality, communication overhead, and failure recovery. The numbers get reported anyway, which makes systems look comparable when they are not. [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) reinforces this, noting that Chen et al.'s challenge-level taxonomy exposes gaps like missing benchmarks as a named structural problem in the field, not just an oversight. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) gives the empirical stakes: MAST, MAS-FIRE, and Silo-Bench measured production failure rates of 41-87%, numbers that would never surface from a single-agent coding benchmark.

The same mismatch appears in formal verification. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests leading LLMs on generating TLA+ specifications from real system code and finds near-perfect syntax scores alongside only \~46% conformance and \~41% invariant accuracy. Models have learned to recite textbook protocol patterns but fail when the actual implementation diverges from those patterns. Syntax correctness is easy to measure and easy to optimize for; semantic fidelity is harder, and the benchmark gap between them is what makes the results misleading.

Benchmarks also interact with how effort is spent. A [hands-on test of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels on 29 real GraphQL tasks found a non-monotonic result: medium effort won on pass rate, equivalence, code-review quality, and cost-efficiency, while higher effort levels spent more without improving quality. That result depends entirely on the task set chosen; a different benchmark with different tasks could favor a different point on the curve.

The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) takes a different approach, making benchmarks one column among many in a live comparison table of 74 systems, which at least surfaces the absence of benchmark data as visible information rather than hiding it. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) tackles the evaluation problem from the tooling side, auto-generating evaluation models with claimed sub-100ms latency and 8x lower cost than GPT-as-judge, though production validation of those claims is itself a benchmark question.

The through-line is that benchmark numbers communicate confidence without always earning it. Meiklejohn's [open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) frames this as part of a broader pattern where AI systems research is rediscovering problems distributed systems solved decades ago, without the vocabulary to name them. Benchmarks designed for the wrong unit of analysis, or for a simpler version of the task, will keep producing misleading results until the measurement catches up to the system.
