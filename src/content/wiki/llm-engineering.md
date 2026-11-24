---
title: LLM engineering
summary: >-
  The practice of building, running, and improving systems that use large
  language models — spanning model internals, fine-tuning, inference
  optimization, retrieval, agent harnesses, and the operational discipline
  required to keep those systems reliable.
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
compiled_at: '2026-11-24T03:58:35.576Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 2169
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
  cost_usd: 0.068586
---
LLM engineering covers everything between a raw model checkpoint and a production system that behaves consistently: understanding how the model works, shaping its inputs and outputs, running it efficiently, and closing the loop with feedback. The range of concerns is wide enough that no single practitioner touches all of them, but the decisions made at each layer affect every other layer.

At the foundation, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only transformer from scratch — tokenizer, rotary positional embeddings, attention, training loop — and [how-llms-actually-work](/reading/2026-08/2026-08-29t224355-how-llms-actually-work) covers the same terrain without heavy math, explaining the KV cache as a first-class concept rather than an implementation detail. That cache matters economically: [cut-llm-inference-costs-with-kv-caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset, injected via RDMA rather than recomputed, can reduce prefill costs by up to 20x, and [granular-prompt-caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this with chunk-level metadata pointers so only changed tokens are processed.

Serving at scale introduces its own engineering discipline. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys quantization, speculative decoding, parallelism, and disaggregation as the core levers, while [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) details a production deployment choosing vLLM over TensorRT-LLM and running batched constrained decoding at scale. When serving multiple models, routing matters: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE orchestrator to match requests to models by cost, latency, or quality, and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) proposes a 1.5B preference-aligned routing model that generalizes without retraining. Hardware constraints remain real: [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates VRAM headroom, quantization levels, and estimated throughput before you commit to a local deployment, and [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) reduces fine-tuning memory by 90% and speeds training up to 30x using custom kernels.

Fine-tuning and synthetic data generation form a parallel track. [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) demonstrates BARRED, a framework that generates training data through multi-agent debate to produce domain-specific classifiers that beat GPT-4.1 on custom policy tasks at lower cost. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates the whole pipeline — data generation, validation, guardrail model deployment — with sub-100ms latency and 8x lower cost than GPT-as-judge.

Retrieval is contested ground. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, achieving 98.7% accuracy on FinanceBench without embeddings. The Karpathy wiki pattern, documented in two Reddit threads ([implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways)), skips retrieval entirely for curated corpora: an LLM builds and maintains structured Markdown files that can be queried directly. Cross-document synthesis is genuinely superior to RAG in this mode, but hallucinations baked in at ingest propagate structurally, making a lint step mandatory. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) take a different angle: keeping data in a REPL environment and letting the model pull selectively into token space, sidestepping context rot.

Agent harnesses add a systems-design layer on top of model capabilities. [Harness Design for Long-Running Apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture for multi-hour autonomous coding sessions, and [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, session lifecycle — as the structural basis for reliability. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread, simplifying serialization, debugging, and recovery. Observability without feedback is insufficient: [LangChain on agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to traces is what turns monitoring into a learning loop.

Capability benchmarks reveal where models currently stand and where the gaps are. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds near-perfect TLA+ syntax scores but only \~46% conformance against real implementations, exposing a gap between pattern recitation and genuine modeling. [Opus 4.7 reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) shows that more reasoning effort is not monotonically better — medium effort wins on pass rate and cost-efficiency across 29 real tasks. [Task-completion time horizons](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) measure that GPT-5.5 handles roughly 3-minute human tasks at 50% reliability without chain-of-thought, a capability doubling roughly every year.

The risks accumulate with scale. [Sycophantic chatbots](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows computationally that sycophancy causes delusional belief spiraling even in ideally rational users, and that neither eliminating hallucinations nor disclosing sycophancy fully prevents it. The Lobster in the Hot Pot warns that gradual LLM dependency erodes institutional knowledge while cost structures remain fragile. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) makes the complementary point: AI lowers production cost but not ownership cost, and LLMs can generate technical debt faster than any individual engineer. [Don't be a meat proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) frames the individual-level version: relaying raw model output without synthesis shifts cognitive work onto the recipient and eliminates the value the engineer was supposed to add.
