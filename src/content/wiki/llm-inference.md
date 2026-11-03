---
title: LLM inference
summary: >-
  The mechanics, costs, and engineering tradeoffs of running large language
  models at serving time, from GPU memory constraints and KV caching to
  quantization, routing, and the expanding ecosystem of local and cloud
  inference tools.
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
compiled_at: '2026-11-03T00:40:51.199Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1289
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
  cost_usd: 0.036777
---
Inference is the phase where a trained model actually generates tokens. It is computationally distinct from training: the bottleneck shifts from compute throughput to memory bandwidth, and the practical constraints shift from GPU cluster access to VRAM capacity, latency budgets, and per-token cost.

The foundational mechanics involve tokenization, embedding lookup, multi-head attention, and the KV cache, a data structure that stores previously computed key-value pairs so the model does not recompute attention over the full context on every new token [How LLMs Actually Work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work). Understanding this cache is central to understanding inference costs. Everpure Engineering argues that treating the KV cache as a persistent, shared data asset, injected from fast storage via RDMA rather than recomputed per session, can cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Their Pure KVA system extends this further by segmenting prompts into reusable chunks via metadata pointers, so only changed tokens are processed [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure).

For local deployment, VRAM is the primary constraint. CanItRun translates this into practical guidance: given a GPU's memory capacity, it estimates which quantization levels fit and what tokens-per-second throughput to expect [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm). Unsloth pursues similar goals on the training-adjacent side, using custom kernels to achieve up to 90% less memory usage than FlashAttention 2 [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth). Tools like oobabooga/textgen bring these capabilities to a local desktop environment with GGUF/llama.cpp backend support and an OpenAI-compatible API [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen).

The Ollama ecosystem illustrates how tooling choices carry real performance consequences. A critical post by Zetaphor argues that Ollama ships inferior inference performance relative to llama.cpp directly, obscures its dependency on that project, and has drifted toward a VC-driven cloud model that conflicts with its local-first framing [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama).

At scale, inference engineering encompasses quantization, speculative decoding, parallelism strategies, and disaggregation of prefill and decode phases [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Netflix chose vLLM over TensorRT-LLM for their in-house serving stack, citing deployment flexibility and batched constrained decoding capabilities [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Routing adds another layer: DigitalOcean's Inference Router uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a compact 1.5B routing model aligned to user-defined preferences without retraining when new models arrive [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Token reduction is a related cost lever. The headroom library claims 60-95% compression of tool outputs before they reach the model [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though a skeptical counterpoint notes that such savings are often vanity metrics when not validated against task-accuracy benchmarks [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). On the pricing side, a 75x spread between the cheapest and most expensive frontier APIs has made inference cost a central product decision rather than a background infrastructure concern [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on).
