import layout from "@data/constellation-layout.json";

// Shared geometry constants for the wiki constellation widgets.
//
// The strip is the source of truth: its viewBox is derived from the
// pre-solved global layout's node extents plus padding, and the local rail
// uses the same viewBox dimensions (so both render at identical pixel
// sizes when given the same `width`). The local's own square content is
// centered within the wider strip-shaped frame via preserveAspectRatio.

export const STRIP_PAD_X = 40;
export const STRIP_PAD_Y_TOP = 80;
export const STRIP_PAD_Y_BOTTOM = 80;

const xs = layout.global.nodes.map((n) => n.x);
const ys = layout.global.nodes.map((n) => n.y);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

export const STRIP_VX = minX - STRIP_PAD_X;
export const STRIP_VY = minY - STRIP_PAD_Y_TOP;
export const STRIP_VW = maxX - minX + STRIP_PAD_X * 2;
export const STRIP_VH = maxY - minY + STRIP_PAD_Y_TOP + STRIP_PAD_Y_BOTTOM;

export const STRIP_DEFAULT_WIDTH = 400;

// Local-rail viewBox: aspect-locked to the strip's aspect, so a single
// `width` prop drives both widgets to identical pixel dimensions. The
// local layout's node coordinates land in roughly 0..200 horizontally and
// vertically; we expand the viewBox horizontally (centered on x=100) until
// its aspect matches the strip's, then add small padding for hover labels
// and the breathe ring.
const LOCAL_CONTENT_SIZE = 200;
const LOCAL_PAD_TOP = 18;
const LOCAL_PAD_BOTTOM = 6;

export const LOCAL_VH = LOCAL_CONTENT_SIZE + LOCAL_PAD_TOP + LOCAL_PAD_BOTTOM;
export const LOCAL_VW = LOCAL_VH * (STRIP_VW / STRIP_VH);
export const LOCAL_VX = (LOCAL_CONTENT_SIZE - LOCAL_VW) / 2;
export const LOCAL_VY = -LOCAL_PAD_TOP;
