---
title: LLM inference
summary: >-
  LLM inference spans the full pipeline from model weights to generated tokens,
  with active work on hardware sizing, KV cache reuse, quantization, routing,
  and cost optimization making it a distinct engineering discipline.
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
compiled_at: '2026-08-11T07:58:14.450Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1449
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
  cost_usd: 0.038727
---
Inference is what happens after training: given a prompt, a model produces tokens. That sounds simple, but the computational and economic pressures involved have turned it into a discipline of its own. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) lays out the core techniques practitioners use to make inference faster and cheaper: quantization, speculative decoding, KV caching, parallelism, and prefill/decode disaggregation. The framing there is that inference engineering is a genuine specialty, not just "run the model."

Hardware sizing is a prerequisite. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) approaches this from the consumer end, calculating whether a GPU's VRAM can fit a model at a given quantization level and estimating tokens-per-second from weights, KV cache, and activation overhead. Quantization is the primary lever for fitting large models into constrained memory; [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) goes further, using custom kernels to deliver training and inference with up to 90% less memory than FlashAttention 2.

The KV cache is the dominant cost center for repeated or long-context workloads. Three pieces from Everpure Engineering explore this in depth. [KV caching basics](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues for treating cached attention states as a persistent shared asset rather than recomputing per request, with claimed prefill cost reductions of up to 20x. [Pure KVA granular caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) adds prompt segmentation so only changed tokens are processed. [KVA on S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) extends this to object and file storage, claiming 20x inference speedups over standard Ethernet without model changes.

At the production scale Netflix operates, engine selection itself is a decision. [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) describes choosing vLLM over TensorRT-LLM, building an OpenAI-compatible API surface, and implementing batched constrained decoding across their full stack.

Routing across models adds another dimension. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a compact 1.5B alternative that aligns routing with human preferences and handles new models without retraining.

Token usage is a proxy for both cost and latency. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. A competing view from [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims for RTK, arguing the savings are vanity metrics that strip only Bash output and lack accuracy benchmarks.

Cost is rapidly becoming the defining variable. [The AI Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models per million tokens, making inference cost a first-order product decision. Running inference locally sidesteps API costs entirely; [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) and [LM Studio via Claude Code](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) illustrate the local-serving path. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) critiques one popular local inference tool for shipping inferior performance compared to its underlying llama.cpp dependency and obscuring that relationship.

Inference behavior also varies with compute budget at runtime. [Opus 4.7 reasoning-effort benchmarks](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) show a non-monotonic curve: medium reasoning effort outperforms higher settings on both quality and cost, suggesting that more inference compute is not reliably better. [No-CoT task horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) tracks capability growth for inference without chain-of-thought, finding frontier models now handle roughly three-minute human tasks at 50% reliability.
