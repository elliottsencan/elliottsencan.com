---
title: AI infrastructure
summary: >-
  The hardware, serving, storage, and governance layers that run AI systems in
  production, covering compute strategy, KV caching, inference optimization,
  agent hosting, routing, and control-plane governance.
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
compiled_at: '2026-06-22T07:14:57.450Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6210
    output_tokens: 1323
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
  cost_usd: 0.038475
---
AI infrastructure spans everything below the model weights: the compute strategies that determine where models run, the serving systems that make inference fast and cheap, the storage architectures that manage attention state, the hosting layers that run agents at scale, and the governance planes that control what those agents can touch.

On the compute side, orbital and terrestrial investment is accelerating. A16z frames Starlink revenue and Starship reusability as a path toward orbital AI data centers [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun), while Stratechery notes the broader Cold War 2.0 pressure shaping domestic AI compute strategy [He Came, He Saw, He Cooked](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked).

Inference cost and latency are now first-order engineering problems. The Pragmatic Engineer surveys the techniques practitioners use: quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). A specific mechanism receiving sustained attention is the KV cache. Everpure argues the cache should be treated as a persistent shared data asset injected via RDMA rather than recomputed per request, with potential 20x prefill cost reductions [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their Pure KVA product extends this further by segmenting prompts into reusable chunks via metadata pointers, so only changed tokens are processed [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and a companion post demonstrates KV persistence on NFS and S3 over standard Ethernet [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Routing sits between serving and application logic. DigitalOcean built an Inference Router that uses a 30B MoE model to dispatch each request to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The academic counterpart, Arch-Router, uses a compact 1.5B model to map queries to user-defined domains without retraining when new models are added [Arch-Router: Aligning LLM Routing with Human Preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). The collapse in model pricing, with a 75x gap now separating cheap and expensive frontier models, makes routing decisions directly margin-relevant [The AI Model Pricing War Is Here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

At the agent hosting layer, Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients [Scaling Managed Agents: Decoupling the Brain from the Hands](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Memory storage is a design variable: zerostack uses plain Markdown files with regex retrieval instead of vector stores, prioritizing minimal RAM and provider neutrality [Designing Memory for zerostack: Plain Files, No Vector Store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store).

Governance and policy enforcement are emerging as a distinct infrastructure layer. Speakeasy's AI control plane reference architecture unifies identity, policy enforcement, tool routing, and observability across agents [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP occupies a similar governance position: its value is not developer ergonomics but auditable proxy control between agents and the resources they can reach [No, MCP is Definitely Not Dead. The NSA Agrees.](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). At the model evaluation layer, Plurai automates training-data generation and deploys guardrail models at sub-100ms latency without annotation pipelines [Plurai](/reading/2026-05/2026-05-04t235011-plurai).
