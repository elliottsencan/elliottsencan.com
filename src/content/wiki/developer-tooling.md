---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and understand code —
  spanning version control, CLI utilities, AI coding agents, test
  infrastructure, and platform layers — each solving a specific friction that
  accumulated from the one before it.
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
compiled_at: '2026-08-03T19:33:10.585Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14893
    output_tokens: 2001
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
  cost_usd: 0.074694
---
Developer tooling is not a single category but a layered accumulation of solutions to concrete problems. [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent) traces this pattern explicitly for frontend: each tool in a 44-layer stack exists because something upstream caused pain. That logic applies across the stack.

At the version control layer, Jujutsu ([jj-vcs/jj](/reading/2026-05/2026-05-31t164554-jj-vcsjj)) offers a Git-compatible alternative that auto-commits the working copy, treats conflicts as first-class objects, and rebases descendants automatically. A concrete workflow built on top of it — [reviewing large pull requests](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) by duplicating a change and squashing files into an inserted parent as you review — shows how version control primitives can be composed into review workflows without external tooling. For developers staying on Git, [five git log invocations](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) covering churn hotspots, bus factor, bug clusters, velocity trends, and firefighting frequency give a structural read on a codebase before a single file is opened. GitHub's own reliability, meanwhile, has drawn criticism: [David Bushell](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues its quality has declined sharply under Microsoft, and [Mat Duggan](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) outlines what a better forge would look like — pre-commit remote CI, stacked PRs as first-class citizens, nuanced approval models, and a smaller self-hostable footprint.

Shell fluency remains foundational. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covering Readline bindings, history search, brace expansion, process substitution, and script safety flags across POSIX, Bash, and Zsh compound across a career. SSH key management — generation, agent forwarding, commit signing — [removes PAT tokens](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) from the authentication surface entirely.

Testing infrastructure has its own layered tooling. Playwright test suites break during UI refactors primarily because tests couple to CSS classes and DOM structure rather than semantic roles and accessible names; [Currents](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the selector choice is secondary to the coupling problem. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI analytics layer over Playwright that auto-categorizes failures as bugs, flaky tests, or UI changes. On CI infrastructure, [Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub merge queue bug that silently deleted code by building temp branches off the wrong base, and explains how their architectural choice to never push temp branches to main sidestepped the incident.

Schema validation sits at the boundary between backend contracts and frontend consumption. [Zod with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected response shapes at development time rather than as runtime errors. The same Zod library appears in [a broader JavaScript library survey](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) alongside Knip for dead export detection, Biome for linting and formatting, and Orval for generating typed API clients.

Platform tooling abstracts infrastructure complexity. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) unifies Kubernetes topology, Helm, GitOps, image inspection, and audits across clusters in a single open-source binary. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) wraps QuickBooks Desktop's qbXML and SOAP surface in a typed Python and Node.js API with real-time read/write access to 130+ object types. [Platform engineering](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) as a discipline formalizes this: internal developer platforms exist to reduce cognitive load and standardize paths to production.

AI coding agents have become their own tooling category with distinct infrastructure concerns. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) delivers Databricks expertise to assistants like Claude Code and Cursor via an MCP server, markdown skills, and a Python core library. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across agent runs via a `.story/` directory, addressing the statelessness problem. [MarkdownLM](/reading/2026-04/2026-04-30t231319-markdownlm) centralizes architectural rules and policies as a queryable knowledge base, with its Lun tool blocking non-compliant code at the Git layer. [Running Claude Code against a local model via LM Studio](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) documents a privacy-preserving alternative to cloud API calls, with gotchas around whitespace injection in long URL strings.

Security is not separable from tooling choices. The [SAP npm package supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) used Claude Code and VS Code configuration files as persistence vectors after poisoning four packages with credential-stealing payloads. [Sandboxing Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is argued as a prerequisite for safe auto-approve mode. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API credentials encrypted on-device, injecting them into agent calls without exposing raw tokens. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reviews an agent's conversation history alongside its diff to catch mistakes — silently skipped tests, fake data substitutions — that standard code review misses.

Observability tooling extends developer understanding into production. [Reading distributed traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code) in unfamiliar codebases requires understanding span anatomy, critical-path analysis, and trace patterns like N+1 staircases before tracing back to responsible code. [Repowise](/reading/2026-06/2026-06-23t232444-repowise-devrepowise) applies codebase intelligence — health scores, dead code detection, git analytics, architectural decision tracking — via MCP.

The through-line across all of this is specificity: each effective tool addresses a concrete, nameable friction rather than a general category of developer experience.
