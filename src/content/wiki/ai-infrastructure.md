---
title: AI infrastructure
summary: >-
  The systems, services, and architectural patterns that make AI deployment
  practical at scale, spanning inference optimization, agent hosting, routing,
  caching, security, and governance layers.
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
compiled_at: '2026-07-02T12:24:40.101Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1322
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
  cost_usd: 0.038898
---
AI infrastructure has fragmented into several distinct but interlocking layers, each addressing a different bottleneck that appears when you move AI from prototype to production.

At the compute and serving layer, inference engineering has become its own discipline. [Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers techniques like quantization, speculative decoding, and disaggregation that let teams squeeze more throughput from the same hardware. A concrete cost lever at this layer is KV cache management. [Everpure's three-part series](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent, shared data asset, injected via RDMA from fast storage rather than recomputed each request, can reduce prefill costs by up to 20x. The follow-on piece on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks via metadata pointers so only changed tokens are processed, and [Pure KVA for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) demonstrates the approach on standard object storage without changing the model architecture.

Above the serving layer sits routing. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a leaner 1.5B preference-aligned router that maps queries to user-defined domains without retraining when new models join the pool. Both approaches respond to the same economic pressure: the [pricing war piece](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between cheapest and most expensive frontier models, making provider-agnostic routing a financial necessity rather than an engineering nicety.

For agent deployments, infrastructure concerns shift toward session management, tool access, and governance. Anthropic's [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients. The [AI control plane piece](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this governance requirement more broadly: enterprises need a unified layer for identity, policy enforcement, tool routing, and observability across every agent they operate. [MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) fits into this picture as the policy-aware proxy between agents and the resources they are allowed to touch, with Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) addressing the distribution side by packaging local servers as single-click bundles.

Security and credential management are a distinct sub-layer. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) handles credential injection for local agents, encrypting tokens on-device so agents authenticate against external services without ever seeing raw credentials. [OpenAI's PII-detection model](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter) addresses data exposure in the request path itself.

Memory and retrieval present a design choice that often gets over-engineered. Both [zerostack posts](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) make the case that plain Markdown files with keyword search can outperform vector stores when constraints favor minimal RAM and no persistent daemon, pushing back against the assumption that sophisticated infrastructure is always better infrastructure.

Looking further out, [a16z's SpaceX profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) frames orbital AI data centers as a plausible endpoint for compute infrastructure, while the [Stratechery roundup](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked) touches on AI compute strategy as a geopolitical variable in Cold War 2.0 dynamics.
