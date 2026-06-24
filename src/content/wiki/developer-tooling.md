---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and maintain software —
  spanning CLI utilities, version control, testing infrastructure, AI coding
  assistants, and the platforms that coordinate them all.
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
compiled_at: '2026-06-24T04:35:47.156Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13571
    output_tokens: 1522
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
  cost_usd: 0.063543
---
Developer tooling is the layer between a developer's intent and working software. The sources collected here span a wide range: shell ergonomics, version control, testing infrastructure, AI-assisted coding, credential management, and the platforms that stitch these together. What connects them is a shared concern with reducing friction at each step of the development cycle while keeping systems auditable and safe.

At the foundation, tools that most developers reach for daily have more depth than their surface suggests. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) like Readline key bindings, brace expansion, and process substitution eliminate repeated keystrokes and make scripts safer via flags that halt execution on errors. [SSH key workflows](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) — covering key generation, agent forwarding, and commit signing — replace password and PAT-based authentication with a more auditable model. Even git log has more diagnostic power than most developers use: [five specific log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters, velocity trends, firefighting frequency — can characterize a codebase's risk profile before reading a single line of code.

Version control itself is being reconsidered. [Jujutsu (jj)](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is a Git-compatible VCS that auto-commits the working copy and treats conflicts as first-class objects, making large refactors and history rewrites less error-prone. A concrete workflow for [reviewing large changes in jj](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) — duplicating a change, inserting an empty parent, squashing files in incrementally — shows how the model enables workflows that Git makes awkward. Meanwhile, the merge queue machinery in hosted platforms has its own failure modes: a [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines from main branches, an incident that Trunk avoided by never pushing temp branches to main.

Testing tooling has matured in parallel. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an analytics layer over Playwright that auto-categorizes failures. The more durable insight, though, comes from [designing Playwright tests](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) that survive UI refactors by coupling to semantic roles and accessible names rather than CSS classes or DOM structure. On the backend, [Zod validation with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected response shapes at development time, preventing runtime errors that only surface in production.

AI coding assistants have become a distinct tooling category. [Claude Code](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) now supports dynamic workflows that spin up hundreds of parallel subagents for large-scale migrations or security audits. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers expertise to these assistants via MCP servers and markdown skill files. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across AI coding sessions via a .story/ directory, addressing the statelessness problem. [Zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack), written in Rust, achieves ~16MB RAM versus ~300MB for JS-based alternatives. Running these agents safely requires sandboxing: [isolating Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) prevents credential leaks and accidental destruction of production data, a concern made concrete by the [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) that used Claude Code and VS Code configs as persistence vectors.

Credential management for agents is its own problem. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device, injecting them into agent curl calls without exposing raw credentials. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an agent's conversation history alongside the diff to catch mistakes — silently skipped tests, swapped-in fake data — that standard code review misses entirely.

At the platform layer, [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) consolidates Kubernetes cluster management into a single open-source binary, replacing the usual patchwork of kubectl and five other tools. [Platform engineering more broadly](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) is the discipline of building these internal developer platforms deliberately, with clear ownership and success metrics, rather than letting them accumulate organically. The concern about [GitHub's declining reliability](/reading/2026-05/2026-05-10t205349-github-is-sinking) under Microsoft points to the risk of platform dependency and the value of self-hosted alternatives.
