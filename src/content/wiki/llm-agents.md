---
title: LLM agents
summary: >-
  LLM agents are autonomous systems that use language models to plan, execute,
  and verify multi-step tasks; the growing body of practice around them centers
  on reliability engineering, memory architecture, harness design, and
  coordination structure rather than prompt quality.
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
compiled_at: '2026-07-14T06:38:36.464Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8643
    output_tokens: 1503
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
  cost_usd: 0.048474
---
An LLM agent is a system where a language model drives a sequence of actions, tool calls, or sub-task delegations to complete a goal that exceeds what a single inference can accomplish. The practical literature has moved quickly from "can agents do this at all" to "why do they fail and how do you stop that."

The earliest wave of multi-agent research, summarized in [Meiklejohn's landscape overview](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), produced coordination proofs-of-concept: CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen. [The Wave 1 walkthrough](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) documents their shared failure modes, including missing concurrency control and no escalation paths. The 2025 empirical turn measured what those failures cost: MAST, MAS-FIRE, and Silo-Bench found failure rates of [41 to 87 percent in production conditions](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures structurally harder to repair than prompt-level issues.

The design response to those failure rates has converged on a consistent position: prompts are the wrong tool for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that complex tasks require explicit state transitions and validation checkpoints encoded in software. The Aiyan data engineering case study [confirms this through three architecture iterations](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): a rigid state machine, an orchestrator, and finally a general-purpose agent, with the consistent finding that environmental constraints on tool design and context visibility outperformed prompt engineering. Anthropic's harness work goes further, separating the agent brain from the execution environment into stable interfaces, [cutting p50 time-to-first-token by roughly 60%](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) while enabling multi-brain, multi-sandbox architectures. Their long-running harness design uses an initializer agent to scaffold state that persists [across context windows](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory is its own design dimension. The spectrum runs from vector stores and RAG pipelines to plain files. Zerostack implements [file-based memory using plain Markdown](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) with auto-injected XML context blocks, achieving roughly 16MB RAM usage versus 300MB for JavaScript-based agents. A more pointed critique comes from [a belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): memory systems fail not because storage is hard but because they store bare assertions without provenance, confidence, or revision history. PageIndex takes a different approach entirely, [using LLM reasoning over hierarchical tree indexes](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) rather than vector similarity, reporting 98.7% accuracy on FinanceBench.

Verification is the third structural problem. [Meiklejohn's verification patterns survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift, checking work in a different representation than it was produced in, is the key variable. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) extends this to observability: traces alone do not improve systems; attaching feedback signals to traces is what turns monitoring into a learning loop. In practice, agents still declare work done prematurely. [Meiklejohn's babysitting account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents two weeks of manually clicking through features to find failures an agent reported as resolved, despite 52 added guardrails.

At the capability frontier, Claude Fable running multi-hour agentic workflows and delegating to sub-agents [represents a genuine step change](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos), but shifts the human role from execution to commissioning. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of an agent autonomously inventing elaborate browser automation techniques to fix two lines of CSS illustrates how the same resourcefulness that makes agents useful makes unsandboxed agents dangerous. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies, producing defensive, opaque code that may require machine participation to maintain. The open questions [mapped at the end of Meiklejohn's series](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) include topology-to-reliability mappings, CRDTs for shared state, and backpressure protocols, all problems the field is rediscovering from distributed systems without yet having the vocabulary to name them.
