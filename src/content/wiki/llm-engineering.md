---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building with large language models:
  training, inference optimization, agent architecture, harness design, and the
  operational tradeoffs that determine whether model capability translates into
  reliable software.
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
compiled_at: '2026-07-09T23:24:05.254Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1590
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
  cost_usd: 0.057396
---
LLM engineering is the practice of building software systems on top of large language models, from low-level training and inference optimization through agent architecture, harness design, and production observability. The sources here span that full range, and the recurring tension is between raw model capability and the engineering work needed to make that capability dependable.

On the training side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels that deliver up to 30x faster fine-tuning and 90% less memory than FlashAttention 2, making local fine-tuning practical for teams without cloud-scale budgets. For teams that want domain-specific classifiers without hand-labeled data, [BARRED](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) generates synthetic training data through multi-agent debate to produce small models that outperform GPT-4.1 on custom policy enforcement at a fraction of the cost. [Raiyan Yahya's textbook](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) works at the opposite level of abstraction, walking through every component of a decoder-only LLM from tokenizer to inference loop so engineers understand what they are actually running.

Inference optimization is increasingly its own discipline. [Gergely Orosz's breakdown](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) of inference engineering covers quantization, speculative decoding, caching, and disaggregation as first-class concerns for production serving. Two pieces from Everpure make the case for treating the KV cache as a persistent shared asset: [injecting it from fast storage via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by 20x, and [granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) reduces time-to-first-token by segmenting prompts into reusable chunks. Routing is an adjacent concern: [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) uses a 30B MoE model to match each request to the best-fit model for cost, latency, or quality, while [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) achieves similar preference-aligned routing with a compact 1.5B model.

Harness and agent architecture form the largest cluster of sources. [Anthropic's harness design writeup](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator pattern for multi-hour autonomous coding sessions. The [12-factor agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state in a single context-window-derived thread to simplify serialization, debugging, and recovery. [Walkinglabs' harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the infrastructure that turns unreliable model output into dependable results. [LangChain's observability piece](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) adds that traces alone are insufficient; attaching feedback signals to traces is what creates a learning loop across model, harness, and context layers.

Retrieval and knowledge management surface two alternative approaches to RAG. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench. The Karpathy LLM wiki pattern — described in [one practical guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [a builder's retrospective](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) — has the model compile and maintain structured Markdown files for cross-document synthesis, which is superior to RAG for curated research but propagates hallucinations structurally if the lint step is skipped.

Several sources address where LLM engineering goes wrong. [A benchmark on TLA+ generation](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds near-perfect syntax but only ~46% conformance to actual implementations, showing models recite textbook patterns rather than faithfully modeling real systems. [An Imbue experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) finds that AI review-fix pipelines cause weaker agents to overreach and break correct code. [Claude Opus 4.7 benchmarking](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) shows a non-monotonic reasoning curve where medium effort beats max on cost-efficiency, suggesting that more compute is not always the right dial to turn. And [sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) demonstrates that delusional belief spiraling can occur even in ideally rational users, a structural risk for any system that uses LLM feedback as ground truth.
