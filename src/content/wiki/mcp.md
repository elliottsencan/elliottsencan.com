---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol that lets AI agents connect to external tools, APIs,
  and data sources through a standardized interface, enabling a growing
  ecosystem of servers, governance layers, and agent integrations.
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
aliases:
  - model-context-protocol
compiled_at: '2026-07-01T02:02:42.508Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 1055
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
  cost_usd: 0.028371
---
The Model Context Protocol gives AI agents a common interface for invoking tools and accessing context outside their training data. Originally positioned as a way for LLM-powered assistants to call external services, it has grown into infrastructure that spans developer tooling, enterprise governance, and runtime packaging.

On the developer side, MCP servers expose domain-specific capabilities to coding agents. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python library so that agents like Claude Code and Cursor can reason over Databricks resources. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses the same pattern to persist session context across stateless agent interactions. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) is an MCP server that applies wavelet transforms to source code, giving LLMs multi-resolution structural views without language-specific parsers. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) surfaces codebase intelligence via MCP, and [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) acts as an MCP proxy that compresses tool outputs to cut token costs by 60-95%.

Anthropics own packaging format, the .mcpb bundle, lets developers [distribute local MCP servers as single-click installs](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) for Claude Desktop. A developer choosing between Ruby, Java, and TypeScript for a Claude plugin [ultimately shipped TypeScript for MCP runtime compatibility](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a), illustrating how runtime constraints are already shaping toolchain decisions.

There is genuine disagreement about where MCPs value lies. [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is a GUI for AI agents: useful when the agent cannot write code, but wasteful for capable agents that should call APIs directly. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) pushes back, arguing MCPs real home is enterprise governance: a policy-aware, auditable proxy between agents and the resources they are allowed to touch, something a CLI cannot provide at scale. The [Speakeasy AI control plane survey](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this as the broader problem of unifying identity, policy enforcement, tool routing, and observability across agent fleets, with MCP as one routing layer within that stack.

Platform builders are treating MCP exposure as a distribution strategy. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip building custom orchestration and instead ship MCP tool servers that extend frontier agents, letting Anthropic maintain the loop. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) and [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) both surface MCP endpoints as first-class features, the former for documentation context and the latter for Kubernetes topology. The Rust-based coding agent [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) treats MCP alongside ACP as peer integration protocols, suggesting the standard is becoming table stakes even for minimal, performance-focused implementations.
