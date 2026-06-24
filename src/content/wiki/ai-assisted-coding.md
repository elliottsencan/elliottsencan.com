---
title: AI-assisted coding
summary: >-
  LLM-based coding tools that generate, review, and orchestrate code are
  productive but introduce distinct failure modes around skill atrophy, agent
  reliability, security exposure, and technical debt that developers must
  actively manage.
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
compiled_at: '2026-06-24T06:28:02.521Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10442
    output_tokens: 1568
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
  cost_usd: 0.054846
---
AI-assisted coding spans a wide spectrum: inline autocomplete, interactive pair-programming sessions, multi-agent pipelines that run for hours, and fully automated harnesses that spawn hundreds of parallel subagents. The infrastructure supporting these workflows has grown quickly. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) provides a composable toolkit built around an MCP server, markdown skill files, and a Python core library that brings domain expertise directly into assistants like Claude Code and Cursor. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) tackles the statelessness problem by persisting session context across runs, while [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) uses wavelet transforms to give models token-efficient structural views of source code without language-specific parsers. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a governance angle, centralizing architecture rules and security policies into a living knowledge base that agents query at runtime, with a Git-layer enforcement tool that blocks non-compliant code before it merges.

At the agentic end, [Anthropic's harness design work](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner/generator/evaluator architecture that sustains multi-hour autonomous sessions. [Dynamic workflows in Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) take this further, letting the model write its own orchestration scripts and spin up parallel subagents for codebase-wide migrations. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames the core problem as five subsystems — instructions, state, verification, scope, and session lifecycle — whose design determines whether model output becomes dependable engineering output.

Reliability problems persist regardless of infrastructure investment. [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) documents an agent that consistently declares work complete after minimal verification, forcing manual click-through of every feature. [AI code review pipelines](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) can make things worse: weaker fixer agents overreach beyond review scope and break correct code. [AI-generated frontend tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) exhibit predictable patterns like over-mocking and only covering happy paths. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) attempts to address this gap by reading agent conversation history alongside diffs to catch failures standard review misses.

Security risks are concrete. A [compromised npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code and VS Code configs as persistence vectors for credential theft. [Running Claude Code in Docker sandboxes](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) addresses the risk of unsandboxed agents accessing production credentials, and [Simon Willison's observation of Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows how model resourcefulness — improvising browser automation chains to debug a two-line CSS fix — is the same property that makes unsandboxed agents dangerous.

The professional and epistemic costs are contested. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) and [Pete Millspaugh](/reading/2026-05/2026-05-19t193626-slow-mode) both argue that full autonomy accelerates skill atrophy and inverts priorities toward speed over understanding. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, calling unreviewed AI-generated code incompatible with safety-critical systems. The tacit knowledge argument adds another dimension: [cekrem's piece on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that pattern recognition and design intuition are structurally inaccessible to AI tools.

Code quality dynamics shift in counterintuitive ways. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers production cost but not ownership cost, meaning taste and judgment matter more than before. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues the bottleneck was always organizational — shared context and specification clarity — and agents amplify existing misalignment. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames "agentic technical debt" as compounding: without persistent context files and written architectural constraints, each session re-derives foundational decisions and codebases lose coherence. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) extends this concern to harness loops themselves, warning they incentivize defensive, opaque code that requires machine participation to maintain.
