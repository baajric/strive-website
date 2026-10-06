"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { de, serviceHref } from "@/content/de";
import { getLenis } from "@/lib/lenis";

function LanguageSwitch({ className = "" }: { className?: string }) {
  return (
    <div className={`items-center rounded-full bg-white/50 p-1 text-xs font-semibold ${className}`}>
      <span className="rounded-full bg-ink px-2.5 py-1 text-paper">DE</span>
      <span title={de.nav.soon} className="cursor-not-allowed px-2 py-1 text-pebble">
        EN
      </span>
      <span title={de.nav.soon} className="cursor-not-allowed px-2 py-1 text-pebble">
        BS
      </span>
    </div>
  );
}

export function SiteHeader() {
  const t = de.nav;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  // On the home page, "/#section" becomes a plain in-page anchor for smooth scrolling.
  const resolve = (href: string) => (pathname === "/" && href.startsWith("/#") ? href.slice(1) : href);

  // Freeze the page behind the menu.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onResize = () => window.innerWidth >= 1024 && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  // Same-page anchors: close first so smooth scroll is running again, then glide.
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = resolve(href);
    if (!target.startsWith("#")) {
      close();
      return;
    }
    e.preventDefault();
    close();
    requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
        lenis.scrollTo(target, { offset: -88 });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const mobileLinks = [...t.links, { label: t.contact, href: t.contactHref }];

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
        <div className="pointer-events-auto flex h-14 w-full max-w-[1040px] items-center justify-between rounded-full border border-white/70 bg-white/65 pl-5 pr-2 shadow-[0_8px_32px_rgba(11,16,32,0.10),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl backdrop-saturate-150 md:pl-6">
          <Link href="/" aria-label="Strive – Startseite" className="text-ink">
            <span className="brand-mask block h-6 w-24" style={{ maskImage: "url(/brand/wordmark.png)" }} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {/* Services with dropdown */}
            <div className="group relative">
              <Link
                href="/leistungen"
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-white/70"
              >
                {t.links[0].label}
                <svg viewBox="0 0 12 12" className="h-3 w-3 transition-transform group-hover:rotate-180" aria-hidden>
                  <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-1 rounded-[24px] border border-white/70 bg-white/90 p-2 shadow-[0_16px_48px_rgba(11,16,32,0.14)] backdrop-blur-xl">
                  {de.services.items.map((s) => (
                    <Link
                      key={s.id}
                      href={serviceHref(s.id)}
                      className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-ice"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.icon} alt="" className="h-11 w-11 shrink-0" />
                      <span>
                        <span className="block text-sm font-bold text-ink">{s.title}</span>
                        <span className="line-clamp-1 block text-xs text-slate">{s.text}</span>
                      </span>
                    </Link>
                  ))}
                  <Link
                    href="/leistungen"
                    className="col-span-2 mt-1 rounded-2xl bg-fog px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-ice"
                  >
                    {t.allServices} →
                  </Link>
                </div>
              </div>
            </div>

            {t.links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={resolve(link.href)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-white/70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <LanguageSwitch className="hidden lg:flex" />
            <Link
              href={resolve(t.contactHref)}
              className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-white/70 lg:inline-flex"
            >
              {t.contact}
            </Link>
            <Link
              href={resolve(t.contactHref)}
              className="hidden rounded-full bg-spark px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              {t.cta}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.closeMenu : t.openMenu}
              className="relative grid h-10 w-10 place-items-center rounded-full bg-ink text-paper lg:hidden"
            >
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-0.5 w-4 rounded-full bg-current transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Phone / tablet menu */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        aria-hidden={!open}
        className={`fixed inset-0 z-40 overflow-y-auto bg-stage/90 backdrop-blur-2xl transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className={`mx-auto flex min-h-full max-w-xl flex-col px-5 pb-8 pt-24 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col">
            {mobileLinks.map((link) => (
              <Link
                key={link.href}
                href={resolve(link.href)}
                onClick={(e) => go(e, link.href)}
                tabIndex={open ? 0 : -1}
                className="display flex items-center justify-between border-b border-ink/10 py-4 text-[2.6rem]"
              >
                {link.label}
                <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden>
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-slate">{t.menuServices}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {de.services.items.map((s) => (
              <Link
                key={s.id}
                href={serviceHref(s.id)}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className="flex flex-col items-center gap-1 rounded-[20px] bg-paper p-3 text-center text-xs font-semibold text-ink shadow-[0_0_0_1px_rgba(11,16,32,0.06)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="h-12 w-12" />
                {s.title}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-8">
            <LanguageSwitch className="flex" />
            <Link
              href={resolve(t.contactHref)}
              onClick={(e) => go(e, t.contactHref)}
              tabIndex={open ? 0 : -1}
              className="flex-1 rounded-full bg-spark px-5 py-3.5 text-center text-base font-semibold text-ink"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
