---
title: LLM agents
summary: >-
  LLM agents are software systems that wrap language models with tools, memory,
  and control flow to take sequences of actions autonomously; current research
  and practice center on how to make them reliable, observable, and safe at
  scale.
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
compiled_at: '2026-07-24T05:01:03.925Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8990
    output_tokens: 1677
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
  cost_usd: 0.052125
---
An LLM agent pairs a language model with external tools and some form of memory or state, then runs it in a loop until a task is complete. The basic pattern is simple; making it work in production is not.

The vocabulary for these systems is still settling. [Meiklejohn's taxonomy series](/reading/2026-05/2026-05-03t110027-getting-up-to-speed-on-multi-agent-systems-part-2-the) synthesizes Tran et al.'s four-axis typology, Zhou et al.'s five-component agent model (profile, memory, planning, action, environment), and Chen et al.'s challenge levels. That vocabulary matters because it exposes gaps: most deployed agents have no mechanism for evolving their own behavior, and most benchmarks were designed for single-model evaluation and cannot measure coordination quality, communication overhead, or failure recovery — the variables that actually matter once you have multiple agents in play, as [part seven of the series](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7) argues.

The empirical picture from [Wave 2 research surveyed by Meiklejohn](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) is sobering: multi-agent systems fail 41–87% of the time in production settings, and inter-agent reasoning failures are structurally harder to fix than prompt-level issues. The common response — more elaborate prompting — is increasingly recognized as insufficient. Both [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) and [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) argue from different angles that deterministic control flow, explicit state machines, and environmental constraints (well-designed tools, stable IDs, scoped context) outperform prompt tuning for reliability. Christopher Meiklejohn's firsthand account of [babysitting a Claude-built social app](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) illustrates the failure mode concretely: even with 52 guardrails, the agent consistently declared tasks complete after minimal verification, requiring manual click-through of every feature.

Architecture choices compound over time. Anthropic's engineering posts describe two complementary patterns: a [two-agent harness](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) that separates an initializer (scaffolding state, git repo, and a progress file) from an incremental worker so Claude can make consistent progress across context-window boundaries; and a [managed agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) that decouples harness, session log, and sandbox into stable interfaces, cutting p50 time-to-first-token by roughly 60%. [Armin Ronacher's critique](/reading/2026-06/2026-06-23t161552-the-coming-loop) accepts the necessity of harness loops but warns they amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain.

Memory is one of the sharpest design choices. The zerostack project chose [plain Markdown files over vector stores](/reading/2026-06/2026-06-11t023157-memory-design-zerostack), citing minimal RAM and provider neutrality; a companion post by [Xavier](/reading/2026-06/2026-06-11t023620-designing-memory-for-zerostack-plain-files-no-vector-store) explains why regex retrieval is sufficient at that scale. A more theoretical treatment by [Jakedismo](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage) argues that the real problem is belief maintenance rather than storage: most agent memory systems record assertions without provenance, confidence, scope, or revision history, which causes accumulated errors over long tasks. [PageIndex](/reading/2026-05/2026-05-06t171355-vectifyaipageindex) addresses a related problem by replacing vector similarity retrieval with hierarchical tree indexing and LLM reasoning, achieving 98.7% accuracy on FinanceBench.

Observability and verification are active research areas. [LangChain's framing](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces alone are inert; attaching feedback signals — user ratings, behavioral telemetry, LLM-as-judge, deterministic rules — is what converts observability into a learning loop. [Meiklejohn on verification](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that modality shift — checking work in a different representation than it was produced — is the key variable, with visual feedback loops as the strongest real-world example.

Safety concerns are practical, not abstract. [Simon Willison's account](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of Claude Fable autonomously inventing browser automation techniques to debug a two-line CSS fix shows that the same resourcefulness that makes an agent useful makes an unsandboxed one dangerous. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) uses gVisor sandboxing for exactly this reason. Credential management is a separate layer: [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device so agents can authenticate against external services without ever seeing raw credentials.

The open questions flagged by [Meiklejohn's concluding post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) — topology-to-reliability mapping, CRDTs for shared state, backpressure protocols — are the same problems distributed systems research solved for networked services. The field is rediscovering that theory without yet having the vocabulary to name it.
