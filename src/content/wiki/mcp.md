---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, adopted broadly as infrastructure for agentic workflows,
  enterprise governance, and developer tooling.
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
compiled_at: '2026-08-29T20:19:37.932Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4518
    output_tokens: 1157
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
  cost_usd: 0.030909
---
MCP (Model Context Protocol) is Anthropic's open protocol for exposing tools, resources, and capabilities to AI agents in a standardized way. At its simplest, it lets an agent call a server that wraps some external system, whether a database, a codebase, a documentation platform, or a Kubernetes cluster, through a common interface that any compliant client can speak.

The range of MCP servers that have appeared reflects how widely that interface is being applied. A Postgres MCP let one developer query a 1.3-billion-row Polymarket ledger in plain English [via Claude Code](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades). Databricks ships an MCP server alongside markdown skills and a Python library to bring its platform context into AI coding assistants [directly](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Radar, an open-source Kubernetes UI, bundles MCP as a first-class feature so AI agents can interact with cluster topology [without extra tooling](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui). Mintlify exposes documentation to LLMs via MCP [alongside llms.txt support](/reading/2026-04/2026-04-30t231435-mintlify). WaveScope applies wavelet transforms to source code and serves the resulting multi-resolution views through an MCP server, giving LLMs token-efficient structural context [without language-specific parsers](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

There is real disagreement about where MCP belongs in an agent stack. One view holds that MCP is effectively a GUI for AI agents: useful scaffolding for non-developers but wasteful for agents that could simply call APIs or write scripts directly, since MCP tool calls carry token overhead and composability limits [that raw code does not](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). A contrasting view argues that MCP's value is precisely enterprise governance: a policy-aware, auditable proxy between agents and the resources they can touch, something a CLI invocation cannot provide at scale [for compliance-sensitive organizations](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Speakeasy's AI control plane framing positions MCP as one layer inside a broader governance architecture covering identity, routing, and observability [across every agent a company runs](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

On the tooling side, Anthropic now supports packaging local MCP servers as single-click `.mcpb` bundles for Claude Desktop [with a defined manifest and Node.js runtime format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). A developer comparing Ruby, Java, and TypeScript for a Claude plugin ultimately chose TypeScript for its forward compatibility with MCP runtimes [despite preferring Java's ergonomics](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a). Token efficiency around MCP tool outputs is an active concern: Headroom compresses tool responses before they reach the LLM, claiming 60-95% token reduction [without quality loss](/reading/2026-06/2026-06-20t145835-chopratejasheadroom).

MCP also appears as a distribution strategy. The argument in one post is that teams should skip building custom orchestration and instead ship MCP servers that extend frontier agents like Claude Code, letting Anthropic own the loop [while teams invest in domain-specific APIs and context](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Storybloq ships an MCP server that persists coding session context across sessions [turning stateless assistants into compounding collaborators](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Repowise surfaces codebase intelligence through MCP [for code health, dead code detection, and architectural tracking](/reading/2026-06/2026-06-23t232444-repowise-devrepowise).
