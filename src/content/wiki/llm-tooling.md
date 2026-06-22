---
title: LLM tooling
summary: >-
  The infrastructure, utilities, and integration layers built around large
  language models, spanning local inference runtimes, context management, MCP
  servers, knowledge organization, and provider-agnostic design patterns.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - 2026-05/2026-05-14t222554-piyush-mishra-00helply
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - >-
    2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on
  - >-
    2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for
  - 2026-06/2026-06-20t145835-chopratejasheadroom
compiled_at: '2026-06-22T07:21:46.091Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4233
    output_tokens: 994
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
  cost_usd: 0.027609
---
LLM tooling refers to the growing layer of software that sits between raw model APIs and working applications: runtimes for local inference, servers that expose context to models, utilities for compressing or structuring knowledge, and packaging formats that make integrations distributable.

Local inference runtimes represent one axis of this ecosystem. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline desktop environment supporting GGUF/llama.cpp backends, an OpenAI-compatible API, tool-calling, LoRA fine-tuning, and MCP server integration. Meeting assistant [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) supports both cloud and local backends including Ollama and LM Studio, illustrating how local and hosted inference are increasingly treated as interchangeable. [A critical read on Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama's opacity around its llama.cpp dependency, inferior inference performance, and VC-driven cloud pivot make it a poor foundation for serious local setups.

Context management and knowledge organization form another major layer. The [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) bash CLI organizes project context as tiered markdown files with a machine-readable manifest, letting agents navigate without burning excess tokens. A [Reddit guide to Karpathy's LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) extends this: the model itself builds and maintains structured Markdown, queried at scale without RAG. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) attacks the same token budget problem from the output side, compressing tool outputs and RAG chunks by 60-95% before they reach the model.

MCP servers have become a common integration primitive. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) uses an MCP server to deliver wavelet-transformed code context to models without language-specific parsers. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) surfaces documentation to both humans and LLMs via MCP and llms.txt. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click bundles for Claude Desktop, lowering the distribution friction for tooling authors. The [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ties several of these threads together with an MCP server, markdown skills, and a Python core library supporting multiple AI coding assistants.

Security and economics round out the picture. [Running Claude Code inside Docker](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) is advocated as a containment practice to prevent credential leaks when operating agentic tools in auto-approve mode. On pricing, a [Superframeworks analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes that a 75x gap between the cheapest and most expensive frontier models now makes provider-agnostic architecture a financial necessity, not just a design preference.
