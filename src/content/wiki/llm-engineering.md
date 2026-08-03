---
title: LLM engineering
summary: >-
  The practice of building, running, and maintaining systems that use large
  language models — spanning model training, inference optimization, agent
  harness design, knowledge retrieval, and the practical tradeoffs that emerge
  when LLMs run at production scale.
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
aliases:
  - machine-learning
compiled_at: '2026-08-03T10:08:41.405Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1842
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
  cost_usd: 0.063231
---
LLM engineering sits at the intersection of model-level work and systems-level work. On the model side, practitioners train and fine-tune models, optimize inference, and manage the compute constraints that govern what can run where. On the systems side, they design harnesses, context pipelines, routing layers, and feedback loops that make model outputs useful and reliable.

At the model end of the spectrum, the options range from training from scratch to targeted fine-tuning. [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through every layer of a decoder-only transformer, making it possible to understand what is actually being optimized. For practitioners who want domain-specific behavior without that overhead, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning and 90% less memory than FlashAttention 2 via custom kernels. Fine-tuning does not always require labeled data: [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) introduces BARRED, a framework from Plurai that generates synthetic training data through multi-agent debate, producing small classifiers that outperform GPT-4.1 on custom policy tasks at a fraction of the cost.

Inference is where most production cost lives. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps practitioners match models to available VRAM before deployment. Once deployed, the KV cache is the primary lever for reducing prefill costs: treating it as a persistent, shared asset injected via RDMA rather than recomputed can cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), and granular-prompt caching that segments prompts into reusable chunks reduces time-to-first-token further [Maximizing LLM Efficiency](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). At scale, organizations like Netflix run the full stack in-house using vLLM with an OpenAI-compatible surface [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix), while routing layers can automatically match each request to the best-fit model for cost or latency tradeoffs [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences).

Harness design determines whether a capable model produces reliable outputs. The five harness subsystems — instructions, state, verification, scope, and session lifecycle — are what turn unreliable model output into dependable results [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Anthropic's production harness for long-running coding sessions uses a GAN-inspired planner/generator/evaluator loop to overcome context anxiety and self-evaluation bias [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The 12-factor-agents pattern goes further, arguing that execution state and business state should be unified into a single context-window-derived thread, which simplifies serialization, debugging, and recovery [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Knowledge retrieval inside LLM systems has split into competing approaches. Traditional vector-based RAG is challenged by PageIndex, which builds hierarchical tree indexes and uses LLM reasoning rather than vector similarity, achieving 98.7% accuracy on FinanceBench [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Karpathy's LLM-compiled wiki pattern skips retrieval entirely for curated research by having the model maintain structured Markdown files — though hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). Recursive Language Models keep data in a REPL environment and let the model pull selectively into token space, beating context rot and producing traces that can be mined to design lower-latency agents [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Observability and feedback close the loop. Traces alone do not improve agentic systems; attaching feedback signals — user ratings, LLM-as-judge, deterministic rules — is what turns observability into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Sycophancy is a failure mode that compounds: even ideally rational users spiral into delusional belief when models consistently agree with them, and neither eliminating hallucinations nor warning users fully prevents the effect [Sycophantic Chatbots Cause Delusional Spiraling](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in).

The field also produces sobering calibration results. LLMs score near-perfect on TLA+ syntax but only ~46% conformance when asked to model real system code, revealing a pattern of reciting textbook protocols rather than faithfully modeling actual implementations [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Benchmark results for reasoning effort are non-monotonic: on real GraphQL tasks, medium effort outperforms higher settings on pass rate and cost-efficiency, making calibration an active engineering concern rather than a dial to max out [Opus 4.7 reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). AI lowers the cost of producing code but not the cost of owning it; LLMs can generate polished technical debt faster than any individual engineer [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). These calibration problems mean that judgment about when and how to apply LLM capabilities remains the irreducible engineering skill.
