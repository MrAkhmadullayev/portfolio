import type { Localized } from "@/i18n/config";

/** Kartochka va loyiha sahifasidagi sxematik rasm turi. */
export type ProjectKind =
  | "browser"
  | "api"
  | "dashboard"
  | "services"
  | "table"
  | "pipeline";

export type Project = {
  /** URL'dagi nom: /uz/projects/<slug> */
  slug: string;
  kind: ProjectKind;
  title: string;
  category: Localized;
  /** Kartochkadagi bir jumlali tavsif. */
  summary: Localized;
  role: Localized;
  period: Localized;
  stack: string[];
  link?: { label: string; href: string };
  problem: Localized;
  solution: Localized;
  /** Asosiy texnik qarorlar (odatda 3 ta). */
  decisions: Localized[];
  /** Natija raqamlari (odatda 3 ta). */
  results: { value: string; label: Localized }[];
};

/**
 * DEMO MA'LUMOT — barcha loyihalar, raqamlar va nomlar namunaviy.
 * Haqiqiy loyihalaringiz bilan almashtiring. Tartib saytdagi tartibni belgilaydi.
 */
export const projects: Project[] = [
  {
    slug: "savdo-hub",
    kind: "browser",
    title: "Savdo Hub",
    category: {
      uz: "Veb-platforma",
      en: "Web platform",
      ru: "Веб-платформа",
    },
    summary: {
      uz: "Ulgurji buyurtmalarni telefon va jadvallardan bitta onlayn kabinetga koʻchirgan B2B platforma.",
      en: "A B2B platform that moved wholesale orders from phone calls and spreadsheets into one online workspace.",
      ru: "B2B-платформа, которая перенесла оптовые заказы из звонков и таблиц в единый онлайн-кабинет.",
    },
    role: {
      uz: "Full-stack dasturchi",
      en: "Full-stack developer",
      ru: "Full-stack разработчик",
    },
    period: {
      uz: "2025-yil mart — avgust",
      en: "March — August 2025",
      ru: "Март — август 2025",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    link: { label: "savdo-hub.example", href: "https://example.com" },
    problem: {
      uz: "Distribyutor buyurtmalarni telefon orqali qabul qilar, menejerlar ularni qoʻlda jadvalga kiritar edi. Xatolar koʻpayib, buyurtmani tasdiqlash bir necha soatga choʻzilardi.",
      en: "The distributor took orders by phone and managers typed them into spreadsheets by hand. Errors piled up and confirming an order took hours.",
      ru: "Дистрибьютор принимал заказы по телефону, а менеджеры вручную вносили их в таблицы. Ошибок становилось больше, а подтверждение заказа растягивалось на часы.",
    },
    solution: {
      uz: "Mijozlar uchun katalog, savat va buyurtma tarixi bor shaxsiy kabinet hamda menejerlar uchun boshqaruv paneli qurdim. Narx va qoldiqlar ombor tizimidan avtomatik yangilanadi.",
      en: "I built a customer workspace with a catalog, cart and order history, plus an admin panel for managers. Prices and stock sync automatically from the warehouse system.",
      ru: "Я сделал личный кабинет для клиентов с каталогом, корзиной и историей заказов, а также панель управления для менеджеров. Цены и остатки автоматически синхронизируются со складской системой.",
    },
    decisions: [
      {
        uz: "Katalog sahifalari serverda render qilinadi — birinchi yuklanish tez va qidiruv tizimlariga ochiq.",
        en: "Catalog pages are rendered on the server, so the first load is fast and visible to search engines.",
        ru: "Страницы каталога рендерятся на сервере: первая загрузка быстрая, а контент доступен поисковикам.",
      },
      {
        uz: "Savat uchun optimistik yangilanish: foydalanuvchi javobni kutmaydi, xato boʻlsa holat qaytariladi.",
        en: "Optimistic updates for the cart: the user never waits, and state rolls back on error.",
        ru: "Оптимистичные обновления корзины: пользователь не ждёт ответа, а при ошибке состояние откатывается.",
      },
      {
        uz: "Buyurtma holatlari maʼlumotlar bazasida tranzaksiya ichida oʻzgaradi — ikki marta tasdiqlash imkonsiz.",
        en: "Order status changes run inside database transactions, so double confirmation is impossible.",
        ru: "Статусы заказов меняются внутри транзакций базы данных, поэтому двойное подтверждение исключено.",
      },
    ],
    results: [
      {
        value: "−62%",
        label: {
          uz: "buyurtmani rasmiylashtirish vaqti",
          en: "time to place an order",
          ru: "времени на оформление заказа",
        },
      },
      {
        value: "1.1 s",
        label: {
          uz: "LCP (mobil, 75-persentil)",
          en: "LCP (mobile, 75th percentile)",
          ru: "LCP (мобильные, 75-й перцентиль)",
        },
      },
      {
        value: "3×",
        label: {
          uz: "onlayn buyurtmalar ulushi",
          en: "share of online orders",
          ru: "доля онлайн-заказов",
        },
      },
    ],
  },
  {
    slug: "kassa-api",
    kind: "api",
    title: "Kassa API",
    category: {
      uz: "API va integratsiya",
      en: "API & integrations",
      ru: "API и интеграции",
    },
    summary: {
      uz: "Bir nechta toʻlov tizimini yagona API ortiga yigʻgan integratsiya xizmati.",
      en: "An integration service that puts several payment providers behind a single API.",
      ru: "Интеграционный сервис, который объединил несколько платёжных систем за единым API.",
    },
    role: {
      uz: "Backend dasturchi",
      en: "Backend developer",
      ru: "Backend-разработчик",
    },
    period: {
      uz: "2024-yil sentabr — 2025-yil fevral",
      en: "September 2024 — February 2025",
      ru: "Сентябрь 2024 — февраль 2025",
    },
    stack: ["Java", "Spring Boot", "PostgreSQL"],
    link: { label: "kassa-api.example", href: "https://example.com" },
    problem: {
      uz: "Har bir yangi toʻlov tizimi alohida integratsiya talab qilar, takroriy soʻrovlar esa baʼzan pulni ikki marta yechib olishga olib kelardi.",
      en: "Every new payment provider required a separate integration, and retried requests sometimes charged customers twice.",
      ru: "Каждая новая платёжная система требовала отдельной интеграции, а повторные запросы иногда приводили к двойному списанию.",
    },
    solution: {
      uz: "Barcha provayderlar uchun yagona kontraktli REST API yozdim: idempotent kalitlar, webhook navbati va qayta urinish siyosati bilan.",
      en: "I wrote a REST API with one contract for all providers: idempotency keys, a webhook queue and a retry policy.",
      ru: "Я написал REST API с единым контрактом для всех провайдеров: ключи идемпотентности, очередь вебхуков и политика повторов.",
    },
    decisions: [
      {
        uz: "Idempotency-Key sarlavhasi va unikal indeks — takroriy soʻrov yangi toʻlov yaratmaydi.",
        en: "An Idempotency-Key header backed by a unique index: a retried request never creates a new payment.",
        ru: "Заголовок Idempotency-Key и уникальный индекс: повторный запрос не создаёт новый платёж.",
      },
      {
        uz: "Webhooklar avval navbatga yoziladi, keyin qayta ishlanadi — provayder javobni darhol oladi.",
        en: "Webhooks are stored in a queue first and processed afterwards, so the provider gets an instant response.",
        ru: "Вебхуки сначала попадают в очередь и только потом обрабатываются: провайдер сразу получает ответ.",
      },
      {
        uz: "Har bir provayder alohida adapter — yangisini qoʻshish asosiy kodga tegmaydi.",
        en: "Each provider is a separate adapter, so adding a new one does not touch the core.",
        ru: "Каждый провайдер — отдельный адаптер: добавление нового не затрагивает ядро.",
      },
    ],
    results: [
      {
        value: "0",
        label: {
          uz: "ikki marta yechib olish holatlari",
          en: "double charges after launch",
          ru: "двойных списаний после запуска",
        },
      },
      {
        value: "5×",
        label: {
          uz: "yangi provayderni ulash tezligi",
          en: "faster provider onboarding",
          ru: "быстрее подключение нового провайдера",
        },
      },
      {
        value: "99.95%",
        label: {
          uz: "xizmatning ishlash vaqti",
          en: "service uptime",
          ru: "доступность сервиса",
        },
      },
    ],
  },
  {
    slug: "nazorat",
    kind: "dashboard",
    title: "Nazorat",
    category: {
      uz: "Boshqaruv paneli",
      en: "Dashboard",
      ru: "Панель управления",
    },
    summary: {
      uz: "Savdo va ombor koʻrsatkichlarini real vaqtda koʻrsatadigan analitika paneli.",
      en: "An analytics dashboard that shows sales and warehouse metrics in real time.",
      ru: "Аналитическая панель, которая показывает продажи и складские показатели в реальном времени.",
    },
    role: {
      uz: "Full-stack dasturchi",
      en: "Full-stack developer",
      ru: "Full-stack разработчик",
    },
    period: {
      uz: "2024-yil aprel — avgust",
      en: "April — August 2024",
      ru: "Апрель — август 2024",
    },
    stack: ["React", "Node.js", "PostgreSQL"],
    link: { label: "nazorat.example", href: "https://example.com" },
    problem: {
      uz: "Rahbariyat hisobotlarni haftada bir marta, qoʻlda yigʻilgan fayllardan olardi. Qaror qabul qilish uchun maʼlumot har doim kechikardi.",
      en: "Management received reports once a week from manually assembled files, so the data was always late for decisions.",
      ru: "Руководство получало отчёты раз в неделю из собранных вручную файлов, и данные всегда опаздывали к моменту принятия решений.",
    },
    solution: {
      uz: "Maʼlumotlarni bir joyga yigʻadigan servis hamda filtr, grafik va eksportga ega panel qurdim.",
      en: "I built a service that aggregates the data and a dashboard with filters, charts and export.",
      ru: "Я сделал сервис, который собирает данные в одном месте, и панель с фильтрами, графиками и экспортом.",
    },
    decisions: [
      {
        uz: "Ogʻir hisob-kitoblar oldindan agregatsiya qilinadi — grafiklar bir zumda ochiladi.",
        en: "Heavy calculations are pre-aggregated, so charts open instantly.",
        ru: "Тяжёлые расчёты агрегируются заранее, поэтому графики открываются мгновенно.",
      },
      {
        uz: "Jadvallar virtual roʻyxat bilan chiziladi — oʻn minglab qator brauzerni sekinlashtirmaydi.",
        en: "Tables use virtualized lists, so tens of thousands of rows do not slow the browser down.",
        ru: "Таблицы используют виртуализацию: десятки тысяч строк не тормозят браузер.",
      },
      {
        uz: "Filtr holati URL manzilida saqlanadi — hisobotni havola orqali ulashish mumkin.",
        en: "Filter state lives in the URL, so any report can be shared as a link.",
        ru: "Состояние фильтров хранится в URL, поэтому отчётом можно поделиться по ссылке.",
      },
    ],
    results: [
      {
        value: "−80%",
        label: {
          uz: "hisobot tayyorlash vaqti",
          en: "time spent preparing reports",
          ru: "времени на подготовку отчётов",
        },
      },
      {
        value: "<200 ms",
        label: {
          uz: "grafiklarning javob vaqti",
          en: "chart response time",
          ru: "время отклика графиков",
        },
      },
      {
        value: "40+",
        label: {
          uz: "har kuni foydalanadigan xodim",
          en: "employees use it every day",
          ru: "сотрудников пользуются ежедневно",
        },
      },
    ],
  },
  {
    slug: "yetkaz",
    kind: "services",
    title: "Yetkaz",
    category: {
      uz: "Mikroservislar",
      en: "Microservices",
      ru: "Микросервисы",
    },
    summary: {
      uz: "Yetkazib berish buyurtmalarini kuryerlarga taqsimlaydigan mikroservislar toʻplami.",
      en: "A set of microservices that dispatches delivery orders to couriers.",
      ru: "Набор микросервисов, который распределяет заказы на доставку между курьерами.",
    },
    role: {
      uz: "Backend dasturchi",
      en: "Backend developer",
      ru: "Backend-разработчик",
    },
    period: {
      uz: "2023-yil oktabr — 2024-yil mart",
      en: "October 2023 — March 2024",
      ru: "Октябрь 2023 — март 2024",
    },
    stack: ["Go", "Docker", "PostgreSQL"],
    link: { label: "yetkaz.example", href: "https://example.com" },
    problem: {
      uz: "Monolit tizim tigʻiz soatlarda sekinlashar, bitta xato esa butun xizmatni toʻxtatib qoʻyardi.",
      en: "The monolith slowed down at peak hours, and a single failure could take the whole service down.",
      ru: "Монолит замедлялся в часы пик, а один сбой мог остановить весь сервис.",
    },
    solution: {
      uz: "Buyurtma, taqsimlash va bildirishnoma qismlarini alohida xizmatlarga ajratdim; ular oʻzaro navbat orqali ishlaydi.",
      en: "I split ordering, dispatching and notifications into separate services that talk through a queue.",
      ru: "Я разделил заказы, распределение и уведомления на отдельные сервисы, которые общаются через очередь.",
    },
    decisions: [
      {
        uz: "Xizmatlar orasida asinxron navbat — biri toʻxtasa, qolganlari ishlashda davom etadi.",
        en: "An asynchronous queue between services: if one stops, the rest keep working.",
        ru: "Асинхронная очередь между сервисами: если один остановится, остальные продолжают работать.",
      },
      {
        uz: "Har bir xizmat oʻz maʼlumotlar bazasiga ega — sxema oʻzgarishi boshqalarga taʼsir qilmaydi.",
        en: "Each service owns its database, so schema changes never leak into others.",
        ru: "У каждого сервиса своя база данных, поэтому изменения схемы не затрагивают остальных.",
      },
      {
        uz: "Kuzatuv uchun yagona trace-ID — soʻrov yoʻlini barcha xizmatlar boʻylab koʻrish mumkin.",
        en: "A shared trace ID for observability: a request can be followed across every service.",
        ru: "Единый trace-ID для наблюдаемости: путь запроса виден во всех сервисах.",
      },
    ],
    results: [
      {
        value: "4×",
        label: {
          uz: "tigʻiz soatdagi oʻtkazuvchanlik",
          en: "throughput at peak hours",
          ru: "пропускная способность в часы пик",
        },
      },
      {
        value: "120 ms",
        label: {
          uz: "javob vaqti (p95)",
          en: "response time (p95)",
          ru: "время ответа (p95)",
        },
      },
      {
        value: "0",
        label: {
          uz: "toʻliq toʻxtash holatlari",
          en: "full outages since launch",
          ru: "полных остановок после запуска",
        },
      },
    ],
  },
  {
    slug: "hisobchi",
    kind: "table",
    title: "Hisobchi",
    category: {
      uz: "Maʼlumotlar xizmati",
      en: "Data service",
      ru: "Сервис данных",
    },
    summary: {
      uz: "Turli manbalardagi maʼlumotlarni yigʻib, tayyor hisobot API sifatida beradigan xizmat.",
      en: "A service that collects data from several sources and exposes ready-made reports through an API.",
      ru: "Сервис, который собирает данные из разных источников и отдаёт готовые отчёты через API.",
    },
    role: {
      uz: "Backend dasturchi",
      en: "Backend developer",
      ru: "Backend-разработчик",
    },
    period: {
      uz: "2023-yil may — sentabr",
      en: "May — September 2023",
      ru: "Май — сентябрь 2023",
    },
    stack: ["Python", "FastAPI", "PostgreSQL"],
    link: { label: "hisobchi.example", href: "https://example.com" },
    problem: {
      uz: "Maʼlumotlar uch xil tizimda saqlanar, ularni solishtirish uchun har safar qoʻlda eksport qilish kerak edi.",
      en: "Data lived in three different systems, and comparing it meant a manual export every time.",
      ru: "Данные хранились в трёх разных системах, и для сверки каждый раз требовалась ручная выгрузка.",
    },
    solution: {
      uz: "Rejali import, tekshiruv va normalizatsiya qiluvchi konveyer hamda hisobotlar uchun tez API yozdim.",
      en: "I wrote a pipeline for scheduled import, validation and normalization, and a fast API for reports.",
      ru: "Я написал конвейер для планового импорта, проверки и нормализации данных и быстрый API для отчётов.",
    },
    decisions: [
      {
        uz: "Har bir import bosqichini qayta ishga tushirish mumkin — yarim yoʻlda uzilish maʼlumotni buzmaydi.",
        en: "Every import step is re-runnable, so an interruption halfway never corrupts data.",
        ru: "Каждый шаг импорта можно перезапустить: обрыв на полпути не портит данные.",
      },
      {
        uz: "Kiruvchi maʼlumot sxema boʻyicha tekshiriladi — notoʻgʻri qatorlar alohida jurnalga tushadi.",
        en: "Incoming data is validated against a schema, and bad rows go to a separate log.",
        ru: "Входящие данные проверяются по схеме, а некорректные строки попадают в отдельный журнал.",
      },
      {
        uz: "Tez-tez soʻraladigan hisobotlar keshlanadi va yangi import kelganda yangilanadi.",
        en: "Frequently requested reports are cached and refreshed when a new import arrives.",
        ru: "Часто запрашиваемые отчёты кешируются и обновляются при новом импорте.",
      },
    ],
    results: [
      {
        value: "15×",
        label: {
          uz: "tezroq hisobot olish",
          en: "faster report delivery",
          ru: "быстрее получение отчётов",
        },
      },
      {
        value: "99.9%",
        label: {
          uz: "muvaffaqiyatli importlar",
          en: "successful imports",
          ru: "успешных импортов",
        },
      },
      {
        value: "3 → 1",
        label: {
          uz: "manbalar bitta APIga birlashdi",
          en: "data sources merged into one API",
          ru: "источника данных объединены в один API",
        },
      },
    ],
  },
  {
    slug: "deploy-line",
    kind: "pipeline",
    title: "Deploy Line",
    category: {
      uz: "CI/CD va infratuzilma",
      en: "CI/CD & infrastructure",
      ru: "CI/CD и инфраструктура",
    },
    summary: {
      uz: "Qoʻlda chiqarishni avtomatik build, test va deploy liniyasiga almashtirgan infratuzilma loyihasi.",
      en: "An infrastructure project that replaced manual releases with an automated build, test and deploy pipeline.",
      ru: "Инфраструктурный проект, который заменил ручные релизы автоматическим конвейером сборки, тестов и деплоя.",
    },
    role: {
      uz: "Full-stack dasturchi (DevOps)",
      en: "Full-stack developer (DevOps)",
      ru: "Full-stack разработчик (DevOps)",
    },
    period: {
      uz: "2022-yil noyabr — 2023-yil fevral",
      en: "November 2022 — February 2023",
      ru: "Ноябрь 2022 — февраль 2023",
    },
    stack: ["Docker", "CI/CD"],
    problem: {
      uz: "Yangi versiya serverga qoʻlda yuklanar, har bir chiqarish kechki payt bir necha soat olar va tez-tez xato bilan tugardi.",
      en: "New versions were uploaded to the server by hand; every release took a few evening hours and often ended with errors.",
      ru: "Новые версии загружались на сервер вручную: каждый релиз занимал несколько вечерних часов и часто заканчивался ошибками.",
    },
    solution: {
      uz: "Ilovani konteynerlarga oʻtkazdim va har bir oʻzgarish uchun build, test hamda deploy bosqichlarini avtomatlashtirdim.",
      en: "I containerized the app and automated build, test and deploy stages for every change.",
      ru: "Я перевёл приложение в контейнеры и автоматизировал сборку, тесты и деплой для каждого изменения.",
    },
    decisions: [
      {
        uz: "Koʻp bosqichli Docker build — yakuniy obraz kichik va tez yuklanadi.",
        en: "Multi-stage Docker builds keep the final image small and quick to pull.",
        ru: "Многоэтапная сборка Docker: итоговый образ маленький и быстро загружается.",
      },
      {
        uz: "Testlar parallel ishlaydi va kesh ishlatadi — tekshiruv bir necha daqiqada tugaydi.",
        en: "Tests run in parallel with caching, so checks finish in a few minutes.",
        ru: "Тесты выполняются параллельно и используют кеш: проверки завершаются за несколько минут.",
      },
      {
        uz: "Deploydan keyin avtomatik tekshiruv — muammo boʻlsa oldingi versiya qaytariladi.",
        en: "An automatic health check after deploy rolls back to the previous version if something is wrong.",
        ru: "Автоматическая проверка после деплоя: при проблеме возвращается предыдущая версия.",
      },
    ],
    results: [
      {
        value: "−70%",
        label: {
          uz: "build va test vaqti",
          en: "build and test time",
          ru: "времени на сборку и тесты",
        },
      },
      {
        value: "5×",
        label: {
          uz: "tez-tez chiqarish",
          en: "more frequent releases",
          ru: "чаще релизы",
        },
      },
      {
        value: "0",
        label: {
          uz: "qoʻlda bajariladigan qadamlar",
          en: "manual steps in a release",
          ru: "ручных шагов в релизе",
        },
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Tartib raqami: "01", "02", ... */
export function getProjectNumber(slug: string): string {
  const index = projects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}

/** Ro'yxatdagi keyingi loyiha (oxirgisidan keyin birinchisi). */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
