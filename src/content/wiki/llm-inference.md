---
title: LLM inference
summary: >-
  LLM inference spans GPU memory constraints, quantization strategies, KV cache
  optimization, and cost tradeoffs that determine whether a model runs locally,
  on enterprise hardware, or via cloud API.
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
compiled_at: '2026-06-20T12:40:35.866Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4579
    output_tokens: 1198
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
  cost_usd: 0.031707
---
Inference is the phase where a trained model generates output from a prompt, and the practical concerns that cluster around it are memory, speed, and cost. These three pressures shape almost every decision in the space, from which hardware to buy to which API provider to call.

On the hardware side, VRAM is the binding constraint for local inference. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) models this directly, calculating whether a given GPU can load a specific open-weight model by accounting for model weights, KV cache, and activation overhead, then surfacing which quantization levels are feasible and what tokens-per-second to expect. Quantization is the primary lever: reducing weight precision from FP16 to INT4 or lower shrinks VRAM requirements substantially, at some cost to output quality. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) goes further with custom kernels that deliver up to 30x faster training and 90% less memory usage compared to FlashAttention 2, and those efficiency gains carry into inference.

For practitioners who want to run models locally without writing infrastructure code, the tooling landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop interface with an OpenAI-compatible API, GGUF/llama.cpp backend support, and multimodal input. Ollama covers similar ground but [Zetaphor](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior inference performance versus running llama.cpp directly, and is drifting toward a VC-backed cloud model that undercuts its local-first premise. [Zack Reed](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows a practical path through LM Studio, proxying Claude Code's API calls to a local model, with concrete notes on whitespace injection bugs that appear in real use.

At the architecture level, the KV cache is the central optimization target. Each token generated requires attention over all previous tokens; caching those key-value pairs avoids recomputing them. Everpure Engineering takes this further, arguing that KV cache states should be treated as persistent shared data assets. Their Pure KVA system stores attention states on NFS and S3, retrieving them via RDMA to achieve up to 20x faster inference compared to recomputation over standard Ethernet [20x Faster Inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). A companion piece describes granular-prompt caching, where prompts are segmented into reusable chunks via metadata pointers so only changed tokens are processed [Granular-Prompt Caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure), and a third frames KV cache persistence as a path to 20x prefill cost reduction for enterprise RAG workloads [Cut LLM Inference Costs](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching).

On the API side, token pricing has compressed sharply. [Ayush Chaturvedi](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between the cheapest and most expensive frontier models, arguing this opens product categories that were previously uneconomical. Reasoning effort is a related cost axis: [stet.sh](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) benchmarks Claude Opus 4.7 across five effort levels and finds a non-monotonic curve where medium effort outperforms higher settings on both quality and cost-efficiency. [A LessWrong study](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) adds that omitting chain-of-thought entirely changes capability profiles, with GPT-5.5 handling roughly three-minute human tasks at 50% reliability without CoT, doubling in capability roughly yearly since 2019.
