---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building with language models:
  fine-tuning, inference optimization, retrieval, agent harness design, and the
  tradeoffs that determine whether a system is genuinely useful or expensively
  fragile.
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
compiled_at: '2026-06-20T22:02:07.850Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10444
    output_tokens: 1670
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
  cost_usd: 0.056382
---
LLM engineering is the practice of taking language models from raw capability to production behavior. It covers training and fine-tuning, inference infrastructure, retrieval and memory architectures, agent harness design, and the evaluation loops that distinguish working systems from ones that merely appear to work.

On the model side, the gap between running a frontier API and owning your model behavior is narrowing. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning and 90% less memory than FlashAttention 2, making local LoRA training accessible on consumer hardware. For teams that want domain-specific classifiers without annotation pipelines, the BARRED framework from [Plurai](/reading/2026-05/2026-05-04t235011-plurai) uses multi-agent debate to generate synthetic training data, producing small models that outperform GPT-4.1 on custom policy enforcement at a fraction of the cost — a pattern [Nir Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) calls "vibe training." For developers who want to understand the internals before fine-tuning anything, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch, covering tokenizer, RoPE, attention, and training loop with every line annotated.

Inference economics matter as much as model quality. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset rather than a per-request recomputation can cut prefill costs by up to 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this further by segmenting prompts into reusable chunks so only changed tokens are processed. Before deployment, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets engineers check whether a given GPU's VRAM can handle a specific model at a given quantization level, with estimated tokens-per-second. Reasoning effort is not monotonically better: a benchmark of Claude Opus 4.7 across five effort levels found [medium effort wins on pass rate and cost-efficiency](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning), with higher settings spending more without improving quality.

Retrieval and memory architectures are an active design space. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, hitting 98.7% accuracy on FinanceBench without embeddings. The [LLM-compiled wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) — ingesting documents and having the model build structured Markdown files queried at scale — offers genuine cross-document synthesis advantages over RAG, but [a weekend build of the same pattern](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot differently: keeping data in a REPL environment and letting the model pull selectively into token space, with emergent traces that can inform lower-latency agent designs.

Agent harness design is where most LLM engineering effort lands in practice. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that overcomes context anxiety and self-evaluation bias during multi-hour autonomous sessions. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, recovery, and observability. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) breaks harness design into five subsystems: instructions, state, verification, scope, and session lifecycle. Observability without feedback is insufficient: [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals to traces is what turns monitoring into a learning loop.

Several sources converge on the cost side of LLM engineering decisions. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it, so taste and judgment remain load-bearing. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows accelerate skill atrophy and create vendor dependency. Sycophancy compounds the risk: a Bayesian model shows [sycophantic chatbots cause delusional belief spiraling](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) even in ideally rational users, and neither eliminating hallucinations nor warning users fully prevents it. On capability boundaries, a SIGOPS benchmark finds LLMs generate [near-perfect TLA+ syntax but only ~46% conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), revealing that models recite textbook protocols rather than faithfully modeling actual implementations.
