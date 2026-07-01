---
title: Model Context Protocol (MCP)
summary: >-
  MCP is a standard for connecting AI agents to external tools and resources,
  spanning everything from developer productivity servers to enterprise
  governance proxies, with ongoing debate about where it adds value versus
  direct API access.
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
compiled_at: '2026-07-01T00:40:43.506Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4182
    output_tokens: 967
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
  cost_usd: 0.027051
---
MCP started as a protocol for giving AI agents structured access to external tools, but the sources here show it has grown into something more contested and layered. At the simplest end, [Anthropic's official guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) treats MCP as a packaging and distribution format, letting developers bundle local servers into single-click `.mcpb` extensions for Claude Desktop. Practical builders like [Databricks Solutions](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) and [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) use it as the delivery mechanism for domain-specific intelligence, whether that is Databricks expertise surfaced to coding assistants or codebase health metrics exposed to an LLM. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) applies the same idea to session persistence, using an MCP server to give stateless agents memory across coding sessions.

The protocol has also become infrastructure. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) bundles MCP into a Kubernetes UI so agents can inspect live cluster state. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation through MCP so LLMs can query it directly. Novel servers like [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) use the protocol to deliver compressed, multi-resolution code representations, and [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) acts as an MCP proxy that compresses tool outputs before they reach the model.

The more interesting disagreement is about where MCP actually belongs in a stack. [Ajeesh Mohan](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is essentially a GUI for AI agents: useful for non-developers but wasteful for agents capable of writing code directly against APIs, because it burns tokens on abstraction layers. [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) counters that this misses the point entirely. For enterprises, MCP's value is governance: a policy-aware, auditable proxy between agents and the resources they can touch, something a bare CLI or API call cannot provide at scale. The [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) framing from Speakeasy sits in the same territory, treating MCP as one component of a broader identity, routing, and observability layer.

[Aiyan's strategy piece](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) adds a build-vs-buy angle: rather than writing custom orchestration, teams should ship MCP tool servers and let frontier agents like Claude Code own the loop. The [TypeScript language choice](/reading/2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a) in a DOCX plugin illustrates this concretely, where runtime compatibility with MCP tooling drove the final decision over ergonomic preferences.
