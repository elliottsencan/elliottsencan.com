---
title: Benchmarks
summary: >-
  Benchmarks measure AI system capability, but most existing tests were designed
  for single-model tasks and fail to capture coordination quality, failure
  recovery, or real-world generalization — gaps that become more consequential
  as systems grow more complex.
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
compiled_at: '2026-06-24T04:33:51.591Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6616
    output_tokens: 1124
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
  cost_usd: 0.036708
---
A benchmark is only as useful as what it actually measures. Across AI research in 2025–2026, a recurring finding is that widely cited benchmarks produce numbers that look informative but systematically miss the behaviors that matter in production.

The clearest statement of this problem comes from [Meiklejohn's seventh MAS post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7), which argues that HumanEval, SWE-bench, and similar tests were designed for single-agent evaluation and cannot measure coordination quality, communication overhead, or failure recovery. When those scores are applied to multi-agent systems, they launder single-agent capability as multi-agent performance. The wave-two empirical papers surveyed in [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — MAST, MAS-FIRE, and Silo-Bench — found failure rates between 41% and 87% in production, numbers that standard leaderboard benchmarks would not have predicted.

The misalignment between benchmark scores and real behavior appears in other domains too. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests LLMs on generating TLA+ specs from real system code, finding near-perfect syntax scores but only roughly 46% conformance and 41% invariant scores. Models perform well on structural pattern-matching but fail when the task requires faithfully modeling an actual implementation rather than reciting a textbook protocol. High scores on surface metrics coexist with near-failure on semantic ones.

Benchmark design also shapes what gets built. [Meiklejohn's vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) notes that Chen et al.'s challenge-level taxonomy exposes gaps including missing benchmarks for unevolved agents, suggesting the absence of measurement infrastructure is itself a research obstacle. Separately, [RTK's token compression claims](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) illustrate what happens when a tool is evaluated on vanity metrics — 60–90% token savings figures that strip Bash output without any task-accuracy benchmark to justify the reliability trade-off.

Even well-scoped benchmarks have non-obvious structure. A [hands-on benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels on 29 real tasks found a non-monotonic curve: medium effort outperformed high, xhigh, and max on pass rate, code review quality, and cost-efficiency. The assumption that more compute equals better benchmark outcomes failed here. Similarly, [an Imbue experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) running an AI pipeline on SWE-bench Pro found that weaker fixer agents broke correct code — a regression that aggregate pass-rate numbers would obscure.

The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) table across 74 systems lists benchmarks as one of its filterable axes, reflecting that benchmark coverage has become a first-class criterion for evaluating infrastructure components. Meanwhile, [task-completion time-horizon research](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) constructs its own benchmark by measuring how long a task takes a human and whether a model completes it at 50% reliability — a framing that sidesteps leaderboard contamination by grounding capability claims in duration rather than problem-set identity.

The pattern across these sources is consistent: benchmark scores are proxies, and the proxy distance from the target behavior determines how misleading they are. The field has strong incentives to report high scores on available tests and weaker incentives to build tests for the behaviors that are actually hard to measure.
