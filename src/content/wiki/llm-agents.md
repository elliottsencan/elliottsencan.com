---
title: LLM agents
summary: >-
  LLM agents are language models embedded in loops that plan, use tools, and act
  across multiple steps; the field is converging on the view that reliability
  requires environmental constraints, control flow, and observability rather
  than better prompts.
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
compiled_at: '2026-07-08T00:15:42.809Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8647
    output_tokens: 1565
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
  cost_usd: 0.049416
---
An LLM agent, in the broadest shared sense across the literature, is a language model given access to tools, memory, and a loop that lets it act sequentially toward a goal. That minimal definition covers everything from a single model calling a database to a swarm of specialized sub-agents coordinating on a software security audit. The taxonomy that organizes the space better than most is the four-axis typology surveyed by Christopher Meiklejohn [in his vocabulary piece](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the): agent role, coordination mechanism, communication structure, and organizational topology. Zhou et al.'s five-component model adds profile, memory, planning, action, and security as the canonical internal parts of any agent.

The 2023 wave of multi-agent research — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — demonstrated that LLMs could coordinate at all, which was the real question at the time [as Meiklejohn's Wave 1 post documents](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Those systems share a failure mode: no concurrency control and no escalation path when an agent is stuck. The 2025 wave answered the follow-up question of why coordination breaks. Empirical studies like MAST, MAS-FIRE, and Silo-Bench measured failure rates of 41 to 87 percent in production scenarios, with inter-agent reasoning failures proving harder to fix than any single agent's prompt-level errors [per the Wave 2 survey](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The practical lesson that practitioners keep arriving at from different directions is that reliability is an engineering problem, not a prompting problem. A data engineering agent that cycled through state machine, orchestrator, and single-agent architectures found that tool design and context visibility outperformed any amount of prompt tuning [as documented in the reliability engineering post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Brian Suh makes the same argument from first principles: deterministic state transitions and explicit validation checkpoints do more than elaborate prompt chains [in his control-flow piece](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's production harness work operationalizes this — an initializer scaffolds a feature list, git repo, and progress file once, and an incremental coding agent consumes that scaffold across many context windows without losing state [per the Anthropic harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory is the other structural variable. The agent memory comparison across 74 systems [catalogued here](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) reveals how fragmented the space is. One line of thinking argues that most memory systems fail by storing assertions rather than beliefs — missing provenance, confidence, and revision history — and proposes architectures with supersession and outcome-scored pruning [as argued in the belief-maintenance post](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). The zerostack coding agent reaches the opposite implementation conclusion: plain Markdown files with keyword search outperform vector stores given constraints of minimal RAM and no daemon [per the zerostack memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). Both agree the problem is about what gets retrieved and when, not raw storage capacity.

Verification is the third structural gap. Checking work in a different representation than it was produced — modality shift — is the most reliable verification pattern identified across the MAS literature [per Meiklejohn's verification post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Observability without feedback signals does not close the loop; attaching user ratings, indirect behavioral signals, and deterministic rule outcomes to execution traces is what enables a learning loop across model, harness, and context layers [as LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Two tensions run through the production accounts. The first is autonomy versus oversight. Claude Fable running multi-hour agentic workflows with sub-agent delegation shifts the human role from doing to commissioning [per Ethan Mollick's Fable report](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos), while Val Town's Pete Millspaugh proposes a Slow Mode that keeps humans involved at every planning step to preserve long-term code ownership [in his Slow Mode post](/reading/2026-05/2026-05-19t193626-slow-mode). Simon Willison notes that the same resourcefulness that makes an agent invent elaborate debugging techniques makes an unsandboxed agent genuinely dangerous [per his Fable post](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). The second tension is infrastructure complexity versus minimalism. Anthropic's managed-agents service separates harness, session log, and sandbox into stable interfaces for enterprise-scale swapping [per the managed agents post](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands), while zerostack fits a capable coding agent into 16MB of RAM with no daemon and no vector store [per the zerostack repo](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack). The field has not resolved this; both approaches are in active production use.
