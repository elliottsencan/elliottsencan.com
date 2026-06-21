---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, structuring,
  and managing what an LLM receives in its context window, covering everything
  from prompt caching and hierarchical indexing to memory architectures and
  harness design.
sources:
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching
  - >-
    2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure
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
aliases:
  - context-management
compiled_at: '2026-06-18T21:42:33.866Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8741
    output_tokens: 1197
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
  cost_usd: 0.044178
last_source_added: '2026-06-21T18:22:20.908Z'
---
Context engineering sits at the intersection of systems design and language model behavior: the premise is that model quality is largely fixed, so the leverage point is controlling what the model sees. That framing appears across the sources here in different forms, from infrastructure-level caching to belief-maintenance theory.

The most concrete lever is what goes into the context window and when. Anthropic's harness work [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) solves multi-session continuity by having an initializer agent scaffold a feature list and progress file so each subsequent coding session inherits structured state rather than starting cold. The 12-factor-agents pattern [Factor 5: Unify Execution State](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) takes this further, arguing that execution state and business state should collapse into a single context-window-derived thread, making the context itself the source of truth for serialization, recovery, and debugging.

At infrastructure scale, KV caching addresses a related problem: redundant prefill computation. Persistent storage-backed caching [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) hashes prompt prefixes and injects cached tensors, cutting time-to-first-token by up to 20x. Granular-prompt caching [Maximizing LLM Efficiency: Granular-Prompt Caching](/reading/2026-05/2026-05-20t073144-maximizing-llm-efficiency-granular-prompt-caching-with-pure) extends this by segmenting prompts into reusable checkpoints so only token deltas are processed.

On the retrieval side, several approaches challenge the RAG orthodoxy. WaveScope [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code, producing hierarchical multi-resolution views that reduce token usage by up to 92%. PageIndex [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces embeddings with LLM-built structured page indexes for reasoning-based retrieval. The Karpathy LLM wiki pattern, described from multiple angles [Building Karpathy's LLM Wiki: Honest Takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), synthesizes raw documents into maintained Markdown files that an LLM queries directly; cross-document synthesis quality exceeds RAG for curated research, but hallucinations baked in at ingest propagate structurally, making lint steps non-negotiable.

Memory architecture is where context engineering gets philosophically contested. The hindsight library [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) uses biomimetic data structures for multi-strategy retrieval. Zerostack's implementation [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) rejects vector stores entirely in favor of plain Markdown and regex retrieval under RAM and infrastructure constraints. One analysis [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues all of these approaches share a deeper flaw: they store assertions rather than beliefs with provenance, confidence, and revision history, proposing instead a truth-maintenance architecture with supersession and utility-scored pruning.

The organizational dimension matters too. Coding agents amplify whatever context clarity already exists in a team [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code), meaning context engineering is partly a documentation and specification problem, not just a retrieval or caching one. Anthropic's internal analytics stack How Anthropic Enables Self-Service Data Analytics with Claude achieved 95% query accuracy by building layered canonical data foundations and structured sources of truth, precisely to eliminate context ambiguity before it reaches the model.
