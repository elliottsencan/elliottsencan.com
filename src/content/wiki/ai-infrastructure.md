---
title: AI infrastructure
summary: >-
  The hardware, storage, serving, routing, and governance layers that make AI
  systems run in production, from KV cache optimization and inference routing to
  agent sandboxing, credential management, and enterprise control planes.
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
compiled_at: '2026-07-08T00:09:56.948Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6497
    output_tokens: 1085
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
  cost_usd: 0.035766
---
AI infrastructure is the set of systems that sit between a model and a production workload: compute management, inference optimization, agent hosting, policy enforcement, and the operational tooling that ties them together.

On the inference side, the dominant cost lever right now is the KV cache. Rather than recomputing attention states on every request, systems can persist and reuse them. [Everpure's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) stores these states on NFS and S3 via RDMA, claiming up to 20x faster inference without changing model architecture. A companion technique, [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), segments prompts into reusable chunks via metadata pointers so only changed tokens get reprocessed, which cuts time-to-first-token in RAG pipelines. The underlying principle, laid out in a [broader Everpure post](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), is treating the KV cache as a shared persistent data asset rather than ephemeral GPU memory.

Above the cache layer, inference routing is maturing into its own discipline. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit backend for cost, latency, or quality. The accompanying [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that maps queries to user-defined domains without retraining when new models are added. [Pragmatic Engineer's inference engineering explainer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames these techniques, quantization, speculative decoding, disaggregation, and caching, as a coherent engineering specialty that now warrants dedicated headcount.

For agent systems, infrastructure concerns shift toward session management, sandboxing, and credential isolation. Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces so the hosting layer can swap models without breaking clients. On the credential side, [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device and injects them into agent calls, so agents never handle raw credentials. Governance at scale requires more: the [AI control plane pattern](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) unifies identity, policy enforcement, and observability across every agent and tool in an enterprise, a concern echoed in the argument that [MCP's real value](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) is as a policy-aware auditable proxy between agents and resources.

At the storage and compute substrate level, [David Crawshaw's analysis](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that current cloud primitives, VMs with fixed resources and slow remote block storage, are wrong abstractions for AI workloads, and that the economics of inference demand rebuilding those foundations. The pricing dimension matters too: a [75x spread between cheapest and most expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic infrastructure a financial necessity, not just good architecture hygiene.
