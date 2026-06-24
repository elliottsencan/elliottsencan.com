---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and the ability to act across multiple steps; the central
  challenges are reliability, state management, coordination, memory, and
  knowing when to hand control back to a human.
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
compiled_at: '2026-06-24T06:32:31.336Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8508
    output_tokens: 1376
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
  cost_usd: 0.046164
---
An LLM agent wraps a language model in a loop: the model observes state, selects actions, executes them through tools, and uses the results to decide what to do next. That simple structure conceals a pile of hard engineering problems that the field has been working through since roughly 2023.

The first wave of multi-agent research, documented extensively by Christopher Meiklejohn, focused on whether agents could coordinate at all. CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen each demonstrated some form of role-based or workflow coordination, but [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) notes shared failure modes: no concurrency control, no escalation paths, coordination that works in demos but not under production load. The second wave shifted from proof-of-concept to measurement. Papers like MAST, MAS-FIRE, and Silo-Bench found that [multi-agent systems fail 41–87% of the time in production](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures being harder to fix than prompt-level issues.

The reliability problem cuts across architectures. A data engineering agent documented by Aiyan evolved through three designs before settling on the lesson that environmental constraints outperform prompt engineering: well-designed tools, stable ID keys, and visible context beat elaborate instructions. Brian Suh makes the same argument more structurally: [agents need deterministic control flow encoded in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), explicit state transitions and validation checkpoints, rather than prompt chains that collapse under complexity. Anthropic's production work confirms this; their [two-agent harness for long-running tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a scaffolding initializer and an incremental coding agent that writes progress to a file, letting Claude make consistent progress across many context windows without losing state.

Memory is its own sub-problem. The naive approach stores everything and retrieves by vector similarity. The zerostack coding agent takes the opposite position: [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) beat vector stores when the constraints are minimal RAM and no daemon. A more pointed critique comes from Jakedismo, who argues that [agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): systems fail because they store bare assertions without provenance, confidence, or revision history, and the fix is a supersession-aware architecture rather than a better embedding model.

Verification is the step most systems skip. Meiklejohn's survey of verification patterns finds that [modality shift is the key variable](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6): checking work in a different representation than it was produced in catches errors that same-modality review misses. Christopher Meiklejohn's own build experience illustrates what happens without it: the agent [consistently declares work done after minimal checks](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), requiring manual human verification of every feature. LangChain's Harrison Chase frames this as an observability gap: [traces alone don't improve agentic systems](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning); attaching feedback signals to traces is what turns logging into a learning loop.

At scale, agents need harness infrastructure. Anthropic's [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the agent harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%. Cloudflare's Project Glasswing used [multi-agent harnesses with parallel hunters and adversarial validators](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) to find vulnerabilities across its own repositories, showing that agent topology can be matched to task structure.

Armin Ronacher identifies the risk that accumulates downstream: outer harness loops [amplify LLMs' worst tendencies toward defensive, opaque code](/reading/2026-06/2026-06-23t161552-the-coming-loop), and codebases produced this way may require machine participation to maintain. The human role hasn't disappeared; it has shifted from execution to commissioning and oversight, and designing agents that keep humans meaningfully in that loop remains an open problem alongside topology-to-reliability mapping, CRDT-based shared state, and principled failure recovery.
