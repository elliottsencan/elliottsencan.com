---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what enters an LLM's context window — covering memory design,
  retrieval strategy, state representation, and token efficiency — to produce
  reliable agent behavior at scale.
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
compiled_at: '2026-09-14T21:33:02.394Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1366
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
  cost_usd: 0.047826
---
The phrase "context engineering" captures a shift in how practitioners think about LLM systems: the bottleneck is rarely the model's raw capability but what information it can see, when, and in what form. Multiple independent efforts have converged on this insight from different angles.

The most literal expression is knowledge-base design. Karpathy's LLM-wiki pattern, documented in [a Reddit implementation walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and stress-tested in [a weekend build report](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), has the model ingest raw documents and compile them into structured Markdown that future queries traverse without RAG. The synthesis quality is genuinely better than vector retrieval for curated research — but hallucinations baked in at ingest propagate structurally, making lint and health-check steps non-negotiable. The [LostWarrior/knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a complementary approach: tiered Markdown files with a machine-readable manifest so agents can navigate without burning excess tokens.

Retrieval is the other major lever. [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) go further: data stays in a REPL environment and the LLM selectively pulls it into token space, avoiding context rot by keeping the window sparse. Both approaches are responses to the same problem — stuffing a context window indiscriminately degrades output quality.

State management is context engineering applied to agent lifecycles. [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues that execution state and business state should be unified into a single context-window-derived thread: simpler, serializable, forkable, and observable. Anthropic's [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) implements this through a two-agent design — an initializer that scaffolds a feature list and progress file, and an incremental coding agent — so progress persists across context windows. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) takes a similar approach for coding sessions, writing a .story/ directory of JSON files that turns stateless assistants into compounding collaborators.

Compression and caching are the infrastructure layer of context engineering. [KV caching treated as a persistent shared asset](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) can cut prefill costs by up to 20x. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction. A skeptical counterpoint: [one analysis of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) notes that claimed compression savings are often vanity metrics that strip only Bash output while risking silent data loss — benchmarks on task accuracy, not token count, are what matter.

Memory design sits at the intersection of all of these. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that systems fail by storing assertions without provenance or confidence scores. [zerostack's file-based memory](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) trades sophistication for operational simplicity — plain Markdown and regex retrieval on minimal RAM. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) layers schema metadata, human annotations, code enrichment, and self-improving memory across 600 petabytes, representing the opposite end of the complexity spectrum.

The organizational dimension is underappreciated. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that agents amplify whatever alignment or misalignment already exists in an organization — shared context and specification clarity are the real constraints, not code generation speed. [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) formalizes this by running a propose-score-Pareto loop to optimize memory, retrieval, and context construction around a fixed model. Context engineering, on this view, is as much an organizational and epistemic discipline as a technical one.
