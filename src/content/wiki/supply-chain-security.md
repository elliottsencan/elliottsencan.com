---
title: Supply chain security
summary: >-
  Attackers increasingly exploit the software supply chain through poisoned
  packages, invisible-character payloads, and stolen credentials; defenses range
  from signed commits to agentic vulnerability scanning.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
  - 2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness
  - 2026-06/2026-06-23t231556-if-i-could-make-my-own-github
compiled_at: '2026-07-01T02:06:49.101Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2962
    output_tokens: 552
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
  cost_usd: 0.017166
---
Supply chain attacks target the dependencies and tooling that developers trust rather than application code directly. Two recent npm incidents illustrate the breadth of techniques in use. [Invisible Unicode variation-selector characters](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and) were used to encode malicious payloads across 151 packages; the characters are invisible to human reviewers and bypass static analysis, yet remain executable at runtime. Separately, the TeamPCP actor [poisoned four SAP-ecosystem packages](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) with a self-propagating payload that harvests cloud secrets and browser passwords, exfiltrates them through GitHub, and uses Claude Code and VS Code configuration files as persistence vectors. Both cases show that the npm registry and GitHub are now primary attack surfaces for credential theft and malware distribution.

Defensive practice spans multiple layers. At the individual developer level, [SSH key authentication and commit signing](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure) eliminate the credential-exposure risk that PAT tokens carry, reducing one vector that supply chain attackers depend on. At the platform level, [Mat Duggan's wishlist for a reimagined code forge](/reading/2026-06/2026-06-23t231556-if-i-could-make-my-own-github) calls for signed, offline-usable CI actions, addressing the reality that unsigned or remotely fetched automation steps are themselves a supply chain risk.

At a higher level of automation, Anthropic's [defending-code reference harness](/reading/2026-06/2026-06-04t163601-anthropicsdefending-code-reference-harness) demonstrates an agentic pipeline for autonomous vulnerability discovery and remediation using Claude, with gVisor sandboxing to contain any unsafe code executed during scanning. That approach points toward continuous, automated triage as a complement to human code review, which the invisible-Unicode attack specifically circumvented.
