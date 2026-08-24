---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, adopted across coding assistants, enterprise governance
  layers, and specialized servers for domains from databases to Kubernetes.
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
compiled_at: '2026-08-24T18:51:09.573Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1150
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
  cost_usd: 0.030804
---
MCP (Model Context Protocol) is Anthropic's open standard for attaching tools, resources, and context sources to AI agents. What began as a mechanism for AI coding assistants to call external APIs has expanded into a contested architectural primitive with several distinct interpretations of what it is for.

The most skeptical reading comes from [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis), which argues MCP functions like a GUI: useful for non-programmers navigating structured interfaces, but wasteful for agents capable of calling APIs or running scripts directly. The token overhead and composability limits make MCP a poor fit for sophisticated agents. A contrasting view from [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) treats MCP tool servers as the right investment precisely because they let teams extend frontier agents like Claude Code without building custom orchestration loops.

In practice, MCP servers have proliferated across a wide range of domains. [Databricks Solutions](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python core library to bring platform expertise into coding assistants. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) includes MCP as a first-class surface for AI agents operating on Kubernetes clusters. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) uses an MCP server to deliver wavelet-transformed, multi-resolution source code views to LLMs with reduced token cost. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) exposes codebase intelligence including health scores and dead code detection through MCP. A Postgres MCP let [CrowdIntel](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) query 1.3 billion rows in plain English.

On the governance side, [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues MCP's real enterprise value is as a policy-aware, auditable proxy between agents and the resources they're permitted to access, something a CLI cannot provide at scale. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames MCP as one component inside a broader governance layer covering identity, policy enforcement, tool routing, and observability.

Distribution and packaging are still evolving. Anthropic's own [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) describes bundling a local MCP server as a single-click `.mcpb` file for Claude Desktop. A developer choosing between Ruby, Java, and TypeScript for a Claude plugin [ultimately shipped TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) for future MCP runtime compatibility. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) pairs an MCP server with a `.story/` directory to persist session context across stateless coding assistant sessions. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) operates as both a proxy and MCP server that compresses tool outputs before they reach the model, cutting token usage by 60 to 95 percent.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) treats MCP as a documentation delivery surface, serving structured knowledge to agents alongside human-readable docs. The Rust-based [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) agent integrates MCP and ACP together with subagents and a permission system at roughly 16 MB of RAM.
