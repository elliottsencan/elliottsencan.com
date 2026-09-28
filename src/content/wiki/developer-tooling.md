---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and reason about code —
  spanning CLI utilities, version control, AI coding assistants, observability
  layers, and the infrastructural glue that connects them.
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
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
  - 2026-07/2026-07-20t215754-stop-using-opencode
  - 2026-07/2026-07-21t224812-claude-code-mcp-on-13b-polymarket-trades
  - >-
    2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test
compiled_at: '2026-09-28T23:03:00.169Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 2070
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
  cost_usd: 0.07623
---
Developer tooling is the accumulated layer between a developer's intent and working software. The sources here span a wide spectrum: shell scripting, version control, AI coding assistants, testing infrastructure, CI systems, security hardening, and platform engineering. What runs through all of them is the same problem — friction between what a developer wants to accomplish and what the environment makes easy.

At the most fundamental layer, shell and CLI habits compound over a career. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) like Readline key bindings, history search, brace expansion, and script safety flags (`set -euo pipefail`) eliminate whole categories of error without adding dependencies. Similarly, [SSH key management](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) — agent forwarding, commit signing — replaces brittle PAT token workflows across multiple machines.

Version control sits a layer above the shell, and it's under active reinvention. [Jujutsu (jj)](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, treats conflicts as first-class objects, and rebases descendants automatically — a fundamentally different model from Git's staging area. A [practical workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how jj's parent-commit manipulation makes large PR review tractable without stashes. Meanwhile, [git log analysis](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters — can diagnose a codebase's risks before reading a line of it. GitHub itself has come under criticism: [David Bushell argues](/reading/2026-05/2026-05-10t205349-github-is-sinking) its reliability has declined sharply under Microsoft, and [Mat Duggan outlines](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) concrete forge improvements like pre-commit remote CI, stacked PRs as first-class citizens, and signed offline-usable Actions.

Testing infrastructure has its own tooling stack. [Playwright tests that survive refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) do so by binding to semantic roles and accessible names, not CSS classes or DOM structure. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI-powered analytics layer that auto-categorizes Playwright failures. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) frames autonomy levels — fully specified, bounded, fully adaptive — and matches each to workflow goals. Runtime validation is part of the same picture: [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time rather than as production errors.

Continuous integration and merge infrastructure carry their own failure modes. A [GitHub merge queue bug](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) silently deleted thousands of lines by building temp branches off the wrong base — Trunk's architecture avoided it by never pushing temp branches to main. [AST-based linting](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) can enforce architectural constraints like strict DB layer ownership of commits, removing entire bug classes at the lint stage.

AI coding assistants have become their own tooling category, with compounding infrastructure around them. The [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) wraps an MCP server, markdown skills, and a Python core library to surface Databricks expertise inside Claude Code, Cursor, and others. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across stateless AI assistant sessions via a `.story/` directory. [Zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) is a Rust-built coding agent achieving ~16MB RAM versus ~300MB for JS alternatives, with parallel worktrees and local model support. [Running Claude Code locally via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) is practical but has gotchas — local models injecting whitespace into long URL strings, for instance. Security is a real concern: [sandboxing Claude Code in Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) prevents credential leaks even in full auto-approve mode, and the [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) explicitly abused Claude Code and VS Code configs as persistence vectors. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reads an AI agent's conversation history alongside the diff to catch mistakes standard code review misses. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device so agents authenticate against 25+ services without seeing raw credentials.

Platform engineering is the organizational expression of developer tooling at scale. [Luca Cavallin's end-to-end treatment](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) covers why internal developer platforms exist, how to staff them, and what success looks like. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) unifies Kubernetes topology, events, Helm, GitOps, and audits into a single open-source binary, replacing the usual patchwork of kubectl and five other tools.

The frontend tooling layer has its own archaeology. [A historical walkthrough](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) traces how each tool in the modern 44-layer frontend stack was built to solve a specific predecessor's pain. Modern CSS itself is displacing JavaScript tooling: [native anchor positioning, popovers, scroll-driven animations, and custom selects](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) replace over 300 kB of libraries with zero-dependency platform primitives. [CSS Style Queries](/reading/2026-06/2026-06-30t213959-why-css-style-queries-are-a-bigger-deal-than-you-think) reaching Baseline support eliminates Sass and PostCSS for many design-token patterns.

Observability completes the picture. [Distributed trace reading](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) — span anatomy, critical-path analysis, N+1 staircases — is a learnable skill applicable to any unfamiliar codebase. Together, these tools form a feedback loop: write, validate, merge, deploy, observe, repeat.
