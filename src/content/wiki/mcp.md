---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, now a fast-growing standard for everything from enterprise
  governance layers to single-file desktop extensions.
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
compiled_at: '2026-11-03T00:42:15.123Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1233
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
  cost_usd: 0.032049
---
The Model Context Protocol (MCP) defines a standard interface for exposing tools, resources, and context to AI agents. Anthropic introduced it as a way to let agents call external systems without ad-hoc integrations, and adoption has spread quickly across both developer tooling and enterprise infrastructure.

The most common pattern is an MCP server that wraps an existing API or data source. [Databricks's ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages Databricks expertise as an MCP server usable by Claude Code, Cursor, and Gemini CLI. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) exposes codebase health metrics the same way. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) adds an MCP interface to a Kubernetes UI so agents can inspect cluster state directly. A [Postgres MCP connected to 1.3 billion Polymarket rows](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) let a user query trade history in plain English and surface that the top 0.1% of wallets captured roughly 70% of all profit.

Anthropics own tooling is moving toward easier distribution. The [official .mcpb format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages a local MCP server as a single-click bundle for Claude Desktop, with a manifest, bundled Node.js runtime, and optional user configuration. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) supports MCP natively so documentation can be served directly to agents rather than only to human readers.

There is genuine disagreement about where MCPs value actually lies. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) frames MCP as a GUI equivalent for agents: useful when no API exists, but wasteful for agents capable of writing code directly against APIs and scripts. The token overhead and composability limits make it a poor default for developer-grade agents. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues the opposite framing misses the point entirely: MCP's real value is enterprise governance, acting as a policy-aware, auditable proxy between agents and the resources they can reach, something a CLI cannot provide at scale. [Speakeasy's AI control plane architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) extends this view, positioning MCP as one layer in a broader governance stack covering identity, policy enforcement, tool routing, and observability.

At the implementation level, several projects treat MCP as a composability primitive rather than a product feature. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) wraps session context persistence as an MCP server, making stateless AI assistants accumulate knowledge across sessions. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) is an MCP server that applies wavelet transforms to source code, giving LLMs multi-resolution structural views without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as an MCP proxy that compresses tool outputs before they reach the model, claiming 60-95% token reduction. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) integrates MCP alongside ACP in a Rust-based coding agent designed for minimal memory overhead.

The runtime choice for building MCP servers has practical consequences. One developer [comparing Ruby, Java, and TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) found Java most ergonomic but shipped TypeScript because the MCP runtime ecosystem currently favors it. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) draws a strategic conclusion from this ecosystem momentum: teams should skip building custom orchestration loops and instead ship MCP servers that extend frontier agents, letting Anthropic maintain the agent loop while the team focuses on proprietary APIs and domain context.
