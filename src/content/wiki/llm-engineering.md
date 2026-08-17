---
title: LLM engineering
summary: >-
  The practice of building, deploying, and operating large language models in
  production — spanning fine-tuning, inference optimization, agent harness
  design, context management, and the tradeoffs that emerge when LLMs move from
  demos into real systems.
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
compiled_at: '2026-08-17T18:46:57.576Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 2048
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
  cost_usd: 0.066321
---
LLM engineering sits at the intersection of machine learning practice and software engineering discipline. It covers how models are trained and adapted, how they are served efficiently, how they are embedded in larger systems, and what breaks when you push them into production.

On the training and adaptation side, the surface area is wide. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning and 90% lower memory usage than FlashAttention 2, making local LoRA runs practical on consumer hardware. [Raiyan Yahya's textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks developers through building a decoder-only GPT from scratch, covering tokenization, RoPE, attention, and the training loop. At the applied end, the BARRED framework described by [Nir Diamant](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent debate to generate synthetic training data, enabling small domain-specific classifiers to outperform GPT-4.1 on custom policy tasks at a fraction of the cost. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates the same pipeline — data generation, validation, and guardrail deployment — with sub-100ms latency and claimed 8x cost reduction over GPT-as-judge.

Inference is where engineering costs concentrate. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x when the cache is treated as a persistent shared asset injected via RDMA rather than recomputed per request. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed, reducing time-to-first-token for RAG workloads. Routing is an adjacent lever: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match requests to the best-fit model for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar routing with a compact 1.5B model aligned to user-defined preferences. [Netflix's in-house LLM serving stack](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) chose vLLM over TensorRT-LLM and built a full OpenAI-compatible API surface with batched constrained decoding at scale. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the hardware-sizing problem directly, calculating VRAM requirements and compatible quantization levels for specific models. Inference engineering as a discipline is formally described in [The Pragmatic Engineer's overview](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering), covering quantization, speculative decoding, caching, parallelism, and disaggregation.

Harness and agent design is where LLM engineering diverges most sharply from classical software engineering. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization and recovery. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results. Observability without feedback loops is inert: [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that attaching feedback signals to traces is what turns monitoring into a learning loop.

Context and retrieval design are recurring problems. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench. The Karpathy LLM wiki pattern — having the model maintain structured Markdown files queried at scale — offers cross-document synthesis that [one builder found genuinely superior to RAG](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), though hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) sidestep context rot by keeping data in a REPL environment and pulling it selectively into token space.

Several sources surface failure modes that scale with adoption. Sycophancy causes [delusional belief spiraling even in ideally rational users](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in), and neither eliminating hallucinations nor disclosing sycophancy fully prevents the effect. AI lowers the cost of producing code but [not the cost of owning it](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter); LLMs generate polished technical debt faster than any individual engineer. Benchmark results are similarly unreliable anchors: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds frontier models score near-perfect on TLA+ syntax but only ~46% on conformance and ~41% on invariant correctness, because models recite textbook protocols rather than modeling actual implementations. A benchmark of Claude Opus 4.7's reasoning-effort levels finds a [non-monotonic curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning): medium effort wins on pass rate and cost-efficiency; higher settings spend more without improving quality.

The discipline is still negotiating its own scope. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows accelerate skill atrophy and create vendor dependency. [Aiyan](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat) argues teams should skip custom orchestration and invest in MCP tool servers and domain APIs instead. [HumanLayer's analysis](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, arguing lights-off software factories fail because no amount of harness engineering fixes a fundamental training limitation. These positions share a common underlying observation: the scarce resource in LLM engineering is not model capability but the judgment applied to structuring, constraining, and verifying what models produce.
