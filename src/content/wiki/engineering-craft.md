---
title: Engineering craft
summary: >-
  Engineering craft is the set of dispositions, judgment calls, and hard-won
  practices that separate code that merely works from code that endures —
  spanning module design, tooling fluency, communication, and knowing when to
  resist shortcuts.
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
compiled_at: '2026-08-11T07:55:40.517Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9759
    output_tokens: 1600
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
  cost_usd: 0.053277
---
Engineering craft is not a single skill but a posture toward the work: attending to the things that compound over time rather than the things that pass a check. Several distinct threads run through the sources here, and they are worth naming separately before seeing how they connect.

The first thread is design judgment. ["AI Likes Deep Modules"](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) articulates one of the clearest versions of this: a well-crafted module hides complexity behind a small interface, reducing the cognitive surface that any reader — human or LLM — must hold in mind. ["Single Responsibility, the Distorted Principle"](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) extends the argument by correcting the common misreading of SRP: the principle calls for cohesive grouping under a single accountable responsibility, not for pathological fragmentation into dozens of micro-classes. ["A Better Way to Build Angular Components"](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point at the component level, arguing that a bloated input API signals a design that has not found its boundaries. ["The Vertical Codebase"](/reading/2026-07/2026-07-04t141323-the-vertical-codebase) adds a structural dimension: organizing by domain rather than by technical layer keeps cohesion visible and reduces the friction of navigating a large project.

The second thread is tooling fluency. Shell literacy, version-control workflow, and test infrastructure are not glamorous, but they determine the actual speed and safety of everyday work. ["Shell Tricks That Actually Make Life Easier"](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) catalogs Readline bindings, history search, and script safety flags that most engineers learn late if at all. ["Reviewing Large Changes with Jujutsu"](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows a concrete technique for making large-PR review tractable without cognitive loss. ["The Git Commands I Run Before Reading Any Code"](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and ["How I Audit a Legacy Rails Codebase in the First Week"](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) both argue that reading version history and talking to people before touching code is itself a craft skill, one that prevents misdiagnosis of unfamiliar systems.

The third thread is the gap between production and theory. ["Learn Algorithms for Interviews, Forget Them for Work"](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) puts this directly: algorithmic performance on interview puzzles correlates poorly with the actual work of reading tradeoffs, shipping incrementally, and handling messy real-world inputs. ["The Unwritten Laws of Software Engineering"](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) distills similar lessons from production incidents — roll back before debugging, treat every external dependency as a future outage. ["It's always TCP_NODELAY"](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) illustrates what happens when a theoretically sound default (Nagle's algorithm) survives well past the conditions that justified it; craft includes knowing when to discard received wisdom.

The fourth thread is quality in the age of AI-assisted coding. Several sources converge on a warning that deserves direct statement: AI lowers the cost of generating code but does not lower the cost of owning it. ["When Code Is Cheap, Does Quality Still Matter?"](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) argues that LLMs can produce well-formatted technical debt faster than any individual engineer. ["The Perils of AI to the Software Engineering Profession"](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls vibe coding — shipping AI-generated code without review — categorically incompatible with safety-critical systems. ["Use Your Brain: Engineering Standards in the Age of LLMs"](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) argues for CI/CD discipline and code ownership as the mechanisms that keep AI an amplifier rather than a liability. ["Don't Be a Meat Proxy"](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) makes the point at the human level: relaying raw AI output without understanding it shifts cognitive work to the reader and destroys the value the engineer was supposed to add.

The fifth thread is tacit knowledge and communication. ["The Tacit Dimension"](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi to argue that the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally resistant to articulation and must be transmitted through apprenticeship. ["Why Senior Developers Fail to Communicate Their Expertise"](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) makes the complementary point: senior engineers speak in terms of complexity management while the business thinks in terms of uncertainty reduction, and bridging that gap is itself a craft.

These threads share an underlying premise: craft is what remains when you remove the parts that can be automated, standardized, or interviewed for. It is the judgment to pick the right abstraction, the discipline to review code you did not write, the fluency to reach for the right tool before writing a line, and the honesty to roll back when something is broken.
