---
title: LLM agents
summary: >-
  LLM agents are software systems that use language models as a reasoning core
  to plan and execute multi-step tasks autonomously; current research and
  practice converge on the finding that reliability depends on structural
  engineering, not prompt quality.
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
compiled_at: '2026-06-24T04:37:22.104Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8508
    output_tokens: 1547
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
  cost_usd: 0.048729
---
An LLM agent pairs a language model with tools, memory, and some form of control flow, then tasks it with completing work that requires planning, action, and recovery across multiple steps. The concept spans single-agent systems like coding assistants all the way to coordinated fleets of specialized subagents, but the core challenge is consistent across scales: models that reason well in a single turn behave unpredictably when asked to sustain coherent behavior across dozens.

The clearest summary of where the field stands comes from Christopher Meiklejohn's eight-part survey of multi-agent systems research. The first wave, spanning 2023 systems like CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen, established that LLM agents could coordinate at all [Getting Up to Speed on Multi-Agent Systems, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave measured how often they fail in production: empirical papers MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87%, with inter-agent reasoning errors being structurally harder to patch than any prompt-level issue [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

That failure rate has pushed practitioners toward an engineering-first view. Aiyan's account of building a data engineering agent found that three successive architectures — a rigid state machine, an orchestrator, then a general-purpose agent — each improved less from better prompts than from tighter environmental constraints: well-designed tools, stable ID keys, and controlled context visibility [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same argument more directly: complex tasks need explicit state transitions and validation checkpoints encoded in software, not elaborate prompt chains that collapse under complexity [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts).

Anthropics's engineering posts show what that looks like in practice. A two-agent harness — an initializer that scaffolds state into a git repo and progress file, plus an incremental coding agent — keeps Claude oriented across many context windows [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). A separate Managed Agents architecture decouples the harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by around 60% and enabling multi-brain, multi-sandbox configurations [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Memory is an open design space. Projects like zerostack deliberately avoid vector stores in favor of plain Markdown files with regex retrieval, trading recall sophistication for near-zero memory overhead and no infrastructure dependency [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more theoretical critique argues that most memory systems fail because they store bare assertions rather than beliefs with provenance, confidence scores, and revision history — making them brittle when facts change [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). PageIndex offers a complementary approach for retrieval over long documents, replacing vector similarity with LLM reasoning over hierarchical tree indexes and reaching 98.7% accuracy on FinanceBench [VectifyAI/PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex).

Verification is equally unsolved. Meiklejohn's survey identifies modality shift — checking work in a different representation than it was produced — as the most promising verification pattern, citing Cursor's visual feedback loop as the strongest real-world example [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). LangChain argues that observability without feedback signals is inert: attaching user ratings, indirect behavior signals, LLM-as-judge scores, and deterministic rules to execution traces is what converts logging into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

The capability ceiling is rising fast. Ethan Mollick's hands-on report with Claude 5 Fable describes multi-hour autonomous workflows that delegate to subagents and deliver complex software with minimal intervention [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). Simon Willison documents the same model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness that makes capable agents useful also makes unsandboxed ones dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher warns that outer harness loops amplify LLMs' worst tendencies toward defensive, opaque code and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The field is advancing faster than its safety and oversight practices, and that gap is the most live question in the space.
