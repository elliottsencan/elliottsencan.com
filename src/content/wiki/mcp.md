---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a protocol for exposing tools and context to AI agents, debated as
  either a composable integration layer worth building around or a constrained,
  token-expensive interface that code-capable agents may outgrow.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-30t231435-mintlify
compiled_at: '2026-05-03T19:05:05.596Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1390
    output_tokens: 516
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
  cost_usd: 0.01191
---
MCP (Model Context Protocol) gives AI agents a standardized way to discover and invoke tools, query context, and interact with external systems. In practice, it shows up as a server that exposes capabilities a host agent can call at runtime.

The case for building around MCP centers on positioning. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration harnesses decay with every model upgrade, while MCP tool servers and agent skills appreciate in value as frontier models improve. On that view, shipping an MCP server is how a platform makes itself legible to agents like Claude Code without betting on any one orchestration layer.

MCP also extends into documentation. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) treats MCP as a first-class delivery mechanism alongside llms.txt, letting documentation platforms serve structured knowledge directly to agents rather than relying on unstructured web retrieval.

The skeptical read comes from [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis), which frames MCP as the GUI of the agent era: useful for humans navigating tools visually, but costly for agents that must load tool definitions into context each session. Agents capable of writing code, the argument goes, are better served by layered scripts and direct API calls than by MCP abstractions. The GUI analogy is deliberately pointed: GUIs are not wrong, but they are not the native interface for programmatic consumers.

The tension between these positions is real. MCP solves a discovery and standardization problem that matters at ecosystem scale. Whether that standardization is worth the token overhead depends on what the agent is doing and how much of its context budget tool definitions consume.
