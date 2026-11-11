"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { cn, cssVars } from "@/lib/utils";

type RevealTag = "div" | "li" | "section" | "article" | "p" | "ul" | "ol";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  /** Kechikish (ms) — yonma-yon elementlarni navbat bilan chiqarish uchun. */
  delay?: number;
  children: ReactNode;
};

/*
 * Barcha <Reveal> elementlari bitta IntersectionObserver'dan foydalanadi:
 * har biri uchun alohida kuzatuvchi ochilmaydi.
 */
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    // Element ekranning pastki 8% qismidan o'tgach ishga tushadi
    { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
  );

  return observer;
}

/**
 * Ekranga kirganda yumshoq paydo bo'ladigan o'ram.
 * Animatsiyaning o'zi globals.css da (.reveal) — bu komponent faqat
 * `data-visible` belgisini qo'yadi. Bir marta ko'ringach qayta yashirilmaydi.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  // Teg dinamik, lekin ref va atributlar barcha variantlar uchun bir xil.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    callbacks.set(node, () => setVisible(true));
    getObserver().observe(node);

    return () => {
      callbacks.delete(node);
      observer?.unobserve(node);
    };
  }, [visible]);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={delay ? { ...style, ...cssVars({ "reveal-delay": `${delay}ms` }) } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
