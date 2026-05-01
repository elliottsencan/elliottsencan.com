---
title: Responsive design
summary: >-
  A practice of building layouts and type that adapt to any screen; modern CSS
  primitives like clamp() and container queries increasingly replace fixed
  breakpoints as the primary mechanism.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
compiled_at: '2026-05-01T05:21:03.521Z'
compiled_with: claude-sonnet-4-6
---
Responsive design, at its core, is the practice of making web interfaces work across a continuous range of screen sizes rather than a discrete set of fixed widths. The traditional approach relies on media query breakpoints: define a layout at small, medium, and large widths, then swap between them. That model is giving way to something more fluid.

[Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that modern CSS primitives now handle most layout adaptation intrinsically, without breakpoints at all. Intrinsic grid layouts, `clamp()` for fluid sizing, container units, and container queries let elements respond to their own available space rather than the viewport. On this view, media queries should be reserved for genuinely device-specific concerns, such as user preferences or input capabilities, not for resizing columns.

[Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) applies the same logic specifically to typography. Using `clamp()` with a calculated viewport-width slope, font sizes scale smoothly between a defined minimum and maximum without any media query boilerplate. Bece walks through the underlying math so the scaling is predictable and controllable, not just "shrinks somehow."

Together these sources point in the same direction: the unit of adaptation is shifting from the viewport to the element, and from stepped breakpoints to continuous ranges. The practical consequence is less CSS, fewer edge cases at arbitrary widths, and layouts that hold up in contexts breakpoints never anticipated.
