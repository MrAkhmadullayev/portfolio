import Link from "next/link";

import { ProjectVisual } from "@/components/project/project-visual";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  index: number;
  technologiesLabel: string;
};

export function ProjectCard({
  project,
  locale,
  index,
  technologiesLabel,
}: ProjectCardProps) {
  // Qatorlar navbat bilan "keng + tor", "tor + keng" bo'lib joylashadi.
  const wide = index % 4 === 0 || index % 4 === 3;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal
      as="li"
      delay={(index % 2) * 90}
      className={cn(
        "min-w-0",
        wide
          ? "flex-[7_1_min(32.5rem,100%)]"
          : "flex-[5_1_min(23.75rem,100%)]",
      )}
    >
      <Link
        href={`/${locale}/projects/${project.slug}`}
        // Statik sahifaning tayyor kontenti oldindan yuklanadi — o'tish bir zumda bo'ladi
        prefetch
        transitionTypes={["nav-forward"]}
        className="group flex h-full flex-col overflow-hidden rounded-4xl bg-coal text-snow transition-colors duration-500 ease-expo hover:bg-[#1c1c1f]"
      >
        <div className="flex flex-col gap-3 px-[clamp(1.5rem,3vw,2.5rem)] pt-[clamp(1.5rem,3vw,2.5rem)]">
          <p className="text-sm font-semibold text-ash">
            {number} · {project.category[locale]}
          </p>
          <h3 className="text-[clamp(1.625rem,2.6vw,2.25rem)] leading-[1.1] font-semibold tracking-[-0.025em]">
            {project.title}
          </h3>
          <p className="max-w-[44ch] text-[1.0625rem] leading-[1.45] text-ash">
            {project.summary[locale]}
          </p>
          <ul aria-label={technologiesLabel} className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="flex h-[30px] items-center rounded-full border border-chip-line px-3 text-[13px] font-medium text-chip-text"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* mt-auto: matn uzunligi har xil bo'lsa ham rasm kartochka tubida turadi */}
        <div className="mt-auto px-[clamp(1.5rem,3vw,2.5rem)] pt-8">
          <ProjectVisual
            kind={project.kind}
            className="h-70 rounded-t-[18px] transition-transform duration-700 ease-expo group-hover:-translate-y-2"
          />
        </div>
      </Link>
    </Reveal>
  );
}
