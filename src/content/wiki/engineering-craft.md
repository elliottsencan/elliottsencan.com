---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated judgment, discipline, and taste that
  separates functional code from maintainable systems — visible across decisions
  about module design, communication, tooling, and the cost of owning what you
  build.
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
compiled_at: '2026-06-26T02:56:37.961Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7533
    output_tokens: 1242
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
  cost_usd: 0.041229
---
Engineering craft is not a single technique but a posture: the difference between code that works and code that can be understood, extended, and trusted. The sources collected here approach that gap from many angles, and together they sketch the texture of what craft actually demands in practice.

At the module level, craft means hiding complexity behind well-chosen boundaries. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces concealing large implementations reduce cognitive load for both humans and LLMs. The same principle appears in component design: [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) shows how components bloated with dozens of inputs should be decomposed using the Composite Components pattern so each concern stays encapsulated. And [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP: it means cohesive grouping under one accountable responsibility, not fragmentation into ever-smaller units.

Craft also lives in how you read systems before changing them. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) describes using churn hotspots and bus-factor analysis to diagnose risk before opening a file. [How I Audit a Legacy Rails Codebase in the First Week](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) extends this to stakeholder interviews and schema reads before running any tooling. Both treat comprehension as a precondition for safe change.

On the production side, craft is inseparable from caution. [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills hard-won rules like rolling back before debugging and treating every external dependency as a future outage. [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's vulnerability data to show that even with powerful AI-assisted static analysis, there is no measurable sign yet that latent bug counts are falling — a useful corrective to optimism about tooling.

AI lowers the cost of writing code but not the cost of owning it. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs can produce polished technical debt faster than any individual engineer, so taste and judgment remain the scarce resource. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) sharpens this: vibe coding without review or testing causes skill atrophy and is categorically incompatible with safety-critical systems.

Craft also includes knowing what is worth optimizing at all. [5x Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) demonstrates disciplined low-level optimization — replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to achieve a 5.9x speedup. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) offers the inverse lens: bloated, over-engineered code signals low-value work, the same way inflated manufacturing costs do.

Finally, craft has a communication dimension that is easy to undervalue. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) observes that senior engineers talk in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction — and that bridging this gap is the real challenge of software expertise. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) goes further, drawing on Polanyi to argue that the most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI and can only pass through apprenticeship.

Across all of these, the throughline is the same: craft is the discipline of making choices whose costs are visible, whose interfaces are honest, and whose systems remain navigable by the next person who has to work in them.
