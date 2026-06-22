---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving language models at runtime:
  hardware constraints, memory optimization via KV caching, quantization,
  speculative decoding, routing, and the economics of tokens-per-dollar.
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
compiled_at: '2026-06-22T02:32:05.582Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5260
    output_tokens: 1278
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
  cost_usd: 0.03495
---
Inference is what happens after training: taking a prompt, running it through a model, and returning tokens. The mechanics sound simple, but every layer of the process has become its own engineering discipline. [Philip Kiely at Baseten](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) defines inference engineering as the set of techniques, including quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation, that close the gap between raw model capability and cost-efficient production serving.

The most consequential bottleneck is memory. Running a model locally depends on whether its weights plus KV cache plus activation overhead fit in VRAM, a calculation [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes interactive by estimating tokens-per-second at each quantization level. Quantization trades precision for size; [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) takes this further with custom kernels that cut memory usage by 90% and accelerate training and inference by up to 30x compared to FlashAttention 2.

KV caching is where the largest inference-cost wins are currently being found. Rather than recomputing attention states for every request, persistent caches let a model reuse prior work. [Everpure's KV cache articles](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that injecting cached states via RDMA from fast storage, rather than recomputing them, cuts prefill costs by up to 20x. Their Pure KVA product extends this to granular prompt segmentation, [processing only changed tokens](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) and [persisting attention states across sessions on NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) without requiring architecture changes.

Token volume also shrinks before it reaches the model. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks by 60-95% as a proxy layer, reducing inference cost without touching model weights.

On the serving side, routing has emerged as its own specialization. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best provider for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar preference-aligned routing with a 1.5B model that maps queries to user-defined domains without retraining when new models are added.

The economic layer is changing fast. A [75x spread](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) between cheapest and most expensive frontier APIs means model selection is now a margin decision, not just a quality one. Benchmarks like the [Opus 4.7 reasoning-effort study](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) show that higher compute budgets do not monotonically improve output quality; medium effort beat higher tiers on both pass rate and cost-efficiency across 29 real tasks.

For local deployments, the tooling landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) and [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) both expose OpenAI-compatible APIs for local models. [A critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that abstracting llama.cpp behind a branded layer has produced inferior inference performance and obscured the underlying stack.

At the architectural level, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building an inference engine from scratch, grounding the runtime behavior of attention and the autoregressive decode loop in first principles.
