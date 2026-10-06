import type { Metadata } from "next";
import { de } from "@/content/de";
import { LegalPage } from "@/components/LegalPage";
import { OWNER, legalDraft } from "@/lib/site";

export const metadata: Metadata = {
  title: de.legal.imprint.metaTitle,
  robots: { index: false },
};

// Personal portfolio without a business: disclosure per § 25 (5) MedienG.
// Once a trade licence exists, add the full § 5 ECG details (address, Gewerbe, authority).
export default function ImprintPage() {
  return (
    <LegalPage title={de.legal.imprint.title} draft={legalDraft}>
      <div>
        <h2>Offenlegung gemäß § 25 Mediengesetz</h2>
        <p className="mt-2">
          Medieninhaber: {OWNER.name}
          <br />
          Wohnort: {OWNER.city}, Österreich
        </p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p className="mt-2">E-Mail: {OWNER.email}</p>
      </div>
      <div>
        <h2>Grundlegende Richtung</h2>
        <p className="mt-2">
          Persönliches Portfolio: Präsentation eigener Arbeiten und Projekte aus den Bereichen Software, Websites,
          Design, Video &amp; Motion, Marketing und KI-Automation.
        </p>
      </div>
      <div>
        <h2>Urheberrecht</h2>
        <p className="mt-2">
          Texte, Grafiken, Videos und Animationen auf dieser Website sind urheberrechtlich geschützt. Gezeigte Marken und
          Kundenprojekte gehören ihren jeweiligen Inhabern.
        </p>
      </div>
    </LegalPage>
  );
}
