---
title: LLM engineering
summary: >-
  LLM engineering covers the full stack of building, deploying, and maintaining
  systems built on large language models — from fine-tuning and inference
  optimization to agent harness design, state management, and the structural
  tradeoffs that shape reliability in production.
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
compiled_at: '2026-06-24T04:38:01.972Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1741
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
  cost_usd: 0.059661
---
LLM engineering spans every layer between a raw model and a production system: training and fine-tuning, inference optimization, agent architecture, harness design, retrieval, and the observability loops that let systems improve over time. The field is evolving fast enough that decisions made at each layer carry compounding consequences.

On the model side, tools like [Unsloth](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) are not the right link here. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) reduces fine-tuning costs dramatically — up to 30x faster training and 90% less memory than FlashAttention 2 — making local fine-tuning practical on consumer hardware. The BARRED framework described by [Nir Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) and demonstrated by [Plurai](/reading/2026-05/2026-05-04t235011-plurai) extends this further: synthetic training data generated via multi-agent debate can fine-tune small classifiers that outperform GPT-4.1 on specific policy tasks at a fraction of the inference cost. The [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) curriculum provides the foundational knowledge underneath these tools, walking through tokenizers, RoPE, attention, and training loops from scratch.

Inference optimization is its own discipline. KV caching is the central lever: treating the KV cache as a [persistent shared asset injected via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) rather than recomputed on each request can cut prefill costs by 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. At the routing layer, systems like [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and the [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) automatically match requests to models by cost, latency, or quality using compact routing models. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the more basic question of whether a given GPU can run a model at all. The [inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers quantization, speculative decoding, and disaggregation as techniques that matter once scale demands them. Benchmarks show a non-monotonic reasoning curve: [medium effort on Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) beats higher effort settings on pass rate and cost-efficiency across real tasks.

Agent harness design is where much of the practical complexity lives. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that sustains multi-hour autonomous coding sessions. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, debugging, and recovery. The [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) course breaks harness concerns into five subsystems: instructions, state, verification, scope, and session lifecycle. Observability without feedback is insufficient: [LangChain's framing](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces only become useful when feedback signals are attached, turning observation into a learning loop across model, harness, and context layers. Agent memory beyond conversation history, as in [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight), builds biomimetic structures so agents accumulate and apply knowledge over time.

Retrieval architecture is contested. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) achieves 98.7% accuracy on FinanceBench using hierarchical tree indexes and LLM reasoning rather than vector similarity. The [LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) compiles raw documents into structured Markdown for direct querying, bypassing RAG entirely, though [practical experience](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) shows that hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable. The [Recursive Language Model](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) pattern keeps data in a REPL environment and lets the model selectively pull it into token space, addressing context rot without full retrieval overhead.

Structural risks appear across every layer. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that even ideally rational users spiral into delusional beliefs when models consistently validate them. [AI code review pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) can break correct code when fixer agents overreach beyond review scope. [Benchmarks on TLA+ generation](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) find near-perfect syntax scores but only 46% conformance, confirming that fluency masks shallow modeling. LLM engineering at its best treats these failure modes as design constraints rather than edge cases.
