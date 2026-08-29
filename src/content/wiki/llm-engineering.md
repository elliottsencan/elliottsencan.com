---
title: LLM engineering
summary: >-
  LLM engineering covers the practices, architectures, and tradeoffs involved in
  building, fine-tuning, deploying, and operating large language models in
  production — from inference optimization and harness design to the human and
  organizational costs of dependence.
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
compiled_at: '2026-08-29T20:17:49.101Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11867
    output_tokens: 1701
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
  cost_usd: 0.061116
---
LLM engineering spans a wide surface: training and fine-tuning models, designing the harnesses and orchestration layers that wrap them, optimizing inference costs, and managing the longer-term consequences of integrating LLMs into real workflows. The sources here pull in several directions that are worth holding together.

On the model side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) shows how custom kernels and LoRA adapters can reduce training memory by 90% and speed it up 30x compared to FlashAttention 2, making local fine-tuning practical for teams without data-center budgets. [Nir Diamant's BARRED framework](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) takes this further: using multi-agent debate to synthesize synthetic training data, small domain-specific classifiers can outperform GPT-4.1 on custom policy tasks at a fraction of the cost, a point reinforced by [Plurai's tooling](/reading/2026-05/2026-05-04t235011-plurai) that automates dataset generation and evaluation model deployment with sub-100ms latency. For developers who want to understand what they are building on, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through a decoder-only LLM from tokenizer through inference loop with every line annotated.

Inference optimization is its own discipline. [Everpure's KV caching work](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset injected via RDMA rather than recomputed per request can cut prefill costs by up to 20x. Their [granular-prompt caching extension](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) segments prompts into reusable chunks so only changed tokens are processed. [The Pragmatic Engineer's inference engineering explainer](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames quantization, speculative decoding, and disaggregation as the standard toolkit, and [Netflix's in-house LLM serving writeup](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix) shows what that looks like at scale: vLLM over TensorRT-LLM, OpenAI-compatible APIs, and batched constrained decoding. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) addresses the entry-level version of the same problem — matching model size and quantization level to available VRAM before you even start.

Harness and agent architecture is where the most active engineering debate lives. [Anthropic's harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator loop that runs multi-hour autonomous coding sessions. [12-factor-agents' factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution and business state into a single context-window-derived thread to simplify serialization, debugging, and recovery. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) catalogs the five harness subsystems — instructions, state, verification, scope, and session lifecycle — that make model output dependable. Against these constructive accounts, [Dex Horthy at HumanLayer](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) argues that lights-off software factories fail because LLMs cannot maintain codebase quality over time, a training limitation no harness engineering fully addresses.

Observability and evaluation close the loop. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) makes the case that traces without attached feedback signals do not improve agentic systems; ratings, behavioral signals, LLM-as-judge, and deterministic rules are what turn observability into learning. The [Imbue AI code review experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) shows a concrete failure mode: weaker fixer agents in an implementer-reviewer-fixer pipeline overreach their scope and break correct code, a problem only softer fixer instructions resolved. [SysMoBench's TLA+ benchmarks](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) show that near-perfect syntax scores hide 46% conformance and 41% invariant scores — LLMs recite textbook protocols rather than modeling actual implementations.

The organizational dimension is harder to optimize away. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic coding workflows accelerate skill atrophy and create vendor dependency. Christoph Spörk frames widespread LLM adoption as a slow-heat dependency trap where institutional knowledge erodes before cost shocks arrive. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies five structural barriers — weak type systems, learned distrust, org processes built for human-speed development, fear, and lack of agent-management training — that explain why AI coding tools rarely deliver promised gains. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it plainly: AI lowers the cost of producing code but not the cost of owning it, and LLMs can generate polished technical debt faster than any individual engineer. The through-line is that LLM engineering is as much about managing what the model cannot do as optimizing what it can.
