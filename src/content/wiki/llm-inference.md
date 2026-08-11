---
title: LLM inference
summary: >-
  LLM inference covers how a trained model generates tokens at runtime, spanning
  hardware constraints, serving architectures, caching strategies, quantization,
  routing, and the cost-latency trade-offs that determine whether a deployment
  is practical.
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
compiled_at: '2026-08-11T05:20:15.705Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1512
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
  cost_usd: 0.039672
---
LLM inference is the process of running a trained model to produce output, distinct from training but shaped by many of the same resource pressures. Understanding it requires reasoning across at least three layers: hardware fit, serving architecture, and cost management.

The hardware layer sets hard limits before any code runs. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) surfaces the core constraint: a model's weight size, KV cache, and activation overhead must all fit within available VRAM, and quantization level is the main lever for making that fit possible. Unsloth pushes this further, delivering up to 30x faster local inference with custom kernels that cut memory usage by 90% compared to FlashAttention 2 [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth). For developers who want full local control without Ollama, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a GGUF/llama.cpp backend with an OpenAI-compatible API and tool-calling support. The Ollama critique from [Sleeping Robots](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) is worth noting here: wrapping llama.cpp in a managed tool can obscure performance trade-offs and lock-in risk, particularly as that tool pursues a cloud pivot.

At the serving layer, inference engineering is increasingly a dedicated discipline. [Philip Kiely's breakdown via The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) enumerates the main techniques: quantization, speculative decoding, KV caching, parallelism strategies, and prefill/decode disaggregation. Netflix's production implementation illustrates these choices at scale: they selected vLLM over TensorRT-LLM for their primary engine, built an OpenAI-compatible API surface, and run batched constrained decoding across their fleet [Netflix TechBlog](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

KV caching is the single highest-leverage technique for reducing inference cost in high-reuse workloads. Everpure Engineering makes the case that treating the KV cache as a persistent, shared data asset injected via RDMA — rather than recomputed on each request — can reduce prefill costs by up to 20x [Everpure](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their Pure KVA system extends this to granular prompt segmentation, so only changed tokens trigger recomputation [granular caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and a companion post demonstrates 20x faster inference by persisting attention states to NFS and S3 [KVA for S3/NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Routing across models is an emerging architectural concern when multiple models are available at different cost and quality points. DigitalOcean's Inference Router uses a 30B MoE model to automatically match requests to the best-fit backend [DigitalOcean](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). Arch-Router proposes a more compact alternative: a 1.5B model that maps queries to user-defined domains without retraining when new models are added [arXiv](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Token compression is another cost lever, though it requires scrutiny. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. A direct rebuttal from [Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that such figures are vanity metrics when they lack task-accuracy benchmarks and risk silent data loss in agent pipelines. The disagreement is unresolved and points to a broader evaluation gap in this space.

Beyond raw throughput, inference budget matters qualitatively. [stet.sh's benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic relationship between reasoning-effort level and output quality: medium effort outperformed higher settings on pass rate and cost-efficiency across 29 real tasks. More compute does not reliably produce better answers. On the cost side, a 75x spread between the cheapest and most expensive frontier models [Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means provider-agnostic architecture is now a practical financial decision, not just an engineering preference.

For those building inference from first principles, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through constructing the inference engine alongside the training loop, grounding abstractions like KV cache and attention in annotated code.
