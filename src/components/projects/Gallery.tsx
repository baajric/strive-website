"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProjectImage } from "@/content/projects";
import { de } from "@/content/de";
import { getLenis } from "@/lib/lenis";

/**
 * Masonry columns, so posts and ads keep their full format (no cropped text).
 * Clicking a tile opens it full screen; arrow keys and Escape work there.
 */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const t = de.projects;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [open, close, step]);

  const current = open === null ? null : images[open];

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${t.open}: ${img.alt}`}
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[18px] bg-fog md:mb-4"
          >
            {img.video ? (
              <video
                src={img.video}
                poster={img.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="block h-auto w-full"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-paper/90 text-ink opacity-0 shadow-md transition-opacity group-hover:opacity-100">
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                <path d="M12 3h5v5M8 17H3v-5M17 3l-6 6M3 17l6-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm md:p-10"
          onClick={close}
        >
          {current.video ? (
            <video
              key={current.video}
              src={current.video}
              poster={current.src}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="animate-fade-up max-h-full max-w-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="animate-fade-up max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-paper/70">
            {open + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label={t.close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink md:right-6 md:top-6"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label={t.prev}
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink md:left-6"
              >
                ←
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label={t.next}
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink md:right-6"
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
