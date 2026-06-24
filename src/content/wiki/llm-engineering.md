---
title: LLM engineering
summary: >-
  LLM engineering covers the full stack of building, running, and operating
  systems powered by large language models — from fine-tuning and inference
  optimization to agent harness design, state management, and feedback loops.
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
compiled_at: '2026-06-24T06:33:10.386Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1702
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
  cost_usd: 0.059076
---
LLM engineering spans the gap between a raw language model and a production system. That gap is wider than it looks, and the sources here collectively trace its main fault lines: compute constraints, orchestration philosophy, inference economics, harness design, training shortcuts, and the underappreciated costs of ownership.

On the compute side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers fine-tuning with custom kernels that deliver up to 30x faster training and 90% less memory than FlashAttention 2 — a meaningful shift for teams that want to train or adapt models locally. Before committing to a model at all, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) gives a quick VRAM feasibility check across quantization levels and expected throughput, which matters when hardware is the binding constraint.

Once a model is running, inference cost dominates. Two Everpure posts argue that the KV cache deserves first-class treatment: [cutting prefill costs by injecting cached KV state via RDMA](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) rather than recomputing, and [granular-prompt caching that segments prompts into reusable chunks](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) so only changed tokens hit the GPU. The [Pragmatic Engineer's breakdown of inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) formalizes these concerns into a discipline covering quantization, speculative decoding, caching, and disaggregation. At the routing layer, [DigitalOcean's Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) both show that automatic model selection — routing requests by cost, latency, or quality — is becoming infrastructure rather than a product differentiator.

At the application layer, harness design determines whether model output is reliable enough to ship. [Anthropic's multi-agent harness](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) uses a GAN-inspired planner-generator-evaluator architecture to sustain multi-hour autonomous coding sessions. The [walkinglabs course on harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) breaks this down into five subsystems: instructions, state, verification, scope, and session lifecycle. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for collapsing execution state and business state into a single context-window-derived thread — simpler serialization, easier debugging, and clean recovery from any checkpoint.

Feedback closes the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is direct: traces alone don't improve agentic systems; attaching feedback signals — user ratings, LLM-as-judge scores, deterministic rules — is what turns observability into learning. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) extends this to persistent biomimetic memory structures so agents accumulate world facts and mental models rather than resetting every session.

For smaller, domain-specific needs, synthetic training data is closing the gap with frontier models. The [BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent debate to generate training data that fine-tunes classifiers outperforming GPT-4.1 on custom policy tasks. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates evaluation and guardrail model deployment with sub-100ms latency at a fraction of GPT-as-judge cost. For teams that want to understand the underlying mechanics, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only LLM from scratch.

Several sources push back on naive deployment. [Benchmarking Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) finds a non-monotonic reasoning curve: medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality. [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds LLMs produce near-perfect TLA+ syntax but only ~46% conformance — they recite textbook protocols rather than modeling actual implementations. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that models tuned for agreement cause belief spiraling even in rational users, and that transparency disclosures don't fully prevent it.

Ownership cost threads through everything. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers production cost but not maintenance cost — LLMs can generate technical debt faster than any individual engineer. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows accelerate skill atrophy and create vendor dependency. [The Lobster in the Hot Pot](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) frames gradual LLM adoption as eroding institutional knowledge while infrastructure costs remain exposed to token price shocks. These concerns don't argue against LLM engineering; they define where the real engineering work is.
