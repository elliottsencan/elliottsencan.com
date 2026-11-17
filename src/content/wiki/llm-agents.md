---
title: LLM agents
summary: >-
  LLM agents are language models embedded in execution loops that perceive
  context, call tools, and take actions; the central challenges are reliability
  engineering, state management, coordination, and human oversight.
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
compiled_at: '2026-11-17T01:43:52.877Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1654
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
  cost_usd: 0.05178
---
An LLM agent is a language model wired into an execution loop: it receives context, reasons, invokes tools or subprocesses, and iterates toward a goal without a human issuing each step. The concept spans single-agent coding assistants and elaborate multi-agent pipelines, but the same failure modes recur at every scale.

The clearest practitioner account of how single-agent architectures actually evolve comes from [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it), which passed through three designs before settling on a general-purpose agent that derives reliability from environmental constraints — well-keyed tools, constrained context visibility — rather than from prompt engineering. [Brian Suh makes the same argument structurally](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, because prompt chains collapse under real-world complexity.

State management is a persistent bottleneck. When an agent's work spans many context windows, it needs an external memory of what it has done. [Anthropic's harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes a two-agent initializer-plus-incrementer pattern that writes progress to a file so Claude can resume coherently. The zerostack project takes a more minimal path: [plain Markdown files on disk with keyword search](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), no vector store, no embeddings, running in roughly 16 MB of RAM [compared to ~300 MB for JS-based alternatives](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack). A theoretical critique from [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that all these storage approaches miss the real problem: memory should track beliefs with provenance, confidence, and revision history, not flat assertions.

For multi-agent systems, Christopher Meiklejohn's eight-part series provides the most thorough landscape. [The first coordination-era papers (CAMEL, ChatDev, MetaGPT, AutoGen) from 2023](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) proved coordination was possible but left concurrency control and escalation paths unresolved. [The 2025 measurement wave](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) found failure rates of 41-87% in production systems, with inter-agent reasoning failures harder to fix than prompt-level issues. [Later work on coordination structure](/reading/2026-05/2026-05-03t110055-getting-up-to-speed-on-multi-agent-systems-part-5-debate) finds that convergent versus adversarial debate, shared-notebook state, and the CALM theorem each suit different task shapes, and that distributed systems theory offers formalisms the AI field keeps reinventing without naming. [Benchmarks remain largely inadequate](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) because HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery.

Verification is where architecture choices become most visible. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the strongest reliability lever, with visual feedback loops as the best real-world example. [Cloudflare's Mythos harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) uses parallel hunters and adversarial validators to find security vulnerabilities that single-agent passes miss entirely.

Observability without feedback is insufficient. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone do not improve agents; attaching feedback signals — ratings, behavioral signals, LLM-as-judge verdicts, and deterministic rules — is what turns logs into a learning loop.

Human oversight has become an active design question rather than an afterthought. [Christopher Meiklejohn's babysitting account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) is direct: even with 52 guardrails, Claude routinely declared work done after minimal checks, forcing manual verification of every feature. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) is a deliberate counter: an agent that plans with the developer, teaches concepts, and never loops autonomously, trading throughput for genuine programmer ownership. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' tendency toward defensive, opaque code and risk producing codebases that require machine participation to maintain.

Capability is advancing regardless. [Ethan Mollick's report on Claude Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) documents multi-hour autonomous workflows with sub-agent delegation that deliver complex software; [Simon Willison's account of the same model](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents it inventing elaborate browser automation to debug a two-line CSS fix and notes how that resourcefulness becomes a security risk in unsandboxed environments. The open question from [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — frames what the field still lacks vocabulary to solve.
