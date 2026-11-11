import type { Localized } from "@/i18n/config";

export type ExperienceItem = {
  from: string;
  /** `null` — hozir ham shu yerda ishlayapti. */
  to: string | null;
  role: Localized;
  company: string;
  /** Asosiy natija — bir jumlada, imkon bo'lsa raqam bilan. */
  result: Localized;
};

/** DEMO MA'LUMOT — kompaniyalar va natijalar namunaviy. Yangisi yuqorida turadi. */
export const experience: ExperienceItem[] = [
  {
    from: "2024",
    to: null,
    role: {
      uz: "Full-stack dasturchi",
      en: "Full-stack developer",
      ru: "Full-stack разработчик",
    },
    company: "Demo Tech",
    result: {
      uz: "B2B platforma va toʻlov integratsiyalarini ishlab chiqdim; asosiy sahifalar yuklanishini ikki barobar tezlashtirdim.",
      en: "Built a B2B platform and payment integrations; made the key pages load twice as fast.",
      ru: "Разработал B2B-платформу и платёжные интеграции; ускорил загрузку ключевых страниц вдвое.",
    },
  },
  {
    from: "2023",
    to: "2024",
    role: {
      uz: "Backend dasturchi",
      en: "Backend developer",
      ru: "Backend-разработчик",
    },
    company: "Namuna Soft",
    result: {
      uz: "Monolitni mikroservislarga ajratishda qatnashdim va navbatga asoslangan taqsimlash xizmatini yozdim.",
      en: "Took part in splitting a monolith into microservices and wrote a queue-based dispatch service.",
      ru: "Участвовал в разделении монолита на микросервисы и написал сервис распределения на основе очередей.",
    },
  },
  {
    from: "2022",
    to: "2023",
    role: {
      uz: "Kichik dasturchi",
      en: "Junior developer",
      ru: "Младший разработчик",
    },
    company: "Start Lab",
    result: {
      uz: "Ichki xizmatlar uchun API va CI/CD liniyasini sozladim; chiqarish vaqtini soatlardan daqiqalarga tushirdim.",
      en: "Set up APIs and a CI/CD pipeline for internal services; cut release time from hours to minutes.",
      ru: "Настроил API и CI/CD для внутренних сервисов; сократил время релиза с часов до минут.",
    },
  },
];
