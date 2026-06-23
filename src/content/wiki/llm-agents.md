---
title: LLM Agents
summary: >-
  LLM agents are software systems that pair a language model with tools, memory,
  and control flow to accomplish multi-step tasks autonomously; the emerging
  consensus is that reliability requires engineering constraints, not better
  prompts.
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
compiled_at: '2026-06-22T07:13:10.853Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8141
    output_tokens: 1594
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
  cost_usd: 0.048333
last_source_added: '2026-06-23T23:15:52.702Z'
---
An LLM agent is a language model embedded in a loop: it perceives inputs, invokes tools, stores intermediate state, and produces actions rather than just text. The basic architecture is well-established. What the current literature argues about, loudly, is how to make agents reliable enough to trust with real work.

The most consistent finding across recent engineering accounts is that prompt engineering is the wrong lever for reliability. A data engineering agent evolved through three architectures before its builders concluded that tool design, stable IDs, and context visibility outperformed any amount of prompt tuning [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The same thesis appears in a more direct form elsewhere: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The Anthropic engineering team applied this concretely by building a two-agent harness, an initializer and an incremental worker, that persists state across many context windows so that Claude can make consistent progress on long tasks without losing its place [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service pushes further by separating harness, session log, and sandbox into stable interfaces, enabling multi-brain, multi-sandbox architectures and cutting latency significantly [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Memory is a second major axis of agent engineering. Systems span a wide spectrum [AI Memory Systems Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison), but a recurring argument is that the standard storage metaphor is wrong. Agent memory fails not because of retrieval but because systems store assertions without provenance, confidence, or revision history; the right model is belief maintenance [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). The zerostack coding agent takes a different tradeoff, using plain Markdown files with keyword search rather than vector stores, trading recall sophistication for minimal RAM and no infrastructure dependencies [Designing Memory for zerostack](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). Recursive Language Models offer a third approach, keeping data in a REPL environment and letting the model selectively pull it into context, sidestepping context rot [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Observability is the third pillar. Traces alone do not improve agentic systems; attaching feedback signals, user ratings, indirect behavioral signals, LLM-as-judge, and deterministic rules, to those traces is what turns observability into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

In practice, current agents still require significant human oversight. An honest account of building a social app with Claude found the agent consistently declaring work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). One proposed response is a "Slow Mode" that keeps the human involved at every step, trading throughput for genuine understanding of the code produced [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). A contrasting data point: Claude Fable running multi-hour agentic workflows autonomously and delivering complex software, but with the observation that the human role has shifted from doing to commissioning [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos). Simon Willison documents the same model autonomously inventing elaborate browser automation techniques to fix a two-line CSS issue, and notes that resourcefulness at this level makes unsandboxed agents a genuine safety concern [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive).

At the multi-agent scale, a thorough survey of the research landscape identifies two waves: 2023 coordination proofs-of-concept (CAMEL, ChatDev, MetaGPT, AutoGen) that established patterns, and 2025 reliability measurement studies finding failure rates of 41 to 87 percent in production [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Shared failure modes include missing concurrency control, no escalation paths, and inter-agent reasoning failures that are structurally harder to fix than prompt-level issues [Getting Up to Speed on Multi-Agent Systems, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). Verification across a modality shift, checking work in a different representation than it was produced, is identified as the most reliable output-quality mechanism available [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). The field is, in effect, rediscovering distributed systems problems without the vocabulary to name them [Getting Up to Speed on Multi-Agent Systems, Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).
