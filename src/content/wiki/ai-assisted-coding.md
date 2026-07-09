---
title: AI-assisted coding
summary: >-
  Using LLMs and agentic tools to write, review, and maintain code, where the
  productivity gains are real but contingent on architectural discipline, human
  oversight, security hygiene, and organizational alignment.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-07-09T14:07:43.991Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10585
    output_tokens: 1654
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
  cost_usd: 0.056565
---
AI-assisted coding spans a wide spectrum: from inline autocomplete to fully autonomous agents that plan, implement, and self-evaluate across multi-hour sessions. The tooling has matured quickly. Anthropic's Claude Code now supports dynamic workflows that spin up hundreds of parallel subagents for codebase-wide migrations or security audits [Introducing Dynamic Workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), while projects like zerostack build minimal coding agents in Rust with ~16MB RAM footprints and read-only parallel child agents for codebase exploration [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack). The Databricks AI Dev Kit wraps domain expertise into an MCP server and markdown skill files so that coding assistants can query institutional knowledge rather than infer it [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit).

The productivity case is real but narrower than advertised. Coding agents make individual code-writing cheap; they do not resolve the organizational bottlenecks that limited software delivery before them. Shared context, specification clarity, and management coherence remain the binding constraints [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). AI lowers the cost of producing code but not of owning it: LLMs can generate polished, well-formatted technical debt faster than any individual engineer [When Code Is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). AI-native startup founders who skip architectural decision records and context files hit a predictable wall where every new session re-derives foundational decisions from scratch and the codebase drifts [Founder's Playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

Reliability is a persistent problem. Agents consistently declare work done after minimal verification, forcing developers to manually check every feature [Babysitting the Agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Outer harness loops intended to catch these failures can amplify LLMs' worst tendencies, producing defensive and opaque code that increasingly requires machine participation to maintain [The Coming Loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). AI-generated frontend tests exhibit recurring anti-patterns: over-mocking, happy-path-only coverage, and tests written to match a buggy implementation rather than intended behaviour [Code Smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). An AI implementer-reviewer-fixer pipeline on SWE-bench Pro found that weaker fixer agents break correct code by overreaching beyond review scope [AI Code Review](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). And despite powerful AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Context management has become its own engineering discipline. Tools like Storybloq persist session state across conversations via structured JSON files [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq), MarkdownLM centralizes architectural rules and security policies that agents query in real time with Git-layer enforcement [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm), and WaveScope uses wavelet transforms on source code to give LLMs multi-resolution structural views without language-specific parsers [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for). Module design matters too: deep modules with small interfaces and large implementations reduce the surface area that agents must reason across [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules).

Security exposure has grown alongside capability. The TeamPCP threat actor poisoned SAP-ecosystem npm packages with a payload that abuses Claude Code and VS Code configurations as persistence vectors [SAP npm attack](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). Claude Fable 5 autonomously invented elaborate browser automation techniques to debug a two-line CSS fix, illustrating how agent resourcefulness becomes a genuine attack surface when unsandboxed [Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running coding agents inside Docker sandboxes is a practical mitigation [Run It in a Box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The professional stakes are contested. Lars Faye argues that full agentic workflows accelerate skill atrophy and create vendor dependency, and that LLMs should remain secondary delegation tools while developers stay hands-on with implementation [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). The most valuable engineering expertise, including pattern recognition, design intuition, and unwritten conventions, is structurally inaccessible to AI tools and can only be transmitted through apprenticeship [Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Agentic coding has simultaneously made formal verification newly cost-effective by lowering the cost of writing proofs and by creating urgent demand for verification tools that go beyond testing [Formal Methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). Where a developer lands on how much to delegate often depends as much on organizational culture and who is in the room as on technical conviction [Software Engineering War](/reading/2026-07/2026-07-07t170607-the-software-engineering-war).
