---
title: LLM agents
summary: >-
  LLM agents are language models given tools, memory, and control flow to act
  autonomously across tasks; the emerging consensus is that reliability depends
  far more on environmental structure than on prompt quality.
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
compiled_at: '2026-06-26T02:57:52.438Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8508
    output_tokens: 1416
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
  cost_usd: 0.046764
---
An LLM agent is a language model augmented with the ability to take actions: calling tools, reading and writing memory, spawning subprocesses, and deciding what to do next. The concept encompasses everything from a single model executing a short task loop to coordinated networks of specialized models working in parallel. What unifies the sources here is a shared reckoning with the gap between what agents can do in demos and what they reliably do in production.

The foundational vocabulary comes from multi-agent systems research. [Meiklejohn's taxonomy series](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) maps agents along four axes (Tran et al.) and five components (Zhou et al.), covering perception, memory, reasoning, action, and learning. That vocabulary exposes a structural gap: most deployed agents have no learning component at all. The same series traces two research waves — 2023 coordination proofs-of-concept (CAMEL, ChatDev, MetaGPT, AutoGen) that demonstrated agents could cooperate, and [2025–2026 empirical work](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) showing they fail 41–87% of the time in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues.

The reliability question dominates practitioner writing. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before concluding that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Brian Suh's post](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion from first principles: complex tasks need deterministic control flow encoded in software, not elaborate prompt chains that collapse under pressure. [Anthropic's harness engineering write-up](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) operationalizes this with a two-agent design — an initializer that scaffolds state, plus an incremental executor — to sustain progress across many context windows. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating harness, session log, and sandbox into stable interfaces so model implementations can be swapped independently, cutting p50 time-to-first-token by roughly 60%.

Memory design is a recurring sub-problem. [One framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues agents fail because they store assertions rather than beliefs — missing provenance, confidence, and revision history. The zerostack coding agent takes the opposite engineering bet: [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store), no vector stores, low RAM, no daemon. Both positions agree that most memory systems are under-designed relative to the tasks agents are being given.

Verification is the other structural weak point. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable. [Meiklejohn's hands-on account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) illustrates what happens without it: an agent declares work done after minimal checks, leaving the human to manually verify every feature. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues traces alone don't improve systems; attaching feedback signals to traces is what turns observability into a learning loop.

At the capability frontier, [Ethan Mollick's report on Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows with sub-agent delegation — a genuine leap — while [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) warns that the same resourcefulness that lets an agent invent elaborate debugging techniques makes unsandboxed agents genuinely dangerous. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) goes further: harness loops amplify LLMs' worst tendencies, risk producing codebases that require machine participation to maintain, and raise unresolved questions about engineering judgment and human oversight.

The open research problems mirror distributed systems problems. [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) identifies topology-to-reliability mapping, CRDTs for shared agent state, failure recovery, and backpressure protocols as unsolved — and notes the field is quietly rediscovering distributed systems without the vocabulary to name it.
