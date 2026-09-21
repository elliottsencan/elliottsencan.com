---
title: Agentic workflows
summary: >-
  Systems where LLMs plan and execute multi-step tasks autonomously, raising
  hard problems in state management, harness design, reliability engineering,
  and human oversight that prompt engineering alone cannot solve.
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
compiled_at: '2026-09-21T21:43:16.183Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14586
    output_tokens: 1947
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
  cost_usd: 0.072963
---
An agentic workflow is one where an LLM drives a sequence of actions, tool calls, or sub-task delegations to complete a goal that no single inference could finish. The concept has matured from research curiosity to production infrastructure quickly enough that the engineering problems now dominate the conversation over the capability ones.

The most consistent finding across sources is that prompting is the wrong lever for reliability. [Aiyan's data engineering case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) traces three successive architectures, concluding that environmental constraints, explicit tool design, stable IDs, and context visibility outperform prompt refinement at every stage. [Brian Suh](/reading/2026-05/2026-05-07t193804-agents-need-control-flow-not-more-prompts) makes the same argument more bluntly: complex tasks need deterministic state transitions and validation checkpoints encoded in software, not increasingly elaborate prompt chains that collapse under complexity. The [12-factor-agents project](/reading/2026-05/2026-05-19t174452-humanlayer12-factor-agents) adds a structural corollary — unifying execution state and business state into a single context-window-derived thread simplifies serialization, recovery, and debugging, because execution state is mostly just metadata about what has already happened.

Harness architecture is where most of this engineering lives. Anthropic has published two complementary pieces on the subject: one describing a two-agent harness for long-running tasks (an initializer that scaffolds a feature list and progress file, plus an incremental coding agent) that maintains coherent progress across many context windows [without losing state](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents), and another describing their Managed Agents service, which separates the agent harness, session log, and sandbox into stable, swappable interfaces so the system can be upgraded as models improve [without breaking clients](/reading/2026-05/2026-05-19t221631-scaling-managed-agents-decoupling-the-brain-from-the-hands). A [learnable harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) names five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the structural units that convert unreliable model output into dependable results.

Memory and context persistence are recurrent pain points. Stateless agents re-derive decisions every session, and without some form of persistent context, architectural drift compounds. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses this with a `.story/` directory of JSON files that carry session context across runs. [Hindsight](/reading/2026-05/2026-05-03t173422-vectorize-iohindsight) goes further with biomimetic memory structures that let agents accumulate world facts and mental models over time. The [AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames persistent context as a foundational discipline: founders who skip architectural decision files hit a wall where every session re-derives foundational choices and the codebase loses coherence.

Multi-agent orchestration is often reached for too quickly. [Ben Dickson's synthesis of Stanford and Google/MIT research](/reading/2026-05/2026-05-03t115608-how-to-choose-between-single-and-multi-agent-solutions) finds that multi-agent coordination introduces a hidden tax that can amplify errors up to 17x and cut tool-handling efficiency by 2-6x — single-agent systems should be the default. [Cloudflare's Mythos deployment](/reading/2026-05/2026-05-18t091244-project-glasswing-what-mythos-showed-us) and [Anthropic's dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) show genuine value from parallel sub-agents in specific domains (vulnerability discovery, codebase-wide migrations), but these are purpose-built architectures, not general-purpose defaults.

Observability and feedback loops are infrastructure, not afterthoughts. [LangChain's Harrison Chase](/reading/2026-05/2026-05-10t140531-agent-observability-needs-feedback-to-power-learning) argues that traces without attached feedback signals — user ratings, indirect behavioral signals, LLM-as-judge, deterministic rules — cannot improve a system; the feedback attachment is what makes observability a learning loop. [Plurai](/reading/2026-05/2026-05-04t235011-plurai) automates evaluation and guardrail model generation for agents without labeled data pipelines.

Human oversight remains an open design question with no consensus answer. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude for two weeks documents the agent consistently declaring work done after minimal checks, requiring manual verification of every feature despite 52 added guardrails. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full autonomy accelerates skill atrophy and inverts developer priorities. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) suggests trading short-term speed for genuine learning by keeping the human involved at every planning step. Against this, [Ethan Mollick's report on Claude Fable 5](/reading/2026-06/2026-06-09t190614-what-it-feels-like-to-work-with-mythos) documents multi-hour autonomous workflows that complete complex software delivery, noting the human role has shifted from doing to commissioning rather than disappearing. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that outer harness loops amplify LLMs' worst code tendencies and risk producing codebases that require machine participation to maintain.

Sandboxing and credential management are non-optional in any production deployment. [Running Claude Code inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) prevents credential leaks and accidental data destruction while enabling full auto-approve within the container. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API credentials encrypted on-device so agents can authenticate against services without ever seeing raw tokens. [Simon Willison's documentation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) of an agent autonomously inventing elaborate browser automation for a two-line CSS fix illustrates why that resourcefulness makes unsandboxed agents genuinely dangerous.

The organizational dimension is underweighted in most technical discussions. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that coding agents make individual code-writing cheap but the real bottleneck was always shared context, specification clarity, and management coherence — and agents amplify whatever alignment or misalignment an organization already has. [Jappie Software](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) identifies five structural barriers to effective adoption, including weak type systems and org processes built for human-speed development, that prevent promised productivity gains from materializing.
