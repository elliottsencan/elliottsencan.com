---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  compressing, routing, and persisting what an LLM sees in its context window,
  treating that window as a managed resource rather than an incidental byproduct
  of prompting.
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
compiled_at: '2026-06-23T01:57:22.089Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1395
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
  cost_usd: 0.047298
---
Context engineering treats the LLM context window as a first-class engineering artifact. Where prompt engineering focuses on wording instructions, context engineering governs the entire information budget: what gets loaded, in what form, at what cost, and how state survives across turns and sessions.

The framing appears explicitly in [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The practical payoff is significant: one source of truth makes serialization, debugging, recovery, and forking straightforward. The same document notes that most "execution metadata" is just a projection of what has already happened, so a well-designed context makes separate state tracking unnecessary.

State persistence across sessions is a recurring problem. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses it with a `.story/` directory of JSON files that carries coding session context forward, turning stateless assistants into compounding collaborators. [Anthropic's long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) takes a similar approach at infrastructure scale, using an initializer agent to scaffold a feature list and progress file so that incremental coding agents can resume without losing position across context-window boundaries.

Compression and token efficiency sit at the other end of the problem. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code so that LLMs receive multi-resolution structural summaries rather than raw file contents. KV caching extends the budget on the infrastructure side: [Everpure's analysis](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a shared, persistent data asset injected via RDMA can cut prefill costs by up to 20x. Not everyone is convinced that compression tools deliver on their promises, though; a skeptical review of RTK [flags that claimed 60-90% savings are vanity metrics](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) measured on stripped Bash output rather than task accuracy.

Retrieval strategy is inseparable from context construction. The Karpathy LLM-wiki pattern, covered in [practical](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [critical](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) accounts, pre-synthesizes documents into structured Markdown so the model can reason across an entire knowledge base without RAG. The tradeoff: hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) takes a different route, using LLM reasoning over hierarchical tree indexes rather than vector similarity, reporting 98.7% accuracy on FinanceBench. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) go further, keeping data in a REPL environment and letting the model selectively pull information into token space, avoiding context rot by design.

At the organizational level, [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that shared context, not code generation, is the real bottleneck when deploying coding agents. Agents amplify whatever alignment or misalignment already exists in a team's specifications and communication. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) makes this concrete: 95% query automation came not from model capability but from canonical datasets, a semantic layer, and curated skill docs that route Claude to governed sources. A critique from Genloop [notes that this result required months of senior data engineering work](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) that most organizations cannot replicate, underscoring that context engineering is an ongoing investment, not a one-time setup.

Memory architecture is a persistent design question. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) demonstrates that plain Markdown files with auto-injected XML blocks can replace vector stores entirely under the right constraints. A more critical view frames agent memory as a belief-maintenance problem: [storing assertions without provenance, confidence, or revision history](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) produces systems that confidently repeat outdated facts rather than updating beliefs as evidence accumulates.
