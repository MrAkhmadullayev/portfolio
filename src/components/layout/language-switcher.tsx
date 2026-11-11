"use client";

import { usePathname } from "next/navigation";

import {
  localeLabels,
  localeNames,
  locales,
  swapLocale,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  current: Locale;
  /** Guruh uchun aria-label ("Tilni tanlash"). */
  label: string;
  /** Qaysi fon ustida turishi: och yoki to'q. */
  tone?: "light" | "dark";
};

/**
 * Joriy sahifaning boshqa tildagi variantiga olib o'tadi: /uz/blog -> /en/blog.
 *
 * Ataylab <Link> emas, oddiy <a>: til almashganda sahifa to'liq qayta yuklanadi.
 * Sabab — Next.js oldingi sahifani DOM'da yashirin saqlab turadi; til butun
 * layout'ni (header, footer) almashtirgani uchun ikkita header va takroriy
 * id'lar paydo bo'lardi. To'liq yuklanish buni istisno qiladi.
 */
export function LanguageSwitcher({
  current,
  label,
  tone = "light",
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div role="group" aria-label={label} className="flex items-center">
      {locales.map((locale) => {
        const active = locale === current;

        return (
          <a
            key={locale}
            href={swapLocale(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            title={localeNames[locale]}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex size-11 items-center justify-center text-[0.8125rem] transition-colors duration-200",
              active ? "font-bold" : "font-medium",
              tone === "dark"
                ? active
                  ? "text-snow"
                  : "text-ash hover:text-snow"
                : active
                  ? "text-ink"
                  : "text-fog hover:text-ink",
            )}
          >
            {localeLabels[locale]}
          </a>
        );
      })}
    </div>
  );
}
