---
title: Software engineering
summary: >-
  Software engineering spans implementation craft, system design, organizational
  dynamics, and professional judgment — a set of sources collectively arguing
  that code quality, tacit expertise, and human oversight remain irreplaceable
  even as AI tools reshape the field.
sources:
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
  - 2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot
  - 2026-05/2026-05-03t110114-getting-up-to-speed-on-multi-agent-systems-part-7
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
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t193626-slow-mode
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-28t074225-welcome-robot-overlords-please-dont-fire-us
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t023056-what-we-built-in-2-weeks-zerostack
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t130526-agentic-engineering
compiled_at: '2026-06-22T02:31:12.789Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14702
    output_tokens: 1772
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
  cost_usd: 0.070686
---
Software engineering is not a single discipline so much as a negotiation between several competing pressures: the desire to move fast, the need to maintain systems over time, the organizational conditions that shape what developers actually do, and the tools available at any given moment. The sources here cut across all of those dimensions.

On the craft side, foundational principles hold up surprisingly well under scrutiny. The Single Responsibility Principle is frequently misapplied as a rule to minimize code per class, when it actually means grouping behaviors under a single accountable concern — over-granularizing violates the cognitive simplicity SRP is meant to provide [Single Responsibility](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Deep modules — small interfaces hiding large implementations — reduce complexity for both human readers and LLMs navigating a codebase [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). Performance work rewards systematic thinking: replacing float arithmetic with integer accumulators and reciprocal multiplication in Rust's image-rs fast_blur function yielded a 5.9x speedup without algorithmic change [5x faster fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs).

System design principles extend beyond individual modules. Container filesystem isolation — implemented through Linux mount namespaces, mount propagation, and pivot_root — is better understood by building it from scratch than by treating Docker as a black box [Container Filesystem](/reading/2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like). Distributed traces give engineers a window into unfamiliar codebases, with span anatomy, critical-path analysis, and N+1 staircase patterns translating directly into actionable diagnoses [Distributed Traces](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code). Version control tooling is also evolving: Jujutsu auto-commits the working copy and treats conflicts as first-class objects, making large review workflows considerably less painful [Reviewing with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu).

Reliability and quality resist easy automation. Daniel Stenberg's analysis of curl's bug history finds no measurable evidence that even powerful AI-assisted static analysis tools are pushing open-source projects toward zero latent bugs [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Testing infrastructure at scale presents its own challenges: PostHog's CI pipeline processes 575K weekly jobs, and the only tractable path to triage is an AI agent that ingests log lines and opens fix PRs automatically [CI at Scale](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Playwright tests break during refactors not from bad selectors alone, but from coupling to implementation details rather than semantic roles and accessible names [Playwright Tests](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors).

The question of what algorithms interviews measure versus what production work requires is a persistent tension. Interview prep trains a narrow, testable skill that weakly correlates with reading tradeoffs, shipping incrementally, or handling messy real-world inputs [Learn Algorithms for Interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). Hard-won production rules — roll back before debugging, treat every external dependency as a future outage — rarely appear in job interviews but define senior engineering judgment [Unwritten Laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

Organizational dynamics shape outcomes at least as much as technical choices. Poor onboarding practices — packed calendars, same-sprint workloads from day one — set new hires up to fail while making dysfunction invisible to management [Onboarding as Hazing](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile). Senior developers frequently fail to communicate because they frame problems in terms of complexity management while the business thinks in terms of uncertainty reduction [Senior Developer Communication](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise). The most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and transmits only through apprenticeship [Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you).

AI's effects on the profession are contested across multiple sources. Full agentic workflows accelerate skill atrophy, invert priorities toward speed over understanding, and create vendor dependency [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). Shipping AI-generated code without review is categorically incompatible with safety-critical systems [Perils of AI](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). AI lowers the cost of producing code but not the cost of owning it, and taste and judgment still matter because LLMs can generate polished technical debt faster than any individual engineer [When Code is Cheap](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). The bottleneck was never the code itself — it was shared context, specification clarity, and management coherence, and agents amplify existing misalignment rather than resolving it [The Bottleneck Was Never the Code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Formal methods are gaining renewed interest precisely because agentic coding creates demand for verification that goes beyond tests [Formal Methods](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

Security concerns have expanded in kind. Attackers have embedded executable payloads in invisible Unicode variation-selector characters across 151 npm and GitHub packages, defeating both code review and static analysis [Supply-Chain Attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Platform reliability matters too: GitHub's decline under Microsoft has prompted serious consideration of Codeberg, Forgejo, and self-hosted forges as migration targets [GitHub is Sinking](/reading/2026-05/2026-05-10t205349-github-is-sinking).
