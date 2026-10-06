---
title: Agentic workflows
summary: >-
  Agentic workflows are systems where LLMs autonomously plan, execute, and
  iterate across multi-step tasks — a rapidly maturing area where architecture,
  state management, and human oversight matter more than prompt quality.
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
compiled_at: '2026-10-05T23:44:46.194Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 2058
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
  cost_usd: 0.074628
---
An agentic workflow is one where an LLM takes a goal and pursues it across multiple steps, using tools, spawning subagents, managing state, and making decisions without a human approving each action. The space has matured enough that the central debates have shifted from "can agents do useful work" to "how do you build them so they don't silently fail."

The most consistent finding across sources is that **prompting is the wrong lever for reliability**. A data engineering agent built through three successive architectures — rigid state machine, orchestrator, then general-purpose agent — showed that environmental constraints outperform prompt engineering at every stage [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). Brian Suh makes the same point from a different angle: complex tasks need deterministic control flow encoded in software, explicit state transitions and validation checkpoints, not increasingly elaborate prompt chains that collapse under pressure [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). The humanlayer 12-factor-agents project adds a structural corollary: unifying execution state and business state into a single context-window-derived thread simplifies serialization, debugging, recovery, and observability — separate tracking of "current step" versus "what happened" creates complexity that rarely earns its cost [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

State persistence across sessions is a recurring problem. Stateless LLMs lose context between runs, and several projects have converged on file-based solutions. Storybloq persists session context in a `.story/` directory of JSON files [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq); zerostack uses plain Markdown on disk with auto-injected XML context blocks [Memory design @ zerostack](/reading/2026-06/2026-06-11t023157-memory-design-zerostack); Anthropic's own long-running agent harness uses an initializer agent that scaffolds a feature list, git repo, and progress file so an incremental coding agent can pick up where the previous context window ended [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). The vectorize-io/hindsight project goes further, building biomimetic memory structures — world facts, experiences, mental models — so agents improve over time rather than just resuming [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight).

Architecture choice shapes error rates significantly. Research cited by AlphaSignal finds that multi-agent orchestration can amplify errors up to 17x and cut tool-handling efficiency by 2-6x compared to single-agent baselines [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). That said, multi-agent harnesses are the right tool for specific workloads: Cloudflare's Mythos deployment uses parallel hunters, adversarial validators, and cross-repo tracers to dramatically improve vulnerability discovery [Project Glasswing: what Mythos showed us](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us), and Anthropic's Claude Code now writes orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Zerostack's read-only parallel child agents achieve a 25% gain in code exploration time by delegating multi-file codebase traversal without bloating the main agent's context [Subagents Design @ Zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

Observability and feedback loops are underbuilt in most deployments. LangChain's Harrison Chase argues that traces alone don't improve agentic systems — attaching feedback signals (user ratings, indirect behavior, LLM-as-judge, deterministic rules) to traces is what turns observability into a learning loop across model, harness, and context layers [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Christopher Meiklejohn's account of two weeks building with Claude illustrates the failure mode in practice: the agent consistently declares work done after minimal checks, forcing manual verification of every feature despite 52 added guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

Sandboxing is not optional. Simon Willison documents Claude Fable autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, then notes that same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). The case for running agents inside Docker is straightforward: credential leaks and accidental production data destruction are real risks in auto-approve mode [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). Imbue's Vet tool addresses a related gap: reading agent conversation history alongside the diff catches mistakes — silently skipped tests, fake data substitutions — that standard code review misses [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

The organizational dimension is underweighted in most technical discussions. Coding agents make individual code-writing cheap, but the real bottlenecks are shared context, specification clarity, and management coherence — agents amplify whatever alignment or misalignment an organization already has [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). The harness loop pattern that orchestrates agents is becoming unavoidable, but Armin Ronacher warns it amplifies LLMs' worst tendencies toward defensive, opaque code and risks creating codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). Lars Faye's concern is complementary: full agentic coding workflows accelerate skill atrophy and invert developer priorities toward speed over understanding [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). The walkinglabs harness engineering course frames the counter-position: reliable agentic output requires deliberate design of five harness subsystems — instructions, state, verification, scope, and session lifecycle [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering).

The practical consensus emerging is that "lights-off" software factories remain out of reach. Dex Horthy at HumanLayer argues this is a fundamental training problem that no harness engineering or loop-prompting can fix [humanlayer/advanced-context-engineering-for-coding-agents](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents). The more tractable path is human-in-the-loop at meaningful decision points, strong environmental constraints on tool design and context visibility, persistent state architecture, and feedback signals that close the learning loop rather than leaving each agent run as an isolated event.
