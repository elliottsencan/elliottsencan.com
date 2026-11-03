---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building, serving, and operating
  language model systems — from fine-tuning and inference optimization to agent
  harness design, memory, and the organizational tradeoffs that shape whether
  models deliver real value.
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
aliases:
  - machine-learning
compiled_at: '2026-11-03T00:40:21.074Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 2023
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
  cost_usd: 0.066396
---
LLM engineering has matured from prompt experimentation into a discipline with distinct layers: model training and fine-tuning, inference serving, agent harness design, memory and state management, retrieval architecture, and observability. Each layer carries its own tradeoffs, and decisions in one layer propagate constraints up and down the stack.

At the model layer, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that reduce fine-tuning memory by 90% and accelerate training up to 30x over FlashAttention 2, making local fine-tuning viable on consumer hardware. For practitioners who want to understand what they are fine-tuning, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch, covering tokenization, RoPE, attention, and inference in annotated Python. Fine-tuning does not require large labeled datasets: [BARRED](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your), a framework from Plurai, generates synthetic training data through multi-agent debate to produce small domain-specific classifiers that outperform GPT-4.1 on policy enforcement tasks at a fraction of the cost, and [Plurai's platform](/reading/2026-05/2026-05-04t235011-plurai) extends this with automated data generation, validation, and sub-100ms guardrail deployment without annotation pipelines.

Inference serving is its own engineering problem. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) surfaces VRAM constraints, quantization compatibility, and estimated throughput for open-weight models, making hardware planning concrete. At scale, Netflix runs vLLM over TensorRT-LLM with an OpenAI-compatible surface and batched constrained decoding [in-house](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). KV cache management is a major cost lever: treating the cache as a persistent shared asset injected via RDMA can [cut prefill costs by 20x](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and granular-prompt caching that segments prompts into reusable chunks [reduces time-to-first-token](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) further. The [Pragmatic Engineer's inference engineering overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) covers quantization, speculative decoding, parallelism, and disaggregation as the standard toolkit. LLM routing adds another dimension: DigitalOcean's Inference Router uses a [30B MoE routing model](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) to match requests to models by cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar alignment with a compact 1.5B model trained on human preferences.

Agent harness design is where LLM engineering diverges most sharply from classical software engineering. Anthropic's production harness for long-running coding sessions uses a [planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that overcomes context anxiety and self-evaluation bias. The [walkinglabs harness course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five subsystems: instructions, state, verification, scope, and session lifecycle. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery. Recursive Language Models take a complementary approach by [keeping data in a REPL environment](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) and letting the LLM pull selectively into token space, avoiding context rot. Operating instructions for agents during long coding sessions, such as [sgup's Fable5](/reading/2026-06/2026-06-13t083401-sgupai-fable5md), codify epistemic hygiene, rollback discipline, and scope safety as non-negotiable runtime rules.

Retreval and memory sit between the model and the harness. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% accuracy on FinanceBench. [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) ingests documents and has the model maintain structured Markdown files for query at scale without RAG; cross-document synthesis outperforms RAG for curated research, [but hallucinations baked in at ingest propagate structurally](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), making a lint step mandatory. The [Hindsight agent memory system](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes further by building biomimetic structures for world facts, experiences, and mental models so agents improve over time.

Observability closes the loop. LangChain's Harrison Chase argues that [traces alone do not improve agentic systems](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning); attaching feedback signals from user ratings, indirect behavior, LLM-as-judge, and deterministic rules is what turns tracing into a learning loop. Sycophancy is a specific failure mode: a Bayesian model shows that [sycophantic chatbots cause delusional belief spiraling](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) even in rational users, a risk that observability pipelines need to surface rather than paper over.

Across the stack, two tensions recur. One is the build-versus-delegate question: [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should ship MCP tool servers rather than custom orchestration loops, while [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic delegation accelerates skill atrophy and vendor lock-in. The other is the quality problem: AI lowers the cost of producing code but [not the cost of owning it](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter), and [lights-off software factories fail](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) because LLMs cannot maintain codebase quality over time without human judgment anchoring the loop.
