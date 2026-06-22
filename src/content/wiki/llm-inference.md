---
title: LLM inference
summary: >-
  LLM inference covers everything from serving a trained model to a user request
  to the hardware, caching, routing, and quantization decisions that determine
  speed, cost, and quality at that moment of execution.
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
compiled_at: '2026-06-22T07:17:42.216Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5260
    output_tokens: 1209
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
  cost_usd: 0.033915
---
Inference is the compute phase where a trained language model generates output given a prompt. Unlike training, it happens continuously in production and is where cost, latency, and throughput pressure accumulate fastest. [What Is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) provides the clearest taxonomy of what practitioners actually optimize: quantization (reducing weight precision to shrink memory footprint), speculative decoding (using a smaller draft model to propose tokens the larger model verifies in parallel), caching, parallelism strategies, and prefill/decode disaggregation.

The KV cache is one of the highest-leverage targets. Standard deployments recompute attention states on every request. Everpure Engineering argues that persisting those states as a shared data asset, retrieved via RDMA rather than recomputed, cuts prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their follow-on work segments prompts into reusable chunks so only changed tokens trigger recomputation [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and Pure Storage's KVA extends this to S3 and NFS without model-architecture changes [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Token volume is the other axis. Compressing tool outputs and RAG chunks before they reach the model can reduce token usage 60-95% with minimal quality loss [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). On the reasoning-effort side, more compute at inference time does not reliably improve output: a benchmark of Claude Opus 4.7 found that medium effort outperformed higher effort tiers on pass rate and cost-efficiency [Opus 4.7 Low vs Medium vs High vs Xhigh vs Max](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning).

For local inference, VRAM capacity is the primary constraint. CanItRun [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates compatible quantization levels and estimated tokens-per-second from model weights, KV cache, and activation overhead. Unsloth's custom kernels deliver up to 30x faster local training and inference with 90% less memory than FlashAttention 2 [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth). The choice of serving stack also matters: a critical review of Ollama argues it ships inferior inference performance compared to bare llama.cpp and is drifting toward a VC-driven cloud model [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama); oobabooga's text-generation-webui offers a fully offline alternative with multiple backends [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen).

At the routing layer, both DigitalOcean's Inference Router [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and the Arch-Router paper [Arch-Router: Aligning LLM Routing with Human Preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) treat model selection as a live optimization problem, matching each request to the best-fit model for cost, latency, or quality. The economics of that choice have shifted sharply: a 75x pricing gap now exists between the cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity [The AI Model Pricing War Is Here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).
