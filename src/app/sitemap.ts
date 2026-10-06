import type { MetadataRoute } from "next";
import { de, serviceHref } from "@/content/de";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/leistungen", ...de.services.items.map((s) => serviceHref(s.id)), "/ueber-mich", "/impressum", "/datenschutz"];
  return pages.map((path) => ({
    url: new URL(path, SITE_URL).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/leistungen") ? 0.8 : 0.5,
  }));
}
