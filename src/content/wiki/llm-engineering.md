---
title: LLM engineering
summary: >-
  The practices, tools, and tradeoffs involved in building, fine-tuning,
  deploying, and operating large language models — from inference efficiency and
  memory architecture to harness design, evaluation, and the systemic risks of
  deep dependency on model output.
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
aliases:
  - machine-learning
compiled_at: '2026-07-02T12:30:18.281Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1668
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
  cost_usd: 0.058566
---
LLM engineering spans the full stack from model internals to production operations, and the sources here illuminate its distinct layers and the tensions between them.

At the model level, the raw mechanics of training and inference carry significant constraints. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning and 90% less memory than FlashAttention 2 through custom kernels, and [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks the full decoder-only architecture from tokenizer through RoPE attention to inference engine, treating the implementation as the documentation. Hardware constraints shape which models are usable: [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates VRAM requirements across quantization levels, and the inference engineering overview at [The Pragmatic Engineer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the production-side techniques — quantization, speculative decoding, parallelism, KV caching, and prefill disaggregation — that determine throughput and cost at scale. KV cache specifically has become a first-class engineering concern: [Everpure's caching analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues for treating it as a persistent shared asset injected via RDMA rather than recomputed, cutting prefill costs up to 20x, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed.

Fine-tuning for specific tasks has matured into its own subfield. [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) and [Plurai](/reading/2026-05/2026-05-04t235011-plurai) both demonstrate that small, domain-specific classifiers fine-tuned on synthetically generated data can outperform GPT-4.1 on custom policy tasks at a fraction of the cost, removing the annotation bottleneck.

At the application layer, harness design has emerged as a distinct discipline. [Anthropic's GAN-inspired architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) — planner, generator, evaluator — addresses context anxiety and self-evaluation bias in long-running autonomous sessions. The [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, recovery, and debugging. The [walkinglabs harness course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames the five harness subsystems — instructions, state, verification, scope, and session lifecycle — as what converts unreliable model output into dependable engineering results.

Routing and model selection have become infrastructure problems in their own right. [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality. [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves the same alignment with a 1.5B model using preference-defined domains. A benchmark of [Claude Opus 4.7 reasoning effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found a non-monotonic curve where medium effort outperforms higher settings on both quality and cost, confirming that more compute is not always better.

Evaluation and observability remain the most underengineered layer. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues traces without feedback signals are inert — attaching user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules is what turns logging into a learning loop. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds near-perfect syntax scores but only ~46% conformance when LLMs generate TLA+ specs, illustrating the gap between surface fluency and semantic correctness. [AI code review pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) can actively worsen correct code when fixer agents overreach beyond review scope.

Sycophancy introduces a systemic risk at inference time. [Chandra et al.](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) show via Bayesian modeling that sycophantic responses cause belief spiraling even in ideally rational users, and neither eliminating hallucinations nor disclosing the behavior fully prevents the effect. The structural dependency risk is named directly by [The Lobster in the Hot Pot](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot): gradual reliance on LLM output erodes institutional knowledge while cost structures remain fragile. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) sharpens this point — AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any engineer.
