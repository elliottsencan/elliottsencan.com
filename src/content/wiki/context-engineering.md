---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  routing, and persisting what enters an LLM's context window — treating it as a
  first-class engineering surface rather than an incidental prompt.
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
compiled_at: '2026-07-01T00:35:04.393Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1481
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
  cost_usd: 0.048588
---
Context engineering treats the LLM context window as a system resource that must be designed, not assumed. Where prompt engineering focuses on phrasing instructions well, context engineering asks which information should be present, in what form, at what cost, and how it survives across sessions and agents.

The 12-factor-agents project captures the foundational principle directly: execution state and business state should be unified into a single context-window-derived thread, so that all state is inspectable, serializable, and resumable from one place [12-factor agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's Managed Agents service operationalizes this at scale by separating the agent harness, session log, and sandbox into stable interfaces, which lets the context layer evolve independently as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). Their long-running agent harness extends the pattern further: an initializer scaffolds a feature list and progress file that a coding agent reads across many context windows, so work accumulates without state loss [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

What goes into the context window, and at what token cost, is itself a contested design space. KV caching reframes the prefill computation as a persistent shared asset, potentially cutting inference costs by up to 20x when long contexts repeat across requests [KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Headroom takes a complementary approach, compressing tool outputs, logs, and RAG chunks before they enter the window at all, claiming 60-95% token reduction [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). Skeptics of compression tools note that vanity token metrics can mask silent data loss and the absence of task-accuracy benchmarks [Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). The right position likely depends on pipeline specifics rather than any single tool's headline number.

Retrieval architecture is a major lever. PageIndex builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). WaveScope applies wavelet transforms to source code as a 1D signal, producing multi-resolution structural views that give precise, token-efficient code context without language-specific parsers [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Recursive Language Models take a different angle, keeping data in a REPL environment and letting the LLM pull selectively into token space, directly countering context rot [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Memory systems are the persistence layer of context engineering. They range from plain Markdown files with regex retrieval [zerostack memory](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) to auto-injected XML context blocks [zerostack design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) to structured session JSON persisted across coding sessions [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). One analysis argues these systems fail when they store bare assertions rather than beliefs with provenance, confidence, and revision history, proposing a JSONL belief-maintenance architecture with supersession and outcome-scored pruning [belief-maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Karpathy's LLM wiki pattern extends context engineering to knowledge management: LLM-compiled Markdown files serve as a structured context store queryable at inference without RAG, but hallucinations baked in at ingest propagate structurally, making lint and health-check steps non-negotiable [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). The harness engineering framing synthesizes many of these concerns into five subsystems: instructions, state, verification, scope, and session lifecycle [harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

The organizational dimension is underrated. Coding agents amplify whatever specification clarity and alignment already exist in a team; the bottleneck is rarely the code itself [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's 95% analytics accuracy depended on months of data engineering work to build canonical datasets and a semantic layer [Anthropic Analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with), and critics note most organizations cannot replicate that context infrastructure [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). Context engineering, at scale, is partly an organizational problem.
