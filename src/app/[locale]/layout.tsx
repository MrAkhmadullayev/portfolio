import type { Metadata, Viewport } from "next";

import "@fontsource-variable/inter/wght.css";
import "../globals.css";

import { DemoBadge } from "@/components/layout/demo-badge";
import { Footer } from "@/components/layout/footer";
import { Header, type NavItem } from "@/components/layout/header";
import { site } from "@/content/site";
import { getDictionary, requireLocale } from "@/i18n";
import { locales } from "@/i18n/config";

/**
 * Butun sayt statik: har bir sahifa build vaqtida to'liq HTML bo'lib tayyorlanadi.
 * Kimdir keyinroq so'rov vaqtida ishlaydigan kod (cookies, headers, keshlanmagan
 * fetch) qo'shib qo'ysa, build shu yerda xato beradi.
 */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const name = site.name[locale];

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dict.meta.homeTitle,
      // Ichki sahifalar: "Sahifa nomi — Ism Familiya"
      template: `%s — ${name}`,
    },
    description: dict.meta.homeDescription,
    applicationName: name,
    authors: [{ name, url: site.url }],
    creator: name,
    // Demo rejimida sahifalar qidiruv tizimlariga berilmaydi.
    robots: site.isDemo
      ? { index: false, follow: false }
      : { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  // `route` — shu bo'limga tegishli ichki sahifalar (/projects/..., /blog/...):
  // ularda menyudagi mos band belgilanadi.
  const nav: NavItem[] = [
    { id: dict.anchors.projects, label: dict.nav.projects, route: "projects" },
    { id: dict.anchors.services, label: dict.nav.services },
    { id: dict.anchors.experience, label: dict.nav.experience },
    { id: dict.anchors.about, label: dict.nav.about },
    { id: dict.anchors.blog, label: dict.nav.blog, route: "blog" },
  ];

  return (
    // data-scroll-behavior: sahifalar orasida o'tganda silliq scroll vaqtincha
    // o'chadi (yangi sahifa darhol tepadan ochiladi), langarlar uchun esa qoladi.
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* JS ishlayotganini bo'yalishdan oldin belgilaydi: scroll animatsiyalari
            faqat shunda kontentni yashiradi (globals.css, html[data-js]). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","")`,
          }}
        />
      </head>
      <body id="top" className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          {dict.a11y.skip}
        </a>

        <Header
          locale={locale}
          name={site.name[locale]}
          nav={nav}
          contactId={dict.anchors.contact}
          contactLabel={dict.nav.contact}
          labels={{
            mainNav: dict.a11y.mainNav,
            language: dict.a11y.language,
            openMenu: dict.a11y.openMenu,
            closeMenu: dict.a11y.closeMenu,
          }}
        />

        {/* "Kontentga o'tish" havolasi shu yerga olib keladi. id layout'da turadi:
            oldingi sahifalar DOM'da yashirin saqlanadi, sahifa ichidagi id takrorlanardi. */}
        <div id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </div>

        <Footer locale={locale} dict={dict} />
        <DemoBadge label={dict.demo.badge} />
      </body>
    </html>
  );
}
