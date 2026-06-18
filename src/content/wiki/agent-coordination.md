---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, share state, and handle failures — a
  problem the field is solving empirically while quietly rediscovering
  distributed systems theory.
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
compiled_at: '2026-06-18T22:58:48.494Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3823
    output_tokens: 773
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
  cost_usd: 0.023064
---
Agent coordination is the set of mechanisms by which multiple AI agents divide tasks, communicate results, and recover from failures. Christopher Meiklejohn's eight-part series on multi-agent systems treats it as the central unsolved problem of the field, tracing two research waves that reframe what coordination actually requires.

The 2023 wave — covering CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen — demonstrated that LLM agents could coordinate at all [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Those systems shared a common set of failure modes: no concurrency control, no escalation paths when agents deadlock or loop, and no principled model for shared state. The 2025 empirical wave measured the damage. MAST, MAS-FIRE, and Silo-Bench found failure rates of 41–87% in production, with inter-agent reasoning failures proving structurally harder to fix than prompt-level issues [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Part 5 of the series surveys coordination patterns directly: convergent debate, adversarial debate, shared-notebook state, and the CALM theorem [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). The core argument is that coordination structure must match task structure. A task requiring consensus needs a different topology than one requiring parallel decomposition. The CALM theorem, borrowed from distributed systems, offers a formal handle on when coordination is even necessary.

The benchmarking literature makes this harder to measure than it should be. HumanEval and SWE-bench were designed for single agents and cannot capture coordination quality, communication overhead, or failure recovery [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). Open questions include topology-to-reliability mappings, CRDTs for shared agent state, and backpressure protocols for overloaded subagents [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

A practical counterweight: Ben Dickson's summary of Stanford and Google/MIT research argues that multi-agent orchestration carries a hidden coordination tax, amplifying errors up to 17x and cutting tool-handling efficiency by 2–6x compared to single-agent baselines [How to Choose](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). The implication is that coordination mechanisms only pay off when the task genuinely requires parallelism or specialization that a single agent cannot provide.
