export const locales = ["uz", "en", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

/** Bir xil matnning har bir tildagi varianti. */
export type Localized<T = string> = Record<Locale, T>;

export const localeLabels: Localized = { uz: "UZ", en: "EN", ru: "RU" };

export const localeNames: Localized = {
  uz: "Oʻzbekcha",
  en: "English",
  ru: "Русский",
};

/** Open Graph `og:locale` qiymatlari. */
export const ogLocales: Localized = { uz: "uz_UZ", en: "en_US", ru: "ru_RU" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Yo'l boshidagi til segmentini almashtiradi: /uz/blog -> /en/blog */
export function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }
  return `/${next}`;
}
