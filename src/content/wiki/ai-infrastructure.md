---
title: AI infrastructure
summary: >-
  The systems, services, and architectural patterns that sit beneath AI
  applications: inference optimization, agent hosting, routing, caching, memory,
  credentials, and governance layers.
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
compiled_at: '2026-06-24T04:33:24.241Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1295
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
  cost_usd: 0.038493
---
AI infrastructure has fragmented into several distinct but interlocking layers, each the subject of active engineering and product work.

At the compute and serving layer, inference efficiency is the central cost lever. KV caching has emerged as a major optimization target: [Everpure's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions on NFS and S3, achieving up to 20x faster inference over standard Ethernet without touching model architecture. Their granular-prompt caching extension goes further, [segmenting prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only changed tokens are reprocessed, cutting time-to-first-token for RAG workloads. The underlying argument is that [treating the KV cache as a persistent shared data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) rather than ephemeral GPU memory can reduce prefill costs by up to 20x. Beyond caching, [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) as a discipline covers quantization, speculative decoding, parallelism, and disaggregation as complementary techniques for cheaper serving.

Model routing is a related infrastructure concern. DigitalOcean's Inference Router uses a [30B mixture-of-experts routing model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match each request to the best-fit model for cost, latency, or quality. The companion Arch-Router paper proposes a [1.5B preference-aligned routing model](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) that maps queries to user-defined domains without retraining when new models arrive. The pricing context matters here: a [75x spread between the cheapest and most expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means routing and provider-agnostic design are now direct margin decisions.

For agent hosting specifically, Anthropic's Managed Agents architecture [decouples the agent harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into stable, swappable interfaces so the system can evolve as models improve. Governance across agents is addressed by the [AI control plane pattern](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors): a unified layer for identity, policy enforcement, tool routing, and observability. MCP fits into this picture as an [enterprise governance primitive](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) rather than a developer convenience, providing an auditable proxy between agents and the resources they can reach. Credential management is a related gap addressed by tools like [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which keeps API tokens encrypted on-device so agents can authenticate without seeing raw credentials.

Memory architecture is contested. The zerostack agent uses [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) rather than vector stores, arguing that minimal RAM and no-daemon constraints make simpler storage the better fit. A [detailed walkthrough of the same system](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) confirms that embeddings add infrastructure overhead without commensurate retrieval benefits at small scale.

Local inference tooling has its own infrastructure debates. A [critical history of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues its abstraction over llama.cpp introduced inferior performance, misleading model naming, and a VC-driven pivot away from local-first principles. At the far end of the infrastructure stack, a16z profiles [SpaceX's Starlink and Starship economics](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) as groundwork for orbital AI data centers, framing physical compute infrastructure as ultimately subject to launch cost curves.

Across these layers the recurring theme is that infrastructure choices made early, whether in caching strategy, routing design, memory architecture, or credential handling, compound quickly into cost and reliability outcomes that are difficult to reverse.
