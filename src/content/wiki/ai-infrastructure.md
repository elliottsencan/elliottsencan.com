---
title: AI infrastructure
summary: >-
  The stack of compute, caching, governance, and deployment primitives that
  makes AI systems reliable and cost-effective at scale, spanning inference
  optimization, agent hosting, control planes, and local tooling.
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
compiled_at: '2026-06-20T12:37:45.220Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1078
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
  cost_usd: 0.032613
---
AI infrastructure names the layer beneath model intelligence: the hardware, storage, networking, and software primitives that determine whether an AI system is fast, cheap, governable, and operationally stable. The sources here converge on a few pressure points that define where that infrastructure is maturing fastest.

Inference cost and throughput remain the most visible constraint. The KV cache has emerged as a first-class infrastructure concern: reusing attention states across sessions rather than recomputing them on every request can cut prefill costs by up to 20x and dramatically improve token throughput [Robert Alvarez, Everpure Engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Everpure's Pure KVA pushes this further by injecting cached states from NFS and S3 storage via RDMA, delivering up to 20x faster inference without changing model architecture [Robert Alvarez, Jean-Baptiste Thomas, Everpure Engineering](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), and granular-prompt caching segments prompts into reusable chunks so only changed tokens are processed [Everpure Engineering](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). On the pricing side, a 75x spread between the cheapest and most expensive frontier models has collapsed the economics of AI-powered products, making provider-agnostic build strategies nearly mandatory [Ayush Chaturvedi, Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).

Agent hosting is another active frontier. Anthropic's Managed Agents architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve without breaking clients [Lance Martin et al., Anthropic Engineering](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands). At the other end of the complexity spectrum, the zerostack coding agent uses plain Markdown files and regex retrieval for memory, deliberately avoiding vector stores and daemons to stay RAM-light and provider-neutral [Xavier's Data Forge](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). These two approaches illustrate that infrastructure choices are constraint-driven: hosted scale versus local simplicity are legitimate tradeoffs, not a hierarchy.

Governance sits above individual services. The AI control plane concept formalizes a policy-aware proxy layer that unifies identity, tool routing, and observability across every agent and system an enterprise runs [Sagar Batchu, Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors). MCP slots into this picture as an auditable interface standard between agents and the resources they are allowed to touch, with its real value in enterprise governance rather than developer convenience [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees). Evaluation and guardrail infrastructure is also being productized: Plurai generates training data and deploys custom evaluation models with sub-100ms latency and claimed 8x cost reduction over GPT-as-judge approaches [Product Hunt](/reading/2026-05/2026-05-04t235011-plurai).

Local inference tooling surfaces its own infrastructure tensions. A critical reading of Ollama argues that its VC-backed cloud pivot has compromised the local-first inference experience it originally promised, obscuring its llama.cpp dependency and shipping inferior performance compared to running the underlying runtime directly [Zetaphor, Sleeping Robots](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama). The lesson is that infrastructure projects carry organizational and incentive structures that shape their technical evolution as much as engineering decisions do.
