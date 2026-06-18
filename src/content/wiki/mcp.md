---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, attracting both broad adoption and pointed criticism about
  token cost, composability limits, and where it fits relative to code-native
  agent architectures.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
aliases:
  - model-context-protocol
compiled_at: '2026-06-18T21:51:14.066Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3678
    output_tokens: 979
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
  cost_usd: 0.025719
---
The Model Context Protocol is a standard Anthropic introduced so that AI agents can discover and invoke external capabilities through a uniform interface. An agent-facing tool server advertises its capabilities via MCP, and the agent calls them without needing bespoke integration code for each system.

The protocol has genuine momentum. The NSA has endorsed it as part of AI tooling guidance [No, MCP is definitely not dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees), and practical tooling around it keeps expanding. Anthropic now supports packaging a local MCP server as a single-click `.mcpb` bundle for Claude Desktop, handling Node.js runtime bundling and user configuration in one installable file [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). That packaging story influenced at least one developer to choose TypeScript over Java for a Claude plugin, specifically to stay eligible for future MCPB support [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).

Not everyone is convinced MCP is the right abstraction for capable agents. Ajeesh Mohan argues it functions as a GUI for AI agents: constrained, token-expensive, and non-composable [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). Agents that can write code, the argument goes, are better served by layered scripts and direct API skills than by loading tool definitions into context each session. Aiyan takes a different angle, arguing teams should ship MCP tool servers rather than custom orchestration harnesses, because that way model improvements automatically benefit the integration rather than requiring rework [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat).

On the infrastructure side, Speakeasy frames MCP traffic as something that needs governance: identity, policy enforcement, and observability sitting between agents and every downstream system they reach [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Storybloq ships an MCP server specifically to solve cross-session context loss in AI coding, persisting tickets and handover state in a git-tracked `.story/` directory [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). WaveScope takes a different context problem and applies wavelet transforms through an MCP server to give LLMs a multi-resolution view of codebases, claiming up to 92% token reduction compared to grep or embedding retrieval [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Documentation platforms like Mintlify have added MCP support to serve structured knowledge to agents alongside human readers [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify).

The Val Town slow-mode post touches on MCP only implicitly, but its concern about agents that operate without human checkpoints applies directly to the agentic MCP use case [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). The protocol itself says nothing about when an agent should pause; that is a product and design question layered on top of it.
