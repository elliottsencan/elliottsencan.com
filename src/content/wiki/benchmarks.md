---
title: Benchmarks
summary: >-
  Benchmarks measure AI system performance, but across model capability,
  multi-agent coordination, and inference optimization, the gap between what
  benchmarks capture and what actually matters in production is a recurring
  problem.
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
compiled_at: '2026-06-23T01:23:41.527Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6425
    output_tokens: 989
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
  cost_usd: 0.03411
---
A benchmark is only as useful as its match to the thing being measured. Across several domains of current AI research, that match is poor in ways that produce misleading conclusions.

The clearest case is multi-agent systems. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single-agent evaluation and cannot measure coordination quality, communication overhead, or failure recovery. These are precisely the dimensions that distinguish multi-agent architectures from single-agent ones. The vocabulary survey in [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) notes that missing benchmarks are a recognized gap in the field's own taxonomy. Meanwhile, empirical work surveyed in [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) shows failure rates of 41-87% in production MAS deployments, numbers that existing benchmark suites did nothing to predict.

Formal verification presents a similar picture. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tested leading LLMs on generating TLA+ specifications from real system code and found near-perfect syntax scores alongside only ~46% conformance and ~41% invariant scores. High scores on surface correctness masked near-failure on semantic accuracy, because the benchmarks available rewarded form over fidelity to the actual implementation.

Token compression tools face the same criticism from a different angle. [Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that RTK's claimed 60-90% token savings are vanity metrics because the tool lacks task-accuracy benchmarks. Saving tokens means nothing if the downstream task suffers; without measuring that, the headline number is noise.

On the capability side, [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) benchmark frontier models on task-completion time horizons without chain-of-thought, finding GPT-5.5 handles roughly three-minute human tasks at 50% reliability, a capability that has doubled annually since 2019. The benchmark design here is careful to isolate a specific, measurable variable. Similarly, a hands-on benchmark of Claude Opus 4.7 at five reasoning-effort levels on 29 real tasks [found a non-monotonic curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort outperformed high, xhigh, and max on pass rate and cost-efficiency, a result that only emerged because the benchmark used real tasks rather than standard suites.

VLM progress tracking illustrates the volume problem. The [2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) covers dozens of model families across multimodal reasoning, video, and agentic tasks, each with its own benchmark suite. The proliferation makes cross-model comparison difficult and creates pressure to optimize for specific tests rather than general capability.

The pattern across these sources is consistent: benchmarks lag the systems they are meant to evaluate, and the lag is not random. Tests designed for earlier, simpler systems get reused for more complex ones, rewarding surface properties while missing structural failures.
