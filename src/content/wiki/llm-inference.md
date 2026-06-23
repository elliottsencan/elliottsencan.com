---
title: LLM inference
summary: >-
  LLM inference covers the mechanics, tooling, and economics of running language
  models to generate tokens, from local GPU constraints and KV cache
  optimization to routing, quantization, and the collapsing cost curve that
  reshapes what products are viable.
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
compiled_at: '2026-06-23T23:21:31.366Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1486
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
  cost_usd: 0.038733
---
Inference is the production side of language models: given a prompt, produce tokens. It is distinct from training, but the two share enough low-level concerns, memory bandwidth, quantization, and kernel efficiency, that tools often span both. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) exemplifies this overlap, using custom CUDA kernels to cut memory usage by up to 90% and accelerate both fine-tuning and local inference runs.

Running a model locally starts with a hard constraint: VRAM. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes that constraint legible, computing whether a given GPU can hold a model's weights, KV cache, and activation overhead at various quantization levels, and estimating tokens-per-second. Quantization is one of the core inference engineering levers. [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the others: speculative decoding, caching, parallelism strategies, and prefill/decode disaggregation, all aimed at squeezing more throughput and lower latency from fixed hardware.

The KV cache is where a significant share of inference cost lives. On each request, the model recomputes attention states for every token in the prompt. Everpure's work shows that persisting and reusing those states changes the economics substantially. [Storing the KV cache on NFS or S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) and injecting it via RDMA delivers up to 20x faster inference without model changes. [Treating prompts as segmented, reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) means only changed tokens get reprocessed, cutting time-to-first-token in RAG workloads. The framing across these pieces is consistent: [the KV cache is a data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), not a throwaway intermediate, and treating it that way can cut prefill costs by up to 20x.

Token volume itself can be reduced before the request reaches the model. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks at the proxy layer, claiming 60-95% token reduction. That claim draws a direct challenge from [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk), which argues RTK-style tools measure vanity metrics, strip only Bash output, risk silent data loss in agent pipelines, and lack task-accuracy benchmarks. The disagreement is unresolved in the literature and the honest answer is that compression gains depend heavily on workload composition.

At the routing layer, inference systems increasingly choose which model handles a given request rather than sending everything to one endpoint. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to rank candidates by cost, latency, and quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach, a 1.5B model that maps queries to user-defined domains without retraining when new models are added. Both treat routing as an inference problem in its own right.

The cost curve underneath all of this has moved fast. A 75x price gap between the cheapest and most expensive frontier models [has collapsed the floor](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on), making consumer-facing and freemium products viable that were not at 2025 rates. [Benchmarking reasoning effort levels on Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic curve: medium effort outperformed higher settings on pass rate and cost-efficiency, which means buying more inference compute does not reliably buy better results. Choosing the right effort level is itself an inference engineering decision.

Local inference tooling has grown into a small ecosystem. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI with an OpenAI-compatible API, GGUF/llama.cpp backends, and MCP support. [LM Studio routed through Claude Code](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows local inference serving as a drop-in replacement for cloud APIs. [Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) sits at the center of a pointed critique: its llama.cpp dependency was obscured, its inference performance lags behind direct llama.cpp usage, and a VC-driven cloud pivot is pulling it away from local-first principles, illustrating how infrastructure choices encode product and business assumptions.
