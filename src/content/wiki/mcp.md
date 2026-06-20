---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and resources; sources show it being used for enterprise governance, developer
  tooling, documentation serving, and specialized context delivery.
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
aliases:
  - model-context-protocol
compiled_at: '2026-06-20T12:47:49.902Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3934
    output_tokens: 810
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
  cost_usd: 0.023952
---
MCP (Model Context Protocol) is an open standard from Anthropic that defines how AI agents discover and call external tools, access data sources, and receive structured context. The bulk of its adoption so far is in developer tooling: projects like [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) and [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) expose platform capabilities as MCP servers that coding agents like Claude Code and Cursor can call directly. Anthropic now packages these servers as distributable `.mcpb` bundles for Claude Desktop, with [official tooling and a Connectors Directory](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) to lower the distribution barrier.

The protocol is also expanding beyond coding contexts. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) uses MCP to serve documentation to agents alongside humans. [Radar's Kubernetes UI](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) exposes cluster state over MCP. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) is an MCP server that feeds wavelet-transformed code structure to LLMs as a token-efficient alternative to raw source.

The strategic question is where MCP fits relative to direct API access. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is essentially a GUI for agents: useful when a human-readable interface is the only option, but wasteful when an agent could call a proper API or script directly, incurring unnecessary token costs and composability problems. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes a different angle, arguing teams should ship MCP tool servers rather than build custom orchestration, letting frontier agents handle the loop while teams invest in their platform's unique domain context.

[Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) pushes back on dismissals of MCP by pointing to its enterprise governance role: a policy-aware, auditable proxy between agents and the resources they touch, which raw CLI access cannot provide at scale. [Speakeasy's AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this same layer as a governance problem requiring unified identity, policy enforcement, and observability across every agent and tool. MCP sits inside that layer as the tool-access protocol, not a replacement for governance infrastructure around it.
