---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment, taste, and discipline that separates
  code that ships from code that holds — spanning implementation technique,
  design decisions, communication, and the habits that compound into durable
  systems.
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
compiled_at: '2026-07-09T14:12:29.110Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8403
    output_tokens: 1508
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
  cost_usd: 0.047829
---
Engineering craft resists a clean definition because it spans several layers of practice that rarely appear in job descriptions. At the implementation level it means knowing why a choice works, not just that it does. At the design level it means keeping complexity in check over time. At the human level it means being able to explain what you know to people who measure different things than you do.

The implementation layer shows up clearly in work like the step-by-step optimization of Rust's `image-rs` fast_blur function [5× faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), where replacing float arithmetic with integer accumulators and swapping division for reciprocal multiplication produced a 5.9× speedup. That kind of work requires understanding what the machine is actually doing, not just what the code says. The same precision applies at the CSS layer: [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that intrinsic layouts and fluid `clamp()` values produce more coherent results than viewport breakpoints precisely because they model the actual constraints of the content rather than a handful of device sizes. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) extends that into the math behind fluid type scales, including the accessibility implications of rem units.

Design judgment operates one level up. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case that small interfaces hiding large implementations reduce complexity for humans and LLMs alike, and that shallow modules spread cognitive cost across the entire codebase. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) reinforces this: SRP is about cohesive grouping under one accountable owner, not about atomizing every behavior into its own unit. Over-granularizing violates the very simplicity SRP is meant to provide. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) translates the same principle into component architecture, arguing that bloated input APIs should be refactored into composites so each concern stays encapsulated.

Organization of code at a higher scale matters too. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for domain-vertical organization over technical-layer organization, showing that colocation by functionality improves cohesion and discoverability. [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) captures a different register of craft: the production-hardened habits around rollback, external dependencies, and incident response that only appear after enough failures.

Craft also involves knowing what not to do. [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's vulnerability data to show that even powerful static analysis tools have not measurably reduced latent bugs in open-source projects. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) sharpens this: AI lowers the cost of writing code but not the cost of owning it, and LLMs can generate well-formatted technical debt faster than any individual engineer. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) takes the harder line that shipping AI-generated code without review is categorically incompatible with safety-critical systems.

A persistent challenge is that much engineering craft is tacit. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI and can only be transmitted through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames a related gap: senior engineers think in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and bridging that gap is its own craft. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes this concrete in hiring: algorithm interviews test a narrow trainable skill that weakly correlates with the real work of reading tradeoffs and shipping incrementally against messy real-world inputs.

Finally, craft includes the tooling fluency that removes friction from everyday work. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) covers the underused shell shortcuts that compound over a career. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) offers a concrete workflow for managing cognitive load during large code reviews. And [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) shows how git log archaeology surfaces churn hotspots and bus factor before a single line of logic is read. These habits do not make someone a craftsperson on their own, but their absence is usually visible.
