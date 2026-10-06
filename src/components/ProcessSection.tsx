import { de } from "@/content/de";
import { Eyebrow, PrimaryButton, SectionTitle } from "./ui";

export function ProcessSection() {
  const t = de.process;

  return (
    <section id="prozess" className="scroll-mt-24 bg-ice py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28" data-reveal>
          <Eyebrow tone="paper">{t.eyebrow}</Eyebrow>
          <SectionTitle>{t.title}</SectionTitle>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal">{t.intro}</p>
          <div className="mt-8">
            <PrimaryButton href={de.nav.contactHref}>{de.nav.cta}</PrimaryButton>
          </div>
        </div>

        <ol className="border-t border-ink/15">
          {t.steps.map((step) => (
            <li
              key={step.n}
              data-reveal
              className="group grid grid-cols-[1fr_auto] items-end gap-6 border-b border-ink/15 py-8 md:py-10"
            >
              <div>
                <h3 className="text-2xl font-black tracking-tight text-ink md:text-3xl">{step.title}</h3>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-slate md:text-lg">{step.text}</p>
              </div>
              <span className="display text-outline text-[clamp(4.5rem,11vw,9rem)] leading-[0.78] transition-colors duration-500 group-hover:text-ink">
                {step.n}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
