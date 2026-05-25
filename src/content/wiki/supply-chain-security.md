---
title: Supply-chain security
summary: >-
  Attackers compromise software supply chains by poisoning packages, hiding
  malicious payloads in unexpected places, and abusing trusted tooling, making
  conventional code review and static analysis insufficient defenses.
sources:
  - >-
    2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure
compiled_at: '2026-05-25T19:27:30.000Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 2665
    output_tokens: 458
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
  cost_usd: 0.014865
---
Supply-chain attacks target the infrastructure developers trust rather than the end application. Two recent cases illustrate how varied the attack surface is.

Researchers at Aikido Security found 151 malicious packages across GitHub, npm, and the VS Code marketplace that embed payloads in invisible Unicode variation-selector characters [invisible-code](/reading/2026-04/2026-04-30t231634-supply-chain-attack-using-invisible-code-hits-github-and). Because those characters are non-printing, standard code review and static analysis tools pass over them entirely, removing two of the most common defenses developers rely on.

A separate campaign, attributed to the threat actor TeamPCP, poisoned four SAP-ecosystem npm packages with a self-propagating credential-stealing payload [sap-npm](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing). The payload harvested cloud secrets and browser passwords, exfiltrated them through GitHub, and used Claude Code and VS Code configuration files as persistence vectors, turning developer tooling itself into part of the attack chain.

Hardening the authentication layer reduces some of this exposure. SSH key pairs eliminate the need for long-lived personal access tokens, which are a frequent target of credential-harvesting malware [ssh-keys](/reading/2026-05/2026-05-04t231548-using-ssh-keys-to-make-connectivity-simpler-and-secure). SSH-based commit signing also ties commits to a verified identity, making it harder to introduce malicious changes under a stolen credential. These controls do not address payload obfuscation or package poisoning directly, but they narrow the blast radius when credentials are compromised.
