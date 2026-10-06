---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  compressing, and persisting what an LLM sees in its context window —
  increasingly recognized as the primary leverage point in building reliable AI
  agents and workflows.
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
compiled_at: '2026-10-05T23:48:52.761Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1449
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
  cost_usd: 0.049071
---
The phrase "context window" once implied a passive technical constraint. Context engineering treats it as the primary design surface for agent systems. The discipline covers what information enters the context, in what form, at what time, and how state persists across the boundaries of a single window.

The most direct statement of the stakes comes from [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code): code generation is no longer the bottleneck; shared context, specification clarity, and organizational coherence are. Agents amplify whatever alignment or misalignment already exists in the surrounding system. That framing extends naturally to the technical level — if the model sees badly shaped context, no prompt cleverness recovers it.

Several complementary strategies address this. One is structured, tiered documentation. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) organizes project context as layered Markdown files with both a human-readable index and a machine-readable manifest, so agents can navigate without loading everything at once. Karpathy's LLM-wiki pattern, documented in [a practical Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and stress-tested in [a weekend build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), extends this to corpus-scale: the model ingests raw documents and maintains structured Markdown files that can be queried holistically. The tradeoff is real — cross-document synthesis outperforms RAG for curated research, but hallucinations baked in at ingest propagate structurally, making validation non-negotiable.

A second strategy is compression. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. [A skeptical review of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues such figures are vanity metrics when measured only on stripped Bash output rather than task accuracy — a useful corrective that applies broadly to compression claims. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without language-specific parsers.

A third strategy is treating the context window as the unified state store. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, enabling serialization, recovery, and observability from one source of truth. Anthropic's harness work makes this concrete: [the long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent to scaffold a feature list and progress file so a downstream coding agent can maintain coherent state across many context windows. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log from the execution sandbox so the two can evolve independently.

Memory persistence is the longitudinal complement to in-window construction. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a .story/ directory, turning stateless assistants into compounding collaborators. The zerostack design, covered in [two](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) [posts](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store), uses plain Markdown and regex retrieval — no vector store, no embeddings — arguing that infrastructure simplicity matters more than retrieval sophistication at small scale. [A more theoretical treatment](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes the whole problem: agent memory fails because it stores assertions rather than beliefs, missing provenance, confidence, and revision history.

KV caching sits at the infrastructure boundary of context engineering. [Everpure's analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset rather than a recomputed artifact cuts prefill costs by up to 20x. Recursive Language Models, described by [dbreunig](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms), address context rot by keeping data in a REPL environment and letting the model pull selectively into token space — a structural alternative to window stuffing.

The hard limit is acknowledged by [humanlayer's advanced context engineering critique](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents): no harness engineering fully compensates for a model's inability to maintain codebase quality over long horizons. Context engineering raises the ceiling; it does not eliminate it.
