---
title: LLM agents
summary: >-
  LLM agents are software systems that give language models persistent goals,
  tool access, and decision loops; the field is rapidly converging on the view
  that architecture and environment design matter far more than prompt quality.
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
compiled_at: '2026-09-14T21:37:40.848Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1590
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
  cost_usd: 0.05082
---
An LLM agent pairs a language model with tools, memory, and a control loop that lets it take sequences of actions toward a goal rather than responding to a single prompt. The concept spans a wide range of implementations, from single-agent coding assistants to coordinated swarms, but a consistent theme across the literature is that reliability comes from structural constraints, not from better prompting.

The architecture question has evolved through several generations. [Meiklejohn's series](/reading/2026-05/2026-05-03t110011-getting-up-to-speed-on-multi-agent-systems-part-1-the) maps two waves of multi-agent research: 2023 coordination proofs-of-concept (CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen) that asked whether agents could coordinate at all, followed by 2025 empirical work measuring why they fail. The Wave 2 picture is sobering: [MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) report failure rates of 41-87% in production deployments, with inter-agent reasoning failures proving structurally harder to fix than surface-level prompt issues.

The reliability literature converges on the same prescription from different directions. A data engineering agent case study in Aiyan's post found that evolving through rigid state machines, orchestrators, and finally a general-purpose agent made clear that tool design, ID keys, and context visibility outperformed prompt engineering at every stage. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument directly: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints. [Anthropic's harness engineering post](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) shows the practical form this takes, using an initializer agent to scaffold a feature list and progress file that persists across context windows, so a second coding agent can make incremental progress without losing state.

Memory is a persistent design problem across agent systems. [Jakedismo's analysis](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) reframes it: the failure mode is storing bare assertions rather than beliefs with provenance, confidence, and revision history. The zerostack project takes a deliberately minimal approach, using [plain Markdown files and regex retrieval](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) rather than vector stores, justified by RAM constraints and provider neutrality. A [feature comparison across 74 memory systems](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) illustrates how contested the design space remains.

Verification and observability are distinct problems from reliability, though related. [Meiklejohn's verification patterns post](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that checking work in a different representation than it was produced, modality shift, is the key variable. [LangChain's post on observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone are insufficient; attaching feedback signals to traces is what turns monitoring into a learning loop across model, harness, and context layers.

The context-management problem has its own proposed architecture. [Recursive Language Models](/reading/2026-06/2026-06-04t194033-the-potential-of-rlms) address context rot by keeping data in a REPL environment and letting the model selectively pull it into token space, with emergent traces that can be mined to design optimized lower-latency agents. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) replaces vector similarity with LLM reasoning over hierarchical tree indexes, achieving 98.7% accuracy on FinanceBench without embeddings.

Security is a recurring concern as agents acquire more autonomy and credential access. [Simon Willison's account of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents an agent autonomously inventing elaborate browser automation techniques for a trivial CSS fix, then warns that the same resourcefulness makes unsandboxed agents dangerous. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses credential exposure by injecting API tokens locally so agents can authenticate without seeing raw secrets. A critique of OpenCode notes [security vulnerabilities and reckless default posture](/reading/2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades) in connecting remote LLMs to a local shell.

The human oversight question runs through the practitioner literature. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) trades throughput for learning, keeping humans involved at every step to preserve genuine understanding of the produced code. [Ronacher's "Coming Loop"](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies, producing defensive and opaque code that increasingly requires machine participation to maintain. Against that, [Mollick's hands-on report with Claude 5 Fable](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) documents multi-hour autonomous workflows that genuinely deliver complex software, noting only that the human role has shifted from doing to commissioning. The gap between these accounts is not contradiction; it reflects agents performing well on bounded tasks while the long-run effects on engineering craft remain genuinely open.
