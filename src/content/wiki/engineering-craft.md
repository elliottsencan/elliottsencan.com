---
title: Engineering craft
summary: >-
  Engineering craft is the body of judgment, technique, and tacit knowledge that
  separates code that merely runs from code worth owning — spanning design
  intuition, tooling fluency, communication, and the discipline to resist
  shortcuts.
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
compiled_at: '2026-07-01T04:46:47.925Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 7860
    output_tokens: 1364
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
  cost_usd: 0.04404
---
Engineering craft is not a single skill but a cluster of dispositions: knowing when to optimize and when to stop, how to structure code so the next reader has fewer things to hold in mind, and how to communicate decisions to people who don't share your mental model. The sources here illuminate different facets of that cluster without contradiction.

At the level of individual technique, craft shows up in the choices made before code is written. [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that modern layout should use intrinsic sizing, container queries, and `clamp()` values rather than viewport breakpoints — the point being that the right primitive eliminates an entire category of edge cases. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) makes the same move in typography: derive the preferred value mathematically from your constraints rather than maintaining a grid of breakpoint overrides. Choosing the right abstraction is craft; patching around the wrong one is not.

At the level of system design, [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case that small interfaces hiding large implementations reduce cognitive load for humans and LLMs alike. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds the corrective that SRP is about cohesion under a single accountable responsibility, not about fragmenting code into the smallest possible units. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same thinking to component APIs: a component bloated with dozens of inputs has the wrong shape, and the fix is decomposition, not configuration.

Craft also lives in the unglamorous work of tooling fluency. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is about Readline shortcuts and script safety flags — small investments that compound. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) treats git log as a diagnostic instrument for codebase health before a line of source is read. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how version-control workflow can be engineered to make review sustainable rather than just possible. And [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) models the deeper end of the spectrum: understanding a system well enough to build it from scratch.

Craft also means knowing the limits of a tool. [YAML? That's Norway Problem](/reading/2026-05/2026-05-18t113714-yaml-thats-norway-problem) traces how a parser quirk became a persistent source of silent failures across widely-used libraries. [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) maps the failure modes of visual communication. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) offers a heuristic: when the ratio of complexity to delivered value is high, something in the design went wrong.

The AI dimension of craft is contested. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs lower production costs but not ownership costs, so taste and judgment matter more, not less. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) warns that accepting generated code without review atrophies the skills that made the output legible in the first place. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) frames this structurally: the most valuable expertise is pattern recognition and design intuition that cannot be fully articulated, and therefore cannot be offloaded.

Finally, craft requires communicating what you know. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) points out that engineers speak in complexity terms while the rest of the business thinks in uncertainty terms — and that translation is a craft skill in itself. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws the contrast cleanly: interview performance measures a narrow, trainable skill; production engineering requires reading tradeoffs and shipping incrementally under real-world conditions.
