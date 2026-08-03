---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools,
  data sources, and services; its adoption spans developer tooling, enterprise
  governance, and novel context-delivery mechanisms.
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
compiled_at: '2026-08-03T10:09:39.748Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4371
    output_tokens: 1117
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
  cost_usd: 0.029868
---
MCP (Model Context Protocol) is an open protocol that standardizes how AI agents communicate with external tools and data sources. Anthropic defined the spec and hosts the runtime, but the ecosystem is built by third parties shipping MCP servers, bundles, and proxies that plug into agents like Claude Code, Cursor, and Gemini CLI.

The clearest analogy for what MCP actually does comes from [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis): it is a GUI for AI agents, abstracting tool surfaces for agents that would otherwise need to discover and call raw APIs. That framing also contains the sharpest critique. For agents that can write code, MCP adds token cost and composability overhead that direct API or script access avoids. The debate is real. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes a more bullish position, arguing that teams should skip building custom orchestration and instead ship MCP servers and agent skills that extend frontier agents, letting Anthropic maintain the loop while the team focuses on domain context. Databricks embodies this in practice with [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), a composable toolkit exposing Databricks expertise via an MCP server.

On the governance side, [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues that MCP's real value proposition was never for terminal-comfortable developers at all. It is an auditable, policy-aware proxy sitting between agents and the resources they are allowed to touch, something CLIs cannot provide at enterprise scale. The [Speakeasy AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) puts this in structural terms: MCP is one piece of the governance layer enterprises need to unify identity, policy enforcement, tool routing, and observability across agents.

The range of things being built as MCP servers is wide. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce token-efficient structural context. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) delivers codebase intelligence, health scores, and architectural tracking over MCP. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as a proxy that compresses tool outputs before they reach the LLM, cutting token usage by 60-95%. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across coding sessions via MCP. A Postgres MCP let [CrowdIntel](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) query 1.3 billion Polymarket rows in plain English. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles MCP alongside a Kubernetes UI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) integrates MCP into documentation serving.

The packaging layer is also maturing. Anthropic's official [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to bundle a local MCP server into a single-click .mcpb file for Claude Desktop distribution. Language choice for implementing servers matters: one developer [compared Ruby, Java, and TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) and shipped TypeScript specifically for MCP runtime compatibility, even though Java felt most ergonomic to write.
