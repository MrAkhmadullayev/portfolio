import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { PageTransition } from "@/components/layout/page-transition";
import { ArrowLink } from "@/components/ui/arrow-link";
import { posts } from "@/content/posts";
import { getDictionary, requireLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { cssVars } from "@/lib/utils";

type Props = PageProps<"/[locale]/blog">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return pageMetadata({
    locale,
    path: "/blog",
    title: dict.meta.blogTitle,
    description: dict.meta.blogDescription,
  });
}

export default async function BlogPage({ params }: Props) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return (
    <PageTransition>
      <main className="flex-1 bg-mist">
        <div className="container-x pt-[clamp(2rem,4vw,3.5rem)] pb-[clamp(5rem,9vw,8.5rem)]">
          <div className="mb-[clamp(2.5rem,5vw,4.5rem)] flex flex-col items-start gap-5">
            <ArrowLink
              href={`/${locale}`}
              direction="back"
              transition="nav-back"
              className="rise text-[0.9375rem] text-fog transition-colors duration-200 hover:text-ink"
            >
              {dict.a11y.home}
            </ArrowLink>
            <h1
              className="rise text-display mt-3"
              style={cssVars({ i: 1 })}
            >
              {dict.blog.pageTitle}
            </h1>
            <p
              className="rise text-lead max-w-[43.75rem] text-pretty text-fog"
              style={cssVars({ i: 2 })}
            >
              {dict.blog.pageLead}
            </p>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                dict={dict}
                index={index}
                heading="h2"
              />
            ))}
          </ul>
        </div>
      </main>
    </PageTransition>
  );
}
