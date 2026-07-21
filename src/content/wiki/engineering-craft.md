---
title: Engineering craft
summary: >-
  The durable practices that separate functional code from well-built systems:
  design judgment, tacit knowledge, conceptual clarity, and the discipline to
  own what you ship long after the initial commit.
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
  - 2026-06/2026-06-30t173037-a-return-to-two-pizza-culture
  - 2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter
  - 2026-07/2026-07-03t044356-project-gutenberg-document-33283
  - 2026-07/2026-07-04t141323-the-vertical-codebase
  - 2026-07/2026-07-07t170607-the-software-engineering-war
  - 2026-07/2026-07-09t070315-the-submarine
  - >-
    2026-07/2026-07-13t233457-playwright-on-github-actions-the-setup-that-actually-runs
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
  - >-
    2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters
  - 2026-07/2026-07-16t043206-i-stopped-destructuring-everything
  - >-
    2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent
  - 2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time
compiled_at: '2026-07-21T05:03:22.110Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9433
    output_tokens: 1555
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
  cost_usd: 0.051624
---
Engineering craft is the difference between code that works and code that holds up. It shows up in small decisions — whether to destructure a variable or keep the object reference intact [I stopped destructuring everything](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) — and in architectural ones, like whether to organize a codebase by technical layer or by domain vertical [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase). The through-line across these choices is intentionality: making decisions for reasons that survive the moment.

One persistent craft problem is knowing what a principle actually means. The Single Responsibility Principle is routinely misread as "do one thing," producing over-fragmented code that's harder to reason about than the "monster" it replaced [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). The same trap appears in Angular: components bloated with dozens of inputs signal that composition was never considered, and refactoring toward directives and sub-components restores encapsulation [A Better way to build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to). Deep modules — small interfaces hiding large implementations — encode the same insight more generally; they reduce the cognitive surface area that any reader, human or LLM, has to navigate [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules).

Craft also means understanding what you're building on. YAML's Norway problem — the country code NO parsing as false through at least 2026 across widely used libraries — exists because implementers shipped without understanding the spec, and it persists because fixing a parse behavior breaks compatibility [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem). TCP_NODELAY tells a similar story: Nagle's algorithm silently kills latency in modern datacenters because developers don't know the Nagle/delayed-ACK interaction exists [It's always TCP_NODELAY. Every damn time.](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time). Unwritten conventions like "roll back before you debug" and "every external dependency is a future outage" encode the same hard-won knowledge [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering).

Performance work is a craft domain where the gap between apparent and real skill is especially visible. A 5.9x speedup on Rust's fast_blur function came from replacing float arithmetic with integer accumulators and division with reciprocal multiplication — the kind of targeted, measurable improvement that requires understanding the hardware beneath the abstraction [5× faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs). But craft also means knowing when performance improvements don't matter: attention thresholds, discrete capacity increments, and pipeline backpressure can make even order-of-magnitude gains irrelevant in practice [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter).

AI tools complicate the craft picture without dissolving it. Generating code is cheap; owning it is not. LLMs can produce polished technical debt faster than any individual engineer, which means taste and judgment matter more, not less [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). AI-generated tests introduce systematic patterns — over-mocking, happy-path-only coverage, tests written to match a buggy implementation — that only a reviewer with genuine craft knowledge will catch [Code Smells when you get AI to write your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). And "vibe coding" — shipping AI output without review — is categorically incompatible with safety-critical systems [The Perils of "AI" to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Even curl's vulnerability data shows no measurable signal that AI-assisted static analysis is closing the gap on latent bugs [Approaching zero bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Much of craft is tacit. Pattern recognition, design intuition, and the feel for when something is wrong are structurally hard to articulate — and that knowledge is transmitted through apprenticeship, not documentation [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Algorithm interview performance weakly correlates with this kind of practical skill; real engineering requires reading tradeoffs and shipping systems that handle messy, unbounded real-world inputs [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). The craft also requires communicating: senior developers who frame everything as complexity management rather than uncertainty reduction lose the room [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise). Craft, finally, is built through exposure to complete, well-constructed systems — which is part of what makes a resource like "Crafting Interpreters," with its two full interpreter implementations woven into prose, a useful reference point [munificent/craftinginterpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters).
