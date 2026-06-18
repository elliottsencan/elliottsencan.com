---
title: Developer tools
summary: >-
  Software and platforms built to help developers write, run, test, secure, and
  understand code, spanning LLM utilities, CI infrastructure, documentation, and
  UX research platforms.
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
compiled_at: '2026-06-18T22:49:59.387Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4600
    output_tokens: 1040
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
  cost_usd: 0.0294
---
Developer tools span a broad surface area: anything purpose-built to make the act of writing, running, testing, or shipping software more tractable. The sources here cover several distinct layers of that landscape.

At the model-development end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom CUDA kernels for fine-tuning and running LLMs locally, achieving up to 30x faster training and 90% lower memory consumption than FlashAttention 2. Complementing that, [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) gives practitioners a quick way to determine whether a given GPU's VRAM can run a specific open-weight model, surfacing compatible quantization levels and estimated throughput before any compute is committed.

Documentation and knowledge management have their own tooling category. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native documentation platform, serving content to both human readers and LLMs via llms.txt and MCP integration. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) takes a different angle: a build system that weaves prose and executable code into a single artifact, treating the book itself as a developer tool for learning language implementation.

On the infrastructure side, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) provides durable execution for distributed workflows, persisting state at every step so applications recover from failures without manual reconciliation. Depot's CI system takes a related approach, using [AWS Lambda durable functions](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) to run a stateful, checkpointed workflow scheduler without maintaining a long-lived process.

Security tooling appears in two forms. The [supply-chain attack report](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) documents how invisible Unicode variation-selector characters were used to hide malicious payloads in npm packages, bypassing code review and static analysis entirely. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to that class of threat with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing for safe execution.

Several tools address the agent and desktop layer. [OpenAgentD](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit for local multi-agent systems with persistent memory and built-in observability. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron-based meeting assistant using local or cloud LLM backends for real-time transcription. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging local MCP servers as single-click bundles for Claude Desktop. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) sits at the infrastructure-UI intersection, consolidating Kubernetes topology, Helm, GitOps, and MCP agent access into a single binary.

Rounding out the set, [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) documents framework-level form-model design patterns, and [Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) represents UX research tooling, distinguishing its card-sorting and tree-testing platform from moderated session tools like UserTesting.
