---
title: Context engineering
summary: >-
  Context engineering is the discipline of deciding what information enters an
  LLM's context window, in what form, and at what cost — the layer of work that
  determines whether an agent behaves reliably or degrades.
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
compiled_at: '2026-06-21T20:19:23.436Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8570
    output_tokens: 1269
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
  cost_usd: 0.044745
---
Context engineering sits between raw model capability and real-world agent performance. Where prompt engineering focused on wording instructions well, context engineering addresses the harder question: what state, history, knowledge, and structure should occupy the context window at each step, and how should that information be shaped, compressed, and maintained over time.

The most basic framing treats context as a single source of truth. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, so that current step, retry counts, tool call history, and results are all readable from one place. This makes serialization, debugging, and recovery straightforward because there is nothing external to reconcile. Anthropic's long-running agent harness extends this further: an initializer agent scaffolds a progress file and feature list, then an incremental coding agent reads from and writes back to that file across context windows, preserving continuity without shared in-process memory [effective-harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Structure and retrieval are equally contested. PageIndex builds hierarchical tree indexes from documents and uses LLM reasoning rather than vector similarity to retrieve context-relevant passages, reporting 98.7% accuracy on financial benchmarks [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Karpathy's LLM wiki pattern takes a different route: the model itself ingests raw documents and maintains structured Markdown files that can be queried without RAG at all [Karpathy wiki guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base). Practitioners who built this pattern report that cross-document synthesis is genuinely better than RAG for curated research, but hallucinations ingested at write time propagate structurally, making a lint or health-check pass non-negotiable [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways).

Token cost shapes every design decision. KV caching treated as a persistent shared asset rather than a throwaway side effect can reduce prefill costs by up to 20x [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Headroom, a proxy and MCP server, compresses tool outputs, logs, files, and RAG chunks before they reach the model, reporting 60-95% token reduction without answer-quality loss [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). WaveScope applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient by construction [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

Memory and belief maintenance extend context engineering across sessions. zerostack's file-based approach stores plain Markdown on disk with auto-injected XML blocks and three retrieval tools, deliberately avoiding vector infrastructure [zerostack memory](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more critical framing argues that most agent memory systems fail not because of storage technology but because they record assertions without provenance, confidence, or revision history, proposing instead a belief-maintenance architecture with supersession and outcome scoring [belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

At the organizational scale, context engineering becomes a coordination problem. The bottleneck for coding agents is rarely the code itself but the clarity of specifications and shared context across a team [bottleneck](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's analytics stack achieved 95% automation accuracy by building canonical datasets, a semantic layer, and curated skill docs — but a critic notes this required months of senior data engineering and warehouse reshaping most organizations cannot replicate [Anthropic analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with), [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). The harness-forge project formalizes this tradeoff by running a propose-score-Pareto loop specifically to optimize memory, retrieval, and context construction around a fixed model [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge), treating the context layer as the primary engineering variable.
