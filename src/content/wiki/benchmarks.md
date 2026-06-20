---
title: Benchmarks
summary: >-
  Benchmarks measure AI model and system performance, but across vision models,
  multi-agent systems, LLM inference, and formal verification, cited sources
  show benchmark design routinely fails to capture the variables that matter
  most in practice.
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
compiled_at: '2026-06-20T12:41:38.760Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6006
    output_tokens: 933
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
  cost_usd: 0.032013
---
A benchmark is only as useful as the questions it asks. Across several domains in current AI research, the recurring problem is that standard tests measure what is easy to quantify rather than what actually differentiates good systems from bad ones.

The clearest case is multi-agent systems. [Meiklejohn's benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. When applied to multi-agent pipelines, they produce numbers that look comparable to single-agent scores while hiding the coordination tax. [Related empirical work surveyed in Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts failure rates at 41-87% in production, a gap that benchmark-optimized systems would never reveal. [Ben Dickson's analysis](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) adds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x relative to single-agent baselines, losses that aggregate benchmarks obscure.

Formal verification benchmarks reveal a different failure mode. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests LLMs on generating TLA+ specs from real system code and finds near-perfect syntax scores alongside only ~46% conformance and ~41% invariant scores. Models pass the easy part and fail the meaningful part; they recite textbook protocol patterns rather than modeling the actual implementation under test.

On the inference side, [a hands-on benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels on 29 real tasks finds a non-monotonic curve: medium effort wins on pass rate, equivalence, code review, and cost-efficiency. Higher settings spend more without improving quality. This challenges any benchmark methodology that treats more compute as a monotonic proxy for better output.

Vision language model progress adds further nuance. [The 2025 VLM survey](/reading/2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger) documents rapid capability gains across architectures and tasks, but notes that benchmark headroom has shrunk as models saturate existing tests, pushing evaluation toward video understanding and agentic tasks where metrics are still unsettled.

[Meiklejohn's vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) makes the structural point explicit: taxonomic gaps in MAS research, including unevolved agents and missing coordination benchmarks, reflect the absence of agreed measures rather than the absence of real phenomena. You cannot benchmark what you have not yet named.

The practical upshot is that benchmark scores require scrutiny of scope. A score on HumanEval does not transfer to multi-agent coordination. A high syntax score in TLA+ generation does not imply semantic faithfulness. A top reasoning-effort setting does not imply top results. Benchmarks narrow the question to produce an answer; the risk is mistaking that answer for a broader verdict.
