---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving a trained language model —
  hardware constraints, memory management, quantization, caching, routing, and
  cost — from single-GPU local setups to Netflix-scale production deployments.
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
aliases:
  - machine-learning
compiled_at: '2026-10-26T22:29:01.935Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1291
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
  cost_usd: 0.036807
---
At its simplest, LLM inference is the process of generating tokens from a trained model given a prompt. In practice, it spans an enormous range of concerns: whether a GPU has enough VRAM to load a model at all, how attention states are managed across requests, how requests are routed across a fleet, and what the resulting compute costs mean for a product's unit economics.

The hardware floor is a real constraint. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by calculating VRAM headroom from model weights, KV cache, and activation overhead, and surfacing which quantization levels are compatible with a given GPU. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) approaches the same constraint from the training side, using custom kernels to cut memory usage by up to 90% versus FlashAttention 2. Quantization, speculative decoding, and parallelism are the standard levers for closing the gap between model size and available hardware, as surveyed in [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

The KV cache is where much of the inference cost actually lives. Recomputing attention states on every request is expensive; three pieces from Everpure Engineering argue for treating the KV cache as a persistent shared asset. [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) puts the prefill savings at up to 20x when states are injected via RDMA rather than recomputed. [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) demonstrates persisting and reusing attention states across sessions on NFS and S3 without model changes. [Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed, cutting time-to-first-token in RAG workloads.

Token count is the other cost axis. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and context before they reach the model, claiming 60-95% token reduction. That claim deserves scrutiny: [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that similar tools measure vanity metrics (stripped Bash output rather than task accuracy) and risk silent data loss in agent pipelines. The disagreement is a useful reminder that compression benchmarks need task-accuracy validation, not just token counts.

At scale, routing becomes its own engineering surface. DigitalOcean's [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned alternative that generalizes to new models without retraining. [Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) runs the full serving stack in-house on vLLM, with batched constrained decoding and an OpenAI-compatible API surface.

For local inference, the tooling landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline UI with llama.cpp backend support. The [critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that it obscures its llama.cpp dependency, ships inferior performance, and is pivoting toward a VC-driven cloud model, suggesting practitioners evaluate the underlying engine rather than its wrapper.

Pricing pressure across all of this is significant. A [survey of the model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x spread between cheapest and most expensive frontier APIs, making provider-agnostic architecture a practical necessity rather than a nice-to-have.
