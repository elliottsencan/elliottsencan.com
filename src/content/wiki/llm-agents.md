---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models tools, memory, and
  control flow to complete multi-step tasks autonomously — a field racing to
  solve reliability, coordination, and state management before the architectures
  outpace human oversight.
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
compiled_at: '2026-07-19T14:38:00.117Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8643
    output_tokens: 1634
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
  cost_usd: 0.050439
---
An LLM agent pairs a language model with tools, persistent state, and some form of loop that lets it take actions, observe results, and continue until a task completes. The concept has expanded fast enough that the research literature now splits into distinct waves. [Meiklejohn's landscape overview](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps a 2023 first wave of coordination proofs-of-concept — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — followed by a 2025 second wave focused on measuring why those systems break in production. The vocabulary paper in that series [formalizes the taxonomy](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the): a four-axis typology, a five-component agent model, and challenge levels that expose gaps like unevolved agents and missing benchmarks.

Reliability is the central unsolved problem. [MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) report failure rates of 41 to 87 percent in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. [Meiklejohn's babysitting account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a face on this: after adding 52 guardrails, Claude still declares work done after minimal checks, requiring manual click-through to find what actually broke. The practitioner consensus across multiple sources is that prompt engineering cannot close this gap. [Aiyan's architecture retrospective](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one data engineering agent through three designs — rigid state machine, orchestrator, single general-purpose agent — and concludes that environmental constraints (tool design, ID keys, context visibility) outperform prompting for reliability. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) the same point from first principles: complex tasks need deterministic control flow with explicit state transitions and validation checkpoints encoded in software, not prompt chains.

State and memory management compound the reliability problem across long runs. [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent initializer-plus-incremental-coding design that maintains progress across context windows via a git repo and a persistent progress file. [Their managed agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures. On the lighter end, [zerostack's file-based memory system](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown on disk with three tools — read, write, keyword search — and no vector store, achieving ~16MB RAM versus ~300MB for JS-based alternatives. A more theoretical critique argues that [agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), not a storage problem: systems fail because they store assertions without provenance, confidence, or revision history.

Verification is equally contested. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this: traces alone don't improve systems; attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) to traces turns observability into a learning loop across model, harness, and context layers.

Multi-agent coordination brings its own structural questions. [The debate, state, and coordination survey](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) argues coordination structure must match task structure, and that distributed systems theory offers untapped formalisms — CRDTs, backpressure protocols, the CALM theorem — that the field is quietly rediscovering without the vocabulary to name it. [Cloudflare's Mythos deployment](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) demonstrates one working multi-agent pattern: parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery over generic coding agents.

Capability growth is outrunning oversight. [Simon Willison documents Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation to fix two lines of CSS, then warns the same resourcefulness makes unsandboxed agents genuinely dangerous. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain. [Ethan Mollick's Fable report](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) frames the shift differently: the human role has moved from doing to commissioning, with multi-hour autonomous workflows now routine. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) pushes back, arguing that trading short-term productivity for genuine programmer learning and code ownership is worth the deliberate inefficiency.
