---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  persisting, and routing the information that enters an LLM's context window,
  replacing ad-hoc prompting with principled state management across agent
  systems.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-20t145835-chopratejasheadroom
compiled_at: '2026-06-20T22:12:19.574Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8415
    output_tokens: 1383
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
  cost_usd: 0.04599
---
Context engineering names the discipline of controlling what an LLM sees and when. Where prompt engineering focuses on wording, context engineering focuses on structure: which facts, documents, tool outputs, and state records are loaded into the context window, in what form, and at what cost.

The clearest statement of the stakes comes from [12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. If you can infer current step, retry count, and workflow history from what is already in the context, you eliminate a separate state store and gain trivial serialization, debugging, and recovery. The corollary is that anything kept outside the context window is a liability: you must sync it, and it can drift.

Anthropicʼs engineering work illustrates how seriously this plays out in production. The [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the agent harness, session log, and sandbox into stable, swappable interfaces partly so that context handling can be upgraded independently as models improve. Their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a progress file and feature list to persist state across context windows, because a single context cannot hold the history of a multi-session coding task.

Storage and retrieval choices are a large part of the problem. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench. [zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) goes further in the opposite direction: plain Markdown files and regex search, no embeddings, justified by RAM constraints and provider neutrality. [Karpathyʼs LLM wiki pattern](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) is a third approach, having the model compile and maintain structured documents for direct in-context loading at query time, bypassing retrieval altogether for curated knowledge domains.

Compression is the other lever. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reducing token usage by 60 to 95%. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code to produce multi-resolution structural views that are both token-efficient and parser-free. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treats previously computed attention states as a reusable asset, cutting prefill costs by up to 20x when the same context prefix recurs.

Memory quality compounds the difficulty. [One framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that agent memory systems fail because they store assertions rather than beliefs, omitting provenance, confidence, and revision history. [Building the Karpathy wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) confirms a concrete version of this: hallucinations baked in at ingest propagate structurally across the compiled documents, making lint and verification steps non-negotiable.

Organizationally, [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that coding agents amplify whatever alignment or misalignment already exists in a team. Context engineering is not just a systems problem; it is a specification problem. Anthropicʼs self-service analytics stack makes the same point concretely: [95% accuracy](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) depended on canonical datasets, a semantic layer, and curated skill docs, not on raw model capability. A [critique of that stack](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that the months of data engineering required to achieve it are not replicable by most organizations, which is itself an argument that context engineering is a form of capital investment, not a free multiplier.

Tools like [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) make the optimization loop explicit: a propose-score-Pareto cycle treats memory, retrieval, context construction, and prompt templates as the variables to tune around a fixed model, reflecting a growing consensus that the harness matters as much as the weights.
