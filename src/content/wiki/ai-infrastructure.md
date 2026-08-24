---
title: AI infrastructure
summary: >-
  The physical, software, and governance layers that make AI systems operable at
  scale, spanning inference optimization, agent hosting, credential management,
  routing, and the compute economics shaping what's buildable.
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
compiled_at: '2026-08-24T18:39:40.943Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1251
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
  cost_usd: 0.039318
---
AI infrastructure names the stack of concerns beneath the model itself: how inference runs efficiently, how agents are hosted and coordinated, how credentials and policies are enforced, how requests are routed across models, and what the economics of compute allow.

On the inference side, the dominant pressure is cost. Three pieces from Everpure Engineering argue that the KV cache is the most underused lever available. Rather than recomputing attention states on every request, [KV caching persisted to NFS or S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) via RDMA can cut prefill costs by up to 20x. A companion piece on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks, so only changed tokens are processed. The broader framing from [Everpure's cost reduction piece](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) is that treating the KV cache as a shared data asset, not a throwaway computation, is the practical path to enterprise-scale throughput. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these techniques alongside quantization, speculative decoding, and disaggregation as the toolkit inference engineers actually reach for.

Routing is emerging as a distinct infrastructure layer. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE orchestration model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a leaner 1.5B preference-aligned alternative that maps queries to user-defined domains without retraining when new models are added. Both approaches acknowledge that the [pricing war between frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic routing a near-requirement for cost management.

Agent hosting introduces its own infrastructure demands. Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the runtime can evolve without breaking clients. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential management for local agents, keeping API tokens encrypted on-device so agents authenticate against services without ever seeing raw credentials. For governance at enterprise scale, the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept adds a policy-enforcement and observability layer across all agents and the tools they reach.

Not every infrastructure choice trends toward complexity. The zerostack memory system described [here](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and [here](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) uses plain Markdown files and regex search rather than vector stores, arguing that the overhead of embeddings and daemons is unjustified when RAM is constrained and provider neutrality matters. Similarly, [criticism of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) as a local inference tool centers on its abstraction choices obscuring llama.cpp and delivering inferior performance relative to running the underlying engine directly.

At the hardware and platform layer, Netflix's [in-house LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) illustrates what vertical integration looks like in practice: choosing vLLM over TensorRT-LLM, building an OpenAI-compatible API surface, and owning batched constrained decoding end to end. [David Crawshaw's critique of current cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources and slow remote block devices are the wrong foundation for AI workloads, motivating a ground-up rebuild.
