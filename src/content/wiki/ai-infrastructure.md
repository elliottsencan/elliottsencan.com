---
title: AI Infrastructure
summary: >-
  The systems, abstractions, and economics that make AI deployable at scale,
  from KV caching and inference routing to agent sandboxes, credential layers,
  and the governance planes that sit above them all.
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
compiled_at: '2026-08-11T05:12:58.998Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1317
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
  cost_usd: 0.040308
---
AI infrastructure is the layer between a model and a working product. It covers how models are served, how agents are hosted and coordinated, how credentials and policy are enforced, and how the economics of all of it get managed. The sources here span every tier of that stack.

At the serving layer, inference efficiency is the core problem. [Everpure's trio of posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) makes the case that KV caches should be treated as persistent, shared data assets rather than ephemeral in-memory state, promising up to 20x cost reduction by offloading attention states to NFS and S3 via RDMA. Their [Pure KVA granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further, segmenting prompts into reusable chunks so only changed tokens are recomputed. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these techniques alongside quantization, speculative decoding, and disaggregation as the toolkit of a new engineering discipline. [Netflix's in-house LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what this looks like at scale: choosing vLLM over TensorRT-LLM, building an OpenAI-compatible API surface, and running batched constrained decoding across their own infrastructure.

Above the serving layer sits routing. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. The companion [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining when new models are added. On the economics side, [the AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x gap between cheapest and most expensive frontier models, making provider-agnostic design a financial necessity.

For agent infrastructure specifically, [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. [The AI control plane overview](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) adds a governance dimension: identity, policy enforcement, tool routing, and observability across every agent touching enterprise systems. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credential problem specifically, keeping API tokens encrypted on-device so agents authenticate against external services without ever seeing raw secrets. MCP sits in this space too: [Derosiaux's argument](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) is that MCP's value is as a policy-aware auditable proxy between agents and resources, not a developer convenience.

At the opposite end of the complexity spectrum, the zerostack memory design ([one](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), [two](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store)) argues that plain Markdown files with regex retrieval beat vector stores for constrained environments with minimal RAM and no persistent daemon. That sits alongside [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama), which documents how local-first inference tooling can degrade under VC pressure toward cloud pivots and closed components.

The infrastructure conversation also runs into physical limits. [David Crawshaw's cloud rethink](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues current platforms are built on wrong abstractions, VMs fixed to resources, slow remote block storage, expensive networking, and that fixing AI workloads properly requires rebuilding those primitives from scratch. [A16z's SpaceX profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) gestures at the longest time horizon: orbital AI data centers as the eventual ceiling on terrestrial compute.
