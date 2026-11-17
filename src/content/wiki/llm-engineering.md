---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building with large language models —
  from training and inference optimization to agent harness design, context
  management, and the tradeoffs that determine whether deployed systems actually
  work in production.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - >-
    2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your
  - 2026-04/2026-04-29t171532-vision-language-models-better-faster-stronger
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - >-
    2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in
  - 2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - 2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-11-17T01:44:39.946Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 2017
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
  cost_usd: 0.066306
---
LLM engineering covers everything from understanding how transformer architectures process tokens to deploying, optimizing, and maintaining systems that use them. The discipline has matured quickly enough that it now has distinct sub-concerns: model training and fine-tuning, inference efficiency, agent harness design, context engineering, retrieval and memory, and the operational tradeoffs that govern real deployments.

At the foundation, [how transformers actually work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work) — tokenization, embeddings, positional encoding, multi-head attention, and the KV cache — is prerequisite knowledge. Building a decoder-only model from scratch, as [Raiyan Yahya's 12-chapter textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through, makes those mechanisms concrete. Fine-tuning on top of pretrained weights is the more common path: [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster training and 90% less memory than FlashAttention 2 via custom kernels, supporting LoRA, FP8, and 500+ models. For teams that want domain-specific classifiers without labeled data, [Plurai's BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data through multi-agent debate to fine-tune small models that outperform GPT-4.1 on custom policy tasks at a fraction of the cost.

Inference efficiency is its own engineering domain. KV caching is the primary lever: [treating the KV cache as a persistent shared asset injected via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) rather than recomputing it can cut prefill costs by 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further by segmenting prompts into reusable chunks so only changed tokens are processed. At the serving layer, [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) encompasses quantization, speculative decoding, parallelism, and disaggregation. [Netflix runs vLLM over TensorRT-LLM](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) with an OpenAI-compatible API surface and batched constrained decoding. Model routing adds another optimization layer: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE routing model to match requests to models by cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves state-of-the-art preference alignment with a compact 1.5B routing model.

For those without dedicated infrastructure, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates VRAM requirements against specific models and quantization levels, and [running Claude Code against a local LM Studio endpoint](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) is now practical with minor configuration.

Agent harness design has emerged as a first-class concern. [Anthropic's GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) addresses context anxiety and self-evaluation bias during multi-hour autonomous sessions. The [12-factor agents framework](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) advocates unifying execution and business state into a single context-window-derived thread for simpler serialization, debugging, and recovery. [Walkinglabs' harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five subsystems — instructions, state, verification, scope, and session lifecycle — as the structural basis for reliable agent output. [Fable5's operating instructions](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) address epistemic hygiene and rollback discipline within long coding sessions.

Retrieval and memory sit alongside harness design. [LLM-compiled wiki patterns](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) have an advantage over RAG for curated, cross-document synthesis, though [hallucinations baked in at ingest propagate structurally](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), making lint steps non-negotiable. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, achieving 98.7% accuracy on FinanceBench. [Biomimetic agent memory](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) structured as world facts, experiences, and mental models benchmarks well on LongMemEval. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) keep data in a REPL environment and pull selectively into token space to avoid context rot.

Observability closes the loop. [Traces alone do not improve agentic systems](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) — attaching feedback signals across model, harness, and context layers is what turns monitoring into learning. The benchmarking side is sobering: [LLMs generate near-perfect TLA+ syntax but only ~46% conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), and [AI code review pipelines can break correct code](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) when fixer agents overreach. [Reasoning effort is non-monotonic](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort on Claude Opus 4.7 beats high and max on both quality and cost across real tasks.

The organizational stakes are significant. [AI lowers the cost of producing code but not the cost of owning it](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) — LLMs can generate polished technical debt faster than any individual engineer. [Structural barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) including weak type systems and processes built for human-speed development explain why the productivity gains rarely materialize without deliberate investment in agent-management skills.
