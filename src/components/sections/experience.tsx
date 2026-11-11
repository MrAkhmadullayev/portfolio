import { ButtonLink } from "@/components/ui/button-link";
import { Download } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

export function Experience({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id={dict.anchors.experience} className="bg-white">
      <div className="container-x section-y">
        <Reveal className="mb-[clamp(2rem,4vw,3.5rem)] flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <div className="flex flex-[1_1_26rem] flex-col gap-4">
            <p className="text-eyebrow text-fog">{dict.experience.eyebrow}</p>
            <h2 className="text-title">{dict.experience.title}</h2>
          </div>
          <ButtonLink href={site.resumeUrl} variant="outline" newTab>
            <Download size={18} />
            {dict.experience.resume}
          </ButtonLink>
        </Reveal>

        <ol className="border-t border-ink/12">
          {experience.map((item, index) => (
            <Reveal
              as="li"
              key={`${item.company}-${item.from}`}
              delay={index * 80}
              className="flex flex-wrap gap-x-10 gap-y-3 border-b border-ink/12 py-8"
            >
              <p className="flex-[0_0_12.5rem] pt-1.5 text-[0.9375rem] font-medium text-fog">
                {item.from} — {item.to ?? dict.experience.present}
              </p>
              <div className="flex flex-[1_1_16.25rem] flex-col gap-1.5">
                <h3 className="text-2xl leading-[1.2] font-semibold tracking-[-0.02em]">
                  {item.role[locale]}
                </h3>
                <p className="text-[1.0625rem] text-fog">{item.company}</p>
              </div>
              <p className="flex-[2_1_22.5rem] pt-1 text-[1.0625rem] leading-normal">
                {item.result[locale]}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
