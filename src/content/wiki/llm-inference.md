---
title: LLM inference
summary: >-
  LLM inference covers the full stack of running trained language models to
  generate tokens, from hardware constraints and quantization through caching,
  routing, and cost optimization at every scale.
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
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-10-19T22:10:49.252Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1287
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
  cost_usd: 0.036747
---
Inference is the production half of the LLM lifecycle. Training produces weights; inference turns those weights into tokens on demand, and the engineering decisions made there determine latency, throughput, cost, and practical capability.

At the hardware level, the first constraint is VRAM. A model's weights, the KV cache, and activation overhead must all fit on the GPU simultaneously. [CanItRun](https://canitrun.dev/) formalizes this calculation, letting users check which quantization levels are feasible and what tokens-per-second to expect. Quantization itself is one of the core inference optimization levers; [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) approaches this via custom kernels that cut memory usage by up to 90% compared to FlashAttention 2 while accelerating throughput significantly.

The KV cache is where much of the current infrastructure work is concentrated. Rather than recomputing attention states for every request, the cache stores them for reuse. [Everpure's KV caching writeup](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues for treating the KV cache as a persistent shared asset injected via RDMA, cutting prefill costs by up to 20x. Their follow-up on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks keyed by metadata pointers, so only changed tokens require recomputation. [Pure Storage's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends this to S3 and NFS, persisting attention states across sessions without changing model architecture.

Token compression is a related cost lever, but a contested one. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. A [critical analysis of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk), a similar tool, pushes back: the savings are measured in tokens stripped rather than task accuracy preserved, and silent data loss in agent pipelines is a real risk.

At the serving layer, [Netflix's in-house stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for its flexibility and OpenAI-compatible API surface, building batched constrained decoding at scale. [The Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names the core techniques: quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation.

Routing adds another layer. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a lighter 1.5B alternative that aligns routing with user-defined preferences without retraining when new models are added.

Local inference has its own ecosystem and politics. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI supporting GGUF and llama.cpp backends. [A critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior inference performance, and is drifting toward a VC-backed cloud model that contradicts its local-first pitch.

At the API pricing layer, a [survey of the current model pricing landscape](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models, making provider-agnostic architecture essential for cost control. Reasoning effort adds another dimension: a [benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five effort levels found a non-monotonic curve where medium effort outperformed higher settings on both quality and cost.
