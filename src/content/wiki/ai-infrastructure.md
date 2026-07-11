---
title: AI infrastructure
summary: >-
  The systems, abstractions, and operational layers that make AI models usable
  at scale, from compute and caching to routing, governance, agent hosting, and
  credential management.
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
  - 2026-07/2026-07-05t170602-building-a-cloud
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
compiled_at: '2026-07-09T23:17:09.653Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6668
    output_tokens: 1165
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
  cost_usd: 0.037479
---
AI infrastructure spans the full stack beneath the model itself: the hardware and networking that serve tokens cheaply, the hosting abstractions that let agents run reliably, the routing and caching layers that manage cost and latency, and the governance and credential plumbing that makes all of it safe to operate in production.

On the compute and serving side, inference is becoming its own discipline. [Philip Kiely's breakdown of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers quantization, speculative decoding, parallelism, and disaggregation as first-class techniques rather than implementation details. A recurring theme across sources is that prefill is expensive, and caching is the main lever. Everpure argues that treating the KV cache as a persistent shared data asset, injected via RDMA rather than recomputed, can cut prefill costs by up to 20x [see the cost analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and their [granular-prompt caching extension](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Pure Storage's KVA takes this further by persisting attention states across sessions on NFS and S3, delivering the same 20x throughput improvement over standard Ethernet [without model changes](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Model routing sits adjacent to caching as a cost-control mechanism. DigitalOcean's Inference Router uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality [at runtime](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The companion Arch-Router research proposes a compact 1.5B preference-aligned routing model that can accommodate new models without retraining [via domain-action mapping](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Meanwhile the pricing floor for tokens has collapsed, with a 75x gap between cheapest and most expensive frontier models, making provider-agnostic routing a structural necessity [rather than an optimization](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

Agent hosting introduces a different class of infrastructure problems. Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so that model upgrades don't break running clients [by design](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Governance sits on top of that: the enterprise AI control plane unifies identity, policy enforcement, tool routing, and observability across every agent and system [in a single layer](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), and MCP has emerged as the protocol layer that makes auditable, policy-aware proxying possible at scale [between agents and resources](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Credential management is a related but undersolved problem; Latchkey handles it by encrypting API tokens on-device so agents authenticate against external services without ever seeing raw credentials [locally](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

At the opposite end of the complexity axis, some builders are deliberately shedding infrastructure. zerostack's agent memory uses plain Markdown files and regex retrieval, no vector store, no daemon, no embeddings, motivated by RAM constraints and provider neutrality [rather than naivety](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). The Ollama critique makes a parallel point from the local inference side: defaults and packaging choices that obscure llama.cpp dependencies and degrade performance can impose real infrastructure debt [on practitioners](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). Infrastructure simplicity is its own design goal, not a fallback.
