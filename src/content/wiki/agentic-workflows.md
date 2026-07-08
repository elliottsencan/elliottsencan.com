---
title: Agentic workflows
summary: >-
  Agentic workflows are AI systems that autonomously plan, execute, and iterate
  across multi-step tasks — a paradigm where the engineering of harnesses, state
  management, and human oversight matters more than prompt quality.
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
compiled_at: '2026-07-08T00:08:06.056Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13725
    output_tokens: 2298
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
  cost_usd: 0.075645
---
Agentic workflows place an LLM at the center of an execution loop: the model receives a goal, selects tools or subagents, observes results, and continues until the task completes or fails. The sources collected here cover that loop from every angle — architecture, reliability, tooling, organizational consequence, and risk — and together they surface a consistent tension: autonomous capability and controllable behavior are harder to have simultaneously than early enthusiasm suggested.

The architectural baseline is well-established. Reliable agents need deterministic control flow encoded in software, not elaborate prompt chains [Agents Need Control Flow, Not More Prompts](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts). Environmental constraints — how tools are designed, how IDs are keyed, how context is scoped — outperform prompt engineering for producing consistent behavior [Don't Prompt Your Agent for Reliability — Engineer It](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it). The 12-factor-agents project codifies one such principle: unifying execution state and business state into a single context-window-derived thread eliminates a whole class of synchronization bugs while making the agent trivially serializable, debuggable, and resumable [humanlayer/12-factor-agents](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents).

For long-running tasks spanning multiple context windows, the harness becomes load-bearing infrastructure. Anthropic's initializer-plus-incremental-coder pattern scaffolds a feature list and progress file that survive context resets [Effective Harnesses for Long-Running Agents](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents). Their Managed Agents service goes further, separating the harness, session log, and sandbox into stable, swappable interfaces — cutting p50 time-to-first-token by roughly 60% and enabling multi-brain, multi-sandbox configurations [Scaling Managed Agents](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). At the extreme end, Claude Code's dynamic workflows can spin up hundreds of parallel subagents to handle codebase-wide migrations or security audits end-to-end [Introducing Dynamic Workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Zerostack's approach is deliberately minimal by contrast: read-only parallel child agents delegate multi-file exploration without bloating the main agent's context, gaining a 25% improvement in code exploration time [Subagents Design @ Zerostack](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack).

The question of how many agents to run in parallel has a less obvious answer than the tooling landscape implies. Stanford and Google/MIT research cited by AlphaSignal finds that multi-agent orchestration introduces a coordination tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x; single-agent systems should be the default [How to Choose Between Single- and Multi-Agent Solutions](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions). Memory is a related bottleneck: agents without persistent memory re-derive context on every session, degrading quality over time. Vectorize-io's Hindsight builds biomimetic memory structures — world facts, experiences, mental models — so agents compound knowledge across runs [vectorize-io/hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight). Storybloq addresses session continuity more simply with a .story/ directory of JSON files persisted across Claude Code sessions [Storybloq/storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq).

Observability closes the loop but only when paired with feedback signals. Traces alone do not improve agentic systems; attaching user ratings, behavioral signals, LLM-as-judge verdicts, and deterministic rules to those traces is what turns logging into a learning cycle [Agent Observability Needs Feedback to Power Learning](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning). Harness-forge operationalizes a related idea — running a propose-score-Pareto optimization loop over the scaffolding itself rather than the model [001TMF/harness-forge](/reading/2026-06/2026-06-14t091145-001tmfharness-forge).

Safety and sandboxing are not optional. Simon Willison documents Claude Fable autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and warns that the same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside Docker sandboxes or gVisor boundaries is the practical minimum [If You're Running Claude Code, PLEASE Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box). Verification tools like Vet read an agent's conversation history alongside its diff to catch silent regressions that standard code review misses [Vet: Catch your coding agent's mistakes](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes). MarkdownLM's Lun tool blocks non-compliant code at the Git layer before it merges, enforcing architectural rules agents cannot be trusted to self-apply [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm).

Two organizational critiques cut across the tooling optimism. Lars Faye argues that full agentic coding workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor lock-in — better to keep LLMs as secondary delegation tools while staying hands-on [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). The Typical Set frames it structurally: agents make code-writing cheap, but the real bottleneck has always been shared context, specification clarity, and management coherence — agents amplify whatever alignment or misalignment an organization already has [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Christopher Meiklejohn's account of babysitting an agent through two weeks of social-app development — manually clicking through every feature to find what broke despite 52 new guardrails — gives that critique a concrete face [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent).

Armin Ronacher names the deeper risk: harness loops are becoming unavoidable, but they amplify LLMs' worst tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain, with no clear path back to human legibility [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). Jane Street's response is to treat agentic coding as new justification for formal methods: if agents lower the cost of writing proofs, verification tools become cost-effective precisely when the scale of autonomous output makes tests insufficient [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

Production deployments — Anthropic's self-service analytics stack at 95% query automation [How Anthropic Enables Self-Service Data Analytics with Claude](/reading/2026-06/2026-06-04t195339-how-anthropic-enables-self-service-data-analytics-with), OpenAI's internal data agent querying 600+ petabytes across 70k datasets [Inside OpenAI's In-House Data Agent](/reading/2026-06/2026-06-04t194244-inside-openais-in-house-data-agent), Cloudflare's multi-agent security harness discovering vulnerabilities across 50+ repos [Project Glasswing](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) — all share a common precondition: months of data engineering, schema curation, and governance work before the agent is trusted with real queries. Genloop's critique of the Anthropic analytics stack is pointed: 95% accuracy depends on infrastructure investment most organizations cannot replicate [What Anthropic Got Right About Agentic Analytics](/reading/2026-06/2026-06-04t194416-what-anthropic-got-right-about-agentic-analytics-and-got). The technology is real; the deployment prerequisites are underreported.
