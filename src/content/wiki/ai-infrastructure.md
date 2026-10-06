---
title: AI infrastructure
summary: >-
  The systems, abstractions, and operational patterns that underpin how AI
  models are served, connected, and governed at scale, spanning inference
  optimization, agent architecture, storage design, and control-plane
  governance.
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
compiled_at: '2026-10-05T23:46:43.075Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7001
    output_tokens: 1411
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
  cost_usd: 0.042168
---
AI infrastructure names the full stack of hardware, software, and operational patterns that makes AI models usable in production. The sources here cluster around three practical concerns: how to serve inference cheaply and quickly, how to wire agents into larger systems, and how to govern what those systems can touch.

On the inference side, the costs of running LLMs at scale have driven significant architectural work around the KV cache. [Everpure's engineering posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that treating the KV cache as a persistent, shared data asset, injected via RDMA from fast storage rather than recomputed per request, cuts prefill costs by up to 20x. Their follow-up on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further, segmenting prompts into reusable chunks so only changed tokens are processed. [Pure Storage's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) applies the same principle across NFS and S3, claiming 20x faster inference without changing model architecture. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) situates these techniques, including quantization, speculative decoding, and disaggregation, within the broader discipline of inference engineering as a specialized role. Netflix's [in-house LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what this looks like at scale, with vLLM chosen over TensorRT-LLM and a full OpenAI-compatible API surface managed internally.

Routing is emerging as its own infrastructure layer. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match requests to models by cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a lighter 1.5B alternative that maps queries to user-defined domains without retraining when new models are added. The [AI pricing war analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes the stakes explicit: a 75x spread between the cheapest and most expensive frontier models means routing and provider-agnostic design are now margin questions.

Agent architecture introduces a different set of infrastructure concerns. Anthropic's [Managed Agents post](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) describes decoupling the agent harness, session log, and sandbox into stable, swappable interfaces, so the system survives model upgrades without client breakage. Memory storage is a design choice with real tradeoffs: zerostack uses [plain Markdown files on disk](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) rather than vector stores, a decision [explained in detail](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) as appropriate when RAM is constrained and provider neutrality matters. [AlphaSignal's piece on single vs. multi-agent systems](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) warns that multi-agent orchestration can amplify errors up to 17x, framing coordination overhead as an infrastructure tax.

Governance and connectivity are the third axis. The [AI control plane](/reading/2026-05/2026-05-09t110721-ai-control-plane-architecture-and-vendors) concept formalizes a layer for identity, policy enforcement, tool routing, and observability across agents. MCP sits adjacent: [Stephane Derosiaux argues](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) that its real value is enterprise governance, as a policy-aware auditable proxy between agents and resources. Credential handling is a separate problem: [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device so agents can authenticate against external services without exposing raw credentials. Anthropic's [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows the distribution end of this, bundling local MCP servers as single-click installs.

Underneath all of this, [David Crawshaw's cloud critique](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that the current cloud abstraction, VMs tied to fixed resources with slow remote block devices, is wrong for the workloads AI actually runs, and that new primitives are needed from the ground up.
