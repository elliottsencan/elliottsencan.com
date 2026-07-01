---
title: Supply chain security
summary: >-
  Software supply chains are under active attack via package poisoning,
  invisible-code steganography, and credential theft; defenses range from
  cryptographic signing and sandboxed scanning to forge-level policy controls.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-01T00:44:24.044Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 647
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
  cost_usd: 0.018591
---
Supply chain attacks target the distribution layer between a project's upstream dependencies and the developer who installs them, making the dependency ecosystem itself the attack surface rather than any one application.

Two recent npm incidents illustrate how varied the techniques have become. Attackers published 151 malicious packages to npm and GitHub that encoded their payloads using invisible Unicode variation-selector characters, characters that are syntactically inert to human reviewers and most static analysis tools but are parsed and executed at runtime [Supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Separately, the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a self-propagating payload that harvests cloud credentials and browser passwords, exfiltrates them via GitHub, and abuses Claude Code and VS Code configuration files as persistence vectors [SAP-related npm compromise](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). Together these cases show that attackers are exploiting both perceptual blind spots in code review and trust in widely-used tooling configurations.

Credential hygiene at the developer level is a related control. Replacing personal access tokens with SSH keys for remote authentication and commit signing removes one class of credential that supply chain attackers routinely harvest [SSH key authentication](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure).

At the detection and remediation end, Anthropic's reference harness for autonomous vulnerability discovery runs Claude through threat modeling, scanning, triage, and patching inside a gVisor sandbox, showing how agentic pipelines can close the gap between finding a vulnerable dependency and shipping a fix [defending-code-reference-harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). Complementing this, a developer wishlist for a reimagined code forge calls for signed, offline-usable CI actions and stricter PR approval controls as structural protections that would make it harder to introduce malicious code through the review process itself [If I could make my own GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). The through-line across these sources is that effective supply chain defense requires controls at every layer: the package registry, the developer workstation, the CI pipeline, and the forge itself.
