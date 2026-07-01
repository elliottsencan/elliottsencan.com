---
title: LLM inference
summary: >-
  LLM inference covers everything from how a model generates tokens to the
  hardware, caching strategies, quantization, routing, and cost tradeoffs that
  determine whether running a model is practical at all.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-20t145835-chopratejasheadroom
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
compiled_at: '2026-07-01T04:49:26.780Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1154
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
  cost_usd: 0.033753
---
Inference is the phase where a trained model actually produces output, and the engineering challenges around it have grown complex enough that a distinct discipline has emerged around it. [Philip Kiely's breakdown for Baseten](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names the core techniques: quantization, speculative decoding, KV caching, parallelism, and prefill/decode disaggregation. Each targets a different bottleneck in the compute and memory pipeline.

KV caching gets particular attention across several sources. The naive approach recomputes attention states on every request; the Everpure Engineering team argues this is wasteful at scale. [One post](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) makes the case for treating the KV cache as a persistent, shared data asset injected via RDMA, cutting prefill costs by up to 20x. A follow-up [details granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), where prompts are segmented into reusable chunks so only changed tokens are reprocessed, lowering time-to-first-token for RAG workloads. Pure Storage's KVA takes this further, [persisting attention states to NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) without modifying model architecture.

On the local inference side, the tooling ecosystem is contested. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets users calculate whether their GPU's VRAM can handle a specific model at various quantization levels, exposing the practical tradeoff between model size and hardware fit. [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues the tool obscures its llama.cpp dependency while shipping inferior inference performance, and that its VC-backed trajectory is moving away from local-first use. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) presents an alternative: a fully offline desktop app with GGUF/llama.cpp support, multiple backends, and an OpenAI-compatible API. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the performance gap from a different angle, using custom kernels to deliver faster inference alongside fine-tuning, claiming up to 30x faster training and 90% less memory than FlashAttention 2.

Token usage is another inference cost axis. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. However, [Przemek Mroczek's skeptical take on RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression-based savings can be vanity metrics if they strip semantically meaningful content and lack task-accuracy benchmarks.

At the routing and pricing layer, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that aligns model selection with user-defined preferences without retraining when new models are added. The pricing context for these decisions has shifted sharply: [a survey of current model pricing](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread between cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity rather than a preference.
