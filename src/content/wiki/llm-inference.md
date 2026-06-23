---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving language models — hardware
  constraints, quantization, caching, routing, and cost — from local GPU setups
  to enterprise-scale deployments.
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
compiled_at: '2026-06-23T01:59:30.180Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1260
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
  cost_usd: 0.035343
---
Running a language model after training is its own engineering problem, separate from how the model was built. The mechanics start at the hardware layer: a GPU's VRAM sets a hard ceiling on what can run at all. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete, calculating compatible quantization levels and estimated tokens-per-second given model weights, KV cache, and activation overhead. Quantization is one of the primary levers for fitting models onto available hardware; [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names it alongside speculative decoding, caching, parallelism, and disaggregation as the core techniques inference engineers reach for.

The KV cache sits at the center of inference cost. Recomputing attention states for every request wastes GPU cycles on tokens the model has already processed. Everpure's engineering posts argue for treating the KV cache as a persistent, shared data asset: [injecting it from fast storage via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. Pure Storage's KVA takes this further, [persisting attention states across sessions on NFS and S3](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) without touching model architecture.

On the token-count side, compressing what goes into the context window is a parallel cost lever. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. A skeptical counterpoint comes from [a critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk), which argues that claimed compression savings are vanity metrics if they strip useful data and lack task-accuracy benchmarks.

Local inference has its own ecosystem. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) uses custom kernels to run and fine-tune models with far less memory than standard approaches. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop interface with GGUF/llama.cpp backends and an OpenAI-compatible API. [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) of routing Claude Code through LM Studio shows local inference being used as a drop-in replacement for hosted APIs, with practical caveats around model behavior. A critical history of Ollama [argues it ships inferior inference performance](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) relative to bare llama.cpp and has drifted from its local-first origins toward a cloud pivot.

At scale, routing becomes its own problem. DigitalOcean's Inference Router [uses a 30B MoE model to match each request to the best-fit model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) across cost, latency, and quality dimensions. The [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B routing model that maps queries to user-defined domains without retraining when new models are added.

Pricing pressure reshapes what inference decisions are economically viable. A [75x gap between the cheapest and most expensive frontier models](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic architecture a practical necessity. Effort settings add another dimension: benchmarking Claude Opus 4.7 across five reasoning-effort levels [found a non-monotonic quality curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning), with medium effort outperforming higher settings on both quality and cost.
