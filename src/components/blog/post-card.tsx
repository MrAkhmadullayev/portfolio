import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import type { Post } from "@/content/posts";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { formatDate } from "@/lib/format";

type PostCardProps = {
  post: Post;
  locale: Locale;
  dict: Dictionary;
  index: number;
  /** Sarlavha darajasi: bosh sahifada h3, blog ro'yxatida h2. */
  heading?: "h2" | "h3";
};

export function PostCard({
  post,
  locale,
  dict,
  index,
  heading: Heading = "h3",
}: PostCardProps) {
  return (
    <Reveal as="li" delay={(index % 3) * 90} className="flex">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        // Statik sahifaning tayyor kontenti oldindan yuklanadi — o'tish bir zumda bo'ladi
        prefetch
        transitionTypes={["nav-forward"]}
        className="group flex min-h-[18.75rem] flex-1 flex-col gap-4 rounded-[1.75rem] bg-white p-[clamp(1.75rem,2.6vw,2.25rem)] text-ink transition-transform duration-500 ease-expo hover:-translate-y-1.5"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="flex h-[30px] items-center rounded-full bg-mist px-3 text-[13px] font-semibold">
            {post.tag}
          </span>
          <time dateTime={post.date} className="text-sm text-fog">
            {formatDate(post.date, locale)}
          </time>
        </div>
        <Heading className="mt-2 text-[1.625rem] leading-[1.18] font-semibold tracking-[-0.025em] text-pretty">
          {post.title[locale]}
        </Heading>
        <p className="text-[1.0625rem] leading-normal text-fog">
          {post.excerpt[locale]}
        </p>
        <span className="mt-auto flex items-center justify-between gap-3 pt-3">
          <span className="flex items-center gap-2 text-[0.9375rem] font-semibold">
            {dict.blog.read}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
            />
          </span>
          <span className="text-sm text-fog">
            {post.minutes} {dict.blog.minutes}
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
