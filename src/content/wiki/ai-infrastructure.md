---
title: AI infrastructure
summary: >-
  The systems and abstractions underneath AI deployment: inference optimization,
  agent hosting, routing, caching, credential management, and governance layers
  that determine whether AI workloads are fast, affordable, and safe to operate
  at scale.
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
compiled_at: '2026-08-13T21:08:17.021Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1295
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
  cost_usd: 0.039978
---
AI infrastructure spans everything between a trained model and a working product. The sources here collectively map that stack from compute primitives up through governance: inference serving, KV caching, agent hosting, LLM routing, credential handling, and control-plane policy enforcement.

At the inference layer, the core challenge is cost and latency. [Everpure's KV caching series](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent, shared data asset, injected from fast storage via RDMA rather than recomputed per request, can reduce prefill costs up to 20x. Their follow-up on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks via metadata pointers so only changed tokens are processed, cutting time-to-first-token for RAG workloads. A [third piece](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) shows the same approach applied to NFS and S3 storage, achieving 20x faster inference over standard Ethernet without touching model architecture. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these techniques in a broader toolkit, including quantization, speculative decoding, parallelism, and disaggregation. [Netflix's in-house LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what this looks like at production scale: engine selection (vLLM over TensorRT-LLM), model packaging, OpenAI-compatible API surfaces, and batched constrained decoding.

Routing sits one level above serving. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit LLM for cost, latency, or quality. The companion [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that maps queries to user-defined domains without retraining when new models arrive. [The AI pricing war piece](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) adds a market dimension: a 75x gap between cheapest and most expensive frontier models means routing decisions are now directly tied to margin.

Agent hosting introduces a different set of concerns. [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients. The [AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the governance layer enterprises need on top of that: unified identity, policy enforcement, tool routing, and observability across every agent and system. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses a narrower but sharp problem, injecting API credentials into agent calls locally so tokens stay encrypted on-device.

At the lighter end of the stack, [zerostack's memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) demonstrates that infrastructure choices are tradeoffs, not universal answers: plain Markdown files and regex retrieval beat vector stores when RAM is constrained and provider neutrality matters. [The Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) makes a related point from the opposite direction, arguing that local inference tooling that obscures its dependencies and pivots toward managed cloud betrays the users who valued local-first control.

The infrastructural stakes extend to compute policy. [AI 2040: Plan A](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a) proposes international agreements and coordinated compute controls as the mechanism for slowing unsafe scaling. [A16z's SpaceX profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) sketches orbital AI data centers as a longer horizon for compute placement. Both signal that AI infrastructure is no longer only an engineering problem.
