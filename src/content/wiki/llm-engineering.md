---
title: LLM engineering
summary: >-
  The practice of designing, training, deploying, and operating large language
  models in production — spanning fine-tuning pipelines, inference optimization,
  agent harness design, and the judgment required to avoid the failure modes
  each layer introduces.
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
compiled_at: '2026-06-22T07:14:31.334Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10995
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
  cost_usd: 0.058965
last_source_added: '2026-06-24T04:29:58.950Z'
---
LLM engineering spans several distinct but interlocking concerns: how models are trained or adapted for specific domains, how they are served efficiently, how they are embedded in software systems, and how the failure modes specific to each layer are handled. The sources collected here range across all of those concerns, and taken together they sketch what the discipline actually demands.

On the training side, the simplest entry point for most practitioners is fine-tuning rather than pretraining from scratch. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels that bring training memory down by up to 90% and speed up by 30x versus FlashAttention 2, making local fine-tuning practical on consumer hardware. For teams that need labeled data, [BARRED](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) from Plurai generates synthetic training data through multi-agent debate to produce small domain-specific classifiers that outperform GPT-4.1 on targeted tasks at lower cost. Anyone wanting to understand the architecture beneath these tools can work through the annotated decoder-only implementation in [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), which covers tokenization, RoPE, attention, and the full training loop.

Inference is increasingly its own engineering specialty. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) models VRAM requirements across quantization levels and helps practitioners match hardware to model. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys the toolbox: quantization, speculative decoding, parallelism, and disaggregation. KV caching sits at the center of cost reduction — [one analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a shared persistent asset injected via RDMA rather than recomputed can cut prefill costs by up to 20x, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further by segmenting prompts into reusable chunks so only changed tokens are processed. At the routing layer, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and the [Arch-Router paper](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) both show how a compact routing model can automatically match requests to the best-fit backend for cost, latency, or quality without retraining when the model pool changes.

Systems that wrap LLMs require their own engineering disciplines. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project argues for unifying execution state and business state into a single context-window-derived thread, which simplifies serialization, debugging, and recovery. [Harness design for long-running applications](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) at Anthropic uses a GAN-inspired planner/generator/evaluator architecture to sustain multi-hour autonomous coding sessions. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames this more abstractly as five subsystems — instructions, state, verification, scope, and session lifecycle — that collectively convert unreliable model output into dependable results. Agent observability requires more than traces: [LangChain's framing](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) holds that attaching feedback signals to traces is what turns monitoring into a learning loop.

Retrieval is another active design space. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning to achieve 98.7% accuracy on FinanceBench without embeddings. Karpathy's LLM-compiled wiki pattern, documented in [two](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) [Reddit threads](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), offers cross-document synthesis superior to RAG for curated research, but hallucinates baked in at ingest propagate structurally, making lint checks non-negotiable.

Several sources flag the behavioral failure modes that persist regardless of infrastructure. Sycophancy causes delusional belief spiraling in users even when they know about it, according to a [Bayesian computational study](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot). LLMs writing TLA+ specifications [score near-perfect on syntax but only ~46% on conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), reciting textbook protocols rather than modeling actual implementations. Benchmark curves on reasoning effort are non-monotonic: [testing Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five effort levels found medium wins on pass rate and cost-efficiency while higher settings spent more without improving quality.

The organizational dimension is harder to quantify but consistently surfaces. [One essay](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it, generating technical debt faster than any individual engineer. [Another](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies weak type systems, learned distrust of all model output, and org processes built for human-speed development as structural barriers to effective AI adoption. These concerns are not incidental — they sit at the core of what LLM engineering actually demands once the models are running.
