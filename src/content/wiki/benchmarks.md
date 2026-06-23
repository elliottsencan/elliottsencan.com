---
title: Benchmarks
summary: >-
  Benchmarks measure AI model and system performance, but recurring evidence
  across LLM, multi-agent, and vision model research shows that most existing
  benchmarks measure the wrong things or mislead through methodological
  mismatch.
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
compiled_at: '2026-06-23T01:56:48.617Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6425
    output_tokens: 1051
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
  cost_usd: 0.03504
---
A benchmark is only useful if it measures what you actually care about. Across multiple domains of AI research, a common pattern emerges: numbers go up, but the numbers being measured do not correspond to the properties that matter in practice.

The clearest statement of this problem comes from multi-agent systems research. Christopher Meiklejohn [argues directly](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. When MAS researchers report benchmark scores on these suites, they are measuring something real but irrelevant: individual task completion, not the inter-agent behavior that distinguishes multi-agent systems from single-agent ones. The same series notes that the 2025 wave of empirical MAS papers, including MAST, MAS-FIRE, and Silo-Bench, found failure rates of 41-87% in production [conditions](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — numbers that standard benchmarks would not surface.

SysMoBench offers a parallel example in formal verification. The [study](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that leading LLMs score near-perfect on TLA+ syntax but only around 46% on conformance and 41% on invariant correctness. Models pass the easy metric while failing the meaningful one: they recite textbook protocol patterns rather than faithfully modeling the actual implementation they were given.

For vision language models, benchmark inflation is a structural concern. The [2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) notes rapid progress across standard leaderboards as models grow smaller and more capable, but the diversity of task types, from video understanding to agentic tool use, means no single benchmark captures the full capability profile.

Even carefully constructed benchmarks can mislead when the evaluation methodology does not match deployment conditions. A [hands-on benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels found a non-monotonic curve: medium effort outperformed higher settings on pass rate, code review quality, and cost-efficiency. The implication is that benchmarking at a single effort level, or assuming more compute means better results, produces a distorted picture.

Similarly, token compression tooling [has been criticized](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) for reporting vanity metrics, specifically claimed 60-90% token savings, without any task-accuracy benchmarks that would indicate whether the compression preserves information needed for downstream performance.

The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) table covering 74 systems includes benchmarks as one filterable axis, reflecting that the field has recognized benchmark coverage as a first-order quality signal when evaluating infrastructure components. The [no-CoT task horizon study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) takes a different approach, defining benchmark tasks by estimated human completion time to ground capability claims in something observable, finding GPT-5.5 handles roughly 3-minute tasks at 50% reliability.

The recurring problem is not that benchmarks are useless but that they are easy to optimize for independently of the target behavior. Good benchmark design requires specifying the failure modes you care about, measuring in conditions that match deployment, and resisting the pull toward metrics that are clean to report but decoupled from actual system quality.
