---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and decision loops; accumulated research shows that reliability
  depends on environmental design, control flow, and memory architecture far
  more than on prompt quality.
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
compiled_at: '2026-10-26T22:27:49.276Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1748
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
  cost_usd: 0.05319
---
An LLM agent is a language model wrapped in a loop: it receives a task, chooses actions, executes them via tools, observes results, and continues until some termination condition is met. The concept spans single-agent coding assistants all the way to coordinated fleets of specialized models, but a consistent theme across the literature is that the hard problems are engineering problems, not prompting problems.

The taxonomy underlying most current research comes from Meiklejohn's survey series. [Part 2](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) maps a shared vocabulary: Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model (perception, memory, reasoning, action, learning), and Chen et al.'s challenge levels. These terms surface where the field is incomplete. Most deployed agents have no meaningful learning component and no evolved behavior; the vocabulary makes those gaps legible.

The first wave of multi-agent research, surveyed in [Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1), produced proof-of-concept systems like CAMEL, Generative Agents, ChatDev, MetaGPT, and AutoGen. These demonstrated that LLMs could coordinate at all, but shared structural failures: no concurrency control, no escalation paths when agents disagreed, and no recovery from cascading errors. The second wave, covered in [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), moved from existence proofs to measurement. MAST, MAS-FIRE, and Silo-Bench found failure rates between 41% and 87% in production conditions, with inter-agent reasoning failures proving structurally harder to fix than single-model prompt issues.

The response to these failure rates splits roughly into two camps. One camp argues for better control flow. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) argues that complex tasks need explicit state transitions and validation checkpoints encoded in software, not longer prompts. The Aiyan data engineering case study in ["Don't Prompt Your Agent for Reliability"](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) confirms this empirically: iterating through a rigid state machine, then an orchestrator, then a single general-purpose agent, the team found that tool design, stable ID keys, and context visibility drove reliability more than any prompt change. Anthropic's harness work in ["Effective Harnesses for Long-Running Agents"](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) extends this to multi-context tasks, using an initializer agent to scaffold a feature list and progress file so an incremental coding agent can resume across context windows without losing state. Their [Managed Agents architecture](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, separating harness, session log, and sandbox into stable interfaces so implementations swap as models improve.

Memory is the other axis of agent reliability. The [zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) coding agent uses plain Markdown files with XML injection blocks and three retrieval tools, achieving minimal RAM usage by skipping vector stores entirely. A contrasting proposal from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes memory as belief maintenance: storing assertions without provenance, confidence, and revision history causes agents to act on stale or contradicted information, and the fix is a JSONL structure that tracks supersession and outcome-scored pruning. A [live comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) catalogues 74 memory systems across these dimensions.

Verification is a third axis. [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) of Meiklejohn's series argues that modality shift — checking work in a different representation than it was produced — is the key variable, with Cursor's visual feedback loop as the strongest real-world example. [LangChain's observability post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) makes a complementary point: traces without attached feedback signals (user ratings, behavioral signals, LLM-as-judge, deterministic rules) cannot drive improvement. Observability is only useful if it closes a learning loop.

The safety dimension runs through several sources. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of Claude Fable autonomously inventing browser automation techniques to debug a CSS fix shows how agent resourcefulness and agent danger are the same property. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies toward defensive, opaque code and risk producing codebases that require machine participation to maintain. [Cloudflare's Mythos deployment](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) and [Anthropic's defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) show the same agent architecture applied deliberately to security: parallel hunters, adversarial validators, and sandboxed execution finding vulnerabilities at scale.

Benchmarks, as [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues, largely fail to measure what matters in multi-agent systems. HumanEval and SWE-bench were designed for single agents and cannot capture coordination quality, communication overhead, or failure recovery. The open questions surveyed in [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — are distributed systems problems the field is rediscovering without yet having the vocabulary to name them.
