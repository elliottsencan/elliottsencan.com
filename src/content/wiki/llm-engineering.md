---
title: LLM engineering
summary: >-
  LLM engineering covers the full stack of building, running, and governing
  language model systems — from training and inference optimization to agent
  harness design, retrieval, and the judgment calls that determine whether model
  output is actually useful.
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
compiled_at: '2026-11-10T01:20:45.424Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1921
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
  cost_usd: 0.064866
---
LLM engineering has broadened from a research specialty into an operational discipline that spans model training, inference infrastructure, retrieval architecture, agent harness design, and the feedback loops that keep deployed systems improving over time.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) have made fine-tuning practically accessible by cutting memory requirements by up to 90% and accelerating training up to 30x compared to FlashAttention 2. The adjacent question is when to fine-tune at all. The BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data through multi-agent debate, producing small domain-specific classifiers that outperform GPT-4.1 on custom policy tasks at a fraction of the cost. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) extends this with automated data generation and sub-100ms evaluation models that eliminate the need for hand-labeled annotation pipelines. For developers who want to understand what they are tuning, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only model from scratch, covering tokenization, RoPE, attention, and the training loop with line-by-line annotation.

Inference efficiency is its own engineering surface. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the most basic constraint: whether a given GPU's VRAM can run a model at a chosen quantization level. Beyond hardware selection, KV caching is emerging as a primary lever for cost reduction. [Everpure's caching analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset injected via RDMA rather than recomputed can cut prefill costs by up to 20x; their [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) approach segments prompts into reusable chunks so only changed tokens are processed. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers the broader toolkit: quantization, speculative decoding, parallelism, and disaggregation. At scale, [Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) runs the full serving stack in-house using vLLM with an OpenAI-compatible API surface and batched constrained decoding.

Retrieval architecture is contested ground. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM-wiki pattern — having a model compile and maintain structured Markdown files queried directly — offers a different tradeoff: [one implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes it as superior to RAG for curated research, while [a practitioner's honest account](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) warns that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable. Recursive Language Models offer a third path: [dbreunig's RLM analysis](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) argues that keeping data in a REPL environment and pulling it selectively into token space avoids context rot entirely.

Agent harness design has become a discipline in its own right. [Anthropic's harness writeup](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions. The [learn-harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project argues specifically for unifying execution and business state into the context window, simplifying serialization, debugging, and recovery. Observability closes the loop: [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve systems — attaching feedback signals is what makes observability useful.

Several sources push back on the direction the field is moving. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic coding workflows accelerate skill atrophy and create vendor dependency; [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) makes the complementary point that custom orchestration frameworks are not a moat and teams should build MCP tool servers instead. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it. The Lobster in the Hot Pot extends this to institutional risk: LLM dependency erodes the organizational knowledge needed to evaluate model output independently. And [Sycophantic Chatbots](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) demonstrates through Bayesian modeling that model sycophancy causes delusional belief spiraling even in rational users, a failure mode no amount of harness engineering fully addresses.

Calibration remains underappreciated. [Opus 4.7 reasoning curve benchmarks](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) found that medium reasoning effort outperformed higher settings on most tasks, suggesting that inference budget allocation is non-trivial and more compute is not always better. LLMs also have known blind spots: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found near-perfect syntax on TLA+ generation but only \~46% conformance, revealing that models recite textbook protocols rather than faithfully modeling actual implementations.
