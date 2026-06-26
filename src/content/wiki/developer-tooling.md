---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and reason about code —
  spanning shell utilities, version control, AI coding assistants, validation
  libraries, testing frameworks, and platform abstractions that collectively
  shape how software gets built.
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
compiled_at: '2026-06-22T07:13:50.984Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13271
    output_tokens: 1695
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
  cost_usd: 0.065238
last_source_added: '2026-06-26T02:50:20.282Z'
---
Developer tooling spans everything a practitioner reaches for before, during, and after writing code. The sources here cut across shell ergonomics, version control, runtime validation, test infrastructure, platform engineering, and a rapidly expanding category of AI-native tools that are rewriting what the category even means.

At the foundational layer, shell fluency remains a meaningful force multiplier. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers Readline bindings, history search, brace expansion, process substitution, and script safety flags — capabilities built into POSIX, Bash, and Zsh that most developers underuse. Similarly, [Git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) show how five queries — churn hotspots, bus factor, bug clusters, velocity trends, firefighting frequency — can diagnose a codebase's risks before opening a single file. Version control itself is evolving: [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, treats conflicts as first-class objects, and rebases descendants automatically; a companion [workflow post](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how jj makes large PR review tractable by letting reviewers squash files into an empty parent commit as they go.

Runtime validation and type safety at API boundaries is a recurring theme. [Angular with Zod](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) uses a custom RxJS operator to catch unexpected backend response shapes at dev time rather than runtime. The [seven JS libraries roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) names Zod, Biome, Knip, ts-pattern, and Orval as focused tools each solving one problem cleanly. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) illustrates the same principle at an integration layer: a fully-typed Python, Node.js, and REST API over QuickBooks Desktop that abstracts away qbXML and SOAP entirely.

Test infrastructure carries its own weight. [Playwright test design](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues test suites break during refactors not because of bad selectors but because tests couple to implementation details rather than semantic roles. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI analytics layer over Playwright that auto-categorizes failures and claims to save 6-8 hours weekly. Platform reliability matters too: a [merge queue bug post-mortem](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) describes GitHub silently deleting thousands of lines by building temp branches off the wrong base commit, an incident Trunk avoided by architectural choice.

Platform engineering formalizes the practice of building tooling for other developers. The [end-to-end platform engineering post](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) walks why internal developer platforms exist, how to staff them, and what success looks like. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) instantiates one narrow version of this: a single-binary open-source Kubernetes UI that replaces the patchwork of kubectl and five other tools.

The AI-native tooling category is the fastest-moving. [Claude Code's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let the model write its own orchestration scripts and spin up hundreds of parallel subagents for large-scale migrations. Plugins extend that surface: [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across runs via a `.story/` directory; [orchestrator-supaconductor](/reading/2026-04/2026-04-30t231239-ibrahim-3dorchestrator-supaconductor) routes a single natural-language command through planning, parallel execution, and a virtual board for architectural decisions. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules into a knowledge base that agents query in real time, blocking non-compliant code at the Git layer. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) composes MCP, markdown skills, and a Python library to bring domain expertise into coding assistants. [Running Claude Code locally via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows the same toolchain redirected to local models.

Two tensions run through this space. First, the right abstraction level: [MCP-as-GUI](/reading/2026-04/2026-04-23t150424-your-agent-loves-mcp-as-much-as-you-love-guis) argues that MCP is useful for non-developers but wasteful for agents that can write code directly, which should use APIs and scripts to avoid token overhead. Second, security: [supply chain attacks on SAP npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) show how Claude Code and VS Code configs became persistence vectors for credential-stealing malware, and [sandboxing Claude Code in Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is the practical response.

Smaller but notable: [CSS expansion](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) replaces 300kB of JS libraries with native platform primitives; [unicode-animations](/reading/2026-06/2026-06-17t075738-gunnargray-devunicode-animations) provides zero-dependency spinner frame data for CLI tools; [SSH key practices](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) cover agent forwarding and commit signing for secure multi-machine workflows.
