---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  compressing, and managing what enters an LLM's context window — spanning
  memory architecture, retrieval strategy, state unification, and token
  budgeting — to produce reliable agent behavior at scale.
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
compiled_at: '2026-10-26T22:23:14.246Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1312
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
  cost_usd: 0.047016
---
Context engineering sits one layer below prompt engineering and one layer above model selection. Where prompt engineering asks what to say, context engineering asks what information the model should see, in what form, at what cost, and how that information persists across turns and sessions. The sources collected here converge on a shared premise: the quality of what enters the context window is now the primary determinant of agent reliability.

The most direct statement of this comes from [12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. Keeping one source of truth makes the thread serializable, debuggable, and resumable from any checkpoint. Anthropic's harness engineering work extends this practically: [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes an initializer agent that scaffolds a feature list and progress file so a downstream coding agent can resume across many context windows without losing coherence. Their [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log, harness, and sandbox into stable interfaces precisely so context can be managed independently of the model being invoked.

On the retrieval side, sources differ on whether vector search is the right primitive. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes and uses LLM reasoning rather than embedding similarity for retrieval, reaching 98.7% accuracy on FinanceBench. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) skips RAG entirely, having the model compile and maintain structured Markdown files queried wholesale. [zerostack's memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) goes further, using plain files and regex retrieval on the grounds that the operational overhead of vector infrastructure outweighs its benefits for constrained deployments. Meanwhile, [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) propose keeping data in a REPL environment and letting the model pull selectively into token space, avoiding context rot rather than managing it after the fact.

Token budget is a recurring pressure. [KV caching as a shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x when the cache is injected from fast storage rather than recomputed. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. The [headroom library](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction, though [a skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) notes that compression tools lacking task-accuracy benchmarks risk silent data loss in agent pipelines.

Memory architecture is a sub-discipline within context engineering. [Agent memory as belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that storing raw assertions without provenance or confidence scores causes compounding errors; the correct unit of storage is a belief with revision history and outcome scoring. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) operationalizes layered context at scale: schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory all feed the model's context deliberately rather than by open-ended search.

The organizational dimension matters too. [The Typical Set's essay on coding agents](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that specification clarity and shared organizational context were always the bottleneck, and agents amplify existing alignment failures rather than solving them. Context engineering is, in this framing, partly a coordination and documentation discipline, not only a systems one. The [advanced context engineering critique](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) pushes further, contending that no harness engineering compensates for a model's inability to maintain codebase quality over time, placing a hard ceiling on what context construction alone can accomplish.
