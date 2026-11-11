import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PostBody } from "@/components/blog/post-body";
import { PageFallback } from "@/components/layout/page-fallback";
import { PageTransition } from "@/components/layout/page-transition";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { getNextPost, getPost, posts } from "@/content/posts";
import { site } from "@/content/site";
import { getDictionary, requireLocale } from "@/i18n";
import { locales } from "@/i18n/config";
import { formatDate } from "@/lib/format";
import { absoluteUrl, ogImage, pageMetadata } from "@/lib/seo";
import { cssVars } from "@/lib/utils";

type Props = PageProps<"/[locale]/blog/[slug]">;

/** Har bir til × har bir maqola uchun sahifa build vaqtida tayyorlanadi. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const post = getPost(slug);
  if (!post) notFound();

  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title[locale],
    description: post.excerpt[locale],
    type: "article",
  });
}

/** `params` Suspense ichida o'qiladi — izoh: projects/[slug]/page.tsx. */
export default function PostPage({ params }: Props) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: Pick<Props, "params">) {
  const { locale: rawLocale, slug } = await params;
  const locale = requireLocale(rawLocale);
  const post = getPost(slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const next = getNextPost(slug);
  const url = absoluteUrl(`/${locale}/blog/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    image: absoluteUrl(ogImage.url),
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name[locale],
      url: absoluteUrl(`/${locale}`),
    },
  };

  return (
    <PageTransition>
      <main className="flex-1">
        <JsonLd data={jsonLd} />

        <article className="bg-white">
          <header className="container-x flex flex-col items-start gap-5 pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(2.5rem,4vw,3.5rem)]">
            <ArrowLink
              href={`/${locale}/blog`}
              direction="back"
              transition="nav-back"
              className="rise text-[0.9375rem] text-fog transition-colors duration-200 hover:text-ink"
            >
              {dict.blog.back}
            </ArrowLink>
            <p
              className="rise mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-fog"
              style={cssVars({ i: 1 })}
            >
              <span className="flex h-[30px] items-center rounded-full bg-mist px-3 text-[13px] font-semibold text-ink">
                {post.tag}
              </span>
              <span>
                <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                {" · "}
                {post.minutes} {dict.blog.minutes}
              </span>
            </p>
            <h1
              className="rise max-w-[56rem] text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-balance"
              style={cssVars({ i: 2 })}
            >
              {post.title[locale]}
            </h1>
            <p
              className="rise text-lead max-w-[45rem] text-pretty text-fog"
              style={cssVars({ i: 3 })}
            >
              {post.excerpt[locale]}
            </p>
          </header>

          <div className="container-x pb-[clamp(4rem,8vw,7rem)]">
            <div
              className="rise border-t border-ink/12 pt-[clamp(2rem,4vw,3.5rem)]"
              style={cssVars({ i: 4 })}
            >
              <PostBody blocks={post.body[locale]} />
            </div>
          </div>
        </article>

        <section className="bg-mist">
          <Reveal className="container-x py-[clamp(3.5rem,6vw,5.5rem)]">
            <Link
              href={`/${locale}/blog/${next.slug}`}
              prefetch
              transitionTypes={["nav-forward"]}
              className="group flex flex-wrap items-end justify-between gap-x-12 gap-y-4 text-ink"
            >
              <span className="flex max-w-[52rem] flex-col gap-3">
                <span className="text-eyebrow text-fog">
                  {dict.blog.next} · {next.tag}
                </span>
                <span className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-pretty">
                  {next.title[locale]}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-expo group-hover:translate-x-2"
              >
                <ArrowRight size={26} />
              </span>
            </Link>
          </Reveal>
        </section>
      </main>
    </PageTransition>
  );
}
