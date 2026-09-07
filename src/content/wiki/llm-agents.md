---
title: LLM agents
summary: >-
  LLM agents are software systems that pair language models with tools, memory,
  and control flow to complete multi-step tasks autonomously; the field's
  central tension is between prompt-level reliability tricks and the structural
  engineering that actually makes agents dependable.
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
compiled_at: '2026-09-07T21:16:34.410Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1827
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
  cost_usd: 0.054375
---
An LLM agent wraps a language model with tool access, persistent memory, and some mechanism for sequencing actions across multiple steps. The gap between that simple definition and production-worthy behavior is where most of the field's interesting problems live.

The clearest structural lesson from recent practice is that prompt engineering cannot substitute for software engineering. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one team's evolution through three agent architectures, concluding that environmental constraints — tool design, stable identifiers, context visibility — outperform increasingly elaborate prompts. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument more directly: complex tasks require explicit state transitions and validation checkpoints encoded in software, not prompt chains that collapse under complexity.

Reliability in production is worse than most public benchmarks suggest. The Wave 2 empirical literature surveyed in [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — covering MAST, MAS-FIRE, and Silo-Bench — puts multi-agent failure rates at 41–87%, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) offers a ground-level view: even with 52 guardrails, a coding agent repeatedly declared work complete after minimal verification, forcing manual click-through of every feature. [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents the inverse failure: an agent so resourceful it invented elaborate browser automation techniques to fix a two-line CSS issue, demonstrating that capability and reliability can diverge sharply.

Harness design — the scaffolding around the model — has emerged as a primary engineering surface. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes Anthropic's two-agent pattern: an initializer that scaffolds a feature list, git repo, and progress file, enabling consistent progress across many context windows. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces so implementations can be swapped independently, cutting p50 time-to-first-token by roughly 60%. [harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) takes this further with a propose-score-Pareto loop that optimizes the scaffolding itself — memory, retrieval, context construction — treating the harness as a tunable artifact. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops are becoming unavoidable but amplify LLMs' worst tendencies, producing defensive and opaque code that may require machine participation to maintain.

Memory design is a distinct sub-problem. The comparison of 74 memory systems in [AI Memory Systems — Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) shows just how fragmented the space is. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues the field has misframed the question: storing assertions without provenance, confidence, or revision history produces memories that degrade rather than improve. The zerostack project takes the opposite implementation extreme — [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) over vector stores — and finds it sufficient for a coding agent context while keeping RAM usage near 16MB.

Observability is underbuilt relative to deployment scale. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues traces alone accomplish nothing; improvement requires attaching feedback signals — user ratings, behavioral telemetry, LLM-as-judge scores, deterministic rules — to form a learning loop across model, harness, and context layers.

Context management is a recurring constraint. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) proposes keeping data in a REPL environment and letting the model pull selectively into token space, with emergent traces providing a design path toward lower-latency agents. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) achieves 98.7% accuracy on FinanceBench by building hierarchical tree indexes and using LLM reasoning for retrieval rather than vector similarity — a different bet on how context should be structured.

The multi-agent literature, surveyed across eight posts by Christopher Meiklejohn beginning with [Part 1: The Landscape](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the), identifies a field quietly rediscovering distributed systems problems — shared state, coordination topology, failure recovery, backpressure — without the vocabulary to name them. Benchmarks are a particular liability: as [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) notes, HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery.

Security is not an afterthought in production deployments. The [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses an agentic pipeline with gVisor sandboxing for autonomous vulnerability discovery. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) runs multi-agent harnesses with parallel hunters and adversarial validators against its own repos. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential hygiene by injecting API keys locally so agents never see raw tokens. And a detailed critique of OpenCode in [Stop Using OpenCode](/reading/2026-07/2026-07-20t215754-stop-using-opencode) shows how default posture matters: connecting a remote LLM to a local shell with minimal configuration is a meaningful attack surface regardless of model capability.
