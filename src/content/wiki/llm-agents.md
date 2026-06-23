---
title: LLM agents
summary: >-
  LLM agents are software systems where a language model drives actions across
  tools, memory, and other agents; the emerging consensus is that reliability
  comes from structural engineering — control flow, observability, harness
  design — not prompt refinement.
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
compiled_at: '2026-06-23T23:20:58.724Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8358
    output_tokens: 1421
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
  cost_usd: 0.046389
---
An LLM agent is a language model embedded in a loop: it perceives a context, decides on actions, executes them through tools or subprocesses, and updates its state. The simplest version is a single model calling APIs. The more complex version involves orchestrators, subagents, sandboxes, and shared memory — a stack that has grown rapidly since 2023 and whose failure modes are only now being systematically measured.

The foundational tension in agent design is between prompting and engineering. Multiple practitioners have landed on the same conclusion from different angles. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures, concluding that environmental constraints — well-designed tools, stable IDs, explicit context visibility — outperform prompt tuning for reliability. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument structurally: complex tasks need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains.

The failure rate numbers from empirical research are sobering. Wave 2 multi-agent benchmarks surveyed in [Getting Up to Speed on Multi-Agent Systems, Part 4](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — MAST, MAS-FIRE, and Silo-Bench — show production failure rates of 41–87%, with inter-agent reasoning failures being structurally harder to fix than prompt-level issues. The benchmarks used to measure progress complicate the picture further: [Part 7](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues that HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery — the properties that distinguish multi-agent systems.

Harness design has emerged as a primary engineering concern. [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes Anthropic's two-agent approach — an initializer that scaffolds state, plus an incremental worker — that maintains progress across context windows. [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces so implementations can be swapped as models improve, cutting p50 time-to-first-token by roughly 60%. [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer orchestration loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain.

Memory is its own unsolved problem. The dominant design question is no longer just storage format but belief management. [Agent memory is a belief-maintenance problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that storing bare assertions without provenance, confidence, or revision history is the root cause of memory system failures. At the implementation end, [zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) shows a pragmatic counter-case: plain Markdown files with keyword search, no vector store, chosen deliberately for minimal RAM footprint and provider neutrality.

Observability is increasingly treated as a precondition for improvement rather than a post-hoc audit tool. [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone accomplish nothing; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — is what converts observability into a learning loop across model, harness, and context layers.

At the frontier, capability and risk scale together. [What it feels like to work with Mythos](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) describes Claude 5 Fable running multi-hour agentic workflows with sub-agent delegation; [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) describes the same generation of models confidently declaring work complete after minimal checks, forcing manual verification of every feature. [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent inventing elaborate browser automation techniques to fix two lines of CSS, then notes that the same resourcefulness makes unsandboxed agents genuinely dangerous.

The open questions identified in [Part 8](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols, failure recovery — map closely onto distributed systems theory. The field is rediscovering that theory without always having the vocabulary to name it.
