---
title: Context engineering
summary: >-
  The discipline of deliberately constructing, compressing, and maintaining what
  enters an LLM's context window so agents produce accurate, recoverable, and
  cost-effective results across sessions and systems.
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
compiled_at: '2026-09-28T23:01:11.942Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1297
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
  cost_usd: 0.046791
---
Context engineering is the practice of treating the LLM context window as a managed resource rather than a passive receptacle. The phrase covers everything from how information is structured before it reaches a model, to how state is preserved across sessions, to how irrelevant or redundant tokens are pruned before they dilute reasoning.

The most direct articulation of the problem comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The insight is that most metadata about what an agent has done — current step, retry counts, waiting status — can be inferred from the thread itself if that thread is well-constructed. Keeping one source of truth simplifies serialization, recovery, and debugging.

State persistence across context boundaries is a recurring structural challenge. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses it by persisting session context as a `.story/` directory of JSON files, turning each new session into a continuation rather than a cold start. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) takes a complementary approach: an initializer agent scaffolds a feature list and progress file before work begins, so an incremental coding agent can pick up where any prior context window left off.

What goes into the context matters as much as how it persists. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) routes Claude through canonical datasets, a semantic layer, and curated skill docs rather than leaving the model to search freely. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, code enrichment, and self-improving memory to query 600+ petabytes accurately. Both cases treat context as an engineered artifact, not an accident of what the model happens to retrieve.

Retrieval alternatives are branching. The Karpathy LLM-wiki pattern — having the model build and maintain structured Markdown rather than querying via RAG — offers superior cross-document synthesis, but [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) notes that hallucinations baked in at ingest propagate structurally, making lint checks mandatory. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) takes a tree-index approach, using LLM reasoning rather than vector similarity to retrieve context-aware passages. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) go further: keeping data in a REPL environment and letting the model pull selectively into token space, avoiding context rot by design.

Compression is the other half of the budget. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) claims 60–95% token reduction by compressing tool outputs, logs, and RAG chunks before they reach the model. [Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) pushes back: compression tools that lack task-accuracy benchmarks risk silent data loss in agent pipelines, and the savings are often vanity metrics. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) sidesteps the retrieval/compression debate with a different approach: applying wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without discarding information.

The infrastructure layer is catching up to these demands. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset — injected from fast storage rather than recomputed — can cut prefill costs by up to 20x. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log, harness, and sandbox into stable interfaces so context management can evolve as models improve.

The organizational dimension is easy to overlook. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that agents amplify whatever alignment or misalignment already exists in a team: the context an agent receives reflects the specification clarity and shared understanding of the humans behind it. Context engineering, in that sense, is not purely a systems problem.
