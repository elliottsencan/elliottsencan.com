---
title: LLM inference
summary: >-
  LLM inference spans the full problem of turning trained model weights into
  fast, cost-effective token generation, from GPU memory planning and
  quantization to KV caching, routing, and local-vs-cloud deployment tradeoffs.
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
aliases:
  - machine-learning
compiled_at: '2026-08-29T20:18:19.778Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1346
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
  cost_usd: 0.037182
---
Running a language model in production is a distinct engineering discipline from training one. The fundamentals start at the hardware layer: a model's memory footprint is determined by weight size, KV cache, and activation overhead, and a GPU either fits those requirements or it does not. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by calculating compatible quantization levels and estimated tokens-per-second for a given GPU's VRAM. Quantization itself is one of the primary levers inference engineers use to shrink memory requirements without retraining, alongside techniques like speculative decoding, parallelism strategies, and prefill/decode disaggregation, all covered in depth by Philip Kiely's breakdown of the field [in The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

The KV cache is where a significant share of inference cost lives. Every prefill pass recomputes attention states that may be identical across requests, which is wasteful at scale. Everpure's work argues for treating the KV cache as a persistent shared asset: their Pure KVA system persists attention states to NFS or S3 storage and retrieves them via RDMA, [delivering up to 20x faster inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) compared to standard Ethernet-based recomputation. A companion technique, [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), segments prompts into reusable chunks via metadata pointers so only changed tokens are processed, cutting time-to-first-token for RAG and enterprise workloads. [Robert Alvarez frames this](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) as a 20x prefill cost reduction available to any enterprise deployment willing to treat caching as infrastructure rather than an afterthought.

Token volume is the other axis. [The headroom library](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs, logs, and RAG chunks before they reach the model. That figure is contested: [Przemek Mroczek argues](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) that RTK's similar compression claims are vanity metrics, the tool only strips Bash output, and lacks task-accuracy benchmarks that would justify the reliability risk in agent pipelines. The disagreement reflects a genuine tension in the space: compression ratios measured on token count are easy to report but hard to validate against downstream answer quality.

At the serving layer, Netflix's approach is instructive. Their AI Platform team chose vLLM over TensorRT-LLM for engine flexibility, built an OpenAI-compatible API surface, and handles batched constrained decoding at scale [entirely in-house](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Routing across models is increasingly its own sub-problem. DigitalOcean's Inference Router uses a 30B MoE orchestrator model to match each request to the best-fit model for cost, latency, or quality [based on live-data ranking](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The Arch-Router paper proposes a lighter 1.5B alternative [that aligns routing with human preferences](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) without retraining when new models are added.

For local inference, the tooling landscape is fragmented. Ollama has wide adoption but [a critical history](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) documents that it obscured its llama.cpp dependency, ships inferior inference performance, introduced misleading model naming, and is pivoting toward a closed-source cloud product. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline alternative with GGUF/llama.cpp support, an OpenAI-compatible API, and MCP server integration. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) focuses on the fine-tuning side but also serves inference locally with custom kernels that cut memory usage substantially relative to FlashAttention 2. Cost pressure from the API side is real: a 75x price gap between the cheapest and most expensive frontier models [has collapsed the pricing floor](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on), making provider-agnostic architecture a practical necessity rather than an architectural preference.
