---
title: Benchmarks
summary: >-
  Benchmarks measure AI system performance, but the sources here collectively
  argue that most existing benchmarks measure the wrong things, omit critical
  dimensions, or produce numbers that obscure real-world behavior.
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
compiled_at: '2026-06-24T06:28:57.038Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6616
    output_tokens: 992
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
  cost_usd: 0.034728
---
A benchmark is only as useful as what it actually measures. Across several domains, the sources here converge on a single recurring problem: benchmarks designed for one context get applied to a different one, producing numbers that look authoritative but miss the point.

The clearest statement of this comes from the multi-agent systems literature. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar suites were designed for single-agent settings and cannot measure coordination quality, communication overhead, or failure recovery. Those are the exact properties that distinguish multi-agent systems from single-agent ones. The benchmark scores persist in the literature anyway, producing leaderboard comparisons that tell you nothing about whether a system will hold up in production. [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this by showing that empirical studies of real MAS deployments find 41-87% failure rates, a number no standard benchmark was tracking.

The same benchmark-mismatch problem appears in a different form with LLMs and formal specification. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that leading LLMs score near-perfect on TLA+ syntax correctness but only around 46% on conformance and 41% on invariant correctness. Models that look capable on surface metrics are actually reciting textbook protocol patterns rather than faithfully modeling the actual system being described. Syntax benchmarks pass; semantic benchmarks expose the gap.

Benchmarks can also mislead through missing dimensions. [The RTK skepticism piece](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) criticizes a tool's 60-90% token-saving claims as vanity metrics because they are never accompanied by task-accuracy benchmarks. Without measuring what actually matters to the pipeline, compression numbers are untethered from any claim about whether the tool is safe to use.

Even well-intentioned benchmarks can produce non-obvious results. A hands-on evaluation of Claude Opus 4.7 across five reasoning-effort levels on real tasks found a non-monotonic performance curve: [medium effort outperformed high, xhigh, and max on pass rate, equivalence, and cost](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). More compute does not monotonically produce better results, which complicates any benchmark that uses a single effort setting as a proxy for model capability.

Beyond benchmark design, there is a gap in benchmark availability. [Meiklejohn's Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) flags missing benchmarks as an explicit gap in the MAS taxonomy: certain agent behaviors and coordination patterns simply have no standardized evaluation. [The AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) includes benchmarks as one of its filterable dimensions, implying that benchmark coverage varies widely and unevenly across the 74 systems it catalogs.

Tools like [Plurai](/reading/2026-05/2026-05-04t235011-plurai) respond to this gap by auto-generating evaluation and guardrail models without labeled data, positioning custom evals as a practical alternative when no standard benchmark fits the task. That is a reasonable workaround, but it also means benchmark diversity is increasing faster than comparability.
