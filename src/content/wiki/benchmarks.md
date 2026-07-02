---
title: Benchmarks
summary: >-
  Benchmarks quantify model and system performance, but the cited sources
  collectively show that benchmark design often lags what is actually being
  measured, producing numbers that mislead as much as they inform.
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
compiled_at: '2026-07-02T12:25:06.877Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6773
    output_tokens: 1082
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
  cost_usd: 0.036549
---
A benchmark is only as useful as its fit to the thing being tested. That mismatch is the thread running through nearly every source here.

The clearest statement of the problem comes from Christopher Meiklejohn's series on multi-agent systems. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were built for single agents and cannot measure coordination quality, communication overhead, or failure recovery. Using them to evaluate multi-agent systems produces scores that look comparable to single-agent results while hiding the actual failure modes. The empirical picture in [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) is consistent with that gap: MAST, MAS-FIRE, and Silo-Bench find that multi-agent systems fail 41-87% of the time in production, figures that standard benchmarks do not surface.

SysMoBench, described in [a SIGOPS paper on LLMs and TLA+](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), illustrates a more specific version of the same problem. LLMs score near-perfect on syntax but only around 46% on conformance and 41% on invariant correctness when asked to generate TLA+ specs from real system code. The benchmark reveals that models are reciting textbook protocols rather than faithfully modeling actual implementations. High aggregate scores concealed a qualitative failure that a coarser test would have missed entirely.

The Opus 4.7 reasoning-curve study at [stet.sh](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) adds another dimension: benchmarks can mislead even when the task is well-specified, if the evaluation conflates cost with quality. Across 29 real GraphQL tasks, medium reasoning effort outperformed high, xhigh, and max on pass rate and cost-efficiency combined. A benchmark that measured only pass rate would have rewarded the wrong setting.

Two sources highlight benchmark absence as a problem in its own right. The critique of RTK's token-compression claims in [Mroczek's piece](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) centers on the fact that the tool lacks task-accuracy benchmarks, so the advertised 60-90% token savings cannot be evaluated against what actually matters: whether the pipeline still works. Similarly, [Imbue's SWE-bench Pro experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) uses an existing benchmark to surface a behavior no one was explicitly measuring: weaker fixer agents breaking correct code by overreaching beyond review scope.

The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) takes a different approach, including benchmarks as one of several filterable axes across 74 systems. Listing benchmark support as a feature column implicitly treats it as a signal of maturity: systems that expose benchmark results can be compared; those that do not cannot.

The [no-CoT task-completion study on LessWrong](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) does something benchmarks rarely do: it tracks a metric over time rather than at a single point. Measuring task-completion horizons since 2019 shows capability doubling roughly annually, which changes the interpretation of any snapshot benchmark taken in isolation.

Taken together, these sources suggest three recurring failure modes: tests designed for the wrong unit of analysis (single-agent metrics applied to multi-agent systems); high scores on easy sub-tasks masking failure on what actually matters (syntax vs. conformance in TLA+); and vanity metrics that lack any accuracy baseline against which savings or improvements can be validated.
