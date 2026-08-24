---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving language model outputs
  efficiently: hardware constraints, quantization, caching strategies, routing,
  and the cost-versus-quality trade-offs that determine what is practical to
  deploy.
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
aliases:
  - machine-learning
compiled_at: '2026-08-24T18:49:08.174Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5664
    output_tokens: 1513
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
  cost_usd: 0.039687
---
LLM inference is the process of running a trained model to generate outputs, and the engineering work surrounding it has grown into its own discipline. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames this clearly: inference engineering encompasses quantization, speculative decoding, KV caching, parallelism, and disaggregation as distinct levers for making serving faster and cheaper, and argues the discipline warrants dedicated investment at scale.

Hardware constraints shape every inference decision before any software optimization is possible. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete: GPU VRAM must cover model weights, the KV cache, and activation overhead, and the tool calculates which quantization levels fit a given card along with expected tokens-per-second. Quantization is the most direct lever for fitting larger models onto smaller hardware, and [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) extends this further with custom kernels that deliver up to 30x faster training and 90% less memory usage compared to FlashAttention 2, supporting FP8 and a wide range of model families.

The KV cache, the stored attention states from prior tokens, is central to inference efficiency. Recomputing it on every request is wasteful; persisting and sharing it is the optimization target. [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent data asset, injected via RDMA from fast storage rather than recomputed, can reduce prefill costs by up to 20x. [Pure KVA's granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens trigger recomputation, cutting time-to-first-token for RAG workloads, and [20x faster inference with KVA on S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) demonstrates this over standard Ethernet without model architecture changes.

Token-level compression is a related cost lever with contested reliability. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% reductions by compressing tool outputs and RAG chunks before they reach the model, while [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims from RTK, arguing the savings are vanity metrics that strip only Bash output and risk silent data loss in agent pipelines without task-accuracy benchmarks to justify the trade-off.

At the serving layer, routing across models adds another dimension. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) takes a lighter approach with a 1.5B model that maps queries to user-defined domains for preference-aligned routing without retraining when new models are added. Routing matters more as pricing diverges: a [75x spread between cheapest and most expensive frontier APIs](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means model selection is now a margin decision, not just a quality decision.

Quality does not scale monotonically with compute at inference time. [Benchmarking Claude Opus 4.7 across five reasoning-effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds that medium effort outperforms high, xhigh, and max on pass rate and cost-efficiency across 29 real tasks, a non-monotonic curve that challenges the assumption that more compute always helps.

For local inference, tooling fragmentation is a real concern. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues Ollama ships inferior inference performance relative to its llama.cpp dependency and is pivoting toward cloud, while [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline alternative with multiple backends and an OpenAI-compatible API. [LM Studio used as a local inference server](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) demonstrates redirecting cloud-client API calls to local hardware, a pattern that depends entirely on the inference server exposing a compatible surface.

At production scale, [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for its engine, built an OpenAI-compatible API surface, and implemented batched constrained decoding, showing that running the full serving stack in-house remains a serious option when usage volume justifies it.
