---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, managing,
  and persisting what goes into an LLM's context window — treating it as a
  first-class engineering surface rather than incidental scaffolding.
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
compiled_at: '2026-06-18T23:01:54.104Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8455
    output_tokens: 1222
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
  cost_usd: 0.043695
---
Context engineering spans a range of techniques unified by a single insight: what an LLM can do is bounded not just by its weights but by what appears in its context window at inference time. Getting that content right — what to include, how to structure it, how to persist it across sessions, and how to keep it accurate — is the core discipline.

The most direct formulation comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The practical payoff is serializability, easy recovery, and observable history — all derived from treating the context as the ground truth. [Anthropic's managed-agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) extends this by separating the session log, harness, and sandbox into stable interfaces, cutting prefill latency ~60% while enabling multi-brain topologies. The companion piece on [long-running agent harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) shows the operational side: an initializer scaffolds a feature list and progress file so a coding agent can resume coherently across context windows.

On the retrieval end, several sources argue against treating context construction as a pure search problem. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical document trees, achieving high accuracy on financial benchmarks. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) sidestep context rot entirely by keeping data in a REPL and letting the model pull selectively into token space. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to produce multi-resolution structural summaries that are token-efficient without language-specific parsers.

Persistence and memory are a recurring theme. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) and [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) both choose plain Markdown files over vector stores — the latter explicitly because minimal RAM, no daemon, and provider neutrality ruled out embeddings. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a similar approach, generating a human-readable INDEX.md and a machine-readable manifest.json so agents navigate without burning excess tokens.

Accuracy of stored context is a harder problem than storage format. [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found that hallucinations baked in at ingest propagate structurally through the knowledge base, making lint and health-check steps non-negotiable. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues this is a category error in how memory systems are designed: storing assertions without provenance, confidence, or revision history means the context degrades silently. [Anthropic's analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) illustrates the cost of getting it right — canonical datasets, a semantic layer, and curated skill docs required months of senior data engineering before the system reached 95% accuracy, a bar that [critics note](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) most organizations cannot clear.

The organizational dimension matters too. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) frames context engineering as an organizational problem: coding agents amplify whatever alignment or misalignment already exists, and shared context and specification clarity are upstream of any technical solution. Infrastructure choices compound this — [KV caching treated as a persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x, making it economical to keep richer context in flight across concurrent requests.
