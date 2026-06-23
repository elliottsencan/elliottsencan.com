---
title: Engineering craft
summary: >-
  Engineering craft spans the habits, judgment, and tacit knowledge that
  separate durable software from code that merely ships — covering design
  principles, tooling discipline, communication, and the limits of automation.
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
compiled_at: '2026-06-23T00:05:06.818Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7190
    output_tokens: 1509
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
  cost_usd: 0.044205
---
Engineering craft is the set of practices, instincts, and standards that govern how software gets built, not just whether it builds at all. It shows up in small decisions — how a shell script handles failure, how a component exposes its API — and in large ones, like whether a rollback beats a late-night debug session.

At the level of code structure, several sources converge on the same insight: complexity lives in interfaces, not implementations. The argument for deep modules — small surfaces hiding large, well-tested behavior — holds that shallow wrappers spread cognitive load across a codebase rather than containing it [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The Single Responsibility Principle points in the same direction when read correctly: it calls for cohesive groupings under a single accountable owner, not for atomizing every behavior into its own file [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Angular components bloated with dozens of inputs make the same mistake from the component side — the fix is composition, directives, and clean sub-component boundaries [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to).

Craft also lives in tooling fluency. Knowing shell Readline bindings, brace expansion, and script safety flags (`set -euo pipefail`) is the difference between a fragile one-liner and a repeatable process Shell Tricks That Actually Make Life Easier. Git log commands run before opening a single file can surface churn hotspots, bus-factor risk, and firefighting patterns in a new codebase before any code is even read [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). Jujutsu's review workflow — duplicating a change and squashing files in as they are reviewed — turns code review into a first-class, checkpointable activity rather than a cognitive sprint [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu).

On production discipline, hard-won rules accumulate into a recognizable posture: roll back before debugging, treat every external dependency as a future outage, and never deploy on a Friday [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Knowing when to prefer a static HTML page over JavaScript interactions reflects the same instinct — favor the simpler, more durable mechanism wherever it suffices [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms).

Algorithm interview performance, as Fagner Brack argues, tests a narrow, trainable skill that predicts little about someone's ability to navigate real tradeoffs, ship incrementally, or handle messy unbounded inputs [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). The deeper skill is harder to articulate — it is the tacit knowledge Michael Polanyi described: pattern recognition, design intuition, and unwritten conventions that can only be transmitted through apprenticeship and practice [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you).

AI tooling complicates the picture without dissolving it. Code that looks clean can still be well-formatted technical debt; lowering the cost of producing code does not lower the cost of owning it [When Code Is Cheap, Does Quality Still Matter](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Shipping AI-generated code without review or testing — vibe coding — atrophies exactly the judgment that craft is built from [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Even with powerful static analysis, curl's bug-rate data shows no measurable trend toward zero latent defects [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs). Formal verification is one response: agentic coding may actually lower the cost of writing proofs while creating new demand for tools that go beyond what tests provide [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming).

Craft communicates as well as builds. Architecture diagrams fail when they omit labels, overload a single view, or rely on animation to substitute for clarity [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams). Senior engineers who speak only in complexity-management terms lose the room; the business thinks in uncertainty reduction, and bridging that gap is part of the work [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise). The idiot index framing captures the inverse signal: when the ratio of engineering effort to delivered value inflates, something has gone wrong in the craft, not just the planning [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code).
