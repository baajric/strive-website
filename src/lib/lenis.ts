import type Lenis from "lenis";

// Single shared smooth-scroll instance, so overlays can pause it.
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;
