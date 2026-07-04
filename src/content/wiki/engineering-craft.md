---
title: Engineering craft
summary: >-
  Engineering craft is the accumulated judgment, disciplined technique, and
  design sense that separates code that merely runs from code worth owning — a
  thread running through sources on software structure, tooling, communication,
  and quality.
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
compiled_at: '2026-07-04T21:20:39.443Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 8138
    output_tokens: 1320
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
  cost_usd: 0.044214
---
Engineering craft is not a single skill but a posture toward the work: the willingness to understand tradeoffs deeply before acting, to prefer the right structure over the convenient one, and to care about what happens after code ships.

That posture shows up in structural decisions at every scale. [Go Monk's argument for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) holds that small interfaces hiding large implementations reduce cognitive load for both humans and LLMs. [Kobi Hari's Angular piece](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) makes the same point at the component level: bloated input lists signal that a component is carrying concerns that belong elsewhere. [Henrique Teixeira on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle) adds precision to why — the principle is about cohesion under a single accountability, not about atomizing behavior into arbitrarily small units. Over-granularizing violates the cognitive simplicity SRP exists to provide.

Those structural instincts are complemented by disciplined attention to implementation details. Arthur Pastel's [step-by-step optimization of image-rs fast\_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) is a model of the craft attitude applied to performance: replacing float arithmetic with integer accumulators and costly division with reciprocal multiplication to reach a 5.9x speedup. Robert Nystrom's [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) takes a different angle — building two complete Lox interpreters from scratch not because it is efficient but because deep implementation knowledge is what produces genuine understanding. Christian Hofstede-Kuhn's shell tricks and Ben Gesoff's [Jujutsu review workflow](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) occupy the same register: small, deliberate technique choices that compound into a meaningfully more capable practice.

Craft also means honest accounting of where code goes wrong. [Daniel Stenberg's curl analysis](/reading/2026-05/2026-05-02t094735-approaching-zero-bugs) uses vulnerability age and bugfix-rate data to argue that even powerful static analysis tools show no measurable sign of approaching zero latent bugs in open-source projects. [Yusuf Aytas's piece on code quality in the AI era](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) frames the same problem from the other direction: LLMs lower the cost of producing code but not the cost of owning it, and they can generate polished technical debt faster than any individual engineer. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) is more pointed — shipping AI-generated code without review is not a productivity gain but a category of recklessness, especially anywhere safety matters.

The [idiot index applied to code](/reading/2026-06/2026-06-22t001042-how-to-leave) offers a compression: if the ratio of complexity to delivered value is high, the work is low-value regardless of how polished it looks. [Anton Zaides's unwritten engineering laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — are the production-incident distillation of that same principle.

Craft has a communication dimension too. [Tuhin Nair argues](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) that senior engineers communicate in terms of complexity management while the business thinks in uncertainty reduction — closing that gap is itself a core engineering skill. [Cekrem's essay on tacit knowledge](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), drawing on Michael Polanyi, makes the harder claim: the most valuable engineering expertise — pattern recognition, design intuition, unwritten conventions — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship.

Finally, [Fagner Brack on algorithm interviews](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) draws a clean line between what engineering craft is not — a trainable performance on narrow puzzles — and what it is: reading tradeoffs, shipping incrementally, and handling the messy, unbounded inputs that real systems produce. Craft is the accumulation of judgment that makes those calls consistently better over time.
