---
title: Engineering craft
summary: >-
  The discipline of writing code and building systems with deliberate attention
  to correctness, clarity, and maintainability, spanning language
  implementation, shell tooling, component architecture, and CI pipeline
  integrity.
sources:
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - >-
    2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your
  - >-
    2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to
  - >-
    2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit
compiled_at: '2026-05-04T04:07:42.371Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2823
    output_tokens: 572
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
  cost_usd: 0.017049
---
Engineering craft covers the habits, patterns, and safeguards that separate code that works from code that holds up. The sources here approach it from four distinct angles, but share a common thread: precision in design pays forward.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) represents craft at its most foundational. Robert Nystrom builds two complete Lox interpreters, one in Java and one in C, and the project's build system weaves code and prose together into a single artifact. The dual-implementation approach is a deliberate teaching choice: the same language realized in two runtimes exposes where complexity lives and why it lives there.

At the shell level, [Shell Tricks That Actually Make Life Easier](/reading/2026-04/2026-04-30t231815-shell-tricks-that-actually-make-life-easier-and-save-your) makes the case that Readline bindings, history search, brace expansion, and script safety flags are not conveniences but safeguards. Knowing `set -euo pipefail` and process substitution is the difference between a script that fails loudly and one that silently corrupts state.

[A Better Way to Build Angular Components](/reading/2026-04/2026-04-30t232001-a-better-way-to-build-angular-components-from-inputs-to) applies the same principle to component architecture. Components bloated with dozens of inputs accrete because adding a flag is faster than refactoring, but the Composite Components pattern, moving features into directives and sub-components, keeps each concern encapsulated and the public API legible.

Craft also means understanding the infrastructure you depend on. [What Happens If a Merge Queue Builds on the Wrong Commit](/reading/2026-05/2026-05-03t150555-what-happens-if-a-merge-queue-builds-on-the-wrong-commit) documents a GitHub merge queue bug that silently rewrote main by constructing temp branches from stale divergence points. The architectural lesson is concrete: never push temp branches to main, and design systems so failure modes are visible rather than quiet.
