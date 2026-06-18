---
title: AI infrastructure
summary: >-
  The systems, services, and architectural patterns that make AI models operable
  at scale, covering inference optimization, agent hosting, governance layers,
  storage backends, and the packaging standards that connect them.
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
aliases:
  - infrastructure
compiled_at: '2026-06-18T22:52:12.250Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5651
    output_tokens: 935
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
  cost_usd: 0.030978
---
AI infrastructure spans the layers between raw model weights and working applications: compute scheduling, caching, agent runtimes, governance proxies, and the packaging conventions that let different pieces interoperate without tight coupling.

On the inference cost side, the most concrete optimization in circulation is KV caching. [Everpure's engineering posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that treating the KV cache as a persistent, shared data asset, injected from fast storage via RDMA rather than recomputed per request, can reduce prefill costs by up to 20x. Their Pure KVA product extends this further by [segmenting prompts into reusable chunks via metadata pointers](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) and [persisting attention states across sessions on NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs), delivering up to 20x faster inference without changing model architecture.

Agent hosting has its own infrastructure concerns. Anthropic's Managed Agents service [separates the agent harness, session log, and sandbox into stable, swappable interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) so the system can absorb model upgrades without breaking clients. At the opposite extreme, [zerostack's memory subsystem](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) deliberately avoids vector stores and daemons, using plain Markdown files and regex retrieval to stay RAM-minimal and provider-neutral. These two approaches are not in conflict; they reflect different constraint profiles, not different ideals.

Governance is increasingly treated as an infrastructure problem rather than an application concern. The "AI control plane" concept [positions a policy-aware proxy layer between AI agents and the resources they touch](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), unifying identity, tool routing, and observability across an enterprise's agent fleet. MCP sits adjacent to this: [its real value is auditable, policy-enforced access at scale](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees), not terminal convenience. Anthropic's [.mcpb packaging format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) extends the same idea to distribution, letting a local MCP server ship as a single-click bundle.

Pricing infrastructure matters too. A [75x gap between cheapest and most expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means provider lock-in is a financial risk, not just an architectural one, which pushes teams toward provider-agnostic abstraction layers from day one. Local inference tools like Ollama promised a similar independence, though [criticism of Ollama's VC-driven cloud pivot and inferior inference performance](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) suggests that "local-first" is not self-sustaining without deliberate architectural discipline.
