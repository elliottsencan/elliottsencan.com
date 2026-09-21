---
title: Context engineering
summary: >-
  Context engineering is the deliberate design of what goes into an LLM's
  context window — structure, retrieval strategy, compression, and state
  management — treated as a first-class engineering discipline rather than a
  prompting afterthought.
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
compiled_at: '2026-09-21T21:47:11.961Z'
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
Context engineering names the practice of deciding what information reaches an LLM, in what form, and when. The term spans decisions that used to be treated as incidental: which documents to retrieve, how to compress tool outputs, how to persist state across sessions, and how to structure memory so the model can reason without being overwhelmed or starved of relevant facts.

The case for treating this as a distinct discipline appears across several sources. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should both live in the context window, inferred from a unified thread rather than maintained separately — simplifying serialization, debugging, and recovery. Anthropic's harness engineering work takes the same position from the infrastructure side: the [Effective Harnesses post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes scaffolding that writes progress files between context windows so that agents can resume without losing their place, while [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log into a stable interface that can be swapped as models improve.

Retrieval strategy is one of the most contested subproblems. The dominant approach — vector similarity RAG — is challenged on multiple fronts. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes and uses LLM reasoning rather than embeddings to retrieve context, claiming 98.7% accuracy on FinanceBench. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) sidestep the problem further by keeping data in a REPL environment and letting the model pull only what it needs into token space. The Karpathy wiki pattern, covered across [a practical Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [an honest post-mortem](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), skips retrieval entirely for curated domains: the LLM maintains structured Markdown files it can fully load, trading storage costs for superior cross-document synthesis. The post-mortem notes that hallucinations baked in at ingest propagate structurally, making a lint step non-negotiable.

Compression is the other major lever. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce multi-resolution structural views without language-specific parsers. A skeptical counterpoint: [Przemek Mroczek's critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that compression tools touting 60-90% savings are reporting vanity metrics unless backed by task-accuracy benchmarks, since lossy compression in agent pipelines risks silent data loss.

Memory architecture sits underneath all of this. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML blocks, avoiding vector infrastructure entirely. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context as JSON files so coding agents compound knowledge across sessions. A more critical frame comes from [Jakedismo's belief-maintenance argument](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): storing assertions without provenance, confidence, or revision history is the real failure mode, and any storage format that ignores supersession will degrade over time.

The organizational dimension matters too. [The Typical Set's essay on coding agents](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) observes that shared context and specification clarity were the real bottlenecks before agents, and agents amplify whatever alignment an organization already has. Context engineering is not purely a technical problem — poorly scoped instructions and missing institutional knowledge produce bad outputs regardless of retrieval quality or compression ratio. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) illustrates the point: 95% accuracy depended on months of data engineering work to build canonical datasets and a semantic layer, a cost [Genloop's critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes most organizations cannot replicate.
