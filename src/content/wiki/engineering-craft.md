---
title: Engineering craft
summary: >-
  Engineering craft is the judgment, discipline, and taste that separate code
  that merely works from code worth owning — a concern that runs through
  technical decisions at every level, from shell aliases to system architecture.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
  - >-
    2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-02t094735-approaching-zero-bugs
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - 2026-05/2026-05-30t210309-90percent-of-the-t-distribution
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - 2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams
  - 2026-06/2026-06-13t081411-signals-the-push-pull-based-algorithm
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
  - 2026-06/2026-06-21t231758-nasa-technical-report-20070005136
  - 2026-06/2026-06-22t000701-the-idiot-index-for-code
  - 2026-06/2026-06-22t001042-how-to-leave
  - 2026-06/2026-06-22t170134-if-your-product-is-great-it-doesnt-need-to-be-good
  - 2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring
  - >-
    2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests
compiled_at: '2026-06-23T23:19:52.531Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7533
    output_tokens: 1374
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
  cost_usd: 0.043209
---
Engineering craft is the accumulated set of practices, dispositions, and skills that let engineers make good decisions in the absence of explicit rules. It shows up in the smallest choices — how a shell script handles errors, whether a component accepts twelve inputs or two — and in the largest: how a system is structured so it can be reasoned about and changed.

One through-line in the sources here is the gap between measurable proxies for skill and actual craft. Algorithm interviews test a narrow, trainable skill that correlates weakly with production performance; real engineering requires reading tradeoffs, shipping incrementally, and handling messy unbounded inputs [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). The systemic decay of tech hiring compounds this — shared interviewer pools, error-asymmetry ratchets, and Goodhart's Law overfit candidates to the process rather than the work [The systemic decay of tech hiring](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring).

Craft also lives in the parts of expertise that resist documentation. Michael Polanyi's concept of tacit knowledge applies directly: the most valuable engineering skill — pattern recognition, design intuition, unwritten conventions — cannot be fully articulated, only transmitted through apprenticeship [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Senior developers who fail to communicate their value often do so because they speak in complexity management while the rest of the business thinks in uncertainty reduction [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise).

At the level of individual code decisions, craft means preferring deep modules — small interfaces hiding large implementations — over shallow wrappers that expose complexity rather than containing it [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). It means understanding that Single Responsibility is about cohesive grouping under one accountable concern, not relentless decomposition into micro-classes that become harder to track than the original monolith [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). An "idiot index" applied to code follows the same logic: excessive abstraction and indirection are signals of low-value complexity, not sophistication [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code).

Craft extends to tooling literacy. Shell fluency — Readline bindings, history search, script safety flags — reduces friction and prevents entire classes of runtime errors [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your). Git log patterns that surface churn hotspots, bus factor, and bug clusters before opening a single file are how experienced engineers orient to unfamiliar codebases [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). Auditing a legacy Rails application starts with stakeholder interviews about fear and knowledge gaps, not automated tooling [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week).

AI tools shift the economics of craft without eliminating its demands. AI lowers the cost of producing code but not the cost of owning it; taste and judgment still determine whether generated code is an asset or accelerated technical debt [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Shipping AI-generated code without review or testing — vibe coding — causes skill atrophy and is incompatible with safety-critical systems [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Even static analysis at scale has not yet produced a measurable reduction in latent bugs in mature open-source projects like curl [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Craft is not perfectionism. Hard-won production rules — roll back before debugging, treat every external dependency as a future outage — reflect pragmatic discipline, not idealism [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Building an interpreter from scratch, working through every token, parse rule, and bytecode instruction, is one of the clearest paths to internalizing what the machine is actually doing [munificent/craftinginterpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters). That kind of foundational depth is what distinguishes engineers who can reason about a system from engineers who can only operate it.
