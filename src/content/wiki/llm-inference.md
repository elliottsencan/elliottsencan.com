---
title: LLM inference
summary: >-
  LLM inference covers the full stack of running trained language models to
  produce outputs: hardware constraints, serving architecture, caching
  strategies, quantization, routing, and the cost-performance trade-offs that
  govern practical deployment.
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
compiled_at: '2026-10-13T00:18:41.694Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1554
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
  cost_usd: 0.040752
---
Inference is what happens after training: a model receives tokens and produces more. The mechanics start with the attention mechanism and its key-value cache, which stores computed attention states so each new token doesn't require reprocessing the full context How LLMs Actually Work. Understanding those mechanics from first principles, including the full forward pass and inference loop, is the subject of at least one annotated textbook aimed at Python developers [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt).

The KV cache is the central lever for inference efficiency at scale. Recomputing attention states on every request is expensive; persisting them cuts prefill costs dramatically. Everpure's engineering blog describes treating the KV cache as a shared data asset injected via RDMA, claiming up to 20x faster inference and a 20x reduction in prefill cost [20x Faster Inference with the First KV Cache for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). A companion piece describes granular-prompt caching, segmenting prompts into reusable chunks so only changed tokens are processed, reducing time-to-first-token in RAG workloads [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). The underlying case for this approach is laid out more generally in [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching).

Beyond caching, inference engineering draws on quantization, speculative decoding, parallelism strategies, and prefill-decode disaggregation. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys these techniques and frames inference engineering as a distinct discipline, separate from model training, with its own hiring profile and optimization targets.

At the local end of the spectrum, hardware constraints are the binding constraint. CanItRun provides a calculator that estimates whether a GPU's VRAM can fit a given model at various quantization levels, accounting for weights, KV cache, and activation memory. Tools like [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) and [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) expose local inference via OpenAI-compatible APIs. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets both training and inference with custom kernels that reduce memory usage substantially against FlashAttention 2 baselines. The choice of local inference backend matters: [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues Ollama ships inferior inference performance relative to llama.cpp used directly.

At cloud scale, Netflix runs vLLM over TensorRT-LLM for its in-house serving stack, with OpenAI-compatible APIs and batched constrained decoding [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Routing across models adds another layer: DigitalOcean's Inference Router uses a 30B mixture-of-experts model to match requests to models by cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while Arch-Router proposes a compact 1.5B routing model aligned to user-defined preferences without retraining as new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Token volume is another cost axis. Compressing context before it reaches the model cuts both cost and latency; tools like headroom claim 60-95% token reduction [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though skepticism is warranted: a critique of similar tools notes that compression metrics are often vanity numbers that omit task-accuracy benchmarks and risk silent data loss [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Pricing pressure across the industry has made inference cost a strategic variable. A 75x spread between cheapest and most expensive frontier models means model selection and provider-agnostic architecture directly affect margins [The AI Model Pricing War Is Here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). Effort levels within a single model also have non-obvious effects: benchmarking Claude Opus 4.7 found that medium reasoning effort outperformed higher settings on pass rate and cost-efficiency across 29 real tasks [Opus 4.7 Low vs Medium vs High vs Xhigh vs Max](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning).
