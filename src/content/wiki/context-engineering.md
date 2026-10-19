---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing what goes
  into an LLM's context window — which information, in what form, at what
  granularity — to produce reliable, accurate, and cost-efficient model behavior
  across agent systems.
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
compiled_at: '2026-10-19T22:04:55.500Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1391
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
  cost_usd: 0.048201
---
The context window is the surface where all LLM behavior actually happens. What the model knows, what it can act on, and what it will forget at the next invocation all depend on what reaches that window. Context engineering names the discipline of making those choices deliberately rather than incidentally.

The most basic framing is architectural. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should both live in the context window itself, treating the thread of events as the single source of truth from which all agent behavior can be inferred. Keeping state unified there makes agents serializable, resumable, and debuggable without separate infrastructure. [Anthropic's harness work](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) extends this across multiple context windows: an initializer scaffolds a feature list and progress file at the start of a run so that subsequent incremental agents can pick up exactly where they left off, maintaining coherent state across restarts.

What fills the window matters as much as how state is tracked. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) routes Claude to canonical datasets and a curated semantic layer rather than letting it freely search a warehouse, achieving 95% accuracy by ensuring the model only sees governed, high-quality context. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory to serve queries over 600+ petabytes. In both cases the engineering work is upstream of inference: shaping what the model sees, not tuning how it reasons.

That upstream work has costs that context engineering also has to manage. KV caching, described by [Everpure Engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), can cut prefill costs by up to 20x when the cache is treated as a persistent shared asset rather than a per-request ephemeron. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views, delivering precise context without burning tokens on irrelevant lines. The [headroom library](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60–95% token reduction — though [Mroczek](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) is skeptical of such figures without task-accuracy benchmarks, noting compression without verification risks silent data loss.

On the retrieval side, [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning to retrieve from long documents, reaching 98.7% accuracy on FinanceBench. [zerostack's memory system](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) takes the opposite approach: plain Markdown on disk with regex search, chosen because the operational constraints ruled out vector infrastructure entirely. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) has the model maintain structured knowledge files directly, producing cross-document synthesis that outperforms RAG for curated research — but any hallucination baked in at ingest propagates structurally, making the lint step non-negotiable.

Beyond tooling, context engineering is partly a quality problem. [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that agent memory fails when it stores assertions without provenance, confidence, or revision history; the fix is belief maintenance, not better storage. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) frames the same issue organizationally: coding agents amplify whatever alignment or misalignment a team already has, and shared context across people is the real bottleneck, not token count. [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) makes it an optimization target, running propose-score-Pareto loops over memory, retrieval, and prompt templates to find the best scaffolding for a fixed model.

The [agentic engineering reference guide](/reading/2026-06/2026-06-21t112220-agentic-engineering) treats context rot — the degradation of useful signal as a context window fills with stale or irrelevant content — as a first-class engineering concern alongside prompt caching and multi-agent orchestration. Managing rot, freshness, and compression is as central to context engineering as deciding what to include in the first place.
