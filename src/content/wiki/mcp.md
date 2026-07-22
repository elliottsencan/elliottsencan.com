---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for exposing tools and context to AI agents; sources
  debate whether it belongs in developer workflows or enterprise governance
  layers, while implementations range from code intelligence servers to
  token-compression proxies.
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
compiled_at: '2026-07-09T23:25:21.789Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 991
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
  cost_usd: 0.027411
last_source_added: '2026-07-22T05:48:12.483Z'
---
MCP (Model Context Protocol) is Anthropic's open standard for connecting AI agents to external tools, data sources, and services through a common interface. The breadth of implementations in the wild illustrates both its appeal and the ongoing argument about where it actually belongs.

On the developer tooling side, projects like [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) expose platform-specific expertise via MCP servers that slot into Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses an MCP server to persist session context across stateless AI coding sessions. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) exposes wavelet-transformed code structure to LLMs as token-efficient context. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) surfaces codebase health and architecture data the same way. Even Mintlify and [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) expose their documentation and Kubernetes topology via MCP.

Anthropologic's own documentation now covers packaging MCP servers as distributable [.mcpb bundles for Claude Desktop](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb), which reflects how seriously the ecosystem is treating the protocol as a distribution primitive. One developer building a DOCX plugin [chose TypeScript over Ruby and Java](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) specifically for future MCP runtime compatibility.

The sharpest strategic disagreement is over who MCP is for. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is essentially a GUI for agents: useful as an accessibility layer for non-developers, but wasteful for agents that could call APIs directly, incurring unnecessary token costs and composability limits. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes the opposite position for teams building agent products, arguing that shipping MCP servers is exactly the right move because it lets frontier models handle orchestration while you focus on your domain's unique APIs.

[Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) offers the enterprise governance framing: MCP's real value is as a policy-aware, auditable proxy between agents and the resources they're allowed to reach, something CLIs cannot provide at scale. This aligns with the [AI control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) that treats MCP as one component in a broader governance layer covering identity, tool routing, and observability.

Token cost remains a live concern regardless of where MCP sits. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) addresses this by compressing tool outputs before they reach the LLM, reducing token usage 60-95%. That it works as an MCP server itself is a neat illustration of the protocol's composability.
