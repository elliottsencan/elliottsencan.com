---
title: Supply-chain security
summary: >-
  Attackers compromise open-source packages and repositories to distribute
  malicious code through trusted channels, using techniques like invisible
  Unicode characters and self-propagating payloads that defeat standard review
  and analysis tools.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
aliases:
  - software-security
compiled_at: '2026-05-04T04:08:34.469Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2429
    output_tokens: 448
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
  cost_usd: 0.014007
---
Supply-chain attacks target the trust developers place in third-party packages, repositories, and tooling. Rather than attacking a target directly, adversaries poison upstream dependencies so malicious code arrives pre-installed.

Two recent campaigns illustrate how sophisticated these attacks have become. Researchers at Aikido Security discovered 151 malicious packages across GitHub, npm, and the VS Code marketplace that concealed payloads inside invisible Unicode variation-selector characters [Supply-chain attack using invisible code](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Because the characters are visually absent, both human code review and static analysis tools fail to flag them. The technique directly undermines the two most common defenses developers rely on before trusting a dependency.

A separate campaign targeted the SAP ecosystem specifically. The threat actor TeamPCP compromised four SAP-related npm packages with a credential-stealing payload that harvests cloud secrets and browser passwords, then exfiltrates them via GitHub [SAP-related npm packages compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). The payload was also self-propagating and used Claude Code and VS Code configuration files as persistence vectors, meaning compromise could spread to developer machines that had nothing to do with the original target packages.

Taken together, the two cases show attackers moving up the trust stack. Package registries, code editors, and AI coding tools are all now viable delivery mechanisms. Standard mitigations like reading diffs or running linters are insufficient when payloads hide in invisible characters or piggyback on trusted tool configurations.
