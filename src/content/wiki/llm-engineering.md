---
title: LLM engineering
summary: >-
  The practical discipline of building, optimizing, and operating systems around
  large language models — spanning training, inference, agent architecture,
  evaluation, and the craft judgments that determine whether those systems
  actually work in production.
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
compiled_at: '2026-07-09T14:14:45.207Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1801
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
  cost_usd: 0.060561
---
LLM engineering covers the full stack between a model's weights and a working product: how models are trained and fine-tuned, how inference is made fast and cheap, how agents are structured and observed, and how quality is maintained as AI-generated output scales.

On the training side, the range runs from building a decoder-only model from scratch to efficient adaptation of existing ones. [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through tokenization, RoPE, attention, and training loops in annotated Python, giving practitioners a working mental model of what they are adapting. Once that foundation exists, tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) make fine-tuning practical on consumer hardware, delivering up to 30x faster training and 90% less memory than FlashAttention 2 through custom kernels with LoRA and FP8 support. The [BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) from Plurai takes fine-tuning further by using multi-agent debate to generate synthetic training data, producing small domain-specific classifiers that outperform GPT-4.1 on policy enforcement at a fraction of the cost.

Inference engineering is its own discipline. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset — injected via RDMA rather than recomputed per request — can reduce prefill costs by up to 20x. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. At the routing layer, systems like [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) use a live-data ranking engine and a 30B MoE model to match each request to the best-fit model for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves preference-aligned routing with a compact 1.5B model. GPU compatibility planning tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) make these decisions concrete for local deployments. The broader shape of inference engineering — quantization, speculative decoding, parallelism, disaggregation — is mapped in [What is Inference Engineering?](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering).

Agent architecture produces its own engineering challenges. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making serialization, debugging, and recovery trivial. [Harness design](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes the five subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results. Anthropic's own production work describes a [GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) for multi-hour autonomous coding sessions. The [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) agent memory system goes further by building biomimetic memory structures so agents accumulate knowledge over time rather than resetting each session.

Evaluation and observability close the loop. [LangChain's framing](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is direct: traces alone don't improve systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what creates a learning loop. Benchmarks expose hard limits: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds LLMs score near-perfect on TLA+ syntax but only ~46% on conformance, because models recite textbook protocols rather than modeling actual implementations. An [Opus 4.7 reasoning-effort benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while max effort spends more without improving quality.

Several sources flag craft and judgment as non-negotiable regardless of tooling. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) warns that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) makes the asymmetry precise: AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer. [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) pushes teams to invest in domain context and unique APIs rather than custom orchestration frameworks. The structural barriers to effective AI use — weak type systems, org processes built for human-speed development, lack of agent-management training — are catalogued in [Why Most Developers Can't Use AI Effectively](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively). Sycophancy compounds these risks: [research on delusional spiraling](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that even ideally rational users drift toward false beliefs when models systematically agree with them, making epistemic hygiene in agent instructions — as formalized in [Fable5.md](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) — an engineering concern, not just a behavioral one.
