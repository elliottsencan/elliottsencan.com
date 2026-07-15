---
title: LLM agents
summary: >-
  LLM agents are language models embedded in control loops that perceive, plan,
  and act — a field caught between rapid capability gains and unresolved
  questions about reliability, memory, coordination, and human oversight.
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
compiled_at: '2026-07-15T04:04:56.210Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8643
    output_tokens: 1456
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
  cost_usd: 0.047769
---
An LLM agent is a language model given tools, a task, and some mechanism for acting on the world across multiple steps. The basic loop is simple: observe state, reason about what to do, call a tool or produce output, observe the result, repeat. What makes the field interesting, and difficult, is everything layered on top of that loop.

The taxonomy is still settling. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) maps the most common frameworks: Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model (profile, memory, planning, action, learning), and Chen et al.'s challenge levels. These frameworks expose real gaps, particularly unevolved agents that never update from experience and benchmarks designed for single-model systems that cannot measure coordination quality.

Reliability is the defining problem in practice. A data engineering agent described in [Aiyan's engineering post](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) evolved through three architectures before settling on the lesson that environmental constraints — tool design, stable ID keys, context visibility — outperform prompt engineering for getting consistent behavior. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) the same point from a software angle: explicit state transitions and validation checkpoints in code are more reliable than increasingly elaborate prompt chains. Both converge on the idea that prompting alone does not scale to complex tasks.

Observability compounds the problem. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without attached feedback signals are inert — user ratings, indirect behavioral signals, LLM-as-judge evaluations, and deterministic rules must be wired into the trace to turn observation into a learning loop. Without that feedback layer, you can watch an agent fail but cannot systematically improve it.

Memory architecture is another contested design space. The zerostack coding agent [chose plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) over vector stores, trading recall sophistication for minimal RAM footprint and zero infrastructure dependency. A more fundamental critique comes from [Jakedismo's belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): memory systems fail not because storage is hard but because they store bare assertions without provenance, confidence, or revision history. [A live comparison of 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) suggests how fragmented this space remains.

For longer-running work, state management across context windows becomes critical. [Anthropic's harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent pattern — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that lets Claude maintain coherent progress across many context resets. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%.

Capability is advancing alongside these infrastructure concerns. [Ethan Mollick's report on Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows that delegate to sub-agents and deliver complex software, but notes the human role has shifted from doing to commissioning. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) the same model autonomously inventing elaborate browser automation techniques to debug a trivial CSS fix, and warns that the same resourcefulness makes unsandboxed agents genuinely dangerous.

[Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) identifies the structural risk: harness loops are becoming unavoidable, but they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. Security applications are already operating at this level — [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) used parallel hunter agents with adversarial validators to find vulnerabilities across 50+ repos, and [Anthropic's reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) automates the full vulnerability discovery and remediation pipeline.

The open questions cluster around the same themes distributed systems research addressed decades ago: how to handle failure recovery, backpressure, shared mutable state, and topology-to-reliability tradeoffs. Meiklejohn's concluding post argues the field is quietly rediscovering distributed systems without the vocabulary to name it — CRDTs for shared agent state, formal failure modes, escalation paths — and that importing that vocabulary is one of the more tractable ways to make progress.
