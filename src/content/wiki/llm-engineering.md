---
title: LLM engineering
summary: >-
  The practical discipline of designing, training, deploying, and operating
  large language models — spanning inference optimization, fine-tuning, agent
  harness design, retrieval, and the judgment calls that keep LLM-powered
  systems reliable over time.
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
compiled_at: '2026-07-06T00:16:08.801Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1699
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
  cost_usd: 0.059031
---
LLM engineering is the set of practices required to turn language models from research artifacts into production systems. It spans at least four overlapping concerns: training and fine-tuning, inference efficiency, agent and harness design, and the epistemic hygiene needed to prevent quiet failure.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) have materially lowered the barrier, offering custom kernels that achieve up to 30x faster training and 90% less memory than FlashAttention 2 across 500+ models. The complementary approach is synthetic data generation: the BARRED framework described by [Nir Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent debate to produce training data that fine-tunes small domain-specific classifiers to outperform GPT-4.1 on custom policy tasks. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) operationalizes the same idea into a deployment pipeline with sub-100ms latency and 8x lower cost than GPT-as-judge. For engineers who want to understand the machinery underneath, [Raiyan Yahya's textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch, covering tokenizer, RoPE, attention, and inference loop.

Inference efficiency is its own subdiscipline. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes VRAM constraints legible by estimating compatible quantization levels and tokens-per-second for specific GPU and model pairings. KV caching is increasingly treated as a persistent shared asset rather than a per-request computation: [Everpure's posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argue that injecting cached KV data from fast storage via RDMA can cut prefill costs by up to 20x, and their [granular-prompt caching system](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. At the infrastructure layer, [Gergely Orosz's overview of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers quantization, speculative decoding, and disaggregation as the main levers. LLM routing — automatically matching requests to models by cost, latency, or quality — is an adjacent concern, addressed by [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) using a 30B MoE orchestrator and by [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences), a compact 1.5B preference-aligned routing model.

Agent and harness design is where much of the recent engineering energy is concentrated. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture for multi-hour autonomous coding sessions. The [12-factor agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, debugging, and recovery. The [walkinglabs course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the structure that makes model output dependable. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that observability alone is insufficient: feedback signals attached to traces are what close the learning loop. [Aiyan's post on orchestration strategy](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) adds a build-vs-extend question: skip custom orchestration and ship MCP tool servers that extend frontier agents instead.

Several sources converge on an uncomfortable point about quality. A benchmark of Claude Opus 4.7 found a [non-monotonic reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort outperformed higher settings on pass rate and cost-efficiency, meaning more reasoning budget does not mechanically produce better results. AI code review introduces its own failure mode: [Imbue's experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that fixer agents in a review pipeline regularly break correct code by overreaching beyond review scope. And LLMs generating formal specs [score near-perfect on TLA+ syntax](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) while achieving only ~46% conformance — reciting textbook protocols rather than modeling actual implementations.

The dependency risks are real. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic coding workflows erode developer skill and create vendor lock-in, and [Christoph Spörk](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) frames widespread LLM adoption as a slow institutional knowledge drain that compounds when token prices shift. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that model behavior degrades user epistemics even in ideally rational agents. These concerns do not argue against using LLMs; they argue for engineering them carefully, with verification steps, feedback loops, and preserved human judgment at consequential decision points.
