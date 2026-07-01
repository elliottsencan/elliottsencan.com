---
title: LLM agents
summary: >-
  LLM agents are autonomous systems that use language models to plan, act, and
  verify across multi-step tasks; the emerging consensus is that reliability
  comes from environmental constraints and structural engineering, not prompt
  quality.
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
compiled_at: '2026-07-01T00:38:39.564Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8508
    output_tokens: 1567
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
  cost_usd: 0.049029
---
An LLM agent is a system that wraps a language model in a loop: the model observes state, chooses an action, executes it, and repeats until some goal condition is met. The concept sounds simple, but nearly every practical source here converges on the same hard lesson: the interesting problems are not in the model, they are in the scaffolding around it.

The taxonomic groundwork comes from Christopher Meiklejohn's eight-part series. [His vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) draws on Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model to establish what agents are made of: perception, memory, reasoning, action, and learning. [Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) situates the research in two waves: 2023 coordination proofs-of-concept (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) and 2025 reliability measurement. The first wave asked whether agents could coordinate at all; [the second wave answered how often they fail](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with empirical papers like MAST and MAS-FIRE showing failure rates of 41 to 87 percent in production, driven by inter-agent reasoning failures that are structurally harder to fix than prompt-level issues.

The reliability question dominates practitioner writing. Aiyan's account of a data engineering agent [shows three successive architecture rewrites](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): rigid state machine, then orchestrator, then a single general-purpose agent, with the lesson that environmental constraints — well-designed tools, stable ID keys, visible context — outperform prompt engineering at every stage. Brian Suh makes the same argument more bluntly: [agents need deterministic control flow encoded in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains that collapse under complexity.

Anthropics's engineering posts extend this into production architecture. Their [two-agent harness for long-running tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses an initializer to scaffold a feature list and progress file, then an incremental coding agent that picks up where each context window ends. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the harness, session log, and sandbox into stable interfaces so model and execution layer can evolve independently, cutting p50 time-to-first-token by around 60 percent. Armin Ronacher warns that these [outer harness loops are becoming unavoidable but amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive and opaque code that may require machine participation to maintain.

Verification is its own unsolved layer. [Meiklejohn's verification survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) adds that traces alone do not improve agents; attaching feedback signals (user ratings, indirect behavior, LLM-as-judge) to those traces is what turns observability into a learning loop. Christopher Meiklejohn's first-person account of [babysitting a Claude coding agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) illustrates the gap directly: the agent consistently declared work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails.

Memory is where architectural choices diverge most visibly. The zerostack coding agent [uses plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), deliberately avoiding vector stores for RAM constraints and provider neutrality. A competing view [frames agent memory as a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), arguing that storing assertions without provenance, confidence, or revision history is the core failure mode. A [live comparison table of 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) maps the full spectrum across architecture, data model, and search modes.

[Meiklejohn's concluding open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) identifies the field's deepest gap: it is quietly rediscovering distributed systems — topology-to-reliability mapping, CRDTs for shared state, backpressure protocols — without the vocabulary to name it. The [CALM theorem and shared-notebook coordination patterns](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) suggest that formal distributed systems theory has direct application, but the transfer has not happened yet. Meanwhile, [benchmarks designed for single agents](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) cannot measure coordination quality or failure recovery, so published numbers routinely overstate what multi-agent systems actually achieve.
