---
title: Developer tooling
summary: >-
  The expanding ecosystem of tools, libraries, protocols, and platforms that
  shape how developers write, test, review, and ship code — increasingly
  mediated by AI agents, structured knowledge bases, and composable
  infrastructure layers.
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
compiled_at: '2026-07-01T01:58:21.943Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14012
    output_tokens: 1734
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
  cost_usd: 0.068046
---
Developer tooling has always been about reducing friction between intent and working software, but the current generation of tools reflects a significant shift: AI coding agents are now first-class participants in the toolchain, and the infrastructure built around them is as important as the editors and CLIs they run inside.

At the AI-agent layer, several patterns are converging. Claude Code has become a reference surface: plugins like [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) turn a single natural-language command into a multi-agent pipeline with parallel execution and architectural review, while [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across stateless AI sessions via a `.story/` directory. Anthropic itself formalized this direction with [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code), which let Claude write orchestration scripts that spin up hundreds of parallel subagents for large-scale tasks like codebase migrations. Running that power safely requires containment: [one argument](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) makes the case for always running Claude Code inside Docker's sandbox to prevent credential leaks, and [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) goes further by keeping API tokens encrypted on-device so agents can authenticate against external services without ever seeing raw credentials.

Knowledge management for agents is its own sub-discipline. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and security policies into a living knowledge base, with a Git-layer enforcement tool that blocks non-compliant code before it merges. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a simpler approach: a zero-dependency bash CLI that organizes project context into tiered markdown files with both a human-readable index and a machine-readable manifest, so agents can navigate without burning excess tokens. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) extends this further, using the model itself to build and maintain structured markdown at scale.

The MCP protocol sits at the intersection of these concerns. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages domain expertise as a composable MCP server plus markdown skills, supporting multiple AI coding assistants. The debate over when MCP is appropriate is live: [one analysis](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues MCP is effectively a GUI for AI agents — useful when agents lack coding ability, but wasteful when they can write scripts directly and should use APIs instead to avoid token costs and composability problems.

Code quality tooling is also evolving to account for AI-generated output. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's full conversation history alongside the diff to catch mistakes that standard review misses, like silently skipped tests. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) applies an AI analytics layer to Playwright runs, auto-categorizing failures by type. [Designing tests that survive UI refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the core problem is coupling to implementation details — CSS classes, DOM structure — rather than semantic roles and accessible names.

Version control is seeing renewed experimentation. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy and treats conflicts as first-class objects, while a [practical workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how to use it for reviewing large PRs by squashing files into an empty parent commit as you read them. A [postmortem on GitHub's merge queue](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) illustrates how architectural choices in CI infrastructure carry real consequences when a bug silently deleted thousands of lines from main branches. [Git log commands run before reading any unfamiliar codebase](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters — show that the version control history itself is diagnostic tooling.

Platform engineering formalizes the idea that tooling is infrastructure. [A full-arc treatment of internal developer platforms](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames the discipline around reducing cognitive load for product teams. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) applies the same logic to Kubernetes, offering a single open-source binary that replaces the patchwork of kubectl and five other tools. Supply chain security sits adjacent: [compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) were weaponized to harvest cloud secrets and abused Claude Code and VS Code configs as persistence vectors, a reminder that the toolchain is also an attack surface.

Smaller utilities round out the picture. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covering Readline bindings, history search, and script safety flags remain foundational. [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) provides zero-dependency Unicode spinner frame data for CLI feedback loops. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's SOAP and qbXML interface in a typed Python and Node.js API. Across all of these, the common thread is the same: each tool is an attempt to narrow the gap between what developers mean to do and what their systems actually execute.
