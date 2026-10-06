"use client";

import Link from "next/link";
import { useState } from "react";
import { de, serviceHref } from "@/content/de";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Big stacked service names. On desktop, hovering a row swaps the sticky preview
 * panel on the right; on phones every row carries its own short summary.
 */
export function ServiceExplorer() {
  const items = de.services.items;
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <ul className="border-t border-ink/10">
        {items.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.id} className="border-b border-ink/10">
              <Link
                href={serviceHref(s.id)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center gap-4 py-5 md:gap-6 md:py-6"
              >
                <span className={`w-7 text-sm font-bold tabular-nums ${on ? "lg:text-ink" : "lg:text-pebble"} text-pebble`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`display text-[clamp(2.1rem,5vw,4.25rem)] transition-colors duration-300 ${
                    on ? "text-ink" : "text-ink lg:text-ink/20"
                  } lg:group-hover:text-ink`}
                >
                  {s.title}
                </span>
                <span
                  className={`ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-300 md:h-12 md:w-12 ${
                    on ? "bg-spark text-ink lg:rotate-0" : "bg-fog text-ink lg:-rotate-45"
                  }`}
                >
                  <Arrow className="h-5 w-5" />
                </span>
              </Link>

              {/* Phones / tablets: inline summary */}
              <div className="flex items-start gap-4 pb-6 pl-11 md:pl-[3.25rem] lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="h-16 w-16 shrink-0" />
                <p className="text-base leading-relaxed text-slate">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Desktop preview panel */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div
            key={current.id}
            className="animate-fade-up relative overflow-hidden rounded-[32px] bg-ice p-10 xl:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-80 w-80 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,203,71,0.45), rgba(255,203,71,0.12) 50%, rgba(255,203,71,0) 80%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.icon}
              alt=""
              className="animate-float relative ml-auto h-48 w-48 drop-shadow-[0_24px_32px_rgba(11,16,32,0.2)] xl:h-56 xl:w-56"
            />
            <p className="relative mt-2 text-sm font-bold text-slate">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <h3 className="relative mt-2 text-4xl font-black tracking-tight text-ink">{current.title}</h3>
            <p className="relative mt-3 max-w-md text-lg leading-relaxed text-charcoal">{current.intro}</p>
            <ul className="relative mt-6 flex flex-wrap gap-2">
              {current.offerings.map((o) => (
                <li key={o.title} className="rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-ink">
                  {o.title}
                </li>
              ))}
            </ul>
            <Link
              href={serviceHref(current.id)}
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-semibold text-paper transition-transform hover:scale-[1.03]"
            >
              {de.services.more}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
