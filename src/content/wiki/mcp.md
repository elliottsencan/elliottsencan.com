---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a standard for exposing tools and resources to AI agents; sources
  collectively frame it as infrastructure for governance, composability, and
  context delivery rather than a universal solution for agent-to-system
  integration.
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
compiled_at: '2026-07-06T00:17:22.518Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 883
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
  cost_usd: 0.025791
---
MCP (Model Context Protocol) is a protocol for connecting AI agents to external tools, data sources, and services through a standardized interface. Anthropic formalized the packaging side with the `.mcpb` bundle format for Claude Desktop [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb), and the ecosystem has responded with a wide range of MCP servers: Databricks exposes platform APIs and context through one [databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), Radar bundles Kubernetes topology and GitOps data into one [Radar — Open-Source Kubernetes UI](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), and WaveScope delivers multi-resolution code structure via wavelet transforms to give LLMs token-efficient context [Putting Code Under a Microscope](/reading/2026-06/2026-06-23t232444-repowise-devrepowise).

There is active disagreement about where MCP belongs in an agent stack. One view is that MCP is essentially a GUI for AI agents: useful when agents lack the ability to call APIs directly, but wasteful for agents that can write code, since MCP adds token overhead and reduces composability [Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). A competing view holds that the real value of MCP is enterprise governance: a policy-aware, auditable proxy between agents and the resources they are permitted to touch, something a raw CLI cannot provide at scale [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). The AI control plane architecture synthesizes this: MCP sits inside a broader governance layer handling identity, policy enforcement, and observability across every agent and system [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

Practitioners are also using MCP to solve context and memory problems. Storybloq persists session context across stateless AI coding sessions via an MCP server [storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq), and Headroom compresses tool outputs before they reach the LLM to cut token usage by 60-95% [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). Documentation platforms like Mintlify have added MCP support to serve structured knowledge directly to agents [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify). Language choice for MCP server authors is non-trivial; one developer found Java ergonomically superior but chose TypeScript for runtime compatibility with MCP tooling [Ruby vs. Java vs. TypeScript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).
