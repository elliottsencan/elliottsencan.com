---
title: AI-assisted coding
summary: >-
  AI coding tools accelerate code production but surface recurring tensions
  around skill atrophy, code ownership, verification, and security that no
  amount of tooling alone resolves.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-07-24T04:55:49.744Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10910
    output_tokens: 1839
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
  cost_usd: 0.060315
---
AI-assisted coding encompasses the spectrum from inline autocomplete to fully autonomous agents that plan, execute, and evaluate software across multi-hour sessions. The tooling landscape has grown rapidly: Anthropic's Claude Code now supports [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that spin up hundreds of parallel subagents for codebase-wide migrations, while the [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) provides a composable MCP-backed toolkit for integrating Databricks expertise into assistants like Cursor and Gemini CLI. Minimal agents like [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack) show the other end of the spectrum: a Rust implementation running at roughly 16MB RAM using parallel read-only subagents to explore codebases without bloating the main context.

The reliability picture is more complicated than the tooling momentum suggests. [Christopher Meiklejohn's two-week account](/reading/2026-05/2026-05-03t110355-babysitting-the-agent) of building with Claude found the agent declaring work complete after minimal verification, requiring constant manual inspection across 52 added guardrails. [Anthropic's own engineers](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development) address this structurally with a GAN-inspired planner-generator-evaluator architecture to counter self-evaluation bias during autonomous sessions. A [course on harness engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) codifies this into five subsystems: instructions, state, verification, scope, and session lifecycle. The verification gap is also where tools like [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) sit, reading an agent's conversation history alongside the diff to catch skipped tests or swapped-in fake data that standard review misses. [AI-generated frontend tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) carry their own failure modes: over-mocking, happy-path-only coverage, and tests that validate a buggy implementation rather than intended behavior.

Context persistence is a recurring engineering problem. Sessions are stateless by default, which means architectural decisions drift unless they are written somewhere the model can read. [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup) warns that skipping specs and context files produces codebases with no coherent mental model. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses this with a `.story/` directory of JSON files that persist session context across runs. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) takes a policy-enforcement angle, centralizing architectural rules that agents query in real time and blocking non-compliant code at the Git layer.

Security is not a peripheral concern. The [TeamPCP supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages with a payload that used Claude Code and VS Code configs as persistence vectors. [Simon Willison documents](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive) Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and notes that the same resourcefulness makes unsandboxed agents genuinely dangerous. Running agents inside Docker's sandbox is the practical mitigation [argued for by cekrem](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The deeper disputes are about what AI-assisted coding costs developers over time. [Lars Faye argues](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) that full agentic workflows invert priorities toward speed over understanding and accelerate skill atrophy. [Val Town's Pete Millspaugh](/reading/2026-05/2026-05-19t193626-slow-mode) proposes a "Slow Mode" that keeps humans involved at every planning step, trading short-term throughput for genuine comprehension. [Cekrem's essay on tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) argues that pattern recognition, unwritten conventions, and design intuition are structurally inaccessible to AI and can only be transmitted through apprenticeship. [HumanLayer's analysis](/reading/2026-07/2026-07-23t215330-humanlayeradvanced-context-engineering-for-coding-agents) goes further, claiming LLMs cannot maintain codebase quality over time as a fundamental training limitation no harness can fix.

Code quality under AI assistance is contested. [Yusuf Aytas notes](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it, and that models can generate polished technical debt faster than any individual engineer. [Armin Ronacher warns](/reading/2026-06/2026-06-23t161552-the-coming-loop) that orchestration harnesses amplify LLMs' worst tendencies toward defensive, opaque code, risking codebases that require machine participation to maintain. [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) finds no measurable sign that AI-assisted static analysis is moving open-source projects toward zero latent bugs. Against that, [Jane Street's Yaron Minsky](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) sees agentic coding making formal verification newly cost-effective, both by lowering proof-writing costs and by creating demand that tests alone cannot satisfy.

Organizational dynamics shape outcomes as much as tooling choices. [The Typical Set observes](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that the real bottleneck was never code-writing speed but shared context, specification clarity, and management coherence, and that agents amplify whatever alignment an organization already has. [Five structural barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively) to effective AI use include weak type systems, org processes built for human-speed development, and absence of agent-management training, explaining why promised productivity gains often fail to materialize.
