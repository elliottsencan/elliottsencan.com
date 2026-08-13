---
title: Developer tools
summary: >-
  Software tools that support developers across the full build cycle, from LLM
  fine-tuning and CI orchestration to documentation platforms, security
  scanners, and local AI agents.
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
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-08-13T21:11:53.858Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1229
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
  cost_usd: 0.03312
---
Developer tooling spans a wide range of problems: accelerating model training, managing distributed workflows, securing the software supply chain, and making infrastructure legible. What the sources here share is a focus on reducing friction at specific, concrete pain points rather than offering abstract platforms.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that cut fine-tuning memory overhead by 90% and speed training up to 30x versus FlashAttention 2, making local model training viable on consumer hardware. Before training anything, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets a developer check whether their GPU can even load a given open-weight model, calculating compatible quantization levels and expected tokens-per-second from VRAM capacity.

Documentation and workflow tooling show a similar pattern of solving narrow problems well. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) builds documentation that serves both human readers and LLMs via llms.txt and MCP integration. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a similar durability approach for CI orchestration, running a stateful, checkpointed scheduler on AWS Lambda without keeping a long-lived process alive.

Local AI agent tooling is a growing cluster. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit for running multi-agent teams against 15 LLM providers with persistent memory and built-in observability. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron meeting assistant with real-time transcription and AI answers, supporting both cloud and local backends. Poolday's Creator-1 orchestrates 100+ generative models to execute video edits end-to-end via a multi-agent pipeline. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to package a local MCP server as a single-click bundle for Claude Desktop.

Infrastructure visibility gets its own entry: [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) is an open-source Kubernetes UI consolidating topology, Helm, GitOps, live traffic, and security checks in a single binary, with MCP support for AI agents. [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues from a different angle, contending that current cloud platforms are built on wrong abstractions and need to be rethought from scratch.

Security tooling appears in two forms here. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) demonstrates autonomous vulnerability discovery and patching via an agentic pipeline with gVisor sandboxing. The [invisible Unicode supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) report is a reminder of what current tools miss: 151 malicious npm packages encoded payloads in variation-selector characters that bypassed code review and static analysis entirely.

Several sources illustrate how tooling shapes practice beyond raw capability. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a build system that weaves prose and code into a publishable book, itself a tool for teaching language implementation. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) specifies how a framework's form model API should be designed for type safety and clarity. [Dan Q's webpage replacement](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) and [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) each represent the smallest class of tool: a single developer solving a specific annoyance, then publishing the fix.
