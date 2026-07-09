---
title: LLM inference
summary: >-
  LLM inference covers how language models generate tokens from a prompt —
  spanning hardware constraints, serving architecture, caching strategies,
  quantization, routing, and cost — and has become its own engineering
  discipline as scale and cost pressures intensify.
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
compiled_at: '2026-07-09T23:24:32.534Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1219
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
  cost_usd: 0.034728
---
LLM inference is the process of running a trained language model to generate output given an input prompt. At the hardware level, the bottleneck is VRAM: a model's weights, the KV cache, and activation overhead must all fit on the available GPU. Tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) make this concrete, calculating compatible quantization levels and estimated tokens-per-second for a given GPU and model combination.

Quantization is one of the primary levers for fitting larger models into constrained hardware. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) applies custom kernels to achieve up to 30x faster throughput and 90% less memory than FlashAttention 2, supporting FP8 and LoRA workflows. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) exposes multiple backends including GGUF/llama.cpp for fully offline local serving. The critical assessment in [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama, while popular, delivers inferior inference performance compared to llama.cpp directly and obscures that dependency behind a proprietary layer.

At the serving level, the KV cache is the most consequential optimization target. Recomputing attention states on every request is expensive; persisting and reusing them is not. Everpure's engineering posts show two complementary approaches: [injecting cached attention states from fast NFS/S3 storage via RDMA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) for up to 20x faster inference, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) that segments prompts into reusable chunks so only changed tokens are processed. A complementary piece on [KV caching strategy](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the cache as a shared data asset that can cut prefill costs by up to 20x in enterprise deployments.

Token-level compression is a related but distinct approach. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. A skeptical counterpoint on [RTK's token compression claims](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that compression metrics without task-accuracy benchmarks are vanity numbers and that stripping content risks silent data loss in agent pipelines.

At the API and routing layer, inference is increasingly a dispatch problem. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a compact 1.5B model trained on human preferences, requiring no retraining when new models are added. The [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) adds economic urgency: a 75x spread between the cheapest and most expensive frontier APIs means routing and provider-agnostic architecture directly determine margin.

[Inference Engineering as a discipline](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) encompasses all of this: quantization, speculative decoding, caching, parallelism, and disaggregation. Reasoning budget also matters; a benchmark of [Claude Opus 4.7 across five effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic curve where medium effort outperformed higher settings on both quality and cost, suggesting that more compute at inference time is not always better.
