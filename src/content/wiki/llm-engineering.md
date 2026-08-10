---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack from training and inference optimization
  to agent harness design, context management, and deployment — a discipline
  where the hard problems are operational and architectural as much as they are
  about model capability.
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
compiled_at: '2026-08-10T19:02:52.760Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1892
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
  cost_usd: 0.063981
---
LLM engineering covers the practices, tools, and architectural decisions involved in building reliable systems on top of large language models. The field has expanded well beyond prompt design to encompass training pipelines, inference infrastructure, agent harness construction, context engineering, and feedback-driven improvement loops.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) make fine-tuning accessible by delivering up to 30x faster training and 90% less memory than FlashAttention 2, supporting LoRA, FP8, and over 500 models on consumer hardware. [Vibe training with the BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) shows that synthetic training data generated via multi-agent debate can fine-tune small classifiers that outperform GPT-4.1 on domain-specific tasks at a fraction of the cost — a point [Plurai](/reading/2026-05/2026-05-04t235011-plurai) reinforces with auto-generated evaluation and guardrail models at sub-100ms latency. For developers who want to understand what they are building on, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through constructing a decoder-only LLM from scratch, including tokenization, RoPE, and attention.

Inference efficiency is its own discipline. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset — injected via RDMA rather than recomputed — can cut prefill costs by up to 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. At the serving layer, [Netflix's in-house LLM stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) documents engine selection, model packaging, and batched constrained decoding at scale, while [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) catalogs techniques like quantization, speculative decoding, and disaggregation. LLM routing adds another optimization lever: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model, and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves preference-aligned routing with a compact 1.5B model. A practical finding from [benchmarking Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) is that reasoning effort follows a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality.

Agent harness design is where much of the current engineering effort concentrates. [Harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that sustains multi-hour autonomous coding sessions. The [12-factor-agents factor on unified state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for deriving all execution state from the context window rather than maintaining separate tracking systems, improving debuggability and recovery. [Agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) becomes useful only when feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — are attached to traces, turning logging into a learning loop. Memory beyond conversation history, as in [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight), lets agents build biomimetic world models that improve over time.

Context management is central to reliable outputs. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% accuracy on FinanceBench. The [LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) uses the model to build and maintain structured Markdown files for cross-document synthesis, though [one practitioner's honest report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) notes that hallucinations baked in at ingest propagate structurally, making lint checks non-negotiable. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot by keeping data in a REPL environment and letting the model pull selectively into token space.

Several sources caution against over-engineering. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues that custom orchestration frameworks are the wrong investment; shipping MCP tool servers that extend frontier agents is more durable. [Code quality under AI](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that LLMs generate polished technical debt faster than any individual engineer, so taste and judgment remain the constraint. [AI code review pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) can break correct code when fixer agents overreach beyond review scope. And [fully agentic coding workflows](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) risk skill atrophy and vendor dependency when developers stop staying hands-on with implementation.

The discipline also surfaces harder limits. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs produce near-perfect TLA+ syntax but only ~46% conformance to actual system behavior, reciting textbook protocols rather than modeling real implementations. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that model behavior shapes user belief in ways that neither removing hallucinations nor warning users fully corrects. These are constraints that harness design, fine-tuning, and routing can mitigate but not eliminate.
