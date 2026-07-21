---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators spans a spectrum from inline suggestion to
  fully autonomous multi-agent pipelines, with active debate about reliability,
  skill atrophy, security exposure, and what human oversight must remain.
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
  - 2026-07/2026-07-07t170607-the-software-engineering-war
  - 2026-07/2026-07-20t215754-stop-using-opencode
aliases:
  - ai-coding-assistants
compiled_at: '2026-07-09T23:16:39.532Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10585
    output_tokens: 1838
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
  cost_usd: 0.059325
last_source_added: '2026-07-21T04:57:54.933Z'
---
AI-assisted coding sits on a spectrum. At one end, a developer asks a model to autocomplete a function or draft a test. At the other, a fully autonomous agent spins up hundreds of subagents, writes its own orchestration scripts, and runs for hours without human input. The tools, risks, and professional questions differ sharply depending on where on that spectrum a team is operating.

The tooling ecosystem has grown fast. Anthropic's Claude Code is a recurring center of gravity: databricks-solutions/ai-dev-kit brings Databricks expertise into Claude Code via an MCP server and markdown skills; [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across otherwise-stateless conversations; [raelli/octowiz](/reading/2026-05/2026-05-18t222802-raellioctowiz) routes workflows through purpose-built skill libraries; and [Ibrahim-3d/orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a multi-agent pipeline with a virtual Board of Directors for architectural decisions. Anthropic itself launched [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that let Claude write orchestration scripts to coordinate parallel subagents at scale. Meanwhile, [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) shows that a full coding agent can be built in Rust at roughly 16MB RAM, a fraction of JavaScript-based alternatives.

Context quality determines output quality. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a knowledge base agents query in real time, blocking non-compliant code at the Git layer. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses session amnesia directly. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code as a 1D signal, giving LLMs multi-resolution structural context without language-specific parsers. Anthropic's [harness design post](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that addresses context anxiety and self-evaluation bias in multi-hour sessions. The [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) curriculum formalizes this into five harness subsystems: instructions, state, verification, scope, and session lifecycle.

Reliability is the central unsolved problem. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of two weeks building with Claude is blunt: the agent declares work done after minimal checks, requiring manual click-through of every feature to find what actually broke, even after 52 new guardrails. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) is an open-source tool that reads the agent's conversation history alongside the diff to catch mistakes standard code review misses. [Imbue's experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents in an implementer-reviewer-fixer pipeline break correct code by overreaching beyond review scope. AI-generated frontend tests carry their own failure modes: [a catalog of code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents over 20 recurring patterns including over-mocking and testing buggy implementations rather than intended behavior.

Security exposure scales with autonomy. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code configuration files as persistence vectors. Simon Willison's [Claude Fable documentation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows the same resourcefulness that makes autonomous agents useful makes unsandboxed agents dangerous. [Running Claude Code in Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is the straightforward mitigation.

The professional debate is substantive. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that fully agentic workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency. [Val Town's Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) suggests agents that teach rather than replace, keeping the developer involved at every step. [The tacit knowledge problem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) is structural: the most valuable engineering expertise is transmitted through apprenticeship, not accessible to AI at all. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls shipping unreviewed AI-generated code in safety-critical systems reckless by definition.

Cost reduction in code generation does not reduce the cost of ownership. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs can produce polished technical debt faster than any human. [The Typical Set's bottleneck framing](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) is complementary: coding agents amplify whatever organizational alignment or misalignment already exists, because the real bottleneck was always shared context and specification clarity. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. Jane Street's [Yaron Minsky sees](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) a compensating dynamic: agentic coding makes formal verification newly cost-effective precisely because the stakes of unverified autonomous output are higher.
