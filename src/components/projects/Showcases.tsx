import type { ProjectMedia } from "@/content/projects";
import { de } from "@/content/de";
import { VideoPlayer } from "./VideoPlayer";

type WebsiteMedia = Extract<ProjectMedia, { kind: "website" }>;
type SoftwareMedia = Extract<ProjectMedia, { kind: "software" }>;
type VideoMedia = Extract<ProjectMedia, { kind: "video" }>;

const ASPECT = { "16/9": "aspect-video", "9/16": "aspect-[9/16]", "1/1": "aspect-square" } as const;

/** One muted, looping film on a soft ice stage – animations, ads, showreels. */
export function VideoShowcase({ media, title }: { media: VideoMedia; title: string }) {
  const aspect = ASPECT[media.aspect ?? "16/9"];
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-ice p-3 sm:p-6 md:p-10">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,203,71,0.35), rgba(255,203,71,0))" }}
      />
      <VideoPlayer
        src={media.src}
        poster={media.poster}
        title={title}
        sound={media.sound}
        className={`relative mx-auto block w-full rounded-2xl bg-paper object-cover shadow-[0_30px_60px_rgba(11,16,32,0.18)] ${aspect} ${
          media.aspect === "9/16" ? "max-w-sm" : ""
        }`}
      />
    </div>
  );
}

const host = (url?: string) => (url ? new URL(url).host.replace(/^www\./, "") : "");

/**
 * Desktop screenshot in a browser window plus the phone version on top.
 * Hovering slowly scrolls both screenshots, like browsing the real site.
 */
export function WebsiteShowcase({ media, title }: { media: WebsiteMedia; title: string }) {
  const scroll =
    "h-full w-full object-cover object-top transition-[object-position] duration-[7s] ease-in-out group-hover:object-bottom";

  return (
    <div className="group relative overflow-hidden rounded-[28px] bg-ice px-4 pb-10 pt-6 sm:px-8 md:px-12 md:pb-14 md:pt-10">
      <div
        aria-hidden
        className="absolute -left-20 -top-24 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,203,71,0.35), rgba(255,203,71,0))" }}
      />
      {/* Browser */}
      <div className="relative overflow-hidden rounded-xl bg-paper shadow-[0_30px_60px_rgba(11,16,32,0.18)] ring-1 ring-ink/5 md:mr-[14%]">
        <div className="flex items-center gap-2 border-b border-ink/5 bg-fog px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          {media.url && (
            <span className="mx-auto truncate rounded-full bg-paper px-4 py-1 text-xs font-medium text-slate">
              {host(media.url)}
            </span>
          )}
        </div>
        <div className="aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={media.desktop} alt={`${title} – Desktop-Ansicht`} loading="lazy" className={scroll} />
        </div>
      </div>

      {/* Phone */}
      {media.mobile && (
        <div className="absolute bottom-6 right-4 w-[24%] max-w-[190px] sm:right-8 md:bottom-10 md:right-12">
          <div className="overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink shadow-[0_24px_50px_rgba(11,16,32,0.3)] md:rounded-[28px] md:border-[7px]">
            <div className="aspect-[9/19] overflow-hidden rounded-[16px] md:rounded-[20px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={media.mobile} alt={`${title} – mobile Ansicht`} loading="lazy" className={scroll} />
            </div>
          </div>
        </div>
      )}

      <p className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-xs font-semibold text-slate transition-opacity group-hover:opacity-0 md:block">
        {de.projects.scrollHint}
      </p>
    </div>
  );
}

/** App window on a dark stage; a short muted loop if there is a video, otherwise a screenshot. */
export function SoftwareShowcase({ media, title }: { media: SoftwareMedia; title: string }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-ink px-4 py-8 sm:px-8 md:px-14 md:py-14">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(255,203,71,0.25), rgba(255,203,71,0))" }}
      />
      <div className="relative overflow-hidden rounded-xl bg-indigo shadow-[0_30px_70px_rgba(0,0,0,0.45)] ring-1 ring-paper/10">
        <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
          <span className="mx-auto text-xs font-medium text-paper/60">{media.label ?? title}</span>
        </div>
        {media.video ? (
          <video
            src={media.video}
            poster={media.image}
            autoPlay
            muted
            loop
            playsInline
            className="block aspect-[16/10] w-full object-cover"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={media.image} alt={title} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
        )}
      </div>
    </div>
  );
}
