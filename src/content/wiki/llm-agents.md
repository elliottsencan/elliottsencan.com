---
title: LLM agents
summary: >-
  LLM agents are language-model-driven systems that plan, use tools, and act
  across multi-step tasks; the field is rapidly discovering that reliability
  depends on architecture and environment far more than on prompt quality.
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
compiled_at: '2026-06-20T12:35:56.072Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8141
    output_tokens: 1556
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
  cost_usd: 0.047763
---
An LLM agent pairs a language model with tools, memory, and a control loop that lets it pursue goals across multiple steps without continuous human direction. The sources here span everything from single-agent coding assistants to multi-agent swarms and agentic analytics pipelines, but a consistent finding runs through them: prompt engineering is nearly irrelevant compared to architectural decisions about state, control flow, and feedback.

The architectural argument is clearest in two pieces. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces one data engineering agent through three designs — rigid state machine, orchestrator, then single general-purpose agent — and concludes that reliable behavior comes from environmental constraints: well-designed tools, stable ID keys, and controlled context visibility. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same point from a software-engineering angle: explicit state transitions and validation checkpoints outperform prompt chains that collapse under task complexity.

The multi-agent literature, surveyed in depth by Christopher Meiklejohn across eight posts, reinforces this. The 2023 wave of systems — CAMEL, Generative Agents, ChatDev, MetaGPT, AutoGen — [proved coordination was possible](/reading/2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1) but shipped without concurrency control or escalation paths. The 2025 wave measured the cost: [MAST, MAS-FIRE, and Silo-Bench](/reading/2026-05/2026-05-03t110046-getting-up-to-speed-on-multi-agent-systems-part-4-wave-2) found inter-agent reasoning failures occurring 41–87% of the time in production, and those failures are structurally harder to fix than single-agent prompt issues. [Benchmarks compound the problem](/reading/2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7): HumanEval and SWE-bench were designed for single agents and cannot measure coordination quality or failure recovery. The [open-questions post](/reading/2026-05/2026-05-03t110130-getting-up-to-speed-on-multi-agent-systems-part-8-open) argues the field is quietly rediscovering distributed systems — topology-to-reliability mappings, CRDTs for shared state, backpressure protocols — without the vocabulary to name it.

Verification gets its own treatment. [Meiklejohn's sixth installment](/reading/2026-05/2026-05-03t110102-getting-up-to-speed-on-multi-agent-systems-part-6) argues that checking work in a different representation than it was produced — modality shift — is the key variable. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) applies this in practice: parallel hunters, adversarial validators, and cross-repo tracers dramatically improved vulnerability discovery over generic coding agents. Anthropic's [reference harness for autonomous security work](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) operationalizes the same pattern with gVisor sandboxing.

Memory is equally contested. Approaches range from zerostack's [plain Markdown files with regex search](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) — justified by minimal RAM, no daemon requirement, and provider neutrality — to the [74-system comparison table](/reading/2026-06/2026-06-04t210834-ai-memory-systems-feature-comparison) that maps the full design space. A more fundamental critique: [agent memory is a belief-maintenance problem, not a storage problem](/reading/2026-06/2026-06-11t090709-agent-memory-is-a-belief-maintenance-problem-not-a-storage), and most systems fail because they store assertions without provenance, confidence scores, or revision history.

Observability closes the loop. [LangChain's post on agent observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) distinguishes traces from feedback: traces alone do not improve systems; attaching user ratings, behavioral signals, LLM-as-judge verdicts, and deterministic rules to traces is what turns monitoring into a learning loop. Anthropic's [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) takes the infrastructure side: separating the agent harness, session log, and sandbox into stable interfaces cut p50 time-to-first-token by roughly 60% and enables multi-brain, multi-sandbox architectures.

The human role is shifting in ways that are not uniformly positive. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents what current autonomy actually looks like in practice: an agent that declares work done after minimal checks, requiring a human to manually verify every feature despite 52 added guardrails. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) argues for trading short-term automation for genuine understanding, keeping the human involved at every step. Meanwhile, [Simon Willison's report on Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows the other end: an agent resourceful enough to invent elaborate browser automation to debug a two-line CSS fix — and dangerous if left unsandboxed. The capability gap between current systems and reliable autonomous operation remains wide, and the sources collectively suggest closing it requires distributed-systems thinking more than better prompting.
