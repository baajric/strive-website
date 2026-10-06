import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { de } from "@/content/de";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: de.meta.title,
  description: de.meta.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${inter.variable} antialiased`}>
      <body>
        <SmoothScroll />
        <RevealObserver />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
