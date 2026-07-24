---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately designing what
  information enters an LLM's context window, when, and in what form — spanning
  retrieval, compression, memory, state unification, and harness architecture.
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
compiled_at: '2026-07-24T04:57:02.942Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8962
    output_tokens: 1534
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
  cost_usd: 0.049896
---
The phrase "context window" is deceptive in its simplicity. What goes into that window — and how it is structured, compressed, retrieved, and maintained across turns — determines whether an AI agent produces useful work or coherent-sounding noise. Context engineering names the discipline of making those decisions deliberately.

The most basic design choice is what to include at all. [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, so that current step, retry counts, and tool-call history are all readable from one place. The benefits are practical: trivial serialization, easier debugging, and the ability to resume or fork a session by replaying the thread. Storybloq's [session-persistence CLI](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) applies the same logic to coding sessions, writing a `.story/` directory of JSON files so that a stateless assistant accumulates compounding context across days.

Anthropics's [effective harnesses writeup](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) extends this to multi-context-window work: an initializer agent scaffolds a feature list and progress file, and an incremental agent reads that file at the start of each window, letting Claude make consistent forward progress without losing track of where it is. The [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further still, separating the session log, harness, and sandbox into stable swappable interfaces so the context layer can evolve independently of the model.

Retrieval is the other major lever. PageIndex [demonstrates](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) that hierarchical tree indexes with LLM-guided traversal outperform vector similarity on structured documents, reaching 98.7% accuracy on FinanceBench without embeddings. Karpathy's LLM-compiled wiki pattern — built and critiqued in [two](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) [Reddit](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways) threads — takes a different approach: having the model pre-synthesize raw documents into curated Markdown, then querying that structure directly. Cross-document synthesis is genuinely better than RAG for curated research, but hallucinations baked in at ingest propagate structurally, making lint and health-check passes non-negotiable.

Compression is increasingly a first-class concern. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60–95% token reduction. But [a skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) argues that compression tools which strip output without task-accuracy benchmarks risk silent data loss in agent pipelines. WaveScope [sidesteps](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) the compression-versus-fidelity tradeoff for code by applying wavelet transforms to produce multi-resolution structural views, giving the model precise context without language-specific parsers. KV caching [addresses](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) a related cost: treating the computed key-value cache as a persistent asset rather than recomputing it per request can cut prefill costs by up to 20x.

Memory systems are a subset of context engineering that carries its own failure mode. [One analysis](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that most agent memory systems store assertions rather than beliefs, missing provenance, confidence, and revision history — so they accumulate stale or contradictory facts rather than maintaining a coherent world model. zerostack's [plain-Markdown memory](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) approach trades sophistication for reliability: no vector store, no embeddings, just regex search and auto-injected XML blocks.

Anthropics's [self-service analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) shows context engineering at organizational scale: canonical datasets, a semantic layer, and curated skill docs that route Claude to governed sources achieved ~95% query accuracy. A [critical reading](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that result depends on months of senior data engineering work most teams cannot replicate — a reminder that context engineering is labor-intensive even when the model itself is free.

The [harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames context as one of five subsystems — instructions, state, verification, scope, and session lifecycle — that together determine whether agent output is dependable. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the organizational corollary explicit: agents amplify whatever alignment or misalignment already exists in a team's specifications and shared context, so the quality of that context is the actual bottleneck.
