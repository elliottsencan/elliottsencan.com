---
title: AI Infrastructure
summary: >-
  The hardware, serving, routing, caching, governance, and memory layers that
  underpin production AI systems, spanning compute economics, agent
  architecture, and the control planes that connect models to enterprise
  environments.
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
compiled_at: '2026-06-24T06:28:33.330Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6356
    output_tokens: 1417
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
  cost_usd: 0.040323
---
AI infrastructure names the full stack below the model API: the serving hardware and software, the routing and caching mechanisms that control cost and latency, the governance layers that enforce policy, and the memory and storage primitives that give agents continuity. The sources here cover each layer and together sketch how the field is industrializing.

At the compute and serving layer, inference engineering has become its own discipline. [Philip Kiely's breakdown via Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) describes quantization, speculative decoding, parallelism, and disaggregation as the core toolkit for cheaper and faster LLM serving. KV caching is a significant lever: [Everpure's engineering posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that persisting attention states as a shared data asset injected via RDMA rather than recomputed can reduce prefill costs by up to 20x. Granular-prompt caching extends this further by segmenting prompts into reusable chunks [so only changed tokens are processed](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and Pure Storage's KVA shows the approach works over standard NFS and S3 without changing the model architecture [or deployment stack](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Routing sits above the serving layer. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to [match each request to the best-fit model for cost, latency, or quality](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). A related paper proposes Arch-Router, a compact 1.5B model that [aligns routing decisions with human-defined domain and action preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) without retraining when new models are added. The pricing environment makes routing economically meaningful: a 75x gap between the cheapest and most expensive frontier models means [provider-agnostic architectures built from day one](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) can substantially change unit economics.

Governance and control are increasingly treated as first-class infrastructure concerns. The AI control plane concept, [described by Speakeasy](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors), unifies identity, policy enforcement, tool routing, and observability across agents. MCP fits into this layer: one analysis [argues MCP's real value is enterprise governance](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees), functioning as a policy-aware auditable proxy rather than a developer convenience. Credential management is a related gap; [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses it by keeping API tokens encrypted on-device so agents authenticate against external services without exposure.

For agents specifically, Anthropic's Managed Agents architecture [decouples the harness, session log, and sandbox into stable interfaces](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) so the system can swap models as they improve. Memory storage is a live design question: zerostack demonstrates that [plain Markdown files with regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) can beat vector stores under constraints of minimal RAM and no persistent daemon, a point reinforced by [its own memory design documentation](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). Evaluation and guardrail infrastructure is addressed by tools like [Plurai](/reading/2026-05/2026-05-04t235011-plurai), which auto-generates training data and deploys custom evaluation models with sub-100ms latency at a fraction of the cost of GPT-as-judge approaches.

At the hardware stratum, a16z frames SpaceX's Starlink revenue and Starship cost reductions as [the foundation for orbital AI data centers](/reading/2026-06/2026-06-21t231454-spacex-and-the-sentient-sun), and Stratechery's coverage of AI compute strategy situates these bets within [Cold War 2.0 constraints on chip access](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked). Local inference tooling occupies the opposite end of the spectrum; the critique of Ollama [details how its VC pivot away from local-first principles](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) reflects broader tensions between cloud and on-device inference economics.

The pattern across these sources is convergence toward treating each layer, serving, routing, caching, governance, memory, as a separable concern with its own optimization surface, rather than one monolithic stack.
