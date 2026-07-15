---
title: LLM agents
summary: >-
  LLM agents are autonomous systems that use language models to plan, act, and
  persist across multi-step tasks; the emerging consensus is that reliability
  comes from environmental constraints, control flow, and memory architecture
  rather than prompt quality.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - >-
    2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the
  - >-
    2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - >-
    2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2
  - >-
    2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate
  - 2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
  - >-
    2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - >-
    2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - >-
    2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-07/2026-07-02t052125-jangles-bytepythia
compiled_at: '2026-07-15T10:06:55.949Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8643
    output_tokens: 1489
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
  cost_usd: 0.048264
---
An LLM agent pairs a language model with tools, memory, and some form of execution loop to accomplish tasks that exceed a single inference call. The basic pattern is well-established. What the current body of work argues, repeatedly and from different angles, is that the design decisions surrounding the model matter more than the model itself.

The reliability problem is the central thread. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three architectural generations — rigid state machine, orchestrator, general-purpose agent — and concludes that environmental constraints (tool design, stable ID keys, explicit context visibility) outperform prompt engineering at every stage. [Brian Suh makes the same argument from first principles](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not longer prompt chains. Anthropic's own engineering posts reinforce this. [A two-agent harness for long-running coding tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) — one agent initializes state, one makes incremental progress — lets Claude work across many context windows without losing coherence. [A separate managed-agents post](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations.

Memory is a distinct design problem. The most common framing — where to store data — is, [according to one argument](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), the wrong framing entirely. Storing assertions without provenance, confidence, scope, or revision history produces systems that cannot reason about what they know or when it became stale. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes the opposite engineering path: plain Markdown files on disk, no vector stores, no embeddings, with auto-injected XML context blocks and three retrieval tools. [A companion post](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) argues that regex retrieval beats vector similarity for a constrained coding agent given RAM limits and provider neutrality requirements. The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogues 74 systems across architecture, search mode, and knowledge lifecycle, showing how fragmented the space remains.

Observability connects to learning. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone are inert; attaching feedback signals — user ratings, LLM-as-judge verdicts, deterministic rules — is what turns logging into a learning loop across model, harness, and context layers.

The multi-agent extension of this space has its own arc. [Christopher Meiklejohn's eight-part series](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps two research waves: 2023 coordination proofs-of-concept (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) and 2025 reliability measurement. [Wave two empirical papers](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — MAST, MAS-FIRE, Silo-Bench — find failure rates of 41 to 87 percent in production, with inter-agent reasoning failures harder to fix than prompt-level issues. [The concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) observes that the field is quietly rediscovering distributed systems theory — CRDTs for shared state, backpressure protocols, topology-to-reliability mappings — without the vocabulary to name it.

Sandboxing and credentialing emerge as infrastructure concerns as agents gain real-world reach. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix illustrates how resourcefulness and risk are the same property. [Anthropic's vulnerability-discovery harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing and an agentic pipeline for threat modeling, scanning, triage, and patching. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential exposure by injecting API tokens locally, encrypted on-device, so agents authenticate against services without ever seeing raw secrets.

[Armin Ronacher's warning](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' worst tendencies — producing defensive, opaque code that requires machine participation to maintain — sits unresolved against the productivity gains reported elsewhere. That tension between automation depth and human oversight is where the field currently stands.
