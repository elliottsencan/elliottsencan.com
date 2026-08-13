---
title: Context engineering
summary: >-
  Context engineering is the discipline of deciding what information enters an
  LLM's context window, in what form, and when — covering memory architecture,
  retrieval strategy, state management, and token budget across agentic systems.
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
compiled_at: '2026-08-13T21:09:36.421Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1421
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
Context engineering sits beneath almost every practical question in agent design: not what the model knows from training, but what it can see right now. The sources here converge on a shared insight — the context window is not a passive recipient of data but an active design surface that determines agent reliability, cost, and coherence.

The most direct framing comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. When the context window is the source of truth, the system gains trivial serialization, recovery from any checkpoint, and observable history in one place. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) treats "context rot" as one of the core failure modes agents must be designed around from the start.

Anthropics production work illustrates two complementary approaches. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern where an initializer scaffolds a feature list and progress file before the coding agent begins, preserving orientation across context-window boundaries. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log from the execution sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling context-aware routing across multiple brains and sandboxes.

On the retrieval side, sources disagree about whether vector similarity belongs in the pipeline at all. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes over long documents and uses LLM reasoning rather than embeddings for retrieval, reaching 98.7% accuracy on FinanceBench. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and its companion [walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) go further, replacing the vector store entirely with plain Markdown files and regex search, arguing the infrastructure overhead of embeddings is unjustified at their scale. Karpathy's LLM-wiki pattern, implemented in practice by [a weekend builder](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) and documented as a [practical guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), skips RAG entirely for curated corpora, letting the model synthesize across documents at ingest time. The tradeoff: hallucinations baked in at ingest propagate structurally, making lint and health checks non-negotiable.

Token budget is inseparable from context quality. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset can cut prefill costs up to 20x. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. A skeptical counterpoint: [one analysis](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that compression tools often report vanity metrics and risk silent data loss, and that task-accuracy benchmarks are the only honest measure of the trade-off.

Memory architecture connects to epistemics as much as storage. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that storing assertions without provenance or confidence scores produces systems that cannot self-correct. [sgup/ai Fable5.md](/reading/2026-06/2026-06-13t083401-sgupai-fable5md) operationalizes this at the prompt level, distinguishing confirmed from inferred claims during long multi-tool sessions.

The organizational dimension is equally real. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that agents amplify whatever alignment or misalignment exists in shared context and specifications. Anthropic's [self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieved 95% query accuracy by investing heavily in canonical datasets and semantic layers — context engineering at the organizational scale — though a [critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that replicating this requires months of senior data engineering most teams cannot spare.
