import { locale as rootLocale } from "next/root-params";

import { ButtonLink } from "@/components/ui/button-link";
import { getDictionary } from "@/i18n";
import { defaultLocale, isLocale } from "@/i18n/config";
import { cssVars } from "@/lib/utils";

/**
 * Sayt ichidagi 404: mavjud bo'lmagan loyiha yoki maqola so'ralganda chiqadi.
 * Header va footer saqlanadi, matn joriy tilda ko'rsatiladi.
 */
export default async function NotFound() {
  const value = await rootLocale();
  const locale = isLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <main className="flex flex-1 items-center bg-white">
      <div className="container-x flex flex-col items-center gap-6 py-[clamp(5rem,12vw,10rem)] text-center">
        <p className="rise text-eyebrow text-fog">404</p>
        <h1 className="rise text-display" style={cssVars({ i: 1 })}>
          {dict.notFound.title}
        </h1>
        <p
          className="rise text-lead max-w-[35rem] text-pretty text-fog"
          style={cssVars({ i: 2 })}
        >
          {dict.notFound.lead}
        </p>
        <div className="rise mt-2" style={cssVars({ i: 3 })}>
          <ButtonLink href={`/${locale}`} size="lg">
            {dict.notFound.home}
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
