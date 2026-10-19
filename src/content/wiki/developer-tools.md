---
title: Developer tools
summary: >-
  Software built to help developers write, run, debug, secure, and understand
  other software, spanning local utilities, cloud platforms, documentation
  systems, and agentic pipelines.
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
compiled_at: '2026-10-19T22:07:10.567Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1179
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
  cost_usd: 0.03237
---
The category is broad by nature. A developer tool is anything whose primary user is a person building software, and the sources here span enough territory to show what that means in practice: local fine-tuning runtimes, GPU compatibility calculators, CI orchestrators, documentation platforms, Kubernetes dashboards, and security harnesses.

On the local-first end, [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) optimizes LLM training with custom CUDA kernels that cut memory usage by up to 90% compared to FlashAttention 2, making fine-tuning practical on consumer hardware. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) complements this by calculating whether a specific GPU's VRAM can run a given model at various quantization levels, surfacing the compatibility question that comes before any training or inference work. Both tools reflect a shift toward running AI workloads locally rather than through hosted APIs.

At the infrastructure layer, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) persists workflow state at every step so distributed applications recover from failures without custom reconciliation logic, and [Depot's CI orchestrator](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) achieves similar durability by running a stateful CI scheduler on AWS Lambda durable functions without keeping a long-lived process alive. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes topology, Helm, GitOps, live traffic, and security checks into a single open-source binary.

Documentation and knowledge tooling appears in [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify), which serves content to both human readers and LLMs via llms.txt and MCP, blurring the line between docs platform and AI context provider. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) takes a different approach, weaving prose and executable code into a single build system so the book and its two working interpreters stay in sync.

Security is represented by a cautionary case: [a supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) embedded payloads in invisible Unicode variation-selector characters across 151 npm and GitHub packages, bypassing code review and static analysis entirely. Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to exactly this class of threat with an agentic pipeline for autonomous vulnerability discovery and patching, using gVisor sandboxing to contain the process.

The agentic layer shows up across several tools. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) provides a desktop cockpit for orchestrating local AI agent teams with persistent memory and built-in observability. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) runs real-time transcription and AI answers during meetings. The [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging a local MCP server as a distributable Claude Desktop extension. And [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) is a Claude Code plugin that rewrites assistant output into plain English via a local LLM, a tool for making another tool's output legible.

One thread cuts across the whole set: the cost of wrong abstractions. [David Crawshaw](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues cloud platforms are built on fundamentally broken primitives, VMs with fixed resources and slow block devices, and is building a replacement from scratch. [Dan Q](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes a parallel point at the app level, showing that a travel app was simply serving HTML over HTTP and was replaceable with a lightweight webpage. Tooling choices compound; the wrong layer costs everyone downstream.
