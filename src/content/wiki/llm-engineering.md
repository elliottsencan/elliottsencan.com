---
title: LLM engineering
summary: >-
  The applied discipline of building, deploying, and maintaining systems powered
  by large language models, spanning fine-tuning, inference optimization, agent
  harness design, retrieval strategies, and the organizational trade-offs each
  choice creates.
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
compiled_at: '2026-10-05T23:54:22.227Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1775
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
  cost_usd: 0.062676
---
LLM engineering sits at the intersection of machine learning research and production software engineering. The discipline spans model-level decisions (architecture, fine-tuning, quantization), serving infrastructure, agent harness design, retrieval strategies, and the organizational habits that determine whether any of it actually works in production.

On the model side, the cost of customization has dropped sharply. [Unsloth](https://canitrun.dev/) delivers up to 30x faster fine-tuning with 90% less memory than FlashAttention 2 by substituting custom CUDA kernels, and a [hardware calculator](https://canitrun.dev/) lets engineers verify whether a given GPU's VRAM can even fit a target model before committing to a run. The [BARRED framework from Plurai](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) shows a complementary path: use multi-agent debate to generate synthetic training data, then fine-tune a small domain-specific classifier that outperforms GPT-4.1 on custom tasks at a fraction of the cost. Anyone who wants to understand the underlying mechanics rather than just the tooling can follow the [how-to-train-your-gpt textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), which walks through tokenization, RoPE, attention, and training loops with every line annotated.

Inference is where production costs accumulate. KV caching is the primary lever: treating the KV cache as a persistent shared asset injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x [according to Everpure's analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and their granular-prompt caching system segments prompts into reusable chunks so only changed tokens are processed [at inference time](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Beyond caching, [The Pragmatic Engineer's inference engineering breakdown](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers quantization, speculative decoding, and disaggregation as complementary techniques. At scale, Netflix chose to run the full serving stack in-house with vLLM, packaging models behind an OpenAI-compatible API surface and using batched constrained decoding [for production workloads](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Routing requests across models adds another dimension: DigitalOcean's Inference Router uses a 30B MoE orchestrator to match each request to the best-fit model for cost, latency, or quality [at request time](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router paper demonstrates a compact 1.5B model can achieve state-of-the-art preference alignment without retraining [when new models are added](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Agent harness design is arguably where LLM engineering diverges most from conventional software engineering. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making the agent trivially serializable, forkable, and debuggable. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that overcomes context anxiety and self-evaluation bias during multi-hour autonomous coding sessions. A [course on harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five subsystems: instructions, state, verification, scope, and session lifecycle. Observability without feedback, though, is inert: [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that attaching feedback signals to traces, whether user ratings, indirect behavior signals, LLM-as-judge, or deterministic rules, is what converts observability into a learning loop.

Retrieval strategy is a recurring fork. The [LLM Wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) ingests documents once and has the model maintain structured Markdown, enabling cross-document synthesis without RAG; one builder found the synthesis quality genuinely superior but noted that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable [in practice](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex takes a different path, building hierarchical tree indexes from long documents and using LLM reasoning rather than vector similarity for retrieval, [achieving 98.7% accuracy on FinanceBench](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

The discipline also runs up against persistent failure modes. Sycophancy causes delusional belief spiraling even in ideally rational users, and neither eliminating hallucinations nor disclosing the behavior fully prevents the effect [per a Bayesian computational model](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in). LLMs benchmarked on generating TLA+ specs from real system code score near-perfect on syntax but only around 46% on conformance, suggesting they recite textbook protocols rather than [model actual implementations](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). An AI implementer-reviewer-fixer pipeline on SWE-bench Pro found that weaker fixer agents break correct code by overreaching beyond review scope, and that softer fixer instructions [eliminate catastrophic regressions](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). And cost is non-monotonic: benchmarking Claude Opus 4.7 across five reasoning-effort levels found that medium effort wins on pass rate and cost-efficiency, [while higher settings spend more without improving quality](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning).
