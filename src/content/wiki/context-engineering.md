---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  structuring, compressing, and persisting what an LLM sees in its context
  window, treating that window as a managed resource rather than a passive
  input.
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
compiled_at: '2026-08-29T20:12:32.688Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1466
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
  cost_usd: 0.048876
---
Context engineering sits at the intersection of prompt design, memory architecture, retrieval strategy, and agent harness design. The core insight, expressed across many of the sources here, is that model behavior is less sensitive to model choice or fine-tuning than it is to what the model is shown at inference time. Getting that content right, at the right granularity, in the right form, is the engineering problem.

The most direct framing comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The context window becomes the authoritative source of truth: current step, retry counts, tool call history, all inferred from what has been written into it. That unification simplifies serialization, debugging, and recovery without any separate state machine.

Anthropologic harness work extends this. The [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) piece describes an initializer agent that writes a feature list and a progress file at the start of a task, which a downstream coding agent then reads to maintain continuity across context windows. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating the session log and sandbox into stable interfaces so the context can be reconstructed and handed to any model without coupling it to a particular implementation. The [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) course formalizes this into five subsystems: instructions, state, verification, scope, and session lifecycle.

Memory is a persistent subproblem. [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and its [companion walkthrough](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) demonstrate that plain Markdown files with keyword search can outperform vector stores when the constraint is minimal RAM and provider neutrality. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a similar approach: tiered Markdown with a machine-readable manifest so agents can navigate without burning excess tokens. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a .story/ directory, turning stateless assistants into compounding collaborators.

A harder critique comes from [agent memory as belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): storing assertions without provenance, confidence, or revision history means stale facts corrupt future context silently. The [Karpathy LLM wiki build](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) surfaces the same failure mode from a different angle: hallucinations baked in at ingest propagate structurally, making lint and health checks non-negotiable rather than optional.

Retrieval strategy intersects with context construction. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, reaching 98.7% accuracy on FinanceBench. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different path, applying wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without language-specific parsers. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) propose keeping data in a REPL environment and letting the model pull selectively into token space, avoiding context rot by design.

Compression is the third axis. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treats the cache as a persistent shared asset, reducing prefill costs by up to 20x. A skeptical counterpoint from [token compression criticism](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) warns that compression metrics without task-accuracy benchmarks are vanity numbers that can introduce silent data loss.

At the organizational level, [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues the real bottleneck is shared context, not code generation: agents amplify whatever alignment or misalignment an organization already has. Anthropic's own analytics stack confirms this at scale, achieving 95% query accuracy through canonical datasets, a semantic layer, and curated skill docs rather than letting the model freely search the warehouse [How Anthropic Enables Self-Service Data Analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). Context engineering is, in that framing, as much an organizational and information-architecture problem as a technical one.
