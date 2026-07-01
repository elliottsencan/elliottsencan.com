---
title: Benchmarks
summary: >-
  Benchmarks in AI and software measure capability, but the sources collectively
  show a recurring gap between what tests measure and what actually matters in
  production systems.
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
compiled_at: '2026-07-01T00:34:29.237Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6616
    output_tokens: 1002
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
  cost_usd: 0.034878
---
A benchmark is only as useful as the thing it measures. Across these sources, a consistent pattern emerges: benchmarks that were designed for one context get applied to another, and the numbers that result obscure more than they reveal.

The clearest indictment of benchmark misuse comes from the multi-agent systems domain. Meiklejohn's series argues at length that HumanEval, SWE-bench, and similar tests were built for single-agent code generation and simply cannot capture the coordination quality, communication overhead, or failure recovery that define whether a multi-agent system actually works [Getting Up to Speed, Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). A system can score well on SWE-bench while failing in production at rates between 41% and 87%, as the empirical Wave 2 papers (MAST, MAS-FIRE, Silo-Bench) document [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). The vocabulary paper notes that even the taxonomic frameworks used to describe multi-agent systems expose benchmark gaps — unevolved agents and missing coordination metrics are structural absences, not oversights [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the).

The same problem surfaces in formal verification. SysMoBench tests leading LLMs on generating TLA+ specifications from real system code and finds near-perfect syntax scores alongside only ~46% conformance and ~41% invariant correctness [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Models that recite textbook protocols look good on surface metrics while failing at the task that actually matters: faithfully modeling a specific implementation. Syntactic correctness is easy to benchmark; semantic fidelity is not.

Benchmarks also interact poorly with capability curves that are non-monotonic. A hands-on test of Claude Opus 4.7 across five reasoning-effort levels on 29 real tasks finds that medium effort outperforms high, xhigh, and max on pass rate, equivalence, and cost-efficiency [Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). If a benchmark reports only peak performance, it misses the shape of the curve.

Vanity metrics are a related failure mode. RTK's claimed 60-90% token savings strip Bash output but lack any task-accuracy benchmark that would justify the reliability trade-off in agent pipelines [Token Compression](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). Token count is easy to measure; task outcomes are not, and that asymmetry is what makes surface metrics attractive.

Some tools are making benchmark coverage more visible. The AI memory systems comparison table indexes 74 systems across architecture, data model, search modes, and benchmark support, making the presence or absence of evaluation data filterable [AI Memory Systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison). Estimating no-CoT task-completion horizons across frontier models offers a longitudinal capability benchmark with safety implications, finding a doubling roughly every year since 2019 [No-CoT Horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier).

The through-line is that benchmark numbers earn trust only when the measured property matches the property you care about. When that alignment breaks, high scores become misleading signals rather than useful ones.
