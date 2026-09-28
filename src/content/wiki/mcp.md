---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, adopted across coding assistants, enterprise governance
  layers, and specialized servers for everything from databases to Kubernetes
  clusters.
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
compiled_at: '2026-09-28T23:08:33.055Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1180
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
  cost_usd: 0.031254
---
MCP (Model Context Protocol) is Anthropic's open standard for giving AI agents structured access to tools, resources, and context from external systems. What began as a way to extend coding assistants has expanded into a broad ecosystem of servers, proxies, and governance layers.

The most common use pattern is an MCP server that wraps an existing system and exposes it to an LLM. The Databricks AI Dev Kit [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python library so that Claude Code, Cursor, and Gemini CLI can query Databricks infrastructure directly. A Postgres MCP let one analyst query 1.3 billion Polymarket trades in plain English [Claude Code + MCP on 1.3B Polymarket Trades](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades). Repowise surfaces codebase health metrics via MCP [repowise-dev/repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise), and WaveScope applies wavelet transforms to source code to give LLMs token-efficient structural context [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

On the distribution side, Anthropic now supports packaging local MCP servers as single-click `.mcpb` bundles for Claude Desktop [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). One developer found TypeScript the pragmatic choice for a Claude plugin specifically because of future MCP runtime compatibility [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).

There is genuine disagreement about who MCP is actually for. One view treats it as scaffolding for non-developers: useful as a GUI-like abstraction, but wasteful for agents that could call APIs or write scripts directly, given token costs and composability limits [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). The opposing view, backed by the NSA's reported interest, holds that MCP's real value is enterprise governance: a policy-aware, auditable proxy between agents and the resources they can touch, something a CLI cannot provide at scale [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). A broader architecture framing positions MCP tool servers within an "AI control plane" handling identity, policy, routing, and observability across agents [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

Practical MCP tooling addresses token pressure from multiple angles. The Headroom library compresses tool outputs before they reach the LLM, cutting token usage by 60-95% [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). Storybloq persists session context across stateless coding sessions via a `.story/` directory exposed through an MCP server [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Mintlify added MCP support to serve documentation as structured context to agents [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify), and Radar, an open-source Kubernetes UI, exposes cluster state to AI agents the same way [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui). The strategy of building MCP servers rather than custom orchestration frameworks is explicit in at least one architectural argument: let frontier agents own the loop, and invest in the MCP interface to your platform's unique capabilities instead [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat).
