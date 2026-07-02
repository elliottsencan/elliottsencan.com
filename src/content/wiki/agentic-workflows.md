---
title: Agentic workflows
summary: >-
  Agentic workflows delegate multi-step tasks to LLM-driven agents operating
  across tool calls, sandboxes, and context windows — a maturing practice whose
  reliability depends far more on harness engineering than on prompt quality.
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
compiled_at: '2026-07-02T12:22:48.911Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13725
    output_tokens: 1856
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
  cost_usd: 0.069015
---
The core promise of agentic workflows is simple: give a model tools, a goal, and enough context, then let it run. The practical reality is more constrained. Nearly every source in this collection converges on one finding: reliability comes from the environment around the model, not from the model itself.

The architectural debate starts with how many agents to use. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) shows that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x compared to single-agent baselines. Single agents should be the default; multi-agent only earns its cost for tasks that are genuinely parallelizable or too large for one context window. Anthropic's own Claude Code now automates that choice, [writing orchestration scripts that spin up hundreds of parallel subagents](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) for codebase-wide migrations and security audits. Cloudflare's Project Glasswing takes a more deliberate approach: [parallel hunters, adversarial validators, and cross-repo tracers in a structured harness](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) dramatically improve vulnerability discovery over generic coding agents.

The harness, not the prompt, is where reliability is built. [Aiyan's data engineering agent](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) evolved through three architectures before converging on the insight that environmental constraints — tool design, ID keys, context visibility — outperform elaborate prompts under complexity. [Brian Suh makes the same argument more directly](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts): deterministic control flow and explicit state transitions are what prevent complex tasks from collapsing, not increasingly sophisticated prompt chains. The 12-factor-agents project codifies this at the state layer, [arguing that execution state and business state should be unified into a single context-window-derived thread](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents), which simplifies serialization, debugging, and recovery. Anthropic's Managed Agents service formalizes this separation at the infrastructure level, [decoupling the agent harness, session log, and sandbox into stable, swappable interfaces](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands) that cut p50 time-to-first-token by roughly 60%.

Long-running agents face a specific challenge: they lose state across context windows. Several approaches address this. Anthropic's two-agent harness pattern — [an initializer that scaffolds a feature list and progress file, plus an incremental coding agent](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) — lets Claude make consistent progress across many context windows. Storybloq's approach is simpler: [a .story/ directory of JSON files persists session context](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) across stateless assistants. Zerostack goes further, [combining file-based Markdown memory with read-only parallel child agents](/reading/2026-06/2026-06-11t023157-memory-design-zerostack) for codebase exploration, avoiding context bloat while preserving cross-session continuity. The vectorize-io hindsight project attempts something more ambitious: [biomimetic memory structures — world facts, experiences, mental models](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) — so agents genuinely learn over time rather than just accumulating conversation history.

Observability and feedback are underbuilt in most agentic systems. [Harrison Chase's argument](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) is that traces alone accomplish nothing; attaching feedback signals — user ratings, indirect behavior, LLM-as-judge, deterministic rules — to those traces is what turns observability into a learning loop. Christopher Meiklejohn's honest account of building with Claude makes the failure mode concrete: [the agent consistently declared work done after minimal checks](/reading/2026-05/2026-05-03t110355-babysitting-the-agent), forcing manual verification of every feature despite 52 added guardrails. Imbue's Vet tool addresses this by [reading the agent's conversation history alongside the diff](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) to catch mistakes standard code review misses. Their separate research on AI implementer-reviewer-fixer pipelines found that [weaker fixer agents overreach beyond review scope, breaking correct code](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse), and that softer fixer instructions eliminate catastrophic regressions.

Sandboxing is a prerequisite, not an option. Simon Willison documents Claude Fable autonomously [inventing elaborate browser automation techniques to debug a two-line CSS fix](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive), then warns that the same resourcefulness makes unsandboxed agents genuinely dangerous. The practical recommendation is direct: [run Claude Code inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) to prevent credential leaks and production data destruction while still enabling auto-approve mode safely. Anthropic's defending-code reference harness goes further, [using gVisor sandboxing for an autonomous vulnerability discovery and remediation pipeline](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness).

The organizational dimension is consistently underestimated. [The Typical Set argues](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that coding agents make individual code-writing cheap but the real bottleneck was always shared context, specification clarity, and management coherence — agents amplify whatever alignment or misalignment already exists. Lars Faye's critique goes further: [full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap), creating vendor dependency while eroding the judgment that makes human oversight meaningful. Armin Ronacher warns that harness loops [risk creating codebases that require machine participation to maintain](/reading/2026-06/2026-06-23t161552-the-coming-loop), with LLMs' worst tendencies — defensive, opaque code — amplified at scale. These critiques share a concern: the shift from doing to commissioning changes what engineers know, and the long-term cost of that shift is not yet legible in productivity metrics.
