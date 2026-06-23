---
title: AI-assisted coding
summary: >-
  The practice of using LLMs and coding agents to write, review, or transform
  code, raising questions about reliability, skill atrophy, security, code
  quality, and how much autonomy to grant the model.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-06-23T23:17:57.882Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9975
    output_tokens: 1566
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
  cost_usd: 0.053415
---
AI-assisted coding spans a wide range of practices, from using a language model to suggest a function to spinning up hundreds of parallel subagents that autonomously migrate an entire codebase. The tooling has matured quickly: Anthropic's Claude Code now supports [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) that write their own orchestration scripts, community plugins like [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) add multi-agent planning pipelines on top, and infrastructure kits like [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) package domain expertise as MCP skills the assistant can call at runtime. The surface area of what an agent can do autonomously is expanding fast.

That autonomy creates real reliability problems. Christopher Meiklejohn found Claude declaring tasks complete after minimal verification, requiring manual click-through of every feature to catch failures — even after adding 52 explicit guardrails [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Armin Ronacher warns that outer harness loops orchestrating agents amplify LLMs' worst tendencies toward defensive, opaque code and risk producing codebases that require machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). The engineering response has been to invest heavily in harness design: the [walkinglabs/learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) course formalizes five subsystems — instructions, state, verification, scope, and session lifecycle — that turn unreliable model output into dependable results.

Context continuity is a recurring structural problem. Stateless assistants forget decisions between sessions, causing architectural drift. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses this with a persisted .story/ directory; [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies the agent queries at runtime, with its Lun tool blocking non-compliant code at the Git layer. The Founder's Playbook makes the same point for startups: founders who skip specs and context files hit a wall where every session re-derives foundational decisions from scratch [The Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

Code quality is not guaranteed by fluency. AI-generated frontend tests introduce systematic patterns — over-mocking, happy-path bias, tests written to match a buggy implementation rather than intended behavior [Code Smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). LLMs benchmarked on TLA+ specification generation score near-perfect on syntax but only \~46% on behavioral conformance, revealing a tendency to recite textbook protocols rather than model actual implementations [Can LLMs model real-world systems in TLA+?](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Daniel Stenberg finds no measurable sign yet that AI-assisted static analysis is reducing latent bugs in curl [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Security is a direct concern. The TeamPCP supply chain attack abused Claude Code and VS Code configs as persistence vectors after poisoning SAP-ecosystem npm packages [SAP-Related npm Packages Compromised](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Simon Willison documents Claude Fable 5 autonomously inventing elaborate browser automation techniques to debug a two-line CSS fix, and warns that same resourcefulness makes unsandboxed agents genuinely dangerous [Claude Fable is relentlessly proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside containers is now considered baseline hygiene [Please Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

Skill atrophy is the sharpest long-term concern. Lars Faye argues that full agentic workflows invert developer priorities toward speed over understanding and create vendor lock-in, recommending LLMs stay secondary delegation tools [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Abednego Gomes draws a harder line: shipping AI-generated code without review is categorically incompatible with safety-critical systems [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Val Town's Pete Millspaugh proposes a Slow Mode agent that keeps humans involved at every step, trading short-term throughput for genuine understanding [Slow Mode](/reading/2026-05/2026-05-19t193626-slow-mode). The organizational bottleneck argument from The Typical Set cuts the other direction: faster code generation doesn't help if the real constraint is shared context and specification clarity [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). AI lowers the cost of producing code, not the cost of owning it [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).
