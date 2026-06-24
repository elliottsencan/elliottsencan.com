---
title: Model Context Protocol (MCP)
summary: >-
  MCP is an open protocol for connecting AI agents to external tools and data
  sources, with use cases ranging from developer tooling and enterprise
  governance to token-efficient context delivery.
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
compiled_at: '2026-06-24T06:34:25.340Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 1063
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
  cost_usd: 0.028491
---
MCP began as a standardized wire protocol for giving AI agents access to external tools and context. Anthropic provides the canonical packaging format: a `.mcpb` bundle that wraps a local server as a single-click install for Claude Desktop, covering manifest, Node.js runtime, and distribution to a Connectors Directory [build-a-desktop-extension-with-mcpb](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb). That runtime compatibility is already shaping language choices for developers building plugins, with TypeScript preferred specifically because it targets MCP's runtime environment [ruby-vs-java-vs-typescript](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a).

On the tool side, MCP servers have proliferated across many domains. Databricks ships an MCP server as part of a composable AI dev kit that also includes markdown skills and a Python core library, supporting Claude Code, Cursor, and Gemini CLI [databricks-solutions-ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Storybloq uses an MCP server to persist coding session context across stateless AI assistant sessions [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). WaveScope applies wavelet transforms to source code via MCP to deliver token-efficient structural context to LLMs [wavescope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Repowise surfaces codebase intelligence, code health scores, and architectural tracking through MCP [repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise). Radar, an open-source Kubernetes UI, exposes cluster state to AI agents via MCP [radar-kubernetes-ui](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui). Mintlify serves documentation context to both humans and LLMs with MCP support [mintlify](/reading/2026-04/2026-04-30t231435-mintlify).

Two camps have formed around who MCP is actually for. One argument treats MCP as roughly analogous to a GUI: useful for non-developers who need a structured interface to agent capabilities, but wasteful when agents could call APIs or write code directly, given the token overhead and composability friction [mcp-as-gui-for-ai-agents](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis). The counter-argument is that MCP's real value is never the developer terminal workflow at all. It belongs in enterprise governance: a policy-aware, auditable proxy sitting between agents and the resources they can reach, providing controls that raw CLI access cannot [mcp-not-dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). The AI control plane architecture literature treats MCP as one integration layer within a broader governance stack covering identity, policy enforcement, and observability [ai-control-plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors).

From a build-vs-buy angle, one strategic argument holds that teams should ship MCP tool servers rather than building custom orchestration frameworks, letting frontier agents like Claude Code own the loop while the team invests in platform-specific APIs and domain context [orchestrator-isnt-your-moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Token efficiency is a live concern regardless of architecture: a proxy-and-compression layer that reduces MCP tool output size by 60-95% has already been built to address it [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom).
