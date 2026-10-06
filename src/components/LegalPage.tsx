import type { ReactNode } from "react";
import { de } from "@/content/de";

export function LegalPage({ title, draft, children }: { title: string; draft?: boolean; children: ReactNode }) {
  return (
    <section className="bg-paper pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="display text-[clamp(2.75rem,7vw,5rem)]">{title}</h1>
        {draft && (
          <p className="mt-6 rounded-[10px] border border-spark bg-spark/15 px-4 py-3 text-sm font-semibold text-ink">
            {de.legal.placeholderNote}
          </p>
        )}
        <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink">
          {children}
        </div>
      </div>
    </section>
  );
}
