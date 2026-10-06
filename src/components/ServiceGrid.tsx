import Link from "next/link";
import { de, serviceHref, type Service } from "@/content/de";
import { revealDelay } from "@/lib/reveal";

// Each card gets its own surface so the grid reads as a colourful set, not a table.
const THEMES = [
  { card: "bg-ink text-paper", body: "text-paper/70", pill: "bg-paper text-ink" },
  { card: "bg-ice text-ink", body: "text-charcoal", pill: "bg-ink text-paper" },
  { card: "bg-spark text-ink", body: "text-ink/75", pill: "bg-ink text-paper" },
  { card: "bg-fog text-ink", body: "text-charcoal", pill: "bg-ink text-paper" },
  { card: "bg-indigo text-paper", body: "text-paper/70", pill: "bg-spark text-ink" },
  { card: "bg-ice text-ink", body: "text-charcoal", pill: "bg-ink text-paper" },
];

export function ServiceCard({ item, index, compact = false }: { item: Service; index: number; compact?: boolean }) {
  const theme = THEMES[de.services.items.indexOf(item) % THEMES.length];

  return (
    <Link
      href={serviceHref(item.id)}
      id={`leistung-${item.id}`}
      data-reveal
      style={revealDelay(index)}
      className={`group relative flex scroll-mt-24 flex-col overflow-hidden rounded-[28px] ${theme.card} ${
        compact ? "min-h-[240px] p-5" : "min-h-[400px] p-7 md:p-8"
      }`}
    >
      <h3 className={`font-black tracking-tight ${compact ? "text-xl" : "text-3xl"}`}>{item.title}</h3>
      {!compact && <p className={`mt-3 max-w-[18rem] text-base leading-relaxed ${theme.body}`}>{item.text}</p>}
      <span
        className={`relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${theme.pill}`}
      >
        {de.services.more}
        <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden>
          <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.icon}
        alt=""
        className={`absolute drop-shadow-[0_24px_30px_rgba(11,16,32,0.25)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-6 ${
          compact ? "-bottom-3 -right-3 w-28" : "-bottom-6 -right-6 w-52 md:w-56"
        }`}
      />
    </Link>
  );
}

export function ServiceGrid({ exclude }: { exclude?: string }) {
  const items = de.services.items.filter((s) => s.id !== exclude);
  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${exclude ? "lg:grid-cols-5" : "lg:grid-cols-3"}`}>
      {items.map((item, i) => (
        <ServiceCard key={item.id} item={item} index={i} compact={Boolean(exclude)} />
      ))}
    </div>
  );
}
