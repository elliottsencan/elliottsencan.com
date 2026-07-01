---
title: AI infrastructure
summary: >-
  The hardware, software, and architectural layers that make AI systems run at
  scale, from KV cache storage and inference routing to agent orchestration,
  credential management, and enterprise governance.
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
compiled_at: '2026-07-01T04:43:16.225Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1250
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
  cost_usd: 0.037818
---
AI infrastructure spans everything below the model itself: the compute strategies, serving layers, agent platforms, and governance tooling that determine whether a system is fast, cheap, and safe enough to deploy at scale.

At the inference layer, the cost of running LLMs has become the central engineering problem. Recomputing attention states on every request is wasteful; [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the KV cache as a persistent, shared data asset that can cut prefill costs by up to 20x when injected via RDMA from fast storage. [Pure KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions on NFS and S3 without changing model architecture, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further by segmenting prompts into reusable chunks via metadata pointers so only changed tokens get reprocessed. The inference engineering discipline that has grown up around these techniques covers quantization, speculative decoding, parallelism, and disaggregation as complementary tools for cheaper, faster serving, as [Gergely Orosz's overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) details.

When a request does reach a model, which model it reaches matters. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE routing model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B alternative that aligns routing with user-defined preferences without retraining when new models are added. These routing layers become more important as the pricing floor collapses; a [Superframeworks analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models, making provider-agnostic design a hard economic requirement.

Above inference sits agent infrastructure. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the underlying model can be upgraded without breaking clients. At the opposite end of the complexity spectrum, [zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown files on disk with regex retrieval, deliberately avoiding vector stores, embeddings, and daemons to minimize RAM footprint and infrastructure dependency.

Governance and access control form their own infrastructure tier. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept positions a policy-aware proxy between agents and the resources they can touch, unifying identity, tool routing, and observability. [Stephane Derosiaux's argument for MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) frames the protocol similarly: its real value is auditable governance at enterprise scale, not convenience for individual developers. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential injection specifically, keeping API tokens encrypted on-device so agents can authenticate against external services without ever seeing raw credentials.

Evaluation and reliability tooling round out the picture. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates training data and deploys guardrail models with sub-100ms latency at 8x lower cost than GPT-as-judge, addressing the cold-start problem for custom agent evaluation. Meanwhile, the [Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates what happens when infrastructure tooling drifts from its original constraints: obscured dependencies, inferior inference performance, and a VC-driven pivot toward cloud undermine the local-first premise the tool was built on.
