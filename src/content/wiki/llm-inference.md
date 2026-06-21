---
title: LLM inference
summary: >-
  Running LLM inference spans choices about hardware, quantization, caching,
  local vs. cloud deployment, and cost — a set of tradeoffs that a cluster of
  tools and techniques is actively reshaping.
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
compiled_at: '2026-06-21T18:28:57.564Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4709
    output_tokens: 1194
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
  cost_usd: 0.032037
---
LLM inference is the process of generating tokens from a trained model given an input prompt. It sits downstream of training and fine-tuning but dominates real-world cost and latency concerns, making it a primary engineering surface for anyone deploying language models.

The most immediate constraint is memory. A model's weights, the KV cache, and activation overhead must all fit within GPU VRAM, and the interaction between these is non-obvious. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses this directly, calculating compatible quantization levels and estimated tokens-per-second for a given GPU and model combination. Quantization is the primary lever for fitting larger models onto consumer hardware, and tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) push further, delivering up to 30x faster inference and 90% less memory usage than FlashAttention 2 through custom kernels and FP8 support.

The KV cache deserves particular attention. Rather than recomputing attention states on every request, a persistent KV cache can cut prefill costs by up to 20x and improve throughput significantly. [Everpure's KVA](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states to NFS and S3 storage and retrieves them over RDMA, delivering that speedup without changing model architecture. Their [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extension segments prompts into reusable chunks so only changed tokens are reprocessed, cutting time-to-first-token for RAG and enterprise workloads. The framing in [a companion post](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) is useful: treat the KV cache as a persistent shared data asset, not a transient side-effect of inference.

Context length compounds the cost problem. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) attacks it from the input side, compressing tool outputs, logs, and RAG chunks before they reach the model to reduce token usage by 60-95%.

For local inference specifically, the tooling landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline web UI with GGUF/llama.cpp backends, OpenAI-compatible API, and MCP server support. [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows LM Studio serving a local model as a drop-in replacement for a cloud API endpoint. The Ollama alternative draws sharp criticism from [Zetaphor](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama), who argues it ships inferior inference performance versus raw llama.cpp, introduced misleading model naming, and is pivoting toward a closed-source cloud product.

On the cloud side, inference cost has become a competitive variable. A 75x price gap between the cheapest and most expensive frontier APIs has opened up business models that were unprofitable a year ago, per [Ayush Chaturvedi](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). The recommendation is to build provider-agnostic from the start. Separately, [benchmarking Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five reasoning-effort levels found a non-monotonic curve: medium effort outperformed higher settings on both quality and cost-efficiency, suggesting that more compute at inference time does not reliably improve output.

Understanding inference mechanically, including the autoregressive decoding loop and attention computation, is covered in [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), which walks through building an inference engine from scratch alongside the training loop.
