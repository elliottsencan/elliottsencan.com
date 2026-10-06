---
title: Developer tools
summary: >-
  Software tools that support building, running, debugging, or understanding
  other software — spanning LLM fine-tuning runtimes, CI orchestrators,
  documentation platforms, UI dashboards, and security harnesses.
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
compiled_at: '2026-10-05T23:51:09.548Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1063
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
  cost_usd: 0.03063
---
Developer tools is a broad category covering anything a programmer reaches for to build, test, ship, or understand software. The sources here span several distinct layers: local ML runtimes, cloud infrastructure tooling, documentation platforms, security pipelines, and specialized utilities that reduce friction at specific points in a workflow.

At the local compute layer, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) provides custom kernels for fine-tuning and running LLMs with up to 30x faster training and 90% less memory than FlashAttention 2. Alongside it, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) gives developers an interactive calculator to determine whether a given GPU can run a specific open-weight model, factoring in quantization, KV cache, and activation overhead before committing to a download.

Orchestration and reliability tooling addresses the problem of long-running, stateful work. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durability idea to continuous integration, using AWS Lambda durable functions in a two-layer hierarchy to run a stateful CI scheduler without keeping a persistent process alive.

Documentation has its own tooling tier. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) is an AI-native documentation platform that serves knowledge to both human readers and LLMs, with support for llms.txt and MCP. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is itself a tool of a different kind: a book whose build system weaves code and prose into a published site, functioning as both educational resource and reference implementation.

At the infrastructure visibility layer, [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary. [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that the abstractions underlying current cloud platforms are wrong — VMs tied to fixed resources and slow remote block storage — and proposes rebuilding from scratch.

Security tooling appears in two forms. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) is an agentic pipeline for autonomous vulnerability discovery and remediation using Claude with gVisor sandboxing. The supply-chain attack covered by [Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) illustrates a blind spot in existing tooling: 151 malicious npm packages hid payloads in invisible Unicode variation-selector characters that bypassed code review and static analysis entirely.

Smaller utilities fill specific gaps. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron desktop assistant for real-time meeting transcription and LLM-generated answers. The [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging a local MCP server as a single-click bundle for Claude Desktop. The [claudish-to-english plugin](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) rewrites Claude Code output into plainer language via a local ollama model. Each addresses friction at a narrow, specific point rather than reimagining the whole stack.
