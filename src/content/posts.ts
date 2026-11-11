import type { Localized } from "@/i18n/config";

/** Maqola matni oddiy bloklardan yig'iladi — Markdown yoki CMS shart emas. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Post = {
  /** URL'dagi nom: /uz/blog/<slug> */
  slug: string;
  tag: string;
  /** ISO sana: YYYY-MM-DD */
  date: string;
  /** O'qish vaqti, daqiqada. */
  minutes: number;
  title: Localized;
  excerpt: Localized;
  body: Localized<Block[]>;
};

const metadataSnippet = `export async function generateMetadata({ params }) {
  const { locale } = await params

  return {
    title: 'Sahifa sarlavhasi',
    description: 'Qisqa va aniq tavsif',
    alternates: {
      canonical: \`/\${locale}\`,
      languages: { uz: '/uz', en: '/en', ru: '/ru' },
    },
  }
}`;

const idempotencySnippet = `POST /api/v1/payments
Idempotency-Key: 7c1f0c2e-3b5a-4d1e-9a51-2f6d8e0b1a44
Content-Type: application/json

{ "amount": 150000, "currency": "UZS" }`;

const dockerSnippet = `FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build`;

/** DEMO MA'LUMOT — maqolalar namunaviy. Yangisi yuqorida turadi. */
export const posts: Post[] = [
  {
    slug: "nextjs-seo-asoslari",
    tag: "Frontend",
    date: "2026-10-20",
    minutes: 6,
    title: {
      uz: "Next.js loyihasida SEO: metadata, hreflang va JSON-LD",
      en: "SEO in a Next.js project: metadata, hreflang and JSON-LD",
      ru: "SEO в проекте на Next.js: metadata, hreflang и JSON-LD",
    },
    excerpt: {
      uz: "Qidiruv tizimi sahifani toʻgʻri tushunishi uchun kerak boʻladigan uchta narsa va ularni App Routerʼda sozlash.",
      en: "Three things a search engine needs to understand a page, and how to set them up in the App Router.",
      ru: "Три вещи, которые нужны поисковику, чтобы понять страницу, и как настроить их в App Router.",
    },
    body: {
      uz: [
        {
          type: "p",
          text: "Qidiruv tizimi sahifani toʻgʻri tushunishi uchun uch narsa kerak: aniq sarlavha va tavsif, til versiyalari orasidagi bogʻlanish hamda tuzilgan maʼlumot.",
        },
        { type: "h2", text: "Metadata" },
        {
          type: "p",
          text: "App Routerʼda har bir sahifa generateMetadata funksiyasi orqali oʻz sarlavhasi va tavsifini beradi. Canonical manzil ham shu yerda koʻrsatiladi.",
        },
        { type: "code", lang: "ts", code: metadataSnippet },
        { type: "h2", text: "hreflang" },
        {
          type: "p",
          text: "Har bir til versiyasi qolgan barcha versiyalarga, shu jumladan oʻziga ham ishora qilishi kerak. Ikki sahifa bir-biriga ishora qilmasa, teglar eʼtiborga olinmaydi.",
        },
        { type: "h2", text: "JSON-LD" },
        {
          type: "ul",
          items: [
            "WebSite — bosh sahifada, sayt nomi uchun.",
            "ProfilePage va Person — muallif haqidagi sahifada.",
            "BlogPosting — har bir maqolada.",
          ],
        },
        {
          type: "p",
          text: "Natijani Search Console va Rich Results Test orqali tekshiring: xato boʻlsa, ikkalasi ham aniq qatorni koʻrsatadi.",
        },
      ],
      en: [
        {
          type: "p",
          text: "A search engine needs three things to understand a page correctly: a clear title and description, links between language versions, and structured data.",
        },
        { type: "h2", text: "Metadata" },
        {
          type: "p",
          text: "In the App Router every page provides its own title and description through generateMetadata. The canonical URL is set in the same place.",
        },
        { type: "code", lang: "ts", code: metadataSnippet },
        { type: "h2", text: "hreflang" },
        {
          type: "p",
          text: "Each language version must point to all the others, including itself. If two pages do not point to each other, the tags are ignored.",
        },
        { type: "h2", text: "JSON-LD" },
        {
          type: "ul",
          items: [
            "WebSite on the home page, for the site name.",
            "ProfilePage and Person on the page about the author.",
            "BlogPosting on every article.",
          ],
        },
        {
          type: "p",
          text: "Check the result in Search Console and the Rich Results Test: when something is wrong, both point to the exact line.",
        },
      ],
      ru: [
        {
          type: "p",
          text: "Чтобы поисковик правильно понял страницу, нужны три вещи: понятные заголовок и описание, связь между языковыми версиями и структурированные данные.",
        },
        { type: "h2", text: "Metadata" },
        {
          type: "p",
          text: "В App Router каждая страница отдаёт свои заголовок и описание через generateMetadata. Канонический адрес задаётся там же.",
        },
        { type: "code", lang: "ts", code: metadataSnippet },
        { type: "h2", text: "hreflang" },
        {
          type: "p",
          text: "Каждая языковая версия должна ссылаться на все остальные, включая саму себя. Если две страницы не ссылаются друг на друга, теги игнорируются.",
        },
        { type: "h2", text: "JSON-LD" },
        {
          type: "ul",
          items: [
            "WebSite — на главной странице, для названия сайта.",
            "ProfilePage и Person — на странице об авторе.",
            "BlogPosting — в каждой статье.",
          ],
        },
        {
          type: "p",
          text: "Проверьте результат в Search Console и Rich Results Test: при ошибке оба инструмента покажут конкретную строку.",
        },
      ],
    },
  },
  {
    slug: "idempotent-tolov-api",
    tag: "Backend",
    date: "2026-09-08",
    minutes: 8,
    title: {
      uz: "Idempotent toʻlov API: pulni ikki marta yechib olmaslik uchun",
      en: "Idempotent payment APIs: how not to charge twice",
      ru: "Идемпотентный платёжный API: как не списать деньги дважды",
    },
    excerpt: {
      uz: "Tarmoq ishonchsiz, mijoz soʻrovni qayta yuboradi. Server buni yangi toʻlov deb qabul qilmasligi kerak.",
      en: "Networks are unreliable and clients retry. The server must not treat a retry as a new payment.",
      ru: "Сеть ненадёжна, и клиент повторяет запрос. Сервер не должен считать повтор новым платежом.",
    },
    body: {
      uz: [
        {
          type: "p",
          text: "Tarmoq ishonchsiz: mijoz javobni olmasa, soʻrovni qayta yuboradi. Toʻlov API bunday takrorni yangi toʻlov deb qabul qilmasligi kerak.",
        },
        { type: "h2", text: "Idempotency-Key" },
        {
          type: "p",
          text: "Mijoz har bir amal uchun unikal kalit yaratadi va uni sarlavhada yuboradi. Server kalitni natija bilan birga saqlaydi; xuddi shu kalit yana kelsa, saqlangan javobni qaytaradi.",
        },
        { type: "code", lang: "http", code: idempotencySnippet },
        { type: "h2", text: "Nimaga eʼtibor berish kerak" },
        {
          type: "ul",
          items: [
            "Kalit ustuniga unikal indeks qoʻying — bir vaqtda kelgan ikkinchi yozuv rad etiladi.",
            "Kalit bilan birga soʻrov tanasining xeshini saqlang — boshqa tana bilan kelgan oʻsha kalit xato qaytarsin.",
            "Kalitlarni cheklangan muddat, masalan 24 soat saqlang.",
          ],
        },
        {
          type: "p",
          text: "Shu uch qoida takroriy yechib olish muammosining asosiy qismini yopadi.",
        },
      ],
      en: [
        {
          type: "p",
          text: "Networks are unreliable: when a client does not get a response, it sends the request again. A payment API must not treat that retry as a new payment.",
        },
        { type: "h2", text: "Idempotency-Key" },
        {
          type: "p",
          text: "The client generates a unique key for each operation and sends it in a header. The server stores the key together with the result; when the same key arrives again, it returns the stored response.",
        },
        { type: "code", lang: "http", code: idempotencySnippet },
        { type: "h2", text: "What to watch for" },
        {
          type: "ul",
          items: [
            "Put a unique index on the key column, so a concurrent second insert is rejected.",
            "Store a hash of the request body with the key, so the same key with a different body returns an error.",
            "Keep keys for a limited time, for example 24 hours.",
          ],
        },
        {
          type: "p",
          text: "These three rules cover most of the double-charge problem.",
        },
      ],
      ru: [
        {
          type: "p",
          text: "Сеть ненадёжна: если клиент не получил ответ, он отправляет запрос снова. Платёжный API не должен считать такой повтор новым платежом.",
        },
        { type: "h2", text: "Idempotency-Key" },
        {
          type: "p",
          text: "Клиент создаёт уникальный ключ для каждой операции и передаёт его в заголовке. Сервер сохраняет ключ вместе с результатом; если тот же ключ приходит снова, он возвращает сохранённый ответ.",
        },
        { type: "code", lang: "http", code: idempotencySnippet },
        { type: "h2", text: "На что обратить внимание" },
        {
          type: "ul",
          items: [
            "Поставьте уникальный индекс на колонку ключа — вторая одновременная запись будет отклонена.",
            "Храните вместе с ключом хеш тела запроса — тот же ключ с другим телом должен вернуть ошибку.",
            "Храните ключи ограниченное время, например 24 часа.",
          ],
        },
        {
          type: "p",
          text: "Эти три правила закрывают основную часть проблемы двойного списания.",
        },
      ],
    },
  },
  {
    slug: "docker-ci-cd-tezlashtirish",
    tag: "DevOps",
    date: "2026-07-15",
    minutes: 5,
    title: {
      uz: "Docker bilan CI/CD: build vaqtini uch barobar qisqartirish",
      en: "CI/CD with Docker: cutting build time by a factor of three",
      ru: "CI/CD с Docker: как сократить время сборки втрое",
    },
    excerpt: {
      uz: "Sekin build — sekin fikr almashinuvi. Vaqtning katta qismi odatda bogʻliqliklarni qayta oʻrnatishga ketadi.",
      en: "A slow build means slow feedback. Most of the time usually goes into reinstalling dependencies.",
      ru: "Медленная сборка — медленная обратная связь. Больше всего времени обычно уходит на переустановку зависимостей.",
    },
    body: {
      uz: [
        {
          type: "p",
          text: "Sekin build — sekin fikr almashinuvi. Koʻpincha vaqtning katta qismi har safar bogʻliqliklarni qayta oʻrnatishga ketadi.",
        },
        { type: "h2", text: "Qatlamlar tartibi" },
        {
          type: "p",
          text: "Docker har bir koʻrsatmani alohida qatlam sifatida keshlaydi. Kam oʻzgaradigan fayllarni, yaʼni bogʻliqliklar roʻyxatini avval, tez-tez oʻzgaradigan kodni keyin nusxalang.",
        },
        { type: "code", lang: "dockerfile", code: dockerSnippet },
        { type: "h2", text: "Yana uch qadam" },
        {
          type: "ul",
          items: [
            ".dockerignore fayliga node_modules va build papkalarini qoʻshing.",
            "CI tizimida qatlam keshini yoqing.",
            "Testlarni parallel ishga tushiring.",
          ],
        },
        {
          type: "p",
          text: "Avval oʻlchang, keyin optimallashtiring: qaysi bosqich eng koʻp vaqt olayotgani build jurnalida koʻrinadi.",
        },
      ],
      en: [
        {
          type: "p",
          text: "A slow build means slow feedback. Often most of the time goes into reinstalling dependencies on every run.",
        },
        { type: "h2", text: "Layer order" },
        {
          type: "p",
          text: "Docker caches every instruction as a separate layer. Copy the files that rarely change, the dependency manifests, first, and the code that changes often afterwards.",
        },
        { type: "code", lang: "dockerfile", code: dockerSnippet },
        { type: "h2", text: "Three more steps" },
        {
          type: "ul",
          items: [
            "Add node_modules and build folders to .dockerignore.",
            "Enable layer caching in your CI system.",
            "Run tests in parallel.",
          ],
        },
        {
          type: "p",
          text: "Measure first, then optimize: the build log shows which stage takes the longest.",
        },
      ],
      ru: [
        {
          type: "p",
          text: "Медленная сборка — медленная обратная связь. Часто больше всего времени уходит на переустановку зависимостей при каждом запуске.",
        },
        { type: "h2", text: "Порядок слоёв" },
        {
          type: "p",
          text: "Docker кеширует каждую инструкцию как отдельный слой. Сначала копируйте файлы, которые меняются редко, то есть список зависимостей, а затем код, который меняется часто.",
        },
        { type: "code", lang: "dockerfile", code: dockerSnippet },
        { type: "h2", text: "Ещё три шага" },
        {
          type: "ul",
          items: [
            "Добавьте node_modules и папки сборки в .dockerignore.",
            "Включите кеширование слоёв в CI-системе.",
            "Запускайте тесты параллельно.",
          ],
        },
        {
          type: "p",
          text: "Сначала измеряйте, потом оптимизируйте: в журнале сборки видно, какой этап занимает больше всего времени.",
        },
      ],
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Ro'yxatdagi keyingi maqola (oxirgisidan keyin birinchisi). */
export function getNextPost(slug: string): Post {
  const index = posts.findIndex((post) => post.slug === slug);
  return posts[(index + 1) % posts.length];
}
