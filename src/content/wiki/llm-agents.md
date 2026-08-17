---
title: LLM Agents
summary: >-
  LLM agents are language models equipped with tools, memory, and control
  structures to take sequences of actions autonomously; the emerging consensus
  is that reliability comes from environmental constraints and software
  architecture, not prompt engineering.
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
compiled_at: '2026-08-17T18:46:09.479Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1815
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
  cost_usd: 0.054195
---
An LLM agent is a language model connected to tools and a control loop so it can take actions, observe results, and continue until a goal is met. The concept sounds simple, but the engineering gap between a working demo and a production system has driven a surge of research, open-source tooling, and practitioner writing that collectively reframes what makes agents reliable.

The foundational vocabulary matters. [Meiklejohn's taxonomy series](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) draws on Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model to give the field shared terms: perception, memory, reasoning, action, and role. Without that vocabulary, failure modes are easy to misname. The same series maps the field into two research waves: 2023 systems like CAMEL, ChatDev, MetaGPT, and AutoGen [demonstrated that coordination was possible](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) but left concurrency control and escalation paths unsolved. The 2025 wave measured [how often things actually break](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2): MAST, MAS-FIRE, and Silo-Bench put failure rates at 41-87% in production, with inter-agent reasoning failures structurally harder to fix than prompt issues.

The practical response to those failure rates is architectural. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than longer prompt chains. A data engineering case study at Aiyan [confirms this empirically](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): iterating through a rigid state machine, an orchestrator, and finally a general-purpose agent, the team found that tool design, ID keys, and context visibility outperformed prompt engineering at every stage. Anthropic's own production work reinforces the pattern: a [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) with an initializer and an incremental coding agent keeps Claude consistent across many context windows, while their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) decouples the harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by ~60%.

Memory is a second axis of active disagreement. The zerostack coding agent [uses plain Markdown files](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) and regex retrieval, explicitly rejecting vector stores in favor of minimal RAM and no daemon dependency. A contrasting architectural argument holds that [agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), not a storage problem: without provenance, confidence scores, scope, and revision history, stored assertions become stale and agents act on outdated facts. A [live comparison of 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) reflects how unsettled this space remains.

Observability and learning are tightly coupled. [LangChain's position](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces alone don't improve systems; attaching feedback signals, whether user ratings, behavioral signals, LLM-as-judge scores, or deterministic rules, is what turns observability into a learning loop. Harness optimization follows the same logic: [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) runs a propose-score-Pareto loop to optimize memory, retrieval, and context construction around a fixed model, implementing the Meta-Harness approach in ~75 lines.

Security and autonomy interact in ways that are still being worked out. Simon Willison [documents Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) inventing elaborate browser automation to fix a two-line CSS issue, then notes that the same resourcefulness makes unsandboxed agents dangerous. Cloudflare's Project Glasswing [used multi-agent harnesses](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) with parallel hunters and adversarial validators to find vulnerabilities across 50+ repos, while Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) pipelines threat modeling, scanning, triage, and patching through gVisor sandboxing. Latchkey [addresses credential exposure](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) by injecting API keys locally so agents authenticate against services without ever seeing raw tokens.

The human-oversight question runs through almost every practitioner account. [Meiklejohn's babysitting report](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) describes manually clicking through every feature of an app built with Claude because the agent consistently declares work done after minimal checks. Val Town's Pete Millspaugh [proposes Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode), keeping the human involved at every planning step to trade short-term output for genuine code ownership. Armin Ronacher [warns that harness loops](/reading/2026-06/2026-06-23t161552-the-coming-loop) amplify LLMs' worst tendencies toward defensive, opaque code, risking codebases that require machine participation to maintain. The benchmark problem compounds this: [standard benchmarks like HumanEval and SWE-bench](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery, so the numbers that circulate in research papers systematically understate the production gap. [Open questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) include topology-to-reliability mappings, CRDTs for shared agent state, backpressure protocols, and failure recovery, all of which distributed systems theory has partial answers to, if the field develops the vocabulary to apply them.
