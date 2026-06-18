---
title: LLM inference
summary: >-
  The mechanics and economics of running LLM forward passes at serving time,
  from VRAM constraints and quantization through KV cache optimization, local
  runtimes, and the pricing pressures reshaping deployment decisions.
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
aliases:
  - large-language-models
compiled_at: '2026-06-18T22:55:04.479Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4749
    output_tokens: 1012
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
  cost_usd: 0.029427
---
LLM inference is the process of running a trained model's forward pass to generate output tokens. It sits downstream of training and fine-tuning but upstream of any user-facing application, and most of the practical questions around it cluster into three areas: hardware feasibility, throughput optimization, and cost.

Hardware feasibility starts with VRAM. [CanItRun](https://canitrun.dev/) makes this concrete by calculating whether a given GPU can load a specific open-weight model, accounting for model weights, KV cache, and activation overhead, and showing which quantization levels fit within available memory. Quantization is the primary lever for fitting large models onto consumer hardware; [Unsloth](https://unsloth.ai/) reports up to 90% less memory usage than FlashAttention 2 through custom kernels. For local serving, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) supports GGUF and llama.cpp backends with an OpenAI-compatible API, and [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows LM Studio being used as a local inference server for redirecting API calls.

The KV cache is the central optimization target at serving time. Recomputing attention states for repeated or shared prompt prefixes wastes GPU cycles. Everpure Engineering argues across several posts that treating the KV cache as a persistent, shared data asset is the right architecture: [prefill costs can drop by up to 20x](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) when cached states are injected via RDMA rather than recomputed, [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed, and [KVA for S3 and NFS](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs) persists attention states across sessions without changing model architecture.

On the software side, [the Ollama critique by Zetaphor](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) illustrates how runtime choice matters: the argument is that Ollama wraps llama.cpp with inferior defaults and misleading model naming, and its VC-backed cloud pivot undermines the local-first case for using it at all.

Cost and reasoning effort interact at the API layer. [Benchmarks on Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) show a non-monotonic curve: medium reasoning effort outperformed higher settings on pass rate and cost-efficiency across 29 real tasks. [Research on no-CoT task horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) adds that frontier models can handle roughly three-minute human tasks at 50% reliability without chain-of-thought, which has direct implications for when expensive extended reasoning is actually worth the token cost. Meanwhile, [the API pricing collapse documented by Chaturvedi](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) — a 75x spread between cheapest and most expensive frontier models — means inference cost is now a first-class architectural variable rather than a fixed line item.
