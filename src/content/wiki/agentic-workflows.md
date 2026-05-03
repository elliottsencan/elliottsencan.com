---
title: Agentic workflows
summary: >-
  Design choices in agentic AI systems, where single-vs-multi-agent tradeoffs
  and tool-access patterns each carry hidden costs that compound as task
  complexity grows.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
compiled_at: '2026-05-03T19:05:46.757Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1303
    output_tokens: 459
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
  cost_usd: 0.010794
---
Agentic workflows are AI systems where a model takes sequences of actions, calls tools, and produces outputs with minimal human intervention per step. The architectural decisions made at setup, which tools to expose and whether to use one agent or many, have costs that are easy to underestimate.

On the tool side, [MCP as a GUI for agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that Model Context Protocol is to agents what a GUI is to humans: a constrained, discoverable interface that is not optimal for a capable operator. Loading MCP tool definitions into context each session is token-expensive and non-composable. Agents that can write and run code are better served by layered scripts and API skills built outside the context window, called only when needed. The GUI analogy is pointed: just as a power user reaches past the interface to the underlying system, a capable agent should reach past MCP to more efficient primitives.

On the orchestration side, [research surveyed by Dickson](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) drawing on Stanford and Google/MIT work finds that multi-agent systems introduce a coordination tax that is rarely justified. Errors can amplify up to 17x across agent boundaries, and tool-handling efficiency drops 2 to 6x compared to single-agent setups. The recommendation is to treat single-agent systems as the default and only add orchestration when the task genuinely cannot be handled in one context.

Together these sources point toward a conservative design principle: add complexity, whether in tool surface or in agent count, only when simpler structures demonstrably fail.
