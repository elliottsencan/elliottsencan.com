---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and resources, adopted across developer tooling, enterprise governance, and
  domain-specific servers as a standard integration layer between agents and the
  systems they act on.
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
aliases:
  - model-context-protocol
compiled_at: '2026-06-18T23:02:17.863Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4104
    output_tokens: 1068
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
  cost_usd: 0.028332
---
MCP (Model Context Protocol) is a protocol from Anthropic that gives AI agents a standardized way to discover and invoke external tools, data sources, and services. Think of it as an interface contract: a host agent (Claude Code, Cursor, Gemini CLI, or a custom runtime) speaks MCP; any server that implements the protocol can expose its capabilities to that agent without bespoke integration work.

The clearest picture of what MCP actually is comes from competing framings in the literature. [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) calls it a GUI for AI agents — useful for non-developers wiring tools together visually, but wasteful for agents that can call APIs or write code directly, because MCP interactions carry token costs and composability constraints that direct API calls avoid. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) pushes back on the CLI-is-enough argument: MCP's value at enterprise scale is governance — a policy-aware, auditable proxy between agents and the resources they're permitted to touch, which a raw terminal session cannot provide. The two positions are less contradictory than they appear; MCP's overhead is a real cost for individual developers and a real asset for organizations that need audit trails and access controls.

On the tooling side, MCP has become a practical integration target. [Databricks](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server alongside markdown skills and a Python library to bring Databricks-specific expertise into AI coding assistants. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation context through MCP so agents can query knowledge bases as part of a workflow. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles MCP into a Kubernetes UI so AI agents can query cluster state. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) is an MCP server that preprocesses source code into multi-resolution structural views before handing context to an LLM, reducing token usage without language-specific parsers.

Distribution and packaging are maturing. Anthropic's own [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) describes how to bundle a local MCP server as a single-click `.mcpb` file for Claude Desktop, covering Node.js runtime bundling and submission to a Connectors Directory. A developer building a DOCX plugin [chose TypeScript over Ruby and Java](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) specifically for forward compatibility with MCP runtimes, illustrating how protocol expectations are already shaping implementation choices.

[Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that teams building agent products should skip custom orchestration and instead ship MCP tool servers that extend frontier agents like Claude Code, letting Anthropic maintain the agent loop while they invest in domain-specific APIs and context. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes this approach, exposing session-persistence tooling through an MCP server and Claude Code skill so that coding context survives across stateless sessions. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), a Rust-based coding agent, integrates both MCP and ACP as first-class interfaces in a minimal runtime, treating the protocol as table-stakes plumbing rather than a differentiator.
