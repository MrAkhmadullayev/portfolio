import { PostCard } from "@/components/blog/post-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { posts } from "@/content/posts";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Bosh sahifadagi blog bo'limi: eng yangi uchta maqola. */
export function BlogPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id={dict.anchors.blog} className="bg-mist">
      <div className="container-x section-y">
        <Reveal className="mb-[clamp(2rem,4vw,3.5rem)] flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
          <div className="flex flex-[1_1_26rem] flex-col gap-4">
            <p className="text-eyebrow text-fog">{dict.blog.eyebrow}</p>
            <h2 className="text-title">{dict.blog.title}</h2>
          </div>
          <ArrowLink
            href={`/${locale}/blog`}
            transition="nav-forward"
            className="text-[1.0625rem] text-ink"
          >
            {dict.blog.all}
          </ArrowLink>
        </Reveal>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
          {posts.slice(0, 3).map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              locale={locale}
              dict={dict}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
