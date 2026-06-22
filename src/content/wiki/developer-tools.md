---
title: Developer tools
summary: >-
  A broad category of software that supports writing, running, testing, and
  securing code; the cited sources span LLM fine-tuning utilities,
  infrastructure UIs, CI systems, documentation platforms, and security tooling.
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
compiled_at: '2026-06-22T02:26:50.446Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4430
    output_tokens: 963
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
  cost_usd: 0.027735
---
The category spans a wide range of utilities, each targeting a specific friction point in the development cycle. At the infrastructure end, [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary, and [Temporal](/reading/2026-04/2026-04-30t231511-temporal) provides durable execution so distributed workflows survive failures without custom reconciliation code.

CI tooling is similarly moving toward stateful, event-driven designs. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) runs a checkpointed workflow scheduler on AWS Lambda durable functions, eliminating the need for a persistent process while still coordinating multi-step jobs through a two-layer Lambda hierarchy.

LLM-adjacent tooling has produced its own ecosystem. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets the fine-tuning layer with custom kernels that claim up to 30x faster training and 90% less memory than FlashAttention 2. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) sits at the opposite end, helping practitioners determine whether a given GPU can load a specific open-weight model before committing to a run. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) extends the tooling surface to documentation, serving knowledge to both humans and LLMs through llms.txt and MCP support. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging local MCP servers as single-click bundles for Claude Desktop.

Security is a persistent concern across the toolchain. A [supply-chain attack documented by Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) used invisible Unicode variation-selector characters to hide payloads in 151 npm and GitHub packages, bypassing code review and static analysis. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) offers a counterpoint: an agentic pipeline using Claude for autonomous vulnerability discovery and patching, with gVisor sandboxing for containment.

Other entries address narrower but real needs. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) provides a complete book and dual interpreter implementations (jlox in Java, clox in C) for developers learning language implementation. [Angular Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) covers form-to-domain model translation patterns. [Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) positions itself against UserTesting for UX research workflows. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) and [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) are desktop-layer tools that wrap LLM agents with meeting transcription and multi-agent coordination respectively.
