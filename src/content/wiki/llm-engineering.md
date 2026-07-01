---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building with large language models —
  from architecture and fine-tuning to inference optimization, agent harness
  design, and the judgment calls that determine whether deployed systems remain
  useful and trustworthy.
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
compiled_at: '2026-07-01T00:39:18.604Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1640
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
  cost_usd: 0.058146
---
LLM engineering has expanded far beyond prompt crafting into a discipline that touches model internals, serving infrastructure, agent architecture, knowledge retrieval, and the human practices that keep systems reliable over time.

At the model layer, engineers can now fine-tune open-weight models locally with tools like [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth), which delivers up to 30x faster training and 90% less memory than FlashAttention 2 through custom kernels and LoRA support. For developers who want to understand what they are running, a 12-chapter annotated textbook walks through building a decoder-only LLM from scratch — tokenizer, RoPE, attention, training loop, and inference engine — in plain Python [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt). Knowing whether a given GPU can even run a chosen model is its own practical problem; tools like [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) calculate VRAM requirements across quantization levels before any code is written.

Fine-tuning does not always require labeled data. The BARRED framework from Plurai generates synthetic training data through multi-agent debate to produce domain-specific classifiers that outperform GPT-4.1 on custom tasks at significantly lower cost [vibe-training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your). Plurai's platform automates the full evaluation and guardrail model pipeline in minutes, with sub-100ms latency [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

Inference cost is a persistent engineering concern. KV caching treated as a persistent shared asset — injected from fast storage via RDMA rather than recomputed per request — can cut prefill costs by up to 20x [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Granular-prompt caching goes further by segmenting prompts into reusable chunks so only changed tokens are processed [Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). At the serving layer, inference engineering encompasses quantization, speculative decoding, parallelism, and disaggregation [inference engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering), while LLM routing systems like DigitalOcean's Inference Router [DO router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router) and the Arch-Router model [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences) automatically match each request to the best-fit model for cost, latency, or quality.

Retrieval is another contested design space. Standard vector RAG has real limits; PageIndex builds hierarchical tree indexes and uses LLM reasoning rather than vector similarity, achieving 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Karpathy's LLM wiki pattern takes a different direction entirely: the model maintains structured Markdown files synthesized from source documents, enabling cross-document retrieval without vectors — though hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable [LLM wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways).

Agent harness design has emerged as its own engineering subdomain. Anthropic's GAN-inspired planner-generator-evaluator architecture overcomes context anxiety and self-evaluation bias in multi-hour autonomous coding sessions [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The 12-factor-agents project argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, debugging, and recovery [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). A companion course on harness engineering covers the five subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results [harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

Observability closes the loop. Traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns monitoring into a learning loop [agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Recursive Language Models keep data in a REPL environment and let the model selectively pull it into token space, and their emergent traces can be mined to design lower-latency agents [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Two recurring tensions run through all of this. First, more compute is not always better: benchmarking Claude Opus 4.7 across five reasoning-effort levels found a non-monotonic curve where medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality [reasoning curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning). Second, AI lowers the cost of producing code but not the cost of owning it — taste and judgment still determine whether fast generation produces value or polished technical debt [code quality](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).
