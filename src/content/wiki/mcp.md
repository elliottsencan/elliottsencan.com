---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools, APIs, and
  data sources, with debate ongoing about whether its real value is developer
  convenience, enterprise governance, or something else entirely.
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
compiled_at: '2026-08-31T22:38:25.157Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1215
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
  cost_usd: 0.031779
---
MCP, the Model Context Protocol, standardizes how AI agents discover and call external tools. Anthropic created it and maintains the spec; the ecosystem now spans database connectors, coding assistants, documentation platforms, Kubernetes UIs, and more.

The most common use is wiring an agent to a data source or service it couldn't otherwise reach. [CrowdIntel](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) connected Claude Code to a 1.3-billion-row Postgres ledger via a Postgres MCP server and queried the full Polymarket trade history in plain English. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation knowledge through MCP so agents can retrieve context-aware content rather than scraping static pages. [Databricks Solutions](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python core library so AI coding assistants can tap Databricks expertise without custom orchestration.

Anthropics own tooling for Claude Desktop packages MCP servers as distributable .mcpb bundles, a single-click installation format covering manifest, Node.js runtime, and user configuration [Anthropic](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). Language choice for building servers is non-trivial: one developer compared Ruby, Java, and TypeScript before shipping TypeScript specifically for MCP runtime compatibility [tanin](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).

The protocol has attracted serious disagreement about what it is actually for. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is essentially a GUI for AI agents: helpful for non-developers who need a structured interface, wasteful for agents capable of calling APIs or writing scripts directly, since every MCP hop carries token overhead and composability constraints. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) takes the opposite view: MCP's real value is enterprise governance, specifically as a policy-aware, auditable proxy layer between agents and the resources they touch. [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this in terms of an AI control plane: unified identity, policy enforcement, tool routing, and observability across every agent system.

On the build-vs-extend question, [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) recommends teams skip custom orchestration and ship MCP tool servers that extend frontier agents like Claude Code instead, letting Anthropic maintain the agent loop while teams invest in domain-specific APIs.

MCP servers are increasingly used for specialized context delivery. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code, producing multi-resolution structural views that give LLMs token-efficient context without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a .story/ directory, using MCP to make a stateless assistant behave like a compounding collaborator. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) delivers codebase intelligence, code health scores, and architectural decision tracking through the protocol.

MCP has also appeared as one feature among several in broader tools: [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), an open-source Kubernetes UI, includes an MCP interface for AI agents alongside topology views and security checks. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), a Rust-based coding agent, lists MCP and ACP integration as part of its core feature set.
