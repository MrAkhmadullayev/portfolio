import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** "back" — strelka chapda va chapga qaragan. */
  direction?: "forward" | "back";
  /** Sahifa o'tish animatsiyasi yo'nalishi (globals.css dagi .nav-forward / .nav-back). */
  transition?: "nav-forward" | "nav-back";
  newTab?: boolean;
};

/** Matn + strelka. Hover paytida strelka yo'nalishi bo'yicha biroz siljiydi. */
export function ArrowLink({
  href,
  children,
  className,
  direction = "forward",
  transition,
  newTab = false,
}: ArrowLinkProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center gap-2 font-medium",
    className,
  );

  const content =
    direction === "back" ? (
      <>
        <ArrowLeft
          size={18}
          className="transition-transform duration-300 ease-expo group-hover:-translate-x-1"
        />
        {children}
      </>
    ) : (
      <>
        {children}
        <ArrowRight
          size={18}
          className="transition-transform duration-300 ease-expo group-hover:translate-x-1"
        />
      </>
    );

  const isRoute = href.startsWith("/") && !newTab;

  if (isRoute) {
    return (
      <Link
        href={href}
        className={classes}
        transitionTypes={transition ? [transition] : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
