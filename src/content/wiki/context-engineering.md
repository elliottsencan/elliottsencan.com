---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately shaping what information
  enters an LLM's context window — and when, in what form, and at what cost —
  treating context as a first-class engineering artifact rather than an
  afterthought.
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
compiled_at: '2026-06-26T02:54:39.100Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1300
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
  cost_usd: 0.045873
---
Context engineering names the discipline of deciding what goes into an LLM's context window: which documents, what structure, how much compression, and how state persists across sessions. The term has emerged from accumulated frustration with the naive approach of dumping everything into a prompt and hoping the model sorts it out.

The foundational concern is context rot — the degradation of model behavior as irrelevant or stale information accumulates in the window. The agentic engineering reference compiled by [Neo Kim and Paul Hoekstra](/reading/2026-06/2026-06-21t112220-agentic-engineering) lists context rot alongside prompt caching and multi-agent orchestration as one of the core failure modes engineers need mental models for. The 12-factor-agents project addresses it structurally: [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, so the entire history of an agent run is visible, serializable, and recoverable from one place rather than scattered across separate tracking systems.

On the retrieval side, the debate is between vector similarity and LLM-native reasoning. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes over long documents and queries them with LLM reasoning rather than embeddings, reaching 98.7% accuracy on FinanceBench. The Karpathy wiki pattern, covered in two Reddit postmortems ([implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways)), goes further: the model maintains structured Markdown files directly, enabling cross-document synthesis that the first-person review found genuinely superior to RAG for curated research. The caveat is structural: hallucinations baked in at ingest propagate through the knowledge base, making lint and health-check steps mandatory. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a complementary approach, organizing context as tiered Markdown with a machine-readable manifest so agents can navigate without burning excess tokens.

Token efficiency shapes every decision. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60–95% reduction. KV caching is the infrastructure complement: [treating the KV cache as a shared data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) injected via RDMA rather than recomputed can cut prefill costs by 20x. A skeptical counterpoint from [Przemek Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression tools reporting 60–90% savings are often measuring stripped Bash output rather than task-accuracy outcomes, a reminder that vanity metrics on token counts can mask reliability regressions.

Memory architecture is a subdomain of context engineering concerned with what persists between sessions. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a .story/ directory of JSON files. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML context blocks. [Jakedismo's belief-maintenance proposal](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes the problem entirely: memory systems fail because they store assertions rather than beliefs, missing provenance, confidence scores, and revision history.

At the structural level, [Anthropic's Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces, enabling context management strategies to evolve independently of the model. Their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) externalizes progress state to a git-tracked file so an incremental agent can resume across context windows without losing its place. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the organizational argument: shared context and specification clarity are the real bottlenecks in AI-assisted work, and agents amplify whatever alignment or misalignment already exists in a team's communication.
