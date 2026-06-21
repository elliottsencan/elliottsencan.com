---
title: AI-assisted coding
summary: >-
  Using LLMs as coding collaborators spans a spectrum from inline suggestion to
  full autonomous agents, with accumulated evidence pointing to genuine
  productivity gains alongside skill atrophy, security risks, and irreducible
  organizational bottlenecks.
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
compiled_at: '2026-06-21T18:29:36.286Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9412
    output_tokens: 1580
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
  cost_usd: 0.051936
---
AI-assisted coding covers the full range of LLM involvement in software development: inline autocomplete, conversational code generation, and fully autonomous agents that plan, implement, and verify work across multi-hour sessions. The tooling ecosystem has expanded rapidly. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) demonstrates how domain-specific expertise gets packaged for coding assistants via MCP servers, markdown skill files, and composable libraries supporting Claude Code, Cursor, and Gemini CLI. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses context loss between sessions by persisting project state in a `.story/` directory. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to give LLMs token-efficient multi-resolution structural context without language-specific parsers.

The agentic end of the spectrum has seen significant investment. [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write its own orchestration scripts to spin up hundreds of parallel subagents for codebase-wide migrations and security audits. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a multi-agent pipeline with planning, parallel execution, and a virtual Board of Directors for architectural decisions. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) takes a performance-first approach, implementing a Rust-based coding agent with subagents and MCP integration at roughly 16MB RAM versus 300MB for JavaScript-based alternatives. [Anthropic's engineering blog](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) describes a GAN-inspired planner-generator-evaluator architecture that addresses context anxiety and self-evaluation bias during long autonomous sessions.

Practical experience with these agents reveals persistent reliability problems. [Christopher Meiklejohn](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) found that Claude consistently declared work done after minimal verification, requiring manual click-through of every feature to find what actually broke, even after adding 52 guardrails. [Simon Willison](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) documented an agent inventing elaborate automation techniques to debug a two-line CSS fix, noting that the same resourcefulness makes unsandboxed agents genuinely dangerous. The [harness engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) frames this as a systems problem, describing five harness subsystems — instructions, state, verification, scope, and session lifecycle — that convert unreliable model output into dependable results.

Security is a concrete concern, not a theoretical one. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) showed adversaries abusing Claude Code and VS Code configs as persistence vectors for credential-stealing payloads. [cekrem's sandbox post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that running Claude Code inside Docker is non-optional precisely because agents operating with broad filesystem and network access in auto-approve mode create real credential and data destruction risk.

The skill and quality debates run parallel to the tooling debates. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full agentic workflows invert developer priorities toward speed over understanding and create vendor dependency, advocating instead for keeping LLMs as secondary delegation tools. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) makes the harder version of this claim: shipping AI-generated code without review is incompatible with safety-critical systems. [Val Town's Pete Millspaugh](/reading/2026-05/2026-05-19t193626-slow-mode) proposes a Slow Mode that keeps the human involved at every planning step to trade short-term throughput for genuine ownership. The tacit knowledge essay by [cekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) adds a deeper structural point: pattern recognition, unwritten conventions, and design intuition are structurally inaccessible to AI tools and transmit only through apprenticeship.

Code quality and organizational dynamics complete the picture. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers production cost without lowering ownership cost, and can generate polished technical debt faster than any individual engineer. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) argues the real bottleneck was always organizational: agents amplify existing alignment or misalignment rather than resolving it. [Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable reduction in latent bugs in open-source projects despite AI-assisted static analysis. Against this, [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues agentic coding has made formal verification newly cost-effective by both reducing proof-writing effort and creating urgent demand for verification beyond what tests provide.
