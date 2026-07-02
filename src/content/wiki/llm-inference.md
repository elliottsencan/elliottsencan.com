---
title: LLM inference
summary: >-
  LLM inference covers the full stack of techniques for running language models
  efficiently: from hardware constraints and quantization to KV caching,
  routing, and token compression, with cost and latency as the defining
  trade-offs.
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
compiled_at: '2026-07-02T12:30:47.577Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1280
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
  cost_usd: 0.035643
---
Inference is what happens after training: a model receives a prompt and produces tokens. At small scale it looks trivial; at production scale it becomes one of the harder systems engineering problems in modern software. The sources here span that full range, from local GPU sizing to enterprise caching infrastructure.

The most fundamental constraint is memory. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: whether a model fits on a given GPU depends on the weight footprint, KV cache size, and activation overhead, and quantization level is the main lever for fitting larger models into limited VRAM. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) pushes further, claiming custom kernels deliver up to 30x faster throughput and 90% less memory use compared to FlashAttention 2. Both sources treat memory efficiency as the primary engineering variable.

For local inference specifically, the tooling landscape is fragmented. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline web UI with GGUF/llama.cpp and an OpenAI-compatible API. [Zack Reed](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows how to redirect Claude Code's API calls to LM Studio for local serving. Meanwhile, [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that the most popular local inference tool obscures its llama.cpp dependency, ships inferior performance, and is pivoting toward a closed-source cloud product, raising questions about tool selection for anyone prioritizing local-first inference.

At the infrastructure level, KV caching is the dominant cost-reduction technique. The Everpure Engineering posts argue that the KV cache should be treated as a persistent, shared data asset rather than recomputed per request. [One piece](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) claims prefill cost reductions up to 20x via RDMA-injected cache states. [Another](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) describes Pure Storage's KVA persisting attention states across sessions on NFS and S3. Granular-prompt caching extends this further, segmenting prompts into reusable chunks so only changed tokens are processed.

Token compression is a related but distinct lever. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. [Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims from RTK, arguing that headline savings figures are vanity metrics that ignore task-accuracy costs and silent data loss risks. The disagreement reflects a real gap in how token compression tools are evaluated.

Routing across models adds another dimension. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach with a 1.5B model aligned to user-defined preferences. Both treat routing as a first-class inference concern rather than an afterthought. The pricing context matters here: [a 75x spread](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) between cheap and expensive frontier models means routing decisions directly determine product margins.

[Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names the canonical technique set: quantization, speculative decoding, caching, parallelism, and disaggregation. That taxonomy maps cleanly onto what the other sources are implementing piecemeal, and it frames inference engineering as a distinct discipline from model training or application development.
