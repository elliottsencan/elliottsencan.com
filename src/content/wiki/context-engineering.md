---
title: Context engineering
summary: >-
  Context engineering is the practice of deliberately constructing, curating,
  and managing the information a language model receives — shaping what goes
  into a context window, how it is structured, and when it is retrieved or
  discarded.
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
compiled_at: '2026-09-07T21:11:55.707Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9112
    output_tokens: 1410
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
  cost_usd: 0.048486
---
Context engineering treats the model's context window as the primary design surface of an AI system. Where early prompt engineering focused on phrasing a single query well, context engineering addresses the full lifecycle of information: what gets loaded, in what form, at what point, and how state accumulates or is pruned across turns and sessions.

The practical pressure is structural. LLMs have fixed context budgets, and naively filling them with raw documents causes context rot, where older or less relevant material degrades the model's attention to what matters [agentic-engineering](/reading/2026-06/2026-06-21t112220-agentic-engineering). The 12-factor-agents approach addresses this directly, arguing that execution state and business state should both live in the context window when possible, inferring current step and waiting status from the thread itself rather than managing separate state machines [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). The corollary is factor 3: own your context window, controlling exactly what the LLM sees.

Retrieval is one lever. PageIndex builds hierarchical tree indexes over long documents and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). The zerostack project goes further in the opposite architectural direction, using plain Markdown files and regex search rather than embeddings, arguing that the infrastructure cost of vector stores is rarely justified [zerostack memory design](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). Andrej Karpathy's LLM-wiki pattern, implemented and tested by multiple practitioners, positions the model itself as the synthesis layer, compiling structured documents from raw sources so that queries hit curated knowledge rather than raw retrieval [Building Karpathy's LLM Wiki](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways).

Compression is another lever. The headroom library compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction [chopratejas/headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom). Skepticism of surface metrics is warranted: one critique of RTK finds that claimed compression ratios measure stripped Bash output, not task accuracy, and that silent data loss in agent pipelines is a real risk [token compression illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk). WaveScope takes a different approach, applying wavelet transforms to source code to produce multi-resolution structural summaries that are token-efficient without lossy truncation [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for).

Persistence across sessions is a recurring engineering challenge. Storybloq persists coding session context in a `.story/` directory of JSON files [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Anthropic's long-running agent harness writes a progress file that survives context-window resets [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Belief-maintenance framing offers a sharper model: rather than storing assertions, agents should track provenance, confidence, and revision history, pruning by outcome scores rather than recency alone [agent memory as belief maintenance](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

At the infrastructure layer, KV caching treats the computed attention state of stable context blocks as a reusable asset, cutting prefill costs by up to 20x when shared system prompts or document prefixes are injected from fast storage rather than recomputed [KV caching](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching). Recursive Language Models generalize this further, keeping large datasets in a REPL environment and letting the LLM pull only what it needs into token space on demand [Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Context engineering is ultimately an organizational problem as much as a technical one. Coding agents amplify whatever alignment or misalignment already exists in specifications and shared context [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Anthropic's analytics stack achieved 95% query accuracy by building canonical datasets, a semantic layer, and curated skill docs that route Claude to governed sources, but critics note this required months of senior data engineering that most organizations cannot replicate [Anthropic self-service analytics](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with), [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got).
