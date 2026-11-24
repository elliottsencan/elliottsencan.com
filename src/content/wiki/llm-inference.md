---
title: LLM inference
summary: >-
  LLM inference covers every layer between a model's weights and a generated
  token: memory layout, quantization, caching, batching, and routing — with the
  hardware, cost, and latency tradeoffs each layer introduces.
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
compiled_at: '2026-11-24T03:59:06.555Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1307
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
  cost_usd: 0.037047
---
Inference is the runtime half of the LLM stack, the part that actually produces tokens. It is distinct from training but shaped by training choices: a model's weight count, dtype, and architecture determine what hardware can serve it and how fast.

The most basic constraint is VRAM. [CanItRun](https://canitrun.dev/) makes this concrete, calculating whether a GPU can hold a given open-weight model's weights plus KV cache and activation overhead, and surfacing compatible quantization levels. Quantization is one of the first practical levers: reducing weight precision from FP16 to INT4 or lower shrinks memory footprint at some cost to output quality. [Unsloth](https://unsloth.ai/) extends this with custom kernels that claim up to 30x faster throughput and 90% less memory than FlashAttention 2, targeting local fine-tuning and inference on consumer hardware. [What is Inference Engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) frames quantization alongside speculative decoding, parallelism, and disaggregation as the canonical toolkit for inference engineers at serving scale.

The KV cache is where many production gains live. During autoregressive generation, attention keys and values for prior tokens are cached to avoid recomputation. Three pieces from Everpure Engineering push this further: [Cut LLM Inference Costs with KV Caching](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) argues for treating the KV cache as a persistent shared asset injected via RDMA rather than recomputed per request; [Granular-Prompt Caching with Pure KVA](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) adds segmentation so only changed tokens are processed; and [20x Faster Inference with the First KV Cache for S3 and NFS](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) reports 20x speedups by persisting attention states across sessions on commodity storage. [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/) provides the mechanical grounding for why the KV cache matters: each decoding step attends over all prior positions, so cache reuse compounds in value as context grows.

Token count is a parallel cost lever. [headroom](https://github.com/chopratejas/headroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [The Token Compression Illusion](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/) pushes back directly on such claims, arguing that tools like RTK report vanity metrics on stripped Bash output rather than task-accuracy benchmarks, and that silent data loss in agent pipelines is a real risk.

At the routing layer, inference becomes a dispatch problem. [DigitalOcean's Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B MoE model to match requests to models by cost, latency, or quality. [Arch-Router](https://arxiv.org/abs/2506.16655) takes a lighter approach with a 1.5B preference-aligned model that maps queries to user-defined domains without retraining when new models are added. Routing connects to the broader pricing landscape: [The AI Model Pricing War](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) documents a 75x spread between cheapest and most expensive frontier APIs, making provider-agnostic design and intelligent routing economically significant.

For local deployment, [oobabooga/textgen](https://github.com/oobabooga/textgen) offers a fully offline interface over llama.cpp and other backends, while [Running Claude Code with a Local Model via LM Studio](https://zackreed.me/posts/using-claude-code-with-local-model/) shows how to redirect cloud-API calls to a locally served model. [Friends Don't Let Friends Use Ollama](https://sleepingrobots.com/dreams/stop-using-ollama/) argues that Ollama wraps llama.cpp less efficiently than using it directly, raising questions about how much abstraction inference tooling should impose.

Inference effort level is itself a tunable parameter. [Opus 4.7 reasoning curve benchmarks](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve) find that medium reasoning effort outperforms higher settings on pass rate and cost-efficiency across 29 real tasks. [Netflix's in-house serving architecture](https://netflixtechblog.com/in-house-llm-serving-at-netflix-a5a8e799ea2c) favors vLLM over TensorRT-LLM and covers batched constrained decoding at production scale, illustrating how inference choices look when volume is high enough to justify owning the full stack.
