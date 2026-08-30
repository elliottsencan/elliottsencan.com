---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what goes into an LLM's context window so agents produce
  accurate, reliable output across sessions and at scale.
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
compiled_at: '2026-08-30T05:49:32.914Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1172
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
  cost_usd: 0.044916
---
The phrase "context engineering" names something that practitioners have been doing piecemeal for years: deciding what information an LLM sees, in what form, at what moment. As agent systems have grown longer-running and more autonomous, that decision has hardened into a distinct engineering discipline.

The core problem is that LLMs have no persistent world model. Everything they know during a task must fit inside the context window, which means the engineer controls epistemology by controlling what goes in. [12-factor-agents factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) makes this explicit: execution state and business state can be unified into a single context-window-derived thread, so the entire agent history is one serializable artifact rather than two systems that must stay synchronized. Anthropic's long-running agent harness takes the same stance, using a progress file written to disk so that a new context window can reconstruct where the previous one left off [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

The Karpathy LLM-wiki pattern, documented in two community threads, pushes context engineering toward knowledge bases: rather than querying raw documents at inference time, a model ingests and synthesizes them into structured Markdown files that later sessions load directly [Karpathy wiki guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base). The honest takeaway from someone who built the system end-to-end is that cross-document synthesis is genuinely superior to retrieval-augmented generation for curated corpora, but hallucinations baked in at ingest propagate structurally, making lint and health-check steps non-negotiable [Karpathy wiki takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex takes the anti-vector position further, replacing embedding similarity with LLM reasoning over hierarchical tree indexes to achieve 98.7% accuracy on structured document retrieval [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

Token budget is a hard constraint that shapes every design choice. The headroom library compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60-95% token reduction [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). KV caching is the infrastructure-level complement: treating the computed key-value state as a shared, persistent asset rather than recomputing it per request can cut prefill costs by up to 20x [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). WaveScope encodes source code as a wavelet-transformed 1D signal so LLMs receive multi-resolution structural views without language-specific parsers, trading representation fidelity for token efficiency [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

Memory systems are context engineering extended across time. zerostack uses plain Markdown files with auto-injected XML context blocks and three read/write/search tools, deliberately avoiding vector stores to minimize infrastructure [zerostack memory](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). The belief-maintenance framing argues this is still insufficient: storing assertions rather than beliefs with provenance, confidence, and revision history is why agent memory systems fail [belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Anthropics agentic analytics stack demonstrates what curated context can achieve at production scale: canonical datasets, a semantic layer, and skill docs routed Claude to governed sources rather than open warehouse search, reaching 95% accuracy across 95% of queries [Anthropic analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). The critique of that result is pointed: the accuracy depends on months of senior data-engineering work that most organizations cannot replicate [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). Context engineering, in other words, is not a prompt trick; it is organizational work.
