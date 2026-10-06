"use client";

import { useRef, useState } from "react";
import { de } from "@/content/de";

type Props = { src: string; poster: string; title: string; sound?: boolean; className: string };

/** Muted autoplay loop; films with a soundtrack get a switch that restarts them with sound. */
export function VideoPlayer({ src, poster, title, sound, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const t = de.projects;

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !muted;
    if (muted) {
      video.currentTime = 0;
      void video.play();
    }
    setMuted(!muted);
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title}
        className={className}
      />
      {sound && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-ink/80 px-4 py-2 text-sm font-semibold text-paper backdrop-blur transition-colors hover:bg-ink sm:bottom-5 sm:right-5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            {muted ? (
              <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
          {muted ? t.soundOn : t.soundOff}
        </button>
      )}
    </div>
  );
}
