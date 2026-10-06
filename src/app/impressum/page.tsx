import type { Metadata } from "next";
import { de } from "@/content/de";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: de.legal.imprint.metaTitle,
  robots: { index: false },
};

// Placeholders in [brackets] must be replaced with Strive's verified company details before launch.
export default function ImprintPage() {
  return (
    <LegalPage title={de.legal.imprint.title}>
      <div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p className="mt-2">
          [Firmenname und Rechtsform]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ und Ort]
          <br />
          [Land]
        </p>
      </div>
      <div>
        <h2>Vertreten durch</h2>
        <p className="mt-2">[Name der vertretungsberechtigten Person]</p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p className="mt-2">
          Telefon: [Telefonnummer]
          <br />
          E-Mail: [E-Mail-Adresse]
        </p>
      </div>
      <div>
        <h2>Umsatzsteuer-ID</h2>
        <p className="mt-2">Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]</p>
      </div>
      <div>
        <h2>Verantwortlich für den Inhalt</h2>
        <p className="mt-2">[Name und Anschrift der verantwortlichen Person]</p>
      </div>
    </LegalPage>
  );
}
