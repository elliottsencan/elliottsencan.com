---
title: AI infrastructure
summary: >-
  The physical and architectural layer underneath AI systems, from compute
  economics and inference optimization to hosted agent runtimes, storage-backed
  KV caches, and enterprise governance planes.
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
compiled_at: '2026-06-21T20:10:14.855Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5652
    output_tokens: 1118
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
  cost_usd: 0.033726
---
AI infrastructure spans everything below the model weights: how inference is served cheaply, how agents are hosted and orchestrated, how session state is stored, and how enterprises enforce policy across all of it. The sources here trace those concerns from raw hardware economics down to individual deployment choices.

On the compute side, Ben Thompson notes that AI compute strategy has become a geopolitical variable, with Cold War 2.0 dynamics shaping who can build and where [He Came, He Saw, He Cooked](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked). Below that headline level, the biggest lever for reducing inference cost at the infrastructure layer is the KV cache. Everpure Engineering argues that treating the KV cache as a persistent, shared data asset injected via RDMA can cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their Pure KVA product extends this by persisting attention states to NFS and S3, achieving up to 20x faster inference without changing model architecture [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), and granular-prompt caching further reduces GPU spend by only processing changed tokens [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Gergely Orosz surveys the broader inference engineering discipline, covering quantization, speculative decoding, parallelism, and disaggregation as the toolkit for this work [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

At the agent hosting layer, Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). Memory storage is a related design decision: zerostack shows that plain Markdown files with regex retrieval can outperform vector stores when RAM, daemon dependencies, and provider neutrality are real constraints [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). At the governance level, Speakeasy describes an AI control plane that unifies identity, policy enforcement, tool routing, and observability across every agent an enterprise runs [AI Control Plane: Architecture and Vendors](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), a framing reinforced by the argument that MCP's real value is as an auditable, policy-aware proxy between agents and resources rather than a developer convenience [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees).

Economics thread through all of it. A 75x spread between the cheapest and most expensive frontier models means infrastructure choices now directly determine product margin [The AI Model Pricing War Is Here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). The critique of Ollama illustrates what happens when infrastructure tooling drifts from its original design constraints toward a VC-driven cloud pivot [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). Evaluation infrastructure is also part of the stack: Plurai generates training data and deploys guardrail models at sub-100ms latency and a fraction of GPT-as-judge costs [Plurai](/reading/2026-05/2026-05-04t235011-plurai).
