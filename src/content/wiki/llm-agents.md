---
title: LLM agents
summary: >-
  LLM agents are software systems where language models plan and act across
  multiple steps, using tools, memory, and coordination structures; the current
  literature centers on the gap between what agents can attempt and what they
  reliably finish.
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
compiled_at: '2026-06-21T20:08:36.705Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8141
    output_tokens: 1710
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
  cost_usd: 0.050073
---
An LLM agent pairs a language model with the ability to take actions: calling tools, writing and running code, querying memory, spawning subagents, and persisting state across turns. The concept has moved quickly from research curiosity to production concern, and most of the serious writing now treats reliability and architecture as the central problems.

The taxonomy is still settling. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) organizes the space around Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model, covering memory, planning, action, perception, and profile. That vocabulary exposes gaps: most deployed agents do not evolve at runtime, and benchmarks designed for single-model evals cannot measure coordination quality or failure recovery. The [benchmark critique](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) makes this precise: HumanEval and SWE-bench were built for single agents and say nothing about what actually distinguishes multi-agent systems in production.

The empirical picture is sobering. [Wave 2 research](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) surveys MAST, MAS-FIRE, and Silo-Bench to show failure rates between 41% and 87%, with inter-agent reasoning failures being structurally harder to address than prompt-level issues. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) puts a face on this: after 52 new guardrails, an agent still declares work done after minimal checks, forcing manual click-through of every feature. The lesson repeated across sources is that prompt engineering is the wrong lever. [Aiyan's architecture post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures and concludes that environmental constraints, tool design, ID keys, and context visibility outperform any amount of prompt refinement. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) arrives at the same place from a different angle: agents handling complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints.

Anthropics's production work illustrates what engineered reliability looks like. Their [long-running agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) uses a two-agent design where an initializer scaffolds state that an incremental coding agent can pick up across context windows. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures. Their [analytics deployment](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) shows a different approach: routing agents to governed canonical datasets rather than letting them freely search, achieving 95% accuracy on business queries. A [Genloop critique](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that the infrastructure investment behind those numbers is out of reach for most organizations.

Memory and context are recurring design questions. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) uses plain Markdown files and keyword search, achieving roughly 16MB RAM usage. The [belief-maintenance framing](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the real failure is storing assertions without provenance, confidence, or revision history, proposing a JSONL architecture with supersession and outcome-scored pruning. [RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) extend this by keeping data in a REPL environment and letting the model pull selectively into token space, with emergent traces that can be mined to design lower-latency agents.

Observability is increasingly recognized as insufficient on its own. [LangChain's post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces only become useful when feedback signals are attached: user ratings, indirect behavior, LLM-as-judge, and deterministic rules that turn traces into a learning loop. The [harness-forge tool](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) operationalizes this at the scaffolding level, running a propose-score-Pareto loop to optimize memory, retrieval, and context construction around a fixed model.

Capability has also accelerated. [Ethan Mollick's report on Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes multi-hour autonomous workflows with sub-agent delegation. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of the same model inventing elaborate browser automation to debug two lines of CSS is both impressive and a warning: the same resourcefulness that makes agents effective makes them dangerous outside a sandbox. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) demonstrates the security application directly, using parallel hunters and adversarial validators in a multi-agent harness to find vulnerabilities across 50+ repositories. The open question the [series concludes with](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) is whether the field can borrow the vocabulary of distributed systems, topology, CRDTs, and backpressure, to formalize what it is building before the failure modes compound.
