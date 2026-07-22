---
title: LLM engineering
summary: >-
  LLM engineering covers the full stack of decisions involved in building
  reliable systems with large language models, from inference optimization and
  fine-tuning to agent harness design, state management, and the tradeoffs that
  determine when more model is the wrong answer.
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
compiled_at: '2026-07-22T05:56:00.955Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11371
    output_tokens: 1732
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
  cost_usd: 0.060093
---
LLM engineering has matured from prompt experimentation into a discipline with recognizable subsystems: inference infrastructure, fine-tuning pipelines, agent harness design, retrieval architecture, and observability. Each layer carries its own tradeoffs, and the sources here collectively push back against the assumption that more capable frontier models automatically solve engineering problems.

At the infrastructure layer, serving costs dominate. KV caching is one of the most tractable levers: treating the KV cache as a persistent shared asset injected via RDMA rather than recomputed on every request can reduce prefill costs by up to 20x [cut-llm-inference-costs](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Segmenting prompts into reusable chunks via metadata pointers so only changed tokens are processed pushes this further [granular-prompt-caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). On the hardware side, tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) make GPU VRAM constraints legible before model selection, and [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster training and 90% less memory than FlashAttention 2 for local fine-tuning. Inference engineering as a named specialty now encompasses quantization, speculative decoding, parallelism, and disaggregation [inference-engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering), and model routing frameworks like Arch-Router can match each request to the best-fit model via a compact 1.5B routing model aligned to user-defined preferences [arch-router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Fine-tuning has its own emerging pattern. The BARRED framework uses multi-agent debate to generate synthetic training data, producing small domain-specific classifiers that outperform GPT-4.1 on custom policy tasks at a fraction of the cost [vibe-training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your). Plurai automates the full cycle from data generation through evaluation and guardrail deployment in minutes [plurai](/reading/2026-05/2026-05-04t235011-plurai). For developers who want to understand the underlying mechanics, a 12-chapter annotated textbook walks through building a decoder-only LLM from tokenizer through inference [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt).

Agent harness design has become its own engineering problem. Anthropic's internal work describes a GAN-inspired planner/generator/evaluator architecture for multi-hour autonomous coding sessions [harness-design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), while a project-based course identifies five harness subsystems — instructions, state, verification, scope, and session lifecycle — as what separates reliable agent output from unreliable model output [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Factor 5 of the 12-factor-agents pattern argues for unifying execution state and business state into a single context-window-derived thread, which simplifies serialization, debugging, and recovery [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Retrieval architecture splits meaningfully. PageIndex builds hierarchical tree indexes and uses LLM reasoning rather than vector similarity for retrieval, hitting 98.7% accuracy on FinanceBench [pageindex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). The LLM-compiled wiki pattern — having a model build and maintain structured Markdown files rather than using RAG — produces superior cross-document synthesis but bakes hallucinations in structurally, making lint steps non-negotiable [llm-wiki-1](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) [llm-wiki-2](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). Agent memory systems are moving beyond conversation history toward biomimetic structures covering world facts, experiences, and mental models [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight).

Observability requires feedback signals, not just traces. Attaching user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules to traces is what turns monitoring into a learning loop across model, harness, and context layers [agent-observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Several sources complicate the default assumption that more reasoning effort is better. A benchmark of Claude Opus 4.7 across five reasoning-effort levels on real tasks finds a non-monotonic curve where medium effort wins on pass rate and cost-efficiency while higher settings spend more without improving quality [opus-benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). LLMs benchmarked on TLA+ specification generation score near-perfect syntax but only around 46% conformance, revealing that models recite textbook protocols rather than modeling actual implementations [tla-benchmark](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Sycophancy produces delusional belief spiraling even in ideally rational users, and neither eliminating hallucinations nor warning users fully prevents the effect [sycophancy](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in). AI lowers the cost of producing code but not the cost of owning it — taste and judgment remain the scarce inputs [code-quality](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).
