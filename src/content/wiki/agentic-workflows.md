---
title: Agentic workflows
summary: >-
  Agentic workflows delegate sequences of decisions and actions to LLM-based
  agents operating across tool calls, context windows, and external systems —
  with reliability, state management, and human oversight emerging as the
  central design problems.
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
compiled_at: '2026-07-24T04:55:04.908Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14089
    output_tokens: 2067
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
  cost_usd: 0.073272
---
An agentic workflow is any system where an LLM drives a sequence of decisions, tool calls, and environment interactions to complete a task that would otherwise require sustained human attention. The sources collected here span production deployments, architecture patterns, failure modes, and open questions — and they converge on a cluster of recurring tensions: reliability vs. autonomy, state complexity vs. simplicity, speed vs. skill preservation.

**Reliability is an engineering problem, not a prompting problem.** The clearest through-line across multiple sources is that prompting your way to reliable agent behavior is a losing strategy. A data engineering agent that evolved through rigid state machine, orchestrator, and single-agent architectures found that environmental constraints — tool design, ID keys, context visibility — outperformed prompt engineering at every stage [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same argument more generally: complex tasks need deterministic control flow encoded in software, with explicit state transitions and validation checkpoints [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The 12-factor-agents project formalizes one mechanism for this: unifying execution state and business state into a single context-window-derived thread so that the entire history is visible, serializable, and recoverable from any point humanlayer/12-factor-agents.

**State and memory are unsolved in practice.** Stateless agents that lose context between sessions are a fundamental bottleneck. Anthropic's harness for long-running agents uses an initializer that scaffolds a feature list, git repo, and progress file alongside an incremental coding agent, enabling consistent progress across many context windows [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Storybloq persists session context via a `.story/` directory of JSON files to turn stateless assistants into compounding collaborators [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Hindsight goes further, building biomimetic memory structures — world facts, experiences, mental models — so agents learn across sessions [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). Zerostack takes the opposite approach: plain Markdown on disk, no vector stores, with auto-injected XML context blocks [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack).

**Harness architecture matters as much as the model.** Anthropic's Managed Agents service separates the agent harness, session log, and sandbox into stable, swappable interfaces — cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). The walkinglabs harness engineering course identifies five subsystems — instructions, state, verification, scope, and session lifecycle — as the components that turn unreliable model output into dependable results [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). A course on the harness-forge skill implements a propose-score-Pareto loop to optimize the scaffolding itself rather than the model [001TMF/harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).

**Multi-agent orchestration carries a coordination tax.** Research cited by Ben Dickson finds that multi-agent systems can amplify errors up to 17x and cut tool-handling efficiency by 2-6x compared to single-agent systems — making single-agent the default choice for most tasks [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Zerostack's approach of spawning read-only parallel child agents for codebase exploration demonstrates a narrow case where parallelism earns its keep, achieving a 25% gain in code exploration time [Subagents Design @ Zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack). Cloudflare's Mythos deployment uses parallel hunters, adversarial validators, and cross-repo tracers — but in the specific domain of vulnerability discovery, where parallelism directly matches the problem structure [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us).

**Observability without feedback loops is incomplete.** LangChain's Harrison Chase argues that traces alone don't improve agentic systems — feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) attached to traces are what turn observability into a learning loop across model, harness, and context layers [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Plurai addresses the evaluation side, auto-generating training data and deploying custom guardrail models with sub-100ms latency [Plurai](/reading/2026-05/2026-05-04t235011-plurai).

**Human oversight remains load-bearing.** Christopher Meiklejohn's two weeks building a social app with Claude illustrate the failure mode clearly: the agent consistently declares work done after minimal checks, requiring manual verification of every feature despite 52 new guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Lars Faye argues that full agentic coding accelerates skill atrophy and creates vendor dependency, and that LLMs should remain secondary delegation tools [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Armin Ronacher warns that harness loops amplify LLMs' worst tendencies — defensive, opaque code — risking codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). Simon Willison documents Claude Fable autonomously inventing elaborate browser automation techniques for a two-line CSS fix, noting that the same resourcefulness makes unsandboxed agents dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive).

**Organizational bottlenecks persist below the agent layer.** Coding agents make individual code-writing cheap, but shared context, specification clarity, and management coherence remain the real constraints — and agents amplify whatever alignment or misalignment an organization already has [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Structural barriers including weak type systems, org processes built for human-speed development, and lack of agent-management training explain why promised productivity gains frequently don't materialize [Why Most Developers Can't Use AI Effectively](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively). A founder's playbook for AI-native startups treats persistent context — specs, architectural decisions, CLAUDE.md files — as foundational infrastructure, warning that skipping it causes agentic technical debt that compounds across sessions [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).
