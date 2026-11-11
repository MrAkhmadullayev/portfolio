import type { Metadata } from "next";

import { PageTransition } from "@/components/layout/page-transition";
import { About } from "@/components/sections/about";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/content/site";
import { getDictionary, requireLocale } from "@/i18n";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);

  return pageMetadata({
    locale,
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = requireLocale((await params).locale);
  const dict = getDictionary(locale);
  const url = absoluteUrl(`/${locale}`);

  // Qidiruv tizimlari uchun: sayt nomi (WebSite) va shaxs haqida (ProfilePage + Person).
  // Demo rejimida ijtimoiy profillar (sameAs) qo'shilmaydi — ular hali haqiqiy emas.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name[locale],
        alternateName: site.alternateNames,
        url: site.url,
        inLanguage: locale,
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: dict.meta.homeTitle,
        inLanguage: locale,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: {
          "@type": "Person",
          "@id": `${site.url}/#person`,
          name: site.name[locale],
          alternateName: site.alternateNames,
          jobTitle: dict.hero.role,
          description: dict.meta.homeDescription,
          url,
          knowsAbout: site.stack,
          ...(site.isDemo
            ? {}
            : {
                email: `mailto:${site.email}`,
                sameAs: site.contacts
                  .filter((contact) => contact.href.startsWith("https://"))
                  .map((contact) => contact.href),
              }),
        },
      },
    ],
  };

  return (
    <PageTransition>
      <main className="flex-1">
        <JsonLd data={jsonLd} />
        <Hero locale={locale} dict={dict} />
        <Projects locale={locale} dict={dict} />
        <Services locale={locale} dict={dict} />
        <Experience locale={locale} dict={dict} />
        <About dict={dict} />
        <BlogPreview locale={locale} dict={dict} />
        <Contact dict={dict} />
      </main>
    </PageTransition>
  );
}
