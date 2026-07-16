---
title: Engineering craft
summary: >-
  Engineering craft is the set of accumulated judgment, discipline, and tacit
  knowledge that distinguishes sustainable software from code that merely
  compiles — spanning module design, tooling, communication, and the willingness
  to push back on shortcuts.
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
compiled_at: '2026-07-16T11:35:48.871Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9063
    output_tokens: 1454
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
  cost_usd: 0.048999
---
Craft in software engineering is not a single skill but a disposition toward the work: the accumulated habit of asking whether a decision will hold, whether the abstraction is honest, whether the shortcut costs more than it saves. The sources here converge on that disposition from many angles.

Module and component design is one of the most concrete arenas where craft shows. The case for deep modules — small interfaces concealing large implementations — is that complexity is hidden rather than spread [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The same logic appears in Angular component design: components bloated with dozens of inputs are a symptom of skipped decomposition, and the fix is moving concerns into directives and sub-components so each piece has a coherent, bounded API [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to). Codebase organization mirrors this — domain verticals outperform horizontal technical layers because colocation by functionality keeps related code coherent and discoverable [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase). The Single Responsibility Principle, when properly understood, reinforces cohesion rather than mandating one-function-per-file granularity; over-granularizing classes violates the cognitive simplicity the principle was designed to produce [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle).

Craft also lives in knowing when not to add complexity. Jim Nielsen's argument that separate HTML pages unified by CSS view transitions are simpler than JavaScript-powered in-page interactions [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) runs parallel to the case for replacing viewport breakpoints with intrinsic layouts and container queries [Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints). Both favor using the medium's inherent capabilities over layering workarounds. The idiot index framing makes the same point economically: bloated, over-engineered code signals low-value work [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code).

At the tooling and workflow level, craft means knowing the environment well enough to move efficiently through it. Shell shortcuts, history search, and script safety flags are the kind of accumulated knowledge that quietly multiplies output [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters). Git log commands that surface churn hotspots, bus factor, and bug clusters let an engineer understand a codebase's risks before reading a single file [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). Reviewing large changes by duplicating commits and squashing files into an empty parent preserves review progress in version control rather than in mental state [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu).

A recurring theme is the gap between apparent and actual quality. AI lowers the cost of producing code but not the cost of owning it; taste and judgment still govern whether generated code is technical debt or genuine value [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Shipping AI-generated code without review is categorically incompatible with safety-critical systems [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). Even strong static analysis tools have not yet produced a measurable reduction in latent bugs in mature open-source projects [Approaching Zero Bugs?](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs).

Craft also means communicating the work accurately. Architecture diagrams fail when they overload a single view, leave nodes unlabeled, or rely on AI generation without review [7 More Common Mistakes in Architecture Diagrams](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams). Senior engineers systematically miscommunicate by framing everything as complexity management when stakeholders think in terms of uncertainty reduction [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise).

Finally, much of what constitutes craft cannot be articulated. Pattern recognition, design intuition, and unwritten conventions are structurally tacit — they resist codification and can only be transmitted through apprenticeship [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Algorithm interviews test a narrow trainable skill that weakly correlates with this kind of knowledge; real engineering requires reading tradeoffs, shipping incrementally, and handling messy real-world inputs [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work). The gap between interview performance and production judgment is one of craft's most durable tensions.
