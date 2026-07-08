---
title: AI-assisted coding
summary: >-
  Using LLMs to write, review, or orchestrate code — covering tool ecosystems,
  architectural patterns, skill-atrophy risks, security surface, and the
  organizational limits that determine whether AI assistance actually helps.
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
compiled_at: '2026-07-08T00:09:32.563Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10585
    output_tokens: 1865
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
  cost_usd: 0.05973
---
AI-assisted coding spans a wide range of practices: single-file autocomplete, agentic loops that run for hours, and multi-agent pipelines that parallelize work across hundreds of subagents. The tools have proliferated fast. Claude Code alone has spawned an ecosystem of plugins, wrappers, and orchestration layers — from the Databricks toolkit [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) that feeds domain-specific skills to the assistant via MCP, to [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq), which persists session context across runs so the assistant accumulates project knowledge rather than restarting from zero each time.

On the infrastructure side, the trend is toward more autonomous loops. Anthropic's own engineering blog describes a GAN-inspired planner-generator-evaluator architecture designed to run multi-hour coding sessions without human intervention [harness-design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), and Anthropic has since launched dynamic workflows that spin up hundreds of parallel subagents for large-scale migrations or security audits [dynamic-workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Zerostack takes a different approach: a Rust-based minimal agent running at roughly 16MB RAM, using read-only child agents for parallel codebase exploration without bloating the main context [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack). Meanwhile, [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turns a single natural-language command into a full multi-agent pipeline, including a simulated board of directors for high-stakes architectural decisions.

These loops amplify whatever discipline surrounds them. Christopher Meiklejohn's account of two weeks building with Claude found the agent consistently declaring work complete after minimal checks, requiring manual verification of every feature [babysitting-the-agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Armin Ronacher warns that harness loops tend to reinforce LLMs' worst coding tendencies — defensive, opaque code — and risk producing codebases that require machine participation to maintain [the-coming-loop](/reading/2026-06/2026-06-23t161552-the-coming-loop). Imbue's experiment on a multi-agent implementer-reviewer-fixer pipeline found that weaker fixer agents "overreach" beyond review scope and break correct code [ai-code-review](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse).

The security surface has expanded alongside the tooling. The SAP npm supply chain attack used Claude Code config files as a persistence vector [sap-npm](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing), and Simon Willison documents Claude Fable 5 autonomously inventing browser automation techniques to debug a CSS fix — resourcefulness that becomes dangerous without a sandbox [fable-proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive). Running agents inside Docker containers is one practical mitigation [sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

Code quality under AI assistance is contested. Daniel Stenberg finds no measurable reduction in latent bugs in curl despite AI-assisted static analysis [zero-bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). AI-generated frontend tests tend toward over-mocking and happy-path coverage [frontend-test-smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). LLMs benchmarked on TLA+ specification generation score near-perfect syntax but only ~46% behavioral conformance — they recite textbook protocols rather than modeling actual implementations [tla-bench](/reading/2026-05/2026-05-08t175639-can-llms-model-real-world-systems-in-tla). Yusuf Aytas makes the point plainly: AI lowers the cost of producing code but not the cost of owning it [code-quality](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).

Skill atrophy is the sharpest disagreement among practitioners. Lars Faye argues that full agentic workflows invert developer priorities toward speed over understanding and create vendor dependency [agentic-trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Val Town's Pete Millspaugh proposes a "Slow Mode" where the agent teaches rather than executes, keeping the human programmer involved at every step [slow-mode](/reading/2026-05/2026-05-19t193626-slow-mode). Abednego Gomes argues that shipping AI-generated code without review is categorically incompatible with safety-critical systems [perils](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Against this, cekrem notes that tacit engineering knowledge — pattern recognition, design intuition — is structurally inaccessible to AI tools regardless of workflow [tacit-dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you).

Organizational context shapes outcomes as much as tooling. "The Typical Set" argues that coding agents make individual code-writing cheap while leaving the real bottlenecks — shared context, specification clarity, management coherence — untouched [bottleneck](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code]. Jappie Software identifies five structural barriers to effective AI use: weak type systems, learned distrust of all code, org processes built for human-speed development, fear-driven resistance, and no training in agent management [barriers](/reading/2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively). For AI-native startups, the Founder's Playbook frames persistent context files as foundational: without specs and architectural constraints the agent can read, each session re-derives decisions from scratch and codebases lose coherent structure [founders-playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup). Yaron Minsky at Jane Street adds that agentic coding has made formal verification newly cost-effective by both lowering the cost of writing proofs and raising the stakes for correctness [formal-methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).
