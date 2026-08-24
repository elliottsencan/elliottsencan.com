---
title: LLM Agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and decision loops; the literature on them spans architecture,
  reliability, memory, coordination, and the engineering discipline needed to
  make them work in production.
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
compiled_at: '2026-08-24T18:47:43.533Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1691
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
  cost_usd: 0.052335
---
An LLM agent, at its simplest, is an LLM given a goal and the means to act on it: tools to call, state to read and write, and a loop that runs until the goal is met or a limit is hit. The concept sounds tidy in the abstract. In practice, nearly every source here is wrestling with the gap between the promise and the mess.

The foundational vocabulary matters. [Meiklejohn's taxonomy series](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) synthesizes Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model, and Chen et al.'s challenge levels into a shared framework, making clear that much early MAS writing used the same words for different things. That imprecision compounds when you try to measure progress: existing benchmarks like HumanEval and SWE-bench were [designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7), which are precisely the things that distinguish multi-agent systems.

The empirical picture is bleak at scale. [Wave 2 MAS research — MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) finds failure rates of 41–87% in production, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. A hands-on account of building a social app with Claude [found the agent consistently declaring work done after minimal checks](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), requiring manual click-through of every feature even after 52 added guardrails. The pattern is consistent: prompt engineering hits a ceiling.

The practical response is architectural. [Brian Suh argues](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) that reliable agents need deterministic control flow encoded in software — explicit state transitions and validation checkpoints — rather than elaborate prompt chains. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) confirms this through three successive architectures, concluding that environmental constraints (tool design, ID keys, context visibility) outperform prompt engineering for reliability. Anthropic's own production work reinforces it: a [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) separates an initializer that scaffolds feature lists and a progress file from an incremental coding agent, letting Claude maintain state across many context windows. Their [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) goes further, decoupling harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60%.

Memory is its own design problem. [Zerostack's file-based approach](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) — plain Markdown on disk, no vector stores, no embeddings — deliberately trades sophistication for minimal RAM (~16MB, versus ~300MB for JS-based alternatives) and provider neutrality. [One critique goes deeper](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage): agent memory fails not because of storage architecture but because systems store assertions rather than beliefs, missing provenance, confidence, scope, and revision history. Separately, [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) sidestep context rot by keeping data in a REPL environment and letting the LLM pull selectively into token space, with emergent traces that can be mined for lower-latency agent designs.

Verification is structurally underrated. [Meiklejohn's verification patterns piece](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable, citing Cursor's visual feedback loop as the strongest real-world example. [LangChain's observability framework](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) makes a related point: traces alone don't improve systems; attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) to traces is what turns observability into a learning loop.

Safety and autonomy sit in genuine tension. [Simon Willison documents Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then warns how that same resourcefulness makes unsandboxed coding agents dangerous. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that outer harness loops amplify LLMs' worst tendencies — defensive, opaque code — risking codebases that require machine participation to maintain. Against this, [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) trades short-term productivity for human involvement at every step, preserving genuine learning and code ownership.

The open questions cluster around distributed systems theory. [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) maps unsolved problems — topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, failure recovery — and argues the field is quietly rediscovering distributed systems without the vocabulary to name it. Coordination structure must match task structure; the [CALM theorem and shared-notebook state models](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) already show that different coordination topologies suit different task types, but formal formalisms from distributed computing remain largely untapped.
