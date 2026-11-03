---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but the sources collectively
  argue that most benchmark numbers mislead by testing the wrong things,
  optimizing vanity metrics, or failing to reflect production conditions.
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
compiled_at: '2026-11-03T00:34:15.442Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1116
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
  cost_usd: 0.037554
---
A benchmark is only as useful as what it measures, and several sources here make the case that benchmark design routinely lags behind the systems being tested.

The sharpest version of this argument appears in the MAS series by Christopher Meiklejohn. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single-agent evaluation and cannot measure coordination quality, communication overhead, or failure recovery in multi-agent systems. The benchmark numbers circulating in multi-agent research are therefore measuring something real, just not the thing that matters for production reliability. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts numbers on the gap: empirical papers like MAST, MAS-FIRE, and Silo-Bench find multi-agent systems failing 41–87% of the time in production, a range that popular benchmarks do not predict.

SysMoBench, described in ["Can LLMs model real-world systems in TLA+?"](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), illustrates what a domain-specific benchmark can reveal that generic ones miss. LLMs score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariants, exposing the gap between reciting textbook protocols and faithfully modeling actual implementations.

A hands-on benchmark of Claude Opus 4.7 across five reasoning-effort levels, documented at [stet.sh](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning), finds a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while higher effort levels spend more without improving quality. This matters because benchmark design typically assumes monotonic improvement; a benchmark that only measures final output misses the cost curve entirely.

The token-compression critique in ["The Token Compression Illusion"](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) names the vanity metric problem directly. RTK's claimed 60–90% token savings are measured without task-accuracy benchmarks, making the numbers meaningless as a reliability signal.

[Imbue's AI code review experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) uses SWE-bench Pro as an evaluation harness and finds that improving one metric (review quality) while ignoring another (regression rate) produces a system that breaks correct code. Benchmarks that don't track regressions reward overreach.

The [AI Memory Systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) includes benchmarks as one filterable axis across 74 systems, implicitly conceding that benchmark coverage is sparse enough to be a notable absence rather than a given.

[harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) takes a different angle, treating benchmark performance itself as an optimization target. It reimplements the Meta-Harness propose-score-Pareto loop to tune scaffolding around a fixed model, using benchmark scores as a feedback signal for memory, retrieval, and prompt construction decisions.

The [task-completion time horizons study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measures how well frontier LLMs complete tasks without chain-of-thought and finds GPT-5.5 handles roughly 3-minute human tasks at 50% reliability, with capability doubling annually since 2019. The benchmark methodology here is notable for grounding capability claims in time-on-task rather than accuracy alone, which surfaces safety implications for monitoring systems that rely on CoT visibility.

The consistent thread is that benchmark numbers require scrutiny of their own: what they measure, what they omit, and whether the thing being optimized corresponds to anything that matters in deployment.
