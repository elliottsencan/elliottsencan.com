---
title: LLM tooling
summary: >-
  The growing ecosystem of software for running, directing, and maintaining
  large language models, spanning local inference runtimes, agentic coding
  environments, knowledge-base scaffolding, and distribution formats for model
  integrations.
sources:
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base
  - 2026-04/2026-04-30t232126-lostwarriorknowledge-base
  - 2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama
  - 2026-05/2026-05-05t071908-oobaboogatextgen
  - >-
    2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio
  - >-
    2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box
  - 2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
compiled_at: '2026-06-18T21:50:53.685Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 3787
    output_tokens: 824
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
  cost_usd: 0.023721
---
LLM tooling covers the practical infrastructure between a model and a working system: how the model runs, how it receives context, how it acts on the outside world, and how its outputs stay reliable over time.

On the local inference side, choices matter more than they appear. [oobabooga/textgen](/reading/2026-05/2026-05-05t071908-oobaboogatextgen) offers a fully offline desktop runtime with tool-calling, LoRA fine-tuning, and an OpenAI-compatible API, with no telemetry. A pointed critique of Ollama — the more popular alternative — [argues](/reading/2026-05/2026-05-05t071447-friends-dont-let-friends-use-ollama) that it obscures its llama.cpp dependency, misleads on model naming, ships a closed-source GUI, and has drifted toward cloud monetization. LM Studio represents another path: [Zack Reed's walkthrough](/reading/2026-05/2026-05-12t215147-running-claude-code-with-a-local-model-via-lm-studio) shows how to redirect Claude Code's API calls to a locally-running model via environment variables, surfacing real quirks in the process.

Agentic coding tools introduce their own safety surface. [Christian Ekrem argues](/reading/2026-05/2026-05-18t095002-if-youre-running-claude-code-please-run-it-in-a-box) that Claude Code should always run inside Docker's sbx sandbox, noting that sandboxing prevents credential leaks and filesystem damage while also removing confirmation prompts and speeding up agentic workflows. Distribution is also maturing: Anthropic's [MCPB format](/reading/2026-05/2026-05-27t181732-build-a-desktop-extension-with-mcpb) packages local MCP servers as single-click installable bundles for Claude Desktop. The underlying protocol has faced skepticism, but [a Substack defense](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) cites NSA endorsement as evidence MCP remains central to the AI tooling ecosystem.

Knowledge management for LLMs is its own sub-discipline. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) approaches it from the documentation side, serving content to both humans and models via llms.txt and context-aware agents. More structural approaches appear in [a Reddit guide to Karpathy's LLM-compiled wiki pattern](/reading/2026-04/2026-04-30t232052-how-to-implement-karpathys-llm-knowledge-base), which has the model ingest raw documents, build structured Markdown, and query at scale without RAG. [LostWarrior/knowledge-base](/reading/2026-04/2026-04-30t232126-lostwarriorknowledge-base) goes lower-level: a zero-dependency bash CLI that organizes project context into tiered Markdown with a machine-readable manifest so agents can navigate without burning excess tokens.
