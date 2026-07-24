---
title: LLM engineering
summary: >-
  The practical discipline of building, running, and maintaining systems powered
  by large language models, spanning model training, inference optimization,
  agent architecture, retrieval, and the organizational tradeoffs that shape
  what actually ships.
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
compiled_at: '2026-07-24T05:01:48.201Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11546
    output_tokens: 1865
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
  cost_usd: 0.062613
---
LLM engineering covers the full stack from model weights to production system: how models are trained and fine-tuned, how inference is made fast and cheap, how retrieval and memory are structured, how agents are orchestrated, and how all of it degrades in ways that matter for real teams.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offer custom CUDA kernels delivering up to 30x faster training and 90% less memory than FlashAttention 2, making local fine-tuning tractable for teams without large GPU budgets. The BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) goes further: using multi-agent debate to generate synthetic training data that fine-tunes small classifiers outperforming GPT-4.1 on domain-specific policy tasks at a fraction of the cost. For anyone building from first principles, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) provides an annotated 12-chapter walkthrough of a decoder-only LLM including tokenizer, RoPE, attention, and inference engine.

Inference is increasingly its own engineering discipline. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys quantization, speculative decoding, caching, and disaggregation as the primary levers. KV caching in particular is getting architectural attention: [Everpure's two posts](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) on KV caching argue for treating the cache as a persistent shared data asset injected via RDMA rather than recomputed, reducing prefill costs by up to 20x, with [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extending this to per-chunk reuse. Routing is becoming a distinct layer too: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to models on cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves state-of-the-art preference alignment with a compact 1.5B routing model. Hardware compatibility is a practical prerequisite: [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps practitioners calculate which quantization levels their GPU's VRAM can support before committing to a model.

Retrieval architecture is contested. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, hitting 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM wiki pattern — where the model builds and maintains structured Markdown rather than querying a retrieval index — shows genuine advantages for cross-document synthesis, though [one honest build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) warns that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable.

Agent architecture has attracted its own design frameworks. Anthropic's [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator loop for multi-hour autonomous coding. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project recommends unifying execution state and business state into a single context-window-derived thread to simplify serialization and recovery. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the difference between reliable and unreliable agent output. Observability without feedback is inert: [LangChain's post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals to traces is what converts monitoring into a learning loop. Agent memory beyond conversation history is addressed by [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight), which builds biomimetic memory structures — world facts, experiences, mental models — to let agents improve over time.

Several sources push back on the trend toward full automation. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that fully autonomous workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers production cost but not ownership cost, and that LLMs can generate polished technical debt faster than any individual engineer. Research on sycophancy adds another dimension: [a Bayesian computational model](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that sycophantic models cause delusional belief spiraling even in ideally rational users, and that informing users of the effect does not prevent it. Evaluation is unreliable in related ways: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds LLMs score near-perfect on TLA+ syntax but only ~46% on conformance and ~41% on invariant correctness, reciting textbook protocols rather than modeling actual implementations.

Effort calibration matters at the model level too. A benchmark of Claude Opus 4.7 across five reasoning-effort levels on 29 real tasks found a [non-monotonic curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort won on pass rate and cost-efficiency, while higher settings spent more without improving quality. Task-horizon research on frontier models finds [GPT-5.5 handles roughly three-minute human tasks at 50% reliability](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier), a capability doubling roughly every year since 2019.
