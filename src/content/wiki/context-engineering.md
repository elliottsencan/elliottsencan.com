---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately designing what
  information enters an LLM's context window, how it is structured, compressed,
  persisted, and retrieved — the layer where most practical agent performance is
  actually won or lost.
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
compiled_at: '2026-11-17T01:39:23.109Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1439
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
  cost_usd: 0.048921
---
Context engineering is the practice of deciding what goes into a model's context window, in what form, at what time, and how it is maintained across turns and sessions. The term stands in contrast to prompt engineering: rather than crafting clever phrasing, it concerns the architecture of information flow.

The clearest statement of the stakes comes from [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code), which argues that coding agents make individual code-writing cheap but cannot fix the deeper problem of shared context and specification clarity. What breaks agent workflows is not model capability but the information the model is — or is not — given to work with.

This plays out structurally across agent harnesses. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent system where an initializer scaffolds a feature list, a git repo, and a progress file so that an incremental coding agent can maintain coherent state across many context windows. The harness is, in this framing, a context-delivery mechanism. [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle — that together determine what the model knows at each step. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) pushes further, arguing that execution state and business state should be unified into a single context-window-derived thread, making the entire history serializable, debuggable, and recoverable from any point.

Retrieval is one half of context engineering. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, achieving 98.7% accuracy on FinanceBench without embeddings. The Karpathy LLM-wiki pattern, documented in [Building Karpathy's LLM Wiki: Honest Takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) and [How to Implement Karpathy's LLM Knowledge Base](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), takes a different approach: compile structured Markdown at ingest time so retrieval becomes a lookup rather than a search. The tradeoff is that hallucinations baked in at ingest propagate structurally, making a lint step mandatory. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) operationalizes this with a bash CLI that generates both a human-readable INDEX.md and a machine-readable manifest.json to let agents navigate without burning excess tokens.

Compression is the other half. [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60–95% token reduction. [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) is a useful corrective: claimed savings are only meaningful when paired with task-accuracy benchmarks, and stripping output aggressively risks silent data loss in pipelines. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) addresses the same constraint differently, applying wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without discarding information.

Persistence across sessions is a third dimension. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context in a .story/ directory of JSON files. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with auto-injected XML blocks and three retrieval tools. Both reject vector stores in favor of file-based approaches that impose minimal infrastructure. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes the challenge entirely: storage architecture matters less than whether stored assertions carry provenance, confidence, and revision history, without which a memory system accumulates stale beliefs rather than maintained knowledge.

Anthropics production analytics stack illustrates what well-engineered context achieves at scale: [How Anthropic Enables Self-Service Data Analytics with Claude](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) automated 95% of business analytics queries at ~95% accuracy using canonical datasets, a semantic layer, and curated skill docs that route Claude to governed sources. [What Anthropic Got Right About Agentic Analytics](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes the costs: months of senior data engineering work and warehouse reshaping that most organizations cannot replicate. The accuracy is a product of the context layer, not the model alone.
