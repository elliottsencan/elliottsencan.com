---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, managing,
  and compressing what enters an LLM's context window — spanning memory
  architecture, retrieval strategy, state representation, and token efficiency —
  to produce reliable agent behavior at scale.
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
compiled_at: '2026-07-04T21:18:09.123Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1375
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
  cost_usd: 0.046998
---
Context engineering sits at the center of modern agent system design. Where early LLM integration treated the context window as a passive recipient of prompts, the current practice treats it as the primary engineering surface: what goes in, in what form, at what cost, and with what guarantees about accuracy and continuity.

The most fundamental tension is between completeness and cost. Long contexts are expensive to prefill and recompute on every turn. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) addresses this by treating the cached key-value state as a persistent data asset injected via RDMA rather than recomputed, cutting prefill costs by up to 20x. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) takes the complementary approach: compressing tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. A critical counterpoint comes from [an analysis of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk), which argues that token-savings claims are vanity metrics unless backed by task-accuracy benchmarks — compression that silently drops information is worse than no compression.

Retrieval strategy is the second axis. Classic vector-similarity RAG has competitors. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes over long documents and uses LLM reasoning rather than embedding similarity to find relevant passages, reaching 98.7% accuracy on FinanceBench without vectors. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) go further: keeping data in a REPL environment and letting the model pull selectively into token space, avoiding context rot entirely. The Karpathy LLM-wiki pattern, explored in [a practical implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and evaluated critically in [an honest retrospective](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), replaces retrieval with pre-synthesized structured Markdown — superior for curated cross-document reasoning, but hallucinations baked in at ingest propagate structurally, making lint and health-check steps non-negotiable.

Memory architecture determines what persists across turns. [zerostack's memory subsystem](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) uses plain Markdown files with regex retrieval, chosen for minimal RAM and provider neutrality. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context as JSON files in a `.story/` directory, threading state across stateless AI assistant sessions. Both approaches contrast with the more principled argument in [a belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) that memory systems fail when they store bare assertions without provenance, confidence, or revision history — the real problem is not storage format but epistemic structure.

State representation in multi-turn agent systems deserves its own treatment. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, making the entire history serializable, debuggable, and recoverable from any point. [Anthropic's long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) implements a concrete version: an initializer scaffolds a feature list and progress file, and an incremental coding agent reads from it across many context windows without losing continuity. [Anthropic's Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve.

Context quality upstream matters as much as retrieval downstream. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) achieves 95% query accuracy through canonical datasets, a semantic layer, and curated skill documentation that routes the model to governed sources. A critique from [Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes this required months of senior data engineering work — the context didn't engineer itself. [The Typical Set's coding-agent essay](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) generalizes the point: the bottleneck was always shared context and specification clarity, and agents amplify whatever alignment or misalignment already exists in the organization.
