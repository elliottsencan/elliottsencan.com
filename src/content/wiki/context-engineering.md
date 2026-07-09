---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  compressing, routing, and persisting what goes into an LLM's context window,
  treating it as the primary lever for agent reliability and accuracy.
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
compiled_at: '2026-07-09T14:09:39.233Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1303
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
  cost_usd: 0.045918
---
The term "prompt engineering" undersells what modern agent systems actually require. Crafting good instructions is one part; the harder problem is deciding what information exists in the context window at all, when it arrives, and in what form. This broader discipline has come to be called context engineering.

At the structural level, several sources frame context construction as the central architectural concern. The [12-factor-agents guide](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread, so that the entire history of an agent workflow is readable from one place and resumable by loading that thread. The [harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names context construction as one of five core harness subsystems, alongside instructions, state, verification, and session lifecycle. Anthropic's [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log from the sandbox and the brain, so that the context layer can be swapped independently as models improve.

Retrieval is where most context engineering decisions get made in practice. The straightforward approach, vector-similarity RAG, is being challenged from multiple directions. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from documents and uses LLM reasoning rather than vector search for retrieval, reaching 98.7% accuracy on FinanceBench. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) bypasses retrieval entirely by having the model compile raw sources into structured Markdown that can be passed whole; a [builder's honest postmortem](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) confirms the cross-document synthesis is genuinely better than RAG for curated research, but notes that hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable. The [zerostack memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) takes a similar no-infrastructure stance, using plain Markdown files and regex retrieval on the argument that minimal RAM and provider neutrality matter more than semantic search precision.

On the compression side, [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction. A skeptical counterpoint from [Mroczek on RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression tools advertising similar savings may strip only Bash output and risk silent data loss without task-accuracy benchmarks to justify the trade-off. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle on code context, applying wavelet transforms to source as a 1D signal to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers.

At the infrastructure layer, [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treats the cached attention state as a persistent shared asset injected via fast storage rather than recomputed per request, reducing prefill costs substantially. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) go further, keeping data in a REPL environment and letting the model pull selectively into token space, addressing context rot at the architecture level rather than the prompt level.

Persistence across sessions is its own subproblem. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) stores session context in a .story/ directory of JSON files so an AI coding assistant accumulates knowledge across invocations. [Anthropic's long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent to scaffold a feature list and progress file that a second agent reads across many context windows.

The organizational dimension matters too. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that the real bottleneck in coding agent deployments is shared context and specification clarity across teams, not the model's code-writing ability. Context engineering, in that framing, is as much a coordination problem as a technical one.
