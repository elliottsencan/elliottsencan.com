---
title: Benchmarks
summary: >-
  Benchmarks measure system performance, but across AI, multi-agent, and
  infrastructure contexts, they frequently mislead — measuring the wrong thing,
  omitting failure modes, or reporting numbers that don't survive contact with
  real workloads.
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
compiled_at: '2026-11-17T01:38:47.451Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6938
    output_tokens: 1100
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
  cost_usd: 0.037314
---
A benchmark is only as useful as what it actually measures. Across the sources here, a consistent pattern emerges: headline numbers look impressive, but the underlying methodology often fails to capture the properties that matter most in practice.

The clearest case is multi-agent systems. [Meiklejohn's benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. Using them to evaluate multi-agent systems produces numbers that look comparable but test the wrong things. The empirical picture from [Wave 2 research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reinforces this: MAST, MAS-FIRE, and Silo-Bench find multi-agent systems failing 41–87% of the time in production, failures that single-agent benchmarks wouldn't have surfaced.

The vocabulary gap compounds this. [Meiklejohn's taxonomy post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) shows that Chen et al.'s challenge levels expose missing benchmarks as a known gap in multi-agent research, not an oversight waiting to be corrected but a structural absence in how the field measures itself.

Similar issues appear in other domains. SysMoBench, described in [the TLA+ LLM study](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), benchmarks LLMs on generating formal specifications from real system code. Models score near-perfect on syntax but only around 46% on conformance and 41% on invariants, because they recite textbook protocols rather than faithfully modeling actual implementations. High syntax scores would look like success on a simpler benchmark.

The token compression critique in [the RTK skepticism piece](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) names the same problem more bluntly: claimed 60–90% token savings are vanity metrics because they measure compression without task-accuracy benchmarks that would reveal what gets lost. A metric without an error measure is not a benchmark, it is marketing.

Even well-designed benchmarks have limits. [The Opus 4.7 reasoning curve study](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds a non-monotonic result across five effort levels on 29 real tasks: medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality. That result only became visible because the evaluation used real tasks rather than a fixed capability test. [The task-completion time horizons paper](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) similarly constructs a benchmark specifically around no-chain-of-thought conditions to surface a capability curve invisible to standard evaluations.

The infrastructure side adds a different caveat. [Colin Breck's post on performance gains](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) argues that even valid benchmark improvements — genuine order-of-magnitude speedups — often fail to change outcomes because of attention thresholds, discrete capacity increments, and pipeline backpressure. A benchmark number can be real and still not matter.

Taken together, the sources point toward three failure modes: measuring a proxy instead of the target property, measuring the right property but under conditions that don't reflect deployment, and measuring correctly but in a system where the bottleneck lies elsewhere. The [AI memory systems comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) includes benchmarks as one of its filterable axes alongside architecture and search modes, treating benchmark coverage itself as a feature worth comparing — a small signal that the field is starting to audit what its measurements actually cover.
