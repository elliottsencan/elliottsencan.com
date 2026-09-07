---
title: LLM inference
summary: >-
  The mechanics, cost structure, and optimization landscape of running large
  language models at serving time, from GPU memory constraints and KV caching to
  quantization, routing, and local deployment tooling.
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
compiled_at: '2026-09-07T21:17:54.590Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1402
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
  cost_usd: 0.038472
---
LLM inference is the process of generating tokens from a trained model given a prompt. It is computationally distinct from training: the weights are fixed, but each forward pass through the transformer requires loading those weights, computing attention over the current sequence, and storing intermediate key-value states for reuse. Understanding this pipeline is prerequisite to understanding why inference is expensive and where it can be optimized.

At the hardware level, the first constraint is VRAM. A model's memory footprint combines weight storage, KV cache growth with sequence length, and activation overhead. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete with an interactive calculator that estimates whether a given GPU can run a specific open-weight model at various quantization levels, and what token throughput to expect. Quantization trades numerical precision for memory and speed; it is one of the primary levers covered in [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering), which also surveys speculative decoding, parallelism strategies, and prefill-decode disaggregation as production-grade techniques.

The KV cache sits at the center of inference optimization. Rather than recomputing attention states for every token in a long prompt, servers store and reuse them. Three pieces from Everpure Engineering push this further: [one](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues for treating the KV cache as a persistent shared data asset loaded via RDMA rather than recomputed per request; [a second](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) describes granular-prompt caching that segments prompts into reusable chunks so only changed tokens need processing; and [a third](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) reports 20x inference speedups by persisting KV states to NFS and S3 via Pure Storage's KVA.

On the software side, local inference tooling has fragmented into competing stacks. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) uses custom CUDA kernels to run and fine-tune models with dramatically reduced memory overhead. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a web UI and OpenAI-compatible API over llama.cpp and other backends. [LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) can proxy cloud API calls to locally-served models. [Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama), the most widely adopted of these tools, has drawn criticism for obscuring its llama.cpp dependency, shipping suboptimal default performance, and pivoting toward a cloud model that conflicts with its local-first premise.

At scale, [Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) runs a full in-house serving stack built on vLLM rather than TensorRT-LLM, with an OpenAI-compatible API surface and batched constrained decoding. Request routing has become its own subproblem: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar routing alignment with a 1.5B model trained on human preferences.

Token-level costs have dropped sharply. [A 2026 pricing survey](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models, with implications for product economics. Complementary approaches reduce token count before requests reach the model: [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks by 60-95%, though [a skeptical review](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) of a similar tool (RTK) questions whether compression metrics reflect real task-accuracy gains.

The mechanics of inference are explained from first principles in both [How LLMs Actually Work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work), which covers tokenization, attention, and the KV cache without heavy math, and [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), which builds a decoder-only model including the inference engine from scratch.
