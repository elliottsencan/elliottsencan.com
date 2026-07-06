---
title: AI infrastructure
summary: >-
  The physical and architectural layers that make AI systems run at scale, from
  KV cache optimization and inference routing to agent harnesses, credential
  management, and the cloud abstractions underneath all of it.
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
compiled_at: '2026-07-06T00:09:40.191Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6497
    output_tokens: 1340
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
  cost_usd: 0.039591
---
AI infrastructure names the stack of systems that sit below the model itself: compute, storage, serving, routing, security, and the runtime environments that agents operate inside. The sources collected here illuminate that stack from several angles, and together they sketch a picture of a layer under rapid, sometimes chaotic, construction.

At the inference layer, the cost and latency profile of running LLMs is shaped significantly by how attention state is managed. [Everpure's KV caching pieces](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that treating the KV cache as a persistent, shared data asset injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x. Their [Pure KVA product](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends this to S3 and NFS storage, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these techniques alongside quantization, speculative decoding, and disaggregation as the core toolkit for anyone running models at production scale.

Routing is the next pressure point. When multiple models exist at different cost and quality points, matching each request to the right model is itself an infrastructure problem. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to rank candidates in real time. The accompanying [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) shows a 1.5B model can align routing decisions with human preferences without retraining when new models are added. The [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) underscores why routing matters economically: a 75x gap between the cheapest and most expensive frontier models means provider-agnostic architecture is now a margin question, not just an engineering preference.

Above inference sits the agent runtime. [Anthropic's Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so the underlying model can be swapped without breaking clients. [Speakeasy's AI control plane writeup](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames the governance layer around that runtime: unified identity, policy enforcement, tool routing, and observability across every agent in an enterprise. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) handles a narrower but critical piece, keeping API credentials encrypted on-device so agents can authenticate against external services without exposing raw tokens. [MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) fits into this picture as the auditable proxy layer between agents and the resources they are permitted to touch, an enterprise governance primitive more than a developer convenience.

Not every infrastructure choice involves managed cloud services. [zerostack's file-based memory system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) deliberately avoids vector stores and embeddings, using plain Markdown on disk with regex retrieval, a decision [justified in detail](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) by constraints of minimal RAM and provider neutrality. [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) makes the case that the dominant local inference tool has compromised on performance and openness as it pursues a VC-driven cloud pivot, illustrating how infrastructure choices carry strategic and ideological weight.

Below all of this sits the cloud itself. [David Crawshaw's announcement of exe.dev](/reading/2026-07/2026-07-05t170602-building-a-cloud) contends that current cloud platforms rest on wrong abstractions, VMs tied to fixed resources and slow remote block storage, and that building correctly for AI workloads requires starting over. [A16z's SpaceX profile](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun) gestures toward the longer horizon: orbital AI data centers as a plausible destination once launch costs collapse far enough.
