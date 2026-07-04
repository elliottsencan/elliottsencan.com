---
title: AI infrastructure
summary: >-
  The hardware, storage, routing, governance, and packaging layers that make LLM
  and agent systems operable at scale, spanning KV cache optimization, inference
  routing, control planes, and local tooling.
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
compiled_at: '2026-07-04T21:16:50.637Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1443
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
  cost_usd: 0.040713
---
AI infrastructure names the substrate beneath model calls: the caching, routing, governance, memory, and packaging decisions that determine whether an AI system is fast, cheap, auditable, and maintainable in production.

On the inference side, the clearest lever is KV cache management. Rather than recomputing attention states on every request, Everpure's engineering posts describe persisting those states to NFS and S3 via RDMA, achieving up to 20x faster prefill [20x faster inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Their granular-prompt caching extension goes further, segmenting prompts into reusable chunks keyed by metadata pointers so only changed tokens are reprocessed [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). The theoretical grounding appears in a companion piece arguing that treating the KV cache as a shared data asset, rather than an ephemeral GPU artifact, is the highest-leverage cost reduction available to enterprise deployments [KV caching costs](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Gergely Orosz's inference engineering overview situates these alongside quantization, speculative decoding, and disaggregation as the standard toolkit [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

Routing is the next layer. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality in real time [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The Arch-Router paper proposes a lighter 1.5B preference-aligned alternative that maps queries to user-defined domains without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). As the pricing floor collapses, with a 75x gap between the cheapest and most expensive frontier models, routing and provider-agnostic design become direct margin decisions [pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

Above routing sits governance. The AI control plane concept formalizes a layer that unifies identity, policy enforcement, tool routing, and observability across every agent and system in an enterprise [control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP fits here too: its real value is as a policy-aware, auditable proxy between agents and the resources they are allowed to touch, not as a developer convenience [MCP governance](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Anthropic's managed-agent architecture separates the agent harness, session log, and sandbox into stable interfaces so the system can be upgraded as models improve without breaking clients [managed agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Credential management is its own concern: Latchkey handles it by encrypting API tokens on-device so agents authenticate against external services without ever holding raw credentials [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

At the smaller end, infrastructure choices can be deliberately minimal. The zerostack agent stores memory as plain Markdown files with regex retrieval, trading semantic search for zero RAM overhead, no daemon, and provider neutrality [zerostack memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) [Xavier's walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). The Ollama critique makes the same point from the opposite direction: infrastructure that hides its internals behind a convenient wrapper can underperform and lock users into a cloud pivot they did not choose [Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). Packaging and distribution matter at scale too: Anthropic's MCPB format lets a local MCP server ship as a single-click bundle, lowering the installation barrier without centralizing control [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb).

The strategic stakes are large. A16z frames orbital AI data centers as the long-horizon infrastructure bet, with Starlink revenue and Starship cost reductions as the path there [SpaceX](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun). Ben Thompson's compute strategy coverage traces how the same logic plays out in Cold War 2.0 terms, where AI compute capacity is a geopolitical variable [compute strategy](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked). The infrastructure layer, from KV cache to orbital data center, is where the economics of AI get decided.
