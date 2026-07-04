---
title: LLM inference
summary: >-
  Running a trained language model to generate text — covering hardware
  constraints, serving architecture, caching strategies, quantization, routing,
  and the cost tradeoffs that shape how and where models run.
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
compiled_at: '2026-07-04T21:23:11.509Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1208
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
  cost_usd: 0.034563
---
LLM inference is the computational process of passing an input through a trained model to produce output tokens. It sits downstream of training and fine-tuning but is where most production cost and latency is actually incurred.

The hardware floor for local inference is determined by VRAM. [CanItRun](https://canitrun.dev/) makes this concrete: a model's memory requirement is a function of weight size, KV cache, and activation overhead, and quantization levels determine which models fit on a given GPU and at what tokens-per-second. [Unsloth](https://unsloth.ai/) pushes further with custom kernels that claim up to 30x faster throughput and 90% lower memory use than FlashAttention 2, enabling fine-tuned models to run on consumer hardware. The [how-to-train-your-gpt](https://github.com/raiyanyahya/how-to-train-your-gpt) textbook complements these tools by building an inference engine from scratch, grounding the abstractions in actual decoder mechanics like RoPE and attention.

On the tooling side, [oobabooga/textgen](https://github.com/oobabooga/textgen) provides a fully offline web UI with an OpenAI-compatible API, GGUF/llama.cpp backend support, and multimodal input. [LM Studio](https://zackreed.me/posts/using-claude-code-with-local-model/) serves a similar role, letting developers redirect cloud API calls to local models — though local models introduce their own quirks, like injecting whitespace into long URL strings. [Friends Don't Let Friends Use Ollama](https://sleepingrobots.com/dreams/stop-using-ollama/) argues that Ollama obscures its llama.cpp dependency and ships inferior inference performance relative to running llama.cpp directly.

At the serving layer, the KV cache is the primary lever for cutting inference costs. Everpure's work shows that persisting and sharing attention states across sessions — via RDMA-injected storage rather than recomputation — can reduce prefill costs by up to [20x](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/). Their [granular-prompt caching](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) approach segments prompts into reusable chunks so only changed tokens are processed, cutting time-to-first-token in RAG workloads. A broader [overview of inference engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) covers the full technique stack: quantization, speculative decoding, caching, parallelism, and disaggregation.

Token-level compression is a related but contested approach. [Headroom](https://github.com/chopratejas/headroom) claims 60–95% token reduction by compressing tool outputs and RAG chunks before they reach the model. A skeptical counterpoint from [Mroczek](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/) argues that claimed savings are vanity metrics — stripping Bash output without task-accuracy benchmarks risks silent data loss in agent pipelines.

Routing across models adds another efficiency dimension. [DigitalOcean's Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality. [Arch-Router](https://arxiv.org/abs/2506.16655) takes a leaner approach with a 1.5B model that aligns routing with user-defined preferences without retraining when new models are added.

Cost and capability are converging rapidly. A [pricing survey](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) shows a 75x gap between cheapest and most expensive frontier models, making provider-agnostic architecture essential. Benchmarks of [Claude Opus 4.7](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve) show that higher reasoning-effort levels don't linearly improve quality — medium effort outperformed high, xhigh, and max on pass rate and cost-efficiency across 29 real tasks. Separately, [research on no-CoT task completion](https://www.lesswrong.com/posts/SieLowPgNgRSPGhFw/estimating-no-cot-task-completion-time-horizons-of-frontier) finds frontier models doubling in capability roughly every year, with implications for how inference-time reasoning is monitored.
