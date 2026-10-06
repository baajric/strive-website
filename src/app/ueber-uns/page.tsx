import type { Metadata } from "next";
import { de } from "@/content/de";
import { PageHero } from "@/components/PageHero";
import { WhySection } from "@/components/WhySection";
import { CtaBanner } from "@/components/CtaBanner";
import { Eyebrow, PrimaryButton, SectionTitle, TextLink } from "@/components/ui";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: de.about.metaTitle,
  description: de.about.metaDescription,
};

/** The happy "all in one box" moment from the home hero, blended into the page. */
function CharacterVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,203,71,0.28), rgba(255,203,71,0.08) 55%, rgba(255,203,71,0) 80%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sequence/desktop/f_132.webp"
        alt="Strive-Figur öffnet eine leuchtende Box mit dem Strive-Logo"
        className="relative aspect-[4/3] w-full object-cover"
        style={{
          maskImage: "radial-gradient(ellipse 52% 60% at 50% 46%, #000 62%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function AboutPage() {
  const t = de.about;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.headline}
        intro={t.intro}
        actions={
          <>
            <PrimaryButton href={de.nav.contactHref}>{de.nav.cta}</PrimaryButton>
            <TextLink href="/leistungen">{de.cta.secondary}</TextLink>
          </>
        }
        visual={<CharacterVisual />}
      />

      {/* Story */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <SectionTitle>{t.storyTitle}</SectionTitle>
          </div>
          <div className="space-y-6 self-end text-lg leading-relaxed text-charcoal md:text-xl" data-reveal>
            {t.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ice py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <SectionTitle tight>{t.valuesTitle}</SectionTitle>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v, i) => (
              <div key={v.title} data-reveal style={revealDelay(i)} className="rounded-[28px] bg-paper p-6 md:p-7">
                <span className="display block text-6xl text-ink/15">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight text-ink">{v.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhySection />
      <CtaBanner />
    </>
  );
}
