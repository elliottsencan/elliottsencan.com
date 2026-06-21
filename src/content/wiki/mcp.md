---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools and data
  sources, with growing adoption across developer tooling, enterprise
  governance, and coding assistants.
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
aliases:
  - model-context-protocol
compiled_at: '2026-06-21T20:19:42.603Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4064
    output_tokens: 955
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
  cost_usd: 0.026517
---
MCP is a standardized protocol that lets AI agents call external tools, APIs, and data sources through a common interface. Anthropic introduced it, and the .mcpb packaging format described in their [official guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how far the distribution story has matured: a developer can now ship a local MCP server as a single-click bundle to Claude Desktop's Connectors Directory.

The bulk of MCP adoption shows up in developer tooling. Databricks ships an [AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) that wraps platform expertise in an MCP server consumed by Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses an MCP server to persist coding session context across runs. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) exposes wavelet-compressed code structure through MCP so LLMs get multi-resolution views without language-specific parsers. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles MCP into a Kubernetes UI so agents can query live cluster state. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as an MCP proxy that compresses tool outputs before they reach the model. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) adds MCP support to documentation so both humans and agents can consume the same knowledge base.

Two pieces address MCP's strategic position and disagree on who the primary beneficiary is. Ajeesh Mohan [argues](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) that MCP is essentially a GUI for AI agents: useful when the agent cannot write code directly, but wasteful for capable agents that should call APIs and scripts instead, given token costs and composability limits. Stephane Derosiaux [counters](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) that MCP was never aimed at terminal-savvy developers; its real value is enterprise governance, a policy-aware auditable proxy between agents and the resources they're permitted to touch, something a CLI cannot provide at scale. Speakeasy's [AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) reinforces the governance angle, framing MCP as one layer in a broader architecture that unifies identity, policy enforcement, and observability across agent fleets.

The build-or-buy question surfaces in [aiyan.io's post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat): teams should ship MCP tool servers rather than custom orchestration loops, letting frontier agents like Claude Code own the loop while the team invests in domain-specific APIs and context. TypeScript has emerged as a practical default for MCP server authorship partly because of runtime compatibility, as one developer [found](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) when evaluating Ruby, Java, and TypeScript for a Claude plugin.
