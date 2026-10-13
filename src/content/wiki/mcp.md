---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools,
  data sources, and services, debated across the ecosystem for whether its value
  lies in developer convenience, enterprise governance, or agent composition.
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
compiled_at: '2026-10-13T00:19:59.421Z'
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
The Model Context Protocol is a standard that lets AI agents discover and call external tools through a common interface. Anthropic publishes the spec and maintains a packaging format for local servers, documented in their official guide to building `.mcpb` bundles for Claude Desktop [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). The pattern has generated a broad ecosystem: MCP servers now exist for Postgres databases [Claude Code + MCP on 1.3B Polymarket Trades](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades), Kubernetes clusters [Radar — Open-Source Kubernetes UI](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), documentation platforms [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify), codebase analysis [repowise-dev/repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise), and even wavelet-based code context generation [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

The ecosystem disagrees about who MCP is actually for. One view treats it as infrastructure for non-technical users, analogous to a GUI: useful precisely because it abstracts away raw APIs. Ajeesh Mohan argues this makes MCP wasteful for agents that can write code directly, which should call APIs or run scripts and avoid the token overhead that tool-call wrappers impose [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). The opposing view holds that MCP was never primarily a developer convenience. Stephane Derosiaux argues its real purpose is enterprise governance: a policy-aware, auditable proxy that sits between agents and the resources they are allowed to reach, something a CLI simply cannot provide at scale [No, MCP is Definitely Not Dead. The NSA Agrees.](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Speakeasy's AI control plane reference architecture reflects this same concern, framing MCP as one layer in a broader governance stack covering identity, policy enforcement, and observability [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

A practical thread running through several sources is MCP as a composition layer for agent skills. Aiyan recommends shipping MCP tool servers rather than building custom orchestration, letting frontier agents like Claude Code own the loop while teams invest in platform-specific APIs and domain context [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Databricks takes this approach directly, packaging Databricks expertise as an MCP server alongside markdown skills and a Python core library [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Storybloq extends it further by using MCP to persist coding session context across stateless assistant sessions [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq).

Implementation choices remain unsettled. A developer building a Claude DOCX plugin compared Ruby, Java, and TypeScript runtimes and shipped TypeScript specifically for MCP runtime compatibility, even though Java proved more ergonomic during development [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a). Token cost is a recurring concern: Headroom addresses it by compressing tool outputs and RAG chunks before they reach the model, reporting 60-95% reductions [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). The lightweight Rust agent ZeroStack integrates MCP alongside ACP and achieves roughly 16MB RAM versus 300MB for JavaScript-based alternatives [gi-dellav/zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), showing that the protocol does not mandate heavyweight runtimes.
