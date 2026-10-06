"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { de, serviceHref } from "@/content/de";
import {
  FRAME_COUNT,
  boxOrigin,
  computeStage,
  frameSrc,
  iconTarget,
  stageRect,
  type Stage,
} from "./stage";

gsap.registerPlugin(ScrollTrigger);

const STAGE_RGB = "244, 248, 252";
const SKY_RGB = "228, 238, 255";

export function HeroSequence() {
  const t = de.hero;
  const services = de.services.items;
  // Rebuild the scroll timeline whenever the service list changes (matters during hot reload).
  const serviceKey = services.map((s) => s.id).join("|");

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const introHeadRef = useRef<HTMLDivElement>(null);
  const introFootRef = useRef<HTMLDivElement>(null);
  const outroFootRef = useRef<HTMLDivElement>(null);
  const outroDesktopRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const glow = glowRef.current!;
    const introHead = introHeadRef.current!;
    const introFoot = introFootRef.current!;
    const outroFoot = outroFootRef.current!;
    const outroDesktop = outroDesktopRef.current!;
    const icons = iconRefs.current.filter(Boolean) as HTMLAnchorElement[];

    const state = { frame: 0, zoom: 0 };
    let stage: Stage = computeStage(window.innerWidth, window.innerHeight, 0);
    const set = window.innerWidth < 768 ? "mobile" : "desktop";

    // --- Frame loading: first frame, then a coarse pass, then fill the gaps,
    // so scrubbing already works while the rest streams in.
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const loaded = new Array<boolean>(FRAME_COUNT).fill(false);
    const order: number[] = [0];
    for (let step = 16; step >= 1; step = Math.floor(step / 2)) {
      for (let i = 0; i < FRAME_COUNT; i += step) {
        if (!order.includes(i)) order.push(i);
      }
    }
    if (!order.includes(FRAME_COUNT - 1)) order.push(FRAME_COUNT - 1);

    let cancelled = false;
    let cursor = 0;
    const loadNext = () => {
      if (cancelled || cursor >= order.length) return;
      const i = order[cursor++];
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i, set);
      img.onload = () => {
        loaded[i] = true;
        if (Math.abs(i - Math.round(state.frame)) <= 16) draw();
        loadNext();
      };
      img.onerror = loadNext;
      images[i] = img;
    };
    for (let k = 0; k < 6; k++) loadNext();

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (loaded[i - d]) return i - d;
        if (loaded[i + d]) return i + d;
      }
      return -1;
    };

    // --- Layout + drawing
    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // offsetTop ignores the scroll-driven transform, which is what we want.
      stage = computeStage(vw, vh, introHead.offsetTop + introHead.offsetHeight);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const foot = `${stage.footTop}px`;
      introFoot.style.top = foot;
      outroFoot.style.top = foot;
      outroDesktop.style.top = foot;
      draw();
    };

    const fade = (x0: number, y0: number, x1: number, y1: number, rgb = STAGE_RGB) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, `rgba(${rgb}, 1)`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      return g;
    };

    function draw() {
      const { vw: w, vh: h } = stage;
      const r = stageRect(stage, state.zoom);

      ctx.fillStyle = `rgb(${STAGE_RGB})`;
      ctx.fillRect(0, 0, w, h);

      const idx = nearestLoaded(Math.round(state.frame));
      if (idx >= 0) {
        ctx.drawImage(images[idx], r.x, r.y, r.w, r.h);

        // Soften the render's edges into the page background.
        const fx = r.w * 0.06;
        const fy = r.h * 0.14;
        ctx.fillStyle = fade(r.x, 0, r.x + fx, 0);
        ctx.fillRect(r.x - 1, r.y - 1, fx + 1, r.h + 2);
        ctx.fillStyle = fade(r.x + r.w, 0, r.x + r.w - fx, 0);
        ctx.fillRect(r.x + r.w - fx, r.y - 1, fx + 1, r.h + 2);
        ctx.fillStyle = fade(0, r.y, 0, r.y + fy);
        ctx.fillRect(r.x - 1, r.y - 1, r.w + 2, fy + 1);
        if (r.y + r.h < h - 1) {
          ctx.fillStyle = fade(0, r.y + r.h, 0, r.y + r.h - fy);
          ctx.fillRect(r.x - 1, r.y + r.h - fy, r.w + 2, fy + 2);
        }
      }

      // Cool sky tint across the top, laid over the render's empty upper edge so there is no seam.
      const skyEnd = Math.max(r.y + r.h * 0.06, h * 0.12);
      ctx.fillStyle = fade(0, 0, 0, skyEnd, SKY_RGB);
      ctx.fillRect(0, 0, w, skyEnd);

      const o = boxOrigin(r);
      glow.style.transform = `translate3d(${o.x}px, ${o.y}px, 0) translate(-50%, -50%)`;
    }

    resize();
    window.addEventListener("resize", resize);

    // --- Scroll choreography (timeline length = 1 → positions read as % of scroll)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const iconStart = (el: HTMLElement) => {
      const o = boxOrigin(stage.end);
      return { x: o.x - el.offsetWidth / 2, y: o.y - el.offsetHeight / 2 };
    };
    const iconEnd = (el: HTMLElement, i: number) => {
      const p = iconTarget(i, stage);
      return { x: p.x - el.offsetWidth / 2, y: p.y - el.offsetHeight / 2 };
    };

    const out = () => ({ autoAlpha: 0, y: -24, filter: "blur(8px)", duration: 0.05, ease: "power1.in" });
    const into = () => [
      { autoAlpha: 0, y: 24, filter: "blur(8px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.07, ease: "power2.out" },
    ];

    const build = (portrait: boolean) => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate: draw,
        scrollTrigger: reduced
          ? undefined
          : {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
      });

      tl.to(hintRef.current, { autoAlpha: 0, duration: 0.04 }, 0)
        .to(state, { frame: FRAME_COUNT - 1, duration: 0.68 }, 0.02)
        .to(state, { zoom: 1, duration: 0.14, ease: "power2.inOut" }, 0.62)
        .fromTo(glow, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.6);

      if (portrait) {
        // Copy holds above and below him for the whole turn; then the headline
        // clears the top for the icons and the closing line takes the bottom.
        tl.to([introHead, introFoot], out(), 0.76);
        const [from, to] = into();
        tl.fromTo(outroFoot, from, to, 0.8);
      } else {
        // The pull-back moves him up into the headline band, so swap just before it.
        tl.to(introHead, out(), 0.58);
        const [from, to] = into();
        tl.fromTo(outroDesktop, from, to, 0.84);
      }

      icons.forEach((el, i) => {
        tl.fromTo(
          el,
          { x: () => iconStart(el).x, y: () => iconStart(el).y, scale: 0.2, autoAlpha: 0 },
          {
            x: () => iconEnd(el, i).x,
            y: () => iconEnd(el, i).y,
            scale: 1,
            autoAlpha: 1,
            duration: 0.12,
            ease: "back.out(1.4)",
          },
          portrait ? 0.79 + i * 0.018 : 0.74 + i * 0.022,
        );
      });

      tl.to({}, { duration: 0.06 }, 0.94);
      if (reduced) tl.progress(1);
      return tl;
    };

    const mm = gsap.matchMedia(section);
    mm.add("(max-aspect-ratio: 4/5)", () => {
      build(true);
    });
    mm.add("(min-aspect-ratio: 4001/5000)", () => {
      build(false);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resize);
      mm.revert();
    };
  }, [serviceKey]);

  const ctaPrimary =
    "rounded-full bg-spark px-6 py-3 text-base font-semibold text-ink transition-transform hover:scale-[1.03]";
  const ctaLink =
    "text-base font-semibold text-ink underline decoration-2 underline-offset-4 hover:decoration-spark";
  const headPos = "absolute inset-x-0 top-[92px] z-30 flex flex-col items-center px-4 text-center";
  const headType = "display max-w-[11ch] text-[clamp(3.1rem,15vw,4.5rem)]";
  const footPos = "absolute inset-x-0 z-30 flex flex-col items-center px-5 text-center md:hidden";

  return (
    <section ref={sectionRef} aria-label={t.headline} className="relative h-[520vh] bg-stage motion-reduce:h-svh">
      <div className="sticky top-0 h-svh overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 h-[56vmin] w-[56vmin] opacity-0"
          style={{
            background:
              "radial-gradient(closest-side, rgba(255,203,71,0.4), rgba(255,203,71,0.18) 30%, rgba(255,203,71,0.06) 60%, rgba(255,203,71,0) 100%)",
          }}
        />

        {/* Intro */}
        <div ref={introHeadRef} className={`${headPos} md:top-[12svh]`}>
          <h1 className={`${headType} md:max-w-[13ch] md:text-[clamp(3rem,6vw,6.25rem)]`}>{t.headline}</h1>
        </div>
        <div ref={introFootRef} className={footPos}>
          <p className="max-w-[20rem] text-[15px] leading-snug text-charcoal">{t.mobileSub}</p>
          <div className="mt-4 flex items-center gap-5">
            <a href="#kontakt" className={ctaPrimary}>
              {t.primaryCta}
            </a>
            <a href="#leistungen" className={ctaLink}>
              {t.mobileSecondaryCta}
            </a>
          </div>
        </div>

        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate md:flex"
        >
          <span className="rounded-full bg-paper px-3 py-1 shadow-[0_0_0_1px_rgba(11,16,32,0.08)]">
            {t.scrollHint}
          </span>
          <span className="h-10 w-px overflow-hidden bg-ink/10">
            <span className="animate-scroll-line block h-full w-full bg-ink/60" />
          </span>
        </div>

        {/* Service icons that fly out of the box */}
        <div className="absolute inset-0 z-20">
          {services.map((s, i) => (
            <Link
              key={s.id}
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              href={serviceHref(s.id)}
              aria-label={s.title}
              className="group invisible absolute left-0 top-0 flex w-16 flex-col items-center opacity-0 md:w-[clamp(64px,8vw,128px)]"
            >
              <span className="animate-float block w-full" style={{ animationDelay: `${i * -0.8}s` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt=""
                  className="w-full drop-shadow-[0_18px_24px_rgba(11,16,32,0.18)] transition-transform duration-300 group-hover:scale-110"
                />
              </span>
            </Link>
          ))}
        </div>

        {/* Outro – phones: closing line under him, icons take the band above */}
        <div ref={outroFootRef} className={`${footPos} invisible opacity-0`}>
          <h2 className="display max-w-[12ch] text-[clamp(2.2rem,11vw,3rem)]">{t.finalHeadline}</h2>
          <div className="mt-4 flex items-center gap-5">
            <a href="#kontakt" className={ctaPrimary}>
              {t.primaryCta}
            </a>
            <a href="#leistungen" className={ctaLink}>
              {t.mobileSecondaryCta}
            </a>
          </div>
        </div>

        {/* Outro – desktop: one block under the pulled-back render */}
        <div
          ref={outroDesktopRef}
          className="invisible absolute inset-x-0 z-30 hidden flex-col items-center px-4 text-center opacity-0 md:flex"
        >
          <h2 className="display text-[clamp(2.5rem,6.4vw,5.75rem)]">{t.finalHeadline}</h2>
          <p className="mt-4 max-w-md text-lg text-charcoal">{t.finalSub}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href="#kontakt" className={ctaPrimary}>
              {t.primaryCta}
            </a>
            <a href="#leistungen" className={ctaLink}>
              {t.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
