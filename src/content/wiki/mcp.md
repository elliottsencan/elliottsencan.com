---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools and
  resources; sources show it being used for enterprise governance, developer
  tooling, context compression, and platform extension across a wide range of
  agent frameworks.
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
aliases:
  - model-context-protocol
compiled_at: '2026-07-08T00:17:45.209Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 1064
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
  cost_usd: 0.028506
---
The Model Context Protocol gives AI agents a standardized way to call tools, read resources, and receive structured context from external servers. Where a traditional API serves human-written code, an MCP server serves an agent's reasoning loop, exposing capabilities the agent can discover and invoke at runtime.

The most contentious question around MCP is who it actually benefits. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) frames it as a GUI for agents: useful when the agent cannot write code directly, wasteful when it can, because every MCP round-trip burns tokens and collapses composability. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) pushes back from the enterprise side, arguing that MCP's value is precisely the governance layer it creates: a policy-aware, auditable proxy between agents and the resources they are allowed to touch, something a bare CLI never provides at scale.

That governance framing connects to the broader AI control-plane picture described by [Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), where identity, policy enforcement, and observability need to be unified across every agent and tool in an organization. MCP servers are one concrete point where those controls can be applied.

On the tooling side, MCP has become a common extension point. [Databricks](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships domain expertise as an MCP server that works across Claude Code, Cursor, and Gemini CLI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation context via MCP so agents can retrieve accurate knowledge without hallucinating. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles an MCP interface into its Kubernetes UI for agent-driven cluster inspection. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) exposes codebase health and architecture data the same way.

Context efficiency is an emerging concern. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) sits as an MCP proxy that compresses tool outputs before they reach the model, cutting token usage by 60 to 95 percent. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, using wavelet transforms to produce multi-resolution structural views of source code as token-efficient MCP context.

Distribution is maturing too. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages a local MCP server as a single-click installable bundle for Claude Desktop, lowering the barrier for non-developer users. Runtime choice matters when targeting that format: one developer [landed on TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) specifically for future MCP compatibility after testing Ruby and Java. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) shows another packaging pattern, exposing persistent session context as an MCP server so stateless agents accumulate knowledge across runs.

[Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) draws a strategic conclusion from all of this: teams should stop building custom orchestration layers and instead invest in MCP servers and skills that extend frontier agents, letting the model provider own the loop while the team owns its domain context.
