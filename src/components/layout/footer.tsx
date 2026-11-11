import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ArrowUp } from "@/components/ui/icons";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

/** Yil qo'lda yoziladi: sahifalar build vaqtida tayyorlanadi, "hozirgi vaqt" o'qilmaydi. */
const COPYRIGHT_YEAR = 2026;

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-night text-ash">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line pt-5 pb-7 text-sm">
          <p>
            © {COPYRIGHT_YEAR} {site.name[locale]}
          </p>

          <LanguageSwitcher
            current={locale}
            label={dict.a11y.language}
            tone="dark"
          />

          <a
            href="#top"
            className="group flex min-h-11 items-center gap-2 font-medium text-snow"
          >
            {dict.footer.top}
            <ArrowUp
              size={16}
              className="transition-transform duration-300 ease-expo group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
