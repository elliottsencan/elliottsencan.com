---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, adopted across coding assistants, enterprise governance
  layers, documentation platforms, and specialized servers.
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
aliases:
  - model-context-protocol
compiled_at: '2026-08-10T19:03:51.954Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4371
    output_tokens: 1127
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
  cost_usd: 0.030018
---
Model Context Protocol (MCP) is an open standard, developed by Anthropic, that defines how AI agents discover and call external tools. It has moved fast from a niche developer curiosity to infrastructure that shows up in coding assistants, enterprise control planes, documentation platforms, and specialized data servers.

The most concrete adoption pattern is the MCP server: a process that exposes tools over the protocol so any compliant agent can call them. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships exactly this, combining an MCP server with markdown skills and a Python library so Databricks expertise reaches Claude Code, Cursor, and Gemini CLI without rebuilding per-tool integrations. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) exposes codebase health and architectural tracking through the same protocol. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) goes further, applying wavelet transforms to source code and serving multi-resolution structural views as token-efficient context through an MCP server. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) acts as a proxy and MCP server that compresses tool outputs before they reach the LLM, cutting token use by 60-95%.

Anthropics own tooling formalizes distribution: the [.mcpb bundle format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages a local MCP server as a single-click install for Claude Desktop, complete with Node.js runtime bundling and a Connectors Directory. [One developer](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) evaluated Ruby, Java, and TypeScript for a Claude plugin and chose TypeScript specifically for forward compatibility with MCP runtimes.

On the enterprise side, [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues the protocol's real value is governance: an auditable, policy-aware proxy between agents and the resources they touch, which terminal CLIs cannot provide at scale. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames MCP as one layer inside a broader governance stack covering identity, policy enforcement, and observability across all agent calls.

Platform builders have adopted it as an extension surface. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation context to agents via MCP. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) exposes Kubernetes topology to AI agents through it. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses an MCP server to persist coding session context across stateless assistant sessions. A [Polymarket analysis](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) connected Claude Code to a 1.3-billion-row Postgres ledger via a Postgres MCP server and queried the full trade history in plain English.

Two sources push back on unreflective adoption. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is effectively a GUI for agents: useful when no API exists, but wasteful when agents could write code directly against APIs, with token costs and composability problems as the price. [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes the complementary point that teams should ship MCP tool servers rather than build custom orchestration loops, letting frontier agents like Claude Code handle the loop while the team invests in domain-specific tools and APIs instead.
