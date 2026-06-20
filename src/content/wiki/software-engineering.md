---
title: Software engineering
summary: >-
  A broad discipline spanning design principles, tooling, testing, security, and
  the human practices that shape whether code ships well and remains
  maintainable — illuminated here across dozens of sources covering everything
  from SRP to supply-chain attacks.
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
compiled_at: '2026-06-20T22:04:31.012Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14556
    output_tokens: 1909
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
  cost_usd: 0.072303
---
Software engineering is not a single skill but a layered set of practices, and the sources here collectively show what holds them together: judgment about tradeoffs, systems thinking that extends beyond the code itself, and constant pressure from tools and circumstances that make good judgment harder to maintain.

At the level of individual code design, several recurring principles emerge. The Single Responsibility Principle is widely misapplied as a mandate for micro-granularity, when it actually argues for cohesive grouping under a single accountable concern — over-splitting classes makes systems harder to navigate, not simpler [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Similarly, deep modules — small public interfaces hiding substantial implementations — reduce the cognitive surface for both human readers and LLMs working with a codebase [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). Bloated Angular components with dozens of inputs illustrate the same failure at the framework level: the Composite Components pattern decomposes them into directives and sub-components so each concern stays encapsulated [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to).

Version control and code review carry their own craft. Jujutsu offers a workflow for reviewing large changes by inserting an empty parent commit and squashing files into it incrementally, persisting review progress in version control without Git stash overhead [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu). Git log analysis — churn hotspots, bus factor, bug clusters — diagnoses codebase risk before reading a single file [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). A week-one Rails audit similarly starts with stakeholder interviews to surface fear and knowledge gaps before running any tooling [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week).

Testing is a thread running through multiple sources. Playwright tests break during refactors not because of selector choice alone but because they couple to DOM structure and CSS classes rather than semantic roles and accessible names [Designing Playwright Tests That Survive UI Refactors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors). At scale, CI triage becomes its own problem: at PostHog's 575K weekly jobs, an AI agent ingests billions of log lines, traces flaky tests to root causes, and opens fix PRs automatically [What CI Actually Looks Like at a 100-Person Team](/reading/2026-04/2026-04-30t195531-what-ci-actually-looks-like-at-a-100-person-team). Despite powerful new static analysis tools, curl's vulnerability data shows no measurable sign yet that open-source projects are approaching zero latent bugs [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Security is not separable from engineering practice. A supply-chain attack embedded payloads in invisible Unicode variation-selector characters inside 151 npm and GitHub packages — undetectable by code reviewers and static analysis tools while remaining executable at runtime [Supply-chain attack using invisible Unicode code](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). YAML's Norway problem, where the country code NO parses as boolean false, persists in PyYAML and libyaml in 2026 despite the spec fix landing over a decade ago — a reminder that configuration formats carry silent failure modes that survive long after their causes are documented [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem).

The human side of engineering gets its own set of recurring failures. Algorithm interviews test a narrow, trainable skill that weakly correlates with production performance; real engineering means reading tradeoffs and shipping systems that handle messy, unbounded inputs [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). Senior developers often fail to translate expertise into business terms because they communicate in complexity management while the rest of the organization thinks in uncertainty reduction [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise). The most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — is tacit and cannot be fully transferred to AI or documented; it requires apprenticeship [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Onboarding practices frequently disguise dysfunction as agile process, setting new hires up to fail while making the problem invisible to management [Your Onboarding Is a Hazing Ritual and You Call It Agile](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile).

Hard-won production rules recur independently of any framework: roll back before debugging, treat every external dependency as a future outage, and assume failure at the boundaries of your system [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Distributed tracing makes those boundaries visible in unfamiliar codebases by exposing span anatomy, critical-path analysis, and N+1 staircase patterns traceable back to specific code [How to read distributed traces when you didn't write the code](/reading/2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code).

AI's role in engineering practice runs through nearly every source in tension. Full agentic coding workflows accelerate skill atrophy, invert developer priorities toward speed over understanding, and create vendor dependency [Agentic Coding is a Trap](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap). AI lowers the cost of producing code but not the cost of owning it — LLMs can generate polished technical debt faster than any individual engineer [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). The real bottleneck was never code volume but organizational coherence: shared context, specification clarity, and management alignment — and agents amplify whatever misalignment already exists [The bottleneck was never the code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code). Agentic coding has simultaneously made formal verification more cost-effective and more urgently necessary, because the volume of generated code outpaces what tests alone can validate [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).
