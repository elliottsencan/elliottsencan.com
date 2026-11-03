---
title: AI Infrastructure
summary: >-
  The hardware, serving systems, orchestration layers, and operational patterns
  that make AI models deployable at scale, from KV cache optimization and
  inference routing to agent sandboxes, credential management, and governance
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
  - 2026-06/2026-06-21t231454-spacex-and-the-sentient-sun
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-07/2026-07-05t170602-building-a-cloud
  - 2026-07/2026-07-09t161342-ai-2040-plan-a
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-11-03T00:32:38.922Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1337
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
  cost_usd: 0.041058
---
AI infrastructure names the full stack beneath a working AI system: compute, serving engines, caching layers, orchestration, identity, and policy enforcement. The field has developed rapidly enough that each layer is now its own engineering discipline.

At the serving layer, the core problem is inference cost and latency. Netflix chose vLLM over TensorRT-LLM for in-house serving based on engine flexibility and an OpenAI-compatible API surface [in-house-llm-serving-at-netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), while Gergely Orosz documents the broader toolkit practitioners use: quantization, speculative decoding, parallelism, and disaggregation [what-is-inference-engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). A persistent theme across these sources is that recomputing attention states on every request is unnecessary and expensive. Everpure's KVA system persists and reuses KV cache across sessions via NFS and S3, delivering up to 20x faster inference over standard Ethernet [20x-faster-inference-kv-cache](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), and granular-prompt caching segments prompts into reusable chunks so LLMs only process changed tokens [granular-prompt-caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure).

Routing intelligence is emerging as a distinct infrastructure concern. DigitalOcean's Inference Router uses a 30B MoE model to match each request to the optimal backend for cost, latency, or quality [inference-router-architecture](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a lighter 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining when new models are added [arch-router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). With a 75x price gap now separating cheap and premium frontier models, routing decisions have direct margin consequences [ai-model-pricing-war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

Above the serving layer, agent infrastructure introduces new requirements around session management, sandboxing, and memory. Anthropic's Managed Agents architecture separates the agent harness, session log, and execution sandbox into stable interfaces so the orchestration layer can evolve independently of the underlying model [managed-agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). At the opposite extreme, zerostack's agent memory system uses plain Markdown files with regex retrieval, deliberately avoiding vector stores and embeddings to minimize RAM and infrastructure dependencies [memory-design-zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack); a companion writeup elaborates the provider-neutrality argument [zerostack-memory-plain-files](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). These two approaches represent a genuine design fork: managed cloud infrastructure versus minimal local primitives.

Governance and security form a third layer. The AI control plane concept groups identity, policy enforcement, tool routing, and observability into a unified governance fabric for enterprise deployments [ai-control-plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP fits into this picture as a policy-aware proxy between agents and the resources they can touch, with the NSA endorsement cited as evidence that its real audience is enterprise compliance teams [mcp-not-dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Credential management is handled separately by tools like Latchkey, which encrypts API tokens on-device so agents authenticate against external services without handling raw credentials [latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Underlying all of this is pressure on the compute substrate itself. David Crawshaw argues that current cloud platforms are built on wrong abstractions, with VMs tied to fixed resources and slow remote block devices, and is building a new cloud from scratch [building-a-cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud). At a geopolitical scale, AI 2040 researchers treat compute control as a policy instrument, proposing mutually assured compute destruction to slow unilateral AGI development [ai-2040-plan-a](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a).
