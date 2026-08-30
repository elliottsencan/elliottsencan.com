---
title: AI infrastructure
summary: >-
  The physical, architectural, and operational layers that AI systems run on,
  spanning inference engines, caching strategies, routing, agent hosting,
  governance planes, and the cloud primitives beneath them all.
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
compiled_at: '2026-08-30T05:47:25.011Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1227
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
  cost_usd: 0.039408
---
AI infrastructure is the stack between a model's weights and the work it actually does. It includes how inference is served, how costs are controlled, how agents are hosted and coordinated, and how organizations govern what their AI systems are allowed to touch. The sources here map that stack from the hardware primitives up through enterprise governance.

At the inference layer, the core challenge is throughput at acceptable cost. [Netflix's AI Platform](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for its flexibility and runs a full in-house serving stack with an OpenAI-compatible API surface, batched decoding, and structured deployment strategies. [Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the practitioner toolkit: quantization, speculative decoding, KV caching, parallelism, and prefill/decode disaggregation.

KV caching in particular has attracted dedicated infrastructure investment. [Everpure's first post](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared data asset, injected via RDMA rather than recomputed, can reduce prefill costs by up to 20x. [Their KVA product](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions on NFS and S3, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks via metadata pointers so only changed tokens are reprocessed.

Above the inference engine sits routing. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a different approach, using a compact 1.5B model to align routing decisions with user-defined preferences and domain classifications, without retraining when new models are added.

For agent workloads specifically, hosting and coordination introduce their own infrastructure requirements. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the underlying model can be upgraded without breaking the surrounding system. That architectural discipline matters because, as [AlphaSignal's analysis](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) shows, multi-agent orchestration carries a hidden coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x.

Governance across agents is addressed by the AI control plane pattern. [Speakeasy's reference architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this as the layer that unifies identity, policy enforcement, tool routing, and observability across every AI system in an enterprise. [MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) fits into this picture as a policy-aware, auditable proxy between agents and the resources they are allowed to touch. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) handles the credential slice of that problem locally, encrypting API tokens on-device so agents never see raw credentials.

At the lowest layer, [David Crawshaw's exe.dev project](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that current cloud abstractions, VMs tied to fixed resources and slow remote block storage, are the wrong foundation for compute-intensive workloads and announces a rebuild from scratch. Meanwhile, [a16z's SpaceX profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) points toward orbital AI data centers as a longer horizon for where raw compute may eventually live.
