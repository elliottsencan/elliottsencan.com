---
title: Developer tools
summary: >-
  A broad category of software that helps practitioners build, run, understand,
  and maintain other software, spanning local LLM tooling, CI orchestration,
  Kubernetes management, documentation platforms, and language runtimes.
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
compiled_at: '2026-07-15T10:05:24.642Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4748
    output_tokens: 843
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
  cost_usd: 0.026889
---
The category is wide enough that no single principle unifies every tool in it, but a consistent pressure runs across most: reduce the gap between what a developer intends and what the system actually does.

[Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) and [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) both address friction in local LLM workflows. Unsloth lowers the compute and memory cost of fine-tuning with custom CUDA kernels, while CanItRun gives practitioners a quick answer to the hardware feasibility question before they commit to downloading a model. Together they represent a class of tools that make capability accessible without requiring cloud spend.

On the infrastructure side, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) and [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) both solve the problem of stateful, long-running processes in environments that prefer stateless primitives. Temporal persists workflow state at every step so distributed applications recover from failures automatically. Depot's CI orchestrator achieves similar durability by running a checkpointed scheduler on AWS Lambda durable functions rather than a continuously running process.

[Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) takes the Kubernetes control plane and collapses topology, Helm, GitOps, traffic, and security into a single binary with no cloud account required. This reflects a recurring pattern: operational complexity consolidated behind one interface rather than spread across a dozen CLI tools.

[Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) applies the same consolidation logic to documentation, serving structured knowledge to both human users and LLM agents via llms.txt and MCP. [Build a Desktop Extension with MCPB](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) extends this pattern to local MCP server distribution, letting developers package and ship integrations as single-click bundles for Claude Desktop.

Security tooling surfaces as a counterpoint. The [supply-chain attack on npm and GitHub](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) using invisible Unicode characters exposed a gap that standard static analysis tools cannot close. Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to exactly this class of problem with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing to contain the process.

[Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits at the educational end of the spectrum: a complete dual-implementation language runtime distributed as a repository whose build system weaves code and prose together. It is less about productivity and more about transmitting the craft of building language tools from first principles.
