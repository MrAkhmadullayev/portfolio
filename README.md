# Sadriddin Akhmadullayev — portfolio

Uch tilli (UZ / EN / RU) shaxsiy portfolio sayti. Backend va ma'lumotlar bazasi yo'q:
barcha kontent `src/content/` dagi fayllardan olinadi va har bir sahifa build vaqtida
tayyor HTML bo'lib chiqadi.

> **Hozir sayt DEMO ma'lumot bilan to'ldirilgan.** Loyihalar, kompaniyalar, raqamlar,
> maqolalar va aloqa manzillari namunaviy. Demo rejimida sahifalar qidiruv
> tizimlaridan yashirilgan (`noindex`) va ekran burchagida «Demo ma'lumot» belgisi turadi.

## Ishga tushirish

Node.js 20.9 yoki undan yangi versiya kerak.

```bash
npm install
npm run dev        # http://localhost:3000 — ishlab chiqish rejimi
```

Production:

```bash
npm run build      # barcha sahifalarni tayyorlaydi
npm run start      # tayyor saytni ishga tushiradi
```

Tekshiruvlar:

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Texnologiyalar

| Qism | Nima ishlatilgan |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Til | TypeScript (strict) |
| Uslub | Tailwind CSS 4 — tokenlar `src/app/globals.css` da |
| Shrift | Inter, loyiha ichida saqlanadi (`@fontsource-variable/inter`) |
| Animatsiya | Sof CSS + IntersectionObserver + View Transitions API; tashqi kutubxona yo'q |

## Papka tuzilishi

```
src/
├─ app/
│  ├─ [locale]/                 # /uz, /en, /ru
│  │  ├─ layout.tsx             # <html>, header, footer, umumiy metadata
│  │  ├─ page.tsx               # bosh sahifa
│  │  ├─ not-found.tsx          # sayt ichidagi 404
│  │  ├─ projects/[slug]/       # loyiha sahifasi
│  │  └─ blog/                  # maqolalar ro'yxati va maqola sahifasi
│  ├─ global-not-found.tsx      # mos kelmagan manzillar uchun 404
│  ├─ globals.css               # ranglar, tipografiya, animatsiyalar
│  ├─ sitemap.ts, robots.ts     # /sitemap.xml, /robots.txt
│  └─ icon.svg                  # favicon
├─ components/
│  ├─ layout/                   # header, footer, til almashtirgich
│  ├─ sections/                 # bosh sahifa bo'limlari
│  ├─ project/, blog/           # kartochkalar va sahifa qismlari
│  ├─ seo/                      # JSON-LD
│  └─ ui/                       # tugma, havola, ikonka, Reveal
├─ content/                     # ← BARCHA MA'LUMOT SHU YERDA
├─ i18n/                        # tillar ro'yxati va interfeys matnlari
├─ lib/                         # yordamchi funksiyalar (SEO, sana, class)
└─ proxy.ts                     # "/" ni brauzer tiliga qarab /uz, /en yoki /ru ga yo'naltiradi
public/
├─ og.png                       # ijtimoiy tarmoqlar uchun rasm (1200×630)
└─ resume.pdf                   # rezyume (hozir o'rinbosar fayl)
```

## Demo ma'lumotni haqiqiysiga almashtirish

| Nima | Qayerda |
|---|---|
| Ism, email, aloqa havolalari, texnologiyalar ro'yxati | `src/content/site.ts` |
| Loyihalar (6 ta) | `src/content/projects.ts` |
| Ish tajribasi | `src/content/experience.ts` |
| Xizmatlar | `src/content/services.ts` |
| Maqolalar | `src/content/posts.ts` |
| Sarlavhalar, tugmalar, hero va «Men haqimda» matnlari | `src/i18n/dictionaries/uz.ts`, `en.ts`, `ru.ts` |
| Rezyume | `public/resume.pdf` faylini almashtiring |
| Ijtimoiy tarmoq rasmi | `public/og.png` (1200×630) |
| Urg'u rangi (yashil) | `src/app/globals.css` → `--color-accent` |

Har bir matn uch tilda yoziladi: `{ uz: "...", en: "...", ru: "..." }`. Biror tilni
unutsangiz, `npm run typecheck` xato ko'rsatadi.

Ruscha ism (`Садриддин Ахмадуллаев`) transliteratsiya qilingan — hujjatdagi
yozilish bilan solishtirib oling.

### Saytni ochiq e'lon qilishdan oldin

1. `src/content/site.ts` da `isDemo: false` qiling.
2. `.env.example` dan `.env` yarating va `NEXT_PUBLIC_SITE_URL` ga domeningizni yozing
   (canonical, hreflang, sitemap va Open Graph havolalari shundan yasaladi).
3. `npm run build` qiling va saytni joylang.
4. Google Search Console'da saytni tasdiqlab, `/sitemap.xml` ni yuboring.

## Yangi loyiha yoki maqola qo'shish

- **Loyiha:** `src/content/projects.ts` dagi massivga yangi obyekt qo'shing. `slug` —
  manzildagi nom (`/uz/projects/<slug>`), `kind` — kartochkadagi sxematik rasm turi
  (`browser`, `api`, `dashboard`, `services`, `table`, `pipeline`).
- **Maqola:** `src/content/posts.ts` ga obyekt qo'shing. Matn bloklardan yig'iladi:
  `p` (paragraf), `h2` (sarlavha), `ul` (ro'yxat), `code` (kod).

Sahifa, sitemap va hreflang havolalari o'zi paydo bo'ladi.

## Tillar

- Tillar ro'yxati: `src/i18n/config.ts` (`locales`, `defaultLocale`).
- Interfeys matnlari: `src/i18n/dictionaries/`.
- Bosh sahifa bo'limlarining manzildagi nomi har bir tilda o'ziniki:
  `/uz#loyihalar`, `/en#projects`, `/ru#proekty` (`anchors` kaliti).
- Til almashganda sahifa to'liq qayta yuklanadi — bu ataylab qilingan, sababi
  `src/components/layout/language-switcher.tsx` da yozilgan.

## SEO

- Har bir sahifada: `title`, `description`, `canonical`, `hreflang` (uz, en, ru, x-default),
  Open Graph va Twitter teglari — `src/lib/seo.ts`.
- Tuzilgan ma'lumot (JSON-LD): bosh sahifada `WebSite` + `ProfilePage`/`Person`,
  loyihada `BreadcrumbList`, maqolada `BlogPosting`.
- `/sitemap.xml` va `/robots.txt` avtomatik yasaladi.
- Bosh sahifadagi yagona `<h1>` — ism va kasb.

## Animatsiyalar

| Nima | Qayerda |
|---|---|
| Sahifa ochilganda elementlarning navbat bilan ko'tarilishi | `.rise` — `globals.css` |
| Scroll paytida paydo bo'lish | `<Reveal>` — `src/components/ui/reveal.tsx` + `.reveal` |
| Kartochka ichidagi sxemalarning jonlanishi | `.v-item`, `.v-bar` |
| Sahifalar orasidagi o'tish | `<PageTransition>` + `::view-transition-*` |
| Mobil menyu, hover effektlari | Tailwind `transition-*` class'lari |

`prefers-reduced-motion` yoqilgan qurilmalarda barcha harakat o'chadi. JavaScript
ishlamasa ham kontent to'liq ko'rinadi.

## Joylash (deploy)

Sayt Node.js serverida ishlaydi (`npm run start`) yoki Vercel kabi Next.js'ni
qo'llab-quvvatlaydigan platformaga joylanadi. Sahifalarning o'zi statik, server
faqat ularni tarqatadi va `/` manzilini tilga qarab yo'naltiradi.
