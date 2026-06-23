---
title: Context engineering
summary: >-
  Context engineering is the discipline of deliberately constructing, managing,
  and compressing what an LLM receives in its context window — covering memory
  architecture, state unification, retrieval strategy, and token efficiency
  across agent systems.
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
compiled_at: '2026-06-23T00:04:33.148Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8787
    output_tokens: 1367
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
  cost_usd: 0.046866
---
Context engineering sits one level below prompt engineering: where prompt engineering concerns the wording of individual instructions, context engineering concerns what information enters the model's context window, when, how it is structured, and how much of the token budget it consumes. The sources here collectively treat it as the central design variable for reliable agent systems.

The most direct statement of this position comes from [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which argues that execution state and business state should collapse into a single context-window-derived thread. When the thread is the source of truth, serialization, debugging, recovery, and forking all become straightforward — and controlling what enters the context window becomes the primary engineering lever.

That principle extends across retrieval design. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, achieving 98.7% accuracy on FinanceBench without embeddings. [zerostack's memory system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) goes further in the opposite direction — plain Markdown files and regex retrieval, no vector store, no infrastructure — and finds it sufficient given the project's RAM and provider-neutrality constraints. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) attacks the problem from a different angle, applying wavelet transforms to source code to produce multi-resolution structural summaries that are token-efficient without requiring language-specific parsers.

The Karpathy LLM-wiki pattern, covered across [a practical Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) and [an honest post-build retrospective](/reading/2026-04/2026-04-30t232201-building-karpathys-llm-wiki-honest-takeaways), is a specific context-engineering architecture: the model itself builds and maintains structured Markdown files from raw documents, enabling cross-document synthesis without runtime RAG. The retrospective flags a meaningful failure mode — hallucinations baked in at ingest propagate structurally — which makes the lint step non-negotiable rather than optional. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) operationalizes a related idea with tiered Markdown files plus a machine-readable manifest.json, giving agents a navigable index without burning excess tokens.

At the infrastructure layer, [KV cache reuse](/reading/2026-05/2026-05-20t073125-how-to-cut-llm-inference-costs-with-kv-caching) frames the persistent cache as a shared data asset that can reduce prefill costs by up to 20x when injected from fast storage rather than recomputed. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) push this further by keeping data in a REPL environment and letting the model pull selectively into token space, addressing context rot directly. The [headroom library](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) offers a complementary approach, compressing tool outputs and RAG chunks before they reach the model — though [a skeptical counterpoint](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk) cautions that compression tools claiming 60-90% savings often report vanity metrics and lack task-accuracy benchmarks that would justify the reliability trade-off.

Anthropics's production work illustrates the stakes. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the session log from the harness and sandbox, cutting p50 time-to-first-token by \~60% and enabling multi-brain architectures. The [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a progress file to maintain coherence across context windows. Their [analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) routes Claude through canonical datasets and curated skill docs rather than free warehouse search — reaching 95% accuracy, but as a critical analysis notes, that result depends on months of data engineering investment that most organizations cannot replicate.

[The Typical Set's essay on coding agents](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) names the organizational dimension: shared context, specification clarity, and management coherence are the actual bottleneck, and agents amplify whatever alignment already exists. Context engineering is partly a technical discipline and partly an information-architecture discipline — deciding what knowledge an agent should be able to see, in what form, and with what provenance.
