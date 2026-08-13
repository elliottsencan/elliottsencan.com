---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving, optimizing, and routing model
  predictions — from VRAM constraints and quantization on local hardware to KV
  caching, speculative decoding, and intelligent request routing at enterprise
  scale.
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
compiled_at: '2026-08-13T21:15:27.955Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1547
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
  cost_usd: 0.040197
---
Inference is the runtime half of the LLM lifecycle: the moment a trained model receives a prompt and generates tokens. Compared with training, it looks simple, but at scale it consumes significant compute, memory bandwidth, and engineering attention.

The most fundamental constraint is VRAM. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this tangible by letting users calculate whether a specific GPU can load a given open-weight model, accounting for quantization level, KV cache size, and activation memory. Quantization is the primary lever for fitting larger models into smaller memory budgets; the tradeoff is precision loss. Tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) attack the memory problem from the training side as well, claiming up to 90% memory reduction over FlashAttention 2 via custom kernels, which also benefits fine-tuned model deployment.

For local inference, the ecosystem is fragmented. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a full offline UI and OpenAI-compatible API backed by llama.cpp and GGUF formats. [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows how to redirect cloud-API calls to LM Studio for local serving, surfacing practical friction like whitespace injection on long URLs. Ollama is the dominant local-inference brand name, but [Zetaphor's critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it ships inferior inference performance relative to raw llama.cpp, obscured its dependency on that library, and is pivoting toward a closed-source cloud product.

At the architectural level, [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames the discipline around techniques like speculative decoding, disaggregated prefill and decode, batching strategies, and parallelism. Netflix's production stack reinforces this: their [in-house serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM and built an OpenAI-compatible surface with batched constrained decoding.

KV caching is one of the highest-leverage optimizations. Everpure Engineering argues across three posts that the KV cache should be treated as a persistent, shareable data asset rather than transient GPU memory: [loading it from fast storage via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can reduce prefill costs by up to 20x, [granular prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed, and [persisting attention states to NFS or S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) delivers up to 20x inference speedups across sessions without changing model architecture.

Token-level compression is a separate approach. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. But [Przemek Mroczek's rebuttal](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) targets similar tools, arguing that token-count savings are vanity metrics when the tool only strips Bash output and lacks task-accuracy benchmarks to justify reliability tradeoffs in agentic pipelines.

Routing is the third major axis. Rather than send every request to the same model, DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit backend for cost, latency, or quality. The companion [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model aligned with human preferences, extensible to new models without retraining.

Pricing dynamics shape the inference decision tree for builders. [A 2026 analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread between cheapest and most expensive frontier APIs, arguing for provider-agnostic architectures. [Benchmarking Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels found a non-monotonic cost-quality curve: medium effort outperformed high, xhigh, and max on both quality and cost-efficiency, suggesting that more inference compute is not always better. Separately, [work on no-CoT task horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) finds that frontier models handle roughly three-minute human tasks without chain-of-thought, a capability doubling annually, with implications for how much inference-time reasoning overhead is actually needed.
