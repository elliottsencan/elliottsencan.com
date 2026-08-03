---
title: AI infrastructure
summary: >-
  The hardware, software, and architectural layers that make large-scale AI
  model serving practical — from KV cache management and inference routing to
  agent orchestration, credential handling, and enterprise governance.
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
compiled_at: '2026-08-03T10:01:53.395Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6851
    output_tokens: 1255
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
  cost_usd: 0.039378
---
AI infrastructure spans everything between a raw model weight and a production system that can serve it reliably at cost. The concerns cluster around inference efficiency, agent architecture, governance, and the underlying compute and storage primitives that support them.

On the inference side, the dominant cost pressure is prefill. Recomputing attention states from scratch for every request is expensive; [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the KV cache as a persistent data asset that can be injected via RDMA from fast storage, cutting prefill costs up to 20x. [Everpure's Pure KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends this by persisting attention states across sessions on NFS and S3, while [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens get reprocessed. Techniques like quantization, speculative decoding, and disaggregation round out the toolkit described in [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) as a discipline.

Model routing is a parallel efficiency lever. Rather than sending every request to the same model, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE routing model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) research line proposes a compact 1.5B model that maps queries to user-defined domains without retraining when new models are added. The [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes routing decisions increasingly consequential: a 75x gap between cheapest and most expensive frontier models means provider-agnostic architecture is a margin question, not just an engineering preference.

Agent architecture introduces a different class of infrastructure problems. [Anthropic's Managed Agents](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can evolve as models improve. Whether to use a single agent or multiple is not just an architectural taste: [research cited by AlphaSignal](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) shows multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x, making single-agent the sensible default for most tasks. Memory is another variable; [zerostack's approach](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown files and regex retrieval rather than vector stores, trading recall sophistication for minimal RAM and no daemon dependency.

Governance and credential management are infrastructure concerns that mature deployments can't skip. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept describes a governance layer unifying identity, policy enforcement, tool routing, and observability across agents. [MCP](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) fits into this as a policy-aware proxy between agents and resources, particularly valuable for enterprise audit requirements. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses a narrower problem: keeping API credentials encrypted on-device so agents can authenticate against external services without ever receiving raw tokens.

At the compute layer, [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) illustrates what vertical integration looks like at scale: full engine selection, model packaging, and OpenAI-compatible API surfaces built and operated internally. [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues the abstraction layer beneath all of this — VMs, remote block devices, networking — is still fundamentally wrong for AI workloads and needs to be rebuilt from scratch.
