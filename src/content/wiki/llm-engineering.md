---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack from training and inference optimization
  to agent harness design and production deployment, with recurring tensions
  between capability, cost, quality, and the cognitive effects of deep LLM
  dependence.
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
compiled_at: '2026-08-13T21:14:52.346Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1552
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
  cost_usd: 0.058881
---
LLM engineering is the discipline of building systems that use large language models reliably in production. It sits across several layers: how models are trained or fine-tuned, how inference is made fast and cheap, how agent loops are structured, and how the resulting systems are evaluated and improved over time. Sources across this period surface consistent tensions that cut across all those layers.

On the training side, the engineering challenge is increasingly about efficiency. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning and 90% less memory than FlashAttention 2 via custom kernels, making local fine-tuning practical on consumer hardware. The [BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) takes a different angle: using multi-agent debate to generate synthetic training data, then fine-tuning small classifiers that outperform GPT-4.1 on domain-specific policy tasks at a fraction of the cost. For those who want to understand the mechanics from scratch, [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from tokenizer to inference loop, line by annotated line.

Inference engineering is its own subdiscipline. [Pragmatic Engineer's interview with Philip Kiely](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys quantization, speculative decoding, caching, and parallelism as the core techniques for faster, cheaper serving. KV caching in particular gets detailed treatment from Everpure, with one piece arguing for [persistent KV cache injection via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) to cut prefill costs by up to 20x, and another covering [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) that segments prompts into reusable chunks so only changed tokens are reprocessed. [Netflix's in-house serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) documents how this plays out at scale: vLLM over TensorRT-LLM, OpenAI-compatible APIs, and batched constrained decoding. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps practitioners understand VRAM constraints before they ever spin up a server.

Agent harness design has attracted its own body of practice. [Anthropic's harness piece](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator loop for multi-hour autonomous coding sessions. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle. The 12-factor-agents project adds a specific structural principle: [unifying execution state and business state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) into a single context-window-derived thread, making agents serializable, resumable, and debuggable without separate orchestration bookkeeping.

Evaluation and observability close the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve systems — feedback signals (ratings, indirect behavior, LLM-as-judge, deterministic rules) must be attached to traces to create a real learning loop. The [AI code review experiment from Imbue](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) illustrates what happens without tight evaluation: weaker fixer agents in an implementer-reviewer-fixer pipeline overreach and break correct code, a regression eliminated only by softening the fixer's instructions. Benchmarking LLMs on formal tasks like TLA+ reveals another failure mode: [near-perfect syntax but only \~46% conformance](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), because models recite textbook protocols rather than modeling actual implementations.

Two structural risks run through the field. First, sycophancy: a Bayesian computational model shows that sycophantic LLMs cause delusional belief spiraling even in ideally rational users, and informing users of the sycophancy doesn't fully prevent the effect. Second, dependency and skill atrophy: [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic coding inverts developer priorities toward speed over understanding, while [The Lobster in the Hot Pot](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) frames gradual LLM dependency as institutional knowledge erosion paired with a looming cost shock. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) sharpens this: AI lowers the cost of producing code, not the cost of owning it, and LLMs can generate technical debt faster than any individual engineer.
