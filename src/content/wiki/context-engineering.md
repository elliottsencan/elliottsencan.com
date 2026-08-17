---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what an LLM sees in its context window — covering memory
  architecture, retrieval strategy, state unification, and token efficiency — to
  make agents reliable across long tasks.
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
compiled_at: '2026-08-17T18:41:26.307Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1273
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
  cost_usd: 0.045981
---
Context engineering refers to the deliberate design of what goes into an LLM's context window: which information, in what form, at what granularity, and how it persists across turns or sessions. It sits below prompt engineering in specificity and above infrastructure in abstraction, and it is increasingly understood as the primary lever for making agents work at production scale.

The most direct framing comes from the 12-factor-agents project, which argues in [Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) that execution state and business state should be unified into a single context-window-derived thread. The practical benefits are concrete: one source of truth, trivial serialization, easier debugging, and the ability to resume or fork an agent run by replaying a thread. Anthropic's [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) operationalizes this by using an initializer agent to scaffold a feature list and a progress file that a second coding agent reads at the start of every context window, maintaining continuity across boundaries the model cannot natively cross.

Persistence is one dimension; retrieval is another. Several sources treat retrieval-augmented generation as the default solution, then argue against it. The Karpathy LLM-wiki pattern, examined in [two](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) [Reddit](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) threads, proposes instead that a model ingest documents once and synthesize structured Markdown files it can query wholesale. Cross-document synthesis is better than RAG for curated research, but hallucinations baked in during ingest propagate structurally, making validation non-optional. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) takes a different anti-RAG position: it builds hierarchical tree indexes and uses LLM reasoning over those trees rather than vector similarity, reaching 98.7% accuracy on FinanceBench. [zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) goes further toward simplicity, using plain Markdown on disk with regex retrieval, arguing that minimal RAM and provider neutrality make vector infrastructure an unnecessary dependency.

Memory architecture is a related but distinct problem. A comparative [table of 74 agent memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) shows how varied the design space is. One gist goes further, arguing that [agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), not a storage problem: systems that store assertions without provenance, confidence, or revision history will accumulate contradictions that no retrieval strategy can resolve.

Token efficiency cuts across all of this. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset can reduce prefill costs by up to 20x. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. A [skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression metrics without task-accuracy benchmarks are vanity numbers, and that silent data loss in agent pipelines is a real risk. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a structural approach: applying wavelet transforms to source code to produce multi-resolution views that give LLMs precise structural context at lower token cost than raw text.

At the organizational level, [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that the hard part of agentic software was never code generation but shared context and specification clarity. A [HumanLayer analysis](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) is more pessimistic, contending that no harness engineering fixes the underlying training limitations that make LLMs unable to sustain codebase quality long-term. That disagreement is not yet resolved, and context engineering sits at its center.
