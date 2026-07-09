---
title: Supply chain security
summary: >-
  Attackers exploit the trust placed in shared code infrastructure, from
  invisible Unicode payloads in npm packages to self-propagating credential
  stealers, while defenses range from commit signing to agentic vulnerability
  scanning.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-09T23:30:16.299Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 551
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
  cost_usd: 0.017151
---
Supply chain attacks target the distribution layer of software rather than applications directly. Two recent npm incidents illustrate how varied the techniques can be. [Invisible Unicode variation-selector characters](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) were used to encode malicious payloads in 151 packages, hiding them from code review and static analysis while remaining executable at runtime. Separately, the TeamPCP actor [compromised four SAP-ecosystem npm packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a self-propagating payload that harvested cloud secrets and browser passwords, exfiltrated them via GitHub, and used Claude Code and VS Code configuration files as persistence vectors.

Authentication hygiene is a baseline defense. [SSH key-based authentication and commit signing](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) reduce reliance on tokens that can be stolen from environment variables or config files, which is exactly the credential surface the SAP-related attack exploited.

On the detection side, Anthropic's [defending-code-reference-harness](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) demonstrates an agentic pipeline using Claude for autonomous vulnerability discovery, triage, and patching, with gVisor sandboxing to contain the agent itself. A complementary infrastructure angle comes from a developer wishlist for a reimagined code forge, which calls for [signed, offline-usable Actions and stronger CI controls](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) to reduce trust placed in third-party runners and remote scripts.

The through-line across these sources is that supply chain risk lives wherever one project silently depends on another: package registries, CI runners, editor configuration, and version control tooling are all attack surface.
