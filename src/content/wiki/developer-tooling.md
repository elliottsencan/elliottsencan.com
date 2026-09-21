---
title: Developer tooling
summary: >-
  The tools developers use to write, test, deploy, and maintain software have
  expanded to include AI coding agents, typed validation layers, smarter version
  control, and new security surfaces that those same tools introduce.
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
compiled_at: '2026-09-21T21:49:00.180Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 15060
    output_tokens: 2013
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
  cost_usd: 0.075375
---
Developer tooling spans everything from shell shortcuts to orchestration frameworks, and the sources here collectively trace a period of rapid expansion on every layer of the stack — from the terminal to AI-native workflows.

At the most foundational level, the shell remains underused. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) like Readline key bindings, brace expansion, and Bash safety flags (`set -euo pipefail`) are available in every environment but rarely taught systematically. Similarly, [SSH key management](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) — agent forwarding, commit signing, avoiding PAT tokens — is infrastructure-level hygiene that pays off across every remote workflow.

Version control tooling is evolving beyond Git's defaults. [Jujutsu (jj)](/reading/2026-05/2026-05-31t164554-jj-vcsjj) auto-commits the working copy, records conflicts as first-class objects, and rebases descendants automatically, removing entire categories of merge friction. Its practical value shows up in code review: [reviewing large changes with jj](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) becomes a matter of squashing reviewed files into an empty parent commit, preserving progress in version control without stashes. On the Git side, [merge queue reliability](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) is a real concern — a GitHub bug silently deleted lines from main branches by building temp branches off the wrong base. Trunk avoided it by never pushing temp branches to main at all. And [five git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) — churn hotspots, bus factor, bug clusters, velocity, and firefighting frequency — can diagnose an unfamiliar codebase's risk profile before reading a single file.

Testing tooling has matured in both breadth and depth. [Playwright test resilience](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) depends less on selector choice than on coupling to semantic roles and accessible names rather than DOM structure. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) adds an AI analytics layer that auto-categorizes failures as bugs, flaky tests, or UI changes, claiming 6–8 hours saved weekly. [Agentic AI testing](/reading/2026-08/2026-08-13t140446-agentic-ai-testing-what-it-means-for-your-playwright-test) extends this further, proposing a framework for matching AI autonomy levels to specific testing goals — fully specified, bounded, or fully adaptive — depending on whether the task is regression, debugging, or exploration.

On the language and library side, [Zod schema validation with a custom RxJS operator in Angular](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at dev time before they cause runtime failures. More broadly, a [tour of seven focused JS/TS libraries](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) — including Knip (dead exports), Biome (formatting/linting), and Orval (API client generation) — illustrates a trend toward small, composable tools over monolithic frameworks. YAML's persistent Norway bug (where `NO` parses as `false`) is a [cautionary case](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) for any toolchain that uses YAML as a config layer.

AI coding assistants have become a tooling category of their own. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) composes an MCP server, markdown skill files, and a Python library to bring domain expertise into Claude Code, Cursor, and others. [Storybloq](/reading/2026-05/2026-05-11t155625-storybloqstorybloq) persists session context across AI coding sessions via a `.story/` directory. [Running Claude Code against a local LM Studio model](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) is viable but has quirks. [Anthropic's dynamic workflows](/reading/2026-05/2026-05-28t140143-introducing-dynamic-workflows-in-claude-code) let Claude write orchestration scripts that spin up hundreds of parallel subagents for large-scale migrations and audits. And [zerostack](/reading/2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack) demonstrates that a Rust-built coding agent can run at ~16MB RAM versus ~300MB for JS-based alternatives.

Security is where tooling improvements and new risks converge most sharply. [Compromised SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) harvested cloud secrets and used Claude Code and VS Code configs as persistence vectors — tooling infrastructure itself became an attack surface. [Running Claude Code in a Docker sandbox](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) mitigates credential leaks and accidental production damage. [Latchkey](/reading/2026-06/2026-06-23t212629-latchkey-credential-layer-for-local-ai-agents) keeps API tokens encrypted on-device so agents authenticate without seeing raw credentials. [Vet](/reading/2026-06/2026-06-23t212845-vet-catch-your-coding-agents-mistakes) reviews an agent's conversation history alongside the diff to catch mistakes standard review misses, like silently skipped tests. And [OpenCode's security posture](/reading/2026-07/2026-07-20t215754-stop-using-opencode) has been criticized for connecting remote LLMs to a local shell with minimal configuration by default.

Platform and infrastructure tooling rounds out the picture. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) unifies Kubernetes topology, events, Helm, and GitOps in a single open-source binary. [Platform engineering](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) as a discipline exists precisely because the accumulation of tools creates cognitive overhead that internal developer platforms are meant to abstract. [GitHub's declining reliability](/reading/2026-05/2026-05-10t205349-github-is-sinking) has pushed some developers toward Codeberg, Forgejo, or self-hosted forges, while [wishlist thinking about forge design](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) surfaces unmet needs: pre-commit remote CI, stacked PRs as first-class citizens, and nuanced approval models.

The through-line across all of this: the tooling surface is expanding faster than any individual can track, the AI layer has both accelerated that expansion and introduced novel security concerns, and the highest-leverage interventions remain unglamorous — sandboxing agents, validating schema boundaries, understanding what version control actually records.
