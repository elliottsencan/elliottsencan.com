---
title: LLM tooling
summary: >-
  The infrastructure layer for integrating LLMs into development workflows,
  spanning local inference runtimes, context packaging, MCP servers,
  knowledge-base formats, and provider-agnostic API strategies.
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
compiled_at: '2026-06-21T20:17:13.344Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4233
    output_tokens: 981
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
  cost_usd: 0.027414
---
LLM tooling covers the software layer between raw model APIs and working applications: runtimes that execute models locally, servers that expose capabilities to AI coding assistants, formats for packaging context efficiently, and libraries that manage token budgets.

On the local inference side, [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI with an OpenAI-compatible API, GGUF/llama.cpp backends, tool-calling, and MCP server support. [Helply](/reading/2026-05/2026-05-14t222554-piyush-mishra-00helply) takes a similar multi-backend stance, routing to cloud or local providers interchangeably. The local runtime space is not without friction: [Zetaphor's critique of Ollama](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues that Ollama obscured its llama.cpp dependency, ships inferior inference performance, and is pivoting toward a closed-source cloud product, which matters when teams build toolchains around a runtime they assume will stay local and open.

Context packaging is a recurring theme. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) structures project context as tiered markdown files with a machine-readable manifest so agents navigate without burning excess tokens. The Karpathy wiki pattern, outlined in [a Reddit guide](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), goes further: ingest raw documents, have the model build and maintain structured markdown, query at scale without RAG, and run health checks to prevent knowledge drift. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code to produce multi-resolution structural views, giving LLMs precise context without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) compresses tool outputs and RAG chunks before they reach the model, reporting 60-95% token reduction.

MCP has become a common integration surface. [Databricks' ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) ships Databricks expertise to coding assistants via an MCP server. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) exposes documentation to both humans and LLMs via MCP and llms.txt. Anthropic's [MCPB guide](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) covers packaging a local MCP server as a single-click bundle for Claude Desktop.

Two cross-cutting concerns appear across sources. Security: [cekrem's sandboxing guide](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues that agentic coding tools should run inside Docker containers to prevent credential leaks and accidental data destruction. Economics: a 75x token-price gap between the cheapest and most expensive frontier models, documented in [Chaturvedi's pricing analysis](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on), makes provider-agnostic architecture a practical requirement rather than a nice-to-have.
