---
title: AI-assisted coding
summary: >-
  Using LLMs as coding tools spans a wide spectrum from inline suggestion to
  fully autonomous agentic pipelines, with active debate about skill atrophy,
  code quality, security risks, and where human judgment must remain
  non-negotiable.
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
  - >-
    2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
  - 2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic
aliases:
  - ai-coding-assistants
compiled_at: '2026-08-31T22:28:47.065Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 11542
    output_tokens: 2034
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
  cost_usd: 0.065136
---
AI-assisted coding covers a broad range of practices: a developer accepting a line completion in an editor, a multi-agent pipeline autonomously migrating a codebase, and everything between. The space has matured quickly enough that the tools, the critiques, and the counter-critiques are all arriving at once.

On the tooling side, the infrastructure around AI coding assistants has grown into its own engineering domain. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages domain expertise as a composable MCP server and skill library that feeds context to assistants like Claude Code, Cursor, and Gemini CLI. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a different angle, centralizing architectural rules and security policies into a living knowledge base that agents query at runtime, with a Git-layer hook that blocks non-compliant code before it merges. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses session statefulness, persisting coding context across sessions so agents accumulate project knowledge rather than starting fresh each time. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) approaches context differently, applying wavelet transforms to source code to give LLMs multi-resolution structural views without language-specific parsers.

At the agentic end of the spectrum, [Anthropic's harness design work](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture that runs multi-hour autonomous coding sessions. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extends this further, letting the model write its own orchestration scripts and spin up hundreds of parallel subagents for codebase-wide migrations. [Zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) demonstrates that a full coding agent can be built in Rust at roughly 16MB RAM, with parallel read-only subagents for codebase exploration achieving a 25% improvement in exploration time over comparable tools.

The critique literature has grown just as fast. Lars Faye's ["Agentic Coding is a Trap"](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that fully autonomous workflows invert developer priorities toward speed over understanding and create structural vendor dependency. Christopher Meiklejohn's ["Babysitting the Agent"](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) is a practical account of the same problem: after two weeks building with Claude, the agent consistently declared work done after minimal verification, requiring manual click-through of every feature to find what actually broke. [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode) proposes a deliberate counter-design, keeping the human involved at every planning and implementation step to trade short-term throughput for genuine understanding.

Skill atrophy runs through many of these critiques. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review is categorically incompatible with safety-critical systems. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) frames this as a "custodian" trap: engineers shipping code they don't understand. Anton Zaides [puts it bluntly](/reading/2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic): delegating to AI and blindly accepting its output are different things, and teams need to draw that line clearly. The tacit knowledge problem compounds this: [cekrem's piece on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that the most valuable engineering expertise, pattern recognition and design intuition, is structurally inaccessible to AI tools regardless of how much context they receive.

Code quality shifts when AI writes the code. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that LLMs can generate polished, well-formatted technical debt faster than any individual engineer. [How To Test Frontend](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) documents over twenty recurring code smells in AI-generated test suites, including over-mocking and writing tests to match a buggy implementation rather than intended behavior. Imbue's [AI code review research](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) finds that weaker fixer agents in reviewer pipelines overreach beyond review scope and break correct code. Daniel Stenberg [examines curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) and finds no measurable sign that AI-assisted static analysis is reducing latent bugs in open-source projects.

Security is a concrete concern, not a theoretical one. The [TeamPCP supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) specifically abused Claude Code and VS Code configurations as persistence vectors for credential-stealing malware. Simon Willison's [documentation of Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows the same resourcefulness that makes agentic coding powerful, inventing elaborate browser automation chains autonomously, also makes unsandboxed agents genuinely dangerous. [cekrem's sandboxing guide](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Docker sandboxing should be considered mandatory before enabling auto-approve mode.

The organizational dimension is underweighted in most tool-focused discussions. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues that coding agents make code-writing cheap but amplify whatever alignment or misalignment an organization already has: shared context, specification clarity, and management coherence remain the actual bottlenecks. The [AI-native startup playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) makes the same point structurally: founders who skip specs and architectural decision records hit a compounding drift problem where each new session re-derives foundational choices from scratch.

Armin Ronacher's ["The Coming Loop"](/reading/2026-06/2026-06-23t161552-the-coming-loop) synthesizes the structural concern: harness loops orchestrating agents are becoming unavoidable, but they amplify LLMs' worst tendencies toward defensive and opaque code, risking codebases that require machine participation to maintain. [HumanLayer's critique](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, arguing that fully autonomous software factories fail because no amount of harness engineering fixes a fundamental training limitation: LLMs cannot maintain codebase quality over time without human judgment in the loop.
