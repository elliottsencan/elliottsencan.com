---
title: AI infrastructure
summary: >-
  The hardware, serving systems, routing layers, storage abstractions, and
  governance tooling that make large-scale AI deployment practical — a stack
  that is evolving faster than any single vendor can own.
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
compiled_at: '2026-09-07T21:09:41.007Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1191
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
  cost_usd: 0.038868
---
AI infrastructure spans everything below the model weights and above the application: compute allocation, inference serving, caching, routing, agent orchestration scaffolding, and the governance layers that keep it auditable. The sources here collectively argue that this stack is fragmenting into specialized components, and that the choices made at each layer have compounding effects on cost, latency, and reliability.

On the serving side, the dominant engineering challenge is making prefill cheap and throughput high. Everpure Engineering documents a concrete approach: treating the KV cache as a persistent, shared data asset injected via RDMA from NFS or S3 storage rather than recomputed per request, yielding up to 20x faster inference [as described across three companion posts](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Their granular-prompt caching variant segments prompts into reusable chunks via metadata pointers so only changed tokens are processed [cutting time-to-first-token for RAG workloads](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Gergely Orosz's overview of inference engineering [places these techniques in a broader taxonomy](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) alongside quantization, speculative decoding, and disaggregation as the core toolkit of a now-distinct engineering discipline. Netflix operationalizes this discipline at scale, selecting vLLM over TensorRT-LLM and building an OpenAI-compatible API surface with batched constrained decoding [for production workloads across the company](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

Routing is emerging as its own infrastructure layer. DigitalOcean built an Inference Router using a 30B MoE routing model to match each request to the best-fit model for cost, latency, or quality [automatically and at runtime](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The accompanying Arch-Router paper proposes a 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining when new models are added [targeting SOTA alignment with human preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Meanwhile a 75x spread in model pricing — from $0.20/M to $15/M tokens — makes provider-agnostic routing a business necessity, not just a performance optimization [per the AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

At the agent layer, Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces [so the system can evolve as models improve without breaking clients](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). The governance question sits alongside this: Speakeasy describes the "AI control plane" as a unified identity, policy enforcement, tool routing, and observability layer that enterprises need [to manage agents at scale without losing auditability](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). Credential handling is a related gap; Imbue's Latchkey addresses it by injecting API credentials locally so agents authenticate against services [without ever touching raw tokens](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Not every infrastructure choice requires managed cloud scale. The zerostack memory system uses plain Markdown files and regex retrieval instead of vector stores, chosen explicitly for minimal RAM, no daemon process, and provider neutrality [accepting some precision loss for operational simplicity](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). The critique of Ollama follows similar logic from the opposite direction: a tool that started local-first is now tracking a VC-driven cloud pivot [betraying the users who built workflows around its local inference promise](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). Infrastructure choices encode assumptions about ownership, cost, and trust that are hard to reverse once embedded in production.
