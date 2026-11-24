---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what goes into an LLM's context window so agents and
  assistants can reason accurately, persist state across sessions, and avoid
  degrading over long tasks.
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
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - 2026-08/2026-08-29t224355-how-llms-actually-work
compiled_at: '2026-11-24T03:53:16.893Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1342
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
  cost_usd: 0.047466
---
Context engineering treats the context window not as a passive recipient of text but as the primary engineering surface for LLM-based systems. What the model sees determines what it can do, so structuring, curating, and compressing that content is as consequential as the model itself.

The phrase gained traction as developers noticed that raw retrieval and naive prompt concatenation break down at scale. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, so current step, retry counts, and tool-call history are all readable from one place. This simplifies serialization, enables recovery by reloading the thread, and makes the full history observable. Anthropic's harness work takes a similar stance: an initializer agent scaffolds a feature list, git repo, and progress file, and an incremental coding agent reads that file to maintain orientation across context window boundaries [effective-harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Retrieval is one of the hardest sub-problems. Classic RAG chunks and embeds, then matches by vector similarity, losing structural relationships in the process. PageIndex replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Karpathy's LLM-wiki pattern goes further, having the model maintain synthesized Markdown files so queries hit pre-structured knowledge rather than raw chunks [karpathy-wiki](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base). One developer who built this end-to-end found cross-document synthesis genuinely superior to RAG for curated research but warned that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable [karpathy-honest](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways).

Memory systems are a parallel concern. zerostack uses plain Markdown files and regex retrieval on disk, auto-injecting XML context blocks [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), while Storybloq persists session context as JSON in a .story/ directory so coding sessions compound rather than restart from scratch [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). One pointed argument reframes the problem entirely: agent memory fails not because storage is wrong but because systems store assertions instead of beliefs, without provenance, confidence, or revision history [belief-maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Compression and cost are real constraints. KV caching can reduce prefill costs by up to 20x when the cache is treated as a shared persistent asset injected via RDMA rather than recomputed per request [kv-caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). The headroom library compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though a skeptical review of similar tools notes that compression-ratio claims without task-accuracy benchmarks are vanity metrics [token-compression](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). WaveScope applies wavelet transforms to source code as a 1D signal to produce multi-resolution structural views that are token-efficient without language-specific parsers [wavescope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

Anthropics's internal analytics stack illustrates what high-investment context engineering looks like in production: canonical datasets, a semantic layer, and curated skill documents route Claude to governed data sources and reach 95% accuracy on business queries [anthropic-analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). A critique notes that replicating this requires months of senior data engineering work most organizations lack [genloop-critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got).

The organizational dimension is easy to miss. Code-writing is now cheap; the bottleneck is whether agents receive specifications clear enough and context curated enough to act on [bottleneck](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Context engineering is, in this sense, a management problem as much as a systems problem.
