---
title: LLM inference
summary: >-
  LLM inference covers how trained models generate tokens in production,
  spanning the mechanics of attention computation, KV caching, quantization, and
  routing, alongside the cost, latency, and hardware tradeoffs that shape
  deployment decisions.
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
compiled_at: '2026-06-23T00:05:34.054Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5477
    output_tokens: 1273
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
  cost_usd: 0.035526
---
Inference is the phase where a trained language model actually runs: it takes a prompt, processes every token through attention layers, and produces output one token at a time. Understanding what happens in that loop matters for anyone deploying or building on top of these models.

At the hardware level, the core constraint is memory bandwidth. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: whether a given GPU can run a model at all depends on VRAM available for model weights, KV cache, and activation overhead, with quantization as the main lever for fitting larger models onto smaller cards. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) pushes this further with custom kernels that claim up to 30x faster throughput and 90% less memory than FlashAttention 2. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) gives a practical local-serving reference with GGUF/llama.cpp backend support and an OpenAI-compatible API.

The KV cache, which stores computed attention states to avoid reprocessing unchanged tokens, is central to inference efficiency. [Everpure's analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that persisting and sharing KV cache as a data asset via RDMA-attached storage can cut prefill costs by up to 20x. Their [Pure KVA product](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this with granular-prompt caching, segmenting prompts so only changed tokens are reprocessed. A [companion post](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports up to 20x faster inference by persisting attention states on NFS and S3.

Beyond caching, techniques like speculative decoding, quantization, parallelism, and prefill/decode disaggregation are covered systematically in [Philip Kiely's inference engineering primer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Token compression offers another angle: [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% reduction in tokens fed to the model by compressing tool outputs and RAG chunks before the prompt is sent, though [a skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues similar tools produce vanity metrics, strip only Bash output, and lack task-accuracy benchmarks that would justify the reliability risk.

Routing, the decision of which model handles which request, is an increasingly important inference-time concern. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE routing model to match requests to models by cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a lighter 1.5B model that aligns routing with user-defined preferences without retraining when new models are added.

Pricing compression ties routing decisions directly to economics. A [75x gap between cheap and expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) has made provider-agnostic, routing-aware architectures a practical business necessity. [Benchmarking reasoning-effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across 29 tasks found a non-monotonic relationship: medium effort outperformed higher settings on both quality and cost, meaning more compute at inference is not automatically better.

For developers learning how inference works internally, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) builds an inference engine from scratch alongside the full training stack, and [LM Studio as a local inference server](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows how to redirect API calls from cloud models to local ones.
