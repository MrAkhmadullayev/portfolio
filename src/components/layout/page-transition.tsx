import { ViewTransition, type ReactNode } from "react";

/**
 * Sahifa kontentini o'raydi va sahifalar orasidagi o'tishni animatsiya qiladi.
 * Har bir page.tsx da ishlatiladi (layout'da emas — layout o'tishda saqlanib qoladi).
 *
 * Yo'nalish <Link transitionTypes={["nav-forward" | "nav-back"]}> orqali beriladi;
 * berilmasa oddiy yumshoq almashish ("page") ishlaydi. Animatsiyalar: globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "page",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "page",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
