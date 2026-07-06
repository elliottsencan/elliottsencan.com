---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, compressing,
  and maintaining what an LLM sees in its context window — treating context as
  the primary engineering surface for agent reliability and accuracy.
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
compiled_at: '2026-07-06T00:11:02.638Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8791
    output_tokens: 1430
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
  cost_usd: 0.047823
---
Context engineering starts from a simple observation: what a model does depends almost entirely on what it receives. Prompt wording matters, but so does the structure, completeness, freshness, and size of everything else that arrives in the context window. The sources collected here approach this from several angles — retrieval, compression, state management, memory architecture, and harness design — but they converge on the same claim: controlling context is controlling the system.

The most direct architectural expression of this is the Karpathy LLM-wiki pattern, where a model ingests documents and builds structured Markdown files it can later read wholesale, bypassing retrieval entirely. A practical Reddit walkthrough of the pattern [describes it as querying at scale without RAG](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), while a developer who built it end-to-end [found that cross-document synthesis genuinely beats RAG for curated research, but that hallucinations baked in at ingest propagate structurally](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), making the lint step non-negotiable. PageIndex takes a structurally similar position: rather than vector similarity, it [builds hierarchical tree indexes and uses LLM reasoning for retrieval](/reading/2026-05/2026-05-06t171355-vectifyaipageindex), achieving 98.7% accuracy on FinanceBench.

State continuity is another pressure point. Stateless AI assistants drop context across sessions, so purpose-built tools address this explicitly. Storybloq [persists session context in a .story/ directory of JSON files](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). The 12-factor-agents project argues that execution state and business state should be unified into a single context-window-derived thread, because [you can infer all execution state from the context window in many cases](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's long-running agent harness [solves the same problem differently, using an initializer that scaffolds a feature list and progress file so an incremental coding agent can resume across many context windows](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory architecture is where context engineering gets philosophically interesting. The zerostack agent [uses plain Markdown files and regex search rather than vector stores](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store), arguing this is sufficient given minimal RAM and provider-neutrality requirements. A competing view [frames agent memory as a belief-maintenance problem rather than a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), proposing JSONL structures with provenance, confidence, and supersession history. These are not compatible defaults; they reflect genuinely different threat models.

On the cost side, context engineering must manage token budgets. KV caching [treated as a persistent shared asset injected via RDMA can reduce prefill costs by up to 20x](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). The headroom library [compresses tool outputs and RAG chunks before they reach the LLM, claiming 60-95% token reduction](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). A skeptical counterpoint [warns that compression tools can strip meaningful Bash output and introduce silent data loss without task-accuracy benchmarks to justify the trade-off](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

WaveScope approaches the same compression problem from a signal-processing angle, [applying Ricker wavelet transforms to source code as a 1D signal to produce multi-resolution structural views that are token-efficient without requiring language-specific parsers](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Recursive Language Models go further still, [keeping data in a REPL environment and letting the LLM selectively pull it into token space to avoid context rot](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Organizationally, context engineering scales the underlying alignment problem. Coding agents [amplify whatever specification clarity and management coherence an organization already has](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's analytics stack [achieved 95% accuracy by curating canonical datasets, a semantic layer, and skill docs that route the model to governed data](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with), though a critique notes [this required months of senior data engineering work most organizations cannot replicate](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). The harness-forge tool makes the optimization loop explicit, [running a propose-score-Pareto cycle to find the best combination of memory, retrieval, context construction, and prompt templates around a fixed model](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).
