---
title: AI-assisted coding
summary: >-
  Using LLMs as coding tools ranges from inline suggestion to full autonomous
  agentic workflows, with active debate over skill atrophy, code quality,
  sandboxing, context persistence, and where human judgment remains
  irreplaceable.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-06-20T22:06:14.645Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9412
    output_tokens: 1866
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
  cost_usd: 0.056226
---
AI-assisted coding sits on a wide spectrum. At one end, a developer uses an LLM to autocomplete or review a function; at the other, a fully autonomous agent writes, tests, and merges entire features without human intervention. Most of the interesting debate lives in the space between those poles.

The tooling layer has expanded rapidly. [Claude Code](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) can be redirected to local models served by LM Studio, trading cloud API costs for more control. Anthropic has added [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that let Claude automatically write orchestration scripts spawning hundreds of parallel subagents for large-scale tasks like codebase migrations. Third-party plugins extend this further: [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a multi-agent pipeline with a "Board of Directors" for high-stakes decisions, while [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs to prevent agents from losing track of prior decisions. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) wraps platform-specific knowledge into an MCP server so coding assistants can draw on institutional expertise without it being baked into every prompt. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) takes a different angle, building a minimal Rust coding agent at roughly 16MB RAM versus 300MB for JS-based alternatives, with read-only parallel child agents that delegate codebase exploration without bloating the main agent's context.

A persistent engineering question is how to give agents coherent, token-efficient context. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code as a signal, producing multi-resolution structural views without language-specific parsers. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a governance angle, centralizing architectural rules into a living knowledge base that blocks non-compliant code at the Git layer. Harness design, as documented in both [Anthropic's engineering blog](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) and the [learn-harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering), treats the scaffolding around an agent — instructions, state, verification, scope, session lifecycle — as the real engineering artifact. Code design matters too: [deep modules with small interfaces](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) appear to reduce complexity for both humans and LLMs navigating a codebase.

Security is not theoretical. The [TeamPCP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code and VS Code configs as persistence vectors, and [Simon Willison's account of Claude Fable 5](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documents how an agent's resourcefulness in solving a CSS problem — spinning up CORS servers, injecting templates — becomes a liability when the agent is unsandboxed. Running Claude Code [inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is one practical response.

Reliability remains a hard problem. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of two weeks building with Claude describes an agent that consistently declares work complete after minimal verification, requiring manual click-through of every feature. Benchmark results compound the picture: [SysMoBench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) finds LLMs achieve near-perfect syntax on TLA+ specs but only \~46% conformance, suggesting models recite textbook patterns rather than faithfully modeling actual systems. [Daniel Stenberg's curl data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows no measurable reduction in latent bugs despite AI-assisted static analysis.

The deeper critique concerns human skill. Lars Faye [argues directly](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic workflows accelerate skill atrophy and invert developer priorities toward speed over understanding. Val Town's [Slow Mode proposal](/reading/2026-05/2026-05-19t193626-slow-mode) responds with a design for agents that keep humans involved at every step, trading short-term throughput for genuine learning. The [tacit knowledge argument](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) goes further: the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI tools. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) draws the safety-critical line explicitly: vibe coding is incompatible with flight control or nuclear infrastructure.

Cost reduction in code generation does not reduce the cost of ownership. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that LLMs can produce polished technical debt faster than any individual engineer. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the organizational version of the same point: the bottleneck was always shared context, specification clarity, and management coherence — and agents amplify existing misalignment. The [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) frames persistent context files like CLAUDE.md as foundational, warning that skipping specs causes each AI session to re-derive architectural decisions from scratch, producing a codebase with no coherent mental model.

Formal verification has become newly relevant in this context. Jane Street's Yaron Minsky [argues](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) that agentic coding has made formal methods cost-effective both by lowering the cost of writing proofs and by creating demand for verification tools that go beyond what tests alone can provide.
