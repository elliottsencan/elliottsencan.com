---
title: LLM inference
summary: >-
  LLM inference covers the full stack of running language models to produce
  output: hardware constraints, serving architecture, caching strategies,
  quantization, routing, and the cost-latency tradeoffs that determine what
  deployments are practical.
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
compiled_at: '2026-06-23T01:26:08.368Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1309
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
  cost_usd: 0.036078
---
Inference is the step where a trained model actually generates text, and it turns out to be one of the harder engineering problems in the LLM ecosystem. The fundamentals — tokenization, attention computation, the KV cache — are explained bottom-up in raiyanyahya/how-to-train-your-gpt, which walks through building an inference engine from scratch alongside the training loop. That foundation matters because nearly every optimization technique in production targets one of those primitives.

The most discussed primitive is the KV cache. Everpure Engineering argues across three posts that the cache should be treated as a persistent, shared data asset rather than something recomputed per session. [KV caching basics](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) puts the prefill cost reduction at up to 20x; [Pure KVA granular caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are reprocessed; and [KV cache on S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends that to persistent object storage over standard Ethernet. The claimed 20x throughput gains are significant but come from a vendor; independent validation is absent.

Quantization and local hardware constraints are the other major axis. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes the tradeoff concrete: given a GPU's VRAM, it calculates which quantization levels fit and what tokens-per-second to expect from model weights, KV cache, and activations combined. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the training side with custom kernels that cut memory usage by 90% versus FlashAttention 2, but its inference path also benefits from that efficiency. For local serving, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) supports GGUF via llama.cpp and multiple backends, while [the critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama's abstraction over llama.cpp ships inferior performance and misleading model naming relative to running the underlying engine directly.

At the serving layer, inference engineering as a discipline involves quantization, speculative decoding, disaggregated prefill and decode, and various parallelism strategies, as catalogued by [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Routing adds another dimension: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit backend for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a lighter 1.5B model that aligns routing with human-defined preferences without retraining.

Token compression is a related cost lever. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. [The token compression illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims for RTK, noting that vanity metrics around Bash output stripping obscure risks of silent data loss and the absence of task-accuracy benchmarks.

Pricing pressure shapes all of this. A [survey of AI model pricing](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between cheapest and most expensive frontier models, which makes provider-agnostic architecture and inference cost management directly relevant to product margins. Reasoning effort also interacts with cost: a [benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five effort levels finds that medium effort outperforms higher settings on pass rate and cost-efficiency alike, suggesting that more compute per token does not reliably buy better output.
