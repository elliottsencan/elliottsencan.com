---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models tool access, memory,
  and control flow to act autonomously — a field advancing fast but contending
  with fundamental reliability, coordination, and architectural problems.
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
compiled_at: '2026-06-20T22:00:48.414Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8141
    output_tokens: 1468
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
  cost_usd: 0.046443
---
An LLM agent wraps a language model with tools, memory, and some form of control flow so it can take actions rather than just generate text. The concept spans a wide design space, from single-agent loops that call APIs and write files, to multi-agent systems where specialized models coordinate across tasks. What the contributing sources collectively show is that the gap between "agent does the thing" and "agent reliably does the thing" is the central engineering problem of the field.

The taxonomy settled on by multi-agent systems research gives a useful frame. [Meiklejohn's vocabulary survey](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) covers Tran et al.'s four-axis typology and Zhou et al.'s five-component agent model, which together expose structural gaps: most deployed agents don't evolve their behavior, and most benchmarks weren't designed to measure what multi-agent coordination actually requires. The benchmarks problem is direct: HumanEval and SWE-bench were built for single agents, so [they can't measure coordination quality, communication overhead, or failure recovery](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

The reliability numbers from Wave 2 MAS research are stark. [MAST, MAS-FIRE, and Silo-Bench collectively show failure rates of 41–87% in production](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2), with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. This empirical record shapes the architectural advice that practitioners offer. [Aiyan's data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) found that evolving through rigid state machine, orchestrator, and general-purpose architectures showed environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering for reliability. [Brian Suh makes the same point more directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks need deterministic control flow encoded in software, not increasingly elaborate prompt chains.

Memory is its own design dimension. The approaches vary widely: Anthropic's long-running agent harness uses a progress file and git repo to maintain state across context windows [rather than relying on context alone](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Zerostack uses plain Markdown files on disk [with no vector store or embeddings](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), achieving ~16MB RAM usage. One sharp critique of the whole field is that [agent memory systems fail because they store assertions rather than beliefs](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), missing provenance, confidence, scope, and revision history — a belief-maintenance framing that most implementations ignore.

Verification is the third hard problem. [Meiklejohn's verification patterns survey](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable, with Cursor's visual feedback loop as the strongest real-world example. Observability without feedback is insufficient: [traces alone don't improve agentic systems](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning); attaching feedback signals to traces is what turns observability into a learning loop.

Capability is also advancing. [Ethan Mollick's hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) finds it running multi-hour agentic workflows autonomously, delegating to sub-agents, and delivering complex software — though the human role shifts from doing to commissioning. [Simon Willison documents the same model](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) autonomously inventing elaborate browser automation to debug a two-line CSS fix, then warns that that resourcefulness makes unsandboxed agents genuinely dangerous.

Security applications show multi-agent architecture in a structured context. Cloudflare's Project Glasswing ran Anthropic's Mythos model with [parallel hunters, adversarial validators, and cross-repo tracers](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) to dramatically improve vulnerability discovery. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) covers the full pipeline from threat modeling through patching with gVisor sandboxing.

[Meiklejohn's concluding open-questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) names the deeper structural issue: the field is quietly rediscovering distributed systems — topology-to-reliability tradeoffs, shared-state semantics, backpressure protocols — without the vocabulary to name it. Until agent frameworks treat coordination as a distributed systems problem rather than a prompting problem, the reliability gap documented by Wave 2 research is unlikely to close.
