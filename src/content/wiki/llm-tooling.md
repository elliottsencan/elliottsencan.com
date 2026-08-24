---
title: LLM tooling
summary: >-
  The software layer that makes LLMs useful in practice: local inference
  runtimes, context-management utilities, MCP integrations, knowledge-base
  compilers, and provider-agnostic wrappers that reduce cost and surface model
  capabilities to applications.
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
  - 2026-08/2026-08-10t220951-gvzdvclaudish-to-english
compiled_at: '2026-08-24T18:50:06.806Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1167
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
  cost_usd: 0.030621
---
LLM tooling covers the infrastructure and utilities that sit between a raw model and a working application. The category is broad enough to include local inference servers, context-compression proxies, knowledge-base compilers, sandboxing patterns, and packaging formats for sharing model integrations.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline web UI with an OpenAI-compatible API, GGUF/llama.cpp support, tool-calling, and MCP server integration. It represents the mature end of local runtimes, while [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama, the more popular entrypoint, obscures its llama.cpp dependency, ships inferior inference performance, and is drifting toward a closed-source cloud product. The practical gap between these two positions is a useful indicator of how contested the local-model toolchain still is.

Context management is increasingly its own discipline. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) takes a different angle, applying wavelet transforms to source code to give LLMs multi-resolution structural views without language-specific parsers. Both address the same underlying constraint: context windows are expensive and finite.

Knowledge-base tooling approaches this from the data side. The [Karpathy wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) has the model itself compile and maintain structured Markdown files, querying at scale without RAG, with periodic health checks against drift. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) implements a tiered bash CLI that produces both a human-readable INDEX.md and a machine-readable manifest.json for agent navigation. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) generalizes this to documentation platforms, supporting llms.txt and MCP so that docs serve both humans and models.

MCP is emerging as a packaging and integration layer across several of these tools. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise to coding assistants via an MCP server alongside markdown skill files and a Python library. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) lets developers bundle a local MCP server as a single-click .mcpb file for Claude Desktop distribution.

Security is underexplored in most tooling discussions. [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues for running agentic coding tools inside Docker containers to prevent credential leaks and accidental production writes, a concern that applies broadly to any tool-calling setup with filesystem or network access.

Pricing shapes which tools are viable. The [AI model pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) documents a 75x spread between cheapest and most expensive frontier models, with practical advice to build provider-agnostic from day one. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply), a meeting assistant, illustrates this by supporting both cloud APIs and local runtimes as interchangeable backends. The [claudish-to-english plugin](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english), which rewrites Claude's output through a local model for plain-English rendering, is a small example of layering cheap local inference on top of a more capable cloud model to reduce verbosity costs.
