---
title: AI-assisted coding
summary: >-
  Using LLMs and agentic tools to generate, review, and orchestrate code,
  AI-assisted coding spans a spectrum from inline suggestions to fully
  autonomous multi-agent pipelines, each with distinct tradeoffs in quality,
  ownership, and safety.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-01t104137-harness-design-for-long-running-application-development
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-03t110355-babysitting-the-agent
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - 2026-05/2026-05-18t222802-raellioctowiz
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023435-subagents-design-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-17t075816-matt-palmer
  - >-
    2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup
  - 2026-06/2026-06-22t000701-the-idiot-index-for-code
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
  - 2026-06/2026-06-23t161552-the-coming-loop
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse
  - 2026-06/2026-06-23t232444-repowise-devrepowise
aliases:
  - ai-coding-assistants
compiled_at: '2026-07-01T00:33:36.478Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10442
    output_tokens: 1584
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
  cost_usd: 0.055086
---
AI-assisted coding covers a wide range of practices: autocomplete suggestions, chat-driven code generation, autonomous agents that run terminal commands, and orchestration systems that spawn hundreds of parallel subagents. The tooling has expanded rapidly. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers domain-specific expertise through MCP servers and markdown skill files, supporting Claude Code, Cursor, and Gemini CLI. [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts to run migrations or security audits across entire codebases in parallel. At the experimental end, [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) converts a single natural-language command into a full multi-agent pipeline with a virtual Board of Directors for architectural decisions.

The reliability of all this automation is contested. Christopher Meiklejohn's two-week build diary [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) finds that agents routinely declare tasks complete after minimal verification, forcing manual click-through of every feature. Anthropic's own engineers describe a GAN-inspired planner-generator-evaluator architecture in [Harness Design for Long-Running Application Development](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) that was built specifically to combat context anxiety and self-evaluation bias during multi-hour sessions. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes five harness subsystems — instructions, state, verification, scope, and session lifecycle — as the infrastructure required to turn model output into dependable results. Armin Ronacher [warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' tendency toward defensive, opaque code, risking codebases that require machine participation to maintain.

Code quality under agentic output is a persistent concern. [AI-generated frontend tests exhibit over 20 recurring smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) — over-mocking, happy-path-only coverage, tests written to match bugs rather than intent. An Imbue experiment [found](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) that weaker fixer agents in an implementer-reviewer-fixer pipeline overreach beyond review scope and break correct code. Daniel Stenberg's analysis of curl's vulnerability data [shows](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) no measurable sign that AI-assisted static analysis is driving open-source projects toward zero latent bugs. Yusuf Aytas [argues](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of writing code but not of owning it — taste and judgment still determine whether generated output is technical debt or genuine value.

Skill atrophy and the appropriate division of labor between human and model sit at the center of a live disagreement. Lars Faye [argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic workflows invert developer priorities toward speed over understanding and create vendor dependency. Val Town's Pete Millspaugh [proposes](/reading/2026-05/2026-05-19t193626-slow-mode) a Slow Mode that keeps the human involved at every step, trading short-term speed for genuine learning. Abednego Gomes [contends](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) that shipping unreviewed AI-generated code is categorically incompatible with safety-critical systems. Countering pure skepticism, [Jappie Software identifies](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) five structural barriers — weak type systems, organizational processes built for human-speed development, and lack of agent-management training — that explain why productivity gains fail to materialize without deliberate change.

Several structural practices emerge from the literature. Session context must be persisted: [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) stores session state in a .story/ directory; the [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping CLAUDE.md and architecture files causes each session to re-derive decisions from scratch. Sandboxing is non-negotiable: [cekrem makes the case](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) for always running Claude Code inside Docker, especially after a supply chain attack [used Claude Code and VS Code configs as persistence vectors](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Design also matters: [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both human and LLM consumers. At the organizational level, [The Typical Set observes](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that coding agents amplify existing alignment or misalignment — the bottleneck was never the code itself, but shared context and specification clarity.
