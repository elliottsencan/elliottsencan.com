---
title: Enterprise software
summary: >-
  Enterprise software sits at the intersection of organizational process,
  developer tooling, and institutional trust, where adoption decisions carry
  workforce, security, and governance consequences that consumer software does
  not.
sources:
  - 2026-04/2026-04-24t162154-he-came-he-saw-he-cooked
  - 2026-04/2026-04-30t231435-mintlify
  - 2026-04/2026-04-30t231537-startupsrip
  - 2026-04/2026-04-30t231709-conductor
  - 2026-04/2026-04-30t231745-optimal-vs-usertesting
  - >-
    2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing
  - >-
    2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects
  - >-
    2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile
  - 2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees
  - 2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate
compiled_at: '2026-06-20T22:10:07.756Z'
compiled_with: claude-sonnet-4-6
compile_cost:
  usage:
    input_tokens: 4506
    output_tokens: 748
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
  cost_usd: 0.024738
---
Enterprise software is distinguished less by feature count than by the weight of decisions made around it. Procurement, integration, compliance, and workforce implications all compound in ways that consumer software does not face.

The security surface is one place this weight shows up clearly. The supply chain attack on SAP-ecosystem npm packages [described here](/reading/2026-05/2026-05-01t102345-sap-related-npm-packages-compromised-in-credential-stealing) illustrates how deeply embedded enterprise platforms become attack targets: compromising packages adjacent to SAP gave the threat actor access to cloud credentials and browser secrets across every organization that depended on that ecosystem. Enterprise adjacency amplifies blast radius.

Governance pressure shapes tooling choices too. [Derosiaux argues](/reading/2026-06/2026-06-02t212937-no-mcp-is-definitely-not-dead-the-nsa-agrees) that MCP's real value proposition is enterprise governance: a policy-aware, auditable proxy between AI agents and internal resources, something a developer CLI cannot provide at organizational scale. Enterprise buyers need controls that developer-first tools defer.

Workforce consequences follow procurement decisions closely. [Falk and Tsoukalas](/reading/2026-05/2026-05-02t155432-cognitive-offloading-and-ai-how-reliance-on-llms-affects) show that competitive pressure pushes firms to automate and reduce headcount before the productivity gains of AI tools are actually proven, creating a strategic trap where individually rational decisions produce collectively worse outcomes.

Integration complexity is another persistent theme. [Conductor](/reading/2026-04/2026-04-30t231709-conductor) exists precisely because QuickBooks Desktop still runs real accounting workflows inside small and mid-sized enterprises, requiring an API layer that abstracts decades of qbXML and SOAP conventions so developers can interact with those systems without becoming historians of legacy protocols.

Even documentation and onboarding carry enterprise-specific weight. [Mintlify](/reading/2026-04/2026-04-30t231435-mintlify) markets enterprise compliance alongside AI-native knowledge serving, because regulated organizations cannot simply adopt any documentation tool. And the dysfunction [DHg describes](/reading/2026-05/2026-05-08t112608-your-onboarding-is-a-hazing-ritual-and-you-call-it-agile) in engineering onboarding, where packed calendars and same-sprint workloads mask structural failure, is most acute inside organizations large enough for those practices to become invisible to leadership.

Human trust is what enterprise software ultimately mediates, and it erodes faster than it builds. [Ghost in the Data notes](/reading/2026-06/2026-06-17t124905-the-competitive-moat-that-ai-cant-replicate) that organizations automating away human connection destroy loyalty that no personalization engine can reconstruct. The same logic applies inside enterprises: tools that strip out relationship and accountability leave costs that rarely appear in the original business case.
