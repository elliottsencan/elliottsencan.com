---
title: LLM agents
summary: >-
  LLM agents are language models embedded in control loops that perceive, plan,
  and act — a field whose sources converge on a shared tension between autonomy
  and reliability, and between prompt engineering and structural engineering.
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
compiled_at: '2026-07-09T14:13:58.476Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8647
    output_tokens: 1673
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
  cost_usd: 0.051036
---
An LLM agent is a language model placed inside a loop that can take actions: read files, call APIs, spawn sub-processes, coordinate with other agents, or write and execute code. The defining challenge, consistent across the sources here, is that the model's probabilistic outputs must be made reliable enough to trust in environments where errors compound.

The earliest multi-agent work, documented in the 2023 papers surveyed by Christopher Meiklejohn — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — focused on proving that agents could coordinate at all [getting-up-to-speed-on-multi-agent-systems-part-3-wave-1](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). That wave produced proofs of concept but left structural problems unaddressed: no concurrency control, no escalation paths, no mechanism for recovering from inter-agent disagreements. By 2025, empirical measurement replaced enthusiasm; papers like MAST, MAS-FIRE, and Silo-Bench showed failure rates between 41 and 87 percent in production conditions, with inter-agent reasoning failures proving structurally harder to fix than prompt-level issues [getting-up-to-speed-on-multi-agent-systems-part-4-wave-2](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The convergence across practitioners is that prompting alone cannot produce reliable agents. A data engineering agent evolved through a rigid state machine, then an orchestrator, then a single general-purpose agent; the conclusion was that tool design and environmental constraints — not prompt engineering — drove reliability gains [dont-prompt-your-agent-for-reliability-engineer-it](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh puts the same point directly: complex tasks require deterministic control flow encoded in software, with explicit state transitions and validation checkpoints [agents-need-control-flow-not-more-prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's engineering posts reinforce this: a two-agent harness that scaffolds a feature list, git repo, and progress file allows consistent progress across many context windows without losing state [effective-harnesses-for-long-running-agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents), and separating the harness, session log, and sandbox into stable interfaces allows model swaps without breaking the surrounding system [scaling-managed-agents-decoupling-the-brain-from-the-hands](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Verification is a recurring gap. Meiklejohn's series on multi-agent systems identifies modality shift — checking work in a different representation than it was produced — as the key variable in output verification [getting-up-to-speed-on-multi-agent-systems-part-6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Observability tools address this at runtime: attaching feedback signals to traces — user ratings, indirect behavior signals, LLM-as-judge, deterministic rules — is what turns observability into a learning loop across model, harness, and context layers [agent-observability-needs-feedback-to-power-learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning).

Memory is a second structural gap. A belief-maintenance framing argues that agent memory fails because systems store assertions without provenance, confidence, or revision history — problems that a vector store does not solve [agent-memory-is-a-belief-maintenance-problem-not-a-storage](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). In practice, the zerostack coding agent uses plain Markdown files with regex retrieval, avoiding vector infrastructure entirely at the cost of some recall sophistication [designing-memory-for-zerostack-plain-files-no-vector-store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A live comparison of 74 memory systems spans the range between those extremes [ai-memory-systems-feature-comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison).

Autonomy raises oversight questions that the sources handle differently. Pete Millspaugh proposes a Slow Mode agent that keeps humans involved at every planning step to preserve long-term code ownership [slow-mode](/reading/2026-05/2026-05-19t193626-slow-mode). Simon Willison documents Claude Fable autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous [claude-fable-is-relentlessly-proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher warns that harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain [the-coming-loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Benchmarks compound the reliability problem by measuring the wrong things. HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [getting-up-to-speed-on-multi-agent-systems-part-7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). The open questions — topology-to-reliability mapping, CRDTs for shared state, backpressure protocols — are problems distributed systems research has addressed in other contexts, but the agent field lacks the vocabulary to import those solutions [getting-up-to-speed-on-multi-agent-systems-part-8-open](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).
