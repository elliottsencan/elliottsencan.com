---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  and maintaining what goes into an LLM's context window — covering memory
  architecture, retrieval strategy, state serialization, and harness design — to
  make AI agents reliable and cost-effective.
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
compiled_at: '2026-08-24T18:40:53.839Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1327
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
Context engineering sits beneath most practical agent reliability problems. Prompt writing is a subset of it; the broader discipline covers what information reaches the model, how it is structured, when it is discarded or compressed, and how it persists across sessions or across multiple agents.

The simplest framing: the context window is the only thing a model can reason about, so controlling its contents is the primary lever for controlling model behavior. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) makes this explicit in its "unify execution state" factor, arguing that both execution metadata and business history should be inferred from a single thread rather than maintained as separate state stores. The benefit is not just simplicity; it enables serialization, forking, and recovery from any checkpoint.

When context accumulates naively, quality degrades. [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering) calls this "context rot" and treats it as a core concept engineers need a durable mental model for. One structural answer is Recursive Language Models, described in [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms), which keep data in a REPL environment and let the model pull selectively into token space rather than injecting everything upfront.

Retrieval strategy is where context engineering meets system architecture. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM-wiki pattern takes a different route: the model pre-synthesizes curated documents into structured Markdown so that query time requires no retrieval at all. [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) found this approach genuinely superior to RAG for cross-document synthesis, but noted that hallucinations baked in at ingest propagate structurally, making the lint step non-negotiable.

Compression is the cost-side of the problem. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60-95% token reduction. KV caching takes a different angle: [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) argues that treating the KV cache as a persistent shared asset injected via fast storage can reduce prefill costs by up to 20x. Compression claims warrant scrutiny; [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that headline token savings often strip only Bash output and carry no task-accuracy benchmarks.

Memory architecture is a recurring design question. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML blocks, no vector store required. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the harder issue is provenance and revision history, not storage format: memories without confidence scores or supersession logic become quietly stale.

Harness design translates context engineering choices into operational systems. [Anthropic's Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes an initializer-plus-incremental-agent pattern that writes a progress file between context windows so the model can resume without losing state. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60%.

The organizational layer matters too. [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that coding agents amplify whatever alignment or misalignment already exists in an organization: shared context and specification clarity are the real constraints, and no amount of harness engineering substitutes for them. [humanlayer/advanced-context-engineering-for-coding-agents](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) pushes further, contending that lights-off software factories fail because LLMs cannot maintain codebase quality over time, a limitation that no context engineering approach can fully paper over.
