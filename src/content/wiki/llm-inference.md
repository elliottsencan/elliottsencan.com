---
title: LLM inference
summary: >-
  LLM inference covers the full stack of serving a trained language model — from
  the math of token generation to the engineering decisions around cost, speed,
  quantization, caching, and routing that determine whether a deployment is
  viable at scale.
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
compiled_at: '2026-09-28T23:07:12.226Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 5814
    output_tokens: 1405
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
  cost_usd: 0.038517
---
At the mechanical level, inference is the process of running a forward pass through a transformer to produce the next token, repeated until the output is complete. [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/) walks through the components involved: tokenization, embeddings, positional encoding, attention, and the KV cache that stores intermediate attention states so they don't have to be recomputed on every step. [raiyanyahya/how-to-train-your-gpt](https://github.com/raiyanyahya/how-to-train-your-gpt) approaches the same ground from an implementation angle, building the inference engine alongside the training loop so the distinction between the two phases stays concrete.

The KV cache is the central lever for inference cost. [How to Cut LLM Inference Costs with KV Caching](https://blog.everpuredata.com/purely-technical/cut-llm-inference-costs-with-kv-caching/) argues that treating it as a persistent, shared data asset injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x. Everpure's follow-on pieces extend this: [granular-prompt caching](https://blog.everpuredata.com/purely-technical/llm-efficiency-granular-prompt-caching-pure-kva/) segments prompts into reusable chunks so only changed tokens are processed, and [Pure KVA on S3 and NFS](https://blog.everpuredata.com/purely-technical/20x-faster-inference-first-kv-cache-for-s3-and-nfs/) persists attention states across sessions on standard storage without touching model architecture.

Beyond caching, [What is Inference Engineering](https://newsletter.pragmaticengineer.com/p/what-is-inference-engineering) catalogs the broader toolkit: quantization, speculative decoding, batching, parallelism, and disaggregation. Netflix's production account [In-House LLM Serving at Netflix](https://netflixtechblog.com/in-house-llm-serving-at-netflix-a5a8e799ea2c) adds operational texture, choosing vLLM over TensorRT-LLM and building an OpenAI-compatible API surface with batched constrained decoding at scale.

Local inference has its own set of tradeoffs. [CanItRun](https://canitrun.dev/) reduces the entry question to VRAM constraints, quantization levels, and estimated tokens-per-second. [oobabooga/textgen](https://github.com/oobabooga/textgen) and [Unsloth](https://unsloth.ai/) both target local deployments, with Unsloth claiming up to 30x faster throughput and 90% less memory than FlashAttention 2 via custom kernels. [Friends Don't Let Friends Use Ollama](https://sleepingrobots.com/dreams/stop-using-ollama/) argues that Ollama ships inferior inference performance relative to its llama.cpp dependency and is drifting toward a cloud model, undermining its local-first premise. [Running Claude Code with a Local Model via LM Studio](https://zackreed.me/posts/using-claude-code-with-local-model/) illustrates the practical friction: redirecting API calls to a locally served model surfaces edge cases like whitespace injection in long URLs.

At the API layer, routing has become its own discipline. [DigitalOcean's Inference Router](https://www.digitalocean.com/blog/inference-router-architecture) uses a 30B MoE model to match each request to the best-fit backend by cost, latency, or quality. [Arch-Router](https://arxiv.org/abs/2506.16655) proposes a compact 1.5B alternative that aligns routing with user-defined preferences without retraining when new models are added. Pricing pressure makes routing decisions increasingly consequential: [The AI Model Pricing War](https://superframeworks.com/articles/ai-model-pricing-war-indie-hackers) documents a 75x spread between cheapest and most expensive frontier models, making provider-agnostic architectures a practical necessity.

Token compression is a related cost lever with contested reliability. [chopratejas/headroom](https://github.com/chopratejas/headroom) claims 60-95% token reduction by compressing tool outputs before they reach the model, but [The Token Compression Illusion](https://mroczek.dev/articles/the-token-compression-illusion-why-im-skeptical-of-rtk/) pushes back, arguing such numbers are vanity metrics that strip only Bash output and risk silent data loss in agent pipelines without task-accuracy benchmarks to justify the trade-off.

Reasoning budget is a newer inference variable. [Opus 4.7 reasoning curve benchmarks](https://www.stet.sh/blog/opus-47-graphql-reasoning-curve) find that more compute effort does not monotonically improve output quality; medium effort outperformed high, xhigh, and max on pass rate and cost-efficiency across 29 real tasks. [Estimating No-CoT Task Horizons](https://www.lesswrong.com/posts/SieLowPgNgRSPGhFw/estimating-no-cot-task-completion-time-horizons-of-frontier) adds that even without chain-of-thought, frontier models are completing roughly three-minute human tasks at 50% reliability, a capability that has doubled annually since 2019.
