---
title: Software engineering
summary: >-
  A broad discipline covering code quality, tooling, architecture, testing, and
  professional practice, where recurring sources argue that engineering judgment
  remains the scarce resource regardless of how much automation enters the
  workflow.
sources:
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-30t210309-90percent-of-the-t-distribution
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-18T21:56:08.689Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14143
    output_tokens: 1855
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
  cost_usd: 0.070254
last_source_added: '2026-06-21T20:05:26.957Z'
---
Software engineering as a discipline resists clean definition, but a common thread across recent technical writing is that the hard problems have never been purely about writing code. [The Typical Set](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) puts it plainly: the real bottleneck is organizational — shared context, specification clarity, and management coherence. Code generation, whether by hand or by agent, amplifies whatever alignment or misalignment already exists in a team.

Code quality surfaces repeatedly as a concern independent of how code gets produced. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs lowered the cost of producing code but not the cost of owning it: AI-generated code can look polished while encoding bad decisions at machine speed, making engineering taste and judgment more valuable, not less. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) adds a structural point — codebases built around deep modules with interfaces that hide complexity serve both human and AI contributors better, because shallow abstractions force reasoning across too many layers at once. [Henrique Teixeira](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) traces a related misreading: SRP is widely applied as "do one thing" when it actually concerns cohesion, and over-granular class splitting violates the cognitive simplicity the principle was meant to provide.

Testing practice runs through several sources. [Currents.dev](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) diagnoses why Playwright suites break on UI refactors — coupling to CSS classes and DOM structure rather than semantic roles and explicit test attributes — and prescribes a tiered selector hierarchy and page-object patterns. The same team's [staging vs. production framework](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) addresses where different test types belong, with risk profiles determining which environments carry which suites. [Emphere Engineering](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) takes this further for safety-sensitive systems: their assurance platform uses real-kernel runners and behavioral fixture invariants, plus red runs that confirm the system fails loudly rather than silently overclaiming certainty.

Version control and code review have their own craft. [Ben Gesoff](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) describes a Jujutsu workflow for reviewing large changes by incrementally squashing reviewed files into an empty parent commit, preserving progress without losing context. [jj itself](/reading/2026-05/2026-05-31t164554-jj-vcsjj) is presented as a Git-compatible VCS with cleaner undo history and first-class conflict handling. [Ally Piechowski's git log audit](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) demonstrates that churn hotspots, bus factor, and bug clusters visible in git history diagnose codebase health before a single file is opened — a discipline continued in her [legacy Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week), which starts with stakeholder interviews before touching any tooling.

Tacit knowledge is a structural constraint that tooling cannot paper over. [Christian Ekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Michael Polanyi, argues that pattern recognition, system intuition, and unwritten conventions are structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Anton Zaides](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) catalogs a related set of hard-won rules — roll back before debugging, treat every external dependency as a future outage — that developers learn by breaking things in production. [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) adds that senior engineers lose influence when they frame their work as complexity management rather than uncertainty reduction, which is how the rest of the business actually thinks.

Infrastructure fundamentals appear throughout. [Ivan Velichko](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like) walks through building Docker-style container isolation from Linux primitives — mount namespaces, pivot\_root, pseudo-filesystems — as a way to understand what abstractions are actually doing. [SSH key management](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) covers key pairs, agent forwarding, and commit signing as practical identity infrastructure. [Christian Hofstede-Kuhn](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) catalogs underused shell patterns — Readline bindings, brace expansion, process substitution, and script safety flags — that reduce everyday friction.

Observability enters via [SigNoz's distributed tracing guide](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code), which treats span types and shapes as a primary interface for understanding unfamiliar systems. [YAML's Norway bug](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) — where NO parses as false due to implicit boolean typing persisting in libraries despite the 1.2 spec fix — illustrates how configuration format choices carry long-tail reliability costs.

Formal verification, historically seen as too expensive, gets reappraised by [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming): agentic coding has lowered proof costs while creating new demand for machine-checkable verification of AI-generated output, reversing the firm's prior skepticism. Robert Nystrom's [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents the pedagogical end of the discipline — a complete book and two interpreter implementations showing how language internals actually work, the kind of foundational knowledge that sits below most daily practice.

Onboarding is where organizational and technical concerns collide. [Nguyen Duy Hung](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) argues that Agile-framed onboarding that loads new hires with full sprint expectations from day one treats the system's failures as individual failures, making the problem structurally invisible.
