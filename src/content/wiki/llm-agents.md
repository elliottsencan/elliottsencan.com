---
title: LLM agents
summary: >-
  LLM agents are language models equipped with tools, memory, and control flow
  that let them act autonomously across multi-step tasks; the field's central
  tension is between agent autonomy and the engineering scaffolding required to
  make that autonomy reliable.
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
compiled_at: '2026-07-06T00:15:29.400Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8647
    output_tokens: 1456
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
  cost_usd: 0.047781
---
An LLM agent pairs a language model with tools, persistent state, and some form of control flow so it can pursue goals across multiple steps without a human directing each one. The concept sounds clean in the abstract; in practice, the gap between a working demo and a production system has proven wide enough to generate an entire subfield of engineering.

The taxonomy of agents has grown quickly. [Meiklejohn's vocabulary post](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) maps the shared vocabulary: Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model (profile, memory, planning, action, and environment), and Chen et al.'s challenge levels. These frameworks reveal a recurring gap: most deployed agents have fixed capabilities and no mechanism to evolve their own skills. Memory is similarly underspecified. [Jakedismo's belief-maintenance post](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that agent memory systems fail because they store assertions rather than beliefs, missing provenance, confidence, scope, and revision history entirely. The [AI memory systems comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) indexes 74 systems across architecture and data model, illustrating how much the design space has fragmented.

The reliability picture is sobering. Wave-2 empirical work surveyed by [Meiklejohn's fourth post](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) — MAST, MAS-FIRE, and Silo-Bench — puts failure rates at 41 to 87 percent in production settings, with inter-agent reasoning failures structurally harder to fix than prompt-level issues. [Aiyan's engineering post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) documents a data engineering agent that improved through three architectural iterations, concluding that tool design and context visibility outperform prompt engineering for reliability. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion independently: reliable agents need deterministic control flow encoded in software, not prompt chains that collapse under complexity.

Observability and learning loops are an emerging layer on top of execution. [Harrison Chase at LangChain](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone do not improve systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge scores, and deterministic rules — is what turns observability into a loop that improves the model, harness, and context together.

Harness architecture is becoming a discipline of its own. [Anthropic's two-agent harness post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) describes splitting an initializer from an incremental coding agent so Claude can make coherent progress across many context windows. Their [Managed Agents post](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) separates the harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations. Benchmarks have not kept pace: [Meiklejohn's seventh post](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) notes that HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality, communication overhead, or failure recovery.

Two risks sit at the frontier. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents Claude Fable autonomously inventing elaborate debugging techniques and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. Verification helps: [Meiklejohn's sixth post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable for self-verification, with Cursor's visual feedback loop as the clearest real-world example.

Open implementations span a wide range. [Zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) is a Rust-built minimal coding agent using ~16MB RAM with file-based Markdown memory and read-only parallel subagents. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) offers a full desktop cockpit for multi-agent teams with persistent wiki memory and built-in observability. Both reflect a broader pattern: the engineering work of agent infrastructure is being rebuilt from scratch across many independent projects, each rediscovering the same constraints around state, context, coordination, and failure recovery.
