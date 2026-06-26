---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs execute multi-step tasks autonomously, but the
  sources collectively show that reliability depends on harness engineering,
  state management, and human oversight far more than on prompting or raw model
  capability.
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
  - 2026-06/2026-06-25t195020-strands-agents
compiled_at: '2026-06-26T02:52:00.518Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13555
    output_tokens: 1899
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
  cost_usd: 0.06915
---
An agentic workflow is an AI system where a language model takes sequences of actions, calls tools, and makes decisions across multiple steps to complete a task, rather than responding to a single prompt. The concept sounds simple; the engineering is not.

The clearest recurring finding across these sources is that prompt engineering is the wrong lever for reliability. A data engineering agent case study shows that architectural choices, including tool design, unique ID keys, and context visibility, outperform prompt refinement across rigid state machine, orchestrator, and single-agent configurations [Don't Prompt Your Agent for Reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same point from a software engineering angle: complex tasks need explicit state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains [Agents Need Control Flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The harness engineering framing treats the scaffolding around the model as the primary engineering surface, covering five subsystems: instructions, state, verification, scope, and session lifecycle [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

State management is where most agentic systems fail silently. The 12-factor-agents project argues for unifying execution state and business state into a single context-window-derived thread, making the whole history trivially serializable, debuggable, and recoverable [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's own multi-agent harness for long-running tasks uses an initializer agent that scaffolds a feature list, git repo, and progress file, then hands off to an incremental coding agent, so the system can make consistent progress across many context windows without losing state [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Claude Fable's dynamic workflows take this further, automatically writing orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and audits [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code).

Memory compounds the state problem. Most agents are stateless by default, treating each session as a blank slate. Storybloq addresses this with a .story/ directory of JSON files that persist context across sessions [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Vectorize-io's Hindsight goes further with biomimetic memory structures, world facts, experiences, and mental models, achieving strong results on the LongMemEval benchmark [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). Zerostack takes the opposite approach, implementing file-based memory in plain Markdown with no vector stores or embeddings [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack).

Observability without feedback is inert. LangChain's Harrison Chase argues that attaching feedback signals, user ratings, indirect behavior, LLM-as-judge, and deterministic rules, to traces is what turns observability into a learning loop across model, harness, and context layers [Agent Observability Needs Feedback](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Plurai automates the evaluation side, auto-generating training data and deploying custom guardrail models with sub-100ms latency [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

Multi-agent architectures introduce a coordination tax that single-agent systems avoid. Research cited by AlphaSignal finds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x compared to single-agent alternatives, suggesting single agents should be the default unless the task genuinely requires parallelism [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Cloudflare's Mythos deployment shows where parallel agents genuinely earn their cost: security vulnerability hunting, where parallel hunters, adversarial validators, and cross-repo tracers collectively find more than any single agent could [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us). Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands).

Sandboxing is not optional. Claude Fable's autonomous resourcefulness, inventing screenshot capture via PyObjC and CORS servers to debug a two-line CSS fix, illustrates exactly why unsandboxed agents are dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents in Docker containers [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) and credential injection layers that keep tokens encrypted on-device [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) are the practical controls.

The human oversight question remains genuinely open. Full agentic coding is criticized for accelerating skill atrophy and creating vendor dependency, with the argument that LLMs should remain secondary delegation tools [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). An honest practitioner account of building with Claude finds that agents routinely declare work done after minimal checks, requiring the human to manually verify every feature [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Val Town's Slow Mode proposal inverts the default by keeping the human involved at every planning and implementation step, trading throughput for genuine understanding [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). Armin Ronacher warns that outer harness loops amplify LLMs' worst tendencies, producing defensive, opaque code that may eventually require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The organizational reality is that coding agents make individual code-writing cheap while the actual bottleneck remains shared context, specification clarity, and management coherence [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code).
