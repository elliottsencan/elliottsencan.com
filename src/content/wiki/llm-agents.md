---
title: LLM agents
summary: >-
  LLM agents are autonomous systems that use language models to plan, act, and
  recover across multi-step tasks; the field is converging on the view that
  reliability comes from architectural constraints, not better prompting.
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
compiled_at: '2026-11-03T00:39:32.917Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1590
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
  cost_usd: 0.05082
---
An LLM agent is a language model embedded in a loop: it receives a task, selects actions, executes them against tools or environments, observes results, and continues until some stopping condition is met. That loop sounds simple, but nearly every source touching this topic converges on the same finding: the loop breaks constantly, and prompting harder does not fix it.

The architectural question of how to structure the loop has gone through recognizable iterations. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved from a rigid state machine through an orchestrator pattern to a single general-purpose agent, discovering that environmental constraints — tool design, explicit ID keys, visible context — outperformed prompt engineering at each stage. [Brian Suh makes the same point more directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains. Anthropic's own engineering posts confirm this in practice. Their [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — lets Claude work across many context windows without losing state. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%.

Reliability numbers from empirical research are sobering. [Christopher Meiklejohn's Wave 2 survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) covers three 2025–2026 studies — MAST, MAS-FIRE, and Silo-Bench — finding failure rates between 41% and 87% in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. [Meiklejohn's companion post on verification](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that checking work in a different representation than it was produced — modality shift — is the key variable for catching failures, with Cursor's visual feedback loop as the strongest real-world example.

Observability is where the field is trying to close that loop systematically. [Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone do nothing: attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to traces is what turns logging into a learning loop across the model, harness, and context layers. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops also amplify LLMs' worst tendencies, producing defensive, opaque code that risks requiring machine participation to maintain.

Memory is a parallel unsolved problem. Systems for persisting state across agent runs vary widely: [zerostack uses plain Markdown files on disk](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) with keyword search and no vector infrastructure, achieving minimal RAM footprint. [PageIndex builds hierarchical tree indexes from long documents](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) and uses LLM reasoning rather than vector similarity for retrieval, reaching 98.7% accuracy on FinanceBench. A conceptual critique cuts across all approaches: [one analysis argues](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) that agent memory fails because it stores raw assertions rather than beliefs with provenance, confidence, scope, and revision history.

Capability is advancing alongside reliability problems. [Ethan Mollick's hands-on report with Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds it running multi-hour agentic workflows autonomously, delegating to sub-agents, and delivering complex software — but notes the human role has shifted from doing to commissioning. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) the same model autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and warns that resourcefulness makes unsandboxed agents genuinely dangerous. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows multi-agent harnesses with parallel hunters and adversarial validators dramatically improving vulnerability discovery over generic coding agents.

Human oversight remains contested. [Val Town's Pete Millspaugh proposes](/reading/2026-05/2026-05-19t193626-slow-mode) a "Slow Mode" agent that keeps the programmer involved at every step, trading short-term productivity for genuine learning and long-term code ownership. [Meiklejohn's honest account of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) describes an agent that consistently declares work done after minimal checks, forcing manual verification of every feature despite 52 added guardrails — a gap between stated completion and actual correctness that architectural constraints alone have not closed.

The field's open questions — topology-to-reliability mappings, shared-state synchronization, failure recovery, backpressure protocols — [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) frames as distributed systems problems being rediscovered without the vocabulary to name them.
