---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools, data
  sources, and services, with active debate about where it adds value versus
  where direct API or code access is more appropriate.
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
compiled_at: '2026-09-07T21:19:09.858Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1095
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
  cost_usd: 0.029979
---
MCP (Model Context Protocol) is a standardized interface that lets AI agents discover and call external tools, data sources, and services. It has attracted broad adoption across coding assistants, infrastructure UIs, documentation platforms, and enterprise governance layers, while also generating pointed criticism about where it actually belongs in a well-designed system.

The clearest skeptical case comes from [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis), which frames MCP as a GUI equivalent for AI agents: useful when you need a visual abstraction for non-technical users, wasteful when an agent can write code directly against an API. The argument is that MCP adds token overhead and composability friction that agents capable of scripting their way through tasks simply do not need. [The orchestrator-isn't-your-moat post](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes a complementary view: teams should ship MCP tool servers and agent skills rather than custom orchestration loops, treating MCP as the surface area through which frontier agents like Claude Code reach your platform's unique capabilities.

On the enterprise side, [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues MCP's real value is governance: a policy-aware, auditable proxy between AI agents and the resources they are allowed to touch. The [Speakeasy AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) maps this into a broader architecture covering identity, policy enforcement, tool routing, and observability across agent deployments.

In practice, MCP servers are being built for an expanding range of substrates. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships one alongside markdown skills and a Python library to bring Databricks context to coding assistants. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) exposes wavelet-transformed code structure to LLMs via MCP for token-efficient context. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as an MCP-compatible proxy that compresses tool outputs before they reach the model, cutting token usage by 60-95%. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) delivers codebase health and architectural tracking through MCP, and [CrowdIntel](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) used a Postgres MCP server to let Claude query a 1.3-billion-row ledger in plain English.

Anthropically, the distribution story is maturing: the official [.mcpb packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to bundle a local MCP server as a single-click install for Claude Desktop. Runtime compatibility is already shaping implementation choices: one developer [chose TypeScript over Ruby or Java](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) specifically for future MCP runtime support. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) ships session-persistence for AI coding assistants as an MCP server, and [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation context to agents the same way. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) includes MCP in a Kubernetes UI so AI agents can interact with cluster topology directly.
