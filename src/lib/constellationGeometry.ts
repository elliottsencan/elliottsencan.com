import layout from "@data/constellation-layout.json";

// Shared geometry constants for the wiki constellation widgets.
//
// The strip is the source of truth: its viewBox is derived from the
// pre-solved global layout's node extents plus padding, and the local rail
// uses the same viewBox dimensions (so both render at identical pixel
// sizes when given the same `width`). The local's own square content is
// centered within the strip-shaped frame via preserveAspectRatio.
//
// Invariants — every consumer and future edit must preserve all four:
//
//   (a) The strip viewBox contains every node center plus hull inflation
//       (22 units) and cluster-label ascent at ANY layout aspect. The
//       solver targets a 2:1 box but the force equilibrium decides the
//       real extents (currently near-square) — the earlier landscape
//       assumption cropped nodes on the index.
//   (b) The local viewBox contains the full 0..200 design grid plus pads
//       at ANY strip aspect — matching the strip's aspect must *grow* an
//       axis beyond the grid, never shrink one below it (that clips the
//       field).
//   (c) Consumers derive every dimension from the constants exported here
//       (or from `fitWidthCap`) — no literal aspect ratio anywhere else.
//   (d) Degenerate layouts (zero or one node — the solver's empty-content
//       fallback emits `nodes: []`) degrade to the default box below;
//       extents must never reach consumers as Infinity/NaN.

// Y padding must clear what extends beyond node centers: region hulls
// inflate 22 units, and cluster labels sit ~32 units above the topmost
// member (baseline at top-12, ~20-unit ascent).
export const STRIP_PAD_X = 56;
export const STRIP_PAD_Y_TOP = 56;
export const STRIP_PAD_Y_BOTTOM = 56;

// Layout types — the JSON import is untyped, so these are the single
// source of truth for its shape across the constellation components.
export type LayoutNode = { id: string; x: number; y: number; weight: number };
export type LayoutEdge = {
  a: string;
  b: string;
  weight: number;
  via: { link: number; cocite: number };
  display: boolean;
};
export type LocalNode = { id: string; x: number; y: number };
export type LocalLayout = { nodes: LocalNode[]; edges: LayoutEdge[] };

const nodes: LayoutNode[] = layout.global.nodes;
const xs = nodes.map((n) => n.x);
const ys = nodes.map((n) => n.y);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

// Degenerate guard (invariant d): Math.min/max over an empty spread is
// ±Infinity, which would poison every derived box with NaN. Zero/one-node
// layouts (and any non-finite extents) fall back to a fixed default frame.
const DEFAULT_BOX = { x: 0, y: 0, w: 800, h: 420 } as const;
const extentsUsable =
  nodes.length > 1 &&
  Number.isFinite(minX) &&
  Number.isFinite(maxX) &&
  Number.isFinite(minY) &&
  Number.isFinite(maxY);

export const STRIP_VX = extentsUsable ? minX - STRIP_PAD_X : DEFAULT_BOX.x;
export const STRIP_VY = extentsUsable ? minY - STRIP_PAD_Y_TOP : DEFAULT_BOX.y;
export const STRIP_VW = extentsUsable ? maxX - minX + STRIP_PAD_X * 2 : DEFAULT_BOX.w;
export const STRIP_VH = extentsUsable
  ? maxY - minY + STRIP_PAD_Y_TOP + STRIP_PAD_Y_BOTTOM
  : DEFAULT_BOX.h;

export const STRIP_DEFAULT_WIDTH = 400;

// Fit-a-band width cap (invariant c): widest a strip-aspect widget can be
// while its aspect-locked height stays within a `bandRem`-tall band.
// Consumers cap width instead of overflow-cropping height, so the whole
// field stays visible whatever aspect the solved layout has.
export function fitWidthCap(bandRem: number): string {
  return `calc(${bandRem}rem * ${(STRIP_VW / STRIP_VH).toFixed(4)})`;
}

// Local-rail viewBox: aspect-locked to the strip's aspect, so a single
// `width` prop drives both widgets to identical pixel dimensions. The
// local layout's node coordinates land in the 0..200 design grid; the
// box grows on whichever axis the strip aspect leaves short so the grid
// (plus padding for hover labels and the breathe ring) always fits —
// matching aspect by *shrinking* an axis below the grid clips the field.
const LOCAL_CONTENT_SIZE = 200;
// Top pad must clear the active cluster's italic name, which renders above
// the topmost member node — 18 left it poking out of the panel's clip box.
const LOCAL_PAD_TOP = 32;
const LOCAL_PAD_BOTTOM = 6;
const LOCAL_PAD_X = 6;

const stripAspect = STRIP_VW / STRIP_VH;
const localNeedW = LOCAL_CONTENT_SIZE + LOCAL_PAD_X * 2;
const localNeedH = LOCAL_CONTENT_SIZE + LOCAL_PAD_TOP + LOCAL_PAD_BOTTOM;

export const LOCAL_VH = Math.max(localNeedH, localNeedW / stripAspect);
export const LOCAL_VW = LOCAL_VH * stripAspect;
export const LOCAL_VX = (LOCAL_CONTENT_SIZE - LOCAL_VW) / 2;
// Keep the asymmetric top/bottom pads, centering any surplus height.
export const LOCAL_VY = -LOCAL_PAD_TOP - (LOCAL_VH - localNeedH) / 2;
