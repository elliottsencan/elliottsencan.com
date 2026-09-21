---
title: AI infrastructure
summary: >-
  The hardware, software, and architectural layers that make AI systems run at
  scale, from KV caching and inference routing to agent harnesses, credential
  management, and governance control planes.
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
compiled_at: '2026-09-21T21:45:06.826Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1293
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
  cost_usd: 0.040398
---
AI infrastructure spans everything below the model API: the serving engines that generate tokens, the caches that avoid regenerating them, the routing layers that dispatch requests, the sandboxes that run agents, and the governance planes that control what those agents are allowed to touch.

On the inference side, the central cost problem is prefill: recomputing attention states for long, repeated prompts burns GPU cycles and inflates latency. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the solution as treating the KV cache as a persistent, shared data asset, injected from fast storage via RDMA, which can reduce prefill costs by up to 20x. [Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this with granular-prompt caching, segmenting prompts into reusable chunks via metadata pointers so only changed tokens get processed, cutting time-to-first-token for RAG workloads. [Pure Storage's KVA on NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) demonstrates the same gains over standard Ethernet without touching model architecture. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows how a major consumer of inference chose vLLM over TensorRT-LLM, built an OpenAI-compatible API surface, and handles batched constrained decoding at scale. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys the full technique stack: quantization, speculative decoding, caching, parallelism, and disaggregation.

Routing is a second major layer. As model prices have collapsed, with a 75x spread between cheapest and most expensive options [noted here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on), dispatching each request to the right model for cost or quality becomes an infrastructure concern, not an application concern. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE routing model to match requests automatically. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B alternative that aligns routing with user-defined domain and action preferences without retraining when new models arrive.

For agent systems, infrastructure concerns shift toward isolation, persistence, and governance. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into stable, swappable interfaces so the serving layer can be upgraded independently of client code. Memory storage is a design choice with real tradeoffs: [zerostack's file-based memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and [its companion design writeup](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) argue that plain Markdown files and regex search outperform vector stores when RAM, daemon processes, and provider lock-in are constraints. Credential handling is another gap: [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) encrypts API tokens on-device so agents can authenticate against external services without ever seeing raw credentials.

At the governance layer, the [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept proposes a unified policy, identity, and observability layer across all agents and tools an enterprise deploys. [MCP as enterprise governance](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) frames the protocol similarly: a policy-aware, auditable proxy between agents and the resources they can reach, a function CLIs cannot provide at scale.

Underlying all of this is a question about whether current cloud abstractions are adequate. [David Crawshaw's exe.dev announcement](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues they are not: VMs tied to fixed resources, slow remote block devices, and expensive networking are wrong primitives for workloads that burst unpredictably and require tight memory bandwidth, which describes LLM inference exactly.
