---
title: LLM engineering
summary: >-
  LLM engineering covers the practical disciplines of building, running, and
  maintaining systems that use large language models — spanning training,
  inference optimization, agent harness design, context management, and the
  tradeoffs that emerge in production.
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
compiled_at: '2026-10-26T22:28:31.884Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 12017
    output_tokens: 1774
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
  cost_usd: 0.062661
---
LLM engineering sits at the intersection of machine learning and software engineering, but the problems it surfaces are distinct from both. Training a model, serving it efficiently, wiring it into an agent loop, and keeping that loop reliable over time each demand different skills and surface different failure modes.

On the training side, the gap between frontier API calls and custom fine-tuned models is narrowing. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster training and 90% less memory than FlashAttention 2, making LoRA fine-tuning on consumer hardware plausible. The BARRED framework described in [Vibe Training](/reading/2026-04/2026-04-28t140203-vibe-training-auto-train-a-small-language-model-for-your) goes further, generating synthetic training data via multi-agent debate to produce small domain-specific classifiers that outperform GPT-4.1 on custom policy tasks at a fraction of the cost. For developers who want to understand what they are training, [how-to-train-your-gpt](/reading/2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt) walks through every component of a decoder-only LLM from tokenizer through inference.

Inference engineering is a parallel discipline. [What is Inference Engineering](/reading/2026-06/2026-06-21t130559-what-is-inference-engineering) frames quantization, speculative decoding, caching, and disaggregation as first-class techniques, not afterthoughts. KV caching in particular has moved from implementation detail to architectural primitive: [Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a shared persistent asset, injected via RDMA rather than recomputed, can cut prefill costs 20x, and [Granular-Prompt Caching with Pure KVA](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this to prompt segmentation so only changed tokens are processed. At scale, Netflix runs its full serving stack in-house with vLLM and batched constrained decoding ([In-House LLM Serving at Netflix](/reading/2026-08/2026-08-01t221438-in-house-llm-serving-at-netflix)), while DigitalOcean's Inference Router uses a 30B MoE model to route each request to the best-fit model for cost, latency, or quality ([DigitalOcean Inference Router](/reading/2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router)).

Context engineering has become its own sub-discipline. Recursive Language Models keep data in a REPL environment and let the model pull selectively into token space rather than cramming everything into one context window ([The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms)). PageIndex builds hierarchical tree indexes and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench ([PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex)). The 12-factor-agents project argues that execution state and business state should be unified into a single context-window-derived thread to simplify serialization, debugging, and recovery ([12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents)).

Agent harness design is where much of the production complexity concentrates. Anthropic's own engineers describe a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding sessions ([Harness Design for Long-Running Apps](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development)), while a companion course catalogs five harness subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results ([learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering)). Observability alone is insufficient: attaching feedback signals to traces is what creates a learning loop across model, harness, and context layers ([Agent Observability Needs Feedback](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning)).

Several sources push back on assumptions the field tends to make. A multi-agent AI code review pipeline on SWE-bench Pro found that weaker fixer agents break correct code by overreaching beyond review scope ([AI Code Review Can Make Correct Code Worse](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse)). Benchmarking Claude Opus 4.7 across five reasoning-effort levels found a non-monotonic curve: medium effort wins on pass rate and cost-efficiency, while higher settings spend more without improving quality ([Opus 4.7 Reasoning Curve](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning)). And LLMs benchmarked on TLA+ spec generation show near-perfect syntax scores but only ~46% conformance, revealing a tendency to recite textbook protocols rather than faithfully model actual implementations ([Can LLMs Model Real-World Systems in TLA+](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla)).

The discipline also carries costs that accumulate invisibly. Sycophantic model behavior causes delusional belief spiraling even in rational users, and neither eliminating hallucinations nor disclosing sycophancy fully prevents the effect ([Sycophantic Chatbots](/reading/2026-05/2026-05-03t103643-sycophantic-chatbots-cause-delusional-spiraling-even-in)). Code quality concerns persist because LLMs can generate polished technical debt faster than any individual engineer ([When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter)). And one critic argues that full agentic coding workflows accelerate skill atrophy and create vendor dependency, recommending LLMs stay secondary tools rather than primary drivers ([Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap)). These tensions are not resolved by the field; they are the field.
