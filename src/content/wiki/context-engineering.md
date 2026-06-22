---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, managing,
  and compressing the information an LLM receives — shaping what fits in the
  context window and how state persists across turns, sessions, and agents.
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
compiled_at: '2026-06-22T07:23:58.478Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8570
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
  cost_usd: 0.04401
---
Context engineering treats the context window not as a passive container but as the primary lever of agent behavior. What an LLM knows at inference time — and how that knowledge is structured — determines output quality more than model size or prompt cleverness alone. The sources here approach this from several angles: retrieval architecture, session persistence, state unification, memory design, and token compression.

The retrieval side has moved away from vector similarity toward structure-aware indexing. PageIndex [builds hierarchical tree indexes](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) from long documents and uses LLM reasoning rather than embeddings to locate relevant content, reaching 98.7% accuracy on FinanceBench. The Karpathy LLM-wiki pattern takes a different route: [ingest raw documents and have the model compile structured Markdown files](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), then query those files directly without RAG at runtime. A practitioner who built this end-to-end [found cross-document synthesis genuinely superior to RAG](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) for curated research, but noted that hallucinations baked in at ingest propagate structurally, making lint and health checks non-negotiable.

Session state is a recurring problem. Stateless assistants lose work between sessions; the common fix is explicit persistence. Storybloq [persists coding session context in a .story/ directory](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) of JSON files so sessions compound rather than restart. Anthropic's harness for long-running agents [uses an initializer to scaffold a feature list, git repo, and progress file](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) that the incremental coding agent reads across context windows. The 12-factor-agents project [argues that execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), because inferring all state from the thread simplifies serialization, recovery, and debugging.

Memory architecture is contested. The zerostack agent [uses plain Markdown files with regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) on the grounds that vector stores add infrastructure overhead without proportional benefit at small scale. One critique goes further: [agent memory fails when it stores assertions rather than beliefs](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), missing provenance, confidence, and revision history. The proposed fix is a belief-maintenance architecture with supersession and outcome-scored pruning.

Token pressure runs through every layer. The headroom library [compresses tool outputs, logs, and RAG chunks before they reach the LLM](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), cutting token usage 60–95%. KV cache reuse [can reduce prefill costs by up to 20x](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) when treated as a persistent shared asset rather than a per-request computation. WaveScope takes a structural approach, [applying wavelet transforms to source code](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) to produce multi-resolution views that are more token-efficient than raw file dumps.

At the organizational level, [the bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) — it was shared context, specification clarity, and management coherence. Agents amplify existing alignment, so poorly engineered context propagates misalignment at scale. Anthropic's agentic analytics stack [achieved 95% accuracy by building canonical datasets, a semantic layer, and curated skill docs](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) that route the model to governed sources. A critic [notes this required months of senior data engineering work](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) most organizations cannot replicate, which makes the investment in context infrastructure itself a strategic decision.
