---
title: LLM inference
summary: >-
  LLM inference covers the full stack of running trained language models to
  produce outputs, from low-level kernel optimizations and quantization to KV
  caching, hardware constraints, cost modeling, and the tradeoffs between local
  and cloud deployment.
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
compiled_at: '2026-06-21T20:13:09.766Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4880
    output_tokens: 1286
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
  cost_usd: 0.03393
---
Inference is the compute step where a trained model takes input tokens and produces output tokens. It is distinct from training, though the two share architecture concerns: [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) builds a decoder-only model from scratch and treats the inference engine as its own implementation chapter, annotating the forward pass and sampling loop alongside the training loop.

On the hardware side, VRAM is the binding constraint for local inference. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes this concrete by calculating whether a given GPU can hold a model's weights, KV cache, and activation overhead at various quantization levels, then estimating tokens per second. Quantization itself is one of the primary inference engineering levers: reducing precision shrinks memory footprint and increases throughput, with the tradeoff being some loss of output quality. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) goes further with custom CUDA kernels that deliver up to 30x faster throughput and 90% less memory than FlashAttention 2, targeting both training and inference on consumer hardware.

The KV cache sits at the center of inference cost reduction at scale. Instead of recomputing attention states for repeated or overlapping prompt prefixes, a persistent cache allows those computations to be reused. [Everpure's KV caching overview](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames this as reducing prefill costs by up to 20x when cache is injected via RDMA from fast storage rather than recomputed. Their [Pure KVA product](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states to NFS and S3, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed, cutting time-to-first-token for RAG and enterprise workloads.

Local inference tools represent a distinct ecosystem. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline web UI with GGUF/llama.cpp backend support, an OpenAI-compatible API, and tool-calling. [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows how to redirect Claude Code's API calls to a local model served by LM Studio, with practical notes on model selection and failure modes. Ollama is the most widely used local inference tool, but [Zetaphor's critique](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior inference performance relative to running llama.cpp directly, and is pivoting toward a closed-source, VC-funded cloud product.

On the cloud side, inference cost has become a product and business variable. A 75x pricing gap between the cheapest and most expensive frontier models has opened up business models that were unworkable at 2025 rates, making provider-agnostic architecture essential [according to Superframeworks](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on). Reasoning effort is another cost dial: a benchmark of Claude Opus 4.7 at five effort levels found a non-monotonic curve where [medium effort outperforms high and max](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) on both quality and cost-efficiency across 29 real tasks.

Token reduction upstream of the model is a complementary strategy. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the LLM, claiming 60-95% token reduction without degrading answer quality. [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) synthesizes the full discipline: quantization, speculative decoding, caching, parallelism, and prefill/decode disaggregation are the main levers, and knowing when to invest in each is a distinct engineering skill separate from model development itself.
