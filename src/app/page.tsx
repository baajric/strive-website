import { HeroSequence } from "@/components/hero/HeroSequence";
import { Marquee } from "@/components/Marquee";
import { ServicesSection } from "@/components/ServicesSection";
import { WhySection } from "@/components/WhySection";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSequence />
      <Marquee />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}
