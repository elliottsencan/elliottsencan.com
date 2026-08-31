---
title: LLM inference
summary: >-
  LLM inference spans the full pipeline from running a forward pass through a
  transformer to the infrastructure decisions that determine cost, latency, and
  hardware fit at scale.
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
compiled_at: '2026-08-31T22:37:07.247Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1238
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
  cost_usd: 0.036012
---
At its core, LLM inference is the process of generating tokens from a trained model. [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/) traces this mechanically: input tokens are embedded, positional encodings are applied, attention is computed across layers using stored key-value pairs, and output logits are sampled into the next token. The KV cache is central to that process, avoiding redundant recomputation of attention states for previously seen tokens.

The gap between that conceptual picture and production practice is where most of the engineering lives. [What is Inference Engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) frames the discipline as a set of deliberate trade-offs: quantization reduces model weight precision to shrink memory and increase throughput; speculative decoding uses a small draft model to propose tokens the large model then verifies in parallel; disaggregation separates prefill and decode phases onto different hardware. These techniques compound, and choosing among them depends on whether latency, throughput, or cost is the binding constraint.

Memory is the first bottleneck most practitioners hit. [CanItRun](https://canitrun.dev/) makes this concrete by calculating whether a GPU's VRAM can fit a given model, accounting for weights, KV cache, and activation overhead at different quantization levels. Unsloth [addresses the same constraint differently](https://unsloth.ai/), using custom CUDA kernels to cut memory usage by up to 90% versus FlashAttention 2 and accelerate training and inference for local fine-tuned models.

At enterprise scale the KV cache becomes a shared infrastructure asset rather than a per-request buffer. Three pieces from Everpure Engineering argue that persisting and reusing attention states across sessions can cut prefill costs by up to 20x. [KV caching fundamentals](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) treats the cache as a data layer injected via RDMA; [granular-prompt caching](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) segments prompts into reusable chunks so only changed tokens are reprocessed; and [Pure KVA on S3 and NFS](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) delivers those gains over standard Ethernet without altering the model stack. Netflix took a different path to production scale, choosing [vLLM over TensorRT-LLM](https://netflixtechblog.com/in-house-llm-serving-at-netflix-a5a8e799ea2c) for its OpenAI-compatible surface, model packaging flexibility, and batched constrained decoding support.

Token volume is a second cost lever. The headroom library claims [60-95% token reduction](https://github.com/chopratejas/headroom) by compressing tool outputs, logs, and RAG chunks before they reach the model. That claim sits in tension with [skepticism about RTK](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/), which argues that compression tools often report vanity metrics, strip only surface-level content like Bash output, and lack task-accuracy benchmarks to justify the reliability risk in agent pipelines.

Routing across models is emerging as its own inference layer. DigitalOcean's [Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B mixture-of-experts orchestration model to match each request to the best-fit backend for cost, latency, or quality. The [Arch-Router paper](https://arxiv.org/abs/2506.16655) proposes a compact 1.5B model that maps queries to user-defined domains without retraining when new models are added. Both approaches reflect a broader pricing environment where a [75x spread between cheapest and most expensive frontier APIs](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) makes intelligent routing a meaningful margin decision.

For local inference, the tooling landscape includes [oobabooga/textgen](https://github.com/oobabooga/textgen), which supports GGUF/llama.cpp and multiple backends with an OpenAI-compatible API, and LM Studio, which [Zack Reed used](https://zackreed.me/posts/using-claude-code-with-local-model/) to redirect Claude Code's API calls to a locally served model. Ollama is the most widely known local option, though [a detailed critique](https://sleepingrobots.com/dreams/stop-using-ollama/) argues it obscures its llama.cpp dependency, ships worse inference performance than alternatives, and is pivoting toward a closed-source cloud product.
