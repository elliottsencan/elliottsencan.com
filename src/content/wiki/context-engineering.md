---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  and maintaining what goes into an LLM's context window — treating that window
  as the primary surface where agent reliability is won or lost.
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
compiled_at: '2026-06-23T01:24:16.715Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1429
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
  cost_usd: 0.047808
---
Context engineering begins where prompt engineering ends. Where prompt engineering focuses on the wording of instructions, context engineering asks a harder question: given finite token budget, what information should occupy the model's attention window at each moment, in what form, and with what provenance?

The clearest statement of the stakes comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. The insight is that most "execution metadata" — current step, retry count, waiting status — is just a summary of what has already happened, and a well-engineered context window already contains it. Separating the two creates unnecessary complexity and a second source of truth that can drift.

Anthropic's engineering work on long-running agents operationalizes this directly. Their [harness for multi-context tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer agent to scaffold a feature list and progress file before any coding begins, so that each subsequent agent turn starts with a complete, current picture of what remains — rather than reconstructing state from scratch. The [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log as a stable interface precisely so that context can be reused and evolved independently of the model or sandbox.

Token budget is the concrete constraint. [KV cache engineering](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) treats the cached prefix as a shared data asset injected via fast storage rather than recomputed, cutting prefill costs by up to 20x. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, reporting 60–95% token reduction. Skepticism about such savings is warranted: [one critique of RTK](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) notes that stripping Bash output risks silent data loss in agent pipelines and that claimed savings are not validated against task-accuracy benchmarks.

Retrieval strategy is inseparable from context engineering. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) builds hierarchical tree indexes from long documents and uses LLM reasoning rather than vector similarity to decide what to retrieve, reaching 98.7% accuracy on FinanceBench. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) take a different approach: keeping data in a REPL environment and letting the model pull only what it needs into token space on demand. Both are responses to "context rot" — the degradation of model output as irrelevant content accumulates in a long window, a concept named explicitly by [Agentic Engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering).

Memory architecture is another dimension. [zerostack's file-based system](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) uses plain Markdown and regex retrieval injected as XML blocks — no vector store, no daemon. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across turns via a .story/ directory of JSON files. Both prioritize deterministic, inspectable context over probabilistic similarity search. Against this, [one analysis of agent memory systems](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the real failure is treating memory as assertion storage rather than belief maintenance — without provenance, confidence, or revision history, stale or wrong context propagates unchecked.

OpenAI's internal data agent illustrates the organizational scale of the problem: querying 600+ petabytes requires layering schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory to keep the model grounded [inside-openais-in-house-data-agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent). Anthropic's analytics stack achieved 95% accuracy by building canonical datasets and a semantic layer that routes Claude to governed sources rather than open warehouse search [how-anthropic-enables-self-service-data-analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). A critic notes that replicating this requires months of senior data engineering work most teams cannot afford [what-anthropic-got-right](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got).

The organizational dimension runs through everything. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that coding agents amplify existing alignment or misalignment — if shared context and specification clarity are poor, better models make the problem worse, not better. Context engineering, in this framing, is not purely a technical problem but a coordination one.
