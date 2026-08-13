---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment-driven practices — design intuition,
  code discipline, systems thinking, and communication — that distinguish
  engineers who produce durable work from those who merely produce output.
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
compiled_at: '2026-08-13T21:12:56.498Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9759
    output_tokens: 1693
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
  cost_usd: 0.054672
---
Engineering craft is not a single skill but a cluster of dispositions that interact. It shows up in how an engineer chooses an abstraction, reads a tradeoff, communicates a decision, and knows when to stop adding.

A recurring theme across many sources is that craft is fundamentally about judgment rather than execution. [Fagner Brack](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work) puts this directly: algorithm interviews test a narrow, trainable skill that weakly predicts production performance, where real work means reading tradeoffs, shipping incrementally, and handling messy real-world inputs. The corollary shows up in [Vladimir Klepov's analysis of tech hiring](/reading/2026-06/2026-06-22t182141-the-systemic-decay-of-tech-hiring): error asymmetry drives interview difficulty ever upward, and candidates overfit to the process — measuring craft through increasingly artificial filters.

Good design intuition is one component of craft that resists explicit codification. [cekrem, drawing on Michael Polanyi](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you), argues that the most valuable engineering expertise — pattern recognition, unwritten conventions, design intuition — is structurally inaccessible to AI tools and can only be transmitted through apprenticeship. This tacit knowledge is precisely what distinguishes senior engineers, though [Tuhin Nair](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) points out those same engineers often fail to communicate that expertise to the rest of the business because they speak in terms of complexity management while the organization thinks in terms of uncertainty reduction.

Abstraction quality is another pillar. [Go Monk's argument for deep modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) — small interfaces hiding large implementations — aligns closely with [Henrique Teixeira's correction of Single Responsibility](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle): SRP is about cohesive grouping under a single accountable responsibility, not atomizing classes into micro-units that create more cognitive surface than they remove. [Kobi Hari makes the same point at the component level](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to): Angular components bloated with dozens of inputs should be refactored using composition so each concern stays encapsulated and APIs remain clean. The organizational analog appears in [TkDodo's case for vertical codebases](/reading/2026-07/2026-07-04t141323-the-vertical-codebase): colocation by domain rather than technical layer improves cohesion and discoverability.

Craft also means knowing when not to add complexity. [The "idiot index" framing](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code) applies Musk's manufacturing ratio to software, arguing that bloated, over-engineered code signals low-value work. [Matt Smith's case against reflexive destructuring](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything) is a smaller-scale instance: optimizing for writing rather than reading is a craft failure. [Jim Nielsen argues the same at the architecture level](/reading/2026-05/2026-05-05t091632-building-websites-with-llms): separate linked HTML pages unified by CSS transitions are simpler to build and maintain than progressive-enhancement JavaScript.

Discipline in implementation matters independently of design. [Arthur Pastel's optimization of fast_blur](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs) — replacing float arithmetic with integer accumulators and integer division with reciprocal multiplication for a 5.9x speedup — demonstrates that understanding the mechanics of what you are writing, not just the API surface, is part of craft. [Christian Hofstede-Kuhn's shell tricks](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) and [Marc Brooker's TCP_NODELAY post](/reading/2026-07/2026-07-19t073255-its-always-tcpnodelay-every-damn-time) both make a related point: default settings and habitual idioms carry hidden costs that craft-conscious engineers surface and correct.

With AI code generation now ubiquitous, craft has acquired an additional dimension: the willingness to take responsibility for what you ship. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) notes that AI lowers the cost of producing code but not the cost of owning it. [Abednego Gomes](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession) argues that shipping AI-generated code without review is categorically incompatible with safety-critical contexts. [Paolo Galeone](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms) frames this as the difference between using AI as an amplifier versus a crutch, and calls for strong CI/CD and code ownership to enforce the distinction. [gruhn's "meat proxy" framing](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy) puts the cognitive point cleanly: relaying raw AI output without reading, validating, or synthesizing it shifts the work onto the recipient and eliminates the engineer's contribution entirely.

Craft also extends to the artifacts that surround code. [Anton Zaides' unwritten engineering laws](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) — roll back before debugging, treat every external dependency as a future outage — encode hard-won operational judgment. [Ally Piechowski's git log commands](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code) and legacy Rails audit process show that reading a codebase well, before writing a line, is itself a skilled practice. [Billy Pilger's architecture diagram mistakes](/reading/2026-06/2026-06-11t083730-7-more-common-mistakes-in-architecture-diagrams) extend craft into communication: a misleading diagram is a design defect.
