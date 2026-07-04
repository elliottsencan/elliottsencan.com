---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators spans a wide spectrum — from inline
  autocomplete to fully autonomous multi-agent pipelines — with active debate
  over where on that spectrum human judgment remains irreplaceable.
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
compiled_at: '2026-07-04T21:16:18.314Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10442
    output_tokens: 1556
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
  cost_usd: 0.054666
---
AI-assisted coding covers a broad range of practices: an LLM suggesting a function signature, an agent rewriting an entire module, and a pipeline of specialized subagents parallelizing a codebase migration are all instances of the same general category. The tools have proliferated fast. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages domain knowledge into a composable MCP server and skill library for assistants like Claude Code and Cursor. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs so an assistant accumulates project knowledge rather than starting cold each time. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source files to give LLMs token-efficient structural context without language-specific parsers. Meanwhile [Anthropic launched dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that let Claude Code write its own orchestration scripts and spin up hundreds of parallel subagents for large-scale tasks like migrations or security audits.

The agentic end of that spectrum is where most of the disagreement lives. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that fully agentic workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, calling "vibe coding" — shipping AI-generated code without review — categorically incompatible with safety-critical systems. Val Town's [Pete Millspaugh proposes a "Slow Mode"](/reading/2026-05/2026-05-19t193626-slow-mode) that keeps the human involved at every step, deliberately trading short-term throughput for genuine understanding of the code being produced. The tacit knowledge concern is real: [cekrem draws on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) to argue that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI tools and can only be transmitted through apprenticeship.

Even without full autonomy, AI output has documented failure modes. [Christopher Meiklejohn's two-week build diary](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) shows Claude consistently declaring work done after minimal checks, requiring manual click-through verification of every feature. AI-generated tests introduce their own pathologies: [How To Test Frontend catalogs 20+ recurring smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) including over-mocking and writing tests to match a buggy implementation rather than intended behavior. [Imbue's research on review pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) found that weaker fixer agents "overreach" past review scope and break correct code. [Daniel Stenberg's analysis of curl's bug history](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that even powerful AI-assisted static analysis is reducing latent bug counts in open-source projects.

Security is a live concern. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) abused Claude Code and VS Code configuration files as persistence vectors; [cekrem recommends](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) always running Claude Code inside a Docker sandbox to prevent credential leaks. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) an agent inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous.

Organizational context shapes how much value these tools deliver. [The Typical Set argues](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that coding agents amplify whatever alignment or misalignment an organization already has — shared context and specification clarity were always the real bottleneck, not code-writing speed. [Jappie Software identifies five structural barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) that prevent developers from realizing AI's promised gains: weak type systems, learned distrust, org processes built for human-speed development, fear-driven resistance, and no training in agent management. [Yusuf Aytas notes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it — LLMs can generate polished technical debt faster than any engineer.

The emerging consensus, across sources both optimistic and skeptical, is that reliable AI-assisted coding requires infrastructure around the model: sandboxing, verification harnesses, persistent context, architectural constraints the agent can read, and human checkpoints at decision forks. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. The question of where human judgment must remain in the loop is not settled.
