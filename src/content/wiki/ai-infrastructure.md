---
title: AI infrastructure
summary: >-
  The systems, services, and architectural patterns that sit beneath AI
  applications: compute routing, inference optimization, agent hosting, caching
  layers, credential management, and governance proxies.
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
compiled_at: '2026-06-26T02:53:44.784Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1357
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
  cost_usd: 0.039423
---
AI infrastructure has expanded well past GPU procurement. The sources here span several distinct layers: where computation runs, how inference is made cheaper, how agents are hosted and governed, and how credentials and tools reach agents securely.

At the compute layer, inference cost and throughput have become the central engineering problem. KV caching is among the highest-leverage techniques available. Two Everpure Engineering posts argue that treating the KV cache as a persistent, shared data asset can reduce prefill costs by up to 20x [how-to-cut-llm-inference-costs-with-kv-caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and their granular-prompt caching approach segments prompts into reusable chunks via metadata pointers so models only process changed tokens [maximizing-llm-efficiency-granular-prompt-caching-with-pure](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). A companion post shows this working on top of NFS and S3 storage delivered over standard Ethernet [20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Broader inference engineering practice covers quantization, speculative decoding, and disaggregation as well [what-is-inference-engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

Model routing is emerging as its own infrastructure concern. DigitalOcean built an Inference Router that uses a 30B mixture-of-experts model to match each request to the best available model for cost, latency, or quality [how-we-built-digitalocean-inference-router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The companion Arch-Router paper proposes a preference-aligned 1.5B routing model that maps queries to user-defined domains without retraining when new models are added [arch-router-aligning-llm-routing-with-human-preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Pricing pressure makes routing economically important: a 75x gap between the cheapest and most expensive frontier models means model selection directly determines margin [the-ai-model-pricing-war-is-here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

At the agent hosting layer, Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so the serving layer can evolve independently of the model [scaling-managed-agents-decoupling-the-brain-from-the-hands](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Governance sits alongside hosting: the AI control plane pattern adds identity, policy enforcement, tool routing, and observability across all agents in an enterprise deployment [ai-control-plane-architecture-and-vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), and MCP's real value is as a policy-aware, auditable proxy between agents and the resources they touch rather than a convenience layer for developers [no-mcp-is-definitely-not-dead-the-nsa-agrees](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees).

Credential management is a gap the tooling ecosystem is only beginning to address. Latchkey injects API credentials into agent calls locally, keeping tokens encrypted on-device so agents authenticate against external services without ever handling raw credentials [latchkey-credential-layer-for-local-ai-agents](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents). On the memory side, not every workload needs a vector store: zerostack's file-based agent memory system uses plain Markdown and regex retrieval, citing minimal RAM, no daemon requirement, and provider neutrality as sufficient justification [designing-memory-for-zerostack-plain-files-no-vector-store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store).

Local inference tooling has its own infrastructure politics. A critique of Ollama argues that it obscured its llama.cpp dependency, ships inferior inference performance, and is pivoting toward cloud and closed-source products, undermining the local-first premise users adopted it for [friends-dont-let-friends-use-ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). The tension between self-hosted and managed infrastructure runs through most of these sources: convenience and governance tend to favor managed layers, while cost control and data sovereignty push toward local or storage-attached approaches.
