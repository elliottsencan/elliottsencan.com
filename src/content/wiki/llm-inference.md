---
title: LLM inference
summary: >-
  The mechanics, tooling, and economics of running large language models at
  inference time, spanning local hardware constraints, KV cache optimization,
  quantization, routing, and the cost pressures reshaping how models are served.
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
compiled_at: '2026-08-17T18:47:31.579Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1491
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
  cost_usd: 0.039357
---
LLM inference is the compute work of turning a trained model into live outputs: feeding tokens in, running the forward pass, and streaming tokens back. The field has split into two distinct contexts: local inference on consumer hardware and large-scale serving in cloud or enterprise environments. Both share the same core constraints but solve them differently.

On the local side, the primary bottleneck is VRAM. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: a GPU must hold model weights, the KV cache, and activation overhead simultaneously, and quantization level directly determines whether a model fits at all. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the memory wall with custom kernels that claim up to 90% less memory usage than FlashAttention 2, making larger models viable on modest hardware. The choice of local serving stack also matters. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) supports GGUF/llama.cpp and multiple backends, while [a critical history of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama ships inferior inference performance compared to llama.cpp directly, and has obscured that dependency since its inception. [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) offers another path: serving a local model behind an OpenAI-compatible endpoint so tools like Claude Code can route requests to local hardware.

At the architectural level, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building an inference engine from scratch, covering how the forward pass and sampling loop work in a decoder-only model. This matters because understanding inference mechanics is prerequisite to optimizing it.

The single most consequential optimization in production inference is KV caching. The attention mechanism computes key-value pairs for every token in the context; recomputing them on every request is expensive. [Everpure Engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent, shared data asset injected via RDMA can cut prefill costs by up to 20x. Their [Pure KVA system](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed, reducing time-to-first-token in RAG workloads. A companion post shows [KV cache persistence on S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) delivering 20x faster inference over standard Ethernet without model or architecture changes.

Token compression is a related but more contested lever. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs before they reach the model. [A skeptical take on RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back: claimed savings are vanity metrics that only cover Bash output, risk silent data loss in agent pipelines, and lack task-accuracy benchmarks that would justify the trade-off.

Beyond single-model optimization, inference engineering at scale involves disaggregation, speculative decoding, and batching. [The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs these techniques, framing inference engineering as a distinct discipline from model training. [Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for their in-house serving stack, citing batched constrained decoding and OpenAI-compatible API surface as key requirements.

Routing across models is becoming its own layer. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that aligns selections with user-defined preferences without retraining when new models are added.

Economics increasingly shape inference decisions. A [75x price gap](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) between the cheapest and most expensive frontier models means routing and model selection directly determine margin. A [benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels found a non-monotonic curve: medium effort outperformed higher settings on pass rate and cost-efficiency, suggesting that more compute at inference time does not reliably buy better results.
