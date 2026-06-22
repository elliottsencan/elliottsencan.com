---
title: LLM engineering
summary: >-
  The practice of building, deploying, and maintaining systems that use large
  language models — spanning fine-tuning, inference optimization, agent harness
  design, retrieval, and the operational tradeoffs that emerge when LLMs move
  from experiment to production.
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
compiled_at: '2026-06-22T02:28:45.642Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10995
    output_tokens: 1613
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
  cost_usd: 0.05718
---
LLM engineering spans everything from training custom models to deciding how much reasoning budget to spend per request. The breadth of active work here is notable: sources cover low-level kernel optimization, inference routing, agent harness patterns, knowledge base design, and the human factors that determine whether any of it delivers value.

On the model side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) achieves up to 30x faster fine-tuning and 90% less memory use versus FlashAttention 2 through custom kernels, making local fine-tuning practical on consumer hardware. [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) shows a complementary path: use multi-agent debate to synthesize synthetic training data, then fine-tune a small domain-specific classifier that beats GPT-4.1 on custom tasks at a fraction of the cost. For anyone who wants to understand what they are tuning, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only transformer from scratch, tokenizer through inference loop.

Inference cost and throughput are increasingly first-class engineering concerns. Treating the KV cache as a persistent shared asset injected via RDMA rather than recomputed can cut prefill costs by up to 20x [according to Everpure](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching); granular-prompt caching extends this by segmenting prompts into reusable chunks so only changed tokens are processed [cutting time-to-first-token further](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). At the routing layer, DigitalOcean's Inference Router [uses a 30B MoE model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match each request to the best-fit model for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a compact 1.5B model that requires no retraining when new models are added. A hands-on benchmark of Claude Opus 4.7 [found a non-monotonic reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort outperformed higher settings on pass rate and cost-efficiency, meaning spending more compute does not reliably improve quality.

Agent harness design is emerging as its own subdiscipline. Anthropic's GAN-inspired planner-generator-evaluator architecture [addresses context anxiety and self-evaluation bias](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) in multi-hour coding sessions. The 12-factor-agents project argues for [unifying execution state and business state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) into a single context-window-derived thread to simplify serialization, debugging, and recovery. Observability alone is insufficient: [LangChain's framing](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces only become useful when paired with feedback signals that close the learning loop across model, harness, and context layers. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) takes this further with biomimetic memory structures that let agents accumulate world facts and mental models across sessions.

Retrieval design involves genuine architectural choices. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% accuracy on FinanceBench without embeddings. Karpathy's LLM wiki pattern takes a different approach: ingest documents, have the model build structured Markdown files, and query them without RAG at all. [One implementation report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) finds cross-document synthesis genuinely superior to RAG for curated research, but warns that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable.

Several sources push back on the assumption that more automation is better. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) full agentic coding workflows accelerate skill atrophy and create vendor dependency. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that even ideally rational users experience delusional belief spiraling from sycophantic models, and that neither removing hallucinations nor warning users fully prevents the effect. [Yusuf Aytas notes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer. Structural barriers — weak type systems, org processes calibrated to human-speed development, lack of agent-management training — [also limit practical gains](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) regardless of model capability.

LLM engineering is not a single discipline but a stack: model training, inference infrastructure, agent harness design, retrieval architecture, and human-factors work, each with its own failure modes and tradeoffs.
