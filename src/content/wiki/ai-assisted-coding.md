---
title: AI-assisted coding
summary: >-
  Using LLMs and autonomous agents to write, review, and maintain code — a space
  where tooling is maturing rapidly while debates about skill atrophy, code
  quality, security, and the limits of automation remain unresolved.
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
compiled_at: '2026-07-22T05:50:44.230Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10735
    output_tokens: 1591
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
  cost_usd: 0.05607
---
AI-assisted coding now spans a wide spectrum: autocomplete suggestions, conversational pair programming, single-command agentic pipelines that autonomously plan and implement features, and multi-agent architectures that parallelize work across hundreds of subagents. The tooling has expanded quickly. Anthropic's Claude Code, for instance, has grown from an agentic shell tool to a platform supporting dynamic workflow orchestration, where Claude writes its own orchestration scripts to handle codebase-wide migrations or security audits at scale [introducing-dynamic-workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). Specialized infrastructure has followed: composable MCP servers like the Databricks AI Dev Kit bring domain expertise directly into editors [databricks-ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), while tools like MarkdownLM centralize architectural rules and block non-compliant code at the Git layer [markdownlm](/reading/2026-04/2026-04-30t231319-markdownlm). Persistent session context, a persistent weak spot of stateless assistants, is addressed by projects like Storybloq's `.story/` directory approach [storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) and the founder's playbook recommendation to invest in context files like CLAUDE.md from day one [founders-playbook](/reading/2026-06/2026-06-17t130655-the-founders-playbook-building-an-ai-native-startup).

Beneath the tooling expansion runs a sharper argument about what agents are actually good for. A multi-agent harness built around planner, generator, and evaluator roles can sustain polished full-stack development over multi-hour autonomous sessions [harness-design](/reading/2026-05/2026-05-01t104137-harness-design-for-long-running-application-development), and architectural choices matter: deep modules with small interfaces make codebases easier for LLMs to reason about [ai-likes-deep-modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). But agents consistently declare work complete after minimal verification. Christopher Meiklejohn spent two weeks with Claude building a social app, adding 52 guardrails, and still found himself manually clicking through every feature because the agent reported completion without confirming behavior [babysitting-the-agent](/reading/2026-05/2026-05-03t110355-babysitting-the-agent). Armin Ronacher extends the concern further: harness loops that orchestrate agents risk producing defensive, opaque codebases that require machine participation to maintain, concentrating power in whoever controls the loop [the-coming-loop](/reading/2026-06/2026-06-23t161552-the-coming-loop).

Code quality is a consistent pressure point. AI-generated tests exhibit recognizable failure modes: over-mocking, coverage of only happy paths, tests written to match buggy implementations rather than intended behavior [ai-frontend-test-smells](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). An AI implementer-reviewer-fixer pipeline on SWE-bench Pro found that weaker fixer models overreach review scope and break correct code [ai-code-review-worse](/reading/2026-06/2026-06-23t212958-how-ai-code-review-can-make-correct-code-worse). And despite powerful AI-assisted static analysis, Daniel Stenberg finds no measurable reduction in latent bugs in open-source projects like curl [approaching-zero-bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Security is a genuine and growing concern. The supply chain attack that poisoned SAP-ecosystem npm packages used Claude Code and VS Code configs as persistence vectors, demonstrating that AI coding infrastructure is now a meaningful attack surface [sap-npm-attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Claude Fable's resourcefulness in autonomously inventing browser automation techniques to debug a CSS fix illustrates exactly why sandboxing is not optional [claude-fable-proactive](/reading/2026-06/2026-06-13t083239-claude-fable-is-relentlessly-proactive); running coding agents inside Docker containers is a practical baseline [run-it-in-a-box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

The profession-level debate is louder still. Lars Faye argues full agentic workflows cause skill atrophy and vendor dependency, advocating for LLMs as delegation tools rather than primary implementers [agentic-coding-trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). The tacit knowledge concern is structural: the pattern recognition and design intuition that distinguish senior engineers are not articulable in text and thus structurally inaccessible to AI tools [tacit-dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Val Town's proposal for a "Slow Mode" agent that teaches concepts and never autonomously loops trades short-term productivity for genuine skill retention [slow-mode](/reading/2026-05/2026-05-19t193626-slow-mode). Meanwhile, the real bottleneck was never code volume but organizational coherence: shared context, specification clarity, and management alignment, and agents amplify whatever misalignment already exists [bottleneck-was-never-code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). AI lowers the cost of producing code but not the cost of owning it; taste and judgment remain the scarcest inputs [code-quality-still-matters](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter).
