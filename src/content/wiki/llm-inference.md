---
title: LLM inference
summary: >-
  LLM inference covers how trained models generate tokens at serving time,
  spanning hardware constraints, latency and cost optimization, quantization,
  caching strategies, routing, and the tradeoffs that shape every production
  deployment.
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
compiled_at: '2026-07-01T00:39:48.601Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1257
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
  cost_usd: 0.035298
---
Inference is the moment a trained LLM earns its keep: given a prompt, it produces tokens. That process is more expensive and architecturally complex than it first appears, and a growing body of engineering work treats it as a discipline in its own right. [Philip Kiely at Baseten](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) catalogs the core techniques: quantization, speculative decoding, KV caching, parallelism, and prefill/decode disaggregation. Each addresses a different bottleneck, and the right combination depends on whether you are optimizing for latency, throughput, or cost.

Hardware is the first constraint. [CanItRun](https://canitrun.dev/) makes this concrete: a GPU's VRAM must fit model weights, KV cache, and activation overhead simultaneously, and quantization is often the only practical lever for fitting a large model onto consumer hardware. Tools like [Unsloth](https://unsloth.ai/) push further, claiming up to 30x faster local inference through custom kernels, well beyond what FlashAttention 2 alone provides. [oobabooga/textgen](https://github.com/oobabooga/textgen) and [LM Studio](https://zackreed.me/posts/using-claude-code-with-local-model/) represent the local-serving ecosystem that has grown around GGUF and llama.cpp. [Zetaphor's critique of Ollama](https://sleepingrobots.com/dreams/stop-using-ollama/) argues that layer obscures its llama.cpp dependency while shipping inferior inference performance, a reminder that tooling choices have real throughput consequences.

At the cloud scale, KV caching is the most actionable cost lever. Everpure's series argues that treating KV state as a persistent, shared data asset rather than a per-request computation can reduce prefill costs by up to 20x. [Injecting cached attention states via RDMA from NFS or S3 storage](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) avoids recomputing long system prompts on every call. [Granular-prompt caching](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) extends this by segmenting prompts into reusable chunks so only changed tokens get processed, which matters most for RAG workloads with stable prefixes. The general principle — [cache what is repeated, compute only what changes](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) — is well established.

Context length is an adjacent cost dimension. [Headroom](https://github.com/chopratejas/headroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60–95% token reduction. A skeptical counterpoint: [Przemek Mroczek](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/) argues that RTK's comparable savings figures are vanity metrics because the tool only strips Bash output and provides no task-accuracy benchmarks — compression that silently drops data is not saving money, it is losing information.

Routing adds another optimization axis. [DigitalOcean's Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. The [Arch-Router paper](https://arxiv.org/abs/2506.16655) proposes a compact 1.5B alternative that aligns routing decisions with user-defined preferences without retraining when new models are added. Both reflect the same observation: no single model is optimal for every query, and the dispatch layer is itself an engineering problem.

Pricing compression has made inference optimization economically urgent. A [75x spread between the cheapest and most expensive frontier APIs](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) means model selection is now a margin decision, not just a quality one. Meanwhile, [benchmarks on Claude Opus 4.7](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve) show that higher reasoning effort does not monotonically improve output — medium effort outperformed high, xhigh, and max on pass rate and cost-efficiency across 29 real tasks — which complicates the intuition that more compute always helps.

At the foundational level, [how-to-train-your-gpt](https://github.com/raiyanyahya/how-to-train-your-gpt) walks through building an inference engine from scratch, making the mechanics of token generation legible to practitioners who want to reason about optimization without treating the process as a black box.
