import type { Metadata } from "next";
import { de } from "@/content/de";
import { LegalPage } from "@/components/LegalPage";
import { OWNER, legalDraft } from "@/lib/site";

export const metadata: Metadata = {
  title: de.legal.privacy.metaTitle,
  robots: { index: false },
};

// Draft for a personal portfolio on Cloudflare with enquiries delivered through Resend.
export default function PrivacyPage() {
  return (
    <LegalPage title={de.legal.privacy.title} draft={legalDraft}>
      <div>
        <h2>1. Verantwortlicher</h2>
        <p className="mt-2">
          {OWNER.name}, {OWNER.city}, Österreich
          <br />
          E-Mail: {OWNER.email}
        </p>
      </div>
      <div>
        <h2>2. Hosting</h2>
        <p className="mt-2">
          Diese Website wird über Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA) bereitgestellt. Beim
          Aufruf verarbeitet Cloudflare technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und
          Browserinformationen, um die Website auszuliefern und vor Angriffen zu schützen. Rechtsgrundlage ist das
          berechtigte Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Cloudflare ist
          unter dem EU-US Data Privacy Framework zertifiziert.
        </p>
      </div>
      <div>
        <h2>3. Kontaktformular</h2>
        <p className="mt-2">
          Wenn Sie das Kontaktformular nutzen, werden Name, E-Mail-Adresse, optional Ihr Unternehmen, die gewählten
          Themen und Ihre Nachricht ausschließlich zur Bearbeitung Ihrer Anfrage verwendet (Art. 6 Abs. 1 lit. b DSGVO).
          Die Daten werden gelöscht, sobald sie dafür nicht mehr benötigt werden und keine gesetzlichen
          Aufbewahrungspflichten bestehen.
        </p>
        <p className="mt-2">
          Ihre Anfrage wird per E-Mail über den Dienst Resend (Resend, Inc., USA) zugestellt. Der Versand erfolgt über
          Server in der EU (Irland).
        </p>
      </div>
      <div>
        <h2>4. Cookies und Analyse</h2>
        <p className="mt-2">
          Diese Website setzt selbst keine Cookies und verwendet keine Analyse- oder Tracking-Tools. Schriften werden
          direkt von dieser Website geladen, nicht von Drittanbietern. Cloudflare kann aus Sicherheitsgründen technisch
          notwendige Cookies setzen, etwa zur Abwehr automatisierter Angriffe.
        </p>
      </div>
      <div>
        <h2>5. Ihre Rechte</h2>
        <p className="mt-2">
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse. Außerdem
          können Sie sich bei der Österreichischen Datenschutzbehörde (www.dsb.gv.at) beschweren.
        </p>
      </div>
    </LegalPage>
  );
}
