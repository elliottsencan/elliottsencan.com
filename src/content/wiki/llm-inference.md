---
title: LLM inference
summary: >-
  Running LLM predictions efficiently — covering hardware constraints, KV
  caching, quantization, routing, and local versus cloud serving — is a
  fast-moving engineering discipline with significant cost and latency
  consequences.
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
compiled_at: '2026-07-08T00:16:52.822Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1183
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
  cost_usd: 0.034188
---
LLM inference is the process of generating text from a trained model, from the moment a prompt arrives to the final output token. What was once treated as a commodity step is now a distinct engineering discipline with its own practitioners, techniques, and tradeoffs.

At the hardware level, the first constraint is VRAM. [CanItRun](https://canitrun.dev/) makes this concrete: a given GPU can only run a model whose weight footprint, KV cache, and activation overhead fit in available memory, and quantization is the primary lever for fitting larger models into smaller cards. Quantization trades numerical precision for memory and speed. [Unsloth](https://unsloth.ai/) extends this further, using custom kernels to deliver inference and training at up to 30x higher speed and 90% lower memory than FlashAttention 2 baselines. For practitioners running models locally, [oobabooga/textgen](https://github.com/oobabooga/textgen) offers a GGUF/llama.cpp backend with an OpenAI-compatible API, and [LM Studio can serve as a local inference endpoint](https://zackreed.me/posts/using-claude-code-with-local-model/) that tools like Claude Code can target with minimal configuration changes.

The critique of Ollama from [Sleeping Robots](https://sleepingrobots.com/dreams/stop-using-ollama/) illustrates a recurring tension: convenience wrappers can obscure the underlying inference engine (llama.cpp), introduce performance regressions, and drift from their local-first premise toward cloud dependencies. Understanding what is actually running matters for anyone serious about inference quality or privacy.

The KV cache is the most important performance primitive inside the inference stack itself. Rather than recomputing attention states from scratch on every request, the cache stores intermediate key-value pairs and reuses them. [Everpure's work](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) argues for treating this cache as a persistent, shared data asset injected via RDMA, claiming up to 20x reduction in prefill cost. Their [Pure KVA product](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) segments prompts into reusable chunks so only changed tokens trigger recomputation, cutting time-to-first-token for RAG workloads. A companion post describes [persisting KV state to NFS and S3](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) without changing model architecture.

Token count itself is another inference cost axis. [Headroom](https://github.com/chopratejas/headroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. A skeptical counterpoint comes from [Mroczek's critique of RTK](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/): compression tools that only strip Bash output and lack task-accuracy benchmarks risk silent data loss in agent pipelines — a reminder that token savings are only meaningful if output quality holds.

At the infrastructure layer, routing across models is an emerging specialty. [DigitalOcean's Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B MoE model to match each request to the best-fit backend for cost, latency, or quality. The [Arch-Router paper](https://arxiv.org/abs/2506.16655) proposes a 1.5B routing model aligned to user-defined preferences that generalizes to new models without retraining. [Gergely Orosz's overview of inference engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) frames the broader toolkit: quantization, speculative decoding, caching, parallelism, and prefill-decode disaggregation are all active levers practitioners combine depending on latency and throughput targets.

Cost pressure is reshaping deployment decisions. A [75x price gap across frontier models](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) means inference cost can no longer be treated as fixed, and [benchmarks on reasoning-effort levels](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve) show that more compute per token does not monotonically improve quality — medium effort outperformed higher settings on real tasks, suggesting that compute budgeting is itself a tunable inference parameter.
