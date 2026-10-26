---
title: AI infrastructure
summary: >-
  The hardware, serving, routing, memory, governance, and cost layers that turn
  raw model weights into production AI systems, spanning KV caching, inference
  routing, agent sandboxes, and control planes.
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
compiled_at: '2026-10-26T22:20:59.464Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1385
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
  cost_usd: 0.041778
---
AI infrastructure is the stack of decisions and systems sitting between a trained model and a working product. It covers compute economics, serving architecture, memory design, agent sandboxing, governance, and the tooling that ties these together across providers and environments.

The economics are moving fast. A 75x gap between the cheapest and most expensive frontier models has collapsed the pricing floor, making business models viable that were impossible at 2025 rates [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). That repricing creates pressure to optimize serving costs, which is why KV caching has become a first-class infrastructure concern. Everpure's engineering posts argue that treating the KV cache as a persistent, shared data asset injected via RDMA can reduce prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and their granular-prompt caching work extends this by segmenting prompts into reusable chunks so only changed tokens get processed [Maximizing LLM Efficiency](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Pure Storage's KVA persists attention states to NFS and S3, delivering the same 20x figure without changing model architecture [20x Faster Inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Serving itself is a discipline. Netflix runs vLLM in-house over TensorRT-LLM for flexibility, wrapping it in an OpenAI-compatible API surface with model packaging and batched constrained decoding [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Inference engineering as a field now encompasses quantization, speculative decoding, disaggregated prefill and decode, and the operator-level decisions around when those optimizations pay off [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Routing is emerging as a separate layer: DigitalOcean built an inference router that uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a compact 1.5B routing model aligned to human preferences that generalizes to new models without retraining [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

The agent layer adds different infrastructure problems. Anthropic's Managed Agents architecture separates the harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve [Scaling Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). On the lighter end, zerostack stores agent memory as plain Markdown files with regex retrieval, arguing that vector stores add infrastructure complexity without proportional benefit under real constraints [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). Credential management for agents is a separate concern; Latchkey encrypts tokens on-device so agents authenticate against external services without ever seeing raw credentials [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Enterprise governance adds a control plane across all of this: unified identity, policy enforcement, tool routing, and observability across every agent and system [AI Control Plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP's real value, one argument goes, is exactly here, as an auditable proxy between agents and the resources they are allowed to touch [No, MCP is Definitely Not Dead](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees).

Below all of this sits the physical layer. The foundational cloud abstractions, VMs tied to fixed resources and slow remote block storage, are increasingly argued to be wrong for AI workloads, with at least one effort rebuilding cloud from scratch to fix them [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud). At planetary scale, Starlink revenue and Starship economics are being cited as the path toward orbital AI data centers [SpaceX & the Sentient Sun](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun).
