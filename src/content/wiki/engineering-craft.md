---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment-driven practices — in design, code
  structure, tooling, and communication — that separate durable, maintainable
  work from code that merely ships.
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
  - 2026-08/2026-08-31t131721-the-i-dont-know-claude-wrote-this-pandemic
compiled_at: '2026-11-24T03:56:17.314Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 10087
    output_tokens: 1617
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
  cost_usd: 0.054516
---
Engineering craft names the difference between code that works and work that holds up. It is the accumulation of judgment calls: when to simplify rather than generalize, when to reach for a proven primitive rather than a custom abstraction, when a clever optimization is worth the complexity it adds. No single source defines it, but the sources collected here collectively trace its contours.

At the structural level, craft shows up in module and component design. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs — the sign of a well-crafted abstraction is that callers rarely need to look inside it. The same logic surfaces in [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), which shows how component APIs bloated with dozens of inputs should be refactored into composable directives, each encapsulating a single concern. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds a corrective: SRP is about cohesive accountability, not about atomizing code into fragments so fine they become impossible to reason about.

Craft at the system level involves knowing what not to build. [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) makes the case that plain linked HTML pages with CSS view transitions are often simpler and more maintainable than JS-powered in-page interactions. [Your 'App' Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) extends the point: an Android app delivering plain HTML over HTTP is not craft, it is accretion. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) frames over-engineering as low-value work by definition — the ratio of complexity to actual utility is the metric.

Craft also lives in CSS. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that intrinsic layouts, container queries, and fluid values replace viewport breakpoints more cleanly in component-first architectures. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) shows the specific math and accessibility considerations behind fluid type — craft here is knowing when the fluid approach is better than discrete responsive steps, and knowing how rem units can silently break user preferences.

At the implementation level, craft is visible in how engineers handle real constraints. [5× Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates step-by-step optimization — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9× speedup — where each change is justified by measurement, not intuition. [It's Always TCP_NODELAY](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) argues that understanding the interaction between Nagle's algorithm and delayed ACKs is the kind of low-level operational knowledge that separates engineers who debug to the root from those who grope in the dark.

Craft is not just about production code. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) both treat code reading and codebase diagnosis as skills to cultivate deliberately — before writing a line, you orient by understanding churn, fear, and knowledge gaps. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) applies the same principle to code review, treating it as a first-class workflow problem rather than a checkbox.

AI is now the pressure test for craft. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues the answer is yes: LLMs generate polished technical debt faster than any individual engineer, so taste and judgment matter more, not less. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, arguing that shipping AI-generated code without review is reckless — especially in safety-critical systems. [Use Your Brain: Engineering Standards in the Age of LLMs](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) calls for CI/CD discipline and code ownership as the scaffolding that lets AI serve as an amplifier. [Don't Be a Meat Proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) makes the most direct statement: relaying raw AI output without synthesizing it surrenders the cognitive work that constitutes professional judgment.

Finally, craft includes communication. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) argues that the gap between engineering vocabulary and business vocabulary — complexity management versus uncertainty reduction — is itself a craft problem. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) holds that the most valuable engineering knowledge is structurally uncodifiable and can only be transmitted through apprenticeship — which means craft is, by definition, something you build over time, not something you generate.
