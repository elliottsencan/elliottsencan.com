---
title: Developer tools
summary: >-
  Specialized software that assists with building, running, debugging, or
  understanding other software, spanning local LLM tooling, CI infrastructure,
  documentation platforms, Kubernetes UIs, and security harnesses.
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
compiled_at: '2026-07-08T00:13:16.234Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4567
    output_tokens: 971
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
  cost_usd: 0.028266
---
Developer tools is a broad category covering any purpose-built software that helps practitioners build, run, debug, or understand other software. The sources here span several distinct problem domains, each illustrating a different dimension of what tooling means in practice.

On the LLM side, two tools address the gap between model capability and local hardware. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) provides custom kernels for fine-tuning and running models locally, claiming up to 30x faster training and 90% less memory than FlashAttention 2. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) sits earlier in the workflow, letting practitioners calculate whether a specific GPU's VRAM can handle a given model before committing to a download or deployment.

Framework tooling shows up in [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms), which provides opinionated design guidance for structuring form and domain models, and in [Temporal](/reading/2026-04/2026-04-30t231511-temporal), a durable execution platform that eliminates manual failure-recovery logic from distributed workflows. [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) extends that theme into continuous integration, using AWS Lambda durable functions to run a stateful, checkpointed CI scheduler without a long-lived process.

Documentation and observability are represented by [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify), an AI-native platform that serves knowledge to both humans and LLMs via llms.txt and MCP, and [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui), an open-source Kubernetes UI consolidating topology, Helm, GitOps, traffic, and security checks into a single binary.

Security tooling appears in two distinct registers. [Anthropic's defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) is an agentic pipeline for autonomous vulnerability discovery and remediation using Claude with gVisor sandboxing. The [supply-chain attack report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) shows the adversarial side: 151 malicious npm and GitHub packages encoded payloads in invisible Unicode variation-selector characters, evading static analysis and code review entirely, which underscores the limits of current tooling.

Other entries address packaging and distribution: [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers bundling a local MCP server into a single-click install for Claude Desktop. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) is a different kind of developer tool entirely, a book-plus-implementation that teaches language implementation through two complete Lox interpreters. [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues at the infrastructure layer that current cloud abstractions are wrong, pointing to VMs tied to fixed resources and slow remote block storage as the root problem.

Taken together, these sources reflect a common pressure: the tools practitioners reach for are increasingly required to handle stateful, distributed, or AI-mediated workloads that older tooling categories were not designed for.
