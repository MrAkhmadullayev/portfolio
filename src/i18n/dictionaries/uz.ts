/**
 * Interfeys matnlari (o'zbekcha). Boshqa tillar shu tuzilishni takrorlaydi,
 * shuning uchun yangi kalit qo'shsangiz en.ts va ru.ts ga ham qo'shing —
 * TypeScript tushib qolgan kalitni xato sifatida ko'rsatadi.
 */
const uz = {
  meta: {
    homeTitle: "Sadriddin Akhmadullayev — Full-stack dasturchi",
    homeDescription:
      "Full-stack dasturchi Sadriddin Akhmadullayev portfoliosi: veb-ilovalar, API va infratuzilma. TypeScript, React, Next.js, Java, Python, Go.",
    blogTitle: "Blog",
    blogDescription:
      "Veb-dasturlash, backend va infratuzilma haqida amaliy maqolalar.",
    projectLabel: "Loyiha",
  },
  a11y: {
    skip: "Asosiy kontentga oʻtish",
    mainNav: "Asosiy menyu",
    language: "Tilni tanlash",
    openMenu: "Menyuni ochish",
    closeMenu: "Menyuni yopish",
    technologies: "Texnologiyalar",
    home: "Bosh sahifa",
    external: "yangi oynada ochiladi",
  },
  /**
   * Bosh sahifadagi bo'limlarning manzildagi nomi: /uz#loyihalar, /en#projects.
   * Har bir tilda o'z nomi bilan yoziladi va tillar orasida takrorlanmaydi.
   * Faqat lotin harflari, raqam va chiziqcha ishlating.
   */
  anchors: {
    projects: "loyihalar",
    services: "xizmatlar",
    experience: "tajriba",
    about: "men-haqimda",
    blog: "maqolalar",
    contact: "aloqa",
  },
  nav: {
    projects: "Loyihalar",
    services: "Xizmatlar",
    experience: "Tajriba",
    about: "Men haqimda",
    blog: "Blog",
    contact: "Bogʻlanish",
  },
  hero: {
    status: "Yangi loyiha va ish takliflariga ochiqman",
    role: "Full-stack dasturchi",
    headline: "Gʻoyadan ishlaydigan mahsulotgacha.",
    lead: "Toʻrt yildan beri veb-ilovalarni toʻliq quraman: qulay interfeys, ishonchli server va barqaror infratuzilma.",
    primary: "Bogʻlanish",
    secondary: "Loyihalarni koʻrish",
  },
  projects: {
    eyebrow: "Loyihalar",
    title: "Tanlangan ishlar.",
    note: "Har bir loyiha alohida sahifada: muammo, yechim va natija.",
  },
  services: {
    eyebrow: "Xizmatlar va koʻnikmalar",
    title: "Interfeysdan infratuzilmagacha.",
    lead: "Loyihani boshidan oxirigacha olib boraman: loyihalash, ishlab chiqish va ishga tushirish.",
  },
  experience: {
    eyebrow: "Tajriba · 4 yil",
    title: "Qayerda ishlaganman.",
    resume: "Rezyume (PDF)",
    present: "hozir",
  },
  about: {
    eyebrow: "Men haqimda",
    intro: "Men Sadriddin — full-stack dasturchiman.",
    body: "Toʻrt yildan beri gʻoyalarni ishlaydigan mahsulotga aylantiraman: avval muammoni tushunaman, keyin sodda va ishonchli yechim quraman.",
    employersLabel: "Ish beruvchilarga",
    employersTitle: "Jamoangizga qoʻshilaman.",
    employersText:
      "Toʻliq stavka yoki shartnoma asosida. Rezyume va tavsiyalarni soʻrov boʻyicha yuboraman.",
    employersCta: "Rezyumeni koʻrish",
    clientsLabel: "Mijozlarga",
    clientsTitle: "Loyihangizni quraman.",
    clientsText:
      "Veb-ilova, API yoki mavjud tizimni yaxshilash — gʻoyadan ishga tushirishgacha.",
    clientsCta: "Loyihani muhokama qilish",
  },
  blog: {
    eyebrow: "Blog",
    title: "Soʻnggi maqolalar.",
    all: "Barcha maqolalar",
    read: "Oʻqish",
    minutes: "daqiqa",
    pageTitle: "Blog",
    pageLead: "Veb-dasturlash, backend va infratuzilma haqida amaliy yozuvlar.",
    back: "Barcha maqolalar",
    next: "Keyingi maqola",
  },
  contact: {
    eyebrow: "Aloqa",
    title: "Keling, birga ishlaymiz.",
    lead: "Ish taklifi yoki yangi loyiha boʻlsa — yozing.",
    cta: "Email yozish",
  },
  project: {
    back: "Barcha loyihalar",
    role: "Rol",
    period: "Muddat",
    stack: "Texnologiyalar",
    link: "Havola",
    problem: "Muammo",
    solution: "Yechim",
    result: "Natija",
    next: "Keyingi loyiha",
    ctaTitle: "Shunga oʻxshash loyihangiz bormi?",
    ctaLead: "Yozing — vazifani birga koʻrib chiqamiz.",
    cta: "Bogʻlanish",
    preview: "Loyiha interfeysining sxematik koʻrinishi",
  },
  footer: {
    top: "Yuqoriga",
  },
  notFound: {
    title: "Sahifa topilmadi.",
    lead: "Manzil oʻzgargan yoki sahifa oʻchirilgan boʻlishi mumkin.",
    home: "Bosh sahifaga qaytish",
  },
  demo: {
    badge: "Demo maʼlumot",
  },
};

export type Dictionary = typeof uz;

export default uz;
