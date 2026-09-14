---
title: LLM inference
summary: >-
  LLM inference is the process of generating tokens from a trained model,
  spanning hardware constraints, serving architecture, caching strategies, and
  cost optimization across both local and cloud deployments.
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
compiled_at: '2026-09-14T21:39:02.186Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1396
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
  cost_usd: 0.038382
---
Inference is what happens after training: given an input, the model produces output token by token. The mechanics are straightforward at a small scale but generate significant engineering complexity at production scale, where latency, throughput, and cost all pull in different directions.

At the hardware level, the binding constraint is memory bandwidth, not compute. [CanItRun](https://canitrun.dev/) makes this concrete: whether a GPU can run a given model depends on VRAM headroom for weights, KV cache, and activation overhead, with quantization as the primary lever for fitting larger models onto smaller hardware. Quantization reduces weight precision to shrink memory footprint, at some cost to output quality. [Unsloth](https://unsloth.ai/) pursues related ground with custom CUDA kernels that cut memory usage by up to 90% versus FlashAttention 2 while accelerating throughput.

The KV cache is the central optimization primitive in modern inference. Rather than recomputing attention states for the full prompt on every forward pass, the cache stores key and value tensors for previously seen tokens. Three posts from Everpure Engineering push this further: treating the KV cache as a persistent, shared data asset injected via RDMA can reduce prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching); granular-prompt caching segments prompts into reusable chunks so only changed tokens are reprocessed [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure); and persisting those states to NFS or S3 via Pure KVA delivers up to 20x faster inference across sessions [20x Faster Inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). [How LLMs Actually Work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work) provides the conceptual grounding: the KV cache avoids redundant recomputation by storing intermediate attention states that otherwise get recalculated from scratch.

Token compression is a related but contested approach. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back directly on RTK-style tools, arguing reported savings are vanity metrics that strip only Bash output and risk silent data loss in agent pipelines without task-accuracy benchmarks to justify the trade-off.

At cloud scale, routing becomes its own problem. DigitalOcean's Inference Router uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality [How We Built DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router). The Arch-Router paper proposes a 1.5B alternative that aligns routing with user-defined domain and action types without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Netflix opted to run the full serving stack in-house with vLLM over TensorRT-LLM, citing flexibility for batched constrained decoding and a clean OpenAI-compatible API surface [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

[What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys the professional discipline: quantization, speculative decoding, caching, parallelism, and disaggregation as the main technique families, with advice on when investing in inference optimization pays off versus when it is premature.

Cost is a structuring concern throughout. A 75x spread between cheapest and most expensive frontier models [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) makes provider-agnostic architecture attractive. Running inference locally via tools like [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) or LM Studio [Running Claude Code with a Local Model](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) eliminates per-token costs entirely, at the price of hardware constraints and operational overhead. The [Ollama critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) adds a cautionary note: ease of use and inference performance are not the same thing, and tools that abstract away the backend can ship meaningfully inferior throughput.
