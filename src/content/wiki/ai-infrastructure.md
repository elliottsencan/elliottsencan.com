---
title: AI infrastructure
summary: >-
  The hardware, serving stacks, routing layers, control planes, and storage
  architectures that make large-scale AI deployment practical — and the
  tradeoffs that shape every design decision within them.
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
compiled_at: '2026-10-19T22:02:38.176Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1238
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
  cost_usd: 0.039573
---
AI infrastructure names the layer beneath the model: the serving engines, caching systems, routing logic, governance planes, and storage primitives that determine whether AI systems run cheaply and reliably in production. The sources here cover it from several angles, and together they sketch a field in rapid, uneven maturation.

On the serving side, inference engineering has become a distinct discipline. [Philip Kiely's breakdown via Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) describes quantization, speculative decoding, KV caching, and disaggregation as the core toolkit, and notes that investment in these techniques only pays off at sufficient scale. Netflix put this concretely: their AI Platform team [chose vLLM over TensorRT-LLM](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) and built an OpenAI-compatible API surface, model packaging pipeline, and batched constrained decoding to serve multiple teams from a single in-house stack.

KV caching alone is attracting dedicated infrastructure. Everpure argues in three related posts that [treating the KV cache as a persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x. Their [granular-prompt caching approach](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks via metadata pointers, and [Pure KVA extends this to S3 and NFS storage](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), achieving 20x faster inference over standard Ethernet without touching model architecture.

Routing is the other emerging layer. DigitalOcean's [Inference Router uses a 30B MoE model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match each request to the best-fit model for cost, latency, or quality. The accompanying [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) compresses this into a 1.5B model aligned to human preferences that can route without retraining when new models are added. Meanwhile, the [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic routing a business necessity: a 75x price gap between endpoints means routing decisions directly determine margin.

Governance and control have their own layer. [Speakeasy's control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this as a unified identity, policy enforcement, and observability surface sitting above every agent and model. [Stephane Derosiaux makes a similar case for MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) as an auditable proxy between agents and the resources they're allowed to touch. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses a more local variant of this: credential injection for on-device agents that need to authenticate against external services without exposing raw tokens.

At the agent layer, Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. The [zerostack memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) sits at the opposite end of the complexity spectrum: plain Markdown files and regex search, no vector store, no daemon, chosen explicitly to minimize infrastructure dependencies.

Underlying all of this is a premise that [David Crawshaw challenges directly](/reading/2026-07/2026-07-05t170602-building-a-cloud): current cloud abstractions, VMs tied to fixed resources, slow remote block storage, expensive networking, are wrong for the workloads AI infrastructure actually runs. Whether that critique lands depends on how much of the stack teams control, but it names a tension present across every other source here.
