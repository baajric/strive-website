// Portfolio entries shown on the service pages. Each project lists the services it
// belongs to and picks one presentation:
//   website  – screenshots from `node scripts/capture-site.mjs <url> <slug>`
//   software – a screenshot and/or a short muted MP4 loop of the app
//   gallery  – images and short muted videos (posts, ads, branding, 3D …)
//   video    – one larger muted loop (animations, ads, showreels); `sound` adds a sound switch
// Files live in /public/projects/<slug>/. Order here = order on the page.

type ServiceId = "software" | "websites" | "design" | "video-motion" | "marketing" | "ki-automation";

/** `src` is the image – or the poster frame when `video` is set. */
export type ProjectImage = { src: string; alt: string; video?: string };

export type ProjectMedia =
  | { kind: "website"; url?: string; desktop: string; mobile?: string }
  | { kind: "software"; image: string; video?: string; label?: string }
  | { kind: "gallery"; images: ProjectImage[] }
  | { kind: "video"; src: string; poster: string; aspect?: "16/9" | "9/16" | "1/1"; sound?: boolean };

export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  services: ServiceId[];
  year?: string;
  /** Measured outcomes, shown as large figures. */
  results?: { value: string; label: string }[];
  media: ProjectMedia;
};

const at = (slug: string) => (file: string) => `/projects/${slug}/${file}`;
const aloe = at("aloe-tallow-design");
const tractive = at("tractive");
const social = at("strive-social");
const brand = at("strive-brand");
const animation = at("strive-animation");
const film = at("strive-brand-film");
const gastroliza = at("gastroliza");

export const projects: Project[] = [
  {
    id: "aloe-tallow-website",
    title: "Aloe Tallow – E-Commerce-Website",
    summary:
      "Online-Shop für eine natürliche Hautpflegemarke: klares Layout, starke Produktbühne und Vertrauen auf den ersten Blick – gebaut für Conversion.",
    tags: ["E-Commerce", "Webdesign", "Conversion"],
    services: ["websites"],
    media: {
      kind: "website",
      url: "https://aloe-tallow.com/",
      desktop: "/projects/aloe-tallow/desktop.jpg",
      mobile: "/projects/aloe-tallow/mobile.jpg",
    },
  },
  {
    id: "skydynamic",
    title: "SkyDynamic – Drohnen & Luftaufnahmen",
    summary:
      "Website für einen Anbieter von Luftaufnahmen, Thermografie und Werbefilmen in Oberösterreich – mit klarer Leistungsübersicht, Referenzgalerie und direktem Weg zur Anfrage.",
    tags: ["Webdesign", "Dienstleister", "Österreich"],
    services: ["websites"],
    media: {
      kind: "website",
      url: "https://skydynamic.at/",
      desktop: "/projects/skydynamic/desktop.jpg",
      mobile: "/projects/skydynamic/mobile.jpg",
    },
  },
  {
    id: "ruka-milosti",
    title: "Ruka Milosti – Seniorenbetreuung",
    summary:
      "Website für einen Pflege- und Betreuungsdienst für ältere Menschen: warm, vertrauensvoll und für Angehörige im Ausland gemacht – mit eigenem Designsystem aus dem Logo, Preispaketen und Anfrageformular.",
    tags: ["Webdesign", "React", "In Arbeit"],
    services: ["websites", "software"],
    media: {
      kind: "website",
      desktop: "/projects/ruka-milosti/desktop.jpg",
      mobile: "/projects/ruka-milosti/mobile.jpg",
    },
  },
  {
    id: "aloe-tallow-design",
    title: "Aloe Tallow – Produktgrafiken & Paid Social",
    summary:
      "Ein komplettes visuelles System für eine Hautpflegemarke: Werbeanzeigen, Amazon-Bilder und Website-Grafiken mit klaren Hooks und starkem Produktfokus – erstellt mit KI-Bildgenerierung und Photoshop.",
    tags: ["Paid Social", "Amazon-Grafiken", "KI-Bildgenerierung"],
    services: ["design", "marketing"],
    results: [
      { value: "7,9 %", label: "Conversion-Rate" },
      { value: "+265 %", label: "mehr Conversions" },
      { value: "3,68", label: "ROAS" },
      { value: "< 2 Mon.", label: "bis zur Profitabilität" },
    ],
    media: {
      kind: "gallery",
      images: [
        { src: aloe("familie.webp"), alt: "Familie mit der Aloe-Tallow-Lotion" },
        { src: aloe("zero-toxins.webp"), alt: "Anzeige „Zero Toxins – Maximum Glow“" },
        { src: aloe("inhaltsstoffe.webp"), alt: "Produktbild mit allen Inhaltsstoffen am Strand" },
        { src: aloe("winter.webp"), alt: "Lotion im Schnee – Winter-Kampagne" },
        { src: aloe("anwendung.webp"), alt: "Grafik „When to use?“" },
        { src: aloe("key-ingredients.webp"), alt: "Übersicht der wichtigsten Inhaltsstoffe" },
        { src: aloe("strand.webp"), alt: "Model am Strand mit der Lotion" },
        { src: aloe("ansatz.webp"), alt: "Anzeige „A different approach to hydration“" },
        { src: aloe("amazon-main.webp"), alt: "Amazon-Hauptbild der Lotion" },
        { src: aloe("natuerlich.webp"), alt: "Produkt mit natürlichen Zutaten" },
      ],
    },
  },
  {
    id: "tractive",
    title: "Tractive – Social-Media-Konzept",
    summary:
      "Freies Konzept (kein Kundenauftrag) für den GPS-Tracker für Haustiere: Posts, ein Karussell und ein animierter Short – emotionale Motive, klare Botschaft, im Look der Marke.",
    tags: ["Konzept", "Social Media", "Motion"],
    services: ["design", "marketing"],
    media: {
      kind: "gallery",
      images: [
        { src: tractive("explore-more.webp"), alt: "Post „Explore more – worry less“" },
        { src: tractive("video-poster.webp"), video: tractive("video.mp4"), alt: "Animierter Kurzclip für Tractive" },
        { src: tractive("herzfrequenz.webp"), alt: "Post zur Herzfrequenz-Überwachung" },
        { src: tractive("karussell-1.webp"), alt: "Karussell, Folie 1" },
        { src: tractive("karussell-2.webp"), alt: "Karussell, Folie 2" },
        { src: tractive("karussell-3.webp"), alt: "Karussell, Folie 3" },
        { src: tractive("karussell-4.webp"), alt: "Karussell, Folie 4" },
      ],
    },
  },
  {
    id: "strive-social",
    title: "Strive – Social-Media-Content",
    summary:
      "Mein eigener Instagram-Auftritt: Story-Karussells mit starken Hooks, editoriale Typografie und animierte Shorts, die Wissen vermitteln und Anfragen bringen.",
    tags: ["Instagram", "Content-Strategie", "Motion"],
    services: ["design", "marketing"],
    media: {
      kind: "gallery",
      images: [
        { src: social("no-friends.webp"), alt: "Karussell „You have no friends“" },
        { src: social("video-poster.webp"), video: social("video.mp4"), alt: "Animierter Strive-Short" },
        { src: social("business-killer.webp"), alt: "Post „3 things killing your business“" },
        { src: social("explain.webp"), alt: "Karussell-Folie „Let me explain“" },
        { src: social("ai-posts.webp"), alt: "Post „AI can help you create stunning posts“" },
        { src: social("1990.webp"), alt: "Post „Stop doing business like it’s 1990’s“" },
        { src: social("ai-result.webp"), alt: "Karussell-Folie mit KI-generiertem Ergebnis" },
      ],
    },
  },
  {
    id: "strive-brand-film",
    title: "Strive – Brand-Film",
    summary:
      "28 Sekunden Motion Design für LinkedIn: kinetische Typografie, 3D-Mockups mit echten Projekten und Sounddesign im Takt der Musik – komplett im Code animiert und Frame für Frame gerendert.",
    tags: ["Motion Graphics", "Brand-Film", "Sounddesign"],
    services: ["video-motion", "marketing"],
    year: "2026",
    media: { kind: "video", src: film("video.mp4"), poster: film("poster.webp"), aspect: "16/9", sound: true },
  },
  {
    id: "gastroliza",
    title: "Gastroliza – Produktvideo",
    summary:
      "Produktvideo für Gastroliza, eine Analytik-Plattform für Restaurants: Live-Umsätze aus der Kasse, Kellner-Ranking, Warenverbrauch aus Rezepturen und ein KI-Assistent – in 20 Sekunden erklärt.",
    tags: ["Motion Graphics", "Produktvideo", "SaaS"],
    services: ["video-motion"],
    year: "2026",
    media: { kind: "video", src: gastroliza("video.mp4"), poster: gastroliza("poster.webp"), aspect: "16/9", sound: true },
  },
  {
    id: "strive-animation",
    title: "Strive – 3D-Charakteranimation",
    summary:
      "Eine eigene Pixar-inspirierte Figur und eine Drehbühnen-Animation vom Chaos zur Lösung – als scrollgesteuerte Sequenz die Hauptrolle auf meiner Startseite.",
    tags: ["3D-Animation", "Charakterdesign", "Scroll-Animation"],
    services: ["video-motion", "design"],
    year: "2026",
    media: { kind: "video", src: animation("video.mp4"), poster: animation("poster.webp"), aspect: "16/9" },
  },
  {
    id: "short-form",
    title: "Short-Form & Animation",
    summary:
      "Animierte Shorts für Instagram und TikTok mit Hook in der ersten Sekunde – für meinen eigenen Kanal und als freies Konzept für Tractive.",
    tags: ["Shorts", "Motion Design", "9:16"],
    services: ["video-motion"],
    media: {
      kind: "gallery",
      images: [
        { src: social("video-poster.webp"), video: social("video.mp4"), alt: "Animierter Strive-Short" },
        { src: tractive("video-poster.webp"), video: tractive("video.mp4"), alt: "Animierter Kurzclip – freies Konzept für Tractive" },
      ],
    },
  },
  {
    id: "strive-brand",
    title: "Strive – Markenauftritt & 3D-Charakter",
    summary:
      "Logo, Farbwelt, eine eigene Pixar-inspirierte Figur und sechs 3D-Icons – ein Auftritt, der auf jedem Kanal sofort wiedererkennbar ist.",
    tags: ["Branding", "3D & Illustration", "Icon-Design"],
    services: ["design"],
    year: "2026",
    media: {
      kind: "gallery",
      images: [
        { src: brand("wortmarke.webp"), alt: "Strive-Wortmarke weiß auf Navy" },
        { src: brand("bildmarke.webp"), alt: "Strive-Bildmarke in Navy auf Gold" },
        { src: brand("charakter.webp"), alt: "Charakterblatt der Strive-Figur in vier Ansichten" },
        { src: brand("icons.webp"), alt: "Sechs 3D-Icons für die Strive-Leistungen" },
        { src: brand("szene-vorher.webp"), alt: "Strive-Figur mit acht Armen jongliert alle Aufgaben gleichzeitig" },
        { src: brand("szene-nachher.webp"), alt: "Strive-Figur öffnet eine leuchtende Box mit dem Strive-Logo" },
      ],
    },
  },
  {
    id: "strive-website",
    title: "Strive – Portfolio-Website",
    summary:
      "Meine eigene Website: scrollgesteuerte 3D-Animation, eigenes Designsystem und blitzschnelles Next.js – selbst gestaltet und entwickelt.",
    tags: ["Next.js", "3D-Animation", "Designsystem"],
    services: ["software"],
    year: "2026",
    media: {
      kind: "website",
      // url: add the live address once the domain is set
      desktop: "/projects/strive-website/desktop.jpg",
      mobile: "/projects/strive-website/mobile.jpg",
    },
  },
];

export const projectsFor = (serviceId: string) =>
  projects.filter((p) => (p.services as string[]).includes(serviceId));
