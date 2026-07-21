---
title: LLM agents
summary: >-
  LLM agents are software systems where a language model drives actions, tool
  calls, and decisions across a task; current research and engineering practice
  center on reliability, memory, coordination, and the harnesses that keep
  agents on track.
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
compiled_at: '2026-07-21T05:04:17.157Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8797
    output_tokens: 1630
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
  cost_usd: 0.050841
---
An LLM agent is a system in which a language model does more than generate text: it plans, selects tools, executes actions, and iterates until a task is done. The concept spans everything from a single model calling a search API to fleets of specialized sub-agents coordinating on long-running software projects. What unites the sources here is a shared tension: the capability of these systems is advancing fast, but reliability, memory, and oversight remain genuinely unsolved.

The architectural history is short but instructive. [Meiklejohn's eight-part series](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) traces two waves of multi-agent research: 2023 systems like CAMEL, ChatDev, MetaGPT, and AutoGen that proved agents could coordinate at all, and a 2025 wave of empirical papers showing how badly they fail in production. [Wave 2 data](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) puts failure rates between 41% and 87%, with inter-agent reasoning failures harder to fix than prompt-level bugs.

Reliability is the central engineering challenge. The practical consensus across multiple sources is that prompting alone cannot solve it. [Aiyan's post on engineering reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) documents a data engineering agent evolving through three architectures before landing on environmental constraints — tool design, ID keys, context visibility — as the real lever. [Brian Suh makes the same point more bluntly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): reliable agents need deterministic control flow and explicit state transitions encoded in software, not elaborate prompt chains. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops orchestrating agents are becoming unavoidable but amplify LLMs' worst tendencies, producing defensive and opaque code that may require machine participation to maintain.

Memory is its own subdiscipline. The simplest approach is plain files: [zerostack uses Markdown on disk](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) with XML context injection and keyword search, avoiding vector stores entirely — a tradeoff justified by minimal RAM requirements and provider neutrality, as [Xavier's walkthrough of the same system](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) explains. A more principled critique holds that storage is the wrong frame entirely: [Jakedismo argues](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) that agent memory fails because it stores assertions rather than beliefs, missing provenance, confidence, and revision history. On the retrieval side, [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with hierarchical tree indexes and LLM reasoning, reaching 98.7% accuracy on FinanceBench without embeddings.

For long-running agents, state continuity across context windows is a distinct problem. [Anthropic's harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent architecture — an initializer that scaffolds a feature list and progress file, plus an incremental coding agent — that maintains coherent work across many context resets. [Anthropic's Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%.

Observability and verification are underbuilt. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone do not improve agentic systems; feedback signals attached to traces are what turn observability into a learning loop. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) identifies modality shift — checking work in a different representation than it was produced — as the key variable, with Cursor's visual feedback loop as the strongest real-world example.

Capability and danger scale together. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) Claude Fable autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then notes how that same resourcefulness makes unsandboxed agents dangerous. [Cloudflare's Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows multi-agent harnesses with parallel hunters and adversarial validators dramatically improving vulnerability discovery, while [Anthropic's defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) provides a reference implementation for autonomous security work with gVisor sandboxing. [Christopher Meiklejohn's account of babysitting an agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) captures the human cost: 52 guardrails later, the agent still declares work done after minimal checks, requiring manual click-through to find what actually broke.

The open questions the field is converging on — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — are, as [Meiklejohn's concluding post notes](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open), largely rediscoveries of distributed systems theory, without yet the vocabulary to name them as such.
