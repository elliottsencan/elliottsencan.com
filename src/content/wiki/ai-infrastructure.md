---
title: AI infrastructure
summary: >-
  The hardware, hosting, caching, routing, and governance layers that make
  LLM-powered systems run at production scale, spanning everything from KV cache
  design to agent control planes.
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
compiled_at: '2026-08-03T19:30:09.210Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1278
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
  cost_usd: 0.039723
---
AI infrastructure covers the stack below the model: how inference is served cheaply, how requests are routed to the right model, how agents are hosted and governed, and how credentials, memory, and policy are managed across distributed systems.

Inference cost and throughput sit at the center. The KV cache, which stores attention states so the model does not recompute them, is the most tractable lever. [Everpure's engineering posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that treating the KV cache as a persistent, shared data asset injected via RDMA can cut prefill costs by up to 20x. Their follow-up on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks via metadata pointers so only changed tokens are processed, and their [KVA for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions without changing model architecture. The [Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) places caching alongside quantization, speculative decoding, and disaggregation as the core toolkit practitioners reach for.

Routing is the next frontier. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit provider on cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a leaner approach: a 1.5B model maps queries to user-defined domains and action types, achieving competitive alignment with human preferences without retraining when models change. The pricing pressure making this worthwhile is real: a [Superframeworks analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between cheapest and most expensive frontier models, with the floor collapsing fast enough to open business models that were unprofitable a year ago.

At the agent layer, Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the execution environment can evolve independently of the model. Governance across agents requires its own layer: [Speakeasy's AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this as unified identity, policy enforcement, tool routing, and observability; [Stephane Derosiaux on MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues the protocol's real value is as a policy-aware, auditable proxy between agents and the resources they can touch. Credential management gets its own solution in [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which keeps API tokens encrypted on-device so agents authenticate against services without ever seeing raw credentials.

Memory is where infrastructure choices diverge most. [Netflix's in-house LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) describes a full serving stack built on vLLM with OpenAI-compatible APIs. At the opposite extreme, the [zerostack memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown files on disk with regex retrieval, rejecting vector stores entirely on the grounds of minimal RAM, no daemon, and provider neutrality. The [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates how local inference tooling can drift from its founding constraints once VC pressure and cloud pivots enter the picture.

The abstraction layer under all of this also has critics. [David Crawshaw's cloud rethink](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that VMs tied to fixed resources, slow remote block storage, and expensive networking are fundamentally wrong primitives for AI workloads, and that the industry needs clouds built from scratch rather than retrofitted.
