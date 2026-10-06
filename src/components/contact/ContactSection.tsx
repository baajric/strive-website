import { de } from "@/content/de";
import { Eyebrow } from "../ui";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const t = de.contact;

  return (
    <section id="kontakt" className="scroll-mt-24 bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          data-reveal
          className="relative grid gap-10 overflow-hidden rounded-[28px] bg-ink p-5 sm:p-8 md:p-12 lg:grid-cols-[1fr_1.25fr] lg:gap-14"
        >
          <span
            aria-hidden
            className="brand-mask pointer-events-none absolute -bottom-20 -left-16 h-80 w-80 text-paper/5 md:h-[28rem] md:w-[28rem]"
            style={{ maskImage: "url(/brand/mark.png)" }}
          />
          <div className="relative px-1 pt-3 lg:pt-6">
            <Eyebrow tone="dark">{t.eyebrow}</Eyebrow>
            <h2 className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] text-spark">{t.title}</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/75">{t.text}</p>
            <ul className="mt-8 space-y-3">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-base font-semibold text-paper">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-spark">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M5 10.5l3 3L15 6.5" fill="none" stroke="#0b1020" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
