---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving language model outputs
  efficiently, from low-level kernel optimizations and quantization to caching
  strategies, routing, and the hardware constraints that govern what runs where.
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
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
aliases:
  - machine-learning
compiled_at: '2026-08-03T10:09:13.020Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1456
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
  cost_usd: 0.038832
---
LLM inference is the process of generating tokens from a trained model in response to a prompt. It sits downstream of training and fine-tuning, but in production it consumes most of the engineering effort and nearly all of the compute cost. The sources here collectively trace inference from first principles through to large-scale serving infrastructure.

At the most fundamental level, [How to Train Your GPT](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building an inference engine from scratch, covering the attention mechanism, RoPE embeddings, and the autoregressive decoding loop. That foundation matters because the optimizations higher up the stack, quantization, caching, speculative decoding, all work by modifying some piece of that loop.

[CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes the hardware constraint legible: VRAM is the binding constraint for local inference, and quantization level determines whether a model fits at all, with tokens-per-second as the resulting performance metric. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the same constraint with custom CUDA kernels that reduce memory usage by up to 90% compared to FlashAttention 2.

The KV cache is the central optimization target for throughput. Three pieces from Everpure Engineering argue that the cache should be treated as a persistent, shared data asset rather than something recomputed per request. [Injecting cached attention states via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x. [Pure KVA's granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed. [Persisting KV state to S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) delivers up to 20x faster inference without modifying model architecture.

A related approach is compressing the context before it reaches the model. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks. [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on that framing, arguing compression metrics that strip only Bash output are vanity numbers and that task-accuracy benchmarks are the right measure, not raw token counts.

[What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys the full technique stack in production: quantization, speculative decoding, caching, tensor parallelism, and prefill-decode disaggregation. [Netflix's in-house serving infrastructure](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what that looks like at scale, choosing vLLM over TensorRT-LLM and building an OpenAI-compatible API surface with batched constrained decoding.

At the API layer, routing has emerged as a distinct problem. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that aligns with user-defined preferences without retraining when new models are added.

Cost is the connective tissue across all of this. [The AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier APIs, making inference cost a first-class product decision. [The Opus 4.7 reasoning curve benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds that higher reasoning-effort settings often spend more compute without improving output quality, confirming that the right inference configuration is empirical, not assumed.

For local inference specifically, [the critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) and the description of [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) as an alternative illustrate that local serving is a contested space, with meaningful differences in performance, transparency, and community trust across tools. [Running Claude Code via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows a practical hybrid: cloud tooling redirected to a local inference server through an OpenAI-compatible endpoint.
