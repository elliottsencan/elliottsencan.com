---
title: LLM engineering
summary: >-
  The practical discipline of building, deploying, and operating systems that
  use large language models — spanning fine-tuning, inference optimization,
  agent harness design, retrieval, and the tradeoffs that govern when and how to
  apply each layer.
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
compiled_at: '2026-08-11T05:19:41.212Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1808
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
  cost_usd: 0.062721
---
LLM engineering covers the full stack between a raw language model and a production system: how models are trained or adapted, how inference is served efficiently, how agents are structured and monitored, and how the resulting systems hold up under real conditions.

On the model side, adaptation ranges from building from scratch to lightweight fine-tuning. [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks Python developers through constructing a decoder-only LLM from tokenizer through inference, while [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) addresses the practical cost of fine-tuning existing models, claiming up to 30x faster training and 90% less memory than FlashAttention 2 via custom kernels. [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) and [Plurai](/reading/2026-05/2026-05-04t235011-plurai) push further by generating synthetic training data through multi-agent debate so small domain-specific classifiers outperform GPT-4.1 on policy tasks at a fraction of the cost.

Inference efficiency is a separate concern. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset rather than a per-request computation can cut prefill costs by up to 20x; [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. [Inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) as a specialty encompasses quantization, speculative decoding, parallelism, and disaggregation. [Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) runs this in-house with vLLM and batched constrained decoding; [DigitalOcean](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) address model selection itself, routing requests to the best-fit model for cost, latency, or quality without retraining when new models appear. Hardware compatibility is a prerequisite: [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates whether a given GPU's VRAM can run a specific open-weight model at a given quantization level before any deployment decisions are made.

Agent harness design has crystallized into its own sub-discipline. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifies five harness subsystems: instructions, state, verification, scope, and session lifecycle. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread so the entire history is serializable, forkable, and debuggable in one place. Anthropic's [harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions. [Agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) requires attaching feedback signals to traces; traces alone do not improve agentic systems.

Retrieval and knowledge representation sit between raw model capability and harness design. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% accuracy on FinanceBench. [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model maintain structured Markdown files for cross-document synthesis without RAG; a [practical build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) confirms that synthesis quality is genuinely superior to RAG for curated research but that hallucinations baked in at ingest propagate structurally, making lint non-negotiable. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) keep data in a REPL environment and let the LLM pull it selectively into token space to combat context rot.

Several tensions run through the field. [The orchestrator isn't your moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should ship MCP tool servers rather than custom orchestration frameworks, letting frontier providers maintain the loop. [Agentic coding is a trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) takes the opposite stance on autonomy, arguing full agentic workflows accelerate skill atrophy and create vendor dependency. [When code is cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) reframes the issue: AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer. [Sycophantic chatbots](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) demonstrate that even ideally rational users spiral into delusional belief when models consistently validate them, which makes evaluation design a safety concern, not just a quality concern. [AI code review pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) can make correct code worse when weaker fixer agents overreach beyond review scope. Meanwhile, [benchmarks of LLMs on TLA+](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) show near-perfect syntax but only ~46% conformance, confirming that fluency and correctness remain distinct properties.
