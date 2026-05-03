---
title: AI coding assistants
summary: >-
  Tools like Claude Code, Cursor, and Windsurf accelerate development with
  platform-aware tooling and agent capabilities, but also introduce new attack
  surfaces that threat actors are actively targeting.
sources:
  - 2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
compiled_at: '2026-05-03T19:06:59.737Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 1305
    output_tokens: 441
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
  cost_usd: 0.01053
---
AI coding assistants, tools like Claude Code, Cursor, and Windsurf that integrate directly into developer workflows, are being shaped from two directions at once: efforts to make them more capable and contextually aware, and active exploitation of the trust they are granted in a development environment.

On the capability side, projects like [Databricks ai-dev-kit](/reading/2026-04/2026-04-27t113526-databricks-solutionsai-dev-kit) treat these assistants as first-class consumers of curated knowledge. The kit ships an MCP server, a Python library, and a skill pack specifically so that Claude Code, Cursor, and Windsurf can emit idiomatic Databricks patterns rather than generic code. The premise is that an assistant with 50+ executable, domain-specific tools is meaningfully more useful than one reasoning from general training data alone.

On the threat side, that same deep integration becomes an attack vector. The TeamPCP supply chain attack documented by [The Hacker News](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) poisoned SAP-ecosystem npm packages with a payload that harvested cloud credentials and browser passwords, then used Claude Code and VS Code configuration files as persistence vectors for exfiltration via GitHub. The assistant's config layer, normally a trusted extension point, was repurposed to survive across sessions.

Together these two sources frame a tension at the core of current AI coding assistant design: the same hooks that allow assistants to act on behalf of developers, reading configs, executing tools, accessing credentials, are the hooks that make them attractive targets for persistence and exfiltration.
