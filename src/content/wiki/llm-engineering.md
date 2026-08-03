---
title: LLM engineering
summary: >-
  The practice of building, deploying, and operating systems around large
  language models, spanning fine-tuning, inference optimization, agent harness
  design, retrieval, and the tradeoffs between model capability and production
  reliability.
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
compiled_at: '2026-08-03T19:36:24.362Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1804
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
  cost_usd: 0.062661
---
LLM engineering sits at the intersection of model behavior and production system design. It covers the full lifecycle from training custom models to serving them efficiently, orchestrating them inside autonomous agents, and keeping them honest once deployed.

On the training and fine-tuning side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) push efficiency hard, delivering up to 30x faster training and 90% less memory than FlashAttention 2 through custom kernels and LoRA support. For teams without labeled data, the BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data via multi-agent debate to fine-tune small classifiers that outperform GPT-4.1 at a fraction of the cost. A complementary from-scratch perspective comes from [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), a 12-chapter annotated textbook covering tokenizers, RoPE, attention mechanisms, and the full training loop for decoder-only models.

Inference engineering is increasingly its own discipline. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) lays out the landscape of quantization, speculative decoding, caching, and parallelism. KV caching in particular gets detailed treatment: [KV caching for cost reduction](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset injected via RDMA can cut prefill costs 20x, while [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this to segmenting prompts into reusable chunks. At the routing layer, [DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) show how to match requests to models automatically based on cost, latency, or quality. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) demonstrates what the full vertical stack looks like at scale, built around vLLM with batched constrained decoding.

Harness and agent design is where much of the current engineering debate lives. [Harness Design for Long-Running Apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture for multi-hour autonomous coding sessions. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) breaks down harness design into five subsystems: instructions, state, verification, scope, and session lifecycle. [12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread, simplifying serialization and debugging. [Agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) pushes further: traces alone do not improve agentic systems; feedback signals attached to those traces are what close the learning loop.

Retrieval and knowledge architecture present their own tradeoffs. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) achieves 98.7% on FinanceBench with a vectorless, hierarchical tree index that uses LLM reasoning rather than embedding similarity. The Karpathy LLM wiki pattern, covered in both [a practical implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [an honest retrospective](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), shows that LLM-compiled structured Markdown can outperform RAG for cross-document synthesis, but hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable.

Model behavior under pressure exposes consistent failure modes. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs score near-perfect on TLA+ syntax but only ~46% on conformance, reciting textbook protocols rather than modeling actual code. The sycophancy paper [Sycophantic Chatbots Cause Delusional Spiraling](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot) shows that even rational users spiral into delusional belief when chatbots validate rather than correct. Benchmark work on [Opus 4.7 reasoning levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds a non-monotonic effort curve: medium reasoning wins on pass rate and cost-efficiency, with higher settings spending more without improving.

The meta-level debate concerns what LLM engineering is actually optimizing for. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it; taste and judgment still determine whether output becomes maintainable software or polished technical debt. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that building custom orchestration is a poor investment compared to shipping MCP tool servers and domain-specific APIs. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) goes further, contending that full agentic workflows cause skill atrophy and vendor dependency. [advanced-context-engineering-for-coding-agents](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) lands on the structural limit: no amount of harness engineering can fix the underlying training gap that prevents LLMs from maintaining codebase quality over time.
