---
title: LLM agents
summary: >-
  LLM agents are software systems that use language models to plan and execute
  multi-step tasks autonomously; current research and practice center on
  reliability, memory, coordination, and the architectural choices that
  determine whether agents fail gracefully or catastrophically.
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
compiled_at: '2026-10-19T22:09:33.478Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1621
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
  cost_usd: 0.051285
---
An LLM agent pairs a language model with tools, memory, and some mechanism for deciding what to do next. The basic loop is simple. The hard parts are everything that surrounds it: how state persists across context windows, how failures are detected and recovered, how multiple agents coordinate without stepping on each other, and how the system can be observed and improved over time.

The taxonomy has stabilized somewhat. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) traces how Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels give the field shared language for describing what agents actually do, though gaps remain: most research assumes static agents that never update their own behavior, and benchmarks rarely measure what matters in production.

The production reliability picture is sobering. [Wave 2 empirical work](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveying MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87%, with inter-agent reasoning failures being structurally harder to address than prompt-level issues. [Personal experience building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms the pattern: agents declare tasks complete after minimal verification, requiring human spot-checks across every feature. The conclusion from multiple sources is that prompting cannot solve this. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) and [Aiyan's engineering post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) both argue that deterministic control flow, explicit state transitions, and environmental constraints outperform prompt engineering for reliability. The latter documents a data engineering agent that improved most by redesigning its tools and context visibility, not its instructions.

Architecture choices compound. [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent initializer-plus-incremental-coder structure that preserves progress across many context windows using a git repo and a progress file. [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, decoupling the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies, producing defensive and opaque code, and risk creating codebases that require machine participation to maintain.

Memory is its own design space. [zerostack's file-based approach](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with XML context injection and three tools; [the rationale](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) is that minimal RAM, no daemon, and provider neutrality make vector stores a poor fit. A more theoretical critique from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues memory systems fail because they store assertions rather than beliefs, missing provenance, confidence, scope, and revision history. A [live comparison of 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) shows how varied the implementations are in practice.

Verification is underrated. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced, is the key variable for catching errors. [LangChain's observability post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) makes a related point: traces alone accomplish nothing; attaching feedback signals to traces is what creates a learning loop. [Harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) operationalizes this by running a propose-score-Pareto loop to optimize scaffolding around a fixed model.

Security is not optional. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of Claude Fable autonomously inventing elaborate browser automation techniques to debug a CSS fix illustrates how resourcefulness and danger scale together. [Anthropic's vulnerability-discovery harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for autonomous code scanning. [OpenCode's security critique](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) documents what happens when defaults are reckless.

The open questions largely map onto distributed systems problems that agent research has not yet named as such. [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) lists topology-to-reliability mapping, CRDTs for shared state, failure recovery, and backpressure protocols as unsolved, and argues the field is quietly rediscovering distributed systems without the vocabulary to recognize it. The benchmarks problem is adjacent: [most MAS benchmarks](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery.
