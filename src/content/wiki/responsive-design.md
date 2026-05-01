---
title: Responsive design
summary: >-
  Modern CSS primitives like clamp() and container queries can replace
  breakpoint-heavy media queries, letting layouts and typography scale
  continuously rather than snapping at fixed viewport widths.
sources:
  - 2026-04/2026-04-24t085352-building-a-ui-without-breakpoints
  - 2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp
compiled_at: '2026-05-01T05:13:03.972Z'
compiled_with: claude-sonnet-4-6
---
Responsive design has long meant defining breakpoints where layouts shift: narrow viewport gets one set of rules, wide viewport gets another. Two recent approaches push against that model, arguing that modern CSS is expressive enough to make most breakpoints unnecessary.

[Amit Sheen](/reading/2026-04/2026-04-24t085352-building-a-ui-without-breakpoints) makes the case that intrinsic grid layouts, `clamp()` fluid values, container units, and container queries together handle the bulk of what media queries used to do. Under this model, media queries survive for device capabilities and user preferences, not for raw viewport dimensions. The layout adapts because the primitives themselves are fluid, not because a threshold triggers a rule change.

The math behind `clamp()` is not intuitive, and [Adrian Bece](/reading/2026-04/2026-04-24t085927-modern-fluid-typography-using-css-clamp) works through it specifically for typography. Given a minimum and maximum font size and the viewport widths at which each should apply, you can derive exact `vw` and `rem` parameters so type scales continuously between those bounds. The result is smooth interpolation with no media query boilerplate, though the calculation still requires understanding how the linear slope between two fixed points maps to CSS units.

Both sources converge on the same underlying shift: fixed breakpoints model the designer's assumptions about device sizes, while fluid primitives model the content's own behavior across any size. The breakpoint approach requires you to predict every context; the fluid approach handles contexts you never anticipated.
