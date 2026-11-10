---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  structuring, and managing what an LLM receives in its context window —
  spanning memory systems, retrieval strategies, state unification, and
  compression — to make agent behavior reliable and cost-effective.
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
compiled_at: '2026-11-10T01:15:25.798Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1378
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
  cost_usd: 0.048006
---
The phrase "prompt engineering" undersells what actually determines LLM agent quality. What matters is not a clever system prompt but the entire information environment the model reasons over: what goes in, in what form, at what granularity, and how it stays coherent across turns. This broader discipline has begun consolidating under the name context engineering.

The most basic axis is what to include and what to leave out. Anthropic's Managed Agents architecture separates the session log, harness, and sandbox into stable interfaces precisely so the context passed to the model can be refined independently of everything else [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). The 12-factor-agents project frames this as owning your context window: execution state and business state should be unified into a single thread from which all state can be inferred, making the context the source of truth rather than a side-channel [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Retrieval is where most context engineering decisions become concrete. Vector similarity is the default, but several projects argue against it. PageIndex builds hierarchical tree indexes from long documents and routes queries via LLM reasoning rather than embedding distance, reaching 98.7% accuracy on FinanceBench [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). The Karpathy LLM-wiki pattern goes further: ingest documents once, have the model synthesize structured Markdown files, and query the compiled wiki directly at inference time, skipping retrieval altogether for curated domains [How to Implement Karpathy's LLM Knowledge Base](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base). A weekend implementation of this pattern found cross-document synthesis genuinely superior to RAG, but also found that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). Recursive Language Models (RLMs) approach this differently, keeping data in a REPL environment and letting the model pull selectively into token space, attacking context rot at its source [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Memory architecture is a sub-problem of context engineering with its own design space. At the minimal end, zerostack uses plain Markdown files and regex search, arguing that the operational simplicity outweighs embedding infrastructure for most agent workloads [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more principled critique argues that memory systems fail not because of storage technology but because they store assertions rather than beliefs, missing provenance, confidence, and revision history [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). Storybloq addresses session continuity specifically, persisting coding session context across Claude sessions in a .story/ directory so each session inherits accumulated understanding [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq).

Compression and cost sit at the other end of the pipeline. KV caching treated as a persistent shared asset rather than a per-request artifact can cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). The headroom library compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). A skeptical counterpoint notes that token compression claims are often vanity metrics measured against stripped Bash output, without task-accuracy benchmarks to justify the reliability trade-off [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Across all these dimensions, the underlying argument is organizational as much as technical. Coding agents amplify whatever alignment or misalignment already exists in a team's specifications and shared understanding [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's self-service analytics stack illustrates this: 95% accuracy depended on months of data engineering work to build canonical datasets and a semantic layer, not on model capability alone [How Anthropic Enables Self-Service Data Analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). Context engineering is, at bottom, the work of making organizational knowledge legible to a model.
