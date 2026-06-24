---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  structuring, and maintaining what enters an LLM's context window — covering
  memory systems, retrieval, state management, compression, and scaffolding
  across single and multi-agent workflows.
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
compiled_at: '2026-06-24T04:34:24.074Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1444
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
  cost_usd: 0.048033
---
Context engineering treats the context window as the primary engineering surface for LLM-based systems. What the model receives determines what it produces, so every decision about how to populate, compress, persist, and retrieve that context is a first-class design problem.

The most common failure mode is context rot: a context window that degrades over long sessions as irrelevant tokens accumulate, important state gets buried, or contradictory information coexists without resolution. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) names this explicitly as one of the core hazards in multi-step agent loops. Recursive Language Models address it structurally by keeping data in a REPL environment and letting the LLM pull selectively into token space rather than stuffing everything in at once — their emergent access traces can then be mined to design lower-latency agents [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Memory architecture is where context engineering gets most contentious. The dominant debate is vector stores versus structured files. zerostack's agent memory uses plain Markdown on disk with XML context blocks and three tools — read, write, keyword search — arguing that minimal RAM, no daemon, and provider neutrality make embeddings unnecessary [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). The LostWarrior knowledge-base CLI takes a similar tiered-Markdown approach, generating both a human-readable INDEX.md and a machine-readable manifest.json so agents can navigate without burning excess tokens [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base). A harder critique frames memory as a belief-maintenance problem rather than a storage problem: stored assertions without provenance, confidence scores, or revision history silently corrupt downstream reasoning [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Retrieval design lives adjacent to memory. PageIndex builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity for context-aware retrieval, reporting 98.7% accuracy on FinanceBench [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Anthropic's analytics stack routes Claude through canonical datasets and a semantic layer rather than open warehouse search, achieving 95% accuracy on business queries — though a critic notes this required months of senior data engineering that most organizations cannot replicate [How Anthropic Enables Self-Service Data Analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) [What Anthropic Got Right](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got).

KV caching sits at the infrastructure layer of context engineering. Treating the KV cache as a persistent shared asset — injected from fast storage rather than recomputed per request — can cut prefill costs by up to 20x and materially improve throughput [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). WaveScope applies Ricker wavelet transforms to source code as a 1D signal, producing multi-resolution structural views that give LLMs precise, token-efficient context without language-specific parsers [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Compression proxies like headroom claim 60-95% token reduction on tool outputs and RAG chunks [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though skeptics note that compression metrics without task-accuracy benchmarks are misleading [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

At the harness level, 12-factor-agents Factor 5 argues that execution state and business state should be unified into a single context-window-derived thread, making the context the one source of truth for serialization, debugging, recovery, and observability [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's long-running agent harness externalizes state through a progress file that survives context resets, letting an incremental coding agent pick up exactly where the previous window ended [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

The organizational dimension matters too. Coding agents amplify whatever context discipline already exists in a team — clear specifications and shared mental models produce compounding gains, while ambiguous context produces compounding errors [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Context engineering is not solely a systems problem; it is a practice of keeping what the model knows accurate, current, and scoped.
