---
title: Engineering craft
summary: >-
  The judgment, discipline, and tacit skill that separate engineers who
  understand their systems from those who merely produce output — increasingly
  pressured by AI tooling that generates code faster than it can be understood.
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
  - 2026-08/2026-08-03t025839-dont-be-a-meat-proxy
  - >-
    2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms
  - >-
    2026-08/2026-08-29t130644-reducing-zods-memory-footprint-by-an-order-of-magnitude
compiled_at: '2026-08-30T05:52:42.127Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9928
    output_tokens: 1623
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
  cost_usd: 0.054129
---
Engineering craft names the cluster of skills, habits, and judgment that distinguish engineers who understand their systems from those who simply ship output. It spans technical depth, design taste, operational discipline, and the ability to communicate tradeoffs — none of which are captured by the algorithm puzzles used in interviews [Learn Algorithms for Interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work).

At the technical level, craft shows up in small, concrete choices. Keeping the original object reference when destructuring would lose useful context [I stopped destructuring everything](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything). Enabling TCP_NODELAY because Nagle's algorithm silently kills latency in modern datacenter environments [It's always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time). Replacing float arithmetic with integer accumulators to achieve a 5.9x speedup without changing the algorithm's logical structure [5x faster fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs). These are not the moves of someone following a checklist; they require understanding what the code is actually doing.

Design craft operates at the module and component level. Deep modules, with small interfaces hiding large implementations, reduce the cognitive surface that both humans and LLMs must hold in working memory [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The Single Responsibility Principle, correctly understood, means cohesive grouping under a single accountable responsibility — not atomizing every behavior into its own class [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Angular components bloated with dozens of inputs signal the same failure: features that belong in directives and sub-components have been packed into a single surface, making the API unreadable [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to). Similarly, organizing a frontend codebase by domain verticals rather than technical layers keeps related concerns colocated and discoverable [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase).

Operational craft means knowing when to act and when to stop. Roll back before debugging. Treat every external dependency as a future outage [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Understand that even order-of-magnitude performance improvements can fail to change outcomes when attention thresholds, discrete capacity increments, or pipeline backpressure absorb the gain before it reaches the user [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). Use git history as a diagnostic instrument before reading a line of code [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code).

Tacit knowledge is the hardest part of craft to transmit. The most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be transferred through apprenticeship [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Senior developers also struggle to communicate this expertise to the rest of the business because they frame problems in terms of complexity management while stakeholders think in terms of uncertainty reduction [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise).

AI tooling puts craft under pressure from two directions. It lowers the cost of producing code without lowering the cost of owning it, so taste and judgment matter more, not less [When Code Is Cheap, Does Quality Still Matter](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). And shipping AI-generated code without review causes skill atrophy and is categorically incompatible with safety-critical systems [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Relaying raw AI output without understanding it shifts cognitive work onto the recipient and adds no value [Don't be a meat proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy). The practical response is strong CI/CD, code ownership, and engineering discipline — using AI as an amplifier rather than a replacement for understanding [Use Your Brain](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms).

Craft also shows in what engineers deliberately choose not to build. A travel app that was really just plain HTML over HTTP, inflated into an Android APK, is the engineering equivalent of a high idiot index — the ratio of complexity introduced to value delivered [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code), [Your App Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you). The same instinct drives replacing JS-powered interactions with separate linked HTML pages where that is genuinely simpler [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms), or using fluid CSS clamp values and container queries instead of adding another breakpoint [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints). Craft is partly the discipline of not adding complexity you will have to maintain.
