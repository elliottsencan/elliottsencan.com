---
title: Developer tools
summary: >-
  A broad category of software that helps practitioners build, run, debug, and
  understand other software, spanning local LLM runners, CI orchestrators,
  documentation platforms, Kubernetes UIs, and AI coding assistants.
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
compiled_at: '2026-08-11T05:16:34.594Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4895
    output_tokens: 1142
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
  cost_usd: 0.031815
---
Developer tools span every layer of the software lifecycle, from writing and testing code to deploying, monitoring, and securing it. The sources here illustrate how that category is expanding under pressure from two forces: the rising complexity of distributed systems and infrastructure, and the integration of local or hosted LLMs into the toolchain itself.

On the infrastructure side, [Temporal](/reading/2026-04/2026-04-30t231511-temporal) addresses workflow durability by persisting state at every step so distributed applications recover from failures without manual reconciliation, while [Depot CI](/reading/2026-05/2026-05-19t110000-building-ci-with-lambda-durable-functions) takes a similar durable-execution approach to CI orchestration, using AWS Lambda checkpoints to run a stateful scheduler without a long-lived process. [Radar](/reading/2026-05/2026-05-03t105219-radar-open-source-kubernetes-ui) consolidates Kubernetes management into a single open-source binary covering topology, Helm, GitOps, live traffic, and security in one place.

Documentation and knowledge tooling is itself becoming developer infrastructure. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) frames its platform as AI-native, serving knowledge to both human readers and LLMs via llms.txt and MCP endpoints. [Angular's Signal Forms guide](/reading/2026-04/2026-04-30t231412-form-model-design-angular-signal-forms) represents a different kind of tooling artifact: precise framework documentation that constrains how practitioners design form and domain models.

LLM-adjacent tooling is the fastest-moving segment. [Unsloth](/reading/2026-04/2026-04-24t093356-unsloth) offers custom kernels for local fine-tuning that deliver substantially faster training with lower memory than standard approaches. [CanItRun](/reading/2026-04/2026-04-29t173553-canitrun-can-my-gpu-run-this-llm) gives practitioners a quick way to check whether their GPU's VRAM can handle a given open-weight model at various quantization levels. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) is an Electron desktop assistant that provides real-time transcription and AI answers during meetings, supporting both cloud and local LLM backends. [openagentd](/reading/2026-05/2026-05-03t173528-lthoanggopenagentd) packages local multi-agent coordination with a real UI, persistent memory, and built-in observability. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) shows how to bundle a local MCP server into a single-click extension for Claude Desktop.

Security tooling is changing shape too. The [invisible Unicode supply-chain attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) showed that standard code review and static analysis tools missed malicious payloads encoded in variation-selector characters inside npm and GitHub packages, pointing to gaps in existing tooling. [Anthropic's defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) responds to problems like this with an agentic pipeline for autonomous vulnerability discovery and remediation, sandboxed with gVisor.

Two sources push back against tooling accretion from different angles. David Crawshaw's [Building a Cloud](/reading/2026-07/2026-07-05t170602-building-a-cloud) argues that cloud platforms are built on wrong abstractions and that fixing them requires starting over. Dan Q's [reverse-engineering of a travel app](/reading/2026-07/2026-07-14t210058-your-app-could-have-been-a-webpage-so-i-fixed-it-for-you) makes a smaller but related point: app culture adds tooling and distribution overhead that a plain webpage would not require. [Crafting Interpreters](/reading/2026-04/2026-04-30t231027-munificentcraftinginterpreters) sits at the foundation, providing complete interpreter implementations in Java and C as educational tools for understanding how programming languages themselves work.
