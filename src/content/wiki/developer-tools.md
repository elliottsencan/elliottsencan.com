---
title: Developer tools
summary: >-
  Software instruments built to improve how developers write, run, debug, and
  ship code, ranging from fine-tuning runtimes and CI orchestrators to
  documentation platforms and security scanners.
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
compiled_at: '2026-06-21T18:23:45.560Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4430
    output_tokens: 909
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
  cost_usd: 0.026925
---
Developer tools span a wide surface: anything purpose-built to reduce friction in the work of building software. The sources here illustrate how much that surface has expanded in the current AI-and-cloud moment.

At the infrastructure layer, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) offers durable execution for distributed workflows, persisting state at every step so applications recover from failures without manual reconciliation. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a similar idea into continuous integration, using AWS Lambda durable functions and a two-layer Run/Workflow hierarchy to run a stateful, checkpointed scheduler without a long-lived process.

On the local-AI side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that cut LLM fine-tuning memory usage by up to 90% and speed it up by as much as 30x compared to FlashAttention 2. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) takes a narrower slice: an interactive calculator that tells you whether a specific GPU's VRAM can handle a given open-weight model and at which quantization levels. For running agent teams locally, [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit with persistent memory, multi-agent coordination, and built-in observability across 15 LLM providers.

Documentation and knowledge distribution have their own tooling tier. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) is an AI-native documentation platform that serves content to both humans and LLMs, with support for llms.txt and MCP. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging a local MCP server as a single-click bundle for Claude Desktop, pointing toward a pattern where developer tools themselves ship as AI-connectable extensions.

Security is another axis. Attackers have already learned to target the tooling layer: [invisible Unicode variation-selector payloads](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) hidden in 151 npm and GitHub packages evaded both code review and static analysis. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds from the other direction, providing an agentic pipeline for autonomous vulnerability discovery and remediation with gVisor sandboxing.

Framework-specific tooling rounds out the picture. [Angular Signal Forms documentation](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) represents the narrower category of official, opinionated guidance that ships as part of a framework. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) does the same for Kubernetes operations, consolidating topology, Helm, GitOps, traffic, and security into a single open-source binary.
