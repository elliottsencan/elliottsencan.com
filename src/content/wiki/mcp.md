---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools,
  data sources, and services, now a contested standard whose real value sits in
  enterprise governance as much as developer convenience.
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
compiled_at: '2026-11-10T01:22:41.288Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1164
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
  cost_usd: 0.031014
---
MCP (Model Context Protocol) is Anthropic's open standard for giving AI agents structured access to external tools and resources. At its simplest, an MCP server exposes capabilities, a client agent calls them, and both sides speak a shared protocol regardless of what language the server is written in. That neutrality is why it has spread quickly: projects ranging from a Kubernetes UI [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) to a Databricks AI development kit [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) to a Postgres ledger query tool [Claude Code + MCP on 1.3B Polymarket Trades](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) all expose their surfaces through it.

The protocol has attracted sharp debate about where its value actually lies. One camp treats MCP as a user-interface primitive for agents, analogous to what GUIs are for humans: useful when no better integration exists, but wasteful for agents capable of calling APIs directly [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). A sharply opposing view holds that the protocol's real purpose is enterprise governance: a policy-aware, auditable proxy between agents and the resources they are allowed to touch, something a bare CLI cannot provide at scale [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). The Speakeasy AI control plane overview situates MCP within a broader governance layer covering identity, policy enforcement, and observability across all agents [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

On the tooling side, MCP has become a packaging target. Anthropic ships a `.mcpb` bundle format for distributing local servers as single-click Claude Desktop extensions [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb), and runtime compatibility with MCP shaped one developer's language choice when building a DOCX plugin [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a). Documentation platforms like Mintlify expose content through MCP so agents can retrieve structured knowledge on demand [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify).

Several projects use MCP to solve context problems specifically. WaveScope applies wavelet transforms to source code and serves multi-resolution structural views through an MCP server, reducing token cost without language-specific parsers [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Headroom compresses tool outputs and RAG chunks before they reach the LLM, cutting token usage 60-95% [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). Storybloq persists session context across coding sessions via an MCP server, turning stateless assistants into compounding collaborators [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). RepoWise surfaces codebase intelligence through the same protocol [RepoWise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise).

Strategically, one argument treats MCP servers as the right investment target for teams tempted to build custom orchestration: ship tools and skills that extend frontier agents rather than reinventing the loop [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). The lightweight Rust agent ZeroStack integrates MCP alongside ACP as one of several protocol options [ZeroStack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), suggesting the protocol is becoming a baseline expectation rather than a differentiator.
