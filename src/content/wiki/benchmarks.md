---
title: Benchmarks
summary: >-
  Benchmarks measure AI model and system capability, but a recurring finding
  across LLM, multi-agent, and vision-language research is that existing tests
  routinely measure the wrong things or fail to capture the behaviors that
  matter in production.
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
compiled_at: '2026-06-22T07:18:44.919Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6204
    output_tokens: 986
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
  cost_usd: 0.033402
last_source_added: '2026-07-01T01:52:07.468Z'
---
A benchmark is only as useful as the gap it exposes. Across the sources collected here, the most consistent finding is that benchmark scores routinely flatter: models look capable on standard tests while failing on the specific properties the tests were supposed to proxy.

The clearest case is multi-agent systems. [Meiklejohn's Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues directly that HumanEval, SWE-bench, and similar suites were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. When those numbers get applied to multi-agent pipelines, they tell you nothing about the things that actually break in production. That point is grounded empirically in [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), which surveys MAST, MAS-FIRE, and Silo-Bench: failure rates of 41-87% in deployed multi-agent systems, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. Good benchmarks had to be invented for the right failure mode.

The same mismatch appears in formal verification. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) tests LLMs on generating TLA+ specs from real system code and finds near-perfect syntax scores paired with only roughly 46% conformance and 41% invariant scores. Models pass surface-level tests because they recite textbook protocols; they fail deeper tests because they are not modeling the actual implementation.

Reasoning effort adds another dimension. A [hands-on benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five effort levels on 29 real tasks found a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while higher effort levels spend more without improving quality. That result matters because it shows that benchmark design choices, including what effort level to use and how to define a pass, can reverse apparent conclusions about which model or setting is best.

Task-completion horizons offer a different measurement frame. [Woodruff et al.](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure how long a human task a frontier model can complete at 50% reliability without chain-of-thought reasoning, finding GPT-5.5 handles roughly 3-minute tasks and that capability doubles roughly every year since 2019. This framing sidesteps capability-on-a-fixed-task benchmarks in favor of a horizon that scales with time.

Benchmarks also appear as a comparison axis in tooling. The [AI Memory Systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) lists benchmark support as one of its filterable columns across 74 systems, treating the presence or absence of benchmark results as a first-class property of a tool's maturity. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) positions its evaluation models partly on a benchmark metric: sub-100ms latency and 8x lower cost than GPT-as-judge.

The through-line is that benchmark numbers travel faster than the methodological caveats attached to them. When tests are reused outside their design scope, they measure familiarity with textbook examples, single-agent performance, or surface syntax rather than the reliability, coordination, and semantic fidelity that deployed systems actually require.
