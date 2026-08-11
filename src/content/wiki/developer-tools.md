---
title: Developer tools
summary: >-
  Software utilities and platforms that extend what developers can build, run,
  or understand — spanning LLM fine-tuning, CI orchestration, documentation,
  Kubernetes management, security scanning, and more.
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
compiled_at: '2026-08-11T07:54:42.781Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1028
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
  cost_usd: 0.030105
---
The category is broad enough to resist a single definition. What links the sources here is that each tool addresses a specific friction in a development workflow, whether that friction is compute constraints, operational complexity, documentation gaps, or security blind spots.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets the cost of fine-tuning by replacing standard CUDA kernels with custom ones, achieving up to 30x faster training and 90% less memory than FlashAttention 2. Adjacent to that, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) solves a simpler but common pre-flight question: given a specific GPU's VRAM, which open-weight models can actually run on it, and at what quantization level.

Documentation and knowledge tooling shows up in two different forms. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) is an AI-native documentation platform that serves content to both human readers and LLMs via llms.txt and MCP. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) takes the opposite approach — a build system that weaves prose and code together into a finished book site, making the toolchain itself part of the artifact.

Workflow durability is a recurring theme. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar idea to continuous integration, using AWS Lambda durable functions in a two-layer hierarchy to run stateful, checkpointed CI scheduling without a long-lived process.

Operational visibility gets addressed at the infrastructure level by [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), an open-source Kubernetes UI that consolidates topology, Helm, GitOps, live traffic, and security checks into a single binary. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) does something similar for local AI agent workflows, providing a desktop cockpit with persistent memory, multi-agent coordination, and built-in observability across 15 LLM providers.

Security tooling appears in two places. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) is an agentic pipeline for autonomous vulnerability discovery and remediation using Claude, with gVisor sandboxing. A more passive threat is documented in the [supply-chain attack report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and), where 151 malicious npm and GitHub packages hid payloads in invisible Unicode variation-selector characters — invisible to code reviewers and static analysis alike.

Smaller utilities round out the picture. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron desktop assistant for real-time meeting transcription and AI answers, supporting both cloud and local LLM backends. [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) is a Claude Code plugin that rewrites assistant output into plain English via a local Ollama model. [MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click bundles for Claude Desktop distribution.
