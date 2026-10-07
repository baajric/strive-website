// Geometry of the hero render inside the viewport. Everything that has to line
// up with the picture (icons, glow, copy blocks) is expressed in image-relative
// coordinates and mapped through these helpers so it stays glued to the render.

export const FRAME_COUNT = 132;
const ASPECT = 16 / 9;
const HEADER = 84;

/** Where the light leaves the box in the last frame (0–1 of image size). */
const BOX_ORIGIN = { x: 0.51, y: 0.585 };

/** Final resting spots of the service icons, image-relative on desktop. */
const DESKTOP_TARGETS = [
  { x: 0.19, y: 0.27 },
  { x: 0.13, y: 0.53 },
  { x: 0.2, y: 0.79 },
  { x: 0.81, y: 0.27 },
  { x: 0.87, y: 0.53 },
  { x: 0.8, y: 0.79 },
];

export type Rect = { x: number; y: number; w: number; h: number };

/**
 * start – where the turn plays, end – where the last frame settles.
 * On phones the copy sits above and below the render (footTop), and the
 * render barely moves; on desktop the "camera" pulls back at the end.
 */
export type Stage = {
  vw: number;
  vh: number;
  portrait: boolean;
  start: Rect;
  end: Rect;
  footTop: number;
};

/** Matches the CSS query `(max-aspect-ratio: 4/5)` used to pick the timeline. */
export const isPortrait = (vw: number, vh: number) => vw / vh <= 0.8;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const centred = (vw: number, w: number, y: number): Rect => ({ x: (vw - w) / 2, y, w, h: w / ASPECT });

/** @param headBottom bottom edge of the headline block */
export function computeStage(vw: number, vh: number, headBottom: number): Stage {
  const portrait = isPortrait(vw, vh);

  if (portrait) {
    // Copy below the render needs this much room; the render fills the gap
    // above it and its empty sky may slide under the headline.
    // Room for the closing headline + buttons as well, so they never run under the marquee.
    const bottom = vh - clamp(vh * 0.27, 180, 230);
    const w0 = clamp(((bottom - headBottom) / 0.86) * ASPECT, vw * 1.5, vw * 2);
    // He keeps his size and place for the whole sequence on phones.
    const start = centred(vw, w0, bottom - w0 / ASPECT);
    return { vw, vh, portrait, start, end: start, footTop: bottom + 6 };
  }

  // Desktop: leave a band above the head for the headline, anchor to bottom.
  const h0 = Math.min(vw / ASPECT, vh * 0.76);
  const start = centred(vw, h0 * ASPECT, vh - h0);

  // Pull back at the end so the closing line fits below him,
  // and centre picture + closing block in whatever height is left.
  const textBlock = clamp(vh * 0.3, 220, 300);
  const room = vh - HEADER - textBlock;
  const h1 = Math.min(room, h0 * 0.9);
  const end = centred(vw, h1 * ASPECT, HEADER + (room - h1) / 2);
  return { vw, vh, portrait, start, end, footTop: end.y + end.h * 0.95 };
}

export function stageRect(s: Stage, zoom: number): Rect {
  return {
    x: lerp(s.start.x, s.end.x, zoom),
    y: lerp(s.start.y, s.end.y, zoom),
    w: lerp(s.start.w, s.end.w, zoom),
    h: lerp(s.start.h, s.end.h, zoom),
  };
}

export function boxOrigin(r: Rect) {
  return { x: r.x + r.w * BOX_ORIGIN.x, y: r.y + r.h * BOX_ORIGIN.y };
}

export function iconTarget(index: number, s: Stage) {
  if (s.portrait) {
    // Semicircle over his head, in the band the headline leaves behind.
    const headTop = s.end.y + s.end.h * 0.08;
    const cy = headTop + 56;
    const rx = s.vw * 0.4;
    const ry = Math.max(cy - 112, 80);
    const angle = ((165 - index * 30) * Math.PI) / 180;
    return { x: s.vw / 2 + rx * Math.cos(angle), y: cy - ry * Math.sin(angle) };
  }
  const t = DESKTOP_TARGETS[index];
  return { x: s.end.x + s.end.w * t.x, y: s.end.y + s.end.h * t.y };
}

export function frameSrc(index: number, set: "desktop" | "mobile") {
  return `/sequence/${set}/f_${String(index + 1).padStart(3, "0")}.webp`;
}
