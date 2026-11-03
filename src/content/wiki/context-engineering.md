---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what an LLM sees in its context window — spanning memory
  architecture, retrieval strategy, state unification, and token budgeting — to
  produce reliable agent behavior.
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
compiled_at: '2026-11-03T00:34:50.995Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1425
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
  cost_usd: 0.048711
---
Context engineering has emerged as a distinct practice because LLM capability alone does not determine agent quality. What the model receives shapes what it can do. The sources here converge on a simple claim: getting the right information into the context window, in the right form, at the right time, is now the central engineering problem for AI systems.

The most concrete articulation of this comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should be unified into a single context-window-derived thread. When everything the agent knows about where it is and what has happened lives in one place, the system becomes trivially serializable, debuggable, and resumable. Anthropic's managed agents work follows a related principle: the session log is a stable, swappable interface precisely because it encodes state as a structured artifact rather than as implicit runtime knowledge [Anthropic Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

For long-running tasks, context engineering becomes the prerequisite for continuity. Anthropic's harness for multi-context-window coding describes an initializer agent that scaffolds a feature list and progress file so the incremental coding agent never has to reconstruct its position from scratch [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The walkinglabs course formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Storybloq takes a simpler approach, persisting session context as JSON files in a .story/ directory so stateless AI assistants accumulate history across sessions [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq).

Retrieval is the mechanism that mediates between what exists and what enters the window. The LLM-wiki pattern — building model-maintained structured Markdown instead of relying on RAG — offers superior cross-document synthesis for curated knowledge, but a critical failure mode is that hallucinations baked in at ingest propagate structurally, making lint checks non-negotiable [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways). PageIndex replaces vector similarity with hierarchical tree indexes and LLM reasoning, achieving high retrieval accuracy without embeddings [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). Recursive Language Models take this further by keeping data in a REPL environment and letting the model selectively pull it into token space, preventing context rot by construction [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Memory architecture is where context engineering gets contested. The zerostack agent uses plain Markdown files with regex retrieval and injected XML blocks, arguing that vector stores are overkill given the constraints [zerostack memory](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A sharper critique reframes the problem entirely: agent memory fails not because storage is wrong but because it stores assertions rather than beliefs, missing provenance, confidence, and revision history [belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Token budgeting is the compression side of context engineering. KV caching treated as a persistent shared asset can reduce prefill costs by up to 20x [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). WaveScope applies wavelet transforms to source code to produce multi-resolution structural views that are more token-efficient than raw file contents [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). The headroom library compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reductions, though skepticism about vanity compression metrics is warranted when task-accuracy benchmarks are absent [headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom), [RTK skepticism](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Organizational context is the dimension most tools ignore. Coding agents amplify whatever specification clarity and management coherence already exist in a team; without good shared context, the model's productivity is noise at scale [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's analytics stack illustrates this concretely: 95% query automation required months of senior data engineering to build canonical datasets and a semantic layer before context quality was reliable enough [Anthropic self-service analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). Context engineering is not a prompt trick; it is infrastructure.
