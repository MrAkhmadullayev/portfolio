import type { Locale } from "@/i18n/config";

const months: Record<Locale, string[]> = {
  uz: [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
};

/**
 * "2026-10-20" -> "2026-yil 20-oktabr" / "October 20, 2026" / "20 октября 2026".
 * Intl ishlatilmaydi: natija server va brauzerda bir xil chiqishi kafolatlanadi.
 */
export function formatDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split("-").map(Number);
  const name = months[locale][month - 1];

  if (locale === "uz") return `${year}-yil ${day}-${name}`;
  if (locale === "ru") return `${day} ${name} ${year}`;
  return `${name} ${day}, ${year}`;
}
