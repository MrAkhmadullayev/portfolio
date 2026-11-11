"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export type NavItem = {
  /** Bosh sahifadagi bo'lim id'si (tilga qarab): #loyihalar, #projects ... */
  id: string;
  label: string;
  /** Shu bo'limga tegishli ichki sahifalar yo'li: "projects" -> /uz/projects/... */
  route?: string;
};

type HeaderProps = {
  locale: Locale;
  name: string;
  nav: NavItem[];
  /** "Bog'lanish" tugmasi olib boradigan bo'lim id'si. */
  contactId: string;
  contactLabel: string;
  labels: {
    mainNav: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };
};

type SectionLinkProps = {
  id: string;
  /** Bosh sahifa manzili: "/uz" */
  home: string;
  /** Hozir bosh sahifadamizmi? */
  onHome: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "data-active"?: boolean;
  "aria-current"?: "true";
};

/**
 * Bosh sahifada langar oddiy <a> bo'ladi (brauzer silliq scroll qiladi),
 * boshqa sahifalarda esa bosh sahifaning o'sha bo'limiga <Link> orqali o'tiladi.
 */
function SectionLink({ id, home, onHome, children, ...rest }: SectionLinkProps) {
  if (onHome) {
    return (
      <a href={`#${id}`} {...rest}>
        {children}
      </a>
    );
  }

  // Logotip ("top") boshqa sahifadan bosh sahifaning o'ziga olib boradi, langarsiz.
  return (
    <Link href={id === "top" ? home : `${home}#${id}`} {...rest}>
      {children}
    </Link>
  );
}

/**
 * Bosh sahifada scroll paytida qaysi bo'lim ekran o'rtasida turganini kuzatadi
 * va menyuda o'sha bandni belgilaydi.
 */
function useActiveSection(idsKey: string, enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const sections = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          setActive((current) =>
            entry.isIntersecting ? id : current === id ? null : current,
          );
        }
      },
      // Ekran o'rtasidagi tor chiziq: unga kirgan bo'lim "faol" hisoblanadi
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idsKey, enabled]);

  return enabled ? active : null;
}

export function Header({
  locale,
  name,
  nav,
  contactId,
  contactLabel,
  labels,
}: HeaderProps) {
  const pathname = usePathname();
  const home = `/${locale}`;
  const onHome = pathname === home;

  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const sectionInView = useActiveSection(
    nav.map((item) => item.id).join(","),
    onHome,
  );
  // Bosh sahifada — ekrandagi bo'lim; ichki sahifada — shu sahifa tegishli bo'lim.
  const active = onHome
    ? sectionInView
    : (nav.find(
        (item) => item.route && pathname.startsWith(`${home}/${item.route}`),
      )?.id ?? null);

  // Mobil menyu ochiq turganda: sahifa scroll'i qulflanadi, Esc yopadi,
  // oyna kengaysa (desktop menyu chiqsa) menyu o'zi yopiladi.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const wide = window.matchMedia("(min-width: 68.75rem)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);

    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const link = { home, onHome, onClick: close };
  const contactHref = onHome ? `#${contactId}` : `${home}#${contactId}`;

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className="sticky top-0 z-50 border-b border-ink/8 bg-white/85 backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="container-x flex h-15 items-center justify-between gap-4">
          <SectionLink
            id="top"
            {...link}
            className="flex min-h-11 shrink-0 items-center text-[1.0625rem] font-semibold tracking-[-0.02em] whitespace-nowrap text-ink"
          >
            {name}
          </SectionLink>

          <nav
            aria-label={labels.mainNav}
            className="hidden items-center gap-8 nav:flex"
          >
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <SectionLink
                  key={item.id}
                  id={item.id}
                  {...link}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative flex min-h-11 items-center text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200",
                    // Faol band ostidagi chiziq chapdan o'ngga chiziladi
                    "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-expo",
                    "data-[active=true]:after:scale-x-100",
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {item.label}
                </SectionLink>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 nav:flex">
            <LanguageSwitcher current={locale} label={labels.language} />
            <ButtonLink href={contactHref}>{contactLabel}</ButtonLink>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2.5 flex size-11 items-center justify-center text-ink nav:hidden"
          >
            {/* Ikki chiziq ochilganda X ga aylanadi */}
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-[1.75px] rounded-full bg-current transition-transform duration-500 ease-expo",
                  open && "translate-y-[5.1px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[1.75px] rounded-full bg-current transition-transform duration-500 ease-expo",
                  open && "-translate-y-[5.1px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/*
        Mobil menyu header'dan tashqarida turadi: header'dagi backdrop-filter
        ichidagi `fixed` elementni o'z qutisiga qamab qo'yadi.
      */}
      <div
        id="mobile-menu"
        inert={!open}
        data-open={open}
        className={cn(
          "group fixed inset-x-0 top-[calc(3.75rem+1px)] bottom-0 z-40 flex flex-col overflow-y-auto bg-white nav:hidden",
          "invisible opacity-0 transition-[opacity,visibility] duration-300",
          "data-[open=true]:visible data-[open=true]:opacity-100",
        )}
      >
        <nav
          aria-label={labels.mainNav}
          className="container-x flex flex-col pt-6"
        >
          {nav.map((item, index) => (
            <SectionLink
              key={item.id}
              id={item.id}
              {...link}
              style={{ transitionDelay: open ? `${index * 50 + 80}ms` : "0ms" }}
              className={cn(
                "flex min-h-16 items-center border-b border-ink/10 text-[1.75rem] font-semibold tracking-[-0.03em] text-ink",
                "translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-expo",
                "group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100",
              )}
            >
              {item.label}
            </SectionLink>
          ))}
        </nav>

        <div
          style={{
            transitionDelay: open ? `${nav.length * 50 + 120}ms` : "0ms",
          }}
          className={cn(
            "container-x mt-auto flex flex-wrap items-center justify-between gap-4 pt-10 pb-8",
            "translate-y-3 opacity-0 transition-[opacity,transform] duration-500 ease-expo",
            "group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100",
          )}
        >
          <LanguageSwitcher current={locale} label={labels.language} />
          <ButtonLink href={contactHref} size="lg" onClick={close}>
            {contactLabel}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
