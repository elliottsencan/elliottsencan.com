---
title: AI infrastructure
summary: >-
  The hardware, hosting, caching, governance, and packaging layers that make AI
  systems run reliably at scale, from KV cache storage and inference cost
  optimization to control planes, agent runtimes, and distribution formats.
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
compiled_at: '2026-06-21T18:26:13.310Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1296
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
  cost_usd: 0.035883
---
AI infrastructure spans everything below the model weights and above the raw compute: the systems that serve inference efficiently, route requests through policy layers, package agents for distribution, and keep costs from eating product margins.

The most concrete recent development in inference efficiency is persistent KV caching. Rather than recomputing attention states on every request, [Pure Storage's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists KV tensors to NFS and S3 and injects them via RDMA, delivering up to 20x inference speedups without touching model architecture. [Everpure's granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks keyed by metadata pointers, so only changed tokens are reprocessed. [A companion piece](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the KV cache as a shared data asset rather than ephemeral GPU state, arguing the reframing alone cuts prefill costs by up to 20x at enterprise scale.

The pricing environment makes these optimizations consequential. [Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest frontier models ($0.20/M tokens) and premium offerings ($15/M), collapsing the floor enough that previously unviable consumer business models are now feasible. The practical implication is building provider-agnostic from the start.

At the agent layer, Anthropic's [Managed Agents architecture](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable, swappable interfaces so that model upgrades don't break client integrations. Anthropic also published an [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) for bundling local MCP servers as single-click installers for Claude Desktop. On the governance side, [Speakeasy's control plane reference](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) describes the policy enforcement, identity, and observability layer that sits between agents and the resources they touch; [Stephane Derosiaux](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) makes a similar case that MCP's real value is as an auditable enterprise proxy, not a developer convenience.

Not all infrastructure needs to be complex. The zerostack memory design, described in both [a project post](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and [Xavier's walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store), uses plain Markdown files with regex retrieval rather than vector stores or embeddings, trading recall sophistication for zero RAM overhead, no daemon, and provider neutrality. The tradeoff is deliberate and context-dependent, not a gap.

A recurring tension across these sources is between local-first and cloud-hosted approaches. [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) traces how a tool that started as a local inference wrapper obscured its llama.cpp dependency, shipped inferior performance versus direct llama.cpp usage, and has pivoted toward closed-source cloud products. The argument is that VC-driven infrastructure projects tend to drift from the constraints that made them useful. [Stratechery's AI compute coverage](/reading/2026-04/2026-04-24t162154-he-came-he-saw-he-cooked) situates this within broader compute strategy, where the structural question is who controls the stack from silicon to API.

[Plurai](/reading/2026-05/2026-05-04t235011-plurai) addresses a different infrastructure gap: evaluation and guardrail models. Auto-generating training data and deploying custom judge models at sub-100ms latency and 8x lower cost than GPT-as-judge positions evaluation as infrastructure rather than an offline step. [Hugging Face's Gradio demo](/reading/2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter) shows a complementary pattern: pairing queued model endpoints on ZeroGPU with custom HTML frontends to ship PII-detection applications without managing serving infrastructure directly.
