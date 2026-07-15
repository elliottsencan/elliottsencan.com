---
title: Developer tools
summary: >-
  Software and platforms purpose-built to reduce friction in building, running,
  and understanding systems, spanning LLM fine-tuning, CI orchestration,
  documentation, UX research, and Kubernetes management.
sources:
  - 2026-04/2026-04-24t093356-unsloth
  - 2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm
  - 2026-04/2026-04-30t231027-munificentcraftinginterpreters
  - 2026-04/2026-04-30t231206-poolday
  - 2026-04/2026-04-30t231412-form-model-design-angular-signal-forms
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231511-temporal
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - 2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui
  - 2026-05/2026-05-03t173528-lthoanggopenagentd
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - 2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-07/2026-07-05t170602-building-a-cloud
  - >-
    2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you
compiled_at: '2026-07-15T04:03:29.909Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4748
    output_tokens: 931
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
  cost_usd: 0.028209
---
Developer tools are the infrastructure beneath the work: the runtimes, dashboards, documentation platforms, and testing harnesses that let builders focus on problems rather than plumbing. The sources here span a wide range of that category, but a few tensions run through them consistently.

On the local-first and performance end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom kernels for LLM fine-tuning that cut memory usage by up to 90% compared to FlashAttention 2, and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps practitioners understand upfront whether their GPU can even run a given model at a given quantization level. Both tools address the same underlying problem: LLM workflows have hardware requirements that are non-obvious and easy to get wrong before you've spent time on setup.

On the orchestration side, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) handles durable execution for distributed workflows, and [Depot's CI system](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar philosophy to continuous integration, using AWS Lambda durable functions to checkpoint CI state without a long-lived process. Both treat workflow state as something the platform should own, not the application.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets documentation specifically, positioning itself as AI-native with support for llms.txt and MCP so that docs serve both humans and agents. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) takes a similar consolidation approach for Kubernetes, bundling topology, Helm, GitOps, traffic, and security into one open-source binary with MCP for AI agents included.

[Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) represents the UX research tool category, arguing for end-to-end coverage of card sorting, tree testing, and AI synthesis over narrower session-recording competitors. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) is narrower still, a framework-level API design decision about how form models should relate to domain models.

Security is a cross-cutting concern. The [invisible Unicode supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documented in Ars Technica shows how developer tooling itself, specifically npm and GitHub package infrastructure, becomes an attack surface. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to that category of risk with an agentic pipeline for vulnerability discovery and remediation.

At the edges of the category, [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a resource for building language runtimes from scratch, and [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) questions whether the abstraction layer beneath all developer tools, cloud VMs and remote block storage, is itself wrong. Both suggest that the tools practitioners take for granted rest on assumptions worth examining.
