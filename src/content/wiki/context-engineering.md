---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing,
  structuring, and managing what enters an LLM's context window — covering
  retrieval, compression, state persistence, and memory architecture — to
  produce reliable, accurate agent behavior.
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
compiled_at: '2026-07-01T04:44:17.788Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1408
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
  cost_usd: 0.047493
---
Context engineering names the set of practices that determine what information reaches a language model and in what form. It is distinct from prompt engineering in scope: where prompt engineering tuned individual instructions, context engineering governs the entire information environment a model reasons from, across sessions, agents, and long-running tasks.

The organizational framing comes through clearly in [The Typical Set's coding-agent essay](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code): the real bottleneck in AI-assisted work was never code generation speed, but shared context and specification clarity. Agents amplify whatever alignment or misalignment already exists. This makes the quality of context a first-order engineering concern, not an afterthought.

State persistence is one of the central problems. Anthropic's harness work describes a two-agent architecture where an initializer scaffolds a feature list, git repo, and progress file so that an incremental coding agent can resume work across many context windows without losing track of what has happened [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Storybloq takes a simpler approach: a `.story/` directory of JSON files that persists session context between stateless AI assistant invocations [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). The 12-factor-agents project argues for unifying execution state and business state into a single context-window-derived thread, so that the full history is serializable, debuggable, and recoverable from any point [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Retrieval strategy is the other major axis. The Karpathy LLM-wiki pattern — having the model build and maintain structured Markdown files that are loaded wholesale rather than retrieved by vector similarity — trades RAG complexity for cross-document synthesis quality, but introduces a structural hallucination risk: errors baked in at ingest propagate, making lint and health-check steps non-negotiable [Building Karpathy's LLM Wiki: Honest Takeaways](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex takes a different approach, building hierarchical tree indexes from long documents and using LLM reasoning rather than vector similarity to retrieve context, claiming 98.7% accuracy on FinanceBench [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Recursive Language Models (RLMs) address context rot differently: data lives in a REPL environment and the model pulls only what it needs into token space, avoiding the cost of loading everything [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Memory architecture shapes what the model can know. zerostack's file-based system uses plain Markdown and regex retrieval rather than embeddings, citing minimal RAM, no daemon requirement, and provider neutrality [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more conceptually demanding argument holds that memory systems fail because they store assertions rather than beliefs, missing provenance, confidence, and revision history [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). OpenAI's internal data agent uses layered context — schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory — to query 600+ petabytes accurately [Inside OpenAI's In-House Data Agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

Token budget is the binding constraint that context engineering must respect. KV caching treated as a persistent shared asset rather than a per-request computation can cut prefill costs by up to 20x [How to Cut LLM Inference Costs with KV Caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Headroom compresses tool outputs and RAG chunks before they reach the model, claiming 60-95% token reduction [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). WaveScope applies wavelet transforms to source code to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers [Putting Code Under a Microscope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Whether aggressive compression introduces reliability trade-offs is contested: one skeptical analysis of RTK argues that stripped output and missing task-accuracy benchmarks make the reliability cost unjustifiable [The Token Compression Illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Across these sources, the through-line is that context engineering is infrastructure work. The model's reasoning quality is bounded by what the harness puts in front of it.
