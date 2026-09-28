---
title: AI infrastructure
summary: >-
  The physical, architectural, and operational layers that make AI systems run
  at scale, spanning compute hardware, inference serving, model routing, KV
  caching, agent orchestration, governance, and credential management.
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
compiled_at: '2026-09-28T22:58:58.967Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1277
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
  cost_usd: 0.040158
---
AI infrastructure is the stack of systems between a model's weights and a working product. The sources here cover that stack at nearly every layer, from raw compute economics through inference serving, caching, agent architecture, routing, and governance.

At the compute layer, the economics are shifting fast. A 75x spread between the cheapest and most expensive frontier APIs [as detailed in the pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means infrastructure choices now have direct P&L consequences. [A16z profiles SpaceX](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) as a future substrate for orbital AI data centers, and [David Crawshaw's exe.dev announcement](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that existing cloud abstractions, VMs with fixed resources and slow block storage, are wrong at the foundation and need to be rebuilt from scratch.

Inference serving is where most of the engineering work concentrates. Netflix runs the full serving stack in-house, choosing vLLM over TensorRT-LLM for flexibility, building an OpenAI-compatible API surface, and supporting batched constrained decoding at scale [per their TechBlog](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Gergely Orosz's breakdown of inference engineering [at The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the techniques practitioners reach for: quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation.

KV caching sits at the intersection of hardware and software. Everpure makes the case that the KV cache should be treated as a persistent shared data asset, loaded via RDMA from fast storage rather than recomputed per request, [claiming up to 20x prefill cost reduction](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their KVA product extends this to NFS and S3 backends [without changing model architecture](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), and a granular-prompt caching layer [segments prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only changed tokens are processed.

Routing across models is becoming its own infrastructure concern. DigitalOcean built an Inference Router using a 30B MoE orchestration model to match each request to the best-fit model for cost, latency, or quality [at query time](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The Arch-Router paper proposes a lighter 1.5B model that aligns routing with user-defined preferences without retraining when new models are added [on arXiv](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Agent infrastructure introduces additional layers. Anthropic's Managed Agents architecture [separates harness, session log, and sandbox](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) into stable interfaces so the system can evolve as models improve. Credential management for agents is its own problem: Latchkey [keeps API tokens encrypted on-device](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) so agents can authenticate against external services without ever seeing raw credentials. At the governance layer, the AI control plane concept [described by Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) unifies identity, policy enforcement, tool routing, and observability across all agents and systems in an enterprise.

Local inference tooling is contested ground. A critique of Ollama [on Sleeping Robots](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it ships inferior inference performance relative to llama.cpp, obscures its dependencies, and is pivoting toward a closed-source cloud model, raising questions about whether local-first tooling can survive VC pressure. The zerostack project takes the opposite stance on memory infrastructure, [using plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) rather than vector stores or embeddings, showing that simpler infrastructure can be a deliberate choice.
