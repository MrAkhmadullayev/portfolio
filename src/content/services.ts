import type { Localized } from "@/i18n/config";

export type ServiceIcon = "layout" | "server" | "database";

export type Service = {
  icon: ServiceIcon;
  title: Localized;
  description: Localized;
  items: string[];
};

export const services: Service[] = [
  {
    icon: "layout",
    title: { uz: "Frontend", en: "Frontend", ru: "Фронтенд" },
    description: {
      uz: "Tez yuklanadigan, qulay va qidiruv tizimlariga mos interfeyslar.",
      en: "Fast, comfortable interfaces that search engines can read.",
      ru: "Быстрые и удобные интерфейсы, понятные поисковым системам.",
    },
    items: ["TypeScript", "React", "Next.js"],
  },
  {
    icon: "server",
    title: { uz: "Backend", en: "Backend", ru: "Бэкенд" },
    description: {
      uz: "Ishonchli API, biznes-mantiq va tashqi xizmatlar bilan integratsiya.",
      en: "Reliable APIs, business logic and integrations with external services.",
      ru: "Надёжные API, бизнес-логика и интеграции с внешними сервисами.",
    },
    items: ["Java · Spring Boot", "Python · Django, FastAPI", "Go", "Node.js"],
  },
  {
    icon: "database",
    title: { uz: "Infratuzilma", en: "Infrastructure", ru: "Инфраструктура" },
    description: {
      uz: "Maʼlumotlar bazasi, konteynerlar va avtomatik yetkazib berish.",
      en: "Databases, containers and automated delivery.",
      ru: "Базы данных, контейнеры и автоматическая доставка.",
    },
    items: ["PostgreSQL", "Docker", "CI/CD"],
  },
];
