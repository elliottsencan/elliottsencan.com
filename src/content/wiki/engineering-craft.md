---
title: Engineering craft
summary: >-
  The recurring discipline of writing readable, maintainable, well-reasoned
  software — spanning module design, code clarity, tooling fluency, and the
  judgment to know when good enough is not enough.
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
compiled_at: '2026-08-17T18:44:46.016Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9759
    output_tokens: 1607
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
  cost_usd: 0.053382
---
Engineering craft is the body of judgment, habit, and technique that separates code that works from code that holds up. The sources here span CSS layout, interpreter design, shell fluency, component architecture, static analysis, formal verification, code review workflows, and the human transmission of expertise. Taken together they describe a consistent throughline: craft is not a style preference but a set of commitments that compound over time.

Module design is one of the clearest arenas. [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for humans and LLMs alike, and that shallow modules — those where interface complexity rivals implementation complexity — are the real source of cognitive overhead. [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) extends this: SRP is not a directive to atomize every class but to group behaviors under a single accountable concern. Over-granularizing in the name of SRP produces the same fragmentation deep modules are meant to prevent. [A Better way to build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point at the component level — dozens of inputs is a design smell; the fix is composition and directives, not more inputs.

Readability at smaller scale matters too. [I stopped destructuring everything](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) observes that reflexive destructuring optimizes for writing code over reading it, losing the object reference that carries context. [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) applies Musk's manufacturing heuristic to software: a large ratio of complexity to value is a signal that the engineering work is not adding much. Both arguments cut against local habits that feel clever but obscure intent.

Craft extends to tooling. Shell Tricks That Actually Make Life Easier treats Readline bindings, history search, and script safety flags as fundamentals worth knowing precisely because fluency in the shell eliminates the friction that interrupts deeper thought. [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and [How I Audit a Legacy Rails Codebase](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) show that reading an unfamiliar codebase is itself a craft skill: churn hotspots, bus factor, and schema shape tell you where the risk lives before you open a single file. [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) applies the same discipline to code review, using Jujutsu's commit model to persist incremental review progress in version control.

Quality and correctness are where craft becomes hardest to wave away. [Approaching Zero Bugs](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows that even sophisticated AI-assisted static analysis has not produced a measurable decline in latent bugs in curl's open-source codebase. [Formal Methods and the Future of Programming](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues the opposite direction: agentic coding lowers the cost of writing proofs enough that formal verification becomes newly cost-effective precisely when AI-generated code is widespread. [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) names the failure mode directly: shipping AI-generated code without review or testing is reckless in general and incompatible with safety-critical systems. [When Code Is Cheap, Does Quality Still Matter](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) answers its own question: AI lowers the cost of producing code, not the cost of owning it, so taste and judgment matter more than before.

Craft also requires transmissible knowledge. [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Polanyi to argue that pattern recognition, unwritten conventions, and design intuition are structurally inaccessible to AI and can only pass through apprenticeship. [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) identifies a related problem: senior engineers think in complexity management terms while the rest of the organization thinks in uncertainty-reduction terms, and closing that gap is a craft skill in itself. [Use Your Brain: Engineering Standards in the Age of LLMs](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) ties both threads together: CI/CD, code ownership, and disciplined review are the infrastructure that keeps LLMs as amplifiers rather than substitutes for judgment.

The performance dimension of craft appears in [5x faster fast\_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs), where replacing float arithmetic with integer accumulators and reciprocal multiplication yields a 5.9x speedup through reasoning about the actual computation. [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) is the necessary counterweight: attention thresholds, discrete capacity increments, and pipeline backpressure mean that optimization without understanding system constraints often produces no measurable outcome. Both positions are part of craft — knowing when to optimize and knowing when not to.
