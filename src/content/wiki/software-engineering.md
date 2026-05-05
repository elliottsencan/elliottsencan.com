---
title: Software engineering
summary: >-
  Craft, tooling, and architectural discipline across the stack: from shell
  scripting and CSS primitives to component design, interpreter implementation,
  and the emerging reliability challenges of AI-assisted development.
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
compiled_at: '2026-05-04T03:38:10.472Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3835
    output_tokens: 678
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
  cost_usd: 0.021675
---
Software engineering as a practice spans low-level tooling fluency, architectural decisions, and the evolving question of how much of the work should be delegated to automated agents.

At the tooling layer, shell literacy remains a concrete productivity multiplier. [Hofstede-Kuhn's guide](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) covers Readline bindings, history search, brace expansion, and script safety flags, treating shell fluency as a foundation rather than an optional skill. Similarly, [Pavel Laptev's survey of modern CSS](/reading/2026-04/2026-04-30t231909-the-great-css-expansion) shows how over 300 kB of JavaScript dependencies for popovers, scroll animations, and anchor positioning can be replaced by platform primitives now native to CSS, reducing complexity at the dependency and runtime layers simultaneously.

At the component level, [Kobi Hari's piece on Angular composition](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) argues that components bloated with dozens of inputs should be decomposed into directives and sub-components, keeping each concern encapsulated and APIs clean. Robert Nystrom's [Crafting Interpreters repository](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents the other end of the discipline spectrum: a full dual-implementation language project where understanding the machine is the point.

The sharpest debate in recent sources concerns AI-assisted development. [Lars Faye](/reading/2026-04/2026-04-27t145041-agentic-coding-is-a-trap) argues that full reliance on coding agents erodes the debugging and critical thinking skills required to supervise those same agents, compounding vendor lock-in and unpredictable token costs into a long-term liability. [Aiyan's engineering post](/reading/2026-04/2026-04-27t114426-dont-prompt-your-agent-for-reliability-engineer-it) takes a different angle: reliability in agent systems comes from environment design and atomic tools, not from prompt engineering. Both sources agree that naive delegation is risky; they differ on whether the solution is restraint or better system architecture. [Christoph Spörk](/reading/2026-05/2026-05-03t103944-the-lobster-in-the-hot-pot) extends the concern further, arguing that institutional knowledge erodes gradually as teams offload cognitive work to LLMs, with cost exposure as a trailing consequence.
