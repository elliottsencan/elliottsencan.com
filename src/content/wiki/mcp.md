---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol that lets AI agents connect to external tools and data
  sources through a standard interface, used in practice for everything from
  enterprise governance to context compression to single-click desktop
  extensions.
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
aliases:
  - model-context-protocol
compiled_at: '2026-06-20T22:12:47.703Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4064
    output_tokens: 1194
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
  cost_usd: 0.030102
---
MCP defines a standard wire protocol between AI agents and the tools, resources, and services they call. Anthropic introduced it primarily for systems like Claude, but it has been adopted broadly: Cursor, Gemini CLI, and other coding assistants all consume MCP servers [as the Databricks AI Dev Kit demonstrates](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Anthropic now also distributes a `.mcpb` bundle format so developers can package a local MCP server for one-click installation in Claude Desktop, covering manifest format, Node.js runtime bundling, and submission to a Connectors Directory [per their official guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb).

The protocol's value is contested along a clear axis. One view, from [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis), treats MCP as a GUI for AI agents: useful for non-developers who need a point-and-click interface, but wasteful for agents capable of writing code directly against APIs and scripts, because every MCP hop burns tokens and reduces composability. A sharply different view, argued by [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees), is that MCP's real audience was never terminal-comfortable developers. Its value is enterprise governance: a policy-aware, auditable proxy sitting between agents and the resources they're permitted to touch, which raw CLI access cannot provide at scale.

Both views can coexist. At the infrastructure layer, MCP shows up as the integration surface for tools with no natural API footprint. Radar, an open-source Kubernetes UI, exposes cluster topology, Helm, and GitOps state over MCP so AI agents can query live infrastructure [without a cloud account](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui). Mintlify serves documentation over MCP so agents get context-aware knowledge rather than raw HTML [alongside llms.txt support](/reading/2026-04/2026-04-30t231435-mintlify). Storybloq persists AI coding session state across sessions via an MCP server and a `.story/` directory, giving stateless assistants compounding memory [across runs](/reading/2026-05/2026-05-11t155625-storybloqstorybloq).

At the agent-building layer, [aiyan.io argues](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that teams should skip custom orchestration and instead ship MCP tool servers that extend frontier agents like Claude Code, ceding loop maintenance to Anthropic while concentrating investment in domain-specific APIs. This framing treats MCP server authorship as a product strategy, not just a technical choice.

Runtime language matters for MCP server authors. One developer [compared Ruby, Java, and TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) for a Claude plugin and shipped TypeScript specifically for MCP runtime compatibility, even though Java was ergonomically preferable. Token efficiency concerns have also produced MCP-native tooling: WaveScope applies wavelet transforms to source code and exposes multi-resolution structural views via MCP, giving LLMs precise context without language-specific parsers [or token bloat](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Headroom runs as an MCP server that compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction [without quality loss](/reading/2026-06/2026-06-20t145835-chopratejasheadroom).

Enterprise adoption has prompted governance architecture around MCP. Speakeasy's AI control plane reference [maps the vendor landscape](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) for unified identity, policy enforcement, tool routing, and observability layered on top of MCP-connected agents. The lightweight end of the spectrum runs the same protocol: zerostack, a Rust-based coding agent using roughly 16MB of RAM, integrates MCP alongside ACP and a permission system [as a first-class concern](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack).
