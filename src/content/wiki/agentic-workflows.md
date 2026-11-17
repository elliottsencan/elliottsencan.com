---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-driven agents operating
  across context windows, tools, and sandboxes — a space where architecture,
  state management, reliability, and human oversight are all actively contested.
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
  - 2026-08/2026-08-11t004752-danielmiesslerlifeos
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-11-17T01:35:19.572Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2243
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
  cost_usd: 0.077403
---
An agentic workflow is a software system that gives an LLM enough scaffolding — tools, state, control flow, and sometimes sub-agents — to pursue a goal across many steps without a human directing each one. The pattern has moved from research curiosity to production infrastructure fast enough that the engineering community is still working out what actually makes these systems reliable.

The most consistent finding across sources is that prompting alone does not produce reliable agents. [Aiyan's account of a data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows this directly: after iterating through a rigid state machine, then an orchestrator, then a single general-purpose agent, the team concluded that environmental constraints — tool design, ID keys, context visibility — do more work than prompt engineering. [Brian Suh makes the same argument structurally](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): reliable agents need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains.

State management is the second major fault line. [The 12-factor agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) argues for unifying execution state and business state into a single context-window-derived thread, making the system trivially serializable, debuggable, and recoverable. Anthropic's own engineering posts describe two complementary approaches: a [two-agent harness for long-running tasks](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) — an initializer plus an incremental coding agent — that preserves progress across context window boundaries, and a [Managed Agents service](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) that separates the harness, session log, and sandbox into stable, swappable interfaces, cutting p50 time-to-first-token by roughly 60%. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five subsystems — instructions, state, verification, scope, and session lifecycle — as the structural units that convert unreliable model output into dependable results.

Memory and context persistence get their own tooling. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists coding session context across sessions via a `.story/` directory. [Vectorize-io's hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) builds biomimetic memory structures — world facts, experiences, mental models — so agents accumulate knowledge over time rather than starting fresh each run. [Zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) takes the opposite infrastructure stance: plain Markdown files on disk, no vector stores, auto-injected as XML context blocks.

Observability and feedback close the loop. [LangChain's Harrison Chase argues](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) that traces alone do not improve agentic systems; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns monitoring into learning. [Imbue's Vet tool](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch mistakes that standard code review misses, and their [AI implementer-reviewer-fixer research](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) finds that weaker fixer agents overreach beyond review scope, breaking correct code when given hard instructions.

Multi-agent architectures add coordination costs that are easy to underestimate. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) puts a number on it: multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2 to 6x compared to single-agent systems. Anthropic's Cloudflare collaboration on [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) shows where multi-agent genuinely earns its complexity — parallel hunters, adversarial validators, and cross-repo tracers dramatically improve vulnerability discovery over generic coding agents. [Zerostack's subagent design](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) finds a narrower win: read-only parallel child agents for codebase exploration, without letting them write, achieves a 25% gain in exploration time.

Sandboxing is non-negotiable once agents have write access. [Claude Code running outside a container](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) risks credential leaks and production data loss. [Simon Willison's documentation of Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) finding its own elaborate browser automation techniques to debug a two-line CSS fix illustrates why resourcefulness in an agent and lack of a sandbox is a dangerous combination.

The organizational dimension is as contested as the technical one. [The Typical Set argues](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that agents make code-writing cheap but amplify whatever alignment or misalignment an organization already has — the bottleneck was always shared context and specification clarity. [Lars Faye warns](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic coding workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) makes a complementary case for keeping humans involved at every planning and implementation step to preserve genuine ownership. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) acknowledges harness loops are becoming unavoidable but warns they amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. [Dex Horthy argues more bluntly](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) that fully automated software factories fail because LLMs cannot maintain codebase quality over time — a training-level problem no amount of harness engineering can fix.

Production deployments show what the architecture looks like at scale. [Anthropic's internal analytics stack](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with) automated 95% of business analytics queries at roughly 95% accuracy by routing Claude to canonical datasets through a semantic layer rather than letting it freely search the warehouse — though [a critique from Genloop](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got) notes that result depends on months of senior data engineering work most organizations cannot replicate. [OpenAI's internal data agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent) uses layered context — schema metadata, human annotations, code enrichment, institutional docs, and self-improving memory — to query 600 petabytes across 70,000 datasets in natural language.

The technical direction is toward more parallelism and tighter feedback. [Anthropic's dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) now let Claude write its own orchestration scripts to spin up hundreds of parallel subagents for tasks like codebase-wide migrations. [The harness-forge skill](/reading/2026-06/2026-06-14t091145-001tmfharness-forge) runs a propose-score-Pareto loop to optimize memory, retrieval, context construction, and prompt templates around a fixed model. The emerging consensus across all these sources is that the model itself is only one input; the harness, memory, state unification, feedback loops, and sandboxing around it determine whether an agentic workflow is useful or dangerous.
