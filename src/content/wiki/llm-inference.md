---
title: LLM inference
summary: >-
  LLM inference covers how language models generate tokens at runtime,
  encompassing hardware constraints, serving architecture, caching strategies,
  quantization, routing, and the cost-performance trade-offs that shape every
  deployment decision.
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
compiled_at: '2026-10-05T23:54:49.867Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1254
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
  cost_usd: 0.036252
---
Inference is the runtime half of the LLM lifecycle: given a prompt, produce tokens. The mechanics start with the attention computation, where queries, keys, and values are calculated for each token. As [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/) explains, the KV cache stores those intermediate states so the model does not recompute every prior token on each forward pass. That single data structure sits at the center of most optimization effort.

On the hardware side, how much you can run is a direct function of VRAM. [CanItRun](https://canitrun.dev/) makes this concrete: a given GPU's memory must cover model weights, KV cache, and activation overhead simultaneously, and the compatible quantization levels shift with each variable. Quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation are the main levers; [What is Inference Engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) treats these as a coherent discipline that warrants dedicated engineering investment at scale.

Caching is where the biggest latency wins concentrate. [How to Cut LLM Inference Costs with KV Caching](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) argues for treating the KV cache as a persistent, shared data asset injected via RDMA rather than recomputed per request, claiming up to 20x prefill cost reduction. [20x Faster Inference with the First KV Cache for S3 and NFS](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) shows that persisting attention states across sessions on NFS and S3 can deliver comparable gains without touching the model. [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) extends this to granular-prompt segmentation, so only changed tokens are processed, which cuts time-to-first-token in RAG and enterprise workloads.

Token count matters too. [chopratejas/headroom](https://github.com/chopratejas/headroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. A counter-argument appears in [The Token Compression Illusion](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/), which scrutinizes RTK's similar claims as vanity metrics that strip Bash output without validating downstream task accuracy.

Serving infrastructure has matured into its own specialty. [In-House LLM Serving at Netflix](https://netflixtechblog.com/in-house-llm-serving-at-netflix-a5a8e799ea2c) details a full in-house stack built on vLLM with an OpenAI-compatible API surface, batched constrained decoding, and deliberate engine selection over TensorRT-LLM. Local serving alternatives like [oobabooga/textgen](https://github.com/oobabooga/textgen) and LM Studio (covered in [Running Claude Code with a Local Model via LM Studio](https://zackreed.me/posts/using-claude-code-with-local-model/)) offer offline GGUF-based inference with tool-calling and API compatibility. [Unsloth](https://unsloth.ai/) targets the local fine-tune-and-run workflow with custom kernels that reduce memory overhead by 90% versus FlashAttention 2.

At cloud scale, routing has emerged as a way to arbitrage cost and quality across a provider fleet. [DigitalOcean Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](https://arxiv.org/abs/2506.16655) takes a lighter approach with a 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining when new models are added.

Pricing pressure reinforces all of this. [The AI Model Pricing War](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) documents a 75x spread between cheapest and most expensive frontier tokens, making inference cost a first-order product decision. And [Opus 4.7 reasoning curve benchmarks](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve) show that more compute-per-request does not monotonically improve output quality, with medium effort outperforming higher settings on pass rate and cost-efficiency across 29 real tasks.
