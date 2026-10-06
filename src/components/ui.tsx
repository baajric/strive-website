import Link from "next/link";
import type { ReactNode } from "react";

/** Primary action – the one gold pill per section. */
export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full bg-spark px-6 py-3 text-base font-semibold text-ink transition-transform hover:scale-[1.03]"
    >
      {children}
    </Link>
  );
}

/** Secondary action – underlined text link that sits next to the primary pill. */
export function TextLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-base font-semibold underline decoration-2 underline-offset-4 hover:decoration-spark ${
        dark ? "text-paper" : "text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children, tone = "ice" }: { children: ReactNode; tone?: "ice" | "paper" | "dark" }) {
  const tones = {
    ice: "bg-ice text-ink",
    paper: "bg-paper text-ink",
    dark: "bg-paper/10 text-spark",
  };
  return (
    <p className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${tones[tone]}`}>{children}</p>
  );
}

type TitleProps = {
  children: ReactNode;
  /** gold on dark sections */
  spark?: boolean;
  /** no gap above (when there is no eyebrow) */
  tight?: boolean;
  small?: boolean;
};

export function SectionTitle({ children, spark, tight, small }: TitleProps) {
  return (
    <h2
      className={`display ${tight ? "" : "mt-5"} ${
        small ? "text-[clamp(2.2rem,5vw,4rem)]" : "text-[clamp(2.5rem,6.6vw,5.5rem)]"
      } ${spark ? "text-spark" : ""}`}
    >
      {children}
    </h2>
  );
}
