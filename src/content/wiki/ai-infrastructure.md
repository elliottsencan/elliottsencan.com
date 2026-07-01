---
title: AI infrastructure
summary: >-
  The systems, services, and architectural patterns that make AI applications
  run at scale: inference optimization, agent hosting, routing, caching,
  credential management, and governance layers that sit below the model and
  above the user.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - 2026-06/2026-06-21t231454-spacex-and-the-sentient-sun
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
compiled_at: '2026-07-01T01:55:38.108Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1325
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
  cost_usd: 0.038943
---
AI infrastructure spans everything between a model's weights and a working application. The sources here sketch a layered picture: raw inference efficiency at the compute layer, hosted agent services above that, and governance and routing concerns at the outermost edge.

Inference efficiency is the cost floor everything else rests on. The Everpure Engineering team makes the case that the KV cache should be treated as a persistent, shared data asset rather than an ephemeral computation artifact. [One piece](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues RDMA-injected caches can cut prefill costs by up to 20x; a follow-up describes [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) that segments prompts into reusable chunks so only changed tokens get processed; and a third shows [Pure Storage's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persisting attention states on NFS and S3 without touching model architecture. The Pragmatic Engineer's [inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these within a broader toolkit: quantization, speculative decoding, disaggregation, and parallelism are all in play before routing even enters the picture.

Routing is becoming its own infrastructure layer. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. The accompanying [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B preference-aligned router that maps queries to user-defined domains without retraining when new models are added. As the [AI pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) compresses margins across a 75x price gap between cheapest and most expensive frontier models, provider-agnostic routing becomes a practical business requirement.

At the agent layer, Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so that model upgrades don't break clients. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) targets the evaluation gap, auto-generating training and validation data for agent guardrails at sub-100ms latency. The [zerostack memory system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) argues the opposite direction: plain Markdown files with keyword search can beat vector stores when RAM, daemon overhead, and provider neutrality are constraints, a view reinforced in [Xavier's detailed walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). These two positions are not quite in conflict; they reflect different deployment contexts rather than a single right answer.

Governance and credential management close the stack. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept unifies identity, policy enforcement, tool routing, and observability across every agent and system. [MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) fits into this picture as a policy-aware auditable proxy rather than a developer convenience. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) handles the narrower problem of credential injection for local agents, keeping tokens encrypted on-device across 25+ services. Anthropic's [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how the distribution problem for local MCP servers is being addressed at the tooling layer.

A counterpoint on local inference tooling: the [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that convenience-first projects can obscure performance trade-offs and dependency provenance, eventually pivoting toward cloud in ways that undermine their original premise. Infrastructure choices made early tend to constrain what can be changed later, which is the practical argument for the provider-agnostic and modular patterns most of these sources endorse.
