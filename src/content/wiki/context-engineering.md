---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, structuring,
  and managing what information enters an LLM's context window, treated as a
  first-class engineering discipline rather than an afterthought to model
  selection or prompt wording.
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
compiled_at: '2026-06-23T23:18:51.054Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1339
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
  cost_usd: 0.046458
---
Context engineering starts from a simple observation: what a model produces depends almost entirely on what it can see. Prompt wording matters, but the harder problem is deciding which facts, history, metadata, and state to include, in what form, and at what cost in tokens. That problem has spawned a recognizable set of patterns across a wide range of projects.

The most direct framing comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The benefit is not elegance for its own sake: a unified thread is trivially serializable, debuggable, and resumable from any point. This is context engineering as state management.

Anthropics production work extends the idea to multi-agent systems. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces precisely so the context assembly layer can evolve independently of the model. Their long-running agent harness addresses the related problem of continuity: an initializer scaffolds a feature list and progress file so a coding agent can pick up across context windows without losing what it already knows.

On the retrieval side, [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, achieving high accuracy on financial documents by giving the model structurally coherent context rather than nearest-neighbor chunks. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. Both treat what enters the context window as a signal-engineering problem.

KV caching is the infrastructure layer of context engineering. [Alvarez](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset, reloaded from fast storage via RDMA rather than recomputed, can cut prefill costs by up to 20x. The [headroom library](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) approaches the same cost problem from the opposite direction, compressing tool outputs and RAG chunks before they enter the model. A dissenting note: [Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression tools often report token savings as vanity metrics without task-accuracy benchmarks, and that silent data loss in agent pipelines is a real risk.

Knowledge-base tooling represents another cluster. The Karpathy LLM-wiki pattern, documented in [practical](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [critical](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) Reddit writeups, ingests raw documents and has the model build structured Markdown files that can be queried without RAG. The critical takeaway: hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) and [zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) both reach for plain Markdown files over vector stores, citing minimal infrastructure requirements and predictable retrieval.

Memory architecture is where context engineering intersects belief maintenance. [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that most memory systems fail because they store assertions without provenance, confidence, or revision history, and that the correct abstraction is a belief with a supersession record rather than a fact in a store.

The organizational dimension is easy to miss. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that context quality is ultimately a management problem: agents amplify whatever alignment or misalignment an organization already has, and shared context is a coordination artifact as much as a technical one. Anthropics analytics deployment, which routed Claude through canonical datasets and curated skill docs to hit 95% accuracy on business queries, is a concrete example of that thesis in production, per their [self-service analytics writeup](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with).
