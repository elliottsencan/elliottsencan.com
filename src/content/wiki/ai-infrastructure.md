---
title: AI infrastructure
summary: >-
  The systems, abstractions, and cost structures that support deploying,
  serving, and governing AI models at scale, spanning inference optimization,
  agent architecture, credential management, and control-plane governance.
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
compiled_at: '2026-09-14T21:30:58.460Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1121
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
  cost_usd: 0.037818
---
AI infrastructure covers every layer between a raw model and a production system: where compute runs, how requests are routed, how state is persisted, how credentials flow, and how costs are controlled. The sources here collectively trace a discipline that is rapidly specializing into discrete sub-fields.

At the inference layer, the core challenge is reducing the cost of turning tokens into outputs. KV caching is the most discussed lever: [Everpure's engineering posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that treating the KV cache as a persistent, shared storage asset injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x. Their follow-up on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed, which helps RAG and enterprise workloads with repetitive context. [Pure Storage's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states on NFS and S3 without model changes. Beyond caching, [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs complementary techniques: quantization, speculative decoding, parallelism, and disaggregation as a maturing engineering specialty. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) provides a production example, choosing vLLM over TensorRT-LLM and building OpenAI-compatible APIs with batched constrained decoding at scale.

Request routing is becoming its own infrastructure concern. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to domains and action types without retraining when new models are added.

On the agent side, [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the system can evolve as models improve. [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes a governance layer that unifies identity, policy enforcement, tool routing, and observability across agents. Credential security gets its own tool in [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which keeps API tokens encrypted on-device so agents authenticate without ever seeing raw credentials. At the memory layer, [zerostack's design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) demonstrates that plain Markdown files and keyword search can replace vector stores entirely when RAM and daemon constraints dominate.

Cloud abstraction is also under pressure. [David Crawshaw's critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources and slow remote block devices are the wrong primitives for AI workloads, and announces a rebuild from scratch. The [AI pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) — a 75x spread between cheapest and most expensive frontier models — reinforces that infrastructure decisions are now margin decisions, and provider-agnostic design is a prerequisite for durable unit economics.
