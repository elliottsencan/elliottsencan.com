---
title: Developer tools
summary: >-
  Software and platforms that extend what individual developers and teams can
  build, run, debug, and secure — spanning LLM fine-tuning rigs, CI
  orchestrators, documentation platforms, Kubernetes dashboards, and code
  security harnesses.
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
compiled_at: '2026-09-28T23:03:29.588Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1263
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
  cost_usd: 0.03363
---
Developer tools span a wide range of concerns: accelerating model training, planning infrastructure capacity, securing dependency chains, orchestrating workflows, and generating documentation. What connects them is a shared goal of reducing friction between intent and execution.

On the local-AI side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom kernels that make LLM fine-tuning up to 30x faster with 90% less memory than FlashAttention 2, and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps developers plan before they download, calculating which quantization levels a given GPU's VRAM can handle and estimating tokens-per-second. Together they address the two sequential questions of local LLM work: can I run this, and how do I train it faster.

Workflow durability surfaces in two distinct contexts. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists distributed workflow state at every step so applications recover from failure without manual reconciliation. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar principle to continuous integration, using AWS Lambda durable functions and a two-layer scheduler so CI orchestration survives without a long-lived process.

Documentation and API surface tooling appear in [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify), an AI-native documentation platform that serves knowledge to both human users and LLMs via llms.txt and MCP support. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) represents framework-level tooling, offering structured guidance on form model design including type specificity and the translation between form and domain models.

Infrastructure visibility gets its own dedicated tool in [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), an open-source Kubernetes UI consolidating topology, Helm, GitOps, traffic, security checks, and MCP for AI agents into a single binary with no cloud account required. At the cloud infrastructure layer, [exe.dev](/reading/2026-07/2026-07-05t170602-building-a-cloud) critiques the wrong abstractions underlying current cloud platforms, arguing that VMs tied to fixed resources and slow remote block storage impose unnecessary costs.

Security tooling spans both offense and defense. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) implements an agentic pipeline for autonomous vulnerability discovery and patching using Claude with gVisor sandboxing. On the threat side, [an Ars Technica report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documents 151 malicious npm and GitHub packages that hid payloads in invisible Unicode variation-selector characters, bypassing code review and static analysis tools entirely, exposing a gap that existing tooling does not yet close.

Desktop and agent-facing tooling rounds out the picture. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a cockpit for running teams of local AI agents with persistent wiki memory and built-in observability. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron meeting assistant combining real-time transcription with both cloud and local LLM backends. [A Claude Code plugin](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) rewrites assistant output into plain English via a local ollama model. [Building an MCP bundle](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) demonstrates how local MCP servers can be packaged as single-click .mcpb files for distribution through Claude Desktop's Connectors Directory.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) and the argument that [apps could have been webpages](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) both, in different registers, question the layers developers build on top of: the former by teaching how languages work from the ground up, the latter by showing how unnecessary abstraction imposes real costs on developers and users alike.
