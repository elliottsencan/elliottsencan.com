---
title: LLM inference
summary: >-
  LLM inference covers the full stack of decisions involved in running a trained
  language model: hardware fit, serving architecture, caching strategy,
  quantization, routing, and cost — each with meaningful trade-offs depending on
  deployment context.
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
compiled_at: '2026-07-01T02:01:47.283Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5481
    output_tokens: 1419
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
  cost_usd: 0.037728
---
LLM inference is the process of generating tokens from a trained model, and it sits at the intersection of hardware constraints, software architecture, and economics. The choices made at each layer compound quickly.

On the hardware side, the first question is whether a GPU can run a given model at all. [CanItRun](https://canitrun.dev/) addresses this directly, calculating VRAM headroom based on model weights, KV cache, and activation overhead, then surfacing compatible quantization levels and estimated tokens-per-second. Quantization is a core inference technique, trading precision for memory and speed, and [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) pushes this further with custom kernels that claim up to 30x faster training and 90% less memory than FlashAttention 2, with FP8 and LoRA support.

For local inference specifically, the tooling landscape is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop runtime with GGUF/llama.cpp backends, an OpenAI-compatible API, and MCP server support. Ollama occupies similar territory, but [Zetaphor argues](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) it obscured its llama.cpp dependency, ships inferior inference performance, introduced misleading model naming, and has pivoted toward a VC-driven cloud model that undermines its local-first premise. [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) of redirecting Claude Code to a locally served LM Studio model illustrates both the appeal and the friction of local inference in practice.

The KV cache is the central optimization target in production inference. Three pieces from Everpure Engineering lay out a coherent position: recomputing attention states on every request is wasteful, and treating the KV cache as a persistent, shared data asset — injected via RDMA from fast storage — can cut prefill costs by up to 20x and improve throughput substantially [20x Faster Inference](/reading/2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs). Their Pure KVA system extends this with granular-prompt caching, segmenting prompts into reusable chunks via metadata pointers so only changed tokens are reprocessed [Granular-Prompt Caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). The general case for this approach is argued in [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching).

Token compression is a related but distinct lever. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back on similar claims from RTK, arguing the savings are vanity metrics because the tool only strips Bash output, risks silent data loss in agentic pipelines, and lacks task-accuracy benchmarks. The disagreement points at a real gap: token-count reduction and answer quality are not the same measurement.

At the serving layer, [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) names speculative decoding, caching, parallelism, and prefill/decode disaggregation as the primary techniques, and frames inference engineering as a distinct specialty. Routing across models is an emerging sub-problem: DigitalOcean's Inference Router uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality [DigitalOcean](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper proposes a compact 1.5B model that aligns routing with user-defined preferences without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Cost is now a first-order variable. A 75x pricing gap between models [documented here](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) means model selection and provider routing have direct margin implications. And effort levels matter within a single model: a benchmark of Claude Opus 4.7 across five reasoning-effort settings found that medium effort outperformed higher settings on pass rate and cost-efficiency [stet.sh](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning), indicating that more compute per token does not monotonically improve output quality.
