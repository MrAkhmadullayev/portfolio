import type { ComponentType } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Briefcase, Code, Mail, Send } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { site, type ContactId } from "@/content/site";
import type { Dictionary } from "@/i18n";

/*
 * Ataylab umumiy ikonkalar: brend logotiplari (Telegram, GitHub, LinkedIn)
 * ularning savdo belgisi — kerak bo'lsa rasmiy to'plamlaridan oling.
 */
const icons: Record<ContactId, ComponentType<{ size?: number }>> = {
  email: Mail,
  telegram: Send,
  github: Code,
  linkedin: Briefcase,
};

export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section id={dict.anchors.contact} className="bg-night text-snow">
      <div className="container-x flex flex-col items-center gap-7 pt-[clamp(5.5rem,10vw,9.5rem)] pb-[clamp(4rem,7vw,6.5rem)] text-center">
        <Reveal className="flex flex-col items-center gap-7">
          <p className="text-eyebrow text-ash">{dict.contact.eyebrow}</p>
          <h2 className="text-display max-w-[62.5rem]">{dict.contact.title}</h2>
          <p className="text-lead max-w-[35rem] text-pretty text-ash">
            {dict.contact.lead}
          </p>
          <ButtonLink
            href={`mailto:${site.email}`}
            variant="light"
            size="lg"
            className="mt-2"
          >
            {dict.contact.cta}
          </ButtonLink>
        </Reveal>

        <ul className="mt-[clamp(2rem,4vw,3.5rem)] grid w-full grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-4 text-left">
          {site.contacts.map((contact, index) => {
            const Icon = icons[contact.id];
            const external = !contact.href.startsWith("mailto:");

            return (
              <Reveal as="li" key={contact.id} delay={index * 70} className="flex">
                <a
                  href={contact.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-22 flex-1 items-center gap-4 rounded-[1.375rem] bg-coal px-[1.375rem] py-5 transition-colors duration-300 hover:bg-[#1c1c1f]"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-[0.875rem] bg-mock transition-colors duration-300 group-hover:bg-snow group-hover:text-ink"
                  >
                    <Icon size={22} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-sm font-semibold text-ash">
                      {contact.label}
                    </span>
                    <span className="font-medium [overflow-wrap:anywhere]">
                      {contact.value}
                    </span>
                  </span>
                  {external && (
                    <span className="sr-only">({dict.a11y.external})</span>
                  )}
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
