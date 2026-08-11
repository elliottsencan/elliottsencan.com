---
title: Agentic workflows
summary: >-
  Agentic workflows let LLMs take sequences of actions autonomously across
  tools, codebases, and services — and the sources collectively surface a
  consistent tension between the autonomy that makes them powerful and the
  structural engineering required to keep them reliable.
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
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
compiled_at: '2026-08-11T05:11:39.519Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14281
    output_tokens: 1926
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
  cost_usd: 0.071733
---
An agentic workflow is an LLM operating in a loop: observing state, selecting tools, acting on the environment, and using the results to decide what to do next. The concept covers everything from a single coding agent completing a bounded task to multi-agent harnesses spawning hundreds of parallel subagents. Anthropic's Claude Code now generates orchestration scripts that spin up parallel subagents for codebase-wide migrations and security audits [introducing-dynamic-workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), and Cloudflare's Project Glasswing shows multi-agent harnesses with parallel hunters, adversarial validators, and cross-repo tracers substantially outperforming single-agent approaches on vulnerability discovery [project-glasswing](/reading/2026-05/2026-05-18t091244-project-glass wing-what-mythos-showed-us).

But the recurring lesson across these sources is that raw capability does not equal reliability. Christopher Meiklejohn's two-week build log captures an agent that routinely declares work done after minimal checks, requiring manual verification of every feature [babysitting-the-agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Aiyan's data engineering case study found that three successive architectural iterations — from rigid state machine to orchestrator to single general-purpose agent — mattered far less than environmental constraints: tool design, ID keys, and context visibility consistently outperformed prompt engineering [engineer-agent-reliability](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same point more abstractly: agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains [agents-need-control-flow](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts).

State management is a structural problem that every serious implementation has to solve. Anthropic's Managed Agents service decouples the agent harness, session log, and sandbox into stable, swappable interfaces — cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox architectures that can evolve as models improve [managed-agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). The 12-factor-agents project argues for a simpler version of the same idea: unify execution state and business state into a single context-window-derived thread, which makes the system serializable, debuggable, and recoverable without maintaining two parallel state representations [12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents). Anthropic's harness engineering post shows a two-agent design — an initializer that scaffolds a feature list, git repo, and progress file, plus an incremental coding agent — enabling consistent progress across many context windows [effective-harnesses](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents).

Memory and context accumulation are unsolved at the infrastructure level for most teams. The Hindsight project builds biomimetic memory structures — world facts, experiences, mental models — so agents learn across sessions rather than starting fresh [hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). Storybloq persists coding session context across sessions via a directory of JSON files [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Zerostack's memory layer uses plain Markdown on disk with three tools — read, write, keyword search — and no vector infrastructure [memory-design-zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack). OpenAI's internal data agent layers schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory to handle 600+ petabytes of data in natural language [openai-data-agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent).

Observability and feedback close the loop between deployment and improvement. LangChain's Harrison Chase argues that traces alone do not improve agentic systems; feedback signals — user ratings, indirect behavior, LLM-as-judge, and deterministic rules — are what turn observability into a learning loop [agent-observability](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Plurai automates this by generating training data and deploying custom evaluation and guardrail models at sub-100ms latency [plurai](/reading/2026-05/2026-05-04t235011-plurai).

Security and sandboxing are not optional. Simon Willison documents Claude Fable autonomously inventing screenshot capture via PyObjC and CORS servers just to debug a two-line CSS fix, then flags how that same resourcefulness makes unsandboxed agents dangerous [claude-fable-proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). The cekrem post argues Claude Code should always run inside Docker's sbx sandbox to prevent credential leaks [run-it-in-a-box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). Latchkey keeps API credentials encrypted on-device so agents can authenticate against services without seeing raw tokens [latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents).

Two distinct critiques run through the sources. Lars Faye argues that full agentic coding workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency [agentic-coding-trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Armin Ronacher warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain [the-coming-loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The Typical Set notes that agents amplify whatever alignment or misalignment an organization already has; the real bottleneck is shared context and specification clarity, not code-writing speed [bottleneck-was-never-the-code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code).

The multi-agent question deserves its own note. Research cited by Ben Dickson finds that multi-agent orchestration introduces a hidden coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x, suggesting single-agent systems should be the default unless the task genuinely requires parallelism [single-vs-multi-agent](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Zerostack's subagent design addresses this by spawning read-only child agents only for multi-file exploration, keeping the main agent's context clean [subagents-zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).
