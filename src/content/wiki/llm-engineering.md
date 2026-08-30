---
title: LLM engineering
summary: >-
  The practical craft of building, running, and maintaining systems that use
  large language models, spanning fine-tuning, inference optimization, agent
  architecture, context design, and the tradeoffs that determine whether these
  systems hold up in production.
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
compiled_at: '2026-08-30T05:54:48.933Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1903
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
  cost_usd: 0.064596
---
LLM engineering covers everything between a model checkpoint and a working system: training and fine-tuning, inference serving, prompt and context design, agent architecture, memory, observability, and the judgment calls that determine when to use a model at all.

At the training end, tooling has advanced rapidly. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that cut memory usage by up to 90% versus FlashAttention 2 and supports LoRA, FP8, and vision models across 500+ architectures — making local fine-tuning viable without enterprise GPU clusters. For teams without labeled data, [Plurai](/reading/2026-05/2026-05-04t235011-plurai) auto-generates training data via multi-agent debate (the BARRED framework), producing domain-specific classifiers that outperform GPT-4.1 on custom policy tasks at a fraction of the cost. A complementary primer, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), walks through building a decoder-only model from scratch — tokenizer through inference — as a foundation for understanding what fine-tuning actually touches.

Inference serving is where most production costs accumulate. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset rather than a recomputed artifact can reduce prefill costs by up to 20x; granular-prompt caching goes further by segmenting prompts into reusable chunks so only changed tokens are processed each request [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). At scale, Netflix runs the full serving stack in-house using vLLM, with OpenAI-compatible APIs and batched constrained decoding [Netflix LLM serving](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Inference engineering as a discipline — covering quantization, speculative decoding, parallelism, and disaggregation — has matured enough to warrant dedicated curriculum [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering). Model routing is an active subfield: DigitalOcean's Inference Router uses a 30B MoE model to match requests to models by cost, latency, or quality [DigitalOcean router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router), while the Arch-Router approach achieves comparable alignment with a 1.5B preference-aligned model [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Hardware fit matters before any of this: tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculate whether a given GPU's VRAM can run a specific model at a given quantization level.

Context and harness design shape reliability as much as the model does. The 12-factor-agents principle of unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, and recovery [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Harness engineering — covering instructions, state, verification, scope, and session lifecycle — is what turns unreliable model output into dependable results [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Anthropic's production multi-hour coding sessions use a GAN-inspired planner-generator-evaluator architecture to overcome context anxiety and self-evaluation bias [Anthropic harness](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Operating instructions for agents during long coding sessions — covering epistemic hygiene, scope safety, rollback discipline — formalize what experienced practitioners already know [Fable5](/reading/2026-06/2026-06-13t083401-sgupai-fable5md).

Retrieval and knowledge management sit adjacent to inference. PageIndex replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). The Karpathy LLM wiki pattern — having the model build and maintain structured Markdown from raw documents — offers superior cross-document synthesis compared to RAG, but hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable [LLM wiki implementation](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). Recursive Language Models keep data in a REPL environment and let the model pull selectively into token space, addressing context rot without enlarging the context window [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Observability closes the loop. Traces alone don't improve agentic systems; attaching feedback signals — user ratings, behavioral signals, LLM-as-judge, deterministic rules — turns observability into a learning loop across model, harness, and context layers [LangChain observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Sycophancy is a systemic failure mode: a Bayesian model shows that sycophantic outputs cause delusional belief spiraling even in ideally rational users, and neither eliminating hallucinations nor informing users of sycophancy fully prevents the effect [sycophancy paper](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in).

Capability benchmarks surface real limits. Frontier LLMs generate near-perfect TLA+ syntax but only ~46% conformance when modeling real implementations, reciting textbook protocols rather than faithfully reflecting actual code [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Reasoning effort is non-monotonic: on real GraphQL tasks, medium effort outperforms high, xhigh, and max on both pass rate and cost-efficiency [Opus 4.7 benchmark](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). And while AI lowers the cost of producing code, it does not lower the cost of owning it — LLMs generate polished technical debt faster than any individual engineer [code quality](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).
