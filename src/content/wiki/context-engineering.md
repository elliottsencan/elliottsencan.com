---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, managing,
  and optimizing what goes into an LLM's context window — spanning retrieval
  strategy, memory architecture, state unification, and compression — to produce
  reliable agent behavior.
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
  - 2026-06/2026-06-21t112220-agentic-engineering
compiled_at: '2026-06-22T02:38:27.664Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8570
    output_tokens: 1253
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
  cost_usd: 0.044505
---
Context engineering treats the context window not as a passive receptacle but as the primary artifact of an AI system. What a model receives determines what it can reason about; the engineering problem is deciding what to include, how to structure it, and how to keep it accurate over time.

The most direct framing comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should both be inferred from a single context-window-derived thread. When all state lives in one place, debugging, serialization, recovery, and human observability become straightforward. The principle is aggressive minimization: if it doesn't need to be in the context, keep it out.

Anthropicʼs production work illustrates what this looks like at scale. Their [agentic analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieves ~95% query accuracy by routing Claude to curated canonical datasets and a semantic layer rather than letting it search freely. Their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer that writes a progress file so a coding agent can pick up across context windows without losing its place. Both approaches treat the context as something that must be actively scaffolded, not simply filled.

Retrieval is a major sub-problem. Standard vector-similarity RAG degrades on long documents with complex structure. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) sidesteps this by building hierarchical tree indexes and using LLM reasoning rather than embedding distance to locate relevant material. The Karpathy LLM-wiki pattern, discussed in [practical](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [critical](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) accounts, goes further: the model maintains structured Markdown files so queries can be answered from prebuilt synthesis without retrieval at all. The tradeoff is fragility at ingest — hallucinations baked in early propagate structurally, making lint and health-check steps non-negotiable.

Memory architecture is a related dimension. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and its [detailed design writeup](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) argue that plain Markdown files with regex retrieval outperform vector stores for constrained environments. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a session-persistence angle, writing a `.story/` directory of JSON files so AI coding assistants accumulate context across sessions. A sharper critique from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that all storage-first approaches miss the real problem: stored assertions lack provenance, confidence, and revision history, making agent memory a belief-maintenance problem rather than a retrieval problem.

Compression and cost sit at the other end. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they enter the context window, cutting token usage 60–95%. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treats the computed cache as a persistent shared asset rather than ephemeral compute, reducing prefill costs by up to 20x. Both strategies assume that what reaches the model should be as dense and relevant as possible.

The organizational dimension is often underweighted. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that coding agents amplify existing alignment or misalignment in a team: shared context and specification clarity were always the bottleneck, and agents make that fact harder to ignore. Context engineering, in this framing, is as much a specification and coordination discipline as a technical one.

[harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) formalizes this into an optimization loop, treating memory layout, retrieval strategy, and prompt templates as tunable parameters in a propose-score-Pareto cycle. The context window, in that model, is not configured once but continuously improved against measurable outcomes.
