---
title: Engineering craft
summary: >-
  The practical wisdom that separates working software from good software: sound
  judgment about tradeoffs, deliberate design, and the tacit knowledge that
  accumulates through experience rather than formal process.
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
compiled_at: '2026-07-20T19:45:05.641Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9433
    output_tokens: 1476
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
  cost_usd: 0.050439
---
Engineering craft is the layer of judgment between knowing how to write code and knowing what code to write. It shows up in small decisions — how to name a variable, whether to destructure an object, which abstraction boundary to draw — and in large ones: how to structure a codebase, when to optimize, what to defer. These decisions compound, and the gap between a codebase shaped by craft and one shaped by expedience grows over time.

The most direct argument for craft as a discipline comes from the gap between interview performance and production performance. [Fagner Brack's critique of algorithm interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws this line clearly: whiteboard algorithms test a trainable narrow skill, while real engineering requires reading tradeoffs, shipping incrementally, and handling messy unbounded inputs. The credential is not the competence.

Competence of the kind that matters is often tacit. [Cekrem's essay on the tacit dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) draws on Michael Polanyi to argue that the most valuable engineering knowledge — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to articulation and therefore to AI tools. It can only be transmitted through apprenticeship. This creates a genuine problem as agentic coding spreads: the very practices that produce good software may be the ones most at risk of atrophy. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) calls the consequence directly — shipping AI-generated code without review or testing is not just risky for safety-critical systems, it is a form of skill erosion that degrades the profession.

Craft shows up in how you read code as much as how you write it. [Ally Piechowski's git log workflow](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) treats version history as diagnostic data: churn hotspots, bus factor, and bug clusters tell you where risk lives before you open a single file. The same author's [Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) starts with stakeholder interviews to surface fear and knowledge gaps before running any tools. Both approaches reflect the same underlying instinct: understand the system before changing it.

Good design is a form of craft too. [Kobi Hari's argument for the Composite Components pattern](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) targets Angular components bloated with dozens of inputs — a symptom of design that grew without deliberate limits. The fix is encapsulation: move concerns into directives and sub-components so each piece carries a coherent responsibility. [Henrique Teixeira's reading of the Single Responsibility Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) makes the same point from the theory side: SRP is about cohesive grouping under a single accountable responsibility, not about atomizing everything into one-liners. Over-granularization violates the cognitive simplicity the principle was meant to provide.

Abstraction quality is similarly tractable. [Go Monk's post on deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that small interfaces hiding large implementations reduce complexity for both humans and LLMs. Shallow modules — broad APIs wrapping thin logic — transfer cognitive load to every caller. The contrast maps onto [Yusuf Aytas's observation](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) that AI lowers the cost of producing code but not the cost of owning it. Taste and judgment still determine whether the output is an asset or debt.

The idiot index applied to code — the ratio of complexity in the output to the complexity of the underlying problem — is a useful heuristic here. [Speedrun's post](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) argues that bloated, over-engineered code signals low-value work by the same logic that inflated manufacturing costs signal poor product design. The goal is not minimal code but proportionate code.

Craft also demands honesty about limits. [Daniel Stenberg's analysis of curl's bug data](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) shows no measurable sign that AI-assisted static analysis is moving open-source projects toward zero latent bugs. [Colin Breck](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter) adds that even real performance improvements often fail to change outcomes when attention thresholds, capacity increments, or pipeline backpressure absorb the gain. Both are arguments for grounding optimization in measurement rather than intuition.

At the level of individual practice, craft is often about restraint. [Matt Smith's case against reflexive destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is a small example of a large principle: optimizing for writing code over reading it accumulates cognitive debt. [Anton Zaides's production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — encode the same instinct in operational terms. These are not algorithms. They are the residue of experience.
