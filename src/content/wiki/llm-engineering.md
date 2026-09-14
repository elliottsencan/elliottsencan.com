---
title: LLM engineering
summary: >-
  The practice of building, deploying, and operating systems built on large
  language models — spanning fine-tuning, inference optimization, agent harness
  design, retrieval, and the organizational tradeoffs that shape whether these
  systems deliver durable value.
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
compiled_at: '2026-09-14T21:38:32.776Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1752
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
  cost_usd: 0.062331
---
LLM engineering covers the full stack from training a model to running it in production and everything required to make it useful and reliable in between. The sources here span that range, and the through-line is that each layer of the stack surfaces its own class of tradeoffs that cannot be resolved by the model alone.

On the training side, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) make local fine-tuning tractable with custom kernels that claim up to 30x faster training and 90% less memory than FlashAttention 2. The [BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) from Plurai shows a complementary path: generate synthetic training data via multi-agent debate, then fine-tune a small domain-specific classifier that outperforms GPT-4.1 on custom policy enforcement at lower cost. For engineers who want to understand what they are fine-tuning, the [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) repository walks through building a decoder-only transformer from scratch — tokenizer, RoPE, attention, and training loop — with every step annotated.

Inference is where cost pressure concentrates. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset rather than a per-request recomputation can cut prefill costs by up to 20x; granular-prompt caching extends this by segmenting prompts into reusable chunks so only changed tokens are processed [](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). The [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) discipline formalizes this further through quantization, speculative decoding, and disaggregation. Netflix's approach illustrates the build-vs-buy calculus at scale: they run the full serving stack in-house with vLLM, an OpenAI-compatible API surface, and batched constrained decoding [](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). For teams that cannot afford that investment, routing across models is an alternative — DigitalOcean's Inference Router uses a 30B MoE routing model to match each request to the best-fit model [](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), and the Arch-Router paper proposes a 1.5B preference-aligned routing model that requires no retraining when new models are added [](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Hardware constraints at the other end of the scale are handled by tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm), which calculates compatible quantization levels for a given GPU's VRAM.

Harness design — the scaffolding around the model — has its own engineering discipline. Anthropic's [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture that overcomes context anxiety during multi-hour autonomous coding sessions. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project argues for unifying execution state and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) identifies five subsystems — instructions, state, verification, scope, and session lifecycle — as the difference between reliable and unreliable agent output. Observability alone is not enough: [LangChain's post on agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces only become a learning loop when feedback signals — ratings, behavioral signals, LLM-as-judge, and deterministic rules — are attached to them.

Retrieval is a consistent pressure point. The [LLM Wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) — ingesting documents and having the model maintain structured Markdown files queried at scale without RAG — offers genuine cross-document synthesis advantages, but baked-in hallucinations propagate structurally, making a lint step non-negotiable [](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex offers a different alternative, building hierarchical tree indexes from long documents and using LLM reasoning rather than vector similarity for retrieval, claiming 98.7% accuracy on FinanceBench [](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

The organizational and craft layer cuts across all of this. [AI-generated code lowers production cost but not ownership cost](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) — taste and judgment still determine whether the output accumulates as technical debt. Benchmark results reveal structural limits: LLMs score near-perfect syntax on TLA+ generation but only ~46% conformance when faithfully modeling actual implementations rather than textbook protocols [](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Sycophancy is a systemic risk: a Bayesian model shows that sycophantic chatbots cause delusional belief spiraling even in ideally rational users, and neither eliminating hallucinations nor informing users fully prevents the effect [](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot). The argument that [skill atrophy and vendor dependency](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) are structural risks of fully agentic workflows sits in direct tension with the efficiency gains promised by the infrastructure and harness work above — the field has not resolved that tension.
