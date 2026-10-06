import { de } from "@/content/de";
import { projectsFor, type Project } from "@/content/projects";
import { Eyebrow, SectionTitle } from "../ui";
import { Gallery } from "./Gallery";
import { SoftwareShowcase, VideoShowcase, WebsiteShowcase } from "./Showcases";

function ProjectMedia({ project }: { project: Project }) {
  const { media } = project;
  if (media.kind === "website") return <WebsiteShowcase media={media} title={project.title} />;
  if (media.kind === "software") return <SoftwareShowcase media={media} title={project.title} />;
  if (media.kind === "video") return <VideoShowcase media={media} title={project.title} />;
  return <Gallery images={media.images} />;
}

/** Portfolio block for a service page; renders nothing until that service has projects. */
export function ProjectsSection({ serviceId }: { serviceId: string }) {
  const items = projectsFor(serviceId);
  if (!items.length) return null;
  const t = de.projects;

  return (
    <section className="bg-paper pb-20 md:pb-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div data-reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <SectionTitle>{t.title}</SectionTitle>
        </div>

        <div className="mt-12 space-y-16 md:space-y-20">
          {items.map((project) => {
            const url = project.media.kind === "website" ? project.media.url : undefined;
            return (
              <article key={project.id} data-reveal>
                <ProjectMedia project={project} />
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-10">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-black tracking-tight text-ink md:text-3xl">{project.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-slate md:text-lg">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {[...project.tags, ...(project.year ? [project.year] : [])].map((tag) => (
                        <li key={tag} className="rounded-full bg-fog px-3 py-1.5 text-xs font-semibold text-ink">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]"
                    >
                      {t.live}
                      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                        <path d="M5 11L11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  )}
                </div>
                {project.results && (
                  <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-paper/10 sm:grid-cols-4">
                    {project.results.map((r) => (
                      <div key={r.label} className="bg-ink p-5 md:p-6">
                        <dt className="sr-only">{r.label}</dt>
                        <dd className="display text-4xl text-spark md:text-5xl">{r.value}</dd>
                        <dd className="mt-2 text-sm font-semibold text-paper/65">{r.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
