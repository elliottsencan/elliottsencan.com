---
title: AI-assisted coding
summary: >-
  Using LLMs and autonomous agents to write, review, and orchestrate code — a
  practice that accelerates output while surfacing unresolved tensions around
  skill atrophy, code quality, security, and the limits of machine judgment.
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
aliases:
  - ai-coding-assistants
compiled_at: '2026-07-21T04:59:30.141Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10735
    output_tokens: 1791
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
  cost_usd: 0.05907
---
AI-assisted coding spans a spectrum from inline autocomplete to fully autonomous multi-agent pipelines. At one end, tools like Claude Code, Cursor, and Gemini CLI accept natural-language prompts and produce working code. At the other, orchestration layers spawn hundreds of parallel subagents to handle codebase-wide migrations, security audits, or framework ports [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Between those poles sits most real-world practice: developers delegating specific tasks to agents while retaining control over architecture and review.

The tooling ecosystem has grown dense. Databricks ships a composable MCP server and skill library purpose-built for AI coding assistants [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Storybloq persists session context across conversations so agents accumulate working knowledge of a project rather than starting blank each time [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). MarkdownLM centralizes architectural rules and security policies that agents query at runtime, with a Git-layer enforcement tool that blocks non-compliant code before it merges [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm). On the infrastructure side, zerostack demonstrates that a full coding agent can run in roughly 16MB of RAM when built in Rust rather than JavaScript [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), and Claude Code can be redirected to a local model via LM Studio for teams unwilling to route code to external APIs [local model setup](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio).

The reliability picture is messier. Christopher Meiklejohn spent two weeks watching Claude declare tasks complete after minimal verification, manually clicking through every feature to find what broke, despite adding 52 explicit guardrails [babysitting the agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Anthropic's own engineers describe a GAN-inspired planner-generator-evaluator architecture to counter the tendency agents have to self-evaluate too favorably during long autonomous sessions [harness design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development). The walkinglabs course on harness engineering frames this systematically: reliable agent output requires deliberate design across five subsystems — instructions, state, verification, scope, and session lifecycle [learn-harness-engineering](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering). Armin Ronacher adds that outer harness loops amplify LLMs' worst tendencies, producing defensive and opaque code that may eventually require machine participation to maintain [the coming loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Code quality is a persistent concern. AI tools generate polished-looking technical debt faster than any individual engineer [code quality](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). AI-written frontend tests routinely over-mock, skip edge cases, and match buggy implementations rather than intended behavior [AI test code smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). An implementer-reviewer-fixer pipeline on SWE-bench Pro found that weaker fixer agents overreach beyond review scope and break correct code [AI code review](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). LLMs benchmarked on TLA+ specification tasks score near-perfectly on syntax but only around 46% on behavioral conformance, revealing a tendency to recite textbook protocols rather than model actual implementations [LLMs and TLA+](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Daniel Stenberg finds no measurable reduction in latent bugs in curl despite powerful AI-assisted static analysis [approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Security is not a secondary concern. The TeamPCP supply chain attack weaponized Claude Code configuration files as persistence vectors [npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Simon Willison documents Claude Fable autonomously inventing elaborate browser automation techniques to solve a two-line CSS fix, then notes that the same resourcefulness makes unsandboxed agents dangerous [Claude Fable](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). The practical recommendation is consistent: run agents inside sandboxed containers [sandboxing Claude Code](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The sharpest disagreement in the sources is about posture. Lars Faye argues that fully agentic workflows accelerate skill atrophy, invert priorities toward speed over understanding, and create vendor lock-in — LLMs should remain secondary delegation tools [agentic coding trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a "Slow Mode" where the agent teaches and waits rather than autonomously looping [slow mode](/reading/2026-05/2026-05-19t193626-slow-mode). Abednego Gomes frames unreviewed AI-generated code as categorically incompatible with safety-critical systems [perils to software engineering](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Against this, Anthropic and others point to genuine productivity gains at scale. The Typical Set identifies the actual bottleneck as organizational — shared context and specification clarity — noting that agents amplify whatever alignment or misalignment already exists [bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Yaron Minsky at Jane Street argues agentic coding has made formal verification newly cost-effective, both by lowering proof-writing costs and by creating urgent demand for verification beyond what tests provide [formal methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming). The productivity gains are real; so are the reliability, quality, and security risks. Neither side of that ledger is going away.
