---
title: Software engineering
summary: >-
  A broad discipline whose recurring tensions — between craft and tooling, tacit
  knowledge and explicit process, individual skill and organizational alignment
  — are sharpened by the current moment of AI-assisted development.
sources:
  - 2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it
  - 2026-04/2026-04-27t145041-agentic-coding-is-a-trap
  - 2026-04/2026-04-30t230919-dmytro-mezhenskyi-udmezhenskyi-on-reddit
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - 2026-04/2026-04-30t231909-the-great-css-expansion
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - 2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot
  - >-
    2026-05/2026-05-03t110032-getting-up-to-speed-on-multi-agent-systems-part-3-wave-1
  - 2026-05/2026-05-04t231343-ai-likes-deep-modules
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - >-
    2026-05/2026-05-04t231858-how-container-filesystem-works-building-a-docker-like
  - 2026-05/2026-05-05t091632-building-websites-with-llms
  - >-
    2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors
  - 2026-05/2026-05-05t135637-reddit-rdevops
  - 2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code
  - 2026-05/2026-05-06t173338-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-05/2026-05-10t205349-github-is-sinking
  - 2026-05/2026-05-10t213609-raiyanyahyahow-to-train-your-gpt
  - >-
    2026-05/2026-05-12t165232-seven-cool-javascript-libraries-you-should-know-about
  - >-
    2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise
  - 2026-05/2026-05-14t151252-5-faster-fastblur-in-image-rs
  - >-
    2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession
  - 2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production
  - 2026-05/2026-05-17t204925-why-most-developers-cant-use-ai-effectively
  - 2026-05/2026-05-18t113714-yaml-thats-norway-problem
  - 2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering
  - >-
    2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you
  - 2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents
  - 2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter
  - >-
    2026-05/2026-05-27t181744-ruby-vs-java-vs-typescript-my-experience-on-building-a
  - 2026-05/2026-05-30t210309-90percent-of-the-t-distribution
  - 2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu
  - 2026-05/2026-05-31t164554-jj-vcsjj
  - 2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle
  - 2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering
  - >-
    2026-06/2026-06-10t220929-navigating-the-age-old-problem-of-checkmarks-in-ui-with
  - >-
    2026-06/2026-06-10t223404-how-to-read-distributed-traces-when-you-didnt-write-the-code
  - 2026-06/2026-06-11t023723-gi-dellavzerostack
  - 2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people
  - 2026-06/2026-06-13t083401-sgupai-fable5md
  - 2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming
  - 2026-06/2026-06-17t075738-gunnargray-devunicode-animations
  - 2026-06/2026-06-18t024208-the-git-commands-i-run-before-reading-any-code
  - >-
    2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week
compiled_at: '2026-06-18T21:13:20.142Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 14143
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
  cost_usd: 0.067974
---
Software engineering is the practice of building, maintaining, and reasoning about software systems at a level beyond individual function authorship. The sources collected here span languages, tools, testing, architecture, AI assistance, and organizational behavior, but several fault lines run through all of them.

The most insistent theme is that code is cheap but ownership is not. [Yusuf Aytas](/reading/2026-05/2026-05-22t091746-when-code-is-cheap-does-quality-still-matter) puts it plainly: LLMs lowered the cost of producing code while leaving the cost of owning it unchanged, meaning engineering judgment remains the scarce asset. This pairs with the argument in [The Bottleneck Was Never the Code](/reading/2026-05/2026-05-06t110728-the-bottleneck-was-never-the-code) that coding agents accelerate writing but amplify whatever misalignment already exists around specifications, shared context, and management coherence. Individual productivity gains do not resolve organizational clarity problems.

A second persistent concern is skill atrophy. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full reliance on AI coding agents erodes the debugging and critical-thinking skills needed to supervise those same agents, a circular dependency that also locks engineers into unpredictable token costs. The same anxiety appears in [a broader essay on vibe coding](/reading/2026-05/2026-05-14t223612-the-perils-of-ai-to-the-software-engineering-profession), which points to compounding LLM errors in safety-critical contexts as a downstream consequence of reviewing nothing. [Christian Ekrem](/reading/2026-05/2026-05-19t110710-the-tacit-dimension-why-your-best-engineers-cant-tell-you) frames this through Michael Polanyi's tacit knowledge: the pattern recognition, system intuition, and unwritten conventions that define senior engineering expertise are structurally inaccessible to AI tools and can only be transmitted through apprenticeship.

Architectural decisions now carry an AI-readability dimension alongside their human-readability one. [Go Monk](/reading/2026-05/2026-05-04t231343-ai-likes-deep-modules) argues that deep modules with narrow interfaces reduce the surface area an LLM must reason across, making codebases easier for AI tools to work in. This connects to the design principle rehabilitation in [Henrique Teixeira's piece on SRP](/reading/2026-06/2026-06-04t073318-single-responsibility-the-distorted-principle): single responsibility is about cohesion and cognitive simplicity, not maximum granularity, and over-splitting into shallow classes produces the leaky abstractions that defeat both humans and AI.

Reliability engineering for AI agents adds a new layer to existing production discipline. [Aiyan's data engineering agent case study](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) shows that prompt engineering is the wrong tool for reliability; environment design and atomic tools are what produce consistent behavior across architectures. [Anthropic's harness writeup](/reading/2026-05/2026-05-19t221035-effective-harnesses-for-long-running-agents) extends this to multi-session agents, using an initializer agent and a progress file to maintain coherence across context windows. The [learn-harness-engineering course](/reading/2026-05/2026-05-18t221205-walkinglabslearn-harness-engineering) formalizes the concept: a harness is a structured environment of instructions, state, verification, and session lifecycle, not a prompt.

Testing retains its importance regardless of how code is generated. [Currents.dev on Playwright selectors](/reading/2026-05/2026-05-05t135218-designing-playwright-tests-that-survive-ui-refactors) argues that brittle test suites stem from coupling to CSS classes and DOM structure rather than semantic roles and explicit test attributes. [Their staging vs. production piece](/reading/2026-05/2026-05-15t120337-playwright-testing-in-staging-vs-production) adds a risk-based framework for where different test types belong. [Emphere's security tool testing](/reading/2026-06/2026-06-11t024225-testing-a-security-tool-like-it-can-hurt-people) makes the harder point: tests for safety-critical tools must include deliberate failure cases that prove the system fails loudly when it overclaims certainty.

Tooling and platform choices still matter at the margins and sometimes more than that. [Pavel Laptev on CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) documents native platform primitives replacing hundreds of kilobytes of JavaScript, reducing dependency surface. [Jujutsu](/reading/2026-05/2026-05-31t164554-jj-vcsjj) offers a Git-compatible VCS with cleaner conflict handling and [a practical review workflow on top of it](/reading/2026-05/2026-05-31t164252-reviewing-large-changes-with-jujutsu) shows how the tool shapes practice. [Anton Zaides' seven production rules](/reading/2026-06/2026-06-10t073045-the-unwritten-laws-of-software-engineering) are the kind of hard-won operational knowledge that no architecture document captures: roll back before debugging, treat every external dependency as a future outage.

Organizational context shapes what any of the above is worth. [Bad onboarding](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) signals that the process, not the engineer, is failing. [Senior developers losing influence](/reading/2026-05/2026-05-13t060018-why-senior-developers-fail-to-communicate-their-expertise) because they speak in complexity terms while the business speaks in uncertainty terms is a communication failure with architectural consequences. [Ally Piechowski's Rails audit process](/reading/2026-06/2026-06-18t090801-how-i-audit-a-legacy-rails-codebase-in-the-first-week) treats stakeholder interviews and schema reading as prior to any tooling, on the premise that the social knowledge gap is usually larger than the technical one.

Formal verification, long sidelined as too costly, is gaining renewed attention. [Yaron Minsky at Jane Street](/reading/2026-06/2026-06-15t021106-formal-methods-and-the-future-of-programming) argues that agentic coding creates new demand for machine-checkable proofs precisely because AI-generated code is fast enough to outpace human review, making the economics of proof-writing finally competitive.
