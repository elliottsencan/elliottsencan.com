---
title: AI infrastructure
summary: >-
  The physical and architectural substrate that makes AI systems run at scale:
  compute, caching, agent runtimes, governance layers, and the tradeoffs that
  shape cost, latency, and reliability across all of them.
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
compiled_at: '2026-06-20T22:02:34.211Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1148
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
  cost_usd: 0.033663
---
AI infrastructure spans everything below the model prompt and above the bare metal: the caching layers that control inference cost, the agent runtimes that host agentic behavior, the governance proxies that enforce policy, and the packaging formats that make tools deployable. Each layer carries its own tradeoffs, and decisions made at one layer propagate upward.

Inference cost is the most immediate pressure. Two pieces from Everpure Engineering make the case for treating the KV cache as a persistent, shared data asset rather than an ephemeral computation. [Injecting attention states from fast storage via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x. Their follow-up on granular-prompt caching goes further, [segmenting prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only changed tokens are reprocessed, reducing time-to-first-token for RAG workloads. A third post describes [Pure KVA persisting attention states across NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) without modifying model architecture, delivering up to 20x faster inference over standard Ethernet.

On the agent runtime side, Anthropic describes [Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) as a hosted service that separates the agent harness, session log, and sandbox into stable, swappable interfaces. The explicit goal is to let the infrastructure evolve as models improve without breaking clients. A lighter counterpoint comes from the zerostack project, which [implements agent memory using plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) rather than vector stores, arguing that minimal RAM, no daemon, and provider neutrality are worth more than embedding-based recall in constrained environments. A [companion post describes the same system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) from the inside, showing auto-injected XML context blocks and three simple tools.

Governance sits above the runtime. [Speakeasy's reference architecture for the AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) frames this as a unified identity, policy enforcement, and observability layer across every agent and system in an enterprise. [Stephane Derosiaux argues](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) that MCP's real value is exactly this: a policy-aware, auditable proxy between agents and the resources they can touch, not a convenience layer for developers with terminals.

Packaging and distribution affect where infrastructure runs. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to bundle a local MCP server into a single-click installable for Claude Desktop. The [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) raises a structural concern about local inference tooling: VC-driven pivots toward cloud hosting can undermine the local-first guarantees that made a tool worth using in the first place.

Cost dynamics are shifting the infrastructure calculus. [A 75x pricing gap between the cheapest and most expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means infrastructure choices now directly determine whether a business model is viable. Building provider-agnostic from day one is the practical response. The [Stratechery roundup on AI compute strategy](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked) situates this in a broader geopolitical frame, where control of compute is central to Cold War 2.0 dynamics between the US and China.
