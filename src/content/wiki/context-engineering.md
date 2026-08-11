---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately shaping what information
  enters an LLM's context window, and when, to produce reliable agent behavior —
  spanning retrieval strategy, memory architecture, state management, and token
  efficiency.
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
compiled_at: '2026-08-11T07:52:29.189Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1330
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
  cost_usd: 0.046836
---
Context engineering sits beneath most of what makes AI agents succeed or fail. The concept is simple: models only reason about what they can see, so the quality of their output is a direct function of what gets placed in front of them, in what form, and at what moment. The field has grown because naive approaches — raw document dumps, monolithic system prompts, vector similarity retrieval — all degrade at production scale.

The most immediate design question is what retrieval strategy to use. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) makes the case against vector similarity as a universal solution, building hierarchical tree indexes and using LLM reasoning for retrieval instead, reaching 98.7% accuracy on FinanceBench where embedding-based methods plateau. The Karpathy LLM-wiki pattern takes a different route: ingest documents once, have the model compile structured Markdown files, and query the compiled corpus without RAG at all. [A practical implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [a first-hand build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) both confirm that cross-document synthesis outperforms RAG for curated research, but the build report adds a critical caveat: hallucinations baked in at ingest propagate structurally through the compiled files, making the lint step non-negotiable.

Memory architecture is a parallel concern. [zerostack's file-based system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown with auto-injected XML context blocks and three retrieval tools, no vector store, no daemon. The [design rationale](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) is explicit: minimal RAM footprint and provider neutrality outweigh embedding convenience. A more fundamental critique comes from [a belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): storage systems fail because they record assertions without provenance, confidence, or revision history, making stale or wrong context indistinguishable from current truth. The [zero-dependency bash CLI for tiered markdown knowledge bases](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) addresses the navigation problem with a human-readable INDEX.md and a machine-readable manifest.json, so agents can find relevant context without burning tokens on full-corpus reads.

Token efficiency is where context engineering meets infrastructure. [KV caching treated as a persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x when injected from fast storage rather than recomputed per request. The [headroom library](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction. A skeptical counterpoint from [an analysis of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression tools can strip meaningful data from agent pipelines and that token-count savings without task-accuracy benchmarks are vanity metrics.

State management is the third axis. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should collapse into a single context-window-derived thread, making the agent trivially serializable, forkable, and resumable. Anthropic's Effective Harnesses implements this with an initializer that writes a feature list and progress file to disk, letting an incremental coding agent pick up across context windows without drift. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five subsystems — instructions, state, verification, scope, and session lifecycle — as the complete surface area for turning flaky model output into dependable results.

Organizationally, [The Typical Set's essay on coding agents](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) frames context engineering as a management problem as much as a technical one: shared context, specification clarity, and organizational alignment determine outcomes, and agents amplify whatever coherence or confusion already exists. The [harness-forge optimizer](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) makes this operational by running a propose-score-Pareto loop to optimize memory, retrieval, and context construction around a fixed model, treating the scaffolding itself as the artifact to be engineered.
