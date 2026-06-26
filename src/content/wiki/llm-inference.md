---
title: LLM inference
summary: >-
  LLM inference spans everything from raw throughput mechanics to cost
  optimization, routing, local deployment, and the engineering discipline that
  now surrounds serving models at scale.
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
compiled_at: '2026-06-26T02:59:05.885Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1360
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
  cost_usd: 0.036843
---
Inference is the process of running a trained language model to generate output tokens given an input prompt. At the mechanical level, every inference call involves two phases: prefill, where the model processes the full input sequence and builds the KV cache, and decode, where it autoregressively produces output tokens one step at a time. Understanding this split matters for optimization because the bottlenecks are different. [Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the main techniques practitioners reach for: quantization, speculative decoding, caching, parallelism, and disaggregation.

KV caching has become a central cost lever. Rather than recomputing attention states on every call, the cache stores them for reuse. Everpure's work pushes this further: [one post](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent, shared data asset injected via RDMA can cut prefill costs by up to 20x, while [a companion piece](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) describes Pure Storage's KVA persisting attention states across sessions on NFS and S3. Granular-prompt caching goes further still, [segmenting prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only changed tokens are processed.

Token volume is a parallel axis. Compressing what goes into the context window reduces cost and latency before the model ever runs. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction on tool outputs, logs, and RAG chunks. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) is a useful counterweight: vanity compression metrics that strip only Bash output and omit task-accuracy benchmarks should not be trusted, especially in agent pipelines where silent data loss is consequential.

Routing across models is a newer piece of the stack. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach with a 1.5B model that aligns routing with user-defined preferences without retraining when new models are added. These systems reflect a broader shift: at the scale where a 75x spread in token pricing exists ([from $0.20/M to $15/M](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on)), routing and provider-agnostic architecture directly determine product margins.

Local inference is its own subdomain. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates whether a GPU's VRAM can handle a given model given weights, KV cache, and activation overhead. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets the training and fine-tuning side with custom kernels delivering up to 30x faster throughput and 90% less memory. [Oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) and [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) provide local serving infrastructure, while [the Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that one popular local tool ships inferior inference performance relative to bare llama.cpp and has drifted toward a cloud model.

Reasoning compute is an emerging inference dimension. [Benchmarks on Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic curve: medium reasoning effort outperformed higher settings on both quality and cost, suggesting that more inference-time compute does not linearly improve results. Separately, [work measuring no-CoT task horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) notes that chain-of-thought reasoning is now a meaningful axis of inference configuration with safety implications for monitoring.
