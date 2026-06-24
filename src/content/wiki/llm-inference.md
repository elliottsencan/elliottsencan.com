---
title: LLM inference
summary: >-
  Running LLM inference spans hardware constraints, serving architecture,
  caching strategies, quantization, and cost optimization — a field of active
  engineering across both local and cloud deployments.
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
compiled_at: '2026-06-24T06:33:38.482Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1330
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
  cost_usd: 0.036393
---
LLM inference is the process of generating tokens from a trained model given a prompt. It sits at the intersection of hardware, systems software, and economics, and the sources here collectively show how much engineering attention it now demands.

At the hardware level, the first question is whether a given model fits in GPU memory at all. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: VRAM capacity constrains which quantization levels are viable, and the tool estimates tokens-per-second alongside compatibility. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the same constraint from the training side, using custom kernels to cut memory usage by 90% relative to FlashAttention 2 and speed up local runs substantially.

For local serving specifically, the tooling landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI with llama.cpp and GGUF support, an OpenAI-compatible API, and multimodal input. [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows LM Studio serving a local model as a drop-in replacement for a cloud API. But Ollama, perhaps the most visible local-inference tool, draws sharp criticism: [Zetaphor's piece](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior performance, introduced misleading model naming, and is pivoting toward a closed, VC-backed cloud product.

The KV cache is where cloud-scale inference economics get interesting. Three pieces from Everpure Engineering describe how treating the KV cache as a persistent, shared data asset changes the cost profile dramatically. [Alvarez's overview](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames RDMA-injected caches as reducing prefill costs by up to 20x. [Pure KVA's granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. [The KV cache for S3 and NFS piece](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports 20x faster inference by persisting attention states across sessions on standard storage without changing model architecture.

Context compression is another lever. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs, logs, and RAG chunks before they reach the model. The claims prompt skepticism: [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) notes that similar 60-90% compression figures are often misleading — the savings apply only to narrow output types, and missing task-accuracy benchmarks make the reliability trade-off opaque.

At the serving layer, [Gergely Orosz's inference engineering primer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the full toolkit: quantization, speculative decoding, disaggregation, and parallelism. Routing across models is an emerging sub-problem. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE orchestrator to match requests to models by cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach with a 1.5B preference-aligned model that assigns queries to user-defined domains without retraining when the model pool changes.

Cost and effort level interact in non-obvious ways. [The Opus 4.7 reasoning-curve benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found that medium reasoning effort outperformed higher settings on pass rate and cost-efficiency across 29 real tasks. [The AI pricing war piece](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) puts the economic context around this: a 75x price gap now exists between the cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity rather than a best practice.
