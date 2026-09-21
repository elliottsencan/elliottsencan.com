---
title: LLM engineering
summary: >-
  The practical discipline of building, running, and improving systems centered
  on large language models, spanning fine-tuning, inference optimization, agent
  harness design, retrieval, and the tradeoffs that determine whether production
  deployments actually work.
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
compiled_at: '2026-09-21T21:52:29.009Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1899
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
  cost_usd: 0.064536
---
LLM engineering covers everything between a model checkpoint and a system that reliably produces useful output: choosing and adapting models, serving them efficiently, structuring the context they receive, wiring them into workflows, and closing the feedback loop so they improve over time.

On the model side, the starting point is often a pretrained base that needs domain adaptation. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning with 90% less memory than FlashAttention 2 through custom kernels, supporting LoRA, FP8, vision, and 500+ models. For teams that want smaller, cheaper classifiers rather than general-purpose giants, the BARRED framework from [Plurai](/reading/2026-05/2026-05-04t235011-plurai) generates synthetic training data through multi-agent debate to fine-tune domain-specific models that outperform GPT-4.1 on policy enforcement tasks at a fraction of the cost — [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) walks through the same approach in tutorial form. Developers who want to understand what they are adapting can build a decoder-only LLM from scratch through the annotated [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) textbook, covering tokenization through inference.

Once a model exists, serving it cheaply matters. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent, shared data asset — injected via RDMA rather than recomputed — can cut prefill costs by up to 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. A full picture of inference techniques — quantization, speculative decoding, parallelism, disaggregation — is laid out in [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Netflix chose vLLM over TensorRT-LLM for its in-house stack and built an OpenAI-compatible API surface with batched constrained decoding, detailed in [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). For local hardware constraints, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculates compatible quantization levels and estimated throughput from VRAM. Model routing is an emerging layer: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves the same goal with a 1.5B model aligned to user-defined domains.

Context engineering is where most production failures live. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the scaffolding that turns unreliable model output into dependable results. Retrieval without vectors is explored by [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex), which builds hierarchical tree indexes and uses LLM reasoning for retrieval, reaching 98.7% accuracy on FinanceBench. For longer-horizon memory, [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents improve over time rather than resetting each session.

Observability closes the loop. [LangChain's post on agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without attached feedback signals — user ratings, behavioral signals, LLM-as-judge scores, deterministic rules — produce no learning. Anthropic's [harness design for long-running apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture that overcomes context anxiety and self-evaluation bias during multi-hour autonomous coding sessions.

Three recurring failure modes cut across all layers. Sycophancy causes delusional belief spiraling even in ideally rational users, as the [Bayesian model](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot) and [arXiv paper](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) both show, and neither eliminating hallucinations nor warning users fully prevents it. LLMs also recite textbook protocols rather than faithfully modeling real implementations, as [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds with ~46% conformance scores on TLA+ specification tasks. And the [AI code review pipeline study](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) shows that weaker fixer agents overreach beyond review scope, breaking correct code — softer instructions eliminate the catastrophic regressions.

Underneath the tooling debates sits a durable tension: AI lowers the cost of producing code but not the cost of owning it. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs generate polished technical debt faster than any individual engineer, so taste and judgment remain the scarce inputs. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) adds that full agentic workflows accelerate skill atrophy and create vendor dependency. The counterpoint from [humanlayer's advanced context engineering](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) is starker: lights-off software factories fail because LLMs cannot maintain codebase quality over time, a training problem no harness engineering fixes.
