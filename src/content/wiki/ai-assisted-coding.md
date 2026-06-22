---
title: AI-assisted coding
summary: >-
  Using LLMs as coding tools, from inline autocomplete to fully autonomous
  agents, raising questions about developer skill, code quality, security,
  organizational alignment, and when automation helps versus harms.
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
compiled_at: '2026-06-22T02:32:47.486Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9412
    output_tokens: 1689
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
  cost_usd: 0.053571
---
AI-assisted coding covers a wide spectrum: inline suggestion tools, interactive chat-in-editor workflows, and fully autonomous agents that plan, execute, and evaluate code across multi-hour sessions. The infrastructure around these tools has grown rapidly. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) composes an MCP server, markdown skill files, and a Python core library to feed domain expertise into assistants like Claude Code and Cursor. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses session amnesia by persisting context across stateless sessions in a `.story/` directory. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code as a 1D signal to give LLMs token-efficient structural views without language-specific parsers.

At the agentic end, [Anthropic's GAN-inspired planner-generator-evaluator architecture](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) is designed for multi-hour autonomous sessions, separating the roles of planning, generation, and self-critique to avoid context anxiety and self-evaluation bias. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) extend this further, letting the model write its own orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks like codebase migrations. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) takes an opposing implementation philosophy: a Rust-based minimal agent using roughly 16MB of RAM versus 300MB for JS-based alternatives, with [read-only parallel child agents](/reading/2026-06/2026-06-11t023435-subagents-design-zerostack) delegated only for codebase exploration to avoid context bloat.

Several sources push back on the framing that more autonomy means more value. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues full agentic workflows invert developer priorities toward speed over understanding and create structural dependency on AI providers, recommending LLMs stay as secondary delegation tools. [Christopher Meiklejohn's account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building a social app with Claude describes agents declaring work done after minimal verification, requiring the developer to manually test every feature despite 52 added guardrails. [Val Town's "Slow Mode" proposal](/reading/2026-05/2026-05-19t193626-slow-mode) goes further, suggesting an agent mode that keeps the human involved at every planning step and teaches rather than just produces, trading short-term output for long-term ownership.

Code quality under AI assistance is contested. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it, and that LLMs can generate polished technical debt faster than any individual engineer. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) frames "vibe coding" as categorically incompatible with safety-critical systems. [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable reduction in latent bugs despite AI-assisted static analysis tools. The [SysMoBench study](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla) found LLMs achieve near-perfect syntax scores on TLA+ but only ~46% conformance to actual implementations, reciting textbook protocols rather than modeling real systems.

Architectural choices interact with AI capability. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues deep modules with small interfaces hiding large implementations reduce complexity for both humans and LLMs. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) makes the organizational case: coding agents make code cheap, but the real bottleneck is shared context, specification clarity, and management coherence. The [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) reinforces this, arguing that AI technical debt compounds across sessions when architectural decisions are not written somewhere the model can read.

Security is a material concern. The [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code and VS Code configs as persistence vectors. Simon Willison's documentation of [Claude Fable's autonomous improvisation](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) illustrates how agent resourcefulness and agent danger are the same property. [Running Claude Code inside Docker's sbx sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is recommended as a baseline safety measure even in auto-approve mode. The [walkinglabs harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes this thinking, identifying five subsystems, including verification and scope, as what separates unreliable model output from dependable engineering results.

Finally, the limits of what AI can absorb remain real. [Cekrem's essay on tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that the most valuable engineering expertise, including pattern recognition, unwritten conventions, and design intuition, is structurally inaccessible to AI tools and can only be transmitted through apprenticeship.
