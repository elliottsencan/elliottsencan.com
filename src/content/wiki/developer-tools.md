---
title: Developer tools
summary: >-
  Discrete software tools that extend what practitioners can build, debug,
  deploy, or understand, spanning LLM fine-tuning, CI orchestration,
  documentation, security scanning, Kubernetes management, and more.
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
compiled_at: '2026-07-09T23:21:01.735Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4567
    output_tokens: 1061
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
  cost_usd: 0.029616
last_source_added: '2026-07-15T04:00:58.131Z'
---
The category is broad almost to the point of uselessness, but a few coherent threads run through the sources here. The first is local-first or self-hosted tooling that reduces dependence on cloud vendors. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers up to 30x faster LLM fine-tuning with 90% less memory by writing custom kernels, letting practitioners run training on consumer hardware. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) takes the prerequisite step further, calculating before you even start whether a given GPU's VRAM can handle a specific model and at what quantization level. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) and [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) both run locally on the desktop, the former as a cockpit for multi-agent teams and the latter as a meeting assistant with local LLM backend support.

A second thread is infrastructure tooling that hides operational complexity. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without custom reconciliation logic. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar idea to continuous integration, using AWS Lambda durable functions to run a stateful, checkpointed scheduler without a long-lived process. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary.

Documentation and developer experience tools form a third cluster. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets both human readers and LLMs, supporting llms.txt and MCP alongside standard docs. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) represents framework-level tooling that shapes how developers model data. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits at the educational end: a complete book and two interpreter implementations whose build system weaves code and prose into one artifact.

Security is a recurring concern across the ecosystem. The [Ars Technica report on Unicode supply-chain attacks](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) shows that 151 malicious npm and GitHub packages hid payloads in invisible variation-selector characters, bypassing both code review and static analysis. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to that class of threat with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing. The [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows MCP becoming a distribution primitive, bundling local servers into single-click installers for Claude Desktop.

[Poolday](/reading/2026-04/2026-04-30t231206-poolday) and [Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) sit at opposite ends of the spectrum: one automates video production through 100+ generative models, the other offers UX research infrastructure spanning card sorting to AI synthesis. Both reflect the broader pattern of tools that absorb previously manual workflows into automated or AI-assisted pipelines.
