---
title: LLM agents
summary: >-
  LLM agents are language models equipped with tools, memory, and control flow
  to act autonomously across multi-step tasks; the field is converging on the
  view that reliability comes from system design, not prompt engineering.
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
compiled_at: '2026-07-02T12:29:39.638Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8647
    output_tokens: 1504
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
  cost_usd: 0.048501
---
An LLM agent is a language model connected to tools, an execution environment, and some form of persistent state, tasked with completing goals that require multiple sequential or parallel steps. The simplest version is a single model calling a few functions; the most complex are multi-agent pipelines where specialized subagents coordinate across long time horizons. What unites them is that the model must decide what to do next, not just what to say.

The taxonomy is still being negotiated. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) draws on Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model to show how even basic terms like "agent" and "coordination" mean different things across papers, exposing gaps like unevolved agents and missing benchmarks. That definitional looseness has consequences: as [Meiklejohn's benchmark installment](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues, HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery.

The empirical picture on reliability is not encouraging. [Wave 2 research surveyed by Meiklejohn](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) finds multi-agent LLM systems failing 41–87% of the time in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. A hands-on account from [Meiklejohn building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) confirms the pattern: the agent repeatedly declares work complete after minimal checks, requiring manual verification of every feature despite 52 added guardrails.

The field's emerging consensus is that prompt engineering is the wrong lever. [Aiyan's data engineering agent retrospective](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces an evolution through three architectures, concluding that environmental constraints — tool design, stable ID keys, context visibility — outperform prompt tweaks. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point structurally: reliable agents need explicit state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains.

Architectural choices matter at every layer. [Anthropic's harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent system — an initializer plus an incremental coding agent — that maintains progress across context window boundaries via a shared progress file. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating harness, session log, and sandbox into stable interfaces so implementations can swap as models improve, cutting p50 time-to-first-token by roughly 60%. For memory, approaches range from plain Markdown files with regex retrieval — [zerostack's deliberately minimal design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) — to a [belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) that treats stored assertions as beliefs with provenance, confidence, scope, and revision history.

Observability is necessary but not sufficient. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone don't improve systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what converts observability into a learning loop. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies, producing defensive and opaque code, risking codebases that require machine participation to maintain.

Coordination structure should match task structure. [Meiklejohn's debate and state installment](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) surveys convergent debate, adversarial debate, and shared-notebook state, arguing the field is quietly rediscovering distributed systems formalisms without the vocabulary to name them. [The open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) maps unsolved problems including topology-to-reliability, CRDTs for shared state, and backpressure protocols.

Capability is advancing alongside the reliability gap. [Ethan Mollick's report on Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) documents multi-hour autonomous workflows and sub-agent delegation completing complex software tasks, while [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents the same model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then warns that the same resourcefulness makes unsandboxed agents genuinely dangerous. The human role is shifting from doing to commissioning, but the cost of unsupervised autonomy remains high.
