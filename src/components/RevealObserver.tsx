"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fades [data-reveal] elements up as they enter the viewport, on every page. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      },
      // The huge top margin counts anything already above the viewport as seen, so
      // jumping past a section (anchor link, restored scroll) never leaves it hidden.
      { rootMargin: "100000px 0px -8% 0px" },
    );

    // Only arm what is still below the fold – content already on screen never blinks.
    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      el.classList.add("reveal-armed");
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
