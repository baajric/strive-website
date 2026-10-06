"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { de } from "@/content/de";
import { getLenis } from "@/lib/lenis";
import { Sparkle } from "../Sparkle";

const initial: ContactState = { status: "idle", attempt: 0 };

const field =
  "w-full rounded-[10px] border border-pebble/50 bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-pebble focus:border-ink";
const label = "mb-1.5 block text-sm font-semibold text-ink";
const chip =
  "flex items-center gap-2 rounded-full border border-pebble/40 px-3.5 py-2 text-sm font-semibold text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:ring-2 peer-focus-visible:ring-spark";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm font-medium text-[#c2410c]">{message}</p>;
}

/** Numbered step of the brief, so the form reads like a short guided conversation. */
function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink/10 pt-6 first:border-t-0 first:pt-0">
      <legend className="flex items-baseline gap-3">
        <span className="text-xs font-bold tabular-nums text-pebble">{n}</span>
        <span className="text-lg font-black tracking-tight text-ink">{title}</span>
      </legend>
      <div className="mt-4">{children}</div>
    </fieldset>
  );
}

// Sparkles flying out of the badge: angle, distance, size and colour per star.
const BURST = [
  { a: 0, d: 92, s: "h-4 w-4", c: "text-spark" },
  { a: 40, d: 70, s: "h-2.5 w-2.5", c: "text-ink" },
  { a: 85, d: 104, s: "h-3.5 w-3.5", c: "text-spark" },
  { a: 130, d: 78, s: "h-3 w-3", c: "text-ink" },
  { a: 175, d: 96, s: "h-4 w-4", c: "text-spark" },
  { a: 220, d: 72, s: "h-2.5 w-2.5", c: "text-ink" },
  { a: 265, d: 108, s: "h-3.5 w-3.5", c: "text-spark" },
  { a: 310, d: 80, s: "h-3 w-3", c: "text-ink" },
];

/** Animated "thank you": announced to screen readers and brought into view. */
function SuccessMessage() {
  const t = de.contact.form;
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    const lenis = getLenis();
    if (lenis && ref.current) lenis.scrollTo(ref.current, { offset: -140 });
    else ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      className="flex min-h-[460px] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-paper p-8 text-center"
    >
      <div className="relative grid h-24 w-24 place-items-center" aria-hidden>
        <span className="success-ring absolute inset-2 rounded-full bg-spark/50" style={{ animationDelay: "0.3s" }} />
        <span className="success-ring absolute inset-2 rounded-full bg-spark/35" style={{ animationDelay: "0.65s" }} />
        <span className="absolute left-1/2 top-1/2">
          {BURST.map((b) => (
            <span
              key={b.a}
              className={`success-spark absolute left-0 top-0 ${b.s} ${b.c}`}
              style={{ "--a": `${b.a}deg`, "--d": `${b.d}px` } as CSSProperties}
            >
              <Sparkle className="h-full w-full" />
            </span>
          ))}
        </span>
        <span className="success-pop relative grid h-20 w-20 place-items-center rounded-full bg-spark shadow-[0_14px_34px_rgba(255,203,71,0.5)]">
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-ink">
            <path
              className="success-check"
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="display success-fade mt-8 text-[clamp(2.75rem,6vw,4rem)] outline-none"
        style={{ "--delay": "0.75s" } as CSSProperties}
      >
        {t.successTitle}
      </h3>
      <p
        className="success-fade mt-3 max-w-xs text-lg leading-relaxed text-charcoal"
        style={{ "--delay": "0.9s" } as CSSProperties}
      >
        {t.successText}
      </p>
    </div>
  );
}

export function ContactForm() {
  const t = de.contact.form;
  const [state, formAction, pending] = useActionState(sendContact, initial);
  const errors = state.errors ?? {};
  const v = state.values;

  if (state.status === "success") return <SuccessMessage />;

  return (
    <form key={state.attempt} action={formAction} noValidate className="space-y-6 rounded-[20px] bg-paper p-6 md:p-8">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <Step n="01" title={t.interests}>
        <div className="flex flex-wrap gap-2">
          {de.services.items.map((s) => (
            <label key={s.id} className="cursor-pointer">
              <input
                type="checkbox"
                name="interests"
                value={s.title}
                defaultChecked={v?.interests.includes(s.title)}
                className="peer sr-only"
              />
              <span className={`${chip} py-1.5 pl-1.5`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" className="h-7 w-7" />
                {s.title}
              </span>
            </label>
          ))}
        </div>
      </Step>

      <Step n="02" title={t.budget}>
        <div className="flex flex-wrap gap-2">
          {t.budgets.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" name="budget" value={b} defaultChecked={v?.budget === b} className="peer sr-only" />
              <span className={chip}>{b}</span>
            </label>
          ))}
        </div>
      </Step>

      <Step n="03" title={t.about}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={label}>
              {t.name}
            </label>
            <input
              id="c-name"
              name="name"
              autoComplete="name"
              defaultValue={v?.name}
              className={field}
              aria-invalid={!!errors.name}
            />
            <FieldError message={errors.name} />
          </div>
          <div>
            <label htmlFor="c-email" className={label}>
              {t.email}
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={v?.email}
              className={field}
              aria-invalid={!!errors.email}
            />
            <FieldError message={errors.email} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="c-company" className={label}>
              {t.company}
            </label>
            <input
              id="c-company"
              name="company"
              autoComplete="organization"
              defaultValue={v?.company}
              className={field}
            />
          </div>
        </div>
      </Step>

      <Step n="04" title={t.messageGroup}>
        <label htmlFor="c-message" className="sr-only">
          {t.message}
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          placeholder={t.messagePlaceholder}
          defaultValue={v?.message}
          className={`${field} resize-y`}
          aria-invalid={!!errors.message}
        />
        <FieldError message={errors.message} />
      </Step>

      <div className="border-t border-ink/10 pt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-charcoal">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={v?.consent}
            className="mt-1 h-4 w-4 shrink-0 accent-ink"
            aria-invalid={!!errors.consent}
          />
          <span>
            {t.consentBefore}
            <Link href="/datenschutz" className="font-semibold text-ink underline underline-offset-2">
              {t.consentLink}
            </Link>
            {t.consentAfter}
          </span>
        </label>
        <FieldError message={errors.consent} />

        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-spark px-7 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
        >
          {pending ? t.sending : t.submit}
          {!pending && (
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
