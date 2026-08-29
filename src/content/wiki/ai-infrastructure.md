---
title: AI infrastructure
summary: >-
  The hardware, software, and architectural patterns that make AI systems run in
  production, from KV cache optimization and inference routing to agent hosting,
  credential management, and governance layers.
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
compiled_at: '2026-08-29T20:10:30.798Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1449
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
  cost_usd: 0.042288
---
AI infrastructure spans everything below the model weights: the serving engines, caching strategies, routing layers, sandboxed execution environments, and governance planes that make AI systems reliable and cost-effective at scale. The sources here cluster around a few interlocking concerns.

Inference efficiency is the most technically dense cluster. Everpure Engineering argues that the KV cache should be treated as a persistent, shared data asset rather than an ephemeral computation, injecting attention states from fast storage via RDMA to cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their follow-up shows granular-prompt caching segmenting prompts into reusable chunks so only changed tokens are processed [Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), while a third piece extends this to S3 and NFS-backed storage [20x Faster Inference with KVA for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Gergely Orosz's interview with a Baseten engineer maps the broader inference engineering toolkit: quantization, speculative decoding, parallelism, and disaggregation [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Netflix's in-house serving writeup adds a production perspective, detailing engine selection (vLLM over TensorRT-LLM), model packaging, and batched constrained decoding [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

Model routing sits adjacent to inference. DigitalOcean's Inference Router uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The Arch-Router paper proposes a compact 1.5B preference-aligned routing model that can absorb new models without retraining [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Meanwhile, a pricing analysis notes a 75x spread between the cheapest and most expensive frontier models, making provider-agnostic architecture a financial necessity rather than a nice-to-have [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

At the agent execution layer, Anthropic's Managed Agents architecture separates the harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). The enterprise governance counterpart is the AI control plane: a unified layer for identity, policy enforcement, tool routing, and observability across all agents [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP fits here too, positioned less as a developer tool and more as a policy-aware, auditable proxy between agents and the resources they can access [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees).

Lighter-weight alternatives surface at the margins. Zerostack's memory subsystem uses plain Markdown files and regex retrieval rather than vector stores, prioritizing minimal RAM and provider neutrality [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). Imbue's Latchkey keeps API credentials encrypted on-device so agents can authenticate against services without ever seeing raw tokens [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents). The Ollama critique is a cautionary counterpoint: infrastructure choices made for convenience can carry hidden costs in inference quality and vendor lock-in [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama).

Underpinning all of this is compute. A16z frames orbital AI data centers and Starship cost reductions as infrastructure-layer bets [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun), and Stratechery's note on AI compute strategy places these decisions in a broader geopolitical frame [He Came, He Saw, He Cooked](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked). The policy scenario in AI 2040 treats compute access itself as the lever for controlling AI development trajectories [AI 2040: Plan A](/reading/2026-07/2026-07-09t161342-ai-2040-plan-a).
