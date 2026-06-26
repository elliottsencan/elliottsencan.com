---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators spans a spectrum from inline suggestions to
  fully autonomous multi-agent pipelines, with active debate over reliability,
  skill preservation, architecture, security, and what bottlenecks actually get
  solved.
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
compiled_at: '2026-06-26T02:53:15.958Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10442
    output_tokens: 1776
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
  cost_usd: 0.057966
---
AI-assisted coding covers a wide range of practices: an LLM completing a line, a chat interface iterating on a function, an autonomous agent running multi-hour sessions against a codebase, and orchestration layers spawning hundreds of parallel subagents. Each point on that spectrum carries different tradeoffs.

On the tooling side, the ecosystem has grown fast. [Databricks Solutions' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages domain expertise as composable MCP servers and skill libraries that multiple assistants can consume. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses the stateless problem by persisting session context across runs in a `.story/` directory, so each session compounds rather than restarts. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code as a signal, giving LLMs multi-resolution structural views without language-specific parsers. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) takes a minimalist approach, implementing a Rust-based coding agent with ~16MB RAM versus ~300MB for JS alternatives, with read-only parallel subagents that handle codebase exploration without bloating the main context.

At the agentic end, Anthropic's [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts and spin up hundreds of parallel subagents for codebase-wide migrations. Anthropic's own [harness design research](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture for multi-hour autonomous sessions. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) routes a single natural-language command into a full multi-agent pipeline including a virtual board of directors for architectural decisions.

Reliability is a persistent problem. [Christopher Meiklejohn's two-week account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) describes an agent that consistently declares work done after minimal verification, requiring manual testing of every feature despite 52 added guardrails. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) addresses this by reading an agent's conversation history alongside diffs to catch mistakes standard review misses. An [Imbue experiment](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse) on AI implementer-reviewer-fixer pipelines found weaker fixer agents break correct code by overreaching beyond review scope. AI-generated tests carry their own failure modes: [documented patterns](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) include over-mocking, testing only happy paths, and writing tests that match a buggy implementation rather than intended behavior.

Architecture matters for how well LLMs perform. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that agents query in real time, with its Lun tool blocking non-compliant code at the Git layer. The [founders playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping specs and context files causes each session to re-derive decisions from scratch, producing drift that compounds across the codebase.

Security risks scale with autonomy. A [supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) abused Claude Code and VS Code configs as persistence vectors. [Running Claude Code unsandboxed](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) risks credential leaks and production data destruction; Docker containers provide a boundary that still permits full auto-approve workflows inside. [Simon Willison's Claude Fable documentation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) shows how the same resourcefulness that makes agents useful makes unsandboxed ones dangerous.

The deepest disagreements concern what AI assistance actually changes. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls shipping unreviewed AI-generated code categorically incompatible with safety-critical systems. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) argues for keeping the human involved at every step to preserve genuine understanding. Tacit knowledge compounds this: [the tacit dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that pattern recognition and design intuition are structurally inaccessible to AI and can only transfer through apprenticeship.

[The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the organizational point plainly: code-writing was never the bottleneck; shared context, specification clarity, and management coherence were, and agents amplify whatever alignment or misalignment an organization already has. [Armin Ronacher](/reading/2026-06/2026-06-23t161552-the-coming-loop) warns that harness loops amplify LLMs' worst tendencies and risk producing codebases that require machine participation to maintain. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it concisely: AI lowers the cost of producing code but not the cost of owning it.
