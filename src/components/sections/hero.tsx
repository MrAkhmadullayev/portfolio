import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { cssVars } from "@/lib/utils";

/**
 * Birinchi ekran. Elementlar `.rise` orqali navbat bilan ko'tariladi
 * (--i — tartib). Semantik <h1> — ism va kasb: qidiruv uchun eng muhim satr.
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-white">
      <div className="container-x flex flex-col items-center gap-9 pt-[clamp(4rem,8.4vw,7.75rem)] pb-[clamp(4.5rem,8vw,7.5rem)] text-center">
        <p
          className="rise flex min-h-9 items-center gap-2.5 rounded-full bg-mist px-4 text-sm font-medium"
          style={cssVars({ i: 0 })}
        >
          <span aria-hidden="true" className="relative flex size-2 shrink-0">
            <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          {dict.hero.status}
        </p>

        <div className="flex flex-col items-center gap-5">
          <h1
            className="rise text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.3] font-semibold tracking-[-0.01em] text-fog"
            style={cssVars({ i: 1 })}
          >
            {site.name[locale]} — {dict.hero.role}
          </h1>
          <p className="rise text-display max-w-[69rem]" style={cssVars({ i: 2 })}>
            {dict.hero.headline}
          </p>
          <p
            className="rise text-lead mt-2 max-w-[43.75rem] text-pretty text-fog"
            style={cssVars({ i: 3 })}
          >
            {dict.hero.lead}
          </p>
        </div>

        <div
          className="rise flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          style={cssVars({ i: 4 })}
        >
          <ButtonLink href={`#${dict.anchors.contact}`} size="lg">
            {dict.hero.primary}
          </ButtonLink>
          <ArrowLink
            href={`#${dict.anchors.projects}`}
            className="text-[1.0625rem] text-ink"
          >
            {dict.hero.secondary}
          </ArrowLink>
        </div>

        <ul
          aria-label={dict.a11y.technologies}
          className="rise mt-5 flex max-w-[53.75rem] flex-wrap justify-center gap-2.5"
          style={cssVars({ i: 5 })}
        >
          {site.stack.map((tech) => (
            <li
              key={tech}
              className="flex h-9 items-center rounded-full border border-ink/15 px-4 text-sm font-medium text-ink-soft"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
