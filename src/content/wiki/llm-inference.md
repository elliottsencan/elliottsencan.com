---
title: LLM inference
summary: >-
  Running a trained language model to generate tokens — covering hardware
  constraints, serving techniques like KV caching and quantization, routing
  across providers, and the cost-performance tradeoffs that shape both local and
  cloud deployments.
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
compiled_at: '2026-07-09T14:15:18.792Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1493
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
  cost_usd: 0.038838
---
Inference is the process of running a trained language model to produce output: feeding a prompt through the network and sampling tokens until the model stops. Unlike training, which happens once, inference happens at every request, so its efficiency determines whether a deployment is economically viable.

The hardware floor is real and calculable. VRAM capacity sets a hard ceiling on which models can run on a given GPU, and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes that ceiling explicit by computing required memory from model weights, KV cache, and activation overhead, then showing which quantization levels fit. Quantization is one of the primary levers: reducing weight precision from FP16 to INT4 or lower shrinks memory use substantially, with modest quality tradeoffs. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) takes this further with custom CUDA kernels, claiming up to 30x faster throughput and 90% less memory than FlashAttention 2 baselines.

For developers building from scratch, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through implementing an inference engine alongside the training loop, clarifying that inference in a decoder-only transformer is just the forward pass with sampling attached. The distinction matters because inference optimizations — batching, caching, speculative decoding — operate on that forward pass.

KV caching is the most consequential inference optimization in production. During prefill, the model computes attention keys and values for the entire prompt; caching those tensors avoids recomputing them on subsequent tokens or requests that share a prefix. [Everpure's KV caching post](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset — stored on fast NFS or S3 and injected via RDMA — can cut prefill costs by up to 20x. Their [Pure KVA system](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) operationalizes this, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends it by segmenting prompts into reusable chunks so only changed tokens are reprocessed.

Token count shapes inference cost directly. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction. A skeptical counterpoint comes from [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk), which argues that headline compression numbers are vanity metrics when the tool only strips Bash output and lacks task-accuracy benchmarks to justify the reliability trade-off.

[Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) consolidates the practitioner view: quantization, speculative decoding, caching, parallelism, and disaggregation are the standard toolkit, and inference engineering is now a distinct discipline at larger AI companies. At the routing layer, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best provider for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) shows a 1.5B model can do preference-aligned routing without retraining when new models are added.

On the local side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) and [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) both expose OpenAI-compatible APIs from local GGUF models, making it possible to redirect cloud-dependent tooling to on-device inference. [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) adds context: Ollama wraps llama.cpp but ships slower inference than alternatives and has moved toward a VC-funded cloud direction, which matters when choosing a local inference runtime.

Cloud inference pricing has compressed sharply. A 75x gap between cheapest and most expensive frontier models [signals](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) that cost-per-token can no longer be treated as fixed — provider-agnostic architecture and routing become load-bearing business decisions. Reasoning effort levels add another dimension: benchmarks on Claude Opus 4.7 [found](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) a non-monotonic quality curve where medium effort outperformed higher settings on both quality and cost, suggesting that more inference compute does not monotonically improve results.
