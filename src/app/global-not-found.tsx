import type { Metadata } from "next";

import "@fontsource-variable/inter/wght.css";
import "./globals.css";

import { localeNames, locales } from "@/i18n/config";

/**
 * Hech bir marshrutga mos kelmagan manzillar uchun 404 (masalan /uz/yoq-sahifa).
 * Bu fayl layout'siz ishlaydi, shuning uchun to'liq HTML hujjat qaytaradi va
 * til noma'lum bo'lgani uchun matn uch tilda beriladi.
 */
export const metadata: Metadata = {
  title: "404 — Sahifa topilmadi",
  description: "Sahifa topilmadi · Page not found · Страница не найдена",
};

const messages = [
  { lang: "uz", text: "Sahifa topilmadi." },
  { lang: "en", text: "Page not found." },
  { lang: "ru", text: "Страница не найдена." },
];

export default function GlobalNotFound() {
  return (
    <html lang="uz">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-white px-5 py-16 text-center">
        <main className="flex flex-col items-center gap-6">
          <p className="rise text-eyebrow text-fog">404</p>
          <h1 className="rise text-display" style={{ animationDelay: "120ms" }}>
            {messages[0].text}
          </h1>
          <p
            className="rise text-lead text-fog"
            style={{ animationDelay: "210ms" }}
          >
            {messages.slice(1).map((message, index) => (
              <span key={message.lang} lang={message.lang}>
                {index > 0 && " · "}
                {message.text}
              </span>
            ))}
          </p>
          <nav
            aria-label="Til · Language · Язык"
            className="rise mt-2 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "300ms" }}
          >
            {locales.map((locale) => (
              // Oddiy <a>: bu sahifa ilova marshrutizatoridan tashqarida ochiladi
              <a
                key={locale}
                href={`/${locale}`}
                hrefLang={locale}
                lang={locale}
                className="inline-flex h-12 items-center rounded-full border border-ink/20 px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:border-ink/60"
              >
                {localeNames[locale]}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
