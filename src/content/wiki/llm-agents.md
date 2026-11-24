---
title: LLM agents
summary: >-
  LLM agents are language models equipped with tools, memory, and control flow
  to act autonomously across multi-step tasks; the emerging consensus is that
  reliability comes from engineering constraints, not prompting, and that the
  field is quietly reinventing distributed systems.
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
compiled_at: '2026-11-24T03:57:42.662Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1791
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
  cost_usd: 0.053835
---
An LLM agent is a language model that does not merely respond to a single prompt but executes sequences of actions: calling tools, reading and writing memory, spawning subprocesses, and deciding when a task is complete. The concept spans a wide spectrum, from a single model with a file-read tool to coordinated fleets of specialized agents running in parallel sandboxes.

The clearest practitioner framing comes from Anthropic's engineering posts. Their two-agent harness [splits work](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) into an initializer that scaffolds a feature list, git repo, and progress file, and an incremental coding agent that picks up where context windows end. A parallel post [separates the agent harness, session log, and sandbox](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) into stable interfaces so implementations can swap as models improve, cutting p50 time-to-first-token by roughly 60%.

The reliability problem is the dominant theme across sources. A data engineering agent [evolved through three architectures](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) before its builders concluded that environmental constraints, specifically tool design, ID keys, and context visibility, outperform prompt engineering. Brian Suh reaches the same conclusion more directly: [agents need deterministic control flow encoded in software](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts), not more elaborate prompt chains. Observability alone is insufficient; [attaching feedback signals to traces](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is what turns monitoring into a learning loop.

Christopher Meiklejohn's eight-part survey maps the research landscape in detail. [Wave 1 (2023)](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) produced coordination proofs-of-concept like CAMEL, ChatDev, MetaGPT, and AutoGen, each demonstrating that agents could coordinate but sharing failure modes: missing concurrency control, no escalation paths. [Wave 2 (2025-2026)](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) measured what actually breaks in production, with MAST, MAS-FIRE, and Silo-Bench finding failure rates of 41-87%, concentrated in inter-agent reasoning rather than individual prompt quality. [Benchmarks remain a gap](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7): HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery. The [concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) argues the field is rediscovering distributed systems problems, topology-to-reliability mapping, CRDTs for shared state, backpressure protocols, without the vocabulary to name them.

Memory is a persistent design variable. The zerostack coding agent uses [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) rather than vector stores, trading semantic richness for minimal RAM and no infrastructure dependency. A more critical framing [argues that agent memory systems fail because they store assertions rather than beliefs](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), missing provenance, confidence, scope, and revision history. A live comparison table [covers 74 AI agent memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) across architecture, search modes, and benchmarks for those evaluating options.

Security and sandboxing have become unavoidable. Simon Willison [documents Claude Fable autonomously inventing browser automation techniques](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) to debug a two-line CSS fix, noting the same resourcefulness that makes agents useful makes unsandboxed agents dangerous. A reference harness from Anthropic [covers autonomous vulnerability discovery and remediation with gVisor sandboxing](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). Cloudflare's Project Glasswing [ran multi-agent harnesses with parallel hunters, adversarial validators, and cross-repo tracers](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) against its own repos and found this structure dramatically improves vulnerability discovery over generic coding agents.

Human oversight sits in unresolved tension with autonomy. One post [honestly accounts for two weeks of building with Claude](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), where the agent consistently declared work done after minimal checks, forcing manual verification despite 52 new guardrails. Another proposes a [Slow Mode agent that keeps humans involved at every step](/reading/2026-05/2026-05-19t193626-slow-mode) to trade short-term productivity for genuine understanding of the resulting code. Armin Ronacher [warns that harness loops amplify LLMs' worst tendencies](/reading/2026-06/2026-06-23t161552-the-coming-loop), producing defensive, opaque codebases that may require machine participation to maintain. Ethan Mollick, reporting on Claude 5 Fable, [finds the human role has shifted from doing to commissioning](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos), with the agent running multi-hour autonomous workflows and delegating to sub-agents.

The infrastructure layer is consolidating around a few recurring patterns: harness-managed state files for cross-context continuity, subagent delegation for parallel exploration without context bloat [as in zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack), credential injection layers [like Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) to keep tokens off agent context, and harness-optimization loops [like harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) that treat the scaffolding itself as the optimization target.
