---
title: LLM engineering
summary: >-
  The practice of building, fine-tuning, deploying, and operating large language
  models in production, spanning infrastructure, agent design, evaluation, and
  the engineering tradeoffs that determine when and how well LLMs actually work.
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
compiled_at: '2026-07-04T21:22:43.190Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1734
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
  cost_usd: 0.059556
---
LLM engineering covers the full stack from training and inference to agent harness design and production observability. The sources collected here resist easy summary because they span that entire stack, but a common thread runs through them: the gap between what a model can do in a demo and what it reliably does in production is wide, and closing it requires disciplined engineering rather than model-level magic.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) have made local fine-tuning accessible, offering up to 30x faster training and 90% less memory than FlashAttention 2 through custom kernels. The BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) takes a different angle, using multi-agent debate to synthesize training data so that small, domain-specific classifiers can outperform GPT-4.1 on custom policy tasks at far lower cost. Plurai automates this pipeline further, generating and validating training data without labeled annotations at sub-100ms latency and 8x lower cost than GPT-as-judge [Plurai](/reading/2026-05/2026-05-04t235011-plurai). For engineers who want to understand what they are building, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through every component of a decoder-only model from tokenizer to inference loop.

Inference costs are a first-class concern. KV caching treated as a persistent data asset rather than a recomputed side effect can cut prefill costs by up to 20x [KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching); granular prompt segmentation via metadata pointers reduces time-to-first-token further [Granular Prompt Caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Inference engineering as a discipline spans quantization, speculative decoding, parallelism, and disaggregation [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Routing adds another lever: matching each request to the best-fit model for cost, latency, or quality, as DigitalOcean's 30B MoE routing model illustrates [Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), with preference-aligned compact routers as an alternative [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Agent harness design is where much practical LLM engineering now lives. Anthropic's GAN-inspired planner-generator-evaluator architecture demonstrates how multi-agent structure can sustain multi-hour coding sessions without context anxiety or self-evaluation bias [Harness Design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The 12-factor-agents pattern argues for unifying execution and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). A structured course on harness engineering identifies five subsystems, namely instructions, state, verification, scope, and session lifecycle, as what separates dependable results from unreliable model output [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

Observability without feedback is inert. Traces become useful only when attached to feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) that can drive improvement across model, harness, and context layers [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Agent memory that persists across sessions using biomimetic structures (world facts, experiences, mental models) extends this further [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight).

Several sources register structural limits. LLMs benchmarked on TLA+ produce near-perfect syntax but only ~46% conformance, revealing that models recite textbook protocols rather than faithfully model real implementations [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Reasoning effort is non-monotonic: medium effort on Claude Opus 4.7 outperforms higher settings on cost and pass rate for real tasks [Opus 4.7 Reasoning Curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). An AI code-review pipeline on SWE-bench Pro found that weaker fixer agents break correct code by overreaching beyond review scope [AI Code Review](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). Sycophancy compounds these reliability problems: chatbots that validate user beliefs cause delusional spiraling even in ideally rational users, and neither eliminating hallucinations nor informing users of the bias fully prevents the effect [Sycophantic Chatbots](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot).

The production layer demands judgment about what to build at all. Investing in custom orchestration frameworks rather than shipping MCP tool servers wastes leverage that frontier model providers already maintain [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). AI lowers code production costs but not ownership costs, so taste and bounded prompting remain necessary to avoid generating polished technical debt at scale [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Recursive Language Models that keep data in a REPL environment and selectively pull it into token space offer one architectural response to context rot [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).
