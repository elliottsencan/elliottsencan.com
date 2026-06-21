---
title: Benchmarks
summary: >-
  Benchmarks measure AI model performance, but across LLM reasoning, multi-agent
  systems, and formal specification tasks, the cited sources converge on a
  recurring problem: most benchmarks measure the wrong thing.
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
compiled_at: '2026-06-21T20:14:09.248Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6006
    output_tokens: 977
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
  cost_usd: 0.032673
---
A benchmark is only as useful as its alignment with what you actually care about. Across several domains, the evidence here points to a consistent gap between what benchmarks measure and what matters in practice.

The clearest case comes from multi-agent systems. [Meiklejohn's benchmarks post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues directly that HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. These are precisely the properties that distinguish multi-agent systems from single-agent ones. The vocabulary post in the same series [notes missing benchmarks](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) as a named gap in the field's taxonomy. Wave 2 empirical work fills some of that gap: MAST, MAS-FIRE, and Silo-Bench report failure rates of 41-87% in production settings, [a picture invisible to single-agent benchmarks](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The TLA+ study surfaces a related mismatch. SysMoBench tests LLMs on generating formal specs from real system code and finds near-perfect syntax scores alongside only ~46% conformance and ~41% invariant scores [across leading models](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Models recite textbook protocols rather than faithfully modeling actual implementations. Syntax correctness, the easy thing to measure, says almost nothing about semantic fidelity, the thing that matters.

Even within a single model, benchmark design shapes conclusions. A hands-on test of Claude Opus 4.7 across five reasoning-effort levels on 29 real tasks found [a non-monotonic curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort won on pass rate, equivalence, code review, and cost-efficiency, while higher settings spent more without improving quality. A benchmark that only tested at maximum effort would misrepresent the model's practical cost-performance profile entirely.

Capability tracking over time faces its own version of the problem. Woodruff et al. estimate no-CoT task-completion horizons for frontier models, finding GPT-5.5 handles roughly 3-minute human tasks at 50% reliability, [a figure doubling approximately every year since 2019](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier). The metric is deliberately narrow to stay interpretable, but the authors flag that CoT-based monitoring assumptions may not hold as capabilities grow.

The AI memory systems comparison table [benchmarks 74 systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) across architecture, data model, search modes, and knowledge lifecycle — a case where breadth of criteria is the point, since no single axis captures the tradeoff space. Similarly, the CanItRun tool [translates hardware specs into estimated tokens-per-second](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm), a practical benchmark proxy for users who care about deployment feasibility more than leaderboard position.

The pattern across these sources: benchmark numbers travel faster than benchmark limitations, and the gap between measured property and target property tends to widen as systems grow more complex.
