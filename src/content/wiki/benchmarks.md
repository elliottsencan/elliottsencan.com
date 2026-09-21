---
title: Benchmarks
summary: >-
  Benchmarks are measurement tools that prove less reliable than they appear:
  they routinely misrepresent real performance by testing the wrong things,
  using the wrong conditions, or optimizing metrics that don't survive contact
  with production.
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
compiled_at: '2026-09-21T21:46:38.642Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1056
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
  cost_usd: 0.036654
---
A benchmark is only as useful as the thing it measures, and across several domains the gap between what gets measured and what actually matters is wide enough to swallow meaningful conclusions.

The clearest case is multi-agent systems. [Meiklejohn's benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar coding benchmarks were designed for single-agent evaluation and cannot capture coordination quality, communication overhead, or failure recovery. When those numbers get cited to justify multi-agent architectures, they're answering a different question than the one being asked. The [MAS vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) reinforces this, noting that Chen et al.'s challenge levels expose how few benchmarks address the harder coordination problems, leaving "unevolved agents" and missing evaluation infrastructure as structural gaps in the field.

The problem extends beyond coordination research. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) benchmarks LLMs on generating TLA+ specifications from real system code, finding near-perfect syntax scores alongside only ~46% conformance and ~41% invariant correctness. Models pass the surface test by reciting textbook protocols rather than modeling actual implementations. Syntax compliance is easy to measure; semantic faithfulness is not, and the benchmark gap between the two is exactly where real failures live.

Similar inflation appears in tooling claims. [RTK's purported 60-90% token savings](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) are described as vanity metrics: the tool strips only Bash output and lacks task-accuracy benchmarks that would justify the reliability trade-off. Compression ratios are legible; downstream accuracy loss is not, so the legible number becomes the headline.

Even careful benchmarks can mislead by being right in the wrong conditions. A [hands-on test of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels finds a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality. The result contradicts the intuition that "more compute equals better output" and would be invisible to any benchmark that tested only one effort setting. Related: [the 5x fast_blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) shows that measured speedups are real in isolation, but [Breck's piece on performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) argues that attention thresholds, discrete capacity increments, and pipeline backpressure can make even order-of-magnitude improvements irrelevant in practice. A benchmark can be accurate and still not predict whether the improvement matters.

The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) surfaces a quieter version of the same problem: it covers 74 systems across architecture, data model, and search modes, but benchmarks appear as just one filterable column among many, suggesting that for most systems benchmark coverage is sparse or absent. [Plurai's evaluation tooling](/reading/2026-05/2026-05-04t235011-plurai) approaches this from the deployment side, auto-generating task-specific evaluation models to fill the gap where generic benchmarks don't apply.

Across these cases, the recurring pattern is the same: benchmarks optimized for measurability rather than validity tend to become the reality they were meant to describe, shaping what gets built and what gets ignored based on what's easy to score rather than what's hard to get right.
