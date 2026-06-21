---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack from model training and inference
  optimization to agent harness design, retrieval architecture, and the
  operational disciplines that keep deployed systems accurate and
  cost-efficient.
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
compiled_at: '2026-06-21T20:09:51.904Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10615
    output_tokens: 1528
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
  cost_usd: 0.054765
---
LLM engineering covers the practical disciplines involved in building, deploying, and maintaining systems that use large language models, from low-level training and inference mechanics to the architectural patterns that govern how models are embedded in production software.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) have pushed fine-tuning from a cloud-only exercise to something feasible on a single consumer GPU, delivering up to 30x faster training and 90% less memory than FlashAttention 2. For teams without labeled data, [Plurai's BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data via multi-agent debate, producing domain-specific classifiers that outperform GPT-4.1 on custom tasks at a fraction of the cost. Before any training run, hardware feasibility matters; [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates whether a GPU's VRAM can handle a given model and which quantization levels are viable. Developers who want to understand the mechanics end-to-end can follow [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), a 12-chapter annotated walkthrough covering tokenization, RoPE, attention, and inference.

Inference cost is the dominant operational concern at scale. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) injected from fast storage via RDMA rather than recomputed can cut prefill costs by up to 20x; [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. [Inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) as a named discipline encompasses quantization, speculative decoding, parallelism, and disaggregation as production levers. At the model level, [benchmarking reasoning-effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) on real tasks reveals a non-monotonic curve: medium effort often wins on both pass rate and cost-efficiency, making effort selection itself an engineering decision.

Retrieval architecture sits between raw model capability and domain knowledge. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, hitting 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM wiki pattern takes a different approach: having the model compile and maintain structured Markdown files that can be queried without RAG. [One implementation report](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes the ingestion and health-check pipeline; [a hands-on evaluation](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) confirms that cross-document synthesis is superior to RAG for curated research but warns that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable.

Agent harness design has emerged as its own sub-discipline. [Anthropic's GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) tackles context anxiety and self-evaluation bias in multi-hour autonomous coding sessions. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery. [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes the five harness subsystems: instructions, state, verification, scope, and session lifecycle. [Agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) only improves systems when traces are paired with feedback signals that close a learning loop across model, harness, and context layers.

Several sources converge on risks specific to LLM engineering in practice. [Sycophantic chatbot behavior](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) causes delusional belief spiraling even in ideally rational users, a failure mode that neither eliminating hallucinations nor disclosure fully prevents. LLMs [recite textbook protocols rather than faithfully modeling actual implementations](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) when generating formal specs, scoring only ~46% conformance despite near-perfect syntax. Cheaper code generation does not reduce ownership costs; [taste and judgment still determine whether AI output becomes technical debt](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). And [agentic workflows can accelerate skill atrophy and create vendor dependency](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) when developers cede implementation understanding to the model entirely.
