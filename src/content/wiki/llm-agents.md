---
title: LLM agents
summary: >-
  LLM agents are language models augmented with tools, memory, and control flow
  to act autonomously across multi-step tasks; the field is converging on
  engineering constraints over prompt tuning as the path to reliability.
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
compiled_at: '2026-07-16T11:36:39.761Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8643
    output_tokens: 1578
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
  cost_usd: 0.049599
---
An LLM agent pairs a language model with tools, memory, and some form of control flow so that it can take sequences of actions rather than produce a single response. The concept spans implementations from a single model calling shell commands to fleets of specialized sub-agents coordinating across tasks. What the research and practice literature agrees on is that the hard problems are not model capability but system design.

The earliest wave of multi-agent research, roughly 2023, asked whether agents could coordinate at all. Systems like CAMEL, ChatDev, MetaGPT, and AutoGen demonstrated that role-based agent networks could produce coherent outputs across tasks, but Meiklejohn's survey of those papers notes shared structural failures: no concurrency control, no escalation paths, and coordination mechanisms that worked under lab conditions but not under production pressure [Getting Up to Speed on Multi-Agent Systems, Part 3: Wave 1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The 2025 empirical turn measured what that actually meant. Studies catalogued in the wave-two survey — MAST, MAS-FIRE, and Silo-Bench — found inter-agent failure rates between 41% and 87%, with reasoning failures at coordination boundaries being structurally harder to fix than prompt-level errors [Getting Up to Speed on Multi-Agent Systems, Part 4: Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The practical response to this reliability gap has converged around the same insight from multiple directions: prompt engineering does not scale. A data engineering agent that went through rigid state machine, orchestrator, and single-agent architectures showed that tool design, stable ID keys, and context visibility outperformed any amount of prompt tuning [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh reaches the same conclusion more directly: complex agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not elaborated prompt chains [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's production harness work formalizes this by separating the agent harness, session log, and sandbox into stable interfaces — a two-agent initializer-plus-incremental-coder architecture that maintains state across context windows without depending on the model to remember its own progress [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory is a distinct sub-problem. The AI memory comparison catalog tracks 74 systems across radically different architectures [AI Memory Systems — Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison). Zerostack takes a minimal position: plain Markdown files with keyword search, no vector store, no embeddings [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), achieving roughly 16MB RAM versus 300MB for JavaScript-based alternatives [gi-dellav/zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack). The conceptual critique of most memory systems is that they store assertions rather than beliefs: no provenance, no confidence, no revision history, which means accumulated memory drifts from ground truth without any mechanism to detect or correct it [Agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Observability and verification are equally underbuilt. Traces alone do not improve agent behavior; attaching feedback signals — user ratings, behavioral signals, LLM-as-judge scores, deterministic rules — to those traces is what turns monitoring into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). On verification, modality shift — checking outputs in a different representation than they were produced — appears to be the key variable, with Cursor's visual feedback loop as the clearest production example [Getting Up to Speed on Multi-Agent Systems, Part 6: Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Capability is advancing at the same time as these structural problems remain open. Claude Fable autonomously ran multi-hour workflows, delegated to sub-agents, and delivered complex software, but Mollick observes that this shifts the human role from doing to commissioning [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). Willison documents the same model inventing elaborate browser automation to debug a two-line CSS fix — resourcefulness that is genuinely useful and genuinely dangerous in the wrong context [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Ronacher adds that harness loops amplify LLMs' worst tendencies — defensive, opaque code — risking codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The open-questions survey puts a finer point on the structural gap: the field is quietly rediscovering distributed systems — topology-to-reliability tradeoffs, CRDTs for shared state, backpressure protocols — without the vocabulary to name it [Getting Up to Speed on Multi-Agent Systems, Part 8: Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).
