---
title: "Now"
description: "What I'm working on right now."
updated: 2026-04-17
standfirst: "Heads-down on the Same Same But Different festival platform before August 24, reading Chip Huyen's AI Engineering book, and watching Coachella from the couch."
---

## Building

SSBD Platform v2.0 is the main thing. It's a full festival operations platform for Same Same But Different, built backend-first. The current milestone covers maps, push notifications, and general festival readiness, with a hard ship date of August 24. The stack runs through a custom backend with Airtable sync, JuiceLabs integration, and an Expo/React Native mobile app. There are 40 open issues in the milestone and zero closed, so the next few months are heads-down.

Alongside that, herald-ui is an open-source Angular port of assistant-ui. The idea is composable AI chat UI primitives for Angular, since that ecosystem has basically nothing comparable to what React developers have. It's sitting at 25 of 50 milestone issues closed and active. I'm using it as a personal agent test bed while the library takes shape.

## Thinking about

The overlap between festival operations tooling and general event tech. Building SSBD Platform forces decisions about data ownership, offline-first UX, and real-time sync that most off-the-shelf ticketing platforms don't let you make. There's probably something worth writing about there once the August crunch is done.

On the herald-ui side, the Angular component model creates interesting constraints for streaming UI. React's concurrent rendering is what most AI chat libraries are designed around, so porting the primitives isn't a straight translation. The Apollo piece on agents needing structured knowledge over open-ended retrieval is sitting in the back of my head too; it has direct implications for how herald-ui surfaces context to an agent.

## Reading / Listening

Working through Chip Huyen's *AI Engineering: Building Applications with Foundation Models*. Dense and practical in equal measure. Also mid-way through *Kantovan Vault* by Joel Shepherd, which is the kind of hard sci-fi that makes a long reading session disappear.

## Currently

Couchella weekend. Love Coachella, love watching it from the couch even more. The livestream keeps getting better.