---
title: AI Infrastructure
summary: >-
  The hardware, serving systems, routing layers, memory designs, and governance
  controls that make running AI models in production tractable — a stack that is
  evolving fast enough that architectural choices made today carry real cost and
  lock-in consequences.
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
compiled_at: '2026-08-17T18:40:14.440Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1302
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
  cost_usd: 0.040083
---
AI infrastructure spans everything below the model weights and above the application: compute allocation, inference serving, KV cache management, routing between models, memory persistence for agents, credential handling, and the governance layers that tie it together for enterprise use. The sources here cover most of those layers, and a consistent theme runs through them: decisions that look like implementation details tend to become expensive constraints.

On the serving side, [Netflix's in-house LLM stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) is a detailed case study in why organizations internalize this work. They chose vLLM over TensorRT-LLM for engine flexibility, built an OpenAI-compatible API surface, and added batched constrained decoding at scale. The [Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames the broader discipline: quantization, speculative decoding, caching, parallelism, and disaggregation are the primary levers, and when to invest in each depends on traffic shape and latency targets.

KV caching gets its own treatment across three Everpure posts. [Persisting attention states to NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) rather than recomputing them can cut prefill costs up to 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) takes this further by segmenting prompts into reusable chunks via metadata pointers, so only changed tokens go through prefill. The [framing piece](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues the cache should be treated as a persistent shared data asset injected via RDMA, not an ephemeral GPU concern.

Routing between models is becoming a distinct infrastructure problem. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best available model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a lighter 1.5B approach that aligns routing with human-defined domain preferences without retraining when the model pool changes. The [AI pricing war piece](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) argues that the 75x spread between cheapest and most expensive frontier models makes provider-agnostic design an economic necessity rather than a nice-to-have.

At the agent layer, [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces so the orchestration layer can swap models without breaking clients. The [AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) and the [MCP governance argument](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) both make the case that enterprises need a policy-aware proxy between agents and the resources they touch — MCP's real value is auditable access control, not developer convenience. Credential handling at the local level is addressed by [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which keeps API tokens encrypted on-device so agents authenticate without ever seeing raw credentials.

Memory design for agents surfaces a counterintuitive finding: [zerostack's file-based approach](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) using plain Markdown and regex retrieval outperforms vector stores under constraints of minimal RAM, no daemon process, and provider neutrality, as [confirmed in a separate walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). The infrastructure choice is only right relative to the deployment context.

[David Crawshaw's critique of cloud abstractions](/reading/2026-07/2026-07-05t170602-building-a-cloud) frames the underlying problem: VMs tied to fixed resources, slow remote block devices, and expensive networking are wrong primitives for AI workloads. The entire inference optimization effort above is partly compensating for infrastructure that was not designed with large-model serving in mind.
