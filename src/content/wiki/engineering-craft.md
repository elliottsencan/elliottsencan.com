---
title: Engineering craft
summary: >-
  Engineering craft is the set of skills, habits, and judgment that separate
  code that works from code that holds up — spanning design principles, tooling
  fluency, performance reasoning, and the ability to communicate what you know.
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
compiled_at: '2026-08-11T05:17:45.091Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9759
    output_tokens: 1942
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
  cost_usd: 0.058407
---
Engineering craft names the practical wisdom accumulated through building and maintaining real systems. It is distinct from knowing algorithms or frameworks; it concerns the decisions made after the syntax compiles and before the system fails in production.

The most persistent theme across sources here is that correctness and simplicity are inseparable. ["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that a small interface hiding a large implementation is the fundamental unit of manageable complexity — shallow modules distribute cognitive load across every call site, while deep modules contain it. [Single Responsibility](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) reinforces this: the principle is about cohesive accountability, not atomization. Over-granularizing classes creates more surface area, not less. The Angular component article makes the same point in a framework-specific key: [components bloated with dozens of inputs](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) should be decomposed into directives and sub-components so each concern is encapsulated and the public API stays narrow.

Simplicity at the design level also means choosing the right artifact for the job. [Jim Nielsen's case for lots of little HTML pages](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) and [Dan Q's reversal-engineering of an app back into a webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both arrive at the same place: unnecessary complexity is often an artifact of convention, not requirement. The [vertical codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argument extends this to folder structure — organizing by domain rather than by technical layer keeps related concerns together and makes both human navigation and AI-agent traversal more tractable.

At the CSS layer, craft means reaching for intrinsic mechanisms before imposing extrinsic constraints. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that container queries, fluid `clamp()` values, and container units let components respond to their own context rather than the viewport's, reserving media queries for genuine device-capability signals. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) walks through the arithmetic for converting breakpoint-based type scales into continuous fluid ranges, with accessibility caveats around rem units that matter in practice.

Performance craft is methodical. The [image-rs fast_blur optimization](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) illustrates how replacing floating-point arithmetic with integer accumulators and costly division with reciprocal multiplication yields a 5.9x speedup — not through guesswork but through measurement and targeted substitution. [Colin Breck's piece on when performance gains don't matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) is the necessary counterweight: attention thresholds, discrete capacity increments, and pipeline backpressure mean that even order-of-magnitude improvements sometimes change nothing downstream. Knowing when to optimize and when not to is as important as knowing how.

Tooling fluency is part of craft too. [Shell tricks](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) — Readline bindings, history search, script safety flags — reduce friction at the command line. [Git log commands run before reading any code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) extract churn hotspots, bus factor, and bug clusters from history before opening a single file. [The Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) makes progress on large diffs persistent and inspectable. [Enforcing DB layer ownership via AST analysis](/reading/2026-07/2026-07-15t030225-ban-commitstransactions-using-ast-analysis-and-linters) codifies architectural decisions into automated checks so they survive personnel turnover. Matt Smith's note on [stopping reflexive destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is a smaller example of the same instinct: prefer the form that aids reading over the form that aids writing.

Code quality under AI assistance is a recurring tension. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) and [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) independently arrive at the same point: LLMs lower the cost of generating code without lowering the cost of owning it. Taste and judgment are amplified, not replaced. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) is sharper: shipping AI-generated code without review is incompatible with safety-critical systems and causes skill atrophy in any system. The AI-generated test smells article documents the specific patterns — over-mocking, happy-path-only coverage, tests written to match buggy implementations — that [AI introduces in frontend test suites](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests). Daniel Stenberg's [curl bug-rate data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds empirical grounding: even with powerful AI-assisted static analysis, there is no measurable sign yet that open-source projects are approaching zero latent bugs.

Craft also requires communication. [Senior developers who think in terms of complexity management](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) often fail to translate that into the uncertainty-reduction language the rest of the business uses. The tacit-knowledge essay [drawing on Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) names why the deepest engineering expertise resists documentation: pattern recognition and design intuition are structurally inaccessible to tools and can only transfer through apprenticeship. Architecture diagrams are a concrete communication artifact where craft matters; [seven recurring mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) — unlabeled resources, fan traps, overloaded master diagrams — make diagrams actively misleading rather than clarifying.

[Fagner Brack's argument](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) that algorithm interview skills weakly correlate with production performance lands as a broader claim about craft: what hiring tests for and what work requires are different skills. Real engineering involves reading tradeoffs, shipping incrementally, and handling messy real-world inputs — none of which show up in a whiteboard session.
