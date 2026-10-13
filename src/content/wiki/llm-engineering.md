---
title: LLM engineering
summary: >-
  The practice of building, deploying, and maintaining systems that use large
  language models — spanning fine-tuning, inference optimization, agent
  architecture, context management, and the tradeoffs that determine whether
  these systems are worth running in production.
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
compiled_at: '2026-10-13T00:18:07.755Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1863
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
  cost_usd: 0.063996
---
LLM engineering is the set of disciplines required to turn a language model from a raw capability into a working system: training or adapting the model, serving it efficiently, constructing the context it reasons over, and evaluating whether its outputs are trustworthy enough to act on.

On the model side, the range of options has widened considerably. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom kernels that reach up to 30x faster training and 90% less memory than FlashAttention 2, with LoRA and FP8 support across 500+ models, making local fine-tuning practical on consumer hardware. For teams that want a small, domain-specific classifier without building a training pipeline, [Plurai's BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data via multi-agent debate and fine-tunes models that outperform GPT-4.1 on custom policy tasks at a fraction of the cost. Anyone who wants to understand what is happening inside these models can work through [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt), a 12-chapter annotated textbook that builds a decoder-only LLM from scratch, covering tokenization, RoPE, attention, and the training loop line by line.

Inference efficiency is its own engineering surface. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) surfaces the VRAM constraints that govern which quantization levels a given GPU can support and what token throughput to expect. At the serving layer, [Everpure's KV caching work](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset — injected via RDMA rather than recomputed — cuts prefill costs by up to 20x, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable chunks so only changed tokens are processed. The [Pragmatic Engineer's breakdown of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) surveys the full toolkit: quantization, speculative decoding, parallelism, and disaggregation. Netflix's production stack [chooses vLLM over TensorRT-LLM](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) for its flexibility and maintains an OpenAI-compatible API surface with batched constrained decoding. Request routing is an emerging sub-discipline: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality, and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) shows a 1.5B model can achieve state-of-the-art preference alignment for routing without retraining when new models are added.

Context engineering has become a primary lever for output quality. The [12-factor-agents factor on unified state](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should collapse into a single context-window-derived thread, simplifying serialization, debugging, and recovery. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot by keeping data in a REPL environment and letting the model selectively pull it into token space. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% accuracy on FinanceBench. Anthropic's production analytics stack [achieved 95% automation accuracy](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) by routing Claude to canonical datasets through a semantic layer, though a [critical read of that work](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes the result depends on months of senior data engineering most teams cannot replicate.

Evaluation and observability close the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without feedback signals are inert — attaching user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules is what turns observability into a learning loop. [Benchmarking Claude Opus 4.7 across reasoning-effort levels](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds near-perfect syntax scores on TLA+ generation but only \~46% conformance, showing that models recite textbook protocols rather than faithfully modeling actual implementations.

Several sources raise structural concerns that sit underneath all of this. Sycophancy research shows that even ideally rational users spiral into delusional beliefs when a chatbot consistently validates them — neither eliminating hallucinations nor warning users of sycophancy fully prevents the effect. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) observes that AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer. [HumanLayer's critique of lights-off software factories](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, arguing that LLMs cannot maintain codebase quality over time due to a fundamental training limitation that harness engineering cannot fix. These concerns do not invalidate LLM engineering as a discipline, but they locate the ceiling: the engineering scaffolding can be excellent while the model's underlying reliability on novel or complex tasks remains bounded.
