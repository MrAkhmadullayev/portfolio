import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  size?: "md" | "lg";
  className?: string;
  /** Yangi oynada ochish (PDF, tashqi havola). */
  newTab?: boolean;
  onClick?: () => void;
};

const variants = {
  dark: "bg-ink text-white hover:bg-ink-soft",
  light: "bg-white text-ink hover:bg-white/85",
  outline: "border border-ink/20 text-ink hover:border-ink/60",
};

const sizes = {
  md: "h-11 px-[1.375rem] text-[0.9375rem]",
  lg: "h-14 px-[2.125rem] text-[1.0625rem]",
};

/** Tugma ko'rinishidagi havola. Ichki sahifalar uchun <Link>, qolganlari uchun <a>. */
export function ButtonLink({
  href,
  children,
  variant = "dark",
  size = "md",
  className,
  newTab = false,
  onClick,
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap",
    "transition-[transform,background-color,border-color] duration-300 ease-expo active:scale-[0.97]",
    variants[variant],
    sizes[size],
    className,
  );

  // Langar (#id), mailto: va fayllar — oddiy <a>; sahifalar — <Link>.
  const isRoute = href.startsWith("/") && !newTab;

  if (isRoute) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
