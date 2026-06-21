---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated judgment, discipline, and technique that
  separates code that merely works from systems built to last — spanning
  interface design, tooling, code organization, and the tacit knowledge that
  resists easy transfer.
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
compiled_at: '2026-06-21T18:30:57.882Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 6511
    output_tokens: 1139
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
  cost_usd: 0.036618
---
Engineering craft is not a single practice but a posture: the habit of caring about how things are built, not only whether they ship. The sources collected here touch that posture from many angles, and together they argue that craft is irreducible — neither interview performance nor AI generation is a substitute for it.

At the level of individual technique, craft shows up in deliberate, well-understood choices. [Building a UI without breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) and [modern fluid typography](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) both argue that reaching for a quick viewport breakpoint is the lazy path — intrinsic layouts and `clamp()` values require understanding the underlying math and tradeoffs, but produce CSS that holds together without maintenance exceptions. The same logic applies at the shell: [shell scripting safeguards](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) — knowing your Readline bindings, writing safe scripts with explicit failure flags — reflect the same care applied to a different layer of the stack.

At the level of design principles, craft means organizing code so complexity stays bounded. [Deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce the cognitive load of the whole system. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects the common misreading of SRP: the principle calls for cohesive grouping under one accountable concern, not for atomizing everything into micro-classes. [Angular component composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point concretely — bloated input lists signal missing encapsulation, and the fix is restructuring, not parameterizing harder.

Craft also lives in the knowledge that cannot be written down. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, design intuition, and unwritten conventions are structurally inaccessible to AI tools and can only be transmitted through apprenticeship. [Senior developers communicating expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) frames this differently: the gap between complexity management and uncertainty reduction is a craft problem in itself, one that requires translating deep technical judgment into terms the rest of the organization can act on.

Production experience sharpens craft in ways no curriculum covers. [The unwritten laws of software engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) collects rules — roll back before debugging, treat every external dependency as a future outage — that only become legible after seeing systems fail. [Approaching zero bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) adds humility: even with powerful static analysis, curl's data shows no measurable reduction in latent bugs, which means the craft of verification is still an open problem.

The AI era makes craft more consequential, not less. [When code is cheap, does quality still matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) answers directly: AI lowers the cost of producing code but not the cost of owning it. [The perils of vibe coding](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) goes further, arguing that shipping AI-generated code without review causes skill atrophy and is incompatible with safety-critical work. Craft, in this framing, is what stands between fast generation and responsible ownership.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents craft in its most deliberate form: a full book and two complete interpreter implementations where the prose and the code are woven together, treating the act of building as inseparable from the act of explaining.
