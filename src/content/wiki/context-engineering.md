---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  and maintaining what an LLM sees in its context window — the information
  architecture problem that underlies reliable agent behavior.
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
compiled_at: '2026-07-08T00:11:17.125Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1411
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
  cost_usd: 0.047538
---
Context engineering treats the LLM context window not as an incidental byproduct of a prompt but as a designed artifact. What goes in, in what form, at what point in an agent's lifecycle determines whether the model reasons well or drifts. The discipline spans memory architecture, state serialization, token efficiency, retrieval strategy, and the scaffolding that keeps context coherent across sessions.

The structural case for deliberate context management appears in multiple agent harness designs. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) architecture separates the session log from the execution sandbox, making context a first-class interface rather than a side effect. Their [harness for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) goes further: an initializer scaffolds a feature list and progress file before any coding begins, so each subsequent context window inherits structured state rather than starting blind. The [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) project frames this as unifying execution state and business state into a single context-window-derived thread — one source of truth that is trivially serializable, debuggable, and resumable.

Memory systems are the long-horizon version of the same problem. The [zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) approach uses plain Markdown files and regex retrieval, arguing that vector stores add infrastructure cost without proportionate retrieval gain for many workloads. A sharper critique comes from [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): storing assertions without provenance, confidence, or revision history turns memory into a source of compounding error rather than compounding knowledge. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) addresses the navigation layer, generating both a human-readable index and a machine-readable manifest so agents can locate relevant context without burning tokens on exhaustive reads.

Retrieval strategy sits adjacent to storage. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench. [Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) takes the opposite tack — compiling curated knowledge into structured Markdown that can be queried wholesale — but builders report that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable.

Token efficiency is the pressure that makes all of this matter at scale. [KV caching treated as a persistent shared data asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can reduce prefill costs by up to 20x. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers. Against these claims, [one skeptical take](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that compression tools reporting 60-90% savings are vanity metrics if they lack task-accuracy benchmarks.

At the organizational level, [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that context problems are not purely technical: shared organizational context, specification clarity, and management coherence are the bottlenecks that agents amplify. [Anthropic's analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) makes the same point in practice — 95% query accuracy required canonical datasets, a semantic layer, and curated skill docs, none of which are model improvements. A [critique of that stack](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that the engineering investment required is beyond most organizations, which is a context engineering cost, not a model capability gap.

The [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) project frames context construction itself as an optimization target: running a propose-score-Pareto loop over memory, retrieval, and prompt templates to find the scaffolding configuration that maximizes model output quality for a fixed model. Context engineering, on this view, is not a one-time design decision but a continuous tuning surface.
