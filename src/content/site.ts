import type { Localized } from "@/i18n/config";

export type ContactId = "email" | "telegram" | "github" | "linkedin";

export type Contact = {
  id: ContactId;
  label: string;
  /** Ekranda ko'rinadigan qiymat. */
  value: string;
  href: string;
};

/**
 * Saytning asosiy sozlamalari.
 *
 * HAQIQIY MA'LUMOTGA O'TISH:
 * 1. `isDemo` ni `false` qiling (shunda "Demo" belgisi yo'qoladi va
 *    sahifalar qidiruv tizimlariga ochiladi).
 * 2. `.env` faylida NEXT_PUBLIC_SITE_URL ni domeningizga almashtiring.
 * 3. Quyidagi ism, aloqa va stack qiymatlarini o'zingiznikiga almashtiring.
 */
export const site = {
  isDemo: true,

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),

  /** RU varianti transliteratsiya — pasportdagi yozilish bilan solishtiring. */
  name: {
    uz: "Sadriddin Akhmadullayev",
    en: "Sadriddin Akhmadullayev",
    ru: "Садриддин Ахмадуллаев",
  } satisfies Localized,

  /** Qidiruvda uchrashi mumkin bo'lgan boshqa yozilishlar (JSON-LD alternateName). */
  alternateNames: ["Sadriddin Ahmadullayev", "Садриддин Ахмадуллаев"],

  email: "hello@example.com",

  /** Fayl `public/resume.pdf` da turadi. */
  resumeUrl: "/resume.pdf",

  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Java",
    "Spring Boot",
    "Python",
    "Django",
    "FastAPI",
    "Go",
    "PostgreSQL",
    "Docker",
    "CI/CD",
  ],

  /**
   * DEMO: havolalar ataylab example.com ga qaratilgan, begona profilga
   * olib bormasligi uchun. Haqiqiy manzillaringizni yozing.
   */
  contacts: [
    {
      id: "email",
      label: "Email",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    {
      id: "telegram",
      label: "Telegram",
      value: "@username",
      href: "https://example.com/?demo=telegram",
    },
    {
      id: "github",
      label: "GitHub",
      value: "@username",
      href: "https://example.com/?demo=github",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/username",
      href: "https://example.com/?demo=linkedin",
    },
  ] satisfies Contact[],
};
