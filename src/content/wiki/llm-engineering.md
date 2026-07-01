---
title: LLM engineering
summary: >-
  LLM engineering covers the full stack of practices for building, running, and
  maintaining systems built on large language models — from training and
  inference optimization to agent architecture, harness design, and production
  feedback loops.
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
compiled_at: '2026-07-01T04:49:01.115Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1740
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
  cost_usd: 0.059646
---
LLM engineering has grown from prompt experimentation into a discipline with distinct layers: model-level concerns (training, fine-tuning, quantization), serving infrastructure (inference optimization, routing, caching), and application architecture (agent harnesses, context management, observability). Each layer has its own failure modes, and the sources here collectively show that skipping depth at any one of them produces systems that look capable but degrade in production.

At the model layer, the gap between using a frontier model and shaping one is shrinking. Tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) make local fine-tuning accessible by delivering up to 30x faster training and 90% less memory usage than FlashAttention 2, while the [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) textbook walks through building a decoder-only LLM from tokenizer to inference engine. Fine-tuning need not require labeled data pipelines either: the BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data via multi-agent debate to produce domain-specific classifiers that outperform GPT-4.1 at a fraction of the cost, a pattern productized by [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

Inference cost and latency dominate production concerns once a model is chosen. KV caching, treated as a persistent shared asset rather than a per-request artifact, can reduce prefill costs by up to 20x according to [Everpure Engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), with granular-prompt caching segmenting prompts into reusable chunks so only changed tokens are reprocessed [Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). At the routing layer, both [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) show that matching each request to the right model for cost and quality is itself a learnable problem. [The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames this as a named sub-discipline — inference engineering — covering quantization, speculative decoding, parallelism, and disaggregation.

Agent harness design is where most application-layer complexity accumulates. Anthropic's [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator loop for multi-hour autonomous coding sessions. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) spec argues that unifying execution state and business state into a single context-window-derived thread simplifies debugging, serialization, and recovery. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) codifies five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the infrastructure that converts unreliable model output into dependable results.

Observability without feedback is insufficient. [LangChain's post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces only become useful when feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — are attached, turning observation into a learning loop. Agent memory is a related concern: [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures so agents accumulate world facts and mental models across sessions rather than resetting per conversation.

Retrieval architecture is contested. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) achieves 98.7% accuracy on FinanceBench using hierarchical tree indexes and LLM reasoning rather than vector similarity, directly challenging RAG orthodoxy. The LLM-wiki pattern — where an LLM maintains structured Markdown files updated on ingest — offers cross-document synthesis that [one Reddit builder](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found superior to RAG for curated research, though hallucinations baked in at ingest propagate structurally, making lint steps mandatory.

Several sources flag systemic risks that engineering discipline alone cannot solve. Sycophancy causes delusional belief spiraling even in ideal Bayesian reasoners [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in), LLMs recite textbook protocols rather than faithfully modeling actual system implementations [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), and AI code review pipelines can break correct code when fixer agents overreach beyond review scope [Imbue](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). The argument from [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that fully agentic coding accelerates skill atrophy and creates vendor dependency sits alongside [Jappie Software's](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) structural diagnosis that weak type systems, org processes, and missing agent-management training explain why AI tools rarely deliver promised gains. Cost and code quality also decouple: AI lowers production cost but not ownership cost, and LLMs generate polished technical debt faster than any individual engineer [Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).
