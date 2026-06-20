---
title: LLM engineering
summary: >-
  The practice of building reliable systems with large language models, spanning
  fine-tuning, inference optimization, agent harness design, retrieval, and the
  operational tradeoffs that emerge when LLMs move from experiments into
  production.
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
compiled_at: '2026-06-20T12:37:19.109Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10444
    output_tokens: 1874
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
  cost_usd: 0.059442
---
LLM engineering sits at the intersection of model-level concerns (training, quantization, inference cost) and system-level ones (orchestration, state management, observability). The sources here span that full range, and a few recurring tensions run through all of them.

At the model layer, the gap between raw capability and reliable output shapes almost every decision. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) demonstrates how custom CUDA kernels can cut training time by 30x and memory usage by 90% compared to FlashAttention 2, making fine-tuning on consumer hardware viable. [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) takes a from-scratch approach, walking through tokenization, RoPE, attention, and the training loop to build intuition for what models actually do. The BARRED framework from Plurai, covered in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your), generates synthetic training data via multi-agent debate to fine-tune small domain-specific classifiers that outperform GPT-4.1 on custom tasks at a fraction of the cost, a pattern [Plurai's Product Hunt listing](/reading/2026-05/2026-05-04t235011-plurai) extends to evaluation and guardrail models with sub-100ms latency.

Inference cost is its own discipline. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) surfaces the hardware-quantization tradeoff visually, calculating whether a given GPU's VRAM can run a specific model at each quantization level. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared data asset rather than a per-request recompute can reduce prefill costs by up to 20x, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends that by segmenting prompts into reusable chunks so only changed tokens get processed. A benchmark of Claude Opus 4.7 across five reasoning-effort levels finds a non-monotonic curve: [medium effort outperforms high and max on pass rate and cost-efficiency](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning), which challenges the assumption that more compute always buys better results.

System design around LLMs has produced a small canon of patterns. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making agents serializable, debuggable, and resumable without a separate state machine. [Harness Design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) from Anthropic describes a GAN-inspired planner-generator-evaluator architecture that sustains multi-hour autonomous coding sessions by combating context anxiety and self-evaluation bias. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

Observability closes the loop. [LangChain's post on agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without attached feedback signals are inert; user ratings, indirect behavioral signals, LLM-as-judge, and deterministic rules must be wired to traces to produce a learning loop. The [hindsight agent memory system](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes further, building biomimetic memory structures so agents accumulate world facts and mental models over time rather than starting fresh each session.

Retrieval is contested terrain. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) achieves 98.7% accuracy on FinanceBench using hierarchical tree indexes and LLM reasoning rather than vector similarity, directly challenging the default RAG assumption. The LLM wiki pattern, covered in two Reddit threads ([implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways)), offers cross-document synthesis that outperforms RAG for curated research but introduces a structural risk: hallucinations baked in at ingest propagate through the entire knowledge base, making lint and verification non-negotiable.

Capability benchmarks reveal real limits. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds that LLMs score near-perfectly on TLA+ syntax but only around 46% on conformance to actual system implementations, reciting textbook protocols rather than modeling real code. Task-completion horizon research on [LessWrong](/reading/2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier) estimates GPT-5.5 handles roughly three-minute human tasks at 50% reliability without chain-of-thought, a capability doubling annually since 2019 but still short of autonomous reliability for complex work.

The practice-level debate cuts across all these layers. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic workflows accelerate skill atrophy and create vendor dependency, favoring LLMs as secondary delegation tools. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies weak type systems, learned distrust, and org processes built for human-speed development as structural barriers to effective AI use. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) adds that AI lowers production cost but not ownership cost, and that LLMs can generate polished technical debt faster than any individual engineer. Sycophancy research from [arXiv](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that neither eliminating hallucinations nor disclosing sycophancy fully prevents belief spiraling in users, a system-level failure that no prompt engineering alone can fix.
