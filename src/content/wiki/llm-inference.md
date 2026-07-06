---
title: LLM inference
summary: >-
  LLM inference covers everything between a trained model and a generated token:
  memory layout, caching strategies, quantization, routing, and the hardware
  constraints that govern speed and cost at serving time.
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
compiled_at: '2026-07-06T00:16:36.650Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1204
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
  cost_usd: 0.034503
---
Inference is the runtime phase of a language model's life, distinct from training, and the sources here span the full stack from single-GPU consumer hardware to enterprise serving infrastructure.

At the hardware level, the first question is whether a model fits in VRAM at all. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses this directly, computing memory budgets from model weights, KV cache size, and activation overhead, then mapping the result to compatible quantization levels and estimated tokens-per-second. Quantization itself is a central inference technique: [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) ships custom kernels that cut memory usage by up to 90% versus FlashAttention 2, with FP8 support enabling larger models on smaller hardware. For those who want to understand the mechanics underneath, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only model's inference engine from scratch, annotating how attention states are computed and consumed.

The KV cache is the primary lever for reducing per-request compute cost after the model is loaded. Everpure's three-part series argues that the cache should be treated as a persistent shared asset. [Injecting cached attention states via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) rather than recomputing them can cut prefill costs by up to 20x. Their Pure KVA product extends this to [granular prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), segmenting prompts into reusable chunks so only changed tokens are processed, and to [NFS and S3 persistence](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) across sessions without changing model architecture.

Token volume entering the model is a complementary cost lever. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they hit the context window, claiming 60-95% token reduction. That claim warrants scrutiny: [a counter-argument](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) directed at a similar tool (RTK) notes that compression metrics are often vanity numbers measured on Bash output stripping, and that agent pipelines can suffer silent data loss without task-accuracy benchmarks to validate the trade-off.

At the serving layer, [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the practitioner techniques: speculative decoding, disaggregation of prefill and decode phases, batching strategies, and when to invest in inference optimization versus just paying for more compute. Routing across models adds another dimension. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality. The academic counterpart, [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences), achieves similar alignment with a 1.5B model that maps queries to user-defined domains without retraining when the model roster changes.

Cost is increasingly a product decision, not just an infrastructure one. A [75x gap between cheapest and most expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic design and intelligent routing directly tied to margin. Meanwhile, [benchmarks on reasoning-effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) show that higher compute budgets do not monotonically improve quality; medium effort outperformed high, xhigh, and max on pass rate and cost-efficiency across 29 real tasks.
