---
title: LLM Engineering
summary: >-
  The practical discipline of building, evaluating, and operating systems that
  use large language models, spanning knowledge architecture, agent control
  flow, inference optimization, and the human and organizational costs of
  getting it wrong.
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
aliases:
  - large-language-models
compiled_at: '2026-05-20T15:02:11.760Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7533
    output_tokens: 1091
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
  cost_usd: 0.038964
last_source_added: '2026-06-05T02:40:33.653Z'
---
LLM engineering is the set of practices for designing, building, and operating software systems built around large language models. The sources here span several interrelated concerns: how to structure knowledge for LLM consumption, how to wire agent behavior reliably, how to manage inference costs, and what happens when the discipline is applied carelessly.

On knowledge architecture, Andrej Karpathy's LLM-compiled wiki pattern treats the model as a document maintainer rather than a retrieval target. A [practical walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) describes ingesting raw documents, having the model build structured Markdown files, and querying at scale without RAG. A [weekend build of the same concept](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that cross-document synthesis genuinely outperforms RAG for curated research, but hallucinations baked in at ingest propagate structurally, making lint and health-check steps non-negotiable. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) takes a complementary approach: reasoning-based document indexes built by LLMs rather than embedding vectors.

Agent reliability is a recurring theme. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that prompt chains are non-deterministic and unverifiable at scale; reliable agents need deterministic control flow with explicit state transitions. The 12-factor-agents project reinforces this: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommends unifying execution state and business state into a single context-window-derived thread to simplify debugging and recovery. Anthropic's [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous coding runs. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) adds that traces alone are insufficient; attaching feedback signals is what turns observability into a learning loop.

Inference cost is a concrete engineering constraint. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut time-to-first-token by up to 20x by hashing prompt prefixes and injecting cached tensors. [Granular-prompt caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable checkpoints so only token deltas are processed. Separately, [benchmarking Claude Opus 4.7](/reading/2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning) across reasoning-effort levels found a non-monotonic curve: medium effort won on pass rate and code-review quality while higher settings cost more without improving outcomes.

The discipline also carries human costs. [Vibe coding without review](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) risks skill atrophy and compounding errors in safety-critical systems. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) trades short-term productivity for long-term understanding by keeping humans involved at each agent step. Christoph Spörk's [lobster essay](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot) frames institutional dependency on LLMs as a slow-burn risk: eroded internal knowledge combined with a potential cost shock from token price surges.
