import { de } from "@/content/de";
import { ServiceExplorer } from "./ServiceExplorer";
import { Eyebrow, SectionTitle, TextLink } from "./ui";

export function ServicesSection() {
  const t = de.services;

  return (
    <section id="leistungen" className="scroll-mt-24 bg-paper pb-20 pt-28 md:pb-28 md:pt-36">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end" data-reveal>
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <SectionTitle>{t.title}</SectionTitle>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-charcoal">{t.intro}</p>
            <div className="mt-4">
              <TextLink href="/leistungen">{t.all}</TextLink>
            </div>
          </div>
        </div>
        <div className="mt-14" data-reveal>
          <ServiceExplorer />
        </div>
      </div>
    </section>
  );
}
