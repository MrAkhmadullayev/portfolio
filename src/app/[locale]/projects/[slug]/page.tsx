import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageFallback } from "@/components/layout/page-fallback";
import { PageTransition } from "@/components/layout/page-transition";
import { ProjectVisual } from "@/components/project/project-visual";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import {
  getNextProject,
  getProject,
  getProjectNumber,
  projects,
} from "@/content/projects";
import { getDictionary, requireLocale } from "@/i18n";
import { locales } from "@/i18n/config";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { cssVars } from "@/lib/utils";

type Props = PageProps<"/[locale]/projects/[slug]">;

/** Har bir til × har bir loyiha uchun sahifa build vaqtida tayyorlanadi. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const project = getProject(slug);
  if (!project) notFound();

  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.title} — ${project.category[locale]}`,
    description: project.summary[locale],
    type: "article",
  });
}

const sectionTitle =
  "text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]";

/**
 * `params` Suspense ichida o'qiladi: manzilga bog'liq qism (slug) umumiy qobiqdan
 * ajraladi va sahifaga o'tish bloklanmaydi. Kartochkalardagi <Link prefetch>
 * tayyor kontentni oldindan yuklab qo'yadi, shuning uchun fallback deyarli ko'rinmaydi.
 */
export default function ProjectPage({ params }: Props) {
  return (
    <Suspense fallback={<PageFallback />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<Props, "params">) {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const project = getProject(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const number = getProjectNumber(slug);
  const next = getNextProject(slug);
  const url = absoluteUrl(`/${locale}/projects/${slug}`);

  const meta = [
    { term: dict.project.role, value: project.role[locale] },
    { term: dict.project.period, value: project.period[locale] },
    { term: dict.project.stack, value: project.stack.join(" · ") },
  ];

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: dict.a11y.home,
        item: absoluteUrl(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: dict.nav.projects,
        item: absoluteUrl(`/${locale}#${dict.anchors.projects}`),
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <PageTransition>
      <main className="flex-1">
        <JsonLd data={breadcrumbs} />

        <article>
          <header className="bg-white">
            <div className="container-x flex flex-col gap-[clamp(2.5rem,5vw,4.5rem)] pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(3rem,5vw,4.5rem)]">
              <div className="flex flex-col items-start gap-5">
                <ArrowLink
                  href={`/${locale}#${dict.anchors.projects}`}
                  direction="back"
                  transition="nav-back"
                  className="rise text-[0.9375rem] text-fog transition-colors duration-200 hover:text-ink"
                >
                  {dict.project.back}
                </ArrowLink>
                <p
                  className="rise text-eyebrow mt-3 text-fog"
                  style={cssVars({ i: 1 })}
                >
                  {number} · {project.category[locale]}
                </p>
                <h1
                  className="rise text-[clamp(2.5rem,6.6vw,6rem)] leading-[1.02] font-semibold tracking-[-0.04em]"
                  style={cssVars({ i: 2 })}
                >
                  {project.title}
                </h1>
                <p
                  className="rise text-lead mt-1 max-w-[47.5rem] text-pretty text-fog"
                  style={cssVars({ i: 3 })}
                >
                  {project.summary[locale]}
                </p>
              </div>

              <dl
                className="rise grid grid-cols-[repeat(auto-fit,minmax(min(12.5rem,100%),1fr))] gap-x-8 gap-y-6 border-t border-ink/12 pt-7"
                style={cssVars({ i: 4 })}
              >
                {meta.map((item) => (
                  <div key={item.term} className="flex flex-col gap-2">
                    <dt className="text-sm font-semibold text-fog">
                      {item.term}
                    </dt>
                    <dd className="text-[1.0625rem] leading-[1.4] font-medium">
                      {item.value}
                    </dd>
                  </div>
                ))}
                {project.link && (
                  <div className="flex flex-col gap-2">
                    <dt className="text-sm font-semibold text-fog">
                      {dict.project.link}
                    </dt>
                    <dd className="text-[1.0625rem] leading-[1.4] font-medium">
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 underline decoration-ink/30 underline-offset-4 transition-colors duration-200 hover:decoration-ink"
                      >
                        {project.link.label}
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                        <span className="sr-only">({dict.a11y.external})</span>
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </header>

          {/* Katta sxematik ko'rinish: brauzer oynasi ichida loyiha turiga mos rasm */}
          <div className="bg-white">
            <div className="container-x">
              <Reveal>
                <div
                  role="img"
                  aria-label={dict.project.preview}
                  className="flex h-[clamp(17.5rem,44vw,38.75rem)] overflow-hidden rounded-[clamp(1.5rem,3vw,2.5rem)] bg-night px-[clamp(1.25rem,7vw,6.5rem)] pt-[clamp(1.5rem,5vw,4.5rem)]"
                >
                  <div className="flex min-w-0 flex-1 flex-col gap-[18px] rounded-t-[20px] bg-mist px-5 pt-4">
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="size-2.5 rounded-full bg-[#c7c7cc]" />
                      <span className="size-2.5 rounded-full bg-[#c7c7cc]" />
                      <span className="size-2.5 rounded-full bg-[#c7c7cc]" />
                      <span className="ml-3.5 h-[26px] max-w-90 flex-1 rounded-full bg-[#e4e4e8]" />
                    </div>
                    <ProjectVisual
                      kind={project.kind}
                      framed
                      className="min-h-0 flex-1 rounded-t-2xl"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="bg-white">
            <div className="container-x section-y flex flex-col gap-[clamp(3.5rem,6vw,5.5rem)]">
              <Reveal as="section" className="flex flex-wrap gap-x-12 gap-y-5">
                <div className="flex flex-[0_0_min(20rem,100%)] flex-col gap-3">
                  <p className="text-eyebrow text-fog">01</p>
                  <h2 className={sectionTitle}>{dict.project.problem}</h2>
                </div>
                <p className="max-w-[45rem] flex-[1_1_30rem] text-[clamp(1.125rem,1.6vw,1.3125rem)] leading-normal text-pretty">
                  {project.problem[locale]}
                </p>
              </Reveal>

              <Reveal as="section" className="flex flex-wrap gap-x-12 gap-y-5">
                <div className="flex flex-[0_0_min(20rem,100%)] flex-col gap-3">
                  <p className="text-eyebrow text-fog">02</p>
                  <h2 className={sectionTitle}>{dict.project.solution}</h2>
                </div>
                <div className="flex max-w-[45rem] flex-[1_1_30rem] flex-col gap-8">
                  <p className="text-[clamp(1.125rem,1.6vw,1.3125rem)] leading-normal text-pretty">
                    {project.solution[locale]}
                  </p>
                  <ol className="border-t border-ink/12">
                    {project.decisions.map((decision, index) => (
                      <li
                        key={decision.en}
                        className="flex gap-5 border-b border-ink/12 py-5 text-[1.0625rem] leading-normal"
                      >
                        <span
                          aria-hidden="true"
                          className="w-7 shrink-0 font-semibold text-fog"
                        >
                          {index + 1}
                        </span>
                        <span>{decision[locale]}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>

          <section className="bg-night text-snow">
            <div className="container-x section-y flex flex-col gap-[clamp(2rem,4vw,3.5rem)]">
              <Reveal className="flex flex-col gap-3">
                <p className="text-eyebrow text-ash">03</p>
                <h2 className={sectionTitle}>{dict.project.result}</h2>
              </Reveal>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(17.5rem,100%),1fr))] gap-6">
                {project.results.map((result, index) => (
                  <Reveal
                    as="li"
                    key={result.label.en}
                    delay={index * 90}
                    className="flex flex-col gap-3 rounded-[1.75rem] bg-coal p-[clamp(1.75rem,3vw,2.5rem)]"
                  >
                    <p className="text-[clamp(2.5rem,4.6vw,4rem)] leading-none font-semibold tracking-[-0.04em]">
                      {result.value}
                    </p>
                    <p className="text-[1.0625rem] leading-[1.45] text-ash">
                      {result.label[locale]}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        </article>

        <section className="bg-mist">
          <div className="container-x py-[clamp(3.5rem,6vw,5.5rem)]">
            <Link
              href={`/${locale}/projects/${next.slug}`}
              prefetch
              transitionTypes={["nav-forward"]}
              className="group flex flex-wrap items-end justify-between gap-x-12 gap-y-4 text-ink"
            >
              <span className="flex flex-col gap-3">
                <span className="text-eyebrow text-fog">
                  {dict.project.next} · {getProjectNumber(next.slug)} ·{" "}
                  {next.category[locale]}
                </span>
                <span className="text-title">{next.title}</span>
              </span>
              <span
                aria-hidden="true"
                className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-expo group-hover:translate-x-2"
              >
                <ArrowRight size={26} />
              </span>
            </Link>
          </div>
        </section>

        <section className="bg-night text-snow">
          <div className="container-x pt-[clamp(4.5rem,8vw,7.5rem)] pb-[clamp(3.5rem,6vw,5.5rem)]">
            <Reveal className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-title max-w-[56rem] text-balance">
                {dict.project.ctaTitle}
              </h2>
              <p className="max-w-[35rem] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.45] text-ash">
                {dict.project.ctaLead}
              </p>
              <ButtonLink
                href={`/${locale}#${dict.anchors.contact}`}
                variant="light"
                size="lg"
                className="mt-2"
              >
                {dict.project.cta}
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
