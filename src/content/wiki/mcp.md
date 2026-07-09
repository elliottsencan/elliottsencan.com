---
title: Model Context Protocol (MCP)
summary: >-
  MCP is Anthropic's open protocol for connecting AI agents to external tools
  and data sources, now a practical standard for building, distributing, and
  governing agentic tool integrations.
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
compiled_at: '2026-07-09T14:16:12.853Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 955
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
  cost_usd: 0.026871
---
The Model Context Protocol gives AI agents a standardized way to call tools, read resources, and receive context from external systems. Originally positioned as a general integration layer, it has rapidly accumulated concrete implementations: codebase intelligence servers, documentation platforms, Kubernetes UIs, and session-persistence utilities all expose MCP interfaces, suggesting the protocol has crossed from spec to de facto plumbing for the agent ecosystem.

Anthropics own tooling reflects this maturity. The official `.mcpb` bundle format ([Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb)) packages a local MCP server into a single-click installer for Claude Desktop, handling Node.js runtime bundling and distribution through a Connectors Directory. That packaging story matters because it lowers the barrier for shipping domain-specific tool servers without requiring users to touch a terminal.

What gets built on MCP is varied. The Databricks AI Dev Kit ([databricks-solutions/ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit)) bundles an MCP server alongside markdown skills and a Python library to bring Databricks context into coding assistants. Storybloq ([Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq)) uses an MCP server to persist coding session state across conversations. Repowise ([repowise-dev/repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise)) exposes codebase health metrics and architecture tracking through the protocol. WaveScope ([Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for)) applies wavelet transforms to source code and serves the results as token-efficient context via MCP.

The strategic arguments around MCP are less settled. One view ([The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat)) holds that teams should stop building custom orchestration and instead ship MCP tool servers, letting frontier agents like Claude Code own the execution loop while you invest in domain APIs. A competing critique ([Your agent loves MCP as much as you love GUIs](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis)) argues MCP is a GUI abstraction useful for non-developers but wasteful for agents capable of writing code directly against APIs, citing token costs and composability limits.

The enterprise governance angle resolves some of that tension. MCP's real leverage at scale may not be tool convenience but policy enforcement: a proxy layer that controls what agents can touch, logs every call, and applies identity and access rules ([No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees)). That framing aligns with the broader AI control plane architecture ([AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors)), where MCP sits inside a governance layer rather than as a raw developer convenience. Token overhead concerns are addressed by tools like Headroom ([chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom)), which compresses MCP tool outputs by 60-95% before they reach the model.
