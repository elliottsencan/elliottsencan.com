---
title: AI infrastructure
summary: >-
  The hardware, software, and governance layers that make AI systems run in
  production, from KV cache optimization and inference routing to agent
  sandboxing, credential management, and enterprise control planes.
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
compiled_at: '2026-10-13T00:10:52.202Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1168
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
  cost_usd: 0.038523
---
AI infrastructure spans every layer between a model's weights and a production user request: compute allocation, inference optimization, agent orchestration, memory design, security, and governance. The sources here collectively argue that each of these layers is maturing rapidly, and that decisions made at each level compound in cost, reliability, and capability.

On the inference side, the dominant challenge is compute efficiency. [Everpure's KV caching series](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that persisting and reusing attention states via RDMA-connected fast storage can cut prefill costs up to 20x, and their follow-on work on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are reprocessed. [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates techniques like quantization, speculative decoding, and disaggregation within the broader discipline, while [Netflix's in-house serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what a mature internal stack looks like: engine selection, model packaging, batched constrained decoding, and an OpenAI-compatible API surface.

Routing is becoming its own infrastructure concern. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE orchestration model to match requests to models by cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a smaller 1.5B preference-aligned router that requires no retraining when new models are added. [Model pricing compression](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic routing a financial imperative, not just an engineering preference.

At the agent layer, infrastructure choices shape reliability. [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable, swappable interfaces so agents can be upgraded without breaking callers. The [AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames governance as a first-class infrastructure concern: identity, policy enforcement, tool routing, and observability all need a unified layer across agents and systems. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential management specifically, keeping tokens encrypted on-device so agents authenticate against external services without exposing raw secrets.

Memory design illustrates how infrastructure choices reflect constraints. [zerostack's file-based memory system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with keyword search instead of vector stores, a deliberate tradeoff for minimal RAM and provider neutrality. Separately, [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that local inference tooling can obscure its underlying dependencies and underperform alternatives, a reminder that infrastructure choices carry long-term technical debt.

At the highest level, [AI 2040: Plan A](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a) treats compute itself as a geopolitical resource, and [a16z's SpaceX profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) frames orbital infrastructure as the next layer beneath cloud. [David Crawshaw's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that existing cloud abstractions are wrong at a foundational level, motivating a rebuild from scratch.
