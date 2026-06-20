---
title: Developer tools
summary: >-
  A broad category of software that helps engineers build, test, run, and
  maintain other software, spanning local LLM tooling, CI infrastructure,
  documentation platforms, Kubernetes UIs, and security-aware package
  ecosystems.
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
compiled_at: '2026-06-20T22:00:14.524Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4430
    output_tokens: 1081
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
  cost_usd: 0.029505
---
The sources here span a wide slice of what gets called developer tooling: local model infrastructure, CI orchestration, documentation platforms, UI frameworks, and package-ecosystem security. What ties them is the underlying question of what it costs to build and run software reliably.

On the model-side, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) targets the gap between consumer hardware and LLM fine-tuning by delivering up to 30x faster training and 90% less memory usage versus FlashAttention 2, while [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) solves the preceding question: whether a given GPU can run a chosen model at all, including quantization tradeoffs and estimated tokens-per-second. Both tools reduce friction at the infrastructure layer before any application code is written.

For running agents locally, [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit with persistent wiki memory and multi-agent coordination across 15 LLM providers, while [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a narrower scope as an Electron meeting assistant with real-time transcription and pluggable cloud or local LLM backends.

On the infrastructure side, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without manual reconciliation, and [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) applies a similar durability idea to CI orchestration via AWS Lambda durable functions and a two-layer Run/Workflow hierarchy.

Documentation is itself a tool. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) positions itself as an AI-native documentation platform serving both human users and LLMs, with MCP and llms.txt support. [Angular Signal Forms](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) exemplifies a different kind of tooling artifact: framework documentation that encodes architectural opinion, covering type specificity and form-to-domain-model translation.

[Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, traffic, and security into a single binary with no cloud account required, including MCP for AI agents. The [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) from Anthropic shows how local MCP servers can be packaged as single-click bundles for Claude Desktop, suggesting that distribution and discoverability are now first-class tooling concerns.

Security cuts across all of it. [The npm Unicode attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded payloads in invisible variation-selector characters across 151 packages, defeating both code review and static analysis. The [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) from Anthropic shows the countermove: an agentic pipeline using Claude for autonomous vulnerability discovery, triage, and patching inside a gVisor sandbox.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) and [Optimal Workshop](/reading/2026-04/2026-04-30t231745-optimal-vs-usertesting) sit at the edges of this grouping. The former is a resource for building language tools from scratch; the latter is a UX research platform whose inclusion here reflects that research tooling is part of the broader developer workflow even when not writing code directly.
