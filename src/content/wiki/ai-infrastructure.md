---
title: AI infrastructure
summary: >-
  The systems, abstractions, and economic pressures that determine how LLMs are
  served, routed, cached, governed, and deployed at scale — from KV cache
  optimization and inference routing to agent harnesses, credential layers, and
  cloud rethinks.
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
compiled_at: '2026-11-10T01:13:23.930Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1292
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
  cost_usd: 0.040383
---
AI infrastructure names the layer beneath the models: the serving stacks, routing logic, caching strategies, governance planes, and agent scaffolding that determine whether a deployed LLM is fast, cheap, controllable, and production-safe.

On the serving side, the dominant concerns are cost and latency. The KV cache has emerged as one of the highest-leverage optimization surfaces. [Everpure's engineering posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that persisting and sharing KV cache state across sessions via RDMA rather than recomputing it on every request can cut prefill costs by up to 20x. Their follow-up on granular-prompt caching [breaks prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only changed tokens are processed, and their KVA product [extends this to NFS and S3 storage](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) without requiring model architecture changes. [Gergely Orosz's survey of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates caching alongside quantization, speculative decoding, and disaggregation as the core toolkit for anyone running LLMs at throughput. Netflix's approach goes further: their team [runs the full serving stack in-house](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) using vLLM over TensorRT-LLM, with an OpenAI-compatible API surface and batched constrained decoding.

Routing is a related problem. DigitalOcean's Inference Router [uses a 30B mixture-of-experts model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match each request to the best available model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining as new models are added. These efforts sit alongside the broader pricing war: a [75x gap between the cheapest and most expensive frontier APIs](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic routing a business decision as much as an engineering one.

The governance layer is increasingly called the AI control plane. [Speakeasy's reference architecture](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes a unified policy enforcement, identity, tool routing, and observability layer sitting above every agent and system. MCP fits here: [Stephane Derosiaux argues](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) its real value is enterprise governance — a policy-aware, auditable proxy between agents and resources that CLIs cannot provide at scale. Credential handling is a gap Imbue addresses with [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents), which encrypts API tokens on-device so agents can authenticate against external services without ever seeing raw credentials.

At the agent layer, Anthropic's Managed Agents [decouples the agent harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into stable interfaces so the system can evolve as models improve. Memory is another infrastructure question: zerostack's approach [uses plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) rather than vector stores, trading sophistication for minimal RAM and no daemon dependency.

Below all of this sit the cloud abstractions themselves. [David Crawshaw argues](/reading/2026-07/2026-07-05t170602-building-a-cloud) that VMs tied to fixed resources, slow remote block storage, and expensive networking are the wrong foundation for AI workloads, and is building a new cloud from scratch. At the furthest horizon, [a16z profiles Starlink and Starship](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) as the eventual substrate for orbital AI data centers, though that remains speculative.
