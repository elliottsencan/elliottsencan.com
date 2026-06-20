---
title: LLM inference
summary: >-
  LLM inference covers everything from raw token generation mechanics to the
  economics of running models at scale, spanning local GPU deployment, KV cache
  optimization, quantization, and the growing gap between cloud and on-device
  runtimes.
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
compiled_at: '2026-06-20T22:05:27.061Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4709
    output_tokens: 1165
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
  cost_usd: 0.031602
---
Inference is the step where a trained LLM actually generates tokens, and the engineering decisions made here determine cost, latency, and practical capability. The mechanics are straightforward: the model performs a forward pass per token, attending over all prior context. What makes inference hard at scale is that this process is memory-bound and compute-hungry in ways that compound quickly with context length.

The attention mechanism produces key-value tensors for every token in the context window. Recomputing those on every request is expensive, which is why KV caching is the central optimization in production inference. [Everpure's KV caching piece](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent, shared data asset injected via RDMA rather than recomputed each time can cut prefill costs by up to 20x. Their [Pure KVA system](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions on NFS and S3 storage without changing model architecture. A companion piece on [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further by segmenting prompts into reusable chunks so only changed tokens are processed, reducing time-to-first-token for RAG workloads.

On the local inference side, VRAM is the primary constraint. CanItRun makes this concrete by calculating which quantization levels a given GPU can support and estimating tokens-per-second based on model weights, KV cache, and activation overhead. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses memory pressure directly with custom kernels claiming 90% less memory than FlashAttention 2 and up to 30x faster training, supporting FP8 and LoRA across 500+ models. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a local runtime with GGUF and llama.cpp backends, an OpenAI-compatible API, and multimodal support entirely offline.

The choice of inference backend matters more than it might seem. [A critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that the tool obscures its llama.cpp dependency, ships inferior inference performance, and has pivoted toward a closed-source cloud model, making it a poor default for users who care about local-first performance. This points to a wider pattern: inference tooling choices encode assumptions about who controls the runtime.

At the API layer, inference cost has become a strategic variable. A [pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models, arguing that building provider-agnostic from day one is now a margin question, not just an architectural preference. The [Opus 4.7 reasoning-effort benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) adds nuance: more compute at inference time does not monotonically improve quality; medium effort outperformed higher settings on pass rate and cost-efficiency across 29 real tasks.

Token budget pressure is another inference-time concern. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction without degrading answer quality, which matters when context windows are finite and billed per token.

For developers who want to understand inference from first principles, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch, including the inference engine itself, with every line annotated.
