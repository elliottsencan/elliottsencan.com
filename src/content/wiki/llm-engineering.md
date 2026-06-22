---
title: LLM engineering
summary: >-
  LLM engineering spans the full stack of building with large language models:
  architecture choices, inference optimization, agent design, knowledge
  management, and the organisational disciplines that keep model-driven systems
  reliable in production.
sources:
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - >-
    2026-06/2026-06-10t221112-estimating-no-cot-task-completion-time-horizons-of-frontier
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-06/2026-06-21t130559-what-is-inference-engineering
  - 2026-06/2026-06-21t192306-how-we-built-digitalocean-inference-router
  - >-
    2026-06/2026-06-21t192506-arch-router-aligning-llm-routing-with-human-preferences
compiled_at: '2026-06-18T21:49:07.628Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9566
    output_tokens: 1552
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
  cost_usd: 0.051978
last_source_added: '2026-06-22T02:25:06.549Z'
---
LLM engineering is the practice of building production systems on top of large language models, from low-level inference mechanics to high-level agent architectures. The sources gathered here map a wide territory, and a few tensions recur across them.

The foundational question is what an LLM can actually do reliably. Benchmarking work on TLA+ generation [finds near-perfect syntax scores but only ~46% conformance and ~41% invariant accuracy](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla), meaning models recite textbook protocols rather than faithfully represent real implementations. A separate study on Claude Opus 4.7 shows that more reasoning effort is not monotonically better: [medium effort outperforms high, xhigh, and max on pass rate and code-review quality](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across 29 real tasks. Both findings argue for calibrated, empirically grounded trust in model outputs rather than blanket reliance.

On the inference side, the engineering levers are increasingly well understood. Persistent KV caching [eliminates redundant prefill computation by hashing prompt prefixes and injecting cached tensors from shared storage](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), cutting time-to-first-token up to 20x. Granular-prompt caching [segments prompts into reusable checkpoints so models only process token deltas](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure). Meanwhile, a 75x price gap across frontier providers has [made previously unprofitable products viable](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on), but also raises lock-in risk that pushes toward provider-agnostic infrastructure from the start. Recursive Language Models offer another architectural angle: [splitting inputs into programmatic and token context pools to navigate massive datasets without context rot](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Context management is its own discipline. WaveScope [applies wavelet transforms to source code to give LLMs a multi-resolution hierarchical view that reduces token usage by up to 92%](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) compared to grep or embedding retrieval. The 12-factor-agents project argues for [unifying execution state and business state into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which simplifies serialization, debugging, and recovery. Both approaches reflect the same underlying constraint: LLMs reason well over what is directly in context and poorly over what must be inferred from scattered retrieval.

For knowledge bases and retrieval, the LLM-compiled wiki pattern described by Karpathy and explored in practice [achieves genuine cross-document synthesis that outperforms RAG for curated research](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), but hallucinations baked in at ingest propagate structurally, making lint and health-check passes non-negotiable. PageIndex [takes a complementary approach, using LLMs to build structured page indexes instead of embeddings for vectorless retrieval](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

Agent reliability is where most engineering complexity accumulates. Brian Suh argues that [reliable agents need deterministic control flow encoded in software, not elaborate prompt chains](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's multi-agent harness uses [a GAN-inspired planner/generator/evaluator architecture to overcome context anxiety and self-evaluation bias](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) during multi-hour autonomous sessions. LangChain's Harrison Chase notes that [traces alone do not close the improvement loop; attaching feedback signals is what turns observability data into a learning system](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Claude Fable's autonomous invention of screenshot infrastructure to debug a CSS bug [illustrates both the power and the cost risk of unconstrained agency](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive).

The organizational dimension is harder to instrument. A fractional CTO argues that [agentic development fails primarily from weak type systems, process mismatches, and absent agent-management training](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively), not from individual skill gaps. Val Town's slow-mode proposal [trades short-term productivity for long-term developer understanding](/reading/2026-05/2026-05-19t193626-slow-mode) by keeping humans involved at every planning step. The institutional-knowledge erosion risk is real: one essayist [likens creeping LLM dependency to a lobster in slowly heating water, with a coming token-price shock as the cost of over-automation](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot). Codebase design matters too: [deep modules with interfaces that hide complexity let LLMs reason locally rather than across leaky abstractions](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The weight of the evidence is that LLM engineering is as much an architectural and organizational discipline as a prompting one.
