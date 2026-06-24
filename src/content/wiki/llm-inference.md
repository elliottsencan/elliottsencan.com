---
title: LLM inference
summary: >-
  LLM inference spans the full stack from raw computation to cost strategy:
  kernel optimizations, KV cache persistence, quantization, speculative
  decoding, routing, and token compression all determine how fast and cheaply a
  model generates tokens.
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
compiled_at: '2026-06-24T04:38:25.308Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1125
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
  cost_usd: 0.033318
---
Inference is the process of running a trained LLM to generate output, and it is where most of the operational complexity and cost in production AI sits. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) provides the clearest taxonomy: the core techniques are quantization (reducing weight precision to fit larger models in memory), speculative decoding (using a smaller draft model to propose tokens the larger model verifies in parallel), KV caching (storing computed attention states for reuse), parallelism across devices, and prefill/decode disaggregation.

The KV cache in particular has attracted dedicated infrastructure work. Everpure Engineering argues in three posts that the cache should be treated as a persistent, shared data asset rather than something recomputed per request. Their Pure KVA system persists attention states to NFS and S3 storage, [claiming 20x faster inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) over standard Ethernet. A companion piece on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) describes segmenting prompts into reusable chunks via metadata pointers so only changed tokens are processed, reducing time-to-first-token for RAG workloads. A third post frames this as [cutting prefill costs by up to 20x](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) in enterprise deployments.

On the local inference side, the picture is messier. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) uses custom CUDA kernels to deliver up to 30x faster training and significantly reduced memory versus FlashAttention 2. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a local web UI that supports GGUF/llama.cpp and multiple backends. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) translates hardware specs into practical guidance, calculating compatible quantization levels and estimated tokens-per-second given a GPU's VRAM. Meanwhile, [a critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that popular local-inference wrappers can obscure their underlying llama.cpp dependency while shipping inferior performance, a warning about abstraction layers that trade transparency for convenience.

Token compression is a parallel lever. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% reductions by compressing tool outputs before they reach the model. [A skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) on similar tools notes that vanity compression metrics don't translate to task-accuracy gains and can introduce silent data loss in agent pipelines.

At the API layer, routing has emerged as its own optimization surface. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar preference-aligned routing with a 1.5B model that generalizes to new models without retraining. Both approaches reflect the [pricing reality](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) that a 75x gap now separates the cheapest and most expensive frontier models, making routing a first-order business decision.
