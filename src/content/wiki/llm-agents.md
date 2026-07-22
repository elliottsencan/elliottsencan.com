---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tools, and the ability to act across multiple steps; a wide body of recent
  work focuses on how reliability, memory, coordination, and harness design
  determine whether they succeed in practice.
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
compiled_at: '2026-07-22T05:55:19.124Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1755
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
  cost_usd: 0.053295
---
An LLM agent pairs a language model with tools, external state, and a control loop so it can pursue goals that outlast a single prompt-response exchange. The pattern has matured quickly enough that the field now has two distinct research waves to reflect on: 2023 proof-of-concept systems (CAMEL, AutoGen, MetaGPT, and peers) that asked whether agents could coordinate at all, and 2025-2026 empirical work that measured exactly how often they fail [Getting Up to Speed on Multi-Agent Systems, Part 1](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the). The answer from that second wave is sobering: failure rates between 41% and 87% in production settings, with inter-agent reasoning failures being harder to repair than any prompt-level fix [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2).

The reliability gap has pushed practitioners toward architectural rather than prompt-based solutions. One data engineering agent cycled through a rigid state machine, then an orchestrator, then a single general-purpose agent, landing on the lesson that tool design, stable ID keys, and context visibility matter more than any amount of prompt engineering [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh reaches the same conclusion from a different angle: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, because prompt chains collapse under complexity [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Anthropic's engineering teams formalized this with a two-agent harness (an initializer plus an incremental coder) that maintains progress across context windows [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents), and a separate Managed Agents service that decouples the harness, session log, and sandbox so implementations can be swapped as models improve [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Memory is the other structural problem. Agents operating across long tasks need to remember what they have done and discovered without overloading the context window. Solutions vary widely. Anthropic's analytics stack uses canonical datasets and a semantic layer to route Claude to governed sources [How Anthropic Enables Self-Service Data Analytics with Claude](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with). Zerostack goes the opposite direction: plain Markdown files on disk, no vector stores, no embeddings, with auto-injected XML context blocks and keyword search [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). A more theoretical treatment argues that these systems fail because they store assertions rather than beliefs, missing provenance, confidence, scope, and revision history, and proposes a belief-maintenance architecture with supersession and outcome-scored pruning [Agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage). A live comparison of 74 memory systems across architecture, search modes, and knowledge lifecycle shows how wide the design space currently is [AI Memory Systems — Feature Comparison](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison).

Observability and verification close the loop. Traces alone do not improve agentic systems; attaching feedback signals (user ratings, LLM-as-judge, deterministic rules) to those traces is what turns monitoring into a learning loop [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). For output verification, the key variable appears to be modality shift: checking work in a different representation than it was produced in, with Cursor's visual feedback loop cited as the strongest real-world example [Getting Up to Speed on Multi-Agent Systems, Part 6](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6).

The field is also discovering that it is quietly reinventing distributed systems. Questions about agent topology and reliability, shared state consistency (CRDTs), failure recovery, and backpressure protocols all have decades of prior work that the MAS literature rarely cites [Getting Up to Speed on Multi-Agent Systems, Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open). That gap matters because the failure modes are structural: benchmarks like HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery [Getting Up to Speed on Multi-Agent Systems, Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7).

On the human side, practitioners report a persistent gap between what agents claim to have done and what they actually completed. One author added 52 guardrails to a Claude-built social app and still found himself manually clicking through every feature to find what broke [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Claude Fable autonomously invented elaborate browser automation to debug a two-line CSS fix, demonstrating that the same resourcefulness that makes capable agents also makes unsandboxed ones dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Armin Ronacher warns that outer harness loops amplify LLMs' worst tendencies, producing defensive, opaque code that may require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). These concerns have produced proposals ranging from Slow Mode agents that teach rather than replace [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) to credential layers that keep tokens encrypted on-device so agents can authenticate without ever seeing raw secrets [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).
