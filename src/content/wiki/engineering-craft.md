---
title: Engineering craft
summary: >-
  The habits, judgment, and tacit knowledge that separate adequate code from
  enduring software — spanning module design, incremental delivery,
  communication, and the discipline to resist both unnecessary complexity and
  reckless shortcuts.
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
compiled_at: '2026-06-22T07:19:42.344Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6957
    output_tokens: 1216
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
  cost_usd: 0.039111
last_source_added: '2026-07-04T21:13:23.217Z'
---
Engineering craft is not a single technique but a cluster of dispositions that show up consistently across different layers of the stack. It includes knowing when to reach for a tool and when the tool is the problem, how to structure code so future readers can reason about it, and how to communicate what you built and why.

Module and component design is a recurring site of craft decisions. The principle of deep modules, as described in [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules), is that a small, stable interface hiding a large implementation reduces cognitive load for both humans and LLMs working with the code later. The same logic appears in [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), which argues that components bloated with dozens of inputs should be decomposed through the Composite Components pattern so each concern stays encapsulated. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds a corrective: SRP does not mean atomizing everything into micro-units, it means grouping behaviors under a single accountable concern. Over-granularizing violates the cognitive simplicity the principle was designed to provide.

Craft also shows up in how engineers approach known-hard problems rather than inventing complexity. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that intrinsic layouts, container queries, and `clamp()` values are usually a better fit for component-first UIs than viewport breakpoints, because they encode intent more precisely. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) shows the same discipline applied to type: derive scale mathematically, handle accessibility edge cases with `rem` units, and reach for fluid solutions when the design genuinely warrants them.

On the backend, [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) is actually about the divide between interview performance and real work. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the case directly: algorithm tests measure a narrow, trainable skill that correlates weakly with production performance. Real engineering requires reading tradeoffs and shipping systems that handle messy, unbounded real-world inputs.

Craft in the age of AI-generated code raises new stakes. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that LLMs lower the cost of producing code but not of owning it — taste and judgment remain necessary because AI can generate polished technical debt faster than any individual engineer. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, arguing that shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical systems.

Much craft knowledge is tacit rather than explicit. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi to argue that pattern recognition, design intuition, and unwritten conventions cannot be fully articulated and can only be transmitted through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) connects this to organizational friction: senior engineers think in terms of complexity management while the business thinks in uncertainty reduction, and the gap between those framings makes expertise invisible.

Finally, craft involves operational judgment accumulated from failure. [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills rules like rolling back before debugging and treating every external dependency as a future outage, lessons that only register after real incidents. The [Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) offers a complementary heuristic: bloated, over-engineered code signals low-value work, just as inflated manufacturing costs signal poor process design. Good craft keeps the ratio honest.
