---
title: LLM agents
summary: >-
  LLM agents are software systems where a language model drives action sequences
  across tools, memory, and other agents; the emerging consensus is that
  reliability comes from environmental constraints and control flow, not prompt
  engineering.
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
compiled_at: '2026-06-21T18:24:25.254Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8141
    output_tokens: 1736
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
  cost_usd: 0.050463
---
An LLM agent is a system in which a language model does more than generate text: it plans, selects tools, manages state, and takes actions that affect the world outside the model's context window. The term covers a wide spectrum, from a single model with file-system access to multi-agent pipelines where specialized subagents coordinate on parallel workstreams.

The clearest taxonomy of what an agent actually is comes from the multi-agent systems research surveyed by Christopher Meiklejohn. Zhou et al.'s five-component model names the key parts: a profile (the agent's role and persona), memory, planning, action, and tool access [Getting Up to Speed on Multi-Agent Systems, Part 2: The Vocabulary](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the). Tran et al.'s four-axis typology further organizes agents by their coordination structure, and Chen et al. introduces difficulty levels for the challenges agents face. These frameworks are useful less for their elegance than for what they reveal is missing: most deployed systems don't evolve their behavior over time, and benchmarks rarely measure the things that actually fail.

The reliability problem is the most persistent theme across the sources here. A data engineering agent evolved through three architectural generations -- rigid state machine, orchestrator, and then a single general-purpose agent -- and the key finding was that environmental constraints (tool design, stable ID keys, explicit context visibility) outperformed prompt engineering at every stage [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same argument more directly: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, rather than elaborate prompt chains that compound errors [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The Wave 2 empirical papers surveyed by Meiklejohn -- MAST, MAS-FIRE, and Silo-Bench -- put numbers on the failure rate: multi-agent systems fail between 41% and 87% of the time in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues [Getting Up to Speed on Multi-Agent Systems, Part 4: Wave 2 (Why It Breaks)](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

Anthropics engineering posts show how production deployments address this. Their two-agent harness -- an initializer that scaffolds state, plus an incremental coding agent -- lets Claude make consistent progress across many context windows without losing track of what's done [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service decouples the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60% [Scaling Managed Agents: Decoupling the Brain from the Hands](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Memory is its own problem. The live comparison of 74 agent memory systems [AI Memory Systems — Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) shows the space is fragmented. Zerostack's approach -- plain Markdown files on disk, auto-injected XML context blocks, read/write/search tools -- rejects vector stores in favor of minimal RAM and no infrastructure dependency [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). A more principled critique argues that storing facts is the wrong model entirely: agents accumulate assertions without provenance, confidence, or revision history, and what they actually need is belief maintenance -- supersession, pointer claims, and outcome-scored pruning [Agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage).

Observability closes the loop between deployment and improvement. Traces alone don't change system behavior; attaching feedback signals -- user ratings, indirect behavioral signals, LLM-as-judge, deterministic rule outputs -- to those traces is what turns observability into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

The human role in agentic systems remains unsettled. Claude Fable running multi-hour workflows autonomously has shifted the human from doing to commissioning [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos), but even capable agents consistently declare work done after minimal self-checking, requiring manual verification [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Val Town's Slow Mode proposal inverts the productivity-first assumption: keeping the human involved at every step trades throughput for genuine understanding of the code produced [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). Simon Willison's documentation of Claude Fable autonomously inventing browser automation techniques to debug a two-line CSS fix is both a capability demonstration and a safety warning: the same resourcefulness that solves hard problems is dangerous in unsandboxed environments [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive).

Meiklejohn's open questions post identifies the deepest gap: the field is quietly rediscovering distributed systems problems -- topology-to-reliability mappings, CRDTs for shared state, backpressure protocols, failure recovery -- without the vocabulary to name them [Getting Up to Speed on Multi-Agent Systems, Part 8: Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). Benchmarks make this worse by measuring single-agent code quality rather than coordination overhead, communication cost, or failure recovery -- the properties that actually distinguish multi-agent architectures [Getting Up to Speed on Multi-Agent Systems, Part 7: Benchmarks and What They Miss](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).
