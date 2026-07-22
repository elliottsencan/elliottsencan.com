---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to tools and data
  sources, adopted across developer tooling, enterprise governance, and
  infrastructure as the standard integration layer for agentic systems.
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
compiled_at: '2026-07-22T05:56:31.654Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4371
    output_tokens: 1421
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
  cost_usd: 0.034428
---
MCP (Model Context Protocol) is Anthropic's protocol for exposing tools, resources, and context to AI agents in a structured way. At its simplest, an MCP server advertises capabilities that a compatible agent can invoke, whether those capabilities are database queries, filesystem operations, API calls, or domain-specific utilities.

The most direct illustration of MCP in practice comes from connecting Claude Code to a 1.3-billion-row Postgres ledger: a Postgres MCP server let the author query Polymarket's full trade history in plain English, surfacing insights like the top 0.1% of wallets capturing roughly 70% of all profit [Claude Code + MCP on 1.3B Polymarket Trades](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades). That's the protocol doing its core job: bridging natural-language agents to structured data.

On the tooling side, MCP has become the standard distribution format for domain-specific agent extensions. The Databricks AI Dev Kit ships an MCP server alongside markdown skills and a Python library so coding assistants can query Databricks resources directly [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Storybloq uses an MCP server to persist coding session context across stateless AI assistant sessions [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Repowise delivers codebase intelligence via MCP [repowise-dev/repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise), and Radar bundles MCP into an open-source Kubernetes UI so agents can inspect cluster state [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui). Anthropic has also formalized a packaging format, .mcpb bundles, for distributing local MCP servers as single-click installs in Claude Desktop [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb).

Not everyone agrees MCP is the right abstraction for every use case. Ajeesh Mohan argues it functions as a GUI for AI agents: convenient for non-developers who need click-through interfaces, but wasteful for agents that can write code directly against APIs, given the token overhead and composability limits [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). The counterpoint from Stephane Derosiaux is that MCP's real value isn't developer convenience at all; it's enterprise governance: a policy-aware, auditable proxy between agents and the resources they're permitted to touch, something a CLI cannot provide at scale [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). The Speakeasy AI control plane framing reinforces this: MCP fits into the governance layer enterprises need to unify identity, policy enforcement, and observability across agent interactions [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

On the strategic side, one argument treats MCP tool servers as the correct unit of investment: rather than building custom orchestration frameworks, teams should ship MCP servers and agent skills that extend frontier agents like Claude Code, letting Anthropic own the loop while the team invests in domain-specific APIs and context [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat).

Several projects also use MCP as the delivery mechanism for novel context-engineering approaches. WaveScope applies Ricker wavelet transforms to source code as a 1D signal and serves the multi-resolution output via MCP, giving LLMs structural views of codebases without language-specific parsers [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Headroom compresses tool outputs and RAG chunks before they reach the LLM, reducing token usage by 60-95%, and exposes this as an MCP server [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). Mintlify serves documentation context to both humans and LLMs via MCP [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify).

Language choice for implementing MCP servers has practical consequences: one developer found Java most ergonomic for building a Claude plugin but shipped TypeScript for MCP runtime compatibility [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a). Zerostack, a Rust-based coding agent, integrates MCP alongside ACP and achieves roughly 16MB RAM versus 300MB for JS-based alternatives [gi-dellav/zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), illustrating that implementation language matters for resource-constrained deployments.
