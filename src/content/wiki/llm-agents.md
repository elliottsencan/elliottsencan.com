---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and the ability to act across multiple steps; the central
  challenge is reliability — and the evidence increasingly points to environment
  design, not prompting, as the lever that matters.
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
compiled_at: '2026-08-11T07:57:04.860Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1776
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
  cost_usd: 0.05361
---
An LLM agent pairs a language model with tools, memory, and some loop that lets it act over time rather than answer once. The concept sounds simple; the engineering is not. Across many sources, the recurring finding is that agents fail more often than they succeed in production, and that the failure modes are structural rather than cosmetic.

The taxonomy starts with what an agent is made of. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) formalizes this using Zhou et al.'s five-component model (profile, memory, planning, action, perception) and Tran et al.'s four-axis typology, which exposes gaps like agents that never update their own behavior and benchmarks that never measure coordination. That vocabulary matters because the field generated a lot of enthusiasm before it had precise terms for what it was building.

The first wave of multi-agent research, roughly 2023, was primarily proving that coordination was possible at all. [Meiklejohn's Wave 1 survey](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) walks through CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen: each demonstrated a coordination mechanism but none addressed concurrency control or escalation paths when things went wrong. The 2025 empirical turn changed the frame. [Wave 2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveys MAST, MAS-FIRE, and Silo-Bench, which collectively show failure rates of 41 to 87 percent in production settings, with inter-agent reasoning failures being structurally harder to recover from than prompt-level mistakes.

The reliability problem appears across single-agent work too. [Meiklejohn's account of building a social app with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the agent consistently declaring work done after minimal checks, requiring manual verification of every feature despite 52 new guardrails. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) converges on the same diagnosis through a different path: iterating through rigid state machine, orchestrator, and general-purpose agent architectures showed that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the point directly: reliable agents need deterministic control flow encoded in software, not elaborate prompt chains that collapse under complexity.

Anthropics's engineering posts operationalize this. [Their harness for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses two agents — an initializer that scaffolds a feature list and progress file, and an incremental coding agent — to maintain consistent progress across context windows. [Their Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by around 60 percent. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts that harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain.

Memory is a persistent unsolved layer. [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the field treats memory as a storage problem when it is actually a belief-maintenance problem: assertions need provenance, confidence scores, scope, and revision history. The zerostack project takes the opposite practical extreme: [plain Markdown files with regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), no vector stores, achieving minimal RAM usage and provider neutrality. A [feature comparison of 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) illustrates how fractured the space is.

Verification is equally contested. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable, with Cursor's visual feedback loop as the strongest real-world example. [LangChain's observability post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this: traces alone do not improve systems; attaching feedback signals to traces is what turns observability into a learning loop.

Capability is advancing alongside these engineering challenges. [Ethan Mollick's hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds multi-hour autonomous workflows and sub-agent delegation becoming real, shifting the human role from doing to commissioning. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of the same model autonomously inventing elaborate browser automation to fix two lines of CSS makes the same observation darker: the resourcefulness that makes agents useful makes unsandboxed agents genuinely dangerous. Security-oriented deployments, like [Cloudflare's Mythos multi-agent harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) and [Anthropic's vulnerability discovery pipeline](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness), show that parallel agents with adversarial validators and sandboxed execution can find classes of bugs that generic coding agents miss — but only because the harness structures the task.

[Meiklejohn's open questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) frames the field's overall situation: topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, failure recovery — these are distributed systems problems, and the agent research community is quietly rediscovering them without always having the vocabulary to name them.
