---
title: Context engineering
summary: >-
  Context engineering is the discipline of designing what information enters an
  LLM's context window, when it enters, and in what form — a layer of practice
  that sources across agent architecture, memory design, and retrieval all
  converge on.
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
compiled_at: '2026-08-03T19:31:20.177Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1220
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
  cost_usd: 0.045186
---
Context engineering sits between model capability and application outcome. The idea is simple: what a model sees determines what it can do, so the construction of that context is itself an engineering discipline, not an afterthought. The 12-factor-agents project makes this explicit in its fifth factor, arguing that [execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) — keeping one source of truth that is trivially serializable, debuggable, and resumable. When state lives elsewhere, context becomes a leaky approximation of what actually happened.

The architectural challenge scales with task duration. Anthropic's harness engineering post describes a two-agent pattern — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — designed so Claude can make consistent progress [across many context windows without losing state](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service extends this further by separating the agent harness, session log, and sandbox into stable interfaces, [cutting p50 time-to-first-token by roughly 60%](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) through prompt caching and controlled context injection.

On the retrieval side, context engineering asks whether vector similarity is actually the right mechanism for deciding what a model should see. PageIndex builds hierarchical tree indexes from long documents and uses LLM reasoning rather than embeddings, [achieving 98.7% accuracy on FinanceBench](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) by treating retrieval as a reasoning problem. Karpathy's LLM wiki pattern takes a different angle: ingest documents once, have the model compile structured Markdown, then query that compiled knowledge without RAG at all. A developer who built this end-to-end found that [cross-document synthesis genuinely beats RAG for curated research](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), but that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable.

Memory systems are a subproblem. zerostack's approach uses plain Markdown files with auto-injected XML context blocks and keyword search, [no vector stores, no embeddings, no infrastructure](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more skeptical view argues that memory systems fail because they store assertions rather than beliefs, missing provenance and revision history — [the real problem is belief maintenance, not storage](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). Storybloq addresses the session-continuity angle with a `.story/` directory of JSON files that [persist AI coding session context across sessions](/reading/2026-05/2026-05-11t155625-storybloqstorybloq), converting a stateless assistant into a compounding collaborator.

Token economics run through all of it. KV caching, when treated as a persistent shared asset injected via fast storage rather than recomputed, [can reduce prefill costs by up to 20x](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Compression proxies like headroom claim 60-95% token reductions on tool outputs and RAG chunks [before they reach the LLM](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though skeptics note that compression metrics without task-accuracy benchmarks [are vanity numbers](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). Recursive Language Models propose keeping data in a REPL environment and [letting the model selectively pull it into token space](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) to avoid context rot entirely.

At the organizational level, The Typical Set observes that coding agents [amplify whatever alignment or misalignment an organization already has](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code): shared context, specification clarity, and management coherence were always the real bottleneck, and agents make that more visible, not less. Context engineering is, in this framing, as much about what humans write before the model runs as about what the harness injects at runtime.
