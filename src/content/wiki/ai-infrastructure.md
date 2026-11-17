---
title: AI infrastructure
summary: >-
  The hardware, storage, routing, serving, and governance layers that make
  running AI models in production tractable, covering everything from KV cache
  design to agent credential management and control-plane governance.
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
compiled_at: '2026-11-17T01:37:15.256Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1341
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
  cost_usd: 0.041118
---
AI infrastructure spans the full stack between a trained model and a production system: how inference is served cheaply, how agents authenticate and persist memory, how requests are routed across models, and how enterprises govern all of it. The sources here collectively map that stack from silicon economics down to developer tooling.

At the compute and serving layer, the core problem is cost and throughput. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) details a full serving stack built on vLLM with OpenAI-compatible APIs, batched constrained decoding, and deliberate engine selection over TensorRT-LLM. The [inference engineering primer from The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames the discipline around quantization, speculative decoding, caching, parallelism, and disaggregation. Both converge on the KV cache as the central optimization target. Three Everpure pieces elaborate: [KV caching basics](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues for treating the cache as a persistent shared asset injected via RDMA rather than recomputed, claiming up to 20x prefill savings; [granular-prompt caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks keyed by metadata pointers; and [KV cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) shows the same gains over standard Ethernet storage without model changes.

Routing sits above inference. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best model for cost, latency, or quality in real time. The companion [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned router that maps queries to user-defined domains without retraining when new models join. As the [AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes clear, the 75x spread between cheapest and most expensive frontier models means routing decisions directly determine margin.

For agents specifically, infrastructure concerns shift toward memory, credentials, and orchestration. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the runtime can evolve as models improve. Zerostack takes the opposite approach: [file-based memory on disk](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) with plain Markdown and regex retrieval, requiring no vector store or daemon, a tradeoff [Xavier's writeup](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) justifies on RAM and provider-neutrality grounds. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential management by keeping API tokens encrypted on-device so agents authenticate without ever seeing raw secrets.

Governance ties the agent layer together. The [AI control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames enterprise AI infrastructure as requiring a unified layer for identity, policy enforcement, tool routing, and observability. [MCP's enterprise case](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) argues the protocol's value is precisely this: a policy-aware auditable proxy between agents and resources, not a developer convenience. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses evaluation infrastructure specifically, auto-generating guardrail models at sub-100ms latency without labeled data.

At the far edge, [Ollama's critics](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) and [exe.dev's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) both argue that existing infrastructure abstractions are misaligned with actual workloads, Ollama hiding its llama.cpp dependency while drifting cloud-ward, and current VM-based clouds imposing wrong resource boundaries for AI serving. Both suggest the infrastructure stack is still early.
