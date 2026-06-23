---
title: Benchmarks
summary: >-
  Benchmarks measure AI model capability, but across multi-agent systems, LLM
  reasoning, and specialized tasks, the cited sources collectively show that
  existing tests routinely measure the wrong things or produce numbers that
  mislead more than they inform.
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
compiled_at: '2026-06-23T23:18:20.458Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6425
    output_tokens: 997
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
  cost_usd: 0.03423
---
A benchmark is only as useful as its alignment with what actually matters in production. Across several domains represented in these sources, the gap between what benchmarks claim to measure and what they actually capture turns out to be substantial.

For multi-agent systems, the problem is structural. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues directly that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. These are exactly the properties that distinguish multi-agent architectures, so high scores on those benchmarks say little about whether a MAS will hold up. The empirical picture from [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: MAST, MAS-FIRE, and Silo-Bench found failure rates of 41-87% in production systems, a range that single-agent benchmarks gave no warning of.

The TLA+ case offers a different flavor of benchmark gap. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that leading LLMs achieve near-perfect syntax scores but only around 46% conformance and 41% invariant scores when generating TLA+ specs from real system code. The models recite textbook protocol shapes rather than faithfully modeling actual implementations. Surface correctness and semantic correctness come apart cleanly here.

Even within a single model family, benchmark design choices shape what gets measured. A hands-on test of Claude Opus 4.7 across five reasoning-effort levels on 29 real GraphQL tasks found a non-monotonic curve: [medium effort outperformed high, xhigh, and max](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) on pass rate, equivalence, code review, and cost efficiency. Without task-specific benchmarks, the natural assumption would be that more compute means better results.

The token-compression space shows similar dynamics. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) identifies claimed 60-90% token savings as vanity metrics because the tool only strips Bash output and offers no task-accuracy benchmarks. A compression ratio without a downstream quality measurement is not a benchmark, it is a size statistic.

On the capability-measurement side, [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) take a deliberate approach: measuring task-completion time horizons for frontier models without chain-of-thought, finding GPT-5.5 handles roughly three-minute human tasks at 50% reliability, with a doubling cadence of about one year since 2019. Framing capability in task-time units rather than accuracy scores gives the number a more concrete referent.

The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) includes benchmarks as one of its filterable columns across 74 systems, treating benchmark coverage as a feature dimension worth tracking in its own right, which signals that presence or absence of benchmarking is itself informative about system maturity.

The through-line across these cases: a benchmark inherits the assumptions of its designers. When those assumptions stop matching the deployment context, the numbers persist in being cited long after they have stopped being meaningful.
