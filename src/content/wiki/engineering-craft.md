---
title: Engineering craft
summary: >-
  The practices, judgment, and tacit knowledge that separate competent code
  production from durable software — covering system design, tooling discipline,
  code quality, and the human transmission of expertise.
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
compiled_at: '2026-07-19T14:37:05.638Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9433
    output_tokens: 1703
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
  cost_usd: 0.053844
---
Engineering craft is the collection of skills, habits, and judgment calls that determine whether a codebase remains coherent and maintainable over time, as opposed to merely functioning at the moment of shipping. The sources gathered here address craft from multiple angles: system design principles, concrete tooling practices, the limits of testing, and the largely uncodifiable knowledge that experienced engineers carry.

At the design level, several pieces argue that complexity is the central adversary. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) makes the case that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs, contrasting deep Go modules against shallow ones that expose every internal seam. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) corrects a common misreading of SRP: the principle calls for cohesive grouping under a single accountable concern, not for atomizing classes until they each do exactly one thing. Over-granularization violates the cognitive simplicity SRP was meant to provide. [A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same logic to component APIs, arguing that bloated input lists should be refactored into composites so each concern stays encapsulated.

Code organization extends beyond class boundaries. [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) argues for grouping frontend code by domain vertical rather than by technical layer, because colocation by functionality keeps related code discoverable and cohesive. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) approaches the same problem from the opposite direction: bloated, over-engineered code is a signal of low-value work, analogous to a manufacturing process with a high ratio of finished-product cost to raw-material cost.

Tooling discipline is a recurring theme. [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) covers Readline bindings, history search, brace expansion, and script safety flags that reduce friction in daily work. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) shows how churn hotspots, bus factor, and bug cluster data from git log can diagnose a codebase's risks before reading a single file. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) demonstrates a workflow for reviewing large pull requests by duplicating the change and squashing reviewed files into a parent commit, persisting progress without cognitive overhead. [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) adds a stakeholder-first audit process: surface fear and knowledge gaps in interviews, read the Gemfile and schema before running any tools, and deliver a one-page triage.

Quality and correctness deserve their own thread. [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses curl's vulnerability data to show that even powerful AI-assisted static analysis has not yet produced a measurable reduction in latent bugs in open-source projects. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) frames unreviewed AI-generated code as reckless and categorically unacceptable in safety-critical systems. [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) adds that AI lowers the cost of producing code but not the cost of owning it; LLMs can generate polished technical debt faster than any individual engineer. [Code Smells When You Get AI to Write Your Frontend Tests](/reading/2026-06/2026-06-22t185420-code-smells-when-you-get-ai-to-write-your-frontend-tests) catalogs over twenty patterns AI tools introduce in generated tests, including over-mocking, testing only happy paths, and writing tests that match a buggy implementation rather than intended behavior.

The knowledge transmission problem sits underneath all of this. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi's philosophy to argue that the most valuable engineering expertise, pattern recognition, unwritten conventions, and design intuition, is structurally inaccessible to AI and can only be transmitted through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related gap: senior engineers speak in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction, and bridging that translation is the real challenge of software expertise. [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) makes the point concrete: algorithm interview performance weakly correlates with production performance because real engineering requires reading tradeoffs and shipping incrementally against messy, unbounded inputs.

Finally, craft includes knowing when to keep things simple. [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms) argues that replacing JS-powered in-page interactions with separate linked HTML pages is often simpler to build and maintain. [Your App Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes the same point by reverse-engineering a travel app that delivered plain HTML over HTTP. The 5x speedup in [5x Faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is a reminder that low-level craft, replacing float arithmetic with integer accumulators and division with reciprocal multiplication, still yields order-of-magnitude gains when applied with precision.
