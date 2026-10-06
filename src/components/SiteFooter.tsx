import Link from "next/link";
import { de, serviceHref } from "@/content/de";

export function SiteFooter() {
  const t = de.footer;
  const year = new Date().getFullYear();
  const company = [...de.nav.links.slice(1), { label: de.nav.contact, href: de.nav.contactHref }];

  return (
    <footer className="overflow-hidden bg-ink text-paper">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] md:pt-20">
        <div>
          <p className="max-w-xs text-2xl font-black leading-tight tracking-tight">{t.tagline}</p>
          <Link
            href={de.nav.contactHref}
            className="mt-6 inline-flex rounded-full bg-spark px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {de.nav.cta}
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/45">{t.servicesTitle}</p>
          <ul className="mt-4 space-y-2.5">
            {de.services.items.map((s) => (
              <li key={s.id}>
                <Link href={serviceHref(s.id)} className="text-sm font-semibold text-paper/85 transition-colors hover:text-spark">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/45">{t.companyTitle}</p>
          <ul className="mt-4 space-y-2.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm font-semibold text-paper/85 transition-colors hover:text-spark">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 border-t border-paper/10 px-4 py-6 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>
          © {year} Strive. {t.rights}
        </span>
        <div className="flex gap-6">
          {t.legal.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-paper">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Giant wordmark, cropped by the bottom edge */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6" aria-hidden>
        <span
          className="brand-mask block aspect-[904/225] w-full translate-y-[18%] bg-gradient-to-b from-paper/90 to-paper/10"
          style={{ maskImage: "url(/brand/wordmark.png)", backgroundColor: "transparent" }}
        />
      </div>
    </footer>
  );
}
