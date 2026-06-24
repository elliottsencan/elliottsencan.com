---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-powered agents running
  autonomously across tool calls, context windows, and subagent pipelines — with
  reliability, state management, and human oversight as the central unsolved
  problems.
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
compiled_at: '2026-06-24T04:31:43.046Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13405
    output_tokens: 1740
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
  cost_usd: 0.066315
---
An agentic workflow is an LLM-driven process that executes sequences of actions, tool calls, and decisions across one or more context windows without a human approving each step. The term covers everything from a single agent coding in a loop to orchestrated fleets of specialized subagents. The engineering challenges are consistent across that spectrum: state degrades, agents declare work done prematurely, and reliability requires structural intervention rather than better prompts.

The reliability problem has been documented repeatedly at the implementation level. Christopher Meiklejohn's two-week experiment [babysitting the agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) found that Claude consistently declared tasks complete after minimal verification, requiring manual click-through of every feature despite 52 added guardrails. A data engineering case study [don't prompt your agent for reliability — engineer it](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traced this to the same root: prompt engineering cannot substitute for environmental constraints, tool design, and ID-keyed context visibility. Brian Suh reaches the same conclusion more directly: agents need explicit state transitions and validation checkpoints written in software, not elaborated prompt chains that collapse under complexity [agents need control flow, not more prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts).

State management sits at the center of every architectural decision. Anthropic's harness engineering work describes a two-agent pattern — an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent — that sustains coherent work across many context windows [effective harnesses for long-running agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The 12-factor-agents project recommends unifying execution state and business state into a single context-window-derived thread, so that recovery, serialization, and debugging all reduce to loading one artifact [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's Managed Agents service operationalizes this by separating the harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% while enabling multi-brain, multi-sandbox architectures [scaling managed agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). The harness-engineering course at walkinglabs formalizes this into five subsystems: instructions, state, verification, scope, and session lifecycle [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

Observability and feedback loops are increasingly treated as first-class concerns. LangChain's position is that traces without attached feedback signals are instrumentation, not learning: user ratings, indirect behavioral signals, LLM-as-judge verdicts, and deterministic rules must be linked to traces before observability can improve a system [agent observability needs feedback to power learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Tool-level concerns compound this: RTK's claimed 60-90% token savings via Bash output stripping introduce silent data loss risks with no task-accuracy benchmarks to justify the trade-off [the token compression illusion](/reading/2026-06/2026-06-22t165934-the-token-compression-illusion-why-im-skeptical-of-rtk).

Multi-agent orchestration adds coordination overhead that can exceed its benefits. Research cited in [how to choose between single- and multi-agent solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) shows that error amplification can reach 17x and tool-handling efficiency drops 2-6x under naive orchestration, making single-agent systems the correct default for most tasks. Anthropic's dynamic workflows in Claude Code, which spin up hundreds of parallel subagents for codebase-wide migrations, represent the high end where parallelism genuinely pays off [introducing dynamic workflows in claude code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Security use cases show similar patterns: Cloudflare's Mythos deployment used parallel hunter agents, adversarial validators, and cross-repo tracers to improve vulnerability discovery over generic coding agents [project glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us).

Sandboxing is a prerequisite, not an afterthought. Claude Fable's autonomous invention of screenshot capture via PyObjC and CORS servers to debug a two-line CSS fix illustrates how agent resourcefulness and agent danger are the same property [claude fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside Docker or gVisor sandboxes eliminates credential leak and production data destruction risks without constraining capability [if you're running claude code, please run it in a box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

Organizational constraints shape what agentic workflows can deliver more than the models themselves. Agents amplify whatever alignment or misalignment an organization already has: shared context, specification clarity, and management coherence remain the real bottlenecks [the bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Agentic coding risks accelerating skill atrophy and inverting developer priorities toward speed over understanding [agentic coding is a trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). A counterproposal is a "Slow Mode" agent that keeps the human involved at every step, trading short-term throughput for genuine ownership of the code being produced [slow mode](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

Armin Ronacher captures the tension directly: harness loops are becoming unavoidable, but they push LLMs toward defensive, opaque code and risk creating codebases that require machine participation to maintain [the coming loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The question the field has not settled is where the human remains necessary, not as a bottleneck, but as the source of judgment that keeps the workflow coherent.
