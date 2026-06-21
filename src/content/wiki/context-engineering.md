---
title: Context engineering
summary: >-
  Context engineering is the discipline of deciding what information enters an
  LLM's context window, in what form, and when — covering retrieval,
  compression, persistence, state unification, and memory architecture across
  single and multi-agent systems.
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
compiled_at: '2026-06-21T18:35:40.325Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8570
    output_tokens: 1262
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
  cost_usd: 0.04464
---
The phrase "context window" implies a fixed slot to be filled, but the actual engineering challenge is far more selective: which information, structured how, at which moment. Context engineering is the set of decisions and mechanisms that govern that selection, and the sources here collectively push it well past simple prompt construction.

At the retrieval layer, the choice of what to pull into context shapes everything downstream. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reporting 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM-wiki pattern, dissected in both [a practical Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and an [honest post-mortem](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), goes further: the model pre-synthesizes curated Markdown files from source documents so queries require no retrieval at all. The post-mortem notes that this beats RAG for cross-document synthesis, but hallucinations baked in at ingest propagate structurally, making lint and health checks non-negotiable.

On the memory and persistence side, approaches vary by constraint. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown files with auto-injected XML blocks and three tools: read, write, keyword search. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context in a `.story/` directory across stateless assistant sessions. A more principled critique comes from [a belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): storing assertions without provenance, confidence, or revision history is the core failure mode of most memory systems, regardless of storage medium. A [feature comparison across 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) maps how different architectures handle these tradeoffs.

State management intersects directly with context design. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, making the entire history serializable and resumable from any point. Anthropic's [harness for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) externalizes progress into a git repo and progress file so state survives context-window resets. Their [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log, harness, and sandbox into swappable interfaces.

At the infrastructure level, context engineering intersects with cost and latency. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset can cut prefill costs up to 20x. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that reduce token cost without language-specific parsers.

Anthropics self-service analytics stack illustrates what mature context engineering looks like in production: canonical datasets, a semantic layer, and curated skill docs that route Claude to governed sources, [achieving 95% accuracy on 95% of queries](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). A [critique from Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that this accuracy depends on months of senior data engineering work most organizations cannot replicate. [The Typical Set's essay on coding agents](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the same point more broadly: context engineering amplifies existing organizational alignment or misalignment, and specification clarity is the real bottleneck.
