---
title: AI infrastructure
summary: >-
  The systems, abstractions, and operational patterns that underpin running AI
  at scale, from inference optimization and model routing to agent hosting,
  credential management, and the governance layers enterprises need to control
  it all.
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
compiled_at: '2026-08-10T18:56:03.077Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
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
  cost_usd: 0.038928
---
AI infrastructure spans the full stack required to move AI from prototype to production: compute and storage primitives, inference serving engines, routing layers, agent hosting architectures, credential and policy management, and cost-optimization techniques that determine whether a deployment is economically viable.

On the inference side, the gap between naive and optimized serving is large. KV caching is one of the sharpest levers: persisting and sharing attention states across sessions via fast storage rather than recomputing them can cut prefill costs by up to 20x, according to work from Everpure Engineering on [KV cache persistence](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and their [granular-prompt caching system](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Beyond caching, inference engineering now encompasses quantization, speculative decoding, disaggregation, and parallelism, as [Gergely Orosz's survey of the field](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) documents. Netflix's decision to run vLLM in-house rather than TensorRT-LLM, detailed in their [LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), shows how engine choice, model packaging, and OpenAI-compatible API surfaces have become standard production concerns.

Routing is emerging as its own infrastructure discipline. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B preference-aligned routing model that handles domain and action-type classification without retraining as new models are added. Meanwhile the [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) has created a 75x spread between cheapest and most expensive frontier APIs, making provider-agnostic routing an economic necessity rather than an engineering nicety.

At the agent layer, infrastructure choices shape what is even possible. Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the system can evolve as models improve. For lighter deployments, the zerostack project demonstrates the opposite pole: [plain Markdown files and regex search](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) beat vector stores when RAM, daemon overhead, and provider lock-in are real constraints. Credential management at the agent level is addressed by tools like [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which keeps API tokens encrypted on-device so agents can authenticate against external services without ever handling raw credentials.

Governance and control-plane concerns tie the stack together. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) addresses how enterprises unify identity, policy enforcement, tool routing, and observability across every agent and system in their environment. MCP's value in this framing is less about developer convenience and more about providing an [auditable, policy-aware proxy](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) between agents and the resources they are permitted to reach. Evaluation and guardrail infrastructure, like [Plurai's automated training-data generation](/reading/2026-05/2026-05-04t235011-plurai), addresses the quality assurance gap at sub-100ms latency and a fraction of the cost of GPT-as-judge approaches.

Underneath all of this, the cloud abstractions themselves are contested. [David Crawshaw's argument](/reading/2026-07/2026-07-05t170602-building-a-cloud) that VMs tied to fixed resources and slow remote block devices are the wrong foundation suggests the infrastructure layer for AI will continue to be rebuilt, not just configured.
