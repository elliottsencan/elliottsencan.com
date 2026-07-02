---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to tools, APIs, and
  data sources; sources debate whether it is best understood as a developer
  integration standard, an enterprise governance layer, or a distribution
  channel for agent capabilities.
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
compiled_at: '2026-07-02T12:31:35.716Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 969
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
  cost_usd: 0.027081
---
MCP (Model Context Protocol) is Anthropic's open standard for exposing tools and resources to AI agents in a consistent, composable way. At its simplest, it defines how a server advertises capabilities that an agent can call, and how results flow back. The practical range of implementations is wide: from an MCP server that applies wavelet transforms to source code for token-efficient context ([WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for)), to a proxy that compresses tool outputs before they reach the LLM ([headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom)), to infrastructure-level UIs like the Kubernetes dashboard that exposes cluster state via MCP for AI agents ([Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui)).

One persistent debate in the sources is whether MCP is the right abstraction for capable agents at all. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP is essentially a GUI for AI: useful when the underlying API is unavailable, but wasteful for agents that can write code directly against APIs, because every tool call burns tokens and reduces composability. The counter-position, held implicitly by most other sources, is that the protocol's value is governance and discoverability, not just convenience.

[Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) makes this case most explicitly: MCP's real audience is enterprise security and compliance teams who need a policy-aware, auditable proxy between agents and the resources they touch. That framing aligns with the AI control plane architecture described by [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), where MCP sits in a governance layer that unifies identity, routing, and observability across agent systems.

For teams building on top of frontier agents, [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) recommends shipping MCP tool servers rather than custom orchestration, treating the protocol as a distribution channel into agents like Claude Code. [Databricks](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) follows this pattern with a toolkit that delivers platform expertise to multiple AI coding assistants through an MCP server. Anthropic's own tooling extends this with the `.mcpb` bundle format, which packages a local MCP server for single-click installation in Claude Desktop ([MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb)).

On the implementation side, runtime compatibility shapes language choice: one developer shipped TypeScript over preferred alternatives specifically for MCP runtime support ([tanin](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a)). Documentation platforms like [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) and codebase tools like [repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) have added MCP as a first-class surface alongside human-facing interfaces, treating it as a standard way to serve context to agents.
