---
title: Developer tools
summary: >-
  A broad category of software that reduces friction across the development
  lifecycle, from LLM fine-tuning and CI orchestration to documentation,
  security scanning, and local AI agent management.
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
compiled_at: '2026-07-24T04:59:08.120Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4748
    output_tokens: 915
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
  cost_usd: 0.027969
---
The category spans anything that makes building software faster, safer, or more legible. Recent entries pull in several distinct clusters worth tracing together.

On the LLM side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) delivers custom CUDA kernels that cut fine-tuning memory by 90% versus FlashAttention 2, while [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) helps practitioners decide before committing whether their GPU's VRAM can even hold a given model at a chosen quantization level. Both tools address the same underlying problem: local inference is constrained by hardware, and the gap between what a model needs and what a machine has is opaque without tooling to surface it.

Infrastructure tooling shows up in a few forms. [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications survive failures without hand-rolled reconciliation. [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a related approach, using AWS Lambda durable functions with a two-layer hierarchy and callback-driven job coordination to run stateful CI without a long-lived process. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) packages Kubernetes visibility, Helm, GitOps, live traffic, and MCP for AI agents into a single binary, removing the cloud-account requirement that typically gates this kind of observability.

Documentation and distribution have their own tooling layer. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) targets the overlap between human-readable docs and machine-readable context, adding llms.txt and MCP support so documentation serves agents as well as people. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging a local MCP server as a single-click bundle, making distribution of developer extensions more approachable.

Security tooling sits alongside these. A supply-chain attack documented by [Ars Technica](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded payloads in invisible Unicode variation-selector characters across 151 npm and GitHub packages, bypassing static analysis and human review alike. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) offers an autonomous pipeline for vulnerability discovery and remediation using Claude with gVisor sandboxing, illustrating how agentic tooling is beginning to close gaps that conventional scanners miss.

The local AI agent space is emerging as its own tooling category. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit for running multi-agent teams with persistent wiki memory and built-in observability across 15 LLM providers. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a narrower angle, offering an Electron-based meeting assistant with real-time transcription backed by either cloud or local LLMs.
