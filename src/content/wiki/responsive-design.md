---
title: Responsive design
summary: >-
  Modern CSS tools like clamp(), container queries, and intrinsic grid layouts
  are shifting responsive design away from discrete viewport breakpoints toward
  continuous, component-aware scaling.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
compiled_at: '2026-05-01T05:34:38.080Z'
compiled_with: claude-sonnet-4-6
---
Responsive design has long meant writing media queries at fixed viewport widths, then manually specifying how layouts and type sizes should change at each one. Two recent perspectives argue this model is showing its age.

[Amit Sheen's piece on breakpoint-free UI](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case that CSS now provides enough primitives to make viewport breakpoints largely unnecessary for layout and sizing decisions. Intrinsic grid layouts, `clamp()` for fluid values, container units, and container queries let elements respond to their own context rather than to the page's overall width. Media queries survive, but in a narrower role: signaling device capabilities or user preferences, not controlling layout thresholds.

[Adrian Bece's treatment of fluid typography](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) focuses specifically on `clamp()` for font sizing, working through the math that maps a smooth scale between a minimum and maximum size across a defined viewport range. The result replaces several breakpoint-specific `font-size` declarations with a single calculated value.

Taken together, the pattern is consistent: replace discrete breakpoints with continuous scaling functions wherever possible, and reserve explicit media queries for decisions that genuinely require knowing something about the device or the user's environment. The shift is less about discarding responsive design as a goal and more about changing where the adaptation logic lives, moving it from the author's explicit thresholds into the layout and type primitives themselves.
