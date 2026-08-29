---
title: Developer tools
summary: >-
  Software and platforms that help developers build, run, debug, and understand
  systems more effectively, spanning LLM tooling, infrastructure, CI,
  documentation, and security.
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
compiled_at: '2026-08-29T20:14:43.922Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 990
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
  cost_usd: 0.029535
---
The category spans a wide range of concerns: local LLM fine-tuning and inference, infrastructure management, CI orchestration, documentation, security scanning, and even reclaiming simplicity from unnecessary complexity.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom kernels for fine-tuning and running models locally, cutting memory overhead by up to 90% compared to FlashAttention 2. Complementing that, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) lets developers check whether a specific GPU's VRAM can actually run a given open-weight model, surfacing compatible quantization levels and estimated throughput before any setup begins. Both tools address the practical friction of working with large models outside cloud infrastructure.

Infrastructure tooling appears at several levels. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary with no cloud account required. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) takes on a different layer, persisting workflow state at every step so distributed applications recover from failures automatically. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies similar durability thinking to CI orchestration, using AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process.

Documentation and local agent tooling have also matured into dedicated products. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both human users and LLMs, with support for llms.txt and MCP. [lthoangg/openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit for local multi-agent workflows with persistent memory and built-in observability, while [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) offers an Electron-based meeting assistant supporting both cloud and local LLM backends.

Security tooling surfaces as a recurring theme. An [Ars Technica report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documents attackers embedding payloads in invisible Unicode characters across 151 npm and GitHub packages, evading static analysis entirely. Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to this class of threat with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing to contain the process.

A quieter thread runs through several sources: skepticism about unnecessary complexity. [Dan Q's post](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) replaces a tracking-laden Android app with a lightweight webpage. David Crawshaw [argues](/reading/2026-07/2026-07-05t170602-building-a-cloud) that cloud platforms rest on fundamentally wrong abstractions. The [Crafting Interpreters repo](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits in this spirit too: a complete, readable implementation of two interpreters as a learning artifact, with a build system that weaves code and prose together.
