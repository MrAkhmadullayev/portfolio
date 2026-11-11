/** Tuzilgan ma'lumot (schema.org) ni sahifaga <script type="application/ld+json"> sifatida qo'shadi. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // "<" belgisi ekranlanadi — matn ichidagi teg skriptni yopib qo'ymasligi uchun.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
