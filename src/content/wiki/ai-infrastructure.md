---
title: AI infrastructure
summary: >-
  The systems, abstractions, and economic pressures beneath modern AI
  deployments: inference serving, caching, routing, agent hosting, control
  planes, and the storage and networking layers that determine cost and latency
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
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-11-24T03:51:07.334Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
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
  cost_usd: 0.040878
---
AI infrastructure names the layer between raw model weights and working product: the hardware, software, and architectural decisions that determine whether a deployment is fast, cheap, and governable. The sources here span that stack from silicon to governance.

Inference serving is the most operationally visible layer. [Netflix's in-house LLM platform](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for engine flexibility and runs OpenAI-compatible APIs with batched constrained decoding, treating inference as a first-class engineering discipline. [Gergely Orosz's interview with a Baseten engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) formalizes this as "inference engineering" — a specialization covering quantization, speculative decoding, parallelism, and disaggregation. The common thread is that inference is not a commodity; every technique represents a real cost-latency tradeoff.

KV caching sits at the center of inference cost reduction. Three Everpure posts argue that recomputing attention states per request is wasteful. [Persistent KV caches on NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) can cut prefill costs by up to 20x; [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. [The conceptual case for this](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the KV cache as a data asset to be managed, not a side effect to be discarded. The KV cache's mechanics are grounded further in [a plain-language explanation of transformer internals](/reading/2026-08/2026-08-29t224355-how-llms-actually-work).

Routing is an emerging peer to caching as a cost lever. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best available model for the given cost, latency, or quality constraint. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to domains without retraining when new models are added. With a 75x spread between the cheapest and most expensive frontier APIs, [provider-agnostic architecture](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) is now a margin question, not an engineering preference.

Above the inference layer, agent hosting introduces its own infrastructure concerns. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the runtime can evolve without breaking clients. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) adds a governance layer: unified identity, policy enforcement, tool routing, and observability across all agents. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential management specifically, keeping tokens encrypted on-device so agents authenticate without ever seeing raw secrets.

Not all infrastructure needs are complex. [Zerostack's memory subsystem](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) stores agent state in plain Markdown files with regex retrieval, skipping vector stores entirely on the grounds that minimal RAM and provider neutrality matter more than semantic search precision. Meanwhile, [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates how infrastructure choices carry organizational weight: abstraction layers that obscure dependencies and VC-driven cloud pivots can undermine local-first commitments that users originally chose the tool for.

At the furthest horizon, [the AI 2040 policy scenario](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a) and [a16z's orbital data center framing](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) both treat physical compute capacity as a geopolitical variable, not just an engineering one. Infrastructure at that scale is inseparable from questions of who controls the hardware and where it sits.
