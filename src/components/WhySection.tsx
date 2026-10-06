import { de } from "@/content/de";
import { revealDelay } from "@/lib/reveal";
import { Eyebrow, SectionTitle } from "./ui";

// Hand-placed so the "without" side looks deliberately messy.
const CHAOS = [
  { left: "4%", top: "10%", rotate: -9 },
  { left: "50%", top: "4%", rotate: 7 },
  { left: "24%", top: "40%", rotate: -3 },
  { left: "58%", top: "46%", rotate: 10 },
  { left: "3%", top: "72%", rotate: 5 },
  { left: "44%", top: "80%", rotate: -7 },
];

function ChaosVisual() {
  return (
    <div className="relative h-56 overflow-hidden md:h-64" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 260" preserveAspectRatio="none">
        <path
          d="M40 40 C160 120 220 10 330 70 M60 200 C140 120 260 230 350 150 M120 30 C100 140 300 120 280 230 M30 120 C150 180 250 60 370 110"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
      </svg>
      {de.why.without.chaos.map((label, i) => (
        <span
          key={label}
          className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-paper/15 bg-paper/10 px-3 py-1.5 text-xs font-semibold text-paper/80 backdrop-blur md:text-sm"
          style={{ left: CHAOS[i].left, top: CHAOS[i].top, transform: `rotate(${CHAOS[i].rotate}deg)` }}
        >
          <span className="text-[#ff8a7a]">✕</span>
          {label}
        </span>
      ))}
    </div>
  );
}

function OrbitVisual() {
  const items = de.services.items;
  return (
    <div className="relative grid h-56 place-items-center md:h-64" aria-hidden>
      <div className="animate-orbit absolute h-48 w-48 rounded-full border-2 border-dashed border-ink/25 md:h-56 md:w-56">
        {items.map((s, i) => {
          const angle = (360 / items.length) * i;
          return (
            <span
              key={s.id}
              className="absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 md:-ml-7 md:-mt-7 md:h-14 md:w-14"
              style={{ transform: `rotate(${angle}deg) translateY(calc(-1 * var(--r))) rotate(${-angle}deg)` }}
            >
              <span className="animate-orbit-reverse block h-full w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="h-full w-full drop-shadow-[0_8px_12px_rgba(11,16,32,0.25)]" />
              </span>
            </span>
          );
        })}
      </div>
      <span className="relative grid h-20 w-20 place-items-center rounded-full bg-ink shadow-[0_12px_30px_rgba(11,16,32,0.35)] md:h-24 md:w-24">
        <span className="brand-mask block h-10 w-10 text-spark md:h-12 md:w-12" style={{ maskImage: "url(/brand/mark.png)" }} />
      </span>
    </div>
  );
}

export function WhySection() {
  const t = de.why;

  return (
    <section id="warum" className="bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
          <SectionTitle spark>{t.title}</SectionTitle>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/75">{t.intro}</p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-6">
          {/* Without */}
          <div data-reveal>
            <p className="flex items-center gap-2 text-sm font-semibold text-paper/50">
              <span className="h-2 w-2 rounded-full bg-paper/40" />
              {t.without.label}
            </p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-paper/40 md:text-3xl">{t.without.headline}</p>
            <div className="mt-6 rounded-[28px] border border-paper/10 bg-indigo/50 p-5 md:p-7">
              <ChaosVisual />
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {t.without.points.map((p) => (
                  <li key={p} className="flex gap-2.5 rounded-2xl bg-paper/5 p-3.5 text-sm leading-snug text-paper/65">
                    <span className="text-paper/40">✕</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* With */}
          <div data-reveal style={revealDelay(1, 150)}>
            <p className="flex items-center gap-2 text-sm font-semibold text-spark">
              <span className="h-2 w-2 rounded-full bg-spark" />
              {t.with.label}
            </p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-paper md:text-3xl">{t.with.headline}</p>
            <div className="mt-6 rounded-[28px] bg-spark p-5 text-ink [--r:6rem] md:p-7 md:[--r:7rem]">
              <OrbitVisual />
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {t.with.points.map((p) => (
                  <li key={p} className="flex gap-2.5 rounded-2xl bg-ink/10 p-3.5 text-sm font-semibold leading-snug">
                    <span>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
