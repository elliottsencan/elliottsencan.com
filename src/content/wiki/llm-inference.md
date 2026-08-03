---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving language model outputs
  efficiently, from GPU memory budgeting and quantization to KV caching,
  routing, and the cost tradeoffs that shape what is practical to deploy.
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
compiled_at: '2026-08-03T19:36:59.678Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1656
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
  cost_usd: 0.041832
---
Running a language model in production involves far more than loading weights and generating tokens. The compute and memory demands at inference time have spawned a distinct engineering discipline with its own techniques, tooling ecosystem, and cost calculus.

The most fundamental constraint is VRAM. A model's memory footprint combines weight storage, the KV cache for attention states, and per-request activation overhead. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: given a GPU and a model, it calculates which quantization levels fit and estimates resulting token throughput. Quantization is the primary lever for fitting larger models on consumer hardware, trading numerical precision for memory savings. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) takes this further with custom kernels that deliver up to 30x faster training and 90% less memory usage compared to FlashAttention 2, showing that inference and fine-tuning share the same underlying memory problem.

At the architecture level, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building an inference engine from scratch, clarifying what the forward pass actually computes and why techniques like RoPE affect serving behavior. Understanding internals matters when tuning production systems.

KV caching sits at the center of inference optimization for repeated or long-context workloads. Rather than recomputing attention states for unchanged prompt prefixes on every request, caches persist those states for reuse. [Everpure Engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues for treating the KV cache as a shared data asset injected via RDMA, claiming up to 20x prefill cost reduction. Their Pure KVA product extends this to S3 and NFS storage [with granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), segmenting prompts into reusable chunks so only changed tokens are processed. The [20x inference speedup claim](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) comes without changing model architecture or deployment stack.

Token volume is another axis. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. [A skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) applied to similar tooling notes that such savings are often vanity metrics: stripping Bash output is not the same as semantic compression, and silent data loss in agent pipelines is a real risk without task-accuracy benchmarks to validate the tradeoff.

[Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names the canonical technique set: quantization, speculative decoding, caching, parallelism, and disaggregation. Netflix's production account [of their in-house serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows these techniques applied at scale, choosing vLLM over TensorRT-LLM for engine flexibility and running batched constrained decoding across their OpenAI-compatible API surface.

Routing across models adds another optimization dimension. DigitalOcean's Inference Router [uses a 30B MoE model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match requests to the best-fit model for cost, latency, or quality. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that maps queries to user-defined domains without retraining when new models are added, achieving state-of-the-art alignment with human preferences.

On the cost side, a [75x price gap](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) between commodity and frontier models has made provider-agnostic design essential. Reasoning effort also matters: a [benchmark of Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five effort levels found a non-monotonic curve where medium effort outperformed higher settings on both quality and cost, suggesting that more compute at inference time does not reliably produce better outputs. [Frontier capability measurements](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) without chain-of-thought reasoning show reliability doubling roughly every year, which has direct implications for how much inference compute is warranted per task type.

Local inference has its own ecosystem. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop environment with GGUF/llama.cpp support and an OpenAI-compatible API. Ollama is the better-known local runner, but [a critical history](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it ships inferior performance compared to llama.cpp directly, introduced misleading model naming, and is pivoting toward cloud in ways that undermine its local-first premise. [Routing Claude Code to LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) illustrates the practical appeal: OpenAI-compatible local servers let tools built for cloud APIs run entirely on local hardware, with quirks like whitespace injection in long URLs as the remaining friction.
