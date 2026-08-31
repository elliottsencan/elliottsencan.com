---
title: LLM engineering
summary: >-
  The practice of building, fine-tuning, deploying, and operating large language
  models in production, spanning inference optimization, agent harness design,
  memory systems, and the structural tradeoffs that determine whether
  LLM-powered systems remain reliable over time.
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
aliases:
  - machine-learning
compiled_at: '2026-08-31T22:36:38.232Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1952
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
  cost_usd: 0.065331
---
LLM engineering covers the full stack from model internals to production systems: how transformers are trained and quantized, how inference is made fast enough to be economical, how agents are structured to remain reliable, and how the surrounding harness determines whether model capability translates into durable value.

At the foundation, understanding how LLMs actually work matters for engineering decisions. A grounding in tokenization, attention, positional encoding, and the KV cache how-llms-actually-work informs choices about everything from prompt design to serving infrastructure. For developers who want to go deeper, building a decoder-only model from scratch through annotated implementation [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) is one of the most direct ways to internalize what the engineering abstractions are actually doing.

Fine-tuning and training efficiency are active areas. Unsloth delivers up to 30x faster training and 90% less memory than FlashAttention 2 via custom kernels, with support for LoRA, FP8, vision, and audio across 500+ models [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth). At the data end, synthetic training data generated through multi-agent debate lets small domain-specific classifiers outperform GPT-4.1 on custom policy tasks at a fraction of the cost [BARRED/Plurai](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your). Plurai automates the full pipeline from data generation through evaluation model deployment with sub-100ms latency [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

Inference engineering is where much of the current cost and latency leverage lives. KV caching reduces prefill costs by up to 20x when the cache is treated as a persistent shared asset injected via RDMA rather than recomputed per request [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Granular-prompt caching takes this further by segmenting prompts into reusable chunks keyed on metadata pointers, so only changed tokens are processed [Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Quantization, speculative decoding, and disaggregation round out the inference toolkit [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). For local deployments, tooling like CanItRun [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) and LM Studio integration [running Claude Code locally](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) let developers match models to available VRAM with quantization tradeoffs made explicit. Netflix runs the full serving stack in-house using vLLM over TensorRT-LLM with an OpenAI-compatible API surface and batched constrained decoding [Netflix LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix).

Agent harness design is where most engineering complexity accumulates. The five harness subsystems, instructions, state, verification, scope, and session lifecycle, determine whether unreliable model output becomes dependable engineering results [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery [12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's GAN-inspired planner-generator-evaluator architecture addresses context anxiety and self-evaluation bias in multi-hour autonomous coding sessions [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Recursive Language Models address context rot by keeping data in a REPL environment and letting the LLM pull selectively into token space [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms). Agent memory systems that build biomimetic structures beyond conversation history, world facts, experiences, and mental models, show state-of-the-art results on LongMemEval [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight).

Observability closes the loop. Traces without feedback signals do not improve agentic systems; attaching user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules to traces is what turns observability into a learning loop across model, harness, and context layers [LangChain observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Agent epistemic discipline matters too: maintaining confirmed-versus-inferred distinctions, rollback discipline, and scope safety during long multi-tool sessions [Fable5](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) addresses the hallucination propagation problem surfaced when building LLM-compiled knowledge bases [LLM wiki takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways).

Two structural tensions run through the field. First, reasoning effort does not scale monotonically with quality: benchmarking Claude Opus 4.7 finds medium effort wins on pass rate and cost-efficiency while higher effort levels spend more without improving results [Opus 4.7 reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). Second, sycophancy introduces systemic risk: a Bayesian model shows that sycophantic outputs cause delusional belief spiraling even in ideally rational users, and neither eliminating hallucinations nor disclosing sycophancy fully prevents the effect [sycophancy paper](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in). LLMs also recite textbook protocols rather than faithfully modeling actual implementations in formal specification tasks, scoring roughly 46% conformance on TLA+ generation despite near-perfect syntax [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). These gaps matter because, as one analysis notes, AI lowers the cost of producing code but not the cost of owning it [code quality](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter), and fully autonomous coding workflows risk accelerating skill atrophy and vendor dependency [agentic coding trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap).
