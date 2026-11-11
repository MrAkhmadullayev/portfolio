import type { ComponentType } from "react";

import { Database, Layout, Server } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { services, type ServiceIcon } from "@/content/services";
import type { Dictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";

const icons: Record<ServiceIcon, ComponentType<{ size?: number }>> = {
  layout: Layout,
  server: Server,
  database: Database,
};

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id={dict.anchors.services} className="bg-mist">
      <div className="container-x section-y">
        <Reveal className="mb-[clamp(2.5rem,5vw,4.5rem)] flex flex-col items-center gap-4 text-center">
          <p className="text-eyebrow text-fog">{dict.services.eyebrow}</p>
          <h2 className="text-title max-w-[56rem] text-balance">
            {dict.services.title}
          </h2>
          <p className="mt-1 max-w-[40rem] text-[clamp(1.0625rem,1.5vw,1.3125rem)] leading-[1.45] text-pretty text-fog">
            {dict.services.lead}
          </p>
        </Reveal>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(18.75rem,100%),1fr))] gap-6">
          {services.map((service, index) => {
            const Icon = icons[service.icon];

            return (
              <Reveal
                as="li"
                key={service.icon}
                delay={index * 90}
                className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-[clamp(1.75rem,3vw,2.5rem)]"
              >
                <span
                  aria-hidden="true"
                  className="flex size-14 items-center justify-center rounded-2xl bg-ink text-white"
                >
                  <Icon size={26} />
                </span>
                <h3 className="mt-2 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.025em]">
                  {service.title[locale]}
                </h3>
                <p className="text-[1.0625rem] leading-normal text-fog">
                  {service.description[locale]}
                </p>
                <ul className="mt-3 flex flex-col gap-3 border-t border-ink/10 pt-5 text-[1.0625rem] font-medium">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
