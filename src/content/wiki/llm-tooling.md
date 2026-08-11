---
title: LLM tooling
summary: >-
  The infrastructure, SDKs, local runtimes, and context-delivery mechanisms
  built specifically to make LLMs useful in development workflows, from
  knowledge bases and MCP servers to inference backends and token management.
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
compiled_at: '2026-08-11T07:59:08.204Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4372
    output_tokens: 997
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
  cost_usd: 0.028071
---
LLM tooling names the growing layer of software built not to train models but to make them useful in practice: runtimes that host models locally, servers that feed structured context, libraries that compress token bloat, and packaging systems that ship integrations to end users.

On the local inference side, the choices carry real tradeoffs. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) provides a fully offline web UI with an OpenAI-compatible API, multi-backend support, LoRA fine-tuning, and MCP server integration. Ollama is the better-known alternative, but [a critical history of the project](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) argues it obscures its llama.cpp dependency, ships inferior inference performance, and is drifting toward a VC-backed cloud model that undermines its local-first promise.

Context delivery has become its own engineering problem. [WaveScope](/reading/2026-06/2026-06-03t105229-putting-code-under-a-microscope-wavelet-based-context-for) applies Ricker wavelet transforms to source code as a 1D signal, producing multi-resolution structural views through an MCP server without language-specific parsers. [Headroom](/reading/2026-06/2026-06-20t145835-chopratejasheadroom) takes the opposite angle, compressing tool outputs, logs, and RAG chunks before they reach the model, reporting 60-95% token reduction. Karpathy's LLM wiki pattern, documented in [a Reddit walkthrough](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), sidesteps RAG entirely by having the model build and maintain structured Markdown files that can be queried directly. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) implements a related idea with a zero-dependency bash CLI that generates both a human-readable INDEX.md and a machine-readable manifest.json for agent navigation.

Packaging and distribution are maturing. Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) lets developers bundle a local MCP server as a single-click .mcpb file for Claude Desktop, with a manifest, bundled Node.js runtime, and a path to the Connectors Directory. The [Databricks AI Dev Kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) shows a composable approach: an MCP server, markdown skills, a Python core library, and a builder app that together bring Databricks expertise into Claude Code, Cursor, and Gemini CLI. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) extends the pattern to documentation, serving knowledge to both human readers and LLMs via llms.txt and MCP support.

Security and cost are cross-cutting concerns. [One post](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) argues Claude Code should run inside Docker's sbx sandbox to prevent credential leaks even in full auto-approve mode. On cost, [an analysis of the AI pricing war](/reading/2026-05/2026-05-31t072101-the-ai-model-pricing-war-is-here-and-your-margins-depend-on) notes a 75x gap between the cheapest and most expensive frontier models, making provider-agnostic architecture a practical necessity rather than a nice-to-have.
