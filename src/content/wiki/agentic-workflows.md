---
title: Agentic workflows
summary: >-
  Design patterns for AI agents acting across multi-step tasks, covering how
  tool access, memory, orchestration topology, and coordination overhead shape
  whether an agent system works in practice.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
compiled_at: 2026-05-04T03:36:22.698Z
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2645
    output_tokens: 604
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
  cost_usd: 0.016995
---
Agentic workflows are pipelines in which an AI model takes sequences of actions, using tools, memory, and external services, to complete tasks that unfold over multiple steps. The design decisions made at each layer, tool access, memory architecture, [orchestration topology, and observability](/wiki/systems-design), determine whether the system performs reliably or compounds failures.

Tool access is not free. [Your Agent Loves MCP](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that loading MCP tool definitions into context each session is [expensive in tokens and non-composable](/wiki/context-engineering), analogous to forcing a programmer to read a GUI manual before every task. Agents that can write code are better served by layered scripts and API skills that persist outside the context window.

Orchestration topology carries a coordination tax that is easy to underestimate. [Research surveyed by Ben Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) drawing on Stanford and Google/MIT work shows that multi-agent setups can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x compared with single-agent baselines. Single-agent systems should be the default; multi-agent architectures are justified only when tasks genuinely decompose into parallel, independent subtasks.

Memory is a persistent design problem. The [hindsight library](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) addresses this with biomimetic data structures and [multi-strategy retrieval](/wiki/retrieval-augmented-generation), letting agents build mental models that survive across sessions rather than relying on conversation recall alone. The [openagentd project](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) takes a systems approach, pairing three-tier persistent memory with built-in OpenTelemetry observability so that agent behavior across a local multi-agent team can be traced and debugged like any other service.

Taken together, the pattern across these sources is that agentic workflows fail at the seams: tool loading, inter-agent handoffs, and memory gaps. Engineering around those seams, rather than adding more agents or more tools, is where reliability is won.
