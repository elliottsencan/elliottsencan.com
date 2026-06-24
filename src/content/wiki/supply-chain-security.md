---
title: Supply chain security
summary: >-
  Attackers increasingly target software supply chains through poisoned
  packages, invisible code payloads, and compromised credentials; defenses span
  cryptographic signing, agentic scanning, and forge-level tooling.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-06-24T06:37:44.853Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 578
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
  cost_usd: 0.017556
---
Supply chain attacks compromise software before it reaches end users, typically by poisoning upstream dependencies rather than targeting applications directly. Two recent npm incidents illustrate the range of techniques in play. One campaign uploaded 151 malicious packages encoding payloads in invisible Unicode variation-selector characters [invisible-unicode attack](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and), bypassing code review and static analysis because the hidden bytes are visually absent but executable at runtime. A separate campaign by the TeamPCP threat actor poisoned four SAP-ecosystem npm packages with a self-propagating credential harvester that exfiltrated cloud secrets and browser passwords via GitHub, using Claude Code and VS Code configs as persistence vectors [SAP npm compromise](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing).

The authentication layer matters too. Relying on personal access tokens for remote machine access creates a credential surface attackers can harvest. SSH key-based authentication with commit signing reduces that surface by eliminating reusable secrets from the authentication path [SSH keys guide](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure).

On the detection side, Anthropic's defending-code reference harness demonstrates an agentic pipeline that runs threat modeling, vulnerability scanning, triage, and patching autonomously, using gVisor sandboxing to contain the execution environment [defending-code harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness). That kind of automated scanning becomes more valuable as attack surface grows with package counts.

At the forge level, Mat Duggan's wishlist for a reimagined GitHub includes signed and offline-usable Actions, which addresses a structural gap: CI actions fetched at runtime from third-party sources are themselves a supply chain vector [reimagined GitHub](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github). Signing artifacts and pinning dependencies at the infrastructure layer closes attack paths that code review alone cannot catch.
