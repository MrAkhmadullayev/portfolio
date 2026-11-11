import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";

/** "Men haqimda" — qisqa tanishtiruv va ikki xil auditoriya uchun ikki kartochka. */
export function About({ dict }: { dict: Dictionary }) {
  const cards = [
    {
      label: dict.about.employersLabel,
      title: dict.about.employersTitle,
      text: dict.about.employersText,
      cta: dict.about.employersCta,
      href: site.resumeUrl,
      newTab: true,
    },
    {
      label: dict.about.clientsLabel,
      title: dict.about.clientsTitle,
      text: dict.about.clientsText,
      cta: dict.about.clientsCta,
      href: `#${dict.anchors.contact}`,
      newTab: false,
    },
  ];

  return (
    <section id={dict.anchors.about} className="bg-night text-snow">
      <div className="container-x section-y flex flex-col gap-[clamp(2.5rem,5vw,4.5rem)]">
        <Reveal className="flex flex-col gap-6">
          <h2 className="text-eyebrow text-ash">{dict.about.eyebrow}</h2>
          <p className="max-w-[62.5rem] text-[clamp(1.75rem,3.7vw,3.25rem)] leading-[1.14] font-semibold tracking-[-0.03em] text-pretty">
            {dict.about.intro}{" "}
            <span className="text-smoke">{dict.about.body}</span>
          </p>
        </Reveal>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(21.25rem,100%),1fr))] gap-6">
          {cards.map((card, index) => (
            <Reveal
              as="li"
              key={card.label}
              delay={index * 90}
              className="flex flex-col gap-3.5 rounded-[1.75rem] bg-coal p-[clamp(1.75rem,3vw,2.5rem)]"
            >
              <p className="text-sm font-semibold text-ash">{card.label}</p>
              <h3 className="text-[clamp(1.625rem,2.6vw,2.125rem)] leading-[1.12] font-semibold tracking-[-0.025em]">
                {card.title}
              </h3>
              <p className="max-w-[46ch] text-[1.0625rem] leading-normal text-ash">
                {card.text}
              </p>
              <ArrowLink
                href={card.href}
                newTab={card.newTab}
                className="mt-3 self-start text-[1.0625rem] text-white"
              >
                {card.cta}
              </ArrowLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
