---
title: AI infrastructure
summary: >-
  The hardware, hosting, caching, routing, and governance layers that turn raw
  model capabilities into reliable, cost-effective production systems, with
  tradeoffs visible across inference optimization, agent hosting, and enterprise
  control planes.
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
compiled_at: '2026-06-22T02:29:06.794Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6032
    output_tokens: 1047
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
  cost_usd: 0.033801
---
AI infrastructure spans the full stack between a model's weights and the application code that calls them. That stack has grown substantially more complex as inference costs, agent orchestration, and enterprise governance demands have pulled in different directions.

At the compute layer, inference optimization is now its own engineering discipline. [Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) documents techniques like quantization, speculative decoding, and disaggregated prefill/decode that meaningfully shift cost and latency curves. One of the most tractable gains is KV caching: rather than recomputing attention states on every request, a persistent cache can cut prefill costs by up to 20x according to [Everpure's analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their follow-on work on granular-prompt caching segments prompts into reusable chunks so only changed tokens are processed, reducing time-to-first-token for RAG workloads [further](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Pure Storage's KVA demonstrates this at the storage layer, persisting attention states across sessions on NFS and S3 without altering the model stack [itself](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Routing is becoming a first-class infrastructure concern as model choice proliferates. The [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) has opened a 75x gap between cheapest and most expensive providers, making provider-agnostic design a financial necessity. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to automatically match requests to the best model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with human preferences using a compact 1.5B model that requires no retraining when new models are added.

For agent workloads, infrastructure decisions shape reliability more than model capability. Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the system can evolve independently of underlying models. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept extends this to enterprise governance: a unified layer for identity, policy enforcement, tool routing, and observability across every agent and system. MCP fits into that picture as an auditable proxy between agents and resources, with [real value in enterprise governance](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) rather than developer convenience.

Not all infrastructure choices favor complexity. The zerostack agent's [file-based memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown and regex retrieval instead of vector stores, optimizing for minimal RAM, no daemon process, and provider neutrality. Meanwhile, the [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates how infrastructure tooling can drift from its original constraints when VC pressure and cloud pivots enter the picture, introducing performance regressions and naming confusion along the way.
