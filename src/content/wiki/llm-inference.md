---
title: LLM inference
summary: >-
  LLM inference spans everything from the mathematics of a forward pass to the
  operational engineering of serving models at scale, with active work on cost
  reduction, hardware constraints, caching, routing, and local deployment.
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
compiled_at: '2026-09-21T21:53:03.071Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1557
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
  cost_usd: 0.040797
---
At its core, LLM inference is the process of running a trained model to generate tokens from an input prompt. [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/) covers the mechanics: tokenization converts text to integer IDs, embeddings and positional encodings project them into a high-dimensional space, and the transformer's attention layers produce a probability distribution over the vocabulary at each decoding step. The KV cache stores intermediate attention states so previously seen tokens don't have to be recomputed on every step.

For practitioners building inference engines from scratch, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through the inference loop alongside the training loop, annotating every component of a decoder-only transformer including RoPE and the attention mechanism.

The engineering discipline that sits above those fundamentals is inference engineering proper. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys the toolkit: quantization reduces model weight precision to shrink memory footprint, speculative decoding uses a smaller draft model to propose tokens that the full model then verifies in parallel, batching amortizes GPU overhead across concurrent requests, and disaggregation separates prefill from decode phases so each can be scaled independently.

Memory is the central constraint for local inference. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) exposes the arithmetic directly: VRAM must accommodate model weights, KV cache, and activation memory, and quantization level determines which models are even feasible on a given GPU. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses this from the training side with custom kernels that reduce memory use by up to 90% versus FlashAttention 2. For local serving, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a full offline web UI with GGUF/llama.cpp backends, while [Running Claude Code with a Local Model via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) demonstrates routing a commercial coding tool's API calls to a locally served model instead.

The KV cache is also the main lever for cutting costs in cloud deployments. [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that persisting attention states to fast storage via RDMA rather than recomputing them can reduce prefill costs by up to 20x. [Maximizing LLM Efficiency: Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this with segment-level caching so only changed tokens are processed, cutting time-to-first-token for RAG and multi-turn workloads. 20x Faster Inference with the First KV Cache for S3 and NFS reports 20x speedups by storing KV state on NFS and S3 without modifying the model or deployment stack.

Token compression is another cost-reduction strategy, though a contested one. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60-95% token reduction by compressing tool outputs and RAG chunks before they reach the model. [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims from RTK, arguing that compression metrics without task-accuracy benchmarks are vanity numbers and that lossy compression introduces silent data loss risk in agent pipelines.

At the routing layer, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B mixture-of-experts model to match each request to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that maps queries to user-defined domains without retraining when new models are added. Meanwhile, the pricing environment for hosted inference has shifted dramatically: [The AI Model Pricing War](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) reports a 75x spread between the cheapest and most expensive frontier models, with the floor still falling.

Netflix's approach to production inference at scale illustrates how these concerns compound: [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM for engine flexibility and built an OpenAI-compatible API surface, deployment pipelines, and batched constrained decoding on top of it. Reasoning-effort level adds another dimension: [Opus 4.7 reasoning curve benchmarks](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic relationship between compute budget and output quality, with medium effort outperforming higher settings on pass rate and cost.
