---
title: AI infrastructure
summary: >-
  The hardware, software, and architectural layers that make AI systems run in
  production — spanning inference optimization, agent runtimes, routing,
  caching, credential management, and governance.
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
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-08-31T22:29:14.018Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1182
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
  cost_usd: 0.038733
---
AI infrastructure is the stack of systems beneath the model itself: the layers that determine how inference runs, how agents access tools, how costs are controlled, and how organizations govern what AI can do at scale.

At the compute and serving layer, the dominant engineering concern is inference efficiency. [Netflix's AI Platform](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) built a full in-house LLM serving stack, choosing vLLM over TensorRT-LLM and exposing an OpenAI-compatible API surface — a pattern that preserves optionality as models change. The core optimization lever is the KV cache. [Everpure's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions on NFS and S3, achieving up to 20x inference speedup over standard Ethernet. A companion piece on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks via metadata pointers, so only changed tokens are reprocessed — cutting time-to-first-token for RAG workloads. The underlying mechanics are explained in [a broader KV caching survey](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), which frames the cache as a persistent shared data asset rather than a transient compute artifact, with prefill cost reductions up to 20x when injected via RDMA.

Routing is emerging as a distinct infrastructure concern. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality in real time. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a more compact approach — a 1.5B model that maps queries to user-defined domains without retraining when new models join the pool. [Inference engineering as a discipline](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers the full technique set: quantization, speculative decoding, caching, parallelism, and disaggregation.

Agent infrastructure introduces its own requirements. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients. Governance over agent actions requires a separate control layer: [Speakeasy's AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) unifies identity, policy enforcement, tool routing, and observability across every agent in an enterprise. Credential management is a related gap filled by tools like [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which keeps API tokens encrypted on-device so agents authenticate against services without ever seeing raw credentials.

Not every infrastructure choice requires heavy machinery. The [zerostack memory system](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) deliberately avoids vector stores and embeddings, storing agent memory as plain Markdown files retrieved by regex — a viable approach when RAM is constrained and a daemon would be overkill.

At the economic layer, infrastructure decisions directly determine margins. A [pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between the cheapest and most expensive frontier models, making provider-agnostic architecture a financial necessity rather than an engineering preference. [David Crawshaw's critique of current cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources and slow remote block devices are the wrong foundation for AI workloads and that the stack needs to be rebuilt from scratch.
