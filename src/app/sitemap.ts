import type { MetadataRoute } from "next";

import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";
import { absoluteUrl, languageUrls } from "@/lib/seo";

/** /sitemap.xml — har bir sahifa har bir tilda, o'zaro hreflang havolalari bilan. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; lastModified?: string }> = [
    { path: "" },
    { path: "/blog" },
    ...projects.map((project) => ({ path: `/projects/${project.slug}` })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: post.date,
    })),
  ];

  return pages.flatMap(({ path, lastModified }) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      ...(lastModified ? { lastModified } : {}),
      alternates: { languages: languageUrls(path) },
    })),
  );
}
