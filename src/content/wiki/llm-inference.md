---
title: LLM inference
summary: >-
  LLM inference covers how transformer models generate tokens at runtime, the
  hardware and software constraints that govern speed and cost, and the
  engineering techniques used to serve models efficiently at scale.
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
compiled_at: '2026-11-10T01:21:18.128Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1445
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
  cost_usd: 0.039117
---
At its most basic level, LLM inference is the process of running a trained model forward to produce output tokens. [How LLMs Actually Work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work) traces this from tokenization through embeddings, positional encoding, multi-head attention, and the KV cache, the structure that makes autoregressive generation tractable by storing previously computed key and value tensors rather than recomputing them each step.

The KV cache is the central cost lever in production inference. Three pieces from Everpure Engineering argue that treating it as a persistent, shared asset rather than an ephemeral per-request buffer changes the economics significantly. [Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) puts prefill cost reduction at up to 20x when attention states are injected from fast storage via RDMA. [Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed, cutting time-to-first-token for RAG workloads. [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports the same gains persisted across sessions on standard NFS and S3 without architecture changes.

Token compression is an adjacent cost lever, though contested. The headroom library claims 60-95% token reduction by compressing tool outputs before they reach the model [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). A direct counter-argument from [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) holds that similar claims for RTK are vanity metrics, the tool only strips Bash output, and no task-accuracy benchmarks back up the reliability trade-off. The disagreement matters for anyone evaluating compression middleware: reported token savings are not the same as maintained answer quality.

At the infrastructure layer, [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the practitioner toolkit: quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation. Netflix operationalizes many of these, choosing vLLM over TensorRT-LLM for engine flexibility and running batched constrained decoding at scale [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Routing is its own sub-problem: DigitalOcean's Inference Router uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a compact 1.5B alternative that aligns routing with user-defined preferences without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

On the local end of the spectrum, hardware constraints are concrete and calculable. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets users check whether their GPU's VRAM can fit a given model at various quantization levels and estimates tokens per second from model weights, KV cache, and activation overhead. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the same VRAM pressure from the training side with custom kernels that cut memory use by 90% versus FlashAttention 2. For local serving, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a full offline stack with llama.cpp backends and an OpenAI-compatible API, while [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) argues Ollama trades inference performance for convenience in ways that matter at scale.

Pricing is collapsing in parallel. A 75x spread between the cheapest and most expensive frontier models The AI Model Pricing War means inference cost is now a primary product decision, not just an infrastructure footnote. Benchmarks complicate the picture further: more compute does not always mean better output. Testing Claude Opus 4.7 across five reasoning-effort levels found that medium effort outperformed higher settings on pass rate and cost-efficiency alike [Opus 4.7 Reasoning Curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning).
