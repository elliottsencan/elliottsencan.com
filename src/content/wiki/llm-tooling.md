---
title: LLM tooling
summary: >-
  The infrastructure layer around large language models: local runners,
  context-management utilities, MCP integrations, knowledge-base patterns, and
  the operational choices that determine how effectively an LLM fits into a
  workflow.
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
compiled_at: '2026-08-17T18:48:22.711Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 1035
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
  cost_usd: 0.028641
---
LLM tooling names the layer of software between a raw model and useful work: runtimes that serve the model, utilities that shape what it sees, integration layers that connect it to external systems, and patterns for organizing the knowledge it draws on.

On the local-inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop environment with an OpenAI-compatible API, support for GGUF and multiple backends, tool-calling, and MCP server integration. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a narrower scope, using the same local-backend options (Ollama, LM Studio) alongside cloud providers for real-time meeting transcription. Both treat local inference as a first-class option, though [a sharp critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that the most popular local runner ships inferior performance relative to llama.cpp directly, obscures that dependency, and is drifting toward a cloud model.

Context management is a recurring pressure point. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs, logs, and RAG chunks before they reach the model, claiming 60-95% token reduction without quality loss. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies wavelet transforms to source code to give LLMs multi-resolution structural views, trading language-specific parsers for a signal-processing approach. The [LostWarrior knowledge-base CLI](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) takes a simpler route: tiered markdown files with a manifest so agents navigate without burning tokens on discovery. The [Karpathy LLM wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base) goes further, using the model itself to build and maintain structured markdown, querying at scale without RAG.

MCP has become the integration substrate connecting models to external capabilities. [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships an MCP server to bring Databricks expertise into coding assistants like Claude Code and Cursor. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) serves documentation to both humans and LLMs via MCP and llms.txt. Anthropic's [MCPB packaging guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) lets developers bundle a local MCP server as a single-click install for Claude Desktop.

Two operational concerns cut across these tools. Security: [cekrem's guide](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should always run inside a Docker sandbox to prevent credential leaks, even in full auto-approve mode. Cost: a [pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between cheapest and most expensive frontier models, making provider-agnostic design a financial necessity. A smaller utility, [claudish-to-english](/reading/2026-08/2026-08-10t220951-gvzdvclaudish-to-english), addresses output legibility by post-processing Claude Code responses through a local model, illustrating how tooling increasingly wraps other tooling.
