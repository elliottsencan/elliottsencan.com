---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, managing,
  and compressing what an LLM sees in its context window — treating that window
  as a first-class system resource rather than a passive byproduct of
  interaction.
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
compiled_at: '2026-08-03T10:03:10.296Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1411
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
  cost_usd: 0.048051
---
Context engineering sits at the intersection of prompt design, memory architecture, and retrieval strategy. The core premise: model behavior is shaped less by the model itself than by what is placed in front of it. Getting that right is an engineering problem, not a prompting trick.

The framing shows up explicitly in [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. When the context window becomes the single source of truth, the system gains trivial serializability, easier debugging, and the ability to resume or fork at any point. The corollary is that what you include in that window must be intentional — Factor 3 of the same guide calls out owning your context construction as a distinct engineering concern.

Anthropics harness work pushes this further at the architectural level. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern where an initializer scaffolds a feature list and progress file that persists across context windows, and [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates session log, harness, and sandbox into stable interfaces so context management can evolve independently. Both treat the context window boundary as a systems interface, not just a limit to work around.

Memory architecture is one of the most active sub-problems. The landscape ranges from plain Markdown files on disk — as in [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), which auto-injects XML context blocks from flat files with no vector store — to structured hierarchical indexes like [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex), which uses LLM reasoning over tree-structured documents rather than vector similarity. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a tiered Markdown approach with a machine-readable manifest so agents can navigate without burning excess tokens. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across Claude Code sessions via a .story/ directory, addressing the statelessness problem for long-running development work.

The Karpathy LLM-wiki pattern, documented in [honest takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) and a [practical implementation guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), proposes having the model itself compile and maintain structured Markdown so cross-document synthesis can happen in-context without RAG. The tradeoff is sharp: hallucinations baked in at ingest propagate structurally through the knowledge base, making a lint or health-check step non-negotiable.

On the retrieval and compression side, [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies signal-processing transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language parsers. [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model. [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treated as a persistent shared asset can cut prefill costs by 20x. But compression claims deserve scrutiny: [a skeptical take on RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that token-reduction metrics are vanity numbers without task-accuracy benchmarks.

A structural concern cuts across the technical solutions. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that the real bottleneck was never code generation but organizational alignment — shared context, specification clarity, and management coherence. Agents amplify whatever alignment or misalignment already exists. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) addresses this with layered context: schema metadata, human annotations, institutional docs, and self-improving memory across 600+ petabytes. Anthropic's analytics stack achieves 95% query accuracy through canonical datasets, a semantic layer, and curated skill docs — though [critics note](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) that this accuracy depends on months of senior data engineering work most organizations cannot replicate.

Context engineering is not a single technique. It is the set of decisions — what to store, how to retrieve it, how to compress it, when to inject it, and how to keep it accurate over time — that determine whether an LLM-backed system compounds knowledge or degrades into noise.
