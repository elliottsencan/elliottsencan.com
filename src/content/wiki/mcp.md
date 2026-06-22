---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools and data
  sources, adopted across coding assistants, enterprise platforms, and
  infrastructure tooling as a standard integration layer.
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
compiled_at: '2026-06-22T02:38:48.076Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4064
    output_tokens: 1023
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
  cost_usd: 0.027537
---
MCP (Model Context Protocol) is an open standard, originally from Anthropic, that lets AI agents discover and call external tools through a uniform interface. Its rise has been rapid enough that its scope and best use cases are still actively contested.

The most direct challenge to naive MCP adoption comes from [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis), which frames MCP as a GUI for AI agents: useful when a non-developer needs a clickable interface, wasteful when the agent could call an API or script directly. Token costs and composability problems accumulate when you route everything through MCP servers that were meant to abstract complexity for humans. [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes a different angle: teams should skip building custom orchestration and instead ship MCP tool servers that extend frontier agents like Claude Code, letting Anthropic own the execution loop while you invest in domain-specific APIs.

In practice, MCP servers are being built for a wide range of surfaces. [Databricks Solutions](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python core library so that coding assistants get Databricks-specific context. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses an MCP server to persist coding session context across sessions. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) is an MCP server that applies wavelet transforms to source code to deliver multi-resolution, token-efficient structural context. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) exposes Kubernetes cluster state through MCP. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) wraps MCP to compress tool outputs before they reach the LLM, cutting token usage by 60-95%.

On the distribution side, Anthropic has published a [guide to packaging MCP servers as .mcpb bundles](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) for one-click installation in Claude Desktop. A developer [comparing Ruby, Java, and TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) for a Claude plugin settled on TypeScript specifically for MCP runtime compatibility. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) adds MCP to its documentation platform so that agents can query knowledge bases directly.

The most pointed argument for MCP's staying power is governance. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues that MCP's real target was never developers with terminals but enterprises that need a policy-aware, auditable proxy between agents and the resources they can touch. [Speakeasy's AI control plane reference architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) makes the same structural point: identity, policy enforcement, tool routing, and observability across agent systems require a layer that raw API calls cannot provide. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), a Rust-based coding agent, treats MCP integration as a standard capability alongside its permission system, reflecting how the protocol has normalized as infrastructure.
