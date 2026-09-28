---
title: LLM engineering
summary: >-
  The practice of building, fine-tuning, deploying, and operating large language
  models in production — spanning inference optimization, harness design,
  agentic architectures, and the judgment calls that determine whether
  LLM-generated output is actually useful.
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
compiled_at: '2026-09-28T23:06:40.767Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1864
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
  cost_usd: 0.064011
---
LLM engineering covers the full stack from training a model to serving it reliably and embedding it in software systems that behave predictably. The discipline is broader than prompt crafting and narrower than machine learning research; it sits at the intersection of systems engineering, applied ML, and product thinking.

At the model level, fine-tuning on custom data remains the primary path to domain-specific performance. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels that deliver up to 30x faster training and 90% less VRAM usage compared to FlashAttention 2, making local fine-tuning practical on consumer hardware. [Vibe Training](https://diamantai.substack.com) via the BARRED framework goes further, using multi-agent debate to generate synthetic training data that lets small classifiers outperform GPT-4.1 on custom policy tasks at a fraction of the cost — a pattern [Plurai](/reading/2026-05/2026-05-04t235011-plurai) productizes with sub-100ms latency and no annotation pipelines required. For developers who want to understand the underlying mechanics, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch, and [How LLMs Actually Work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work) explains tokenization, attention, and KV cache without heavy math.

Inference optimization is increasingly its own specialty. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames techniques like quantization, speculative decoding, parallelism, and disaggregation as first-class engineering concerns. KV cache management has become particularly consequential: treating the cache as a persistent shared asset injected via RDMA rather than recomputed can reduce prefill costs by up to 20x, per [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and segmenting prompts into reusable chunks via [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) cuts time-to-first-token for RAG and enterprise workloads. [Netflix's in-house LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) stack shows how production teams manage engine selection, batched constrained decoding, and OpenAI-compatible API surfaces at scale. Model routing adds another dimension: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to models by cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves the same with a 1.5B preference-aligned model.

Harness design — the environment surrounding the model — is where most production systems succeed or fail. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifies five subsystems: instructions, state, verification, scope, and session lifecycle. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery. Anthropic's [harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture for multi-hour autonomous coding sessions. Observability requires more than traces: [LangChain's agent observability post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what converts logs into a learning loop.

Reliability constraints surface at multiple layers. LLMs score near-perfect on TLA+ syntax but only \~46% on conformance to actual implementations, per [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), suggesting models recite textbook patterns rather than faithfully modeling real systems. AI code review pipelines can make correct code worse: [Imbue's SWE-bench experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents overreach beyond review scope, breaking passing tests, until softer instructions eliminated the regressions. [Reasoning effort curves are non-monotonic](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort on Claude Opus 4.7 beat high, xhigh, and max on pass rate and cost-efficiency across 29 real tasks.

LLM engineering also has a social and epistemic dimension. Sycophantic models cause delusional belief spiraling even in rational users, and [neither eliminating hallucinations nor warning users fully prevents the effect](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in). AI lowers the cost of writing code but not of owning it: [taste and bounded prompting still matter](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) because LLMs can generate well-formatted technical debt faster than any individual engineer. [Structural barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) — weak type systems, organizational processes built for human-speed development, and absence of agent-management training — explain why promised productivity gains often do not materialize. The lobster-in-hot-water framing warns that incremental LLM dependency erodes institutional knowledge while cost shocks remain latent. Against that backdrop, [Don't be a meat proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) makes the simplest claim: relaying raw model output without reading or validating it shifts cognitive work onto the recipient and eliminates the value the engineer was supposed to add.
