---
title: AI infrastructure
summary: >-
  The physical and software layers that make AI systems run at scale, from GPU
  compute and inference optimization to agent hosting, credential management,
  routing, and governance control planes.
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
compiled_at: '2026-08-11T07:51:13.266Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1278
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
  cost_usd: 0.039723
---
AI infrastructure spans everything below the model: the compute substrate, the serving stack, the agent runtime, and the governance layer that sits across all of them. Each layer is rapidly specializing as production demands grow.

On the compute side, the economics are shifting fast. A 75x gap between the cheapest and most expensive frontier models has collapsed the inference pricing floor [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on), and the race to cut serving costs is pushing infrastructure teams toward techniques like KV caching, quantization, speculative decoding, and disaggregated prefill and decode. Everpure argues that treating the KV cache as a persistent, shared data asset injected via RDMA can cut prefill costs by up to 20x [How to Cut LLM Inference Costs](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) and that granular-prompt caching, segmenting prompts into reusable chunks via metadata pointers, reduces time-to-first-token for RAG workloads [Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Pure Storage extends this further, persisting attention states across sessions on NFS and S3 without changing the model or deployment stack [20x Faster Inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Netflix runs this kind of full serving stack in-house, choosing vLLM over TensorRT-LLM and building an OpenAI-compatible API surface that handles batched constrained decoding at scale [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

Routing is becoming its own infrastructure discipline. DigitalOcean built an inference router using a 30B MoE orchestrator model to match each request to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). A related paper proposes Arch-Router, a compact 1.5B model that aligns routing decisions with human-defined domain and action preferences without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

At the agent layer, hosted runtimes are separating the model from the execution environment. Anthropic's Managed Agents architecture decouples the agent harness, session log, and sandbox into stable interfaces so the system can swap models as they improve without breaking clients [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). At smaller scale, zerostack shows that infrastructure doesn't have to be heavy: plain Markdown files and regex retrieval can substitute for vector stores when RAM, daemon processes, and provider lock-in are constraints [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack).

Governance and credential management are the emerging frontier. The AI control plane concept places a policy-aware governance layer across every agent and system, unifying identity, tool routing, and observability [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP fits into this picture as an auditable proxy between agents and the resources they can reach, more relevant to enterprise policy enforcement than to developer terminal use [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Latchkey addresses credentials specifically, injecting API tokens into agent calls locally so raw credentials never leave the device [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Underlying all of this is a critique of current cloud abstractions. One founder argues that VMs tied to fixed resources, slow remote block storage, and expensive networking are the wrong foundation for what AI workloads actually need [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud), a claim that inference engineering as a discipline, outlined by a Baseten engineer, is beginning to answer systematically [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).
