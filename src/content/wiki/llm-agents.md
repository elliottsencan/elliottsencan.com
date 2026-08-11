---
title: LLM Agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and multi-step execution loops; the central challenge is
  reliability engineering at the architectural level, not prompt quality.
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
  - 2026-07/2026-07-20t215754-stop-using-opencode
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
compiled_at: '2026-08-11T05:18:58.887Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1532
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
  cost_usd: 0.04995
---
An LLM agent is a language model wired into a loop: it receives state, reasons about what to do, takes an action through tools or code, observes the result, and repeats until some completion criterion is met. That loop is the unit of analysis. The model weights matter, but the architecture surrounding them, the harness, the memory system, the control flow, determines whether the agent does useful work reliably.

The clearest statement of this principle comes from engineering practice rather than research papers. A data engineering agent described in [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before its authors concluded that environmental constraints, tool design, stable ID keys, and context visibility, outperform prompt engineering for reliability. The same finding appears in [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks require deterministic state transitions and validation checkpoints encoded in software, not prompt chains that collapse under complexity.

Harness design is therefore one of the defining problems in the field. Anthropic's engineering posts describe two complementary patterns. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a two-agent structure, an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent, so that Claude can make consistent progress across many context windows without losing state. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%.

Memory is the other structural variable. An agent's context window is finite; anything beyond it must be retrieved. The choices range from plain Markdown files on disk, as [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) and its [memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) demonstrate with keyword retrieval and no vector stores, to hierarchical tree indexes that use LLM reasoning rather than embedding similarity, as [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) does to achieve 98.7% accuracy on FinanceBench. A more critical view holds that the choice of storage mechanism is secondary: [agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), not a storage problem, because systems that store assertions without provenance, confidence, or revision history cannot correct themselves when the world changes.

Observability closes the loop. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve agentic systems; attaching feedback signals, user ratings, indirect behavior signals, LLM-as-judge verdicts, and deterministic rule checks, is what turns logging into a learning loop across model, harness, and context layers.

Actual reliability numbers from empirical research are sobering. The Wave 2 multi-agent survey [Why It Breaks](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) reports failure rates of 41 to 87 percent in production multi-agent systems, with inter-agent reasoning failures being structurally harder to address than prompt-level issues. The [benchmarks critique](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) notes that standard tests like HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality or failure recovery, the things that actually distinguish multi-agent deployments.

Capability growth is real but brings its own problems. [Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously invented elaborate browser automation techniques to debug a two-line CSS fix, a demonstration of resourcefulness that is also a security warning for unsandboxed agents. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the inverse failure mode: an agent that consistently declares work done after minimal checks, forcing the human to manually verify every feature.

Security is an active engineering concern rather than a future consideration. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) provides a reference pipeline for autonomous vulnerability discovery with gVisor sandboxing. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential exposure by injecting API tokens locally so agents authenticate against services without seeing raw credentials.

The broader structural question is about human oversight. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) argues that harness loops are becoming unavoidable but risk producing codebases that require machine participation to maintain. [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes the opposite design: an agent that keeps the human involved at every step, trading short-term throughput for genuine learning and long-term code ownership. Neither position is wrong; they are answers to different questions about what the human-agent division of labor should be.
