---
title: AI infrastructure
summary: >-
  The stack of compute, caching, routing, storage, governance, and runtime
  layers that make LLM-based systems operable at scale, spanning decisions from
  KV cache design to agent orchestration to credential management.
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
compiled_at: '2026-07-01T00:34:04.991Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1225
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
  cost_usd: 0.037443
---
AI infrastructure names the set of systems engineers must build or buy below the model itself: the serving layer, caching layer, routing layer, governance layer, and runtime environment that together determine whether an AI product is actually viable in production.

On the compute and serving side, inference engineering has matured into its own discipline. [Philip Kiely's breakdown via The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers quantization, speculative decoding, KV caching, parallelism, and prefill/decode disaggregation as standard levers for reducing latency and cost. The KV cache in particular has become a first-class infrastructure concern: Everpure's engineering posts argue that treating the cache as a [persistent, shared data asset injected via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x, and their [granular-prompt caching system](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed. Their [Pure KVA product](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions on NFS and S3 without touching model architecture.

Routing is a parallel axis. DigitalOcean's Inference Router uses a [30B mixture-of-experts routing model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a lighter 1.5B alternative that aligns routing decisions with user-defined preferences without retraining when new models are added. Both approaches reflect the same pressure: a [75x spread in model pricing](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic routing economically necessary, not optional.

At the agent runtime layer, Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the agent harness, session log, and sandbox into stable interfaces so the hosting layer can be upgraded independently of the model. Governance sits alongside this: the [AI control plane concept](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) unifies identity, policy enforcement, tool routing, and observability across agents, and [MCP's enterprise case](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) rests on the same logic: a policy-aware proxy between agents and resources that CLIs cannot replicate at scale. Credential management is the concrete edge of this: [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device so agents can authenticate against external services without ever handling raw credentials.

Not all infrastructure decisions push toward complexity. The zerostack agent uses [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) in place of vector stores, fitting the constraints of minimal RAM and no persistent daemon. [AlphaSignal's review of agent architecture research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, suggesting single-agent defaults are often the right infrastructure choice.

The local inference tooling layer has its own tensions. A detailed [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues the project obscured its llama.cpp dependency, ships inferior inference performance, and is pivoting toward a closed-source cloud model, which matters because the choice of local inference runtime affects portability and performance at every layer above it.
