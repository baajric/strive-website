"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.09, anchors: { offset: -88 } });
    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  // New page: start at the top, or glide to the section in the URL (e.g. /#kontakt).
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    if (!hash) {
      lenis?.scrollTo(0, { immediate: true });
      return;
    }
    const id = window.setTimeout(() => {
      if (lenis) lenis.scrollTo(hash, { offset: -88 });
      else document.querySelector(hash)?.scrollIntoView();
    }, 150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
