import { ProjectCard } from "@/components/project/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function Projects({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id={dict.anchors.projects} className="bg-night text-snow">
      <div className="container-x section-y">
        <Reveal className="mb-[clamp(2.5rem,5vw,4.5rem)] flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <div className="flex flex-[1_1_26rem] flex-col gap-4">
            <p className="text-eyebrow text-ash">{dict.projects.eyebrow}</p>
            <h2 className="text-title">{dict.projects.title}</h2>
          </div>
          <p className="flex-[0_1_23.75rem] text-[clamp(1.0625rem,1.4vw,1.1875rem)] leading-[1.45] text-ash">
            {dict.projects.note}
          </p>
        </Reveal>

        <ul className="flex flex-wrap gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              index={index}
              technologiesLabel={dict.a11y.technologies}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
