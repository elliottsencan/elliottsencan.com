---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, share state, and handle failures — a
  problem the field is still learning to frame, let alone solve.
sources:
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
compiled_at: '2026-06-20T22:09:07.707Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3653
    output_tokens: 783
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
  cost_usd: 0.022704
---
Coordination in multi-agent LLM systems is the problem of getting independent agents to produce coherent collective output: deciding who does what, how results are shared, and what happens when something goes wrong. Christopher Meiklejohn's eight-part series traces the field from its 2023 origins through 2025 empirical reckoning, and the arc is not flattering.

The first wave of systems — CAMEL, MetaGPT, AutoGen, and others — proved that agents could coordinate at all, but left the hard infrastructure problems unaddressed [Getting Up to Speed Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). No concurrency control, no escalation paths, no failure recovery. The second wave measured the cost: empirical work including MAST and MAS-FIRE found failure rates of 41–87% in production, with inter-agent reasoning failures proving structurally harder to fix than prompt-level issues [Getting Up to Speed Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Coordination structure matters to outcome. Convergent debate, adversarial debate, and shared-notebook state each suit different task types, and matching the wrong structure to a task is a reliable path to failure [Getting Up to Speed Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). The open questions post names specific gaps: topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — formalisms already developed in distributed systems that MAS research is quietly rediscovering [Getting Up to Speed Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

Benchmarks make this harder to see clearly. HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [Getting Up to Speed Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). The numbers in most MAS papers describe task completion, not coordination health.

The practical implication is that coordination is a tax, not a free capability. Stanford and Google/MIT research cited by Dickson found that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2–6x relative to single-agent baselines [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). The default for most tasks should be a single agent; multi-agent coordination is justified only when the task genuinely cannot fit within one context or requires parallel specialization that outweighs the overhead.
