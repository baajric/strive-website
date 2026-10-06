import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  actions?: ReactNode;
  visual?: ReactNode;
};

/** Opening block for sub pages: same cool stage, sky tint and block type as the home hero. */
export function PageHero({ eyebrow, title, intro, actions, visual }: Props) {
  return (
    <section className="relative overflow-hidden bg-stage pb-16 pt-32 md:pb-24 md:pt-40">
      <div aria-hidden className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-ice to-transparent" />
      <div
        className={`relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 ${
          visual ? "lg:grid-cols-[1.15fr_1fr]" : ""
        }`}
      >
        <div className={visual ? "text-center lg:text-left" : "mx-auto max-w-4xl text-center"}>
          <p className="inline-block rounded-full bg-paper px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_0_0_1px_rgba(11,16,32,0.06)]">
            {eyebrow}
          </p>
          <h1 className="display mt-5 text-[clamp(2.9rem,8vw,6.25rem)]">{title}</h1>
          <p
            className={`mt-6 max-w-xl text-lg leading-relaxed text-charcoal md:text-xl ${
              visual ? "mx-auto lg:mx-0" : "mx-auto"
            }`}
          >
            {intro}
          </p>
          {actions && (
            <div
              className={`mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 ${
                visual ? "justify-center lg:justify-start" : "justify-center"
              }`}
            >
              {actions}
            </div>
          )}
        </div>
        {visual}
      </div>
    </section>
  );
}

/** One 3D icon floating in a warm glow – the visual for a single service. */
export function IconVisual({ src }: { src: string }) {
  return (
    <div className="relative mx-auto grid aspect-square w-64 place-items-center sm:w-80 lg:w-[420px]">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,203,71,0.35), rgba(255,203,71,0.12) 45%, rgba(255,203,71,0) 75%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="animate-float relative w-[78%] drop-shadow-[0_30px_40px_rgba(11,16,32,0.22)]"
      />
    </div>
  );
}
