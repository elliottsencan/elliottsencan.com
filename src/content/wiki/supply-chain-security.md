---
title: Supply-chain security
summary: >-
  Attacks on software supply chains exploit package registries, invisible
  encoding, and stolen credentials to compromise code before it reaches
  production; defenses range from cryptographic signing to agentic vulnerability
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
compiled_at: '2026-07-09T14:20:56.080Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 599
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
  cost_usd: 0.017871
---
Supply-chain attacks target the distribution layer of software rather than end systems directly. Two recent npm incidents illustrate how that surface is being exploited. In one, attackers uploaded 151 malicious npm and GitHub packages that encoded payloads using invisible Unicode variation-selector characters, making the malicious code undetectable to human reviewers and static analysis tools while remaining fully executable at runtime [supply-chain attack using invisible Unicode](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). In a separate campaign, the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a self-propagating credential-stealing payload that harvests cloud secrets and browser passwords, exfiltrates them via GitHub, and abuses Claude Code and VS Code configurations as persistence vectors [SAP-related npm compromise](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

Access credential hygiene is part of the same problem space. Using SSH keys rather than personal access tokens for repository authentication reduces the credential surface that supply-chain attackers can harvest; commit signing with those keys also provides a verifiable chain of authorship for every change [SSH keys for secure connectivity](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). A developer wishlist for a reimagined code forge makes a related point at the platform level: signed, offline-usable CI actions would reduce dependence on third-party action runners that are themselves a supply-chain trust boundary [reimagined GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github).

On the detection and remediation side, Anthropic's defending-code reference harness demonstrates an agentic pipeline that runs threat modeling, scanning, triage, and patching autonomously using Claude, with gVisor sandboxing to contain any code executed during analysis [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). That approach treats vulnerability discovery as an automated, continuous process rather than a periodic audit, which matters when attack techniques like invisible Unicode encoding are specifically engineered to defeat manual review.
