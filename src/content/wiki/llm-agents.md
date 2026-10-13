---
title: LLM agents
summary: >-
  LLM agents are software systems where a language model drives decisions, tool
  use, and multi-step task execution; the field's central challenge has shifted
  from proving coordination is possible to making it reliable in production.
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
compiled_at: '2026-10-13T00:17:23.876Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1644
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
  cost_usd: 0.05163
---
An LLM agent is a system in which a language model acts as a reasoning engine that selects actions, calls tools, and pursues goals across multiple steps without a human approving each move. The minimal version is a single model in a loop; more elaborate configurations add sub-agents, shared state, orchestrators, and external memory. What unites the sources here is a shared diagnosis: the field has moved past "can agents do anything interesting" and is now grappling with "why do they fail so often, and how do you build around that."

Christopher Meiklejohn's eight-part survey provides the clearest historical frame. The first wave of multi-agent research (2023) centered on proofs of concept — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — that demonstrated coordination was achievable but left concurrency control, state management, and error escalation entirely unaddressed [Getting Up to Speed, Part 3](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1). The second wave (2025-2026) arrived with empirical failure rates: MAST, MAS-FIRE, and Silo-Bench measured production multi-agent systems failing 41-87% of the time, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues [Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2). Meiklejohn's conclusion is that the field is quietly reinventing distributed systems without the vocabulary for it — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols remain open problems [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open).

The reliability problem runs through nearly every practitioner source. A data engineering agent built through three architectural generations — rigid state machine, orchestrator, then single general-purpose agent — found that environmental constraints (well-designed tools, stable ID keys, visible context) outperformed prompt engineering for reliability [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh argues the same point more directly: reliable agents need deterministic control flow encoded in software, not elaborate prompt chains that collapse under complexity [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Meiklejohn's own hands-on account of building a social app with Claude found the agent consistently declaring work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

Verification is a structurally distinct problem. Checking agent output in a different representation than it was produced — modality shift — appears to be the key variable for catching errors [Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6). Cloudflare's security work takes this further: parallel hunter agents, adversarial validators, and cross-repo tracers dramatically outperform single-agent vulnerability scanning [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us), a pattern echoed in Anthropic's reference harness for autonomous vulnerability discovery [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness).

Memory and state management are active design problems. Approaches range from plain Markdown files with keyword search (zerostack, [memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack)) to hierarchical tree indexes that use LLM reasoning for retrieval rather than vector similarity [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex). A more fundamental critique frames agent memory as a belief-maintenance problem: systems that store bare assertions without provenance, confidence, or revision history will accumulate stale and contradictory state regardless of storage backend [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). Recursive Language Models (RLMs) approach context rot differently, keeping data in a REPL environment and letting the model selectively pull it into token space [The Potential of RLMs](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms).

Observability closes the loop. Traces alone do not improve agent systems; attaching feedback signals — user ratings, indirect behavior signals, LLM-as-judge, deterministic rules — to traces is what converts monitoring into learning [Agent Observability Needs Feedback](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Anthropic's managed agents architecture separates the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60% [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Safety and autonomy sit in tension. Simon Willison's account of Claude Fable autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix illustrates the same property from two angles: high resourcefulness and genuine risk when the agent runs unsandboxed [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher warns that outer harness loops amplify LLMs' worst coding tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The question of how much autonomy to grant, and to whom, remains genuinely open.
