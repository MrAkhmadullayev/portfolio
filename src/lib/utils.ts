import type { CSSProperties } from "react";

/** Shartli class nomlarini bitta satrga yig'adi. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** CSS o'zgaruvchilarini `style` ga tip xatosisiz uzatish: cssVars({ i: 2 }) -> { "--i": 2 } */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  const style: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(vars)) style[`--${key}`] = value;
  return style as CSSProperties;
}
