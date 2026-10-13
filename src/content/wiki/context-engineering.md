---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what goes into an LLM's context window — spanning memory
  architecture, retrieval strategy, state unification, and token budgeting — to
  make agent systems reliable at scale.
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
compiled_at: '2026-10-13T00:12:52.265Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1359
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
  cost_usd: 0.047721
---
The phrase "prompt engineering" undersells what practitioners actually do. What matters is not the wording of a single instruction but the entire information environment the model operates inside: what facts are present, in what form, at what resolution, and what has been deliberately excluded. This broader discipline has settled into the term context engineering.

The most immediate version of the problem is state. In long-running agent tasks, context windows expire and work is lost. Anthropic's harness engineering work addresses this directly: an initializer agent scaffolds a feature list, a git repo, and a progress file before a coding agent begins, so that state survives across context resets [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The 12-factor-agents project takes a complementary stance, arguing that execution state and business state should be unified into a single context-window-derived thread rather than tracked separately, because the thread is then trivially serializable, debuggable, and resumable [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Retrieval is the other half of the problem. The default answer has been vector-similarity RAG, but several sources push back on it. The LLM-wiki pattern — having the model compile raw documents into structured Markdown and query those files at inference time — outperforms RAG for cross-document synthesis, though hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable [Building Karpathy's LLM Wiki: Honest Takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% on FinanceBench without embeddings [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Recursive Language Models go further, keeping data in a REPL environment and letting the model pull selectively into token space to avoid context rot entirely [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Token budget is itself an engineering surface. The KV cache can be treated as a persistent shared asset rather than a per-request recomputation, cutting prefill costs by up to 20x via RDMA injection [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). WaveScope applies wavelet transforms to source code as a 1D signal, producing multi-resolution structural summaries that give precise context without language-specific parsers [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Compression proxies like headroom claim 60-95% token reduction on tool outputs and RAG chunks [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though a pointed critique of similar tools warns that compression metrics are vanity numbers without task-accuracy benchmarks to back them up [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Memory architecture sits under all of this. zerostack uses plain Markdown files with auto-injected XML blocks and three simple tools, arguing this beats vector stores under real infrastructure constraints [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A sharper critique reframes the problem entirely: memory systems fail not because of storage technology but because they store assertions rather than beliefs, missing provenance, confidence, and revision history [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Anthropics's production analytics stack shows context engineering operating at organizational scale: canonical datasets, a semantic layer, and curated skill docs route Claude to governed data sources, automating 95% of queries at 95% accuracy [How Anthropic Enables Self-Service Data Analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). A critic notes that this result required months of senior data engineering to reshape the warehouse, making it hard to replicate [What Anthropic Got Right About Agentic Analytics](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). The broader organizational point recurs elsewhere: coding agents amplify whatever context clarity or misalignment already exists, so the bottleneck has always been specification and shared understanding rather than code generation speed [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code).
