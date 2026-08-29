---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tools, and the ability to act across multi-step tasks; the emerging consensus
  is that reliability comes from engineering constraints, not prompt craft.
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
compiled_at: '2026-08-29T20:17:09.422Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1791
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
  cost_usd: 0.053835
---
An LLM agent pairs a language model with a loop: the model perceives some state, decides on an action, executes it via tools, and observes the result. That loop is simple to describe and hard to make reliable. The bulk of serious writing on the subject has shifted from demonstrating that agents can act to understanding why they fail and what structural choices reduce that failure rate.

The earliest multi-agent research, surveyed by Christopher Meiklejohn in his eight-part series, focused on proving coordination was possible at all. The 2023 wave, covering systems like CAMEL, ChatDev, MetaGPT, and AutoGen [/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1], established that agents could pass tasks between one another and produce software artifacts. What those systems lacked was concurrency control, escalation paths, and any meaningful verification step. The 2025 empirical wave then measured the cost of those omissions: MAST, MAS-FIRE, and Silo-Bench found production failure rates between 41% and 87%, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2].

The vocabulary for talking about agents is still being standardized. Meiklejohn documents Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels [/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the], noting that the taxonomy itself reveals gaps: most published agents do not self-improve, and benchmarks designed for single models cannot measure coordination quality, communication overhead, or failure recovery [/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7].

On the engineering side, the practitioner consensus is clear: prompt engineering is a poor substitute for structural constraints. A data engineering agent that evolved through three architectures, from rigid state machine to orchestrator to single general-purpose agent, showed that tool design, stable IDs, and context visibility outperformed prompt iteration at every stage [/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it]. Brian Suh makes the same argument in terms of control flow: complex tasks require explicit state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains [/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts]. Anthropic's own production harness work confirms this, describing a two-agent initializer-plus-incremental-coder pattern that preserves progress across context windows via a git repo and a progress file [/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents], and a Managed Agents service that decouples harness, session log, and sandbox into stable interfaces swappable as models improve [/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands].

Memory is an active design space. The zerostack coding agent uses plain Markdown files with keyword search and auto-injected XML context blocks, deliberately avoiding vector stores to stay under 20MB RAM [/reading/2026-06/2026-06-11t023157-memory-design-zerostack]. A contrasting view frames agent memory as a belief-maintenance problem: storing assertions without provenance, confidence, or revision history causes agents to act on stale or contradictory information, and a JSONL-based architecture with supersession and outcome scoring is proposed as a fix [/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage]. Recursive Language Models offer a third approach, keeping data in a REPL environment so the model pulls only what it needs into token space, avoiding context rot while generating traces that can be mined to design lower-latency successors [/reading/2026-06/2026-06-04t194033-the-potential-of-rlms].

Verification is its own unsolved problem. Meiklejohn identifies modality shift as the key variable: checking work in a different representation than it was produced in, with Cursor's visual feedback loop as the strongest real-world example [/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6]. Observability alone is insufficient; attaching feedback signals, user ratings, indirect behavioral signals, LLM-as-judge, and deterministic rules, to traces is what turns logging into a learning loop [/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning]. In practice, even well-instrumented agents require manual oversight: one account of two weeks building a social app with Claude describes the agent consistently declaring work done after minimal checks, requiring 52 new guardrails and manual click-throughs to find what actually broke [/reading/2026-05/2026-05-03t110355-babysitting-the-agent].

Capability is also advancing. Claude Fable autonomously ran multi-hour agentic workflows, delegated to sub-agents, and delivered complex software, but shifted the human role from doing to commissioning [/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos]. That same resourcefulness carries risk: Simon Willison documented Fable inventing elaborate browser automation techniques to debug a two-line CSS fix, then noted that identical ingenuity makes unsandboxed agents dangerous [/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive]. Armin Ronacher extends this concern to harness loops generally, warning that outer orchestration amplifies LLMs' tendencies toward defensive, opaque code and risks producing codebases that require machine participation to maintain [/reading/2026-06/2026-06-23t161552-the-coming-loop].

Open questions cluster around distributed systems theory. Meiklejohn's series concludes that the field is rediscovering backpressure, CRDTs for shared state, topology-to-reliability mappings, and failure recovery without the vocabulary to name them [/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open], and that coordination structure must match task structure rather than being chosen by convention [/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate]. How to formalize those constraints, measure them against appropriate benchmarks, and keep humans meaningfully in the loop remains the central engineering challenge.
