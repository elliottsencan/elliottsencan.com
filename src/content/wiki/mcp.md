---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools and
  resources, adopted across coding assistants, enterprise governance layers, and
  developer tooling as a standard interface for agent-environment interaction.
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
compiled_at: '2026-06-26T02:59:55.840Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 1017
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
  cost_usd: 0.027801
---
MCP (Model Context Protocol) is a standard that lets AI agents discover and invoke external tools through a common interface. What began as a mechanism for connecting coding assistants to local context has expanded into a protocol with implications spanning developer tooling, enterprise governance, and agent architecture.

On the developer tooling side, MCP servers expose platform capabilities to agents like Claude Code, Cursor, and Gemini CLI. Databricks packages its platform expertise this way in [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), combining an MCP server with markdown skills and a Python library. Repowise surfaces codebase intelligence, including code health scores and dead code detection, [via MCP](/reading/2026-06/2026-06-23t232444-repowise-devrepowise). WaveScope takes a more experimental approach, [using Ricker wavelet transforms](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) to produce multi-resolution structural views of source code as token-efficient context. Mintlify [adds MCP support](/reading/2026-04/2026-04-30t231435-mintlify) so documentation can be served directly to agents, not just humans. Kubernetes UI Radar [exposes cluster state through MCP](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) for agents operating in infrastructure contexts.

Anthropics packaging story is evolving too. The official .mcpb format lets developers [bundle a local MCP server as a single-click desktop extension](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb), and one developer found that targeting MCP runtime compatibility ultimately drove their language choice when building a Claude plugin, [settling on TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).

The strategic debate around MCP is sharper. One argument holds that teams should stop building custom orchestration and instead [ship MCP tool servers](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) that extend frontier agents, letting the model provider maintain the agent loop. A dissenting view from Mad About Code [frames MCP as a GUI for AI agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis): useful when no API exists, but wasteful for agents capable of writing code directly, given token costs and composability limits.

The enterprise governance framing cuts differently. Stephane Derosiaux [argues MCP was never primarily for developers](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) with terminal access; its real value is as a policy-aware, auditable proxy between agents and the resources they can touch, something CLIs cannot provide at scale. Speakeasy's AI control plane reference architecture [positions MCP within a broader governance layer](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) covering identity, policy enforcement, and observability across agents.

At the implementation layer, tools like Headroom [compress MCP tool outputs before they reach the LLM](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), reducing token usage by 60-95%. Storybloq [uses an MCP server to persist session context](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) across coding sessions, addressing the statelessness problem that limits sustained agent collaboration.
