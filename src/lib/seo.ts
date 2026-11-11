import type { Metadata } from "next";

import { site } from "@/content/site";
import {
  defaultLocale,
  locales,
  ogLocales,
  type Locale,
} from "@/i18n/config";

export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Sadriddin Akhmadullayev — Full-stack developer",
};

export function absoluteUrl(path = ""): string {
  return `${site.url}${path}`;
}

/** Har bir til uchun manzil + x-default. `path` til segmentisiz beriladi: "/blog". */
export function languageUrls(path = ""): Record<string, string> {
  const urls: Record<string, string> = {};
  for (const locale of locales) urls[locale] = absoluteUrl(`/${locale}${path}`);
  urls["x-default"] = absoluteUrl(`/${defaultLocale}${path}`);
  return urls;
}

type PageMetadataInput = {
  locale: Locale;
  /** Til segmentisiz yo'l: "" (bosh sahifa), "/blog", "/projects/slug". */
  path?: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /** true bo'lsa sarlavha shablonsiz, aynan berilgandek chiqadi. */
  absoluteTitle?: boolean;
};

/** title, description, canonical, hreflang va Open Graph — bitta joyda. */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  type = "website",
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(`/${locale}${path}`);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageUrls(path),
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name[locale],
      locale: ogLocales[locale],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
