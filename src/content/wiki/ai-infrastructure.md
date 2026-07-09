---
title: AI Infrastructure
summary: >-
  The hardware, software, and architectural layers that make AI systems run at
  scale, from inference optimization and caching to routing, governance, and
  agent hosting.
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
compiled_at: '2026-07-09T14:08:14.306Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6497
    output_tokens: 1422
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
  cost_usd: 0.040821
---
AI infrastructure covers the full stack beneath AI applications: compute and storage primitives, inference serving, routing, credential management, governance layers, and the hosted scaffolding that keeps agents running reliably. The sources here span all of those layers, and together they show an industry still settling on which abstractions are worth standardizing.

At the inference layer, the dominant cost lever right now is the KV cache. Everpure Engineering argues that treating attention states as a persistent, shared data asset, injected via RDMA from fast storage rather than recomputed per request, can cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their Pure KVA product extends this further with granular-prompt caching, segmenting prompts into reusable chunks via metadata pointers so only changed tokens are processed [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and they have demonstrated 20x faster inference by persisting KV states on NFS and S3 storage [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Philip Kiely at Baseten extends this picture with a taxonomy of inference engineering techniques, including quantization, speculative decoding, parallelism, and disaggregation [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

Routing sits above inference serving. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to automatically match each request to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). A companion research paper proposes Arch-Router, a compact 1.5B model that maps queries to user-defined domains and action types without requiring retraining when new models are added [Arch-Router: Aligning LLM Routing with Human Preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). The AI model pricing war, where a 75x spread now exists between the cheapest and most expensive frontier models, makes routing decisions financially consequential [The AI Model Pricing War Is Here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

Governance and control planes are increasingly treated as first-class infrastructure concerns. Speakeasy's reference architecture frames the AI control plane as the policy enforcement, identity, and observability layer that enterprises need across every agent and tool call they run [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP fits into this framing as a policy-aware, auditable proxy sitting between agents and the resources they are allowed to touch [No, MCP is Definitely Not Dead. The NSA Agrees.](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Latchkey approaches the credential problem from the other end, encrypting API tokens on-device so agents can authenticate against external services without ever seeing the raw credentials [Latchkey: Credential Layer for Local AI Agents](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

At the agent hosting layer, Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients [Scaling Managed Agents: Decoupling the Brain from the Hands](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Not every component of this stack needs to be complex; two independent implementations of agent memory for the zerostack coding agent converged on plain Markdown files and regex retrieval over vector stores, given constraints around RAM, daemon processes, and provider neutrality [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) [Designing Memory for zerostack: Plain Files, No Vector Store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store).

The foundational compute layer is also in motion. David Crawshaw argues that current cloud platforms rest on wrong abstractions, VMs tied to fixed resources and slow remote block devices, and is building a cloud from first principles to fix them [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud). At the orbital end, a16z profiles SpaceX's Starlink and Starship cost reductions as infrastructure enabling orbital AI data centers [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun).
