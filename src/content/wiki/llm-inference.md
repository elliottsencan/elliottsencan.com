---
title: LLM inference
summary: >-
  LLM inference covers every layer between a trained model and a generated
  token: memory layout, quantization, caching, batching, routing, and cost — a
  surface area that has grown into its own engineering discipline.
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
compiled_at: '2026-11-17T01:45:12.720Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1320
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
  cost_usd: 0.037242
---
Inference is the runtime half of the LLM stack. Training produces weights; inference turns those weights into output tokens, and the engineering choices made at that stage determine latency, throughput, and cost more than almost anything else downstream. [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/) grounds the mechanics: tokens are embedded, positional encodings are added, attention is computed across layers, and the KV cache retains intermediate attention states so the model does not recompute earlier context on every new token.

That KV cache is the central optimization target in enterprise deployments. Everpure Engineering argues across three posts that the cache should be treated as a persistent shared asset rather than ephemeral GPU memory. [KV caching basics](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) puts prefill cost reduction at up to 20x; [granular-prompt caching](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) extends this by segmenting prompts into reusable chunks keyed by metadata pointers; and [Pure KVA on S3 and NFS](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) claims 20x faster inference by persisting attention states to object storage without changing model architecture.

On the local-inference side, the tooling landscape is contested. [CanItRun](https://canitrun.dev/) surfaces the basic constraint: VRAM determines which models and quantization levels a given GPU can run. [Unsloth](https://unsloth.ai/) targets both fine-tuning and local serving with custom kernels that claim 30x faster training and 90% less memory than FlashAttention 2. [oobabooga/textgen](https://github.com/oobabooga/textgen) offers a fully offline web UI with GGUF/llama.cpp backends and an OpenAI-compatible API. Ollama occupies the same space but [a critical history by Zetaphor](https://sleepingrobots.com/dreams/stop-using-ollama/) argues it ships inferior inference performance relative to llama.cpp, introduced misleading model naming, and has drifted toward a VC-driven cloud model that undermines its local-first premise. [Zack Reed's walkthrough](https://zackreed.me/posts/using-claude-code-with-local-model/) shows LM Studio serving a local model as a drop-in API replacement for Claude Code, illustrating that the OpenAI-compatible API surface is now the practical integration point across the ecosystem.

[What is Inference Engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) frames this as an emerging specialty covering quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation. Netflix's implementation report confirms the scope: their team selected vLLM over TensorRT-LLM, built a model packaging layer, exposed an OpenAI-compatible API surface, and added batched constrained decoding for production scale ([In-House LLM Serving at Netflix](https://netflixtechblog.com/in-house-llm-serving-at-netflix-a5a8e799ea2c)).

Routing is an inference-time decision that sits above the engine layer. DigitalOcean's Inference Router uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality ([How We Built DigitalOcean Inference Router](https://www.digitalocean.com/blog/inference-router-architecture)), while the Arch-Router paper proposes a 1.5B preference-aligned routing model that achieves comparable alignment without retraining when new models are added ([Arch-Router](https://arxiv.org/abs/2506.16655)).

Token-count reduction is a parallel optimization axis. [headroom](https://github.com/chopratejas/headroom) claims 60-95% token compression by compressing tool outputs before they reach the model, though a rebuttal from Przemek Mroczek ([The Token Compression Illusion](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/)) argues those numbers are vanity metrics tied to Bash-output stripping and lack task-accuracy benchmarks.

Cost is the pressure that ties all of this together. A 75x spread between the cheapest and most expensive frontier APIs ([The AI Model Pricing War](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers)) means inference-tier decisions now directly determine product margins. Benchmarks on reasoning effort levels add nuance: a comparison of Claude Opus 4.7 across five effort levels found medium effort outperformed higher settings on pass rate and cost-efficiency ([Opus 4.7 reasoning curve](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve)), a reminder that more compute at inference time does not reliably produce better outputs.
