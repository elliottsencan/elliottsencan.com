---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, now adopted across coding assistants, enterprise governance
  layers, and infrastructure platforms.
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
compiled_at: '2026-11-24T04:00:21.278Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1149
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
  cost_usd: 0.030789
---
MCP (Model Context Protocol) is an open standard, originated by Anthropic, that lets AI agents discover and invoke external tools through a uniform interface. Think of it as a plugin socket: a server advertises capabilities, an agent calls them, and neither side needs to know how the other is implemented.

The most visible use is in AI coding assistants. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python library so that Claude Code, Cursor, and Gemini CLI can all reach Databricks-specific tooling through the same interface. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) exposes code health scores, dead code detection, and architectural decision tracking over MCP. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) goes further, applying wavelet transforms to source code to give LLMs multi-resolution structural context without language-specific parsers. A direct demonstration of what this unlocks: connecting Claude Code to a 1.3-billion-row Postgres ledger via a Postgres MCP server let one analyst [query Polymarket's full trade history in plain English](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades).

Anthropics own tooling is evolving to match. The [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) lets developers package a local MCP server as a single-click bundle for Claude Desktop, with a manifest, bundled Node.js runtime, and optional user-visible configuration fields. A developer comparing Ruby, Java, and TypeScript for a Claude plugin [ultimately shipped TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) specifically for MCP runtime compatibility.

Not everyone agrees MCP is the right primitive for every situation. [Ajeesh Mohan argues](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) that MCP is effectively a GUI for AI agents: valuable for non-developers who need a click-through interface, but wasteful for agents capable of writing code directly against APIs. Against that, [Stephane Derosiaux contends](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) that MCP's real value is not developer ergonomics at all but enterprise governance: a policy-aware, auditable proxy between agents and the resources they are permitted to touch, something a bare CLI cannot provide at scale. The [AI control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) discussed by Speakeasy situates MCP within a broader governance layer covering identity, policy enforcement, tool routing, and observability across all agents in an enterprise.

MCP has also become a surface for infrastructure products. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), an open-source Kubernetes UI, exposes cluster topology and security checks over MCP. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to LLMs via MCP alongside llms.txt. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses an MCP server to persist coding session context across sessions. And [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as an MCP proxy that compresses tool outputs before they reach the model, reducing token usage by 60-95%.

One strategic read on all of this comes from [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat): shipping MCP tool servers is more defensible than building custom orchestration, because Anthropic maintains the agent loop while teams invest in the domain-specific APIs and context that only they can provide.
