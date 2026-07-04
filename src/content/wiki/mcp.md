---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools and
  resources, with adoption spanning IDE plugins, enterprise governance layers,
  and purpose-built servers that expose everything from Kubernetes clusters to
  documentation platforms.
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
compiled_at: '2026-07-04T21:23:59.194Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 952
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
  cost_usd: 0.026826
---
The Model Context Protocol is a standard for giving AI agents structured access to tools, data sources, and services outside the model's context window. Rather than each agent or assistant inventing its own integration surface, MCP provides a common interface: a server exposes capabilities, a client (the agent) calls them, and the boundary is defined by the protocol rather than by bespoke glue code.

The practical implementations vary widely. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server that surfaces Databricks expertise to Claude Code, Cursor, and Gemini CLI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation to both humans and LLMs via MCP. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles an MCP endpoint into a Kubernetes UI so agents can query cluster state. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) implements an MCP server that delivers wavelet-compressed code structure to reduce token overhead. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as a proxy that compresses MCP tool outputs before they reach the model, cutting token usage by 60-95%.

There is genuine disagreement about who MCP is actually for. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is effectively a GUI for AI agents: useful when the agent cannot write code directly, but wasteful compared to raw APIs and scripts for agents that can. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) pushes back, arguing that the real value is enterprise governance: a policy-aware, auditable proxy layer between agents and the resources they are allowed to touch, which a bare CLI cannot provide at scale.

On the distribution side, Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click bundles for Claude Desktop, with manifest-driven configuration and a Connectors Directory for discovery. Runtime choice matters too: one developer [evaluated Ruby, Java, and TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) for a Claude plugin and settled on TypeScript specifically for MCP runtime compatibility.

[Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) frames MCP server development as a strategic bet: instead of building custom orchestration, teams should ship MCP tool servers and let frontier agents like Claude Code handle the loop. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes this further, using an MCP server to persist session context across coding sessions so stateless assistants accumulate project knowledge over time. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) similarly exposes codebase intelligence metrics through MCP for agent consumption.
