---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated judgment, discipline, and taste that
  separates code that works from code that holds — visible in decisions about
  structure, communication, tooling, and when to stop adding complexity.
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
compiled_at: '2026-07-15T10:05:59.927Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8914
    output_tokens: 1538
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
  cost_usd: 0.049812
---
Engineering craft is not a single practice but a posture: the disposition to treat technical decisions as consequential even when no one is watching, and to resist the pull toward the expedient at the expense of the durable.

One consistent expression of craft is the willingness to work within constraints precisely rather than around them loosely. The step-by-step optimization of Rust's `image-rs` blur function [5× faster fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) — replacing float arithmetic with integer accumulators and reciprocal multiplication — is a small but clean example: the problem is bounded, the approach is reasoned, and the improvement is measurable. The same precision appears in the CSS work collected here. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that using container queries and fluid `clamp()` values instead of viewport breakpoints is not just a stylistic preference but a structural one: component-first layouts that respond to their own context are more correct by design. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) extends the same reasoning to type, covering the math behind the preferred value and the accessibility tradeoffs of `rem` vs `px` — craft as applied mathematics.

Craft at the design level means choosing the right boundaries for responsibility. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a widespread misreading: SRP is about cohesion under a single accountable reason to change, not about atomizing code into pieces so small they lose meaning. The same argument surfaces in [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to), where component inputs that balloon to dozens of props are a symptom of poor encapsulation, and the fix is decomposition into directives and sub-components that each own their concern. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the same point from the opposite direction: small interfaces hiding large implementations reduce complexity for everyone — human readers and LLMs alike. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) applies this to file organization: colocating by domain rather than by technical layer makes the codebase's intent legible without spelunking.

Craft also shows up in how engineers read systems they didn't build. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) both frame code comprehension as a deliberate skill with tools and sequences: churn hotspots, bus-factor queries, and stakeholder interviews before any static analysis. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) turns code review itself into a craft problem, using jj's commit model to make incremental progress reviewable and persistent rather than held in mental state.

Judgment about when to stop is equally central. [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) identifies three constraints — attention thresholds, discrete capacity increments, pipeline backpressure — that can neutralize even order-of-magnitude improvements. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) applies a cost-ratio lens: bloat and over-engineering are waste, and craft includes knowing what not to build. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the same point from the hiring side: the skills tested in algorithm interviews are trainable but weakly predictive of the judgment that real production work demands.

The AI era has raised the stakes on craft without changing its definition. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs lower the cost of producing code but not of owning it — taste and judgment matter more when polished-looking technical debt is easy to generate. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) puts the floor at safety-critical systems, where shipping unreviewed generated code is not a tradeoff but a failure of professional responsibility.

Finally, craft has a social and transmissible dimension. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that the most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — cannot be articulated fully and survives only through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related failure mode: craft that cannot be translated into the language of uncertainty reduction becomes invisible to the rest of the organization. Craft, then, is not only about what you build but about whether what you know can outlast you.
