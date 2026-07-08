---
title: Supply chain security
summary: >-
  Attackers increasingly compromise software dependencies at the source,
  exploiting package registries, invisible Unicode payloads, and credential
  theft to reach downstream users before any code review can catch the problem.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-08T00:22:33.349Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 632
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
  cost_usd: 0.018366
---
Supply chain attacks target the trust relationship between developers and the packages, tools, and infrastructure they depend on. Rather than breaching a target directly, attackers insert malicious payloads upstream so that ordinary install or build steps deliver the compromise automatically.

Two recent npm incidents illustrate how varied the techniques have become. In one campaign, attackers published 151 malicious npm and GitHub packages that encoded payloads using invisible Unicode variation-selector characters [Supply-chain attack using invisible Unicode code](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). The characters are visually absent in code review and skipped by static analysis tools, yet remain executable at runtime. In a separate operation, a threat actor identified as TeamPCP poisoned four SAP-ecosystem npm packages with a self-propagating credential harvester that exfiltrates cloud secrets and browser passwords via GitHub and abuses Claude Code and VS Code configuration files as persistence vectors [SAP-Related npm Packages Compromised](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

Defensive responses operate at several layers. Cryptographic commit signing via SSH keys ties code contributions to verified identities, making unsigned or tampered commits detectable before they reach a shared repository [Using SSH Keys to Make Connectivity Simpler and Secure](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). At the forge level, there are open questions about whether platforms like GitHub do enough: one developer wishlist calls for signed, offline-verifiable Actions so that CI pipeline definitions cannot be silently tampered with [If I Could Make My Own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). Agentic pipelines are also entering the defensive picture. Anthropic's reference harness for autonomous vulnerability discovery runs threat modeling, scanning, triage, and patching steps inside a gVisor sandbox, suggesting that LLM-driven tooling may handle some of the detection work that human reviewers and static analyzers currently miss [anthropics/defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). The invisible-Unicode attack is a direct demonstration of why that gap exists: no static tool flagged those packages before publication.
