---
title: LLM inference
summary: >-
  LLM inference covers the full pipeline of running language models in
  production: memory constraints, quantization, KV caching, routing, speculative
  decoding, and the cost tradeoffs that determine whether a deployment is
  practical at all.
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
compiled_at: '2026-08-10T19:03:24.895Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1442
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
  cost_usd: 0.038622
---
Inference is what happens after training: given a prompt, a model produces tokens, one at a time, drawing on the attention states computed for every preceding token. That process consumes GPU memory and compute in ways that differ sharply from training, and most of the engineering effort in deploying language models is really inference engineering.

Memory is the first constraint. A model's weight footprint is fixed, but the KV cache, which stores intermediate attention states for all tokens in context, grows with sequence length and batch size. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: it calculates whether a GPU's VRAM can hold a given open-weight model at various quantization levels, factoring in weights, KV cache, and activation overhead to estimate tokens per second. Quantization is the standard lever for fitting models into limited VRAM. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) uses custom kernels to cut memory usage by up to 90% versus FlashAttention 2 while accelerating throughput, supporting FP8 and LoRA adapters across 500+ models.

The KV cache itself has become a significant optimization target at the serving layer. Everpure's work argues that recomputing attention states on every request is wasteful: [persisting the KV cache to fast storage via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x. Their [Pure KVA product](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further with granular-prompt caching: prompts are segmented into reusable chunks via metadata pointers so only changed tokens are reprocessed, reducing time-to-first-token for RAG and enterprise workloads. A companion post demonstrates [20x faster inference by persisting KV states to NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) without altering model architecture.

Token volume is another cost axis. Compressing what enters the context window before inference cuts both latency and spend. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. A dissenting view from [Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims made for RTK, arguing the reported savings are vanity metrics that only cover Bash output and risk silent data loss in agent pipelines without task-accuracy evidence.

At scale, routing decisions matter as much as per-request optimization. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE orchestration model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B routing model that maps queries to user-defined domains and action types, achieving strong alignment with human preferences without retraining when new models are added.

[Netflix's in-house serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for engine flexibility, built an OpenAI-compatible API surface, and runs batched constrained decoding at scale. The [Pragmatic Engineer's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names the full toolkit: quantization, speculative decoding, caching, parallelism, and disaggregation, with guidance on when each is worth investing in.

For local inference, the tool landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a GGUF/llama.cpp backend with a web UI and OpenAI-compatible API. Zetaphor's [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it ships inferior inference performance relative to llama.cpp while obscuring that dependency, introducing misleading model naming, and pivoting toward a closed-source cloud product. [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) is used in practice to serve local models behind an OpenAI-compatible endpoint that can substitute for hosted APIs.

Pricing pressure is reshaping what inference costs look like in production. A [survey of current model pricing](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) finds a 75x spread between the cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity rather than an architectural preference.
