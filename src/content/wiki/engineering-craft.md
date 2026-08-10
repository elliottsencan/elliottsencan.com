---
title: Engineering craft
summary: >-
  Engineering craft is the set of judgment, discipline, and tacit skills that
  separate workable code from well-built systems — covering module design,
  tooling fluency, communication, and the principled tradeoffs that survive
  contact with production.
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
compiled_at: '2026-08-10T19:00:43.937Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 9759
    output_tokens: 1911
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
  cost_usd: 0.057942
---
Engineering craft resists a clean definition because it spans every layer of the stack, but a consistent pattern runs through the sources tagged here: craft is what remains after you subtract the parts that can be mechanically specified. It is the judgment call, the tradeoff read correctly, the interface kept simple when the implementation is complex.

At the design level, the clearest formulation comes from the argument that deep modules — small interfaces hiding large implementations — reduce cognitive load for both humans and LLMs [AI Likes Deep Modules](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules). The same instinct appears in the critique of Angular components bloated with dozens of inputs, where the fix is decomposition into directives and sub-components so each concern stays encapsulated [A Better way to build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to). And it recurs in the argument that the Single Responsibility Principle is not "do one thing" but cohesive grouping under a single accountable responsibility — over-granularizing classes produces more, not less, cognitive overhead [Single Responsibility, the Distorted Principle](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle). Organizing code by domain vertical rather than technical layer follows from the same logic: colocation by functionality improves discoverability and cohesion [The Vertical Codebase](/reading/2026-07/2026-07-04t141323-the-vertical-codebase).

Craft also shows up in tool fluency. Knowing the shell well enough to use Readline bindings, brace expansion, and script safety flags is not trivia — it reduces friction in the daily work [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your). Knowing which git log commands reveal churn hotspots and bus-factor risk before opening any source file is how an experienced engineer audits an unfamiliar codebase quickly [The Git Commands I Run Before Reading Any Code](/reading/2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code). The Jujutsu review workflow — duplicating a change, inserting an empty parent commit, and squashing files into it as you review — turns a cognitively expensive task into a persistent, resumable process [Reviewing Large Changes with Jujutsu](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu).

Performance work is another domain where craft matters more than clever tricks. The 5.9x speedup in Rust's fast_blur function comes from understanding why float arithmetic and integer division are expensive in a tight loop, then replacing them with integer accumulators and reciprocal multiplication [5x faster fast_blur in image-rs](/reading/2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs). But Colin Breck's piece cautions that even order-of-magnitude gains can be irrelevant when the bottleneck is attention thresholds, discrete capacity increments, or pipeline backpressure [When Impressive Performance Gains Do Not Matter](/reading/2026-06/2026-06-30t185207-when-impressive-performance-gains-do-not-matter). Knowing when to optimize, and when not to, is itself a craft judgment.

Craft degrades under several documented pressures. Reflexive destructuring optimizes for writing code rather than reading it [I stopped destructuring everything](/reading/2026-07/2026-07-16t043206-i-stopped-destructuring-everything). Bloated code signals low-value work in the same way inflated manufacturing costs signal a poorly designed part [The Idiot Index for Code](/reading/2026-06/2026-06-22t000701-the-idiot-index-for-code). AI lowers the cost of generating code but not of owning it, and LLMs can produce polished, well-formatted technical debt faster than any individual engineer [When Code Is Cheap, Does Quality Still Matter?](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter). Shipping AI-generated code without review or testing is categorically incompatible with safety-critical systems and causes skill atrophy in all contexts [The Perils of AI to the Software Engineering Profession](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession). The corrective is not to avoid AI tools but to use them with engineering discipline: strong CI/CD, code ownership, and genuine understanding of the output [Use Your Brain: Engineering Standards in the Age of LLMs](/reading/2026-08/2026-08-05t072544-use-your-brain-engineering-standards-in-the-age-of-llms). Relatedly, relaying raw AI output without synthesizing it shifts the cognitive burden onto the recipient and adds no value [Don't be a meat proxy](/reading/2026-08/2026-08-03t025839-dont-be-a-meat-proxy).

A recurring theme is that much engineering knowledge is tacit — not fully articulable. Pattern recognition, design intuition, and unwritten conventions are structurally difficult to transfer to AI tools and can only be transmitted through apprenticeship [The Tacit Dimension](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you). Senior developers often fail to communicate their expertise because they speak in terms of complexity management while the rest of the business thinks in terms of uncertainty reduction [Why Senior Developers Fail to Communicate Their Expertise](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise). Algorithm interviews test a narrow, trainable skill that weakly correlates with this kind of production judgment [Learn Algorithms for Interviews, Forget Them for Work](/reading/2026-04/2026-04-30t155134-learn-algorithms-for-interviews-forget-them-for-work).

Finally, craft includes knowing what not to build. An Android app that delivered plain HTML over HTTP was better served by a lightweight webpage [Your App Could Have Been a Webpage](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you). Frontend complexity accumulated layer by layer because each tool solved a real pain, but the accumulated stack now imposes costs that simpler approaches — plain HTML pages with CSS view transitions — can sidestep [The Descent](/reading/2026-07/2026-07-16t080520-the-descent-what-happened-to-the-frontend-while-you-werent), [Building Websites With LLMs](/reading/2026-05/2026-05-05t091632-building-websites-with-llms). Hard-won production rules — roll back before debugging, treat every external dependency as a future outage — encode the craft lessons that come from real incidents [The Unwritten Laws of Software Engineering](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering). Crafting Interpreters illustrates the same principle at book length: understanding a system deeply enough to build it from scratch is itself the discipline [munificent/craftinginterpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters).
