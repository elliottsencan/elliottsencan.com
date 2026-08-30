---
title: LLM inference
summary: >-
  LLM inference covers the full stack of running trained language models to
  produce outputs, from low-level kernel optimization and memory management to
  routing, caching, quantization, and the cost tradeoffs that shape how and
  where models get deployed.
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
compiled_at: '2026-08-30T05:55:22.153Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1471
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
  cost_usd: 0.039507
---
At the lowest level, inference is a memory-bandwidth problem. A model's weights must move from storage into GPU VRAM, and how much fits determines which models can run at all. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by calculating VRAM requirements from model weights, KV cache size, and activation overhead, then surfacing compatible quantization levels and estimated tokens-per-second. Quantization is one of the primary levers inference engineers pull: reducing weight precision shrinks memory footprint at some cost to output quality. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) goes further with custom kernels that deliver up to 30x faster training throughput and 90% less memory usage compared to FlashAttention 2, illustrating how much performance headroom exists between naive and optimized implementations.

The KV cache sits at the center of inference efficiency. Because attention recomputes key-value pairs for every token in context, caching those states avoids redundant work. [How LLMs Actually Work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work) explains the mechanism clearly. The Everpure Engineering team extends this into an architectural argument: treating the KV cache as a persistent, shared data asset injected via RDMA rather than recomputed per request can reduce prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and their Pure KVA system supports granular-prompt caching that segments prompts into reusable chunks so only changed tokens get processed [Maximizing LLM Efficiency](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), with persistence across sessions on NFS and S3 [20x Faster Inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs).

Token count is another cost axis. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. That claim is contested: [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues similar tools report vanity metrics by stripping only Bash output, skip task-accuracy benchmarks, and risk silent data loss in agent pipelines.

[What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames the discipline broadly, covering speculative decoding, parallelism strategies, and disaggregation alongside caching and quantization. Netflix's production account adds specificity: their team chose vLLM over TensorRT-LLM for its flexibility, built an OpenAI-compatible API surface, and runs batched constrained decoding at scale [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

Routing is increasingly treated as an inference-layer concern rather than an application concern. DigitalOcean's Inference Router uses a 30B MoE orchestrator model to match each request to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The Arch-Router paper proposes a 1.5B preference-aligned alternative that maps queries to user-defined domains without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

On the local side, the tooling landscape is contested. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues Ollama ships inferior inference performance relative to llama.cpp directly, while [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) and [Running Claude Code with a Local Model via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) represent the broader ecosystem of local inference servers with OpenAI-compatible APIs.

At the API layer, pricing has collapsed. A 75x gap between the cheapest and most expensive frontier models has opened up business models that were previously unviable [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). Reasoning-effort levels add another variable: benchmarking Claude Opus 4.7 across five effort tiers found a non-monotonic curve where medium effort outperformed higher settings on pass rate and cost-efficiency [Opus 4.7 Low vs Medium vs High](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning).
