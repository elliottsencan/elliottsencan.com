---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building with large language models —
  from training and inference optimization to agent harness design, context
  management, and the judgment required to own the output.
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
compiled_at: '2026-10-19T22:10:18.840Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1866
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
  cost_usd: 0.064041
---
LLM engineering is the practice of building reliable, cost-effective systems on top of large language models. It spans training, inference, orchestration, and the softer discipline of knowing when and how to delegate to a model versus staying hands-on. The sources here collectively resist any single framing: some optimize the model itself, others the harness around it, and several argue that the hardest problems are organizational or epistemic.

On the training side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets local fine-tuning with custom kernels that claim up to 30x faster training and 90% less memory than FlashAttention 2, supporting LoRA, FP8, and 500+ models. [Raiyan Yahya's interactive textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) goes deeper, walking Python developers through building a decoder-only LLM from scratch — tokenizer through inference engine — which matters when you need to understand the artifact you are deploying. For domain adaptation without labeled data, [Nir Diamant's BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent synthetic data generation to fine-tune small classifiers that outperform GPT-4.1 on custom policy tasks, and [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates the full pipeline from data generation through evaluation model deployment at sub-100ms latency.

Inference cost and throughput occupy their own layer. [KV caching treated as a shared data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) — injected via RDMA rather than recomputed — can cut prefill costs by 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. [The Pragmatic Engineer on inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) synthesizes the full toolkit: quantization, speculative decoding, parallelism, and disaggregation. [Netflix's in-house serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows this at scale, choosing vLLM over TensorRT-LLM and running batched constrained decoding behind an OpenAI-compatible API. For hardware planning, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) provides a practical VRAM calculator that accounts for model weights, KV cache, and activation overhead. [Routing](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) is emerging as its own discipline: DigitalOcean's Inference Router uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality, and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) does similar work with a 1.5B preference-aligned model that generalizes without retraining.

Agent harness design is where much of the current complexity lives. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions. [12-factor agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread, simplifying serialization and debugging. [Walkinglabs' harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle. Observability requires more than traces: [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals to traces is what turns monitoring into a learning loop. [Vectorize's Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) extends this further with biomimetic memory structures so agents accumulate knowledge across sessions.

Retrieval is contested. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% on FinanceBench. The Karpathy LLM-wiki pattern — [described in one Reddit thread](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [stress-tested in another](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) — has the model build and maintain structured Markdown files rather than doing RAG at query time; cross-document synthesis quality is genuinely better, but hallucinations baked in at ingest propagate structurally, making lint non-negotiable.

The engineering judgment layer is where the sources diverge most sharply. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic coding workflows accelerate skill atrophy and create vendor dependency. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) makes the complementary point: AI lowers production cost but not ownership cost, and taste still determines whether generated code becomes an asset or technical debt. [Imbue's AI code review research](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that multi-agent reviewer-fixer pipelines can break correct code when the fixer overreaches. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows the risk runs the other direction too: models that agree too readily cause delusional belief spiraling even in rational users. The practical synthesis from [Gruhn](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) is blunt: relaying raw model output without reading or validating it shifts cognitive work onto the recipient and destroys the value of having a human in the loop at all.
