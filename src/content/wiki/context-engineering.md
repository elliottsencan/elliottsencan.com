---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing what goes
  into an LLM's context window — what to include, compress, persist, retrieve,
  and discard — so that agents and pipelines produce reliable, coherent results
  across tasks and sessions.
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
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
compiled_at: '2026-07-01T01:56:43.076Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1413
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
  cost_usd: 0.047568
---
Context engineering sits beneath prompt engineering and above raw model capability. Where prompt engineering focuses on phrasing, context engineering asks a harder question: what information should the model see, in what form, from what source, at what point in a workflow? The answers determine whether an agent stays coherent across a long task, whether it hallucinates, and whether it can recover from failure.

The most direct framing comes from the 12-factor-agents project, which argues that execution state and business state should both live in the context window rather than in separate tracking systems [factor 5 of 12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). When the full thread is the source of truth, serialization, debugging, recovery, and observability all become tractable. Anthropic's harness work extends this idea: a two-agent initializer-plus-incremental-coder pattern scaffolds a progress file and git repo so Claude can resume coherent work across many context windows without reconstructing its own state from scratch [effective harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service separates the session log, harness, and sandbox into stable interfaces for the same reason: the context must be portable and swappable as models improve [managed agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Context rot is the failure mode that makes all of this necessary. As sessions grow, earlier information loses effective influence even when it technically remains in the window [agentic engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering). Recursive Language Models address this by keeping data outside token space in a REPL environment and letting the model pull only what it needs [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms). KV caching is the infrastructure complement: treating computed attention state as a persistent shared asset rather than recomputing it per request cuts prefill costs by up to 20x [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching).

On the retrieval side, the Karpathy LLM-wiki pattern replaces RAG with model-maintained structured Markdown files that can be queried wholesale. Practitioners report that cross-document synthesis genuinely outperforms vector retrieval for curated research, but hallucinations baked in at ingest propagate structurally, making lint and health-check steps mandatory [Karpathy wiki honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex takes a complementary approach, building hierarchical tree indexes from long documents and using LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

Memory architecture is a sub-discipline of context engineering. The zerostack agent uses plain Markdown files and regex search rather than vector stores, chosen for RAM constraints and provider neutrality [zerostack memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more principled critique argues that most memory systems store assertions rather than beliefs, lacking provenance, confidence, and revision history — failures that compound over long agent lifetimes [belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). Compression is another lever: the headroom library reduces token volume by 60-95% before material reaches the model [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), while skeptics note that compression tools claiming similar gains often strip only low-value output and lack task-accuracy benchmarks [token compression illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Organizationally, context engineering is where technical and human concerns converge. Coding agents amplify whatever shared context and specification clarity an organization already has [bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's analytics stack achieves 95% query accuracy precisely because it routes Claude to canonical datasets and a semantic layer rather than allowing free warehouse search [Anthropic self-service analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). That investment is non-trivial: a critic notes it requires months of senior data engineering work most organizations cannot replicate [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). The harness-forge project takes a meta-level view, running optimization loops over the scaffolding itself — memory, retrieval, context construction, prompt templates — treating context engineering as a tunable system rather than a one-time design choice [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).
