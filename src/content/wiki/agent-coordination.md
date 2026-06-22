---
title: Agent coordination
summary: >-
  How multiple LLM agents divide work, share state, and recover from failure — a
  problem the field underestimated in 2023 and is still struggling to solve
  reliably in production.
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
compiled_at: '2026-06-22T02:35:44.179Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3653
    output_tokens: 964
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
  cost_usd: 0.025419
---
Agent coordination is the set of mechanisms that let multiple LLM-based agents work together without producing worse results than a single agent working alone. Christopher Meiklejohn's eight-part series maps how the field has approached this problem across two research waves [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the).

The 2023 wave — CAMEL, ChatDev, MetaGPT, AutoGen, Generative Agents — established that coordination was possible at all. These systems used role assignment, structured dialogue, and pipeline sequencing to split tasks across agents. But they shared critical omissions: no concurrency control, no escalation paths when an agent stalled, and no formal model of shared state [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The 2025 wave measured the cost of those omissions. MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87% in production scenarios, with inter-agent reasoning failures proving structurally harder to fix than prompt-level errors [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The coordination structure itself matters as much as the agents it connects. Convergent debate, adversarial debate, and shared-notebook state each suit different task types, and applying the wrong structure degrades output quality. The CALM theorem formalizes one slice of this: some coordination patterns are provably safe under certain consistency conditions [Part 5](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate). Meiklejohn's taxonomy draws on Tran et al.'s four-axis typology and Chen et al.'s challenge levels to expose a gap the early systems ignored: agents that do not evolve mid-task and systems that have no recovery path when a subtask fails [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the).

Benchmarks used to evaluate these systems largely miss coordination quality. HumanEval and SWE-bench were designed for single agents and measure task completion, not communication overhead, handoff fidelity, or failure recovery [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). This makes published numbers hard to compare and obscures whether improvements come from better coordination or from stronger base models.

The practical case against multi-agent coordination is direct. Ben Dickson, drawing on Stanford and Google/MIT research, argues that orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, recommending single-agent designs as the default [single vs. multi-agent](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Meiklejohn does not dispute that cost; his open-questions post frames the unsolved problems — topology-to-reliability mapping, CRDTs for shared state, backpressure protocols — as distributed systems problems the field is rediscovering without the vocabulary to name them [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).
