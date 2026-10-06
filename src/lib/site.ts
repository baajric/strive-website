/** Public origin of the site, used for absolute URLs (metadata, sitemap, robots). */
export const SITE_URL = "https://strivedigitally.com";

/** Owner of the site as named in the Impressum and the privacy policy. Values in [brackets] are still missing. */
export const OWNER = {
  name: "Aladin Bajric",
  city: "[Ort]",
  email: "[E-Mail-Adresse]",
};

export const legalDraft = Object.values(OWNER).some((value) => value.startsWith("["));
