---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and maintain software,
  spanning CLI utilities, version control, AI coding assistants, test
  infrastructure, and platform abstractions — each trading off ergonomics,
  safety, and composability.
sources:
  - 2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-04/2026-04-29t172018-how-to-build-scalable-web-apps-with-openais-privacy-filter
  - >-
    2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor
  - 2026-04/2026-04-30t231319-markdownlm
  - 2026-04/2026-04-30t231348-testdino
  - 2026-04/2026-04-30t231709-conductor
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - 2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-06t204115-platform-engineering-end-to-end
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-11t155625-storybloqstorybloq
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-14t190300-opus-47-low-vs-medium-vs-high-vs-xhigh-vs-max-the-reasoning
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - 2026-05/2026-05-18t222802-raellioctowiz
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-17t075816-matt-palmer
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - 2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents
  - 2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
  - 2026-06/2026-06-23t232444-repowise-devrepowise
  - 2026-06/2026-06-25t195020-strands-agents
  - >-
    2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think
compiled_at: '2026-07-09T14:11:15.026Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14190
    output_tokens: 1952
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
  cost_usd: 0.07185
---
Developer tooling spans an enormous surface area: version control workflows, shell productivity, test infrastructure, AI coding assistants, package ecosystems, and the platforms that tie them together. What connects these is a shared concern about where friction lives and how to reduce it without introducing new failure modes.

On the AI-assisted end, Claude Code has become a de facto reference point. [Anthropic's dynamic workflows launch](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) lets Claude write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide migrations and security audits. The [orchestrator-supaconductor plugin](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) extends this further, routing a single natural-language command through planning, parallel execution, and a simulated Board of Directors for high-stakes architectural decisions. The [raelli/octowiz plugin](/reading/2026-05/2026-05-18t222802-raellioctowiz) takes a different angle, routing Claude Code sessions through purpose-built skill libraries and a LiteLLM-backed memory store rather than monolithic system prompts.

Context persistence is a recurring problem across these tools. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) addresses it by writing session state to a `.story/` directory of JSON files, turning stateless AI assistants into compounding collaborators. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base that agents query in real time, with its Lun tool blocking non-compliant code at the Git layer before it merges. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a simpler approach: a zero-dependency bash CLI that generates both a human-readable INDEX.md and a machine-readable manifest.json so agents can navigate project context without burning excess tokens.

MCP (Model Context Protocol) connects AI agents to external tools, but not everyone agrees it should. [Ajeesh Mohan's critique](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP is effectively a GUI for AI agents — useful when the agent lacks coding ability, wasteful when it can write scripts directly against APIs. Contrast this with Databricks' [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit), which packages Databricks expertise as a composable MCP server plus markdown skills and a Python core library for Claude Code, Cursor, and Gemini CLI. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to bundle a local MCP server into a single-click `.mcpb` for Claude Desktop distribution.

Safety sits alongside capability. [cekrem argues](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) that Claude Code should always run inside Docker's sbx sandbox to prevent credential leaks and accidental production access. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) addresses the credentials problem differently, injecting API tokens into agent curl calls locally so agents can authenticate without seeing raw secrets. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) adds a code review layer that reads an agent's conversation history alongside the diff, catching mistakes like silently skipped tests that standard review misses. The supply chain risk is real: [a TeamPCP attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages with credential-stealing payloads that specifically abused Claude Code and VS Code configs as persistence vectors.

Test infrastructure has its own failure modes. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI analytics layer over Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes. The [Currents team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that test suites break during refactors not because of poor selector choices but because they couple to implementation details rather than accessible roles and labels.

Version control tooling is evolving too. [Jujutsu (jj)](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, treats conflicts as first-class objects, and automatically rebases descendants. [Ben Gesoff's workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows jj's practical advantage: duplicating a change, inserting an empty parent, and squashing reviewed files into it — persisting review progress in version control. GitHub's reliability decline, documented by [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking), pushes some developers toward alternatives; [Mat Duggan's wishlist](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) articulates what a better forge would look like: pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions.

Platform engineering provides the connective tissue. [Luca Cavallin's end-to-end account](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) traces why internal developer platforms exist and what success looks like, grounded in real GCP experience. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) addresses Kubernetes specifically with a single-binary open-source UI that replaces kubectl plus five other tools for platform teams. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) adds codebase intelligence: health scores, auto-generated docs, dead code detection, and architectural decision tracking via MCP.

Smaller utilities round out the picture. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covering Readline bindings, history search, and script safety flags remain high-leverage for daily work. [Git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) for churn hotspots, bus factor, and bug clusters diagnose a new codebase's risks before reading a single file. [Zod with RxJS](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time. [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) packages 18 Unicode braille spinner animations as zero-dependency raw frame data for CLI tools and browsers alike.
