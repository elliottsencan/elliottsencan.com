---
title: Developer tooling
summary: >-
  The tools developers use to write, review, test, deploy, and understand code —
  spanning shell utilities, version control, AI coding assistants, test
  infrastructure, and platform abstractions — and how that landscape is shifting
  as AI agents become first-class participants.
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
compiled_at: '2026-07-08T00:12:54.518Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14190
    output_tokens: 1959
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
  cost_usd: 0.071955
---
Developer tooling covers every layer between a developer and working software: the shell they operate in, the version control system tracking changes, the test runners catching regressions, the build pipelines integrating work, and the platforms abstracting infrastructure. What makes the current moment unusual is that AI coding assistants have become a first-class layer in this stack, generating their own category of tooling problems around context, coordination, security, and correctness.

At the shell layer, the fundamentals still matter. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) like Readline key bindings, brace expansion, process substitution, and script safety flags remain underused by working engineers who would benefit from them daily. SSH key management, agent forwarding, and commit signing address authentication patterns that recur across every team working with remote machines [via practical DevOps guides](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). Version control itself is evolving: Jujutsu offers Git compatibility while auto-committing the working copy and treating conflicts as first-class objects [jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj), and a workflow for reviewing large pull requests with jj shows how the model changes review ergonomics in practice [reviewing large changes with jj](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu). Git log commands — querying churn hotspots, bus factor, bug clusters, and firefighting frequency — can diagnose a codebase's risk profile before reading a single file [git commands before reading code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code).

Test infrastructure is a recurring pressure point. Playwright test suites break during UI refactors not primarily because of bad selectors but because they couple to implementation details rather than semantic roles and accessible names that stay stable [designing Playwright tests that survive refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). TestDino adds an AI-powered analytics layer over Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes [TestDino](/reading/2026-04/2026-04-30t231348-testdino). At the CI layer, a GitHub merge queue bug that silently deleted code by building temporary branches off the wrong base commit illustrates how architectural choices in pipeline tooling have real correctness consequences [merge queue wrong commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit). Type-safe validation at API boundaries, as shown with Zod and RxJS in Angular, catches unexpected response shapes at development time before they cause runtime failures [Angular Zod validation](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with).

Kubernetes tooling exemplifies a broader pattern of patchwork fragmentation. Radar consolidates topology, Helm, GitOps, image inspection, and audits across clusters into a single open-source binary, replacing the typical five-tool juggle [Radar Kubernetes UI](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui). Platform engineering as a discipline provides the organizing frame: internal developer platforms exist to reduce cognitive load for product teams, and building them well requires clear staffing, product thinking, and measurable success criteria [platform engineering end-to-end](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end).

AI coding assistants have become a tooling layer in their own right, with a growing ecosystem of plugins, servers, and wrappers. Databricks' ai-dev-kit ships expertise as a composable MCP server, markdown skills, and a Python core library for Claude Code, Cursor, and Gemini CLI [ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit). Anthropic's dynamic workflows in Claude Code let Claude write orchestration scripts that spin up hundreds of parallel subagents for codebase-wide tasks like migrations and security audits [dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code). zerostack is a Rust-built minimal coding agent achieving roughly 16 MB RAM versus 300 MB for JS-based alternatives, with multi-provider support and a terminal UI [zerostack](/reading/2026-06/2026-06-11t023723-gi-dellavzerostack). Storybloq persists AI session context across sessions via a .story/ directory so agents accumulate project knowledge rather than starting fresh each time [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq). Running Claude Code against a local LLM via LM Studio is straightforward but has gotchas [local model via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio), and sandboxing it inside Docker is a practical safeguard against credential leaks and accidental production writes [run Claude Code in a box](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box).

Security is not optional at this layer. Four SAP-ecosystem npm packages were poisoned with a credential-stealing payload that abused Claude Code and VS Code configurations as persistence vectors [SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Latchkey addresses a related problem by injecting API credentials locally into agent curl calls so agents authenticate against services without ever seeing raw tokens [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents). Vet reviews an AI agent's conversation history alongside the diff to catch mistakes standard code review misses [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes).

GitHub's reliability decline under Microsoft has renewed interest in alternatives like Codeberg, Forgejo, and self-hosted forges [GitHub is sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking), while developer wishlists for a reimagined forge point to pre-commit remote CI, stacked PRs as first-class citizens, and signed/offline-usable actions [if I could make my own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). Observability tooling completes the picture: reading distributed traces in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and common patterns like N+1 staircases [how to read distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). Across all of these layers the recurring theme is reducing the gap between what a developer intends and what the system does — whether the system is a shell, a pipeline, a test suite, or an AI agent.
