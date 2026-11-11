import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/**
 * Brauzerning Accept-Language sarlavhasidan mos tilni tanlaydi.
 * Masalan "ru-RU,ru;q=0.9,en;q=0.8" -> "ru". Mos til bo'lmasa — standart til.
 */
function pickLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality === undefined ? 1 : Number(quality),
      };
    })
    .filter((item) => !Number.isNaN(item.quality))
    .sort((a, b) => b.quality - a.quality);

  for (const { language } of preferred) {
    if (isLocale(language)) return language;
  }
  return defaultLocale;
}

/** Faqat bosh manzil ("/") uchun ishlaydi: tashrif buyuruvchini o'z tiliga yo'naltiradi. */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request.headers.get("accept-language"))}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/",
};
