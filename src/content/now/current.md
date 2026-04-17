---
title: "Now"
description: "What I'm working on right now."
updated: 2026-04-16
standfirst: "Hard August 24 deadline on a backend-first festival platform, and an open-source Angular port of assistant-ui's AI chat primitives mid-build"
---

## Building

Two projects active.

SSBD Platform v2.0 is a backend-first operations platform for Same Same But Different. The festival runs around 7,500 attendees and the existing tooling is a mix of spreadsheets and one-off integrations that don't interoperate well. The platform consolidates that. The build sequence chains through security hardening, Airtable sync for artist and vendor data, a JuiceLabs integration for on-site access control, a mobile app for attendees, and an organizer portal. The final milestone adds maps and push notifications, the two pieces that matter most on festival day. Milestone M6 targets August 3; the hard ship date is August 24, opening day.

herald-ui is an open-source project porting assistant-ui to Angular. assistant-ui is a React library for composable AI chat UI primitives: thread management, message rendering, streaming state, tool call display. Angular has nothing comparable. herald-ui ports that primitive layer so Angular teams have a foundation to build from rather than wiring the same patterns from scratch on every project. Currently at 25 of 50 milestone tasks. The next phase is a personal agent test bed running against the library as a real-world validation.

## Making

Same Same But Different is four months out from the August festival. The platform work in Building is the biggest current investment; operational logistics and booking are running in parallel.