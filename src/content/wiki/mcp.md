---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a protocol for exposing tools and context to AI agents; sources debate
  whether it is the right abstraction layer, a strategic moat, or a limiting
  constraint analogous to a GUI.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-30t231435-mintlify
aliases:
  - mcp-server
compiled_at: '2026-05-04T03:35:41.359Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2455
    output_tokens: 503
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
  cost_usd: 0.01491
---
MCP (Model Context Protocol) standardizes how AI agents discover and invoke external tools and context at runtime. Three sources frame it differently, and the tension between them is instructive.

[Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is to agents what a GUI is to humans: a constrained, token-expensive interface that must be reloaded each session and cannot be composed across tools without explicit orchestration. The analogy carries a pointed critique. An agent capable of writing code is better served by layered scripts and API skills than by MCP tool definitions occupying context window on every call.

[Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes the opposite position on the strategic question. Rather than building custom LLM orchestration harnesses that break with each model upgrade, teams should ship MCP tool servers that give frontier agents platform-specific context and actions. On this view, model improvements become a benefit rather than a maintenance cost, because the integration surface is protocol-defined rather than harness-defined.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) treats MCP as infrastructure for serving documentation to both humans and LLMs, alongside llms.txt and context-aware agents. That use case sidesteps the token-cost objection somewhat: documentation is already declarative context, and MCP gives agents a structured path to retrieve it on demand.

The disagreement is partly about use case. For action-heavy, code-capable agents, MCP's overhead may outweigh its interoperability gains. For teams exposing platform knowledge or capabilities to agents they do not control, a protocol boundary is precisely the point.
