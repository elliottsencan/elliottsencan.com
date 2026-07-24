---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools,
  data, and services; in practice it functions as a distribution layer for agent
  capabilities, a governance surface for enterprise AI, and an integration
  target for a growing ecosystem of servers.
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
compiled_at: '2026-07-24T05:02:15.571Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4371
    output_tokens: 1227
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
  cost_usd: 0.031518
---
MCP started as a protocol for giving AI agents structured access to tools and context, but the sources here reveal it operating at several distinct layers simultaneously: as a packaging format for agent skills, as a governance and audit surface for enterprise deployments, and as an integration seam that third-party tools are rapidly colonizing.

The simplest framing comes from [Mad About Code](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis), which calls MCP "a GUI for AI agents" — a human-friendly abstraction layer useful when the consumer is a non-developer, but wasteful when the agent is capable of calling APIs or running scripts directly. That piece argues MCP's token overhead and composability limits make it the wrong default for capable agents. [aiyan.io](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) takes the opposite strategic tack: teams should skip custom orchestration and instead ship MCP tool servers, letting frontier agents like Claude Code own the loop while the team's value accretes in domain-specific tools and APIs exposed over MCP.

Those two stances share a substrate: MCP as a distribution and integration target. [Databricks](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships platform expertise as an MCP server. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation to agents over MCP. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles Kubernetes observability into an MCP endpoint. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) provides codebase intelligence via MCP. [CrowdIntel](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) connected a 1.3-billion-row Postgres ledger to Claude Code through a Postgres MCP server and queried trade history in plain English. MCP is becoming a standard interface for exposing any data or capability to an agent, the way REST became the default for web APIs.

The governance layer is where [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) locates MCP's real enterprise value: a policy-aware, auditable proxy sitting between agents and resources, enforcing what each agent is allowed to touch. [Speakeasy's AI control plane survey](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) maps the broader category this belongs to — identity, policy enforcement, tool routing, and observability unified across every agent in a system.

On the developer experience side, Anthropic ships a `.mcpb` bundle format for distributing local MCP servers as single-click installs for Claude Desktop, [documented here](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). A [developer comparing Ruby, Java, and TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) for a Claude plugin landed on TypeScript partly for MCP runtime compatibility. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) uses MCP to persist session context across coding sessions. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) integrates MCP alongside ACP in a minimal Rust agent.

Two projects address MCP's token cost directly. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) is an MCP server that applies wavelet transforms to source code to produce compact, multi-resolution structural views without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and logs before they reach the LLM, cutting token usage 60-95%. Both treat MCP as the interface layer and attack context inflation at the boundary.

Collectively these sources show MCP settling into a role analogous to what HTTP did for the web: not the interesting logic, but the connective tissue that everything else assumes.
