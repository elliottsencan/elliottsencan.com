---
title: Benchmarks
summary: >-
  Benchmarks measure AI and software performance, but the sources collectively
  show a recurring gap between what benchmarks capture and what actually matters
  in production systems.
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
compiled_at: '2026-07-09T14:09:07.060Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6773
    output_tokens: 1098
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
  cost_usd: 0.036789
---
A benchmark is only as useful as the thing it measures. Across AI systems, LLM evaluation, and software optimization, the sources here converge on one recurring finding: the metric that is easy to compute tends to diverge from the outcome that matters.

The clearest statement of this comes from the multi-agent systems series by Christopher Meiklejohn. [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure the things that distinguish multi-agent systems: coordination quality, communication overhead, or failure recovery. Using those numbers to evaluate MAS behavior is not a conservative estimate; it is a category error. [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) reinforces this, showing that the field's shared taxonomic vocabulary exposes gaps including missing benchmarks for unevolved agents.

SysMoBench, described in [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), illustrates a similar split. LLMs score near-perfect on syntax when generating TLA+ specs, but only around 46% on conformance and 41% on invariants. High scores on what is easy to check (syntax) hide near-failure on what actually matters (faithful modeling of real implementations).

The Opus 4.7 reasoning-effort benchmark at [stet.sh](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) is instructive for a different reason. Running 29 real GraphQL-go-tools tasks across five effort levels, it finds a non-monotonic curve: medium effort outperforms high, xhigh, and max on pass rate, equivalence, code-review quality, and cost. Benchmarks designed around a single axis (more compute equals better output) miss this curvature entirely.

The AI memory system comparison [table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison), which spans 74 systems, lists benchmarks as one of its filterable columns alongside architecture, data model, and search modes. The implicit point is that benchmark coverage is patchy enough to be worth surfacing as a comparison dimension on its own.

Token compression claims face the same problem. [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that RTK's 60-90% token-savings figures are vanity metrics: the tool only strips Bash output and lacks task-accuracy benchmarks that would justify the reliability trade-off. A metric that counts tokens saved says nothing about whether the task still completes correctly.

Task-completion time horizons offer a more grounded benchmark design. [Estimating No-CoT Task-Completion Time Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measures how long a task takes a human and asks at what reliability rate frontier LLMs can complete equivalent tasks without chain-of-thought. GPT-5.5 reaches 50% reliability on roughly 3-minute tasks. The benchmark is anchored to real-world effort rather than curated test suites.

The performance-gains caveat from [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) applies broadly: even a 20x speedup on a benchmark number can fail to change outcomes if the gain falls below an attention threshold, hits discrete capacity limits, or is absorbed by pipeline backpressure. A benchmark result exists in a system, and systems have constraints that the benchmark ignores.

What unites these cases is not that benchmarks are useless but that they are proxies, and every proxy has a population of situations where it fails to track what it claims to track. The useful question is always: what specifically does this benchmark measure, and what is it structurally unable to see?
