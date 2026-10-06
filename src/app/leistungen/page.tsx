import type { Metadata } from "next";
import { de } from "@/content/de";
import { PageHero } from "@/components/PageHero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { WhySection } from "@/components/WhySection";
import { ProcessSection } from "@/components/ProcessSection";
import { CtaBanner } from "@/components/CtaBanner";
import { PrimaryButton } from "@/components/ui";

export const metadata: Metadata = {
  title: de.servicesPage.metaTitle,
  description: de.servicesPage.intro,
};

function IconCluster() {
  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-3 gap-4 sm:gap-6">
      {de.services.items.map((s, i) => (
        <div
          key={s.id}
          className={`grid aspect-square place-items-center rounded-[28px] bg-paper/70 shadow-[0_0_0_1px_rgba(11,16,32,0.05)] ${
            i % 2 ? "translate-y-6" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.icon}
            alt=""
            className="animate-float w-[72%] drop-shadow-[0_16px_20px_rgba(11,16,32,0.16)]"
            style={{ animationDelay: `${i * -0.8}s` }}
          />
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const t = de.servicesPage;

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.headline}
        intro={t.intro}
        actions={<PrimaryButton href={de.nav.contactHref}>{de.nav.cta}</PrimaryButton>}
        visual={<IconCluster />}
      />
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <ServiceGrid />
        </div>
      </section>
      <WhySection />
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
