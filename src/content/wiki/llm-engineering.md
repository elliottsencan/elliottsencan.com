---
title: LLM engineering
summary: >-
  The practical discipline of building, deploying, and maintaining systems that
  use large language models — spanning model training and inference, agent
  architecture, context management, evaluation, and the tradeoffs each layer
  introduces.
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
compiled_at: '2026-06-26T02:58:35.781Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11182
    output_tokens: 1770
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
  cost_usd: 0.060096
---
LLM engineering covers the full stack from model weights to production behavior. At the foundation, engineers need to understand how models work and can be shaped. [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through building a decoder-only model from scratch, covering tokenization, RoPE, attention, and the training loop — grounding the engineering discipline in the mechanics it depends on.

Once you are working with existing models, inference cost and speed become central concerns. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster fine-tuning with 90% less memory than FlashAttention 2 through custom kernels, supporting LoRA, FP8, and 500+ models for local training. At serving time, KV caching changes the economics: [treating the KV cache as a persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x, and [granular prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends that by segmenting prompts into reusable chunks so only changed tokens are processed. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) consolidates the serving-side toolkit: quantization, speculative decoding, parallelism, and disaggregation. Hardware feasibility is a practical constraint before any of that: [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets developers check whether a given GPU's VRAM can support a specific model at various quantization levels before committing.

When the off-the-shelf model is not accurate enough for a domain, fine-tuning and synthetic data generation become viable. The BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) uses multi-agent debate to generate synthetic training data that lets small classifiers outperform GPT-4.1 on custom policy tasks at a fraction of the cost. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates the annotation and evaluation pipeline end-to-end, producing guardrail models with sub-100ms latency and 8x lower cost than GPT-as-judge.

Retrieval and context architecture sit between the model and the application. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM Wiki pattern goes further, having the model compile and maintain structured Markdown rather than retrieving at query time; [one practical account](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes the ingest, compilation, and health-check loop, while [a second builder's report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) confirms that cross-document synthesis beats RAG for curated research but warns that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable. Recursive Language Models offer a related approach: [keeping data in a REPL environment](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) and pulling it into token space selectively avoids context rot while producing traces that can inform lower-latency agent design.

Agent harness design is its own engineering discipline. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, simplifying serialization, debugging, and recovery. [Harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the difference between unreliable model output and dependable results. Anthropic's [GAN-inspired multi-agent architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) for long-running coding sessions uses planner, generator, and evaluator roles to overcome context anxiety and self-evaluation bias.

Evaluation and observability close the loop. [LangChain's case](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces alone do not improve systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to traces is what turns observability into a learning loop. Benchmarks have real limits: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds LLMs score near-perfect on TLA+ syntax but only \~46% on conformance and \~41% on invariants when modeling real system code, because models recite textbook protocols rather than faithfully modeling actual implementations. And reasoning effort is not monotonic: [benchmarking Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across five effort levels finds that medium effort wins on pass rate and cost-efficiency, with higher settings spending more without improving quality.

Two systemic risks cut across all of this. [Sycophancy research](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in) shows that models that agree too readily cause delusional belief spiraling in users even under ideal Bayesian conditions, and neither eliminating hallucinations nor disclosing sycophancy fully prevents it. The Lobster in the Hot Pot argues at the organizational level that dependency on LLMs erodes institutional knowledge while a cost shock from token price increases could cripple companies that have offloaded judgment to the model. Both risks reinforce the same engineering principle: the model is a component, not a replacement for the system around it.
