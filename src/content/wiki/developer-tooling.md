---
title: Developer tooling
summary: >-
  The landscape of developer tools spans version control, testing, shell
  ergonomics, AI coding assistants, and platform engineering, with a shared
  pressure to reduce friction, enforce correctness, and keep humans in
  meaningful control of complex systems.
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
compiled_at: '2026-06-21T18:25:00.685Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 13271
    output_tokens: 1394
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
  cost_usd: 0.060723
---
Developer tooling is the category of software, libraries, and practices that shape how engineers write, test, ship, and reason about code. The sources here span enough ground to reveal recurring tensions: automation versus oversight, abstraction versus transparency, and local ergonomics versus system-wide safety.

At the version control layer, [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) challenges Git's model by auto-committing the working copy and treating conflicts as first-class objects. This makes large PR review tractable in practice: [a documented workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) uses jj to insert an empty parent commit and squash files into it as review progresses, persisting partial work in version control rather than stashes. Meanwhile, [David Bushell's case against GitHub](/reading/2026-05/2026-05-10t205349-github-is-sinking) argues that reliability and quality on the dominant Git forge have declined sharply enough under Microsoft to warrant migration to Codeberg or self-hosted alternatives. The [GitHub merge queue incident documented by Trunk](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) adds concrete evidence: a bug silently deleted thousands of lines from main branches by building temp branches off the wrong base. Their architectural choice to never push temp branches to main avoided the incident entirely.

Testing tooling surfaces a similar pattern. [TestDino](/reading/2026-04/2026-04-30t231348-testdino) layers AI-powered analytics over Playwright to auto-categorize failures and claims to recover 6-8 engineer-hours weekly. But the [Currents team](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues the root problem is architectural: tests that couple to CSS classes and DOM structure rather than semantic roles break during UI refactors regardless of how they are reported. Fixing the reporting layer without fixing the authoring layer just makes failures easier to see.

Shell-level tooling remains underinvested relative to its impact. [Christian Hofstede-Kuhn's guide](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers Readline key bindings, history search, brace expansion, process substitution, and script safety flags across POSIX, Bash, and Zsh. These are capabilities that have existed for decades but are still widely unknown. Similarly, [a practical SSH guide](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) covers key generation, agent forwarding, and commit signing as the baseline for secure multi-machine workflows.

For API and schema tooling, [Daniel Sogl's Zod-with-Angular approach](/reading/2026-04/2026-04-30t230851-from-flaky-to-flawless-angular-api-response-management-with) catches unexpected backend response shapes at development time via a custom RxJS operator, preventing runtime errors from silent schema drift. [A JS library roundup](/reading/2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about) surfaces Biome as a single-binary linter and formatter replacing ESLint plus Prettier, Knip for eliminating dead code, and Orval for generating typed API clients from OpenAPI specs. These tools share the goal of enforcing correctness mechanically so engineers can spend attention elsewhere.

Platform engineering formalizes this logic at organizational scale. [Luca Cavallin's end-to-end treatment](/reading/2026-05/2026-05-06t204115-platform-engineering-end-to-end) frames internal developer platforms as the infrastructure layer that lets product teams move without accumulating coordination overhead. [Radar](/reading/2026-05/2026-05-03t105238-radar-or-the-missing-open-source-kubernetes-ui) applies the same logic to Kubernetes observability: a single open-source UI replacing kubectl plus five other tools that platform teams typically juggle across clusters.

Security runs through the tooling stack in ways that are easy to overlook until something breaks. [The SAP npm supply chain attack](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) shows threat actors targeting developer tooling directly: four SAP-ecosystem packages were poisoned to harvest cloud secrets and browser passwords, with Claude Code and VS Code configs used as persistence vectors. [Running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) addresses the adjacent risk: an AI coding assistant with full filesystem and credential access needs a sandbox boundary before auto-approve mode is usable safely.

[Git log patterns as a diagnostic tool](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) closes the loop between version history and situational awareness: churn hotspots, bus factor analysis, bug clustering, and firefighting frequency are all readable from commit metadata before opening a single file. Developer tooling, at its best, makes the invisible structure of a codebase legible.
