---
title: LLM engineering
summary: >-
  The applied discipline of building, optimizing, and operating large language
  models in production — spanning fine-tuning, inference efficiency, agentic
  architectures, context design, and the organizational tradeoffs that determine
  whether LLM systems actually deliver value.
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
compiled_at: '2026-08-24T18:48:28.432Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1906
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
  cost_usd: 0.064191
---
LLM engineering spans the full lifecycle from model training through production deployment, and the sources collected here map nearly every layer of that stack.

At the model layer, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) demonstrates how custom CUDA kernels can cut fine-tuning memory by 90% and speed training up to 30x versus FlashAttention 2, making local fine-tuning on consumer hardware plausible. The BARRED framework documented by [Nir Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) takes a different angle: generating synthetic training data through multi-agent debate to fine-tune small domain-specific classifiers that outperform GPT-4.1 on custom policy tasks at a fraction of the cost. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates that pipeline further, producing training data, validation sets, and guardrail models with sub-100ms latency and no annotation work. For engineers who want to understand the internals, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch, covering tokenization, RoPE, attention, and training loops with annotated code.

Inference efficiency is a distinct engineering domain. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) makes the first constraint concrete: VRAM determines which quantization levels are viable before a single token is generated. Beyond hardware selection, KV caching offers the largest operational lever. Two posts from Everpure Engineering argue for treating the KV cache as a persistent shared data asset: [one](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames RDMA-injected cache as cutting prefill costs by up to 20x, and a [follow-up](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) introduces granular-prompt caching that segments prompts into reusable chunks so only changed tokens get reprocessed. At scale, [Netflix's in-house LLM serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM and built an OpenAI-compatible API surface with batched constrained decoding. [The Pragmatic Engineer's breakdown of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs the full toolkit: quantization, speculative decoding, parallelism, and disaggregation. Routing across models is its own subproblem: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best model for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a 1.5B model that maps queries to user-defined domains without retraining when new models are added.

Context and harness engineering determine whether a well-served model produces useful results. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization and recovery. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results. Anthropic's [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions. [Agent observability at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) makes a related point: traces alone don't improve systems; feedback signals attached to traces are what close the learning loop.

Retrieval and knowledge architecture sit between context design and model capability. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes for long documents and uses LLM reasoning rather than vector similarity, reaching 98.7% accuracy on FinanceBench. The Karpathy LLM Wiki pattern, covered both in a [practical Reddit guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and a [builder's honest retrospective](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), shows that LLM-compiled structured Markdown outperforms RAG for curated research synthesis, but hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable.

The reliability ceiling is real. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found that frontier models score near-perfect on TLA+ syntax but only \~46% on spec conformance, meaning they recite textbook protocols rather than faithfully model actual implementations. [Imbue's pipeline experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents break correct code by overreaching beyond review scope. [humanlayer/advanced-context-engineering](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) argues this is a training problem no harness engineering fully solves.

The organizational layer compounds these technical limits. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies five structural barriers — weak type systems, distrust, slow org processes, resistance, and lack of agent-management training — that explain why AI coding tools underdeliver. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows accelerate skill atrophy and create vendor dependency. The countervailing risk, documented by Christoph Spörk, is that moving too slowly lets institutional knowledge erode while a cost shock from token pricing cripples late adopters. Neither pure adoption nor pure resistance is an engineering strategy.
