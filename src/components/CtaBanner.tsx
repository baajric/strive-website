import { de } from "@/content/de";
import { PrimaryButton, TextLink } from "./ui";

// Icons drifting around the card edges, out of the way of the copy.
const FLOATERS = [
  { id: "software", className: "left-[4%] top-[10%] w-20 -rotate-12 lg:w-28" },
  { id: "design", className: "right-[5%] top-[8%] w-20 rotate-12 lg:w-28" },
  { id: "marketing", className: "-bottom-4 left-[8%] w-20 rotate-6 lg:w-28" },
  { id: "ki-automation", className: "-bottom-3 right-[7%] w-20 -rotate-6 lg:w-28" },
];

/** Closing call to action on sub pages – sends visitors to the contact form on the home page. */
export function CtaBanner() {
  const t = de.cta;

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-center md:px-10 md:py-24" data-reveal>
          {FLOATERS.map((f, i) => {
            const icon = de.services.items.find((s) => s.id === f.id)?.icon;
            return (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={f.id}
                src={icon}
                alt=""
                aria-hidden
                className={`animate-float pointer-events-none absolute hidden opacity-90 drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] md:block ${f.className}`}
                style={{ animationDelay: `${i * -1.2}s` }}
              />
            );
          })}
          <h2 className="display relative text-[clamp(2.5rem,7vw,6rem)] text-spark">{t.title}</h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/75">{t.text}</p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <PrimaryButton href={de.nav.contactHref}>{t.primary}</PrimaryButton>
            <TextLink href="/leistungen" dark>
              {t.secondary}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
