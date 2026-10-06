import type { CSSProperties } from "react";

/** Stagger helper for [data-reveal] siblings: style={revealDelay(i)}. */
export const revealDelay = (index: number, step = 80) =>
  ({ "--reveal-delay": `${index * step}ms` }) as CSSProperties;
