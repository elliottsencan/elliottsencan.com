---
title: LLM inference
summary: >-
  LLM inference spans local GPU runtimes, hosted API endpoints, and the caching
  and quantization techniques that determine speed and cost — a landscape where
  tooling choices, pricing dynamics, and hardware constraints all intersect.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-20t073157-20x-faster-inference-with-the-first-kv-cache-for-s3-and-nfs
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - 2026-06/2026-06-20t145835-chopratejasheadroom
aliases:
  - inference-optimization
compiled_at: '2026-06-18T21:49:45.470Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4699
    output_tokens: 1116
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
  cost_usd: 0.030837
last_source_added: '2026-06-20T21:58:35.318Z'
---
LLM inference is the process of running a trained model to generate token output, and the decisions around it, which runtime, which hardware, which caching strategy, which pricing tier, shape the economics and performance of any AI-integrated product.

On the hardware side, VRAM is the primary constraint for local inference. [CanItRun](https://canitrun.dev/) makes this concrete: pick a GPU and it shows which open-weight models fit, at which quantization level, and at what tokens-per-second throughput. [Quantization](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) tradeoffs are central here; smaller bit-widths shrink VRAM requirements but affect output quality.

The local inference tooling space is contested. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop runtime with vision, tool-calling, LoRA support, and an OpenAI-compatible API, no telemetry. Ollama is a popular alternative, but [Zetaphor argues](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) it obscures its llama.cpp dependency, misleads on model naming, ships a closed-source GUI, and has drifted toward cloud monetization. LM Studio sits in the middle: [Zack Reed](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) documents redirecting Claude Code's API calls to a locally-running LM Studio instance, which works but surfaces real quirks around context handling and instruction-following in smaller models.

At the hosted API level, cost has collapsed. [Ayush Chaturvedi](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) puts a 75x gap between the cheapest and priciest frontier models, making previously marginal products viable, though model lock-in and data sovereignty remain real risks. Token cost is not uniform across a single model either: [benchmarking Claude Opus 4.7 across five reasoning-effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) on 29 real tasks shows a non-monotonic curve where medium effort outperforms high, xhigh, and max on pass rate and code-review quality. Spending more compute does not reliably buy better results.

KV caching is the most direct lever for cutting inference latency and cost at scale. By hashing prompt prefixes and reusing precomputed attention states across sessions, redundant prefill computation is eliminated. [Everpure's three posts on the subject](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) describe persistent storage-backed caches on NFS and S3 that deliver up to 20x faster time-to-first-token, and their granular-prompt caching approach [segments prompts into checkpoints](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only token deltas require reprocessing, which matters especially for RAG workloads with long shared prefixes.

Inference latency also appears as an architectural concern inside agent systems. [Anthropic's Managed Agents work](/reading/2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands) reports cutting p50 time-to-first-token by ~60% and p95 by over 90% by decoupling the agent harness, session log, and sandbox into independent interfaces. Separately, [Plurai](/reading/2026-05/2026-05-04t235011-plurai) demonstrates that deploying purpose-built small models for guardrails and evals achieves sub-100ms latency at 8x lower cost than routing those tasks through a frontier LLM, pointing toward inference-tier specialization as a cost strategy.
