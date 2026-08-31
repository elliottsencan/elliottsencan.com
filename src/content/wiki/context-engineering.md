---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  and maintaining the information fed to an LLM — treating the context window as
  the primary design surface for agent reliability and accuracy.
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
compiled_at: '2026-08-31T22:31:17.892Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1257
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
  cost_usd: 0.046191
---
Context engineering starts from a simple observation: model weights are fixed at inference time, so the only lever a developer controls in real time is what goes into the context window. How that window is populated, structured, compressed, and maintained determines whether an agent produces useful output or drifts into incoherence.

The most basic form of the problem is selection and structure. [Anthropic's self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) solved it by building canonical datasets, a semantic layer, and curated skill docs so Claude always routes to governed sources rather than searching freely. OpenAI's internal data agent takes a layered approach — schema metadata, human annotations, code enrichment, institutional docs, and a self-improving memory — to cover [600+ petabytes across 70,000 datasets](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent). In both cases the heavy lifting is curation, not model capability.

Long-running agents make this harder because a single context window is not enough. Anthropic's harness work uses an initializer agent to scaffold a feature list and a progress file that a second incremental agent reads at the start of each new window, so state survives across resets. The 12-factor-agents project makes a related argument: if you design the context carefully enough, [execution state and business state can collapse into a single serializable thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), eliminating a whole class of synchronization bugs.

Compression and retrieval sit alongside selection. The Karpathy LLM-wiki pattern replaces RAG with model-compiled Markdown files that synthesize across documents; practitioners report [superior cross-document reasoning but structural hallucination propagation if ingest goes wrong](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), making lint checks mandatory. PageIndex builds hierarchical tree indexes so an LLM can reason over document structure rather than vector similarity, hitting [98.7% accuracy on FinanceBench](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). At the token level, the headroom library compresses tool outputs and RAG chunks before they reach the model, [claiming 60-95% reduction without quality loss](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), though a critical counterpoint from Mroczek argues that [compression metrics without task-accuracy benchmarks are vanity numbers](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Memory is context engineering across sessions. Approaches range from plain Markdown files with regex retrieval — the [zerostack design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) and [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) both argue that no vector store is needed for many workloads — to the more structured belief-maintenance view, which holds that [storing assertions without provenance, confidence, or revision history causes agents to act on stale or contradictory information](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). The harness-forge project treats context construction itself as something to be [optimized via a propose-score-Pareto loop](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) rather than designed once and left alone.

At the infrastructure level, KV caching means that [stable prefixes injected from fast storage rather than recomputed can cut prefill costs by up to 20x](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching), making context structure a performance decision as well as a correctness one. Recursive Language Models push the idea further by keeping data in a REPL environment and [letting the model pull selectively into token space](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) rather than loading everything upfront.

The organizational dimension matters too. Coding agents amplify existing alignment or misalignment; [the real bottleneck is shared context and specification clarity](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code), not code-writing speed. Context engineering, in that framing, is as much a coordination practice as a technical one.
