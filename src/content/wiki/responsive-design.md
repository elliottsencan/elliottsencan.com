---
title: Responsive design
summary: >-
  Modern CSS primitives like clamp(), intrinsic grid, and container queries can
  replace viewport breakpoints as the primary responsive engine, reserving media
  queries for device capabilities and user preferences.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
related_concepts:
  - css-primitives
compiled_at: '2026-05-01T03:36:12.654Z'
compiled_with: claude-sonnet-4-6
---
Responsive design is the practice of building layouts and typography that adapt to different screen sizes and contexts. The traditional approach relies on viewport-width breakpoints in media queries, but two recent sources argue that breakpoints are increasingly a workaround for problems CSS can now solve natively.

[Building a UI Without Breakpoints](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case that intrinsic grid layouts, `clamp()` fluid values, container units, and container queries together handle most adaptation at the component level, leaving media queries for things like `prefers-reduced-motion` or input type. The shift is conceptual: instead of telling every element what to do at each viewport width, you define constraints and let the browser resolve them.

`clamp()` sits at the center of both sources. [Modern Fluid Typography Using CSS Clamp](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) focuses specifically on typography, showing how `clamp(min, preferred, max)` produces smooth scaling between size bounds without a single breakpoint. The same logic extends to spacing and layout when combined with viewport or container units as the middle value.

The practical upshot is that breakpoints remain useful but are no longer the primary design mechanism. Fluid sizing and intrinsic layout handle the continuous range; breakpoints handle the categorical differences.
