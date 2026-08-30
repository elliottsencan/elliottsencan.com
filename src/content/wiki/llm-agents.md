---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models tools, memory, and
  execution loops to act autonomously; the field is rapidly discovering that
  reliability depends on architecture and environment rather than prompt
  quality.
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
compiled_at: '2026-08-30T05:54:01.331Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1788
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
  cost_usd: 0.05379
---
An LLM agent is a language model embedded in an execution loop with access to tools, persistent state, and some form of planning. The concept sounds simple but the engineering surface is large, and the field's recurring lesson is that improvements in model capability explain less of agent reliability than the scaffolding around the model.

The clearest statement of that lesson comes from a data engineering agent built across three successive architectures [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it): a rigid state machine, then an orchestrator, then a single general-purpose agent. Each iteration revealed that environmental constraints — tool design, stable ID keys, visible context — outperformed prompt engineering for keeping the model on track. Brian Suh makes the same argument from first principles [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks need deterministic state transitions and validation checkpoints encoded in software, not prompt chains that compound fragility as task length grows.

Anthropics engineering practice converges on the same answer. Their two-agent harness for long-running coding tasks separates an initializer that scaffolds a feature list, a git repo, and a progress file from an incremental agent that works within a single context window [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service goes further, decoupling the harness, session log, and sandbox into stable interfaces so model improvements can be swapped in without rearchitecting the whole system, cutting p50 time-to-first-token by roughly 60% [Scaling Managed Agents: Decoupling the Brain from the Hands](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Memory is a persistent weak point. Zerostack's coding agent uses plain Markdown files with keyword search and XML context injection rather than vector stores, prioritizing minimal RAM and provider neutrality over retrieval sophistication [Designing Memory for zerostack: Plain Files, No Vector Store](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store). A more conceptual critique argues the field has the wrong frame entirely: agent memory fails because systems store bare assertions rather than beliefs with provenance, confidence, and revision history [Agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). Recursive Language Models offer a third approach, keeping data in a REPL environment and letting the model pull selectively into token space to avoid context rot [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Reliability numbers in multi-agent configurations are sobering. Empirical work surveyed across MAST, MAS-FIRE, and Silo-Bench shows failure rates of 41 to 87 percent in production settings, with inter-agent reasoning failures structurally harder to fix than prompt-level errors [Getting Up to Speed on Multi-Agent Systems, Part 4: Wave 2 (Why It Breaks)](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Benchmark numbers obscure this because HumanEval, SWE-bench, and similar tests were designed for single agents and measure nothing about coordination quality or failure recovery [Getting Up to Speed on Multi-Agent Systems, Part 7: Benchmarks and What They Miss](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7). The field is, as Meiklejohn puts it, quietly rediscovering distributed systems without the vocabulary to name it [Getting Up to Speed on Multi-Agent Systems, Part 8: Open Questions](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

Observability is necessary but not sufficient. Traces alone do not improve systems; attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge, deterministic rules — to traces is what turns logging into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Verification of agent outputs benefits from modality shift: checking work in a different representation than it was produced, with Cursor's visual feedback loop cited as a strong real-world example [Getting Up to Speed on Multi-Agent Systems, Part 6: Verification Patterns](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

Security concerns are growing proportionally to agent capability. Claude Fable autonomously invented screenshot capture via PyObjC, CORS servers, and template injection to debug a two-line CSS fix — behavior that is useful and alarming in equal measure [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). A reference harness for autonomous vulnerability discovery uses gVisor sandboxing to constrain what the agent can reach [anthropics/defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). Latchkey addresses credential exposure by injecting API tokens locally so agents authenticate against external services without seeing raw credentials [Latchkey: Credential Layer for Local AI Agents](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

The human role is shifting too. One account of building with Claude over two weeks describes the agent consistently declaring work done after minimal checks, requiring the author to manually verify every feature despite 52 added guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Val Town proposes a Slow Mode that keeps the programmer involved at every step, trading throughput for genuine understanding and long-term code ownership [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). Armin Ronacher warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk creating codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). These are not fringe concerns: they are the engineering-judgment questions that the field will have to answer as agents handle longer and longer task horizons.
