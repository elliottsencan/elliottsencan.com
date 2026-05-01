---
title: Responsive design
summary: >-
  Modern CSS primitives like clamp() and container queries can replace fixed
  breakpoints as the primary responsive design engine, letting layouts and type
  scale fluidly across any viewport or container size.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
compiled_at: '2026-05-01T05:03:01.562Z'
compiled_with: claude-sonnet-4-6
---
Responsive design has historically meant defining fixed breakpoints where layout or type snaps to new rules. Two recent approaches challenge that model by making elements scale continuously rather than discretely.

On the layout side, [Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) argues that intrinsic grid layouts, container queries, and container units can handle the bulk of responsive behavior without a single viewport media query. In this model, media queries are reserved for device capabilities and user preferences, not for adjusting component dimensions. The components themselves adapt to the space they occupy, not to the window.

On the typography side, [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) works through the math behind `clamp()`-based fluid type. By deriving a linear interpolation between a minimum and maximum font size across a viewport-width range, you get smooth scaling with no breakpoint boilerplate. The parameters require some calculation upfront, but the result is a single CSS declaration that covers the full range.

Both sources converge on the same underlying shift: breakpoints were a workaround for the absence of better primitives, and those primitives now exist. Where they differ slightly is in scope. Sheen treats breakpoints as nearly obsolete for layout; Bece's fluid typography approach still frames clamp values in relation to fixed size targets, which implicitly references the kind of range-thinking breakpoints encouraged. The difference is practical rather than philosophical, and the two techniques compose well together.
