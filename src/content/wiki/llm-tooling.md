---
title: LLM tooling
summary: >-
  The practical layer of software, servers, and conventions that connects LLMs
  to codebases, knowledge bases, and user workflows, spanning inference
  backends, context delivery, MCP packaging, and cost management.
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
compiled_at: '2026-11-17T01:45:59.908Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 930
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
  cost_usd: 0.027066
---
LLM tooling is the category of software that sits between a raw model and productive use: inference runtimes, context-preparation utilities, protocol adapters, and distribution mechanisms. The sources here span that full stack.

On the inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a local web UI with an OpenAI-compatible API, GGUF support, tool-calling, and MCP servers, while [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) demonstrates switching between cloud and local backends for real-time transcription. [Friends Don't Let Friends Use Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama's convenience came at the cost of obscuring its llama.cpp dependency and inferior inference performance, suggesting that backend choice has real quality and strategic implications.

Context delivery is a consistent pressure point. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to produce token-efficient structural views without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction. The LostWarrior knowledge-base CLI takes a different angle, organizing project context as [tiered markdown files](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) with both a human-readable index and a machine-readable manifest, letting agents navigate without burning excess tokens.

MCP is the protocol threading through several sources. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) packages domain expertise as an MCP server consumed by Claude Code, Cursor, and Gemini CLI. [Anthropic's MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) describes bundling a local MCP server into a single-click .mcpb file for Claude Desktop distribution. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) integrates MCP into documentation so knowledge is served to both humans and LLM agents from the same source.

Cost and safety round out the stack. [AI model pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) shows a 75x spread between cheapest and most expensive frontier models, making provider-agnostic design a financial requirement. [Claude Code sandboxing](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic tools with file system access should run inside Docker containers to prevent credential leaks and production data loss. The [claudish-to-english plugin](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english) illustrates a lighter safety-adjacent concern: routing assistant output through a local model to strip hedging prose, keeping results readable without altering underlying behavior.
