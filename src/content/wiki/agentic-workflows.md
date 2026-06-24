---
title: Agentic workflows
summary: >-
  Agentic workflows are systems where AI models take multi-step actions
  autonomously; the accumulated evidence across many sources points to
  architecture, state management, and human oversight as the decisive factors in
  whether they deliver or fail.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-27t114138-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - >-
    2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions
  - 2026-05/2026-05-03t173422-vectorize-iohindsight
  - 2026-05/2026-05-04t235011-plurai
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t171355-vectifyaipageindex
  - 2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts
  - >-
    2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-19t174452-humanlayer12-factor-agents
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - >-
    2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-04t194033-the-potential-of-rlms
  - 2026-06/2026-06-04t194244-inside-openais-in-house-data-agent
  - >-
    2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got
  - >-
    2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with
  - 2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos
  - 2026-06/2026-06-11t023157-memory-design-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-14t091145-001tmfharness-forge
  - 2026-06/2026-06-14t094245-agentswarms
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - >-
    2026-06/2026-06-20t053342-if-llms-have-human-like-attributes-then-so-does-age-of
  - 2026-06/2026-06-21t112220-agentic-engineering
  - >-
    2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
compiled_at: '2026-06-24T06:26:41.956Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13405
    output_tokens: 1932
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
  cost_usd: 0.069195
---
An agentic workflow is a system in which an AI model executes a sequence of actions, tool calls, or decisions with varying degrees of autonomy — ranging from a single agent in a loop to hierarchical multi-agent pipelines spanning many context windows. The core design questions cluster around reliability, state, architecture, and the appropriate scope of human involvement.

The reliability case against prompting and for engineering is well-established at this point. [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces a data engineering agent through three architectures and concludes that environmental constraints — tool design, ID keys, context visibility — outperform prompt engineering. [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) reaches the same conclusion from the opposite direction: explicit state transitions and validation checkpoints in software are more stable than elaborate prompt chains under task complexity. The [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) curriculum formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

State management surfaces as the most structurally important challenge. The [12-factor-agents Factor 5](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) recommendation is to unify execution state and business state into a single context-window-derived thread, making the full history serializable, debuggable, and recoverable. Anthropic's [Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) service approaches the same problem from the infrastructure side, separating the harness, session log, and sandbox into stable, swappable interfaces to cut time-to-first-token and enable multi-brain architectures. Their [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) post demonstrates a two-agent handoff where an initializer scaffolds a feature list and progress file before a coding agent begins work, preserving progress across context windows. Storybloq's [session-persistence approach](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) solves a related problem at smaller scale by writing session context to a `.story/` directory between sessions.

Memory beyond the context window is a distinct concern. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents compound knowledge over time rather than resetting. [Zerostack's memory design](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes the opposite approach: plain Markdown files on disk with no vector stores, auto-injected as XML context blocks. Both are reacting to the same gap; which architecture is appropriate depends on the task.

Multi-agent orchestration carries a coordination tax that is often underestimated. Research cited in [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) puts error amplification as high as 17x and tool-handling efficiency losses at 2 to 6x for multi-agent setups versus single-agent baselines. Single-agent systems should be the default, with multi-agent reserved for tasks that genuinely parallelize. Cloudflare's [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) demonstrates a case where multi-agent does earn its complexity: parallel hunters, adversarial validators, and cross-repo tracers together produce vulnerability discovery results that a single agent cannot match. [Anthropic's dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) go further, letting the model itself write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide tasks.

Observability and feedback close the loop. [LangChain's agent observability post](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces alone accomplish nothing — attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) is what converts observation into improvement across model, harness, and context layers. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) operationalizes this with auto-generated evaluation and guardrail models that do not require labeled data.

Human oversight remains genuinely contested. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents the practical cost: after 52 guardrails, an agent still declared work done after minimal checks, forcing manual verification of every feature. [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) frames full automation as accelerating skill atrophy and inverting developer priorities toward speed over understanding. [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes a principled alternative: a collaborative agent that never loops autonomously, trading throughput for genuine comprehension. Armin Ronacher's [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies toward defensive, opaque code and risk producing codebases that require machine participation to maintain.

Security and sandboxing are not optional. [Claude Code in Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) and the [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) both treat sandboxing as a baseline requirement, not an advanced configuration. Simon Willison's [Claude Fable observation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) that a capable agent's resourcefulness is exactly what makes it dangerous unsandboxed connects these engineering choices to a broader safety concern.

The organizational bottleneck argument from [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) reframes the entire conversation: agentic workflows make code generation cheap, but the real constraints are shared context, specification clarity, and management coherence. Agents amplify whatever alignment or misalignment an organization already has. Context compounding — through persistent files, canonical datasets, and semantic layers — is what separates stable agentic systems from ones that drift session by session, a point made independently by the [Anthropic analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) and the [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).
