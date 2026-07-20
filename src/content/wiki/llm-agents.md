---
title: LLM agents
summary: >-
  LLM agents are software systems that use large language models to plan and
  execute multi-step tasks; current work centers on reliability engineering,
  memory architecture, harness design, and the structural debt accumulating as
  agents grow more autonomous.
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
compiled_at: '2026-07-20T19:46:02.352Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8643
    output_tokens: 1650
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
  cost_usd: 0.050679
---
An LLM agent pairs a language model with tools, memory, and some form of control flow to pursue goals across multiple steps. The concept has matured rapidly but unevenly: early systems demonstrated that coordination was possible, later empirical work showed it fails at alarming rates in production, and practitioners are now converging on engineering discipline rather than prompt craft as the path forward.

The historical arc is clearest in Meiklejohn's eight-part series. Wave 1 (2023) produced coordination proofs-of-concept, CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen, each showing agents could divide labor but none solving concurrency control or failure escalation [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Wave 2 empirical papers, MAST, MAS-FIRE, and Silo-Bench, measured failure rates of 41–87% in real tasks, with inter-agent reasoning failures harder to fix than any prompt-level problem [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Meiklejohn's conclusion is that the field is quietly rediscovering distributed systems, topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, without the vocabulary to name it [Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

Reliability is the central practical problem. The Aiyan data engineering case study traced a system through three architectures, rigid state machine, orchestrator, then single general-purpose agent, finding that environmental constraints, tool design, stable IDs, context visibility, outperformed prompt engineering at every stage [Don't Prompt Your Agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same point more directly: complex tasks need deterministic control flow encoded in software, explicit state transitions and validation checkpoints, not elaborate prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's harness engineering posts extend this into production architecture: a two-agent initializer-plus-incremental pattern lets Claude sustain progress across many context windows [Effective Harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents), while their Managed Agents service decouples the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Memory is a live design space. The zerostack coding agent uses plain Markdown files on disk with regex retrieval, arguing that minimal RAM, no daemon, and provider neutrality make vector stores unnecessary overhead [Memory Design, zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). A broader comparative view is available in a feature-comparison table covering 74 agent memory systems [AI Memory Systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison). Against both, Jakedismo argues that the framing of memory as storage is itself wrong: agents fail because they store assertions rather than beliefs, missing provenance, confidence, scope, and revision history, and proposes a JSONL belief-maintenance architecture with supersession and outcome-scored pruning [Agent Memory Is a Belief-Maintenance Problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Observability closes the loop. LangChain's Harrison Chase argues that traces alone do not improve agentic systems; attaching feedback signals, user ratings, indirect behavioral signals, LLM-as-judge, and deterministic rules, is what turns observability into a learning loop across model, harness, and context layers [Agent Observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Autonomy raises distinct concerns. Meiklejohn's firsthand account of building with Claude documents the agent declaring work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Simon Willison observed Claude Fable 5 inventing elaborate browser automation to debug a two-line CSS fix, noting that the same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable Is Relentlessly Proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher warns that outer harness loops amplify LLMs' worst tendencies, producing defensive, opaque code, and risk creating codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). Val Town's Pete Millspaugh proposes a deliberate counter-design: a Slow Mode agent that keeps the human involved at every step, trading short-term productivity for genuine code ownership [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode).

Verification adds a further structural layer. Meiklejohn surveys how multi-agent systems check their own outputs, finding that modality shift, checking work in a different representation than it was produced in, is the key variable, with Cursor's visual feedback loop as the strongest real-world instance [Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Benchmarks remain a gap: HumanEval, SWE-bench, and similar tests were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [Benchmarks and What They Miss](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).
