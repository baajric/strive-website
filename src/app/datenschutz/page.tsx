import type { Metadata } from "next";
import { de } from "@/content/de";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: de.legal.privacy.metaTitle,
  robots: { index: false },
};

// Structure only – the final text must come from a legally reviewed privacy policy.
export default function PrivacyPage() {
  return (
    <LegalPage title={de.legal.privacy.title}>
      <div>
        <h2>1. Verantwortlicher</h2>
        <p className="mt-2">[Name, Anschrift und Kontaktdaten des Verantwortlichen]</p>
      </div>
      <div>
        <h2>2. Hosting</h2>
        <p className="mt-2">[Angaben zum Hosting-Anbieter und zur Verarbeitung von Server-Logfiles]</p>
      </div>
      <div>
        <h2>3. Kontaktformular</h2>
        <p className="mt-2">
          [Welche Daten über das Kontaktformular verarbeitet werden, zu welchem Zweck, auf welcher Rechtsgrundlage und
          wie lange sie gespeichert werden]
        </p>
      </div>
      <div>
        <h2>4. Cookies und Analyse</h2>
        <p className="mt-2">[Eingesetzte Cookies, Analyse- und Marketing-Tools – sofern vorhanden]</p>
      </div>
      <div>
        <h2>5. Ihre Rechte</h2>
        <p className="mt-2">
          [Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch und Beschwerderecht bei
          einer Aufsichtsbehörde]
        </p>
      </div>
    </LegalPage>
  );
}
