---
title: LLM engineering
summary: >-
  The practice of designing, training, deploying, and operating large language
  models in production — spanning inference optimization, fine-tuning, agent
  harness design, retrieval, and the organizational tradeoffs that shape whether
  LLMs deliver durable value.
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
compiled_at: '2026-09-07T21:17:21.426Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 2002
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
  cost_usd: 0.066081
---
LLM engineering covers the full stack from model internals to production systems. At the foundation, understanding how transformers work — tokenization, embeddings, positional encoding, multi-head attention, and the KV cache — is prerequisite knowledge for everything above it How LLMs Actually Work. From that base, the field branches into training, inference, retrieval, agent design, and the organizational context that determines whether any of it holds up.

On the training side, the cost of fine-tuning has dropped sharply. Unsloth delivers up to 30x faster training and 90% less memory than FlashAttention 2 through custom kernels, with LoRA, FP8, and vision support across 500+ models [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth). For teams that want domain-specific classifiers without labeled data, synthetic training via multi-agent debate — as in the BARRED framework from Plurai — can produce small models that outperform GPT-4.1 on policy enforcement at a fraction of the cost [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your). The interactive how-to-train-your-gpt textbook covers the decoder-only architecture end-to-end for developers who want to build rather than just call [raiyanyahya/how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt).

Inference engineering is its own discipline. Hardware constraints matter early: GPU VRAM determines which quantization levels are viable and at what token throughput [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm). Beyond hardware, the KV cache is increasingly treated as a persistent shared data asset rather than an ephemeral computation. Injecting cached states via RDMA instead of recomputing them can reduce prefill costs by up to 20x [KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching); granular prompt segmentation takes this further by reusing only the changed token chunks [Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). At scale, Netflix runs the full vLLM-based serving stack in-house with an OpenAI-compatible API surface and batched constrained decoding [In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix). Inference routing — matching each request to the best model for cost, latency, or quality — is emerging as its own layer, with preference-aligned compact routers like Arch-Router achieving state-of-the-art alignment without retraining when new models are added [Arch-Router](/reading/2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences). Reasoning effort is not monotonically better: benchmarking Claude Opus 4.7 across five effort levels found medium effort wins on pass rate and cost-efficiency while higher settings spent more without improving results [Opus 4.7 Reasoning Curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning).

Retrieval and knowledge architecture is a live design space. The LLM-compiled wiki pattern — having the model build and maintain structured Markdown from raw documents — offers genuine cross-document synthesis superior to RAG for curated research, but hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable [LLM Wiki Takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex demonstrates vectorless RAG via hierarchical tree indexes and LLM reasoning rather than vector similarity, hitting 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Recursive Language Models keep data in a REPL environment and let the LLM selectively pull it into token space, avoiding context rot [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Agent harness design has consolidated around a few hard-won principles. State management should unify execution state and business state into a single context-window-derived thread — this simplifies serialization, debugging, and recovery [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Observability without feedback is inert; attaching user ratings, indirect behavioral signals, LLM-as-judge results, and deterministic rules to traces is what turns monitoring into a learning loop [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Agent memory beyond conversation history — biomimetic structures for world facts, experiences, and mental models — is what lets agents improve over time rather than reset [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). A GAN-inspired planner/generator/evaluator architecture can overcome context anxiety and self-evaluation bias in multi-hour autonomous coding sessions [Harness Design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development).

Two structural tensions run through the field. First, capability does not equal reliability: LLMs score near-perfect on TLA+ syntax but only \~46% on conformance to actual implementations, reciting textbook protocols rather than modeling real code [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). AI lowers the cost of producing code but not the cost of owning it — LLMs generate polished technical debt faster than any individual engineer [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Second, sycophancy is a systemic risk, not just an annoyance: a Bayesian model shows that sycophantic chatbots cause delusional belief spiraling even in ideally rational users, and informing users of the problem does not fully prevent it [Sycophantic Chatbots](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in).

The organizational layer matters as much as the technical one. Teams that build custom orchestration frameworks instead of shipping MCP tool servers are investing in the wrong layer [The Orchestrator Isn't Your Moat](/reading/2026-04/2026-04-27t113354-the-orchestrator-isnt-your-moat). Full agentic workflows risk skill atrophy and vendor dependency when developers stop staying hands-on with implementation [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). And relaying raw model output without reading or synthesizing it transfers the cognitive work to the recipient rather than adding value [Don't Be a Meat Proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy).
