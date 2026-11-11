import { notFound } from "next/navigation";

import { isLocale, type Locale } from "./config";
import en from "./dictionaries/en";
import ru from "./dictionaries/ru";
import uz, { type Dictionary } from "./dictionaries/uz";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { uz, en, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** URL'dagi til segmentini tekshiradi; noto'g'ri bo'lsa 404 qaytaradi. */
export function requireLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}
