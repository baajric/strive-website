import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { de, getService } from "@/content/de";
import { IconVisual, PageHero } from "@/components/PageHero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, PrimaryButton, SectionTitle, TextLink } from "@/components/ui";
import { revealDelay } from "@/lib/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return de.services.items.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/leistungen/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: `${service.title} – Strive`, description: service.intro };
}

export default async function ServicePage({ params }: PageProps<"/leistungen/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const t = de.servicePage;

  return (
    <>
      <PageHero
        eyebrow={`${t.eyebrow} · ${service.title}`}
        title={service.headline}
        intro={service.intro}
        actions={
          <>
            <PrimaryButton href={de.nav.contactHref}>{t.cta}</PrimaryButton>
            <TextLink href="/leistungen">{t.back}</TextLink>
          </>
        }
        visual={<IconVisual src={service.icon} />}
      />

      {/* What we do */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-28" data-reveal>
            <Eyebrow>{service.title}</Eyebrow>
            <SectionTitle>{t.offeringsTitle}</SectionTitle>
          </div>
          <ol className="border-t border-ink/10">
            {service.offerings.map((o, i) => (
              <li
                key={o.title}
                data-reveal
                className="group grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/10 py-6 md:grid-cols-[3.5rem_1fr] md:py-8"
              >
                <span className="pt-1 text-sm font-bold tabular-nums text-pebble transition-colors group-hover:text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-ink md:text-3xl">{o.title}</h3>
                  <p className="mt-2 max-w-lg text-base leading-relaxed text-slate md:text-lg">{o.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProjectsSection serviceId={service.id} />

      {/* Benefits */}
      <section className="bg-ink py-20 text-paper md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <SectionTitle spark tight>{t.benefitsTitle}</SectionTitle>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {service.benefits.map((b, i) => (
              <div key={b.title} data-reveal style={revealDelay(i)} className="rounded-[28px] bg-indigo p-7 md:p-9">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-spark">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden>
                    <path d="M5 10.5l3 3L15 6.5" fill="none" stroke="#0b1020" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-paper">{b.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-paper/70">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* FAQ */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal>
            <SectionTitle tight>{t.faqTitle}</SectionTitle>
          </div>
          <div className="divide-y divide-ink/10 border-y border-ink/10" data-reveal>
            {service.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-fog transition-transform group-open:rotate-45">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                      <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-ice py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div data-reveal>
            <SectionTitle tight small>{t.othersTitle}</SectionTitle>
          </div>
          <div className="mt-10">
            <ServiceGrid exclude={service.id} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
