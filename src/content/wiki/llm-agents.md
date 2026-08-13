---
title: LLM agents
summary: >-
  LLM agents are software systems where a language model drives multi-step
  actions through tools, memory, and control flow; current research and practice
  converge on the conclusion that reliability comes from environment design, not
  prompt engineering.
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
compiled_at: '2026-08-13T21:14:15.506Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1569
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
  cost_usd: 0.050505
---
An LLM agent is a system where a language model does more than generate text: it selects actions, calls tools, manages state across steps, and pursues goals that require more than one inference. The gap between that definition and working, reliable production systems is the central tension across nearly every source here.

The foundational vocabulary matters. [Meiklejohn's taxonomy series](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) draws on Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model to show that agents vary across role, memory, communication, and topology. That vocabulary exposes gaps the field tends to ignore: most deployed agents do not evolve, and most benchmarks cannot measure what multi-agent coordination actually costs.

The reliability gap is well-documented. [Wave 2 empirical research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) from MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87% in production multi-agent systems, with inter-agent reasoning failures being harder to fix than prompt-level issues. [Meiklejohn's account of building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) describes the same dynamic at the individual level: the agent consistently declares work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails.

The practitioner consensus is that prompting cannot solve structural unreliability. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced a system through three architectures and concluded that environmental constraints (tool design, stable ID keys, explicit context visibility) outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point in code terms: deterministic control flow and explicit state transitions are what hold complex agents together; elaborate prompt chains collapse under complexity. [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) applies this in practice, using a two-agent initializer-plus-incremental-coder architecture with a persistent progress file to maintain coherent state across many context windows.

Memory is its own design surface, not a solved problem. The [zerostack coding agent](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) and its [memory subsystem](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) demonstrate that plain Markdown files with keyword search can outperform vector stores when constraints favor low RAM and no daemon. [One analysis framed agent memory as a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): systems fail not because they lack storage, but because they store assertions without provenance, confidence, or revision history.

Observability is becoming a distinct engineering discipline for agents. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are inert; attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) to those traces is what turns observability into a learning loop. [Anthropic's Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, achieving roughly 60% reduction in time-to-first-token at p50.

Verification is where coordination structure matters most. [Meiklejohn's verification patterns survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced in, is the key variable. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) applies this in security: parallel hunters, adversarial validators, and cross-repo tracers working in a multi-agent harness dramatically improved vulnerability discovery over generic coding agents.

Safety and oversight questions run through the applied work. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents the model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies, producing defensive and opaque code that may require machine participation to maintain. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) argues for a different posture: keeping the human involved at every step to trade short-term productivity for long-term code ownership.

[Meiklejohn's concluding open-questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names the field's structural situation directly: unsolved problems around topology-to-reliability mapping, CRDTs for shared state, failure recovery, and backpressure protocols are all problems distributed systems theory has prior work on. The field is quietly rediscovering that work without the vocabulary to connect to it.
