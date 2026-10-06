---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, functioning as both a packaging standard for tool servers
  and a governance boundary between agents and the systems they touch.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-20t145835-chopratejasheadroom
  - 2026-06/2026-06-23t232444-repowise-devrepowise
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
aliases:
  - model-context-protocol
compiled_at: '2026-10-05T23:56:09.220Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1181
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
  cost_usd: 0.031269
---
The Model Context Protocol gives AI agents a standardized interface for reaching outside the model: querying databases, calling services, reading files, inspecting infrastructure. Where HTTP and REST standardized how software talks to software, MCP does the same for the boundary between a language model and the world it acts on.

At its simplest, an MCP server is a thin wrapper that exposes some capability in a form agents can invoke. The Databricks AI Dev Kit [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships one alongside markdown skills and a Python core library, targeting Claude Code, Cursor, and Gemini CLI. Repowise [repowise-dev/repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) wraps codebase health analysis. WaveScope [wavelet-based context](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) uses a wavelet transform over source code to produce multi-resolution structural views without language-specific parsers. A Postgres MCP let one author query 1.3 billion Polymarket rows in plain English [Claude Code + MCP on 1.3B Polymarket Trades](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades).

Anthropics own tooling formalizes the distribution story. The .mcpb bundle format packages a local server and its Node.js runtime into a single-click install for Claude Desktop [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). One developer chose TypeScript over Ruby or Java specifically for future MCP runtime compatibility [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).

The more contested question is what MCP is actually for. One view holds that MCP is a GUI for agents: useful scaffolding when you can't write code directly against an API, but wasteful for agents that can [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). A contrasting view argues the real value is enterprise governance: MCP sits as a policy-aware, auditable proxy between agents and resources, providing something a terminal or direct API call cannot offer at scale [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). The Speakeasy AI control plane architecture treats MCP as one element of a broader governance layer covering identity, policy enforcement, and observability [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

A third perspective treats MCP as the right abstraction for teams building agent-accessible products. Rather than maintaining a custom orchestration loop, ship an MCP tool server and let frontier agents like Claude Code handle execution [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Documentation platforms like Mintlify [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) and infrastructure UIs like Radar [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) have adopted the same pattern: expose your domain context through MCP so agents can consume it directly.

Token cost runs as a practical concern across multiple sources. Headroom [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs before they reach the model, reporting 60-95% reductions. Storybloq [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs so agents accumulate knowledge rather than re-deriving it each time. These are symptoms of MCP's open-ended nature: the protocol imposes no limits on what a server returns, so callers must manage the cost themselves.
